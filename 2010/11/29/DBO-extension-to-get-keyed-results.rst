DBO extension to get keyed results
==================================

I have often found the need to have the result of a find( 'all' )
keyed to the tables id. I had been doing this in the code with an,
often expensive, foreach loop: [code]$keyResults = array(); foreach(
$results as $result ) { $keyResults[ $result[ 'Model' ][ 'id' ] ] =
$result; } [/code] I didn't like this so I have created an extension
to the MySqli DBO object (as I am using MySqli) that recreates the
find methods to return a result keyed to the tables id
App Model
I have been using Matt Currys excellent custom find ( described in
this e-book `http://www.pseudocoder.com/free-cakephp-book`_ ) to
create my own 'cake like' finds e.g.
$this->Model->find( 'custom' );
So I used Matts custom finds to create a new find in my app_model.php.
The code here is a modified version of the core Model::find method

::

    /**
    	 * Duplicate of find( 'all' ) but return results in a keyed array
    	 *
    	 * @param array $query options array
    	 * @return array $results
    	 */
    	function __findKeyed( $query = null )
    	{
    		$type = 'all';
    
    		$this->findQueryType = $type;
    		$this->id = $this->getID();
    
    		$query = array_merge(
    			array(
    				'conditions' => null, 'fields' => null, 'joins' => array(), 'limit' => null,
    				'offset' => null, 'order' => null, 'page' => null, 'group' => null, 'callbacks' => true
    			),
    			(array)$query
    		);
    
    		if (!is_numeric($query['page']) || intval($query['page']) < 1) {
    			$query['page'] = 1;
    		}
    		if ($query['page'] > 1 && !empty($query['limit'])) {
    			$query['offset'] = ($query['page'] - 1) * $query['limit'];
    		}
    		if ($query['order'] === null && $this->order !== null) {
    			$query['order'] = $this->order;
    		}
    		$query['order'] = array($query['order']);
    
    		if ($query['callbacks'] === true || $query['callbacks'] === 'before') {
    			$return = $this->Behaviors->trigger($this, 'beforeFind', array($query), array(
    				'break' => true, 'breakOn' => false, 'modParams' => true
    			));
    			$query = (is_array($return)) ? $return : $query;
    
    			if ($return === false) {
    				return null;
    			}
    
    			$return = $this->beforeFind($query);
    			$query = (is_array($return)) ? $return : $query;
    
    			if ($return === false) {
    				return null;
    			}
    		}
    
    		if (!$db =& ConnectionManager::getDataSource($this->useDbConfig)) {
    			return false;
    		}
    
    		$results = $db->readByKey($this, $query);
    		$this->resetAssociations();
    
    		if ($query['callbacks'] === true || $query['callbacks'] === 'after') {
    			$results = $this->__filterResults($results);
    		}
    
    		$this->findQueryType = null;
    
    		return $results;
    	}

I have removed some of the code from Model::find that deals with the
other types of find methods, e.g. find( 'first' ). I also only have to
deal with one parameter as Matt Currys custom find method only passes
on the $options ($query) parameter. I have also called a new method
from the datasource object
$results = $db->readByKey($this, $query);
instead of
$results = $db->read($this, $query);

DboMysqli Extension
I have attached the dbo extension file, whic should be saved as
app/models/datasources/dbo/dbo_mysqli_ex.php

This has added in 3 new methods to the datasource:
readByKey, which is called by the app_model custom find() method above
fetchAllKeyed, which creates a result array that has the tables id as
the array keys
__filterKeyedResults, which is a replacement for __filterResults and
uses foreach instead of for()

These 3 methods are all modifications of methods from the core
DboSource class, the modified code is:

::

    function readByKey( &$model, $queryData = array(), $recursive = null )
    {
    	...
    	// get the field to use as the array key, 'id' by defualt
    	if( !empty( $queryData[ 'key' ] ) )
    	{
    		$keyField = $queryData[ 'key' ];
    	}
    	else
    	{
    		$keyField = 'id';
    	}
    	...
    	$resultSet = $this->fetchAllKeyed( $query, $keyField, $model->cacheQueries, $model->alias );
    	...
    	// Call new filter method
    	$filtered = $this->__filterKeyedResults( $resultSet, $model );
    	if( $model->recursive > -1 )
    	{
    		...
    		$this->__filterKeyedResults( $resultSet, $model, $filtered );
    	}
    }



::

    /**
     * works exactly the same as DboSource::__filterResults but uses foreach loops
     */
    function __filterKeyedResults( &$results, &$model, $filtered = array() )
    {
    	foreach( $results as $i => &$result )
    	{
    		...
    		foreach( $result as $className => &$class )
    		{
    			...
    		}
    	}
    }


::

    /**
     * Works the same as DboSource::fetchAll but adds result to a keyed array
     */
    function fetchAllKeyed( $sql, $keyField, $cache = true, $modelName = null )
    {
    	...
    	if( $first != null )
    	{
    		$out[ $first[ $modelName ][ $keyField ] ] = $first;
    	}
    	while( $this->hasResult() && $item = $this->fetchResult() )
    	{
    		$this->fetchVirtualField( $item );
    		$out[ $item[ $modelName ][ $keyField ] ] = $item;
    	}
    }

config/database.php and controllers
To use this extension I just modify my database configs so the driver
is
'driver' => 'mysqli_ex'
instead of
'driver' => 'mysqli'

Then in the controllers I can call the new find like this

::

    $keyedHospitals = $this->Hospital->find( 'keyed', array(
    	'conditions' => $conditions,
    	'key' => 'id'
    ) );

The 'key' => 'id' is actually optional, and 'id' is the default
anyway, but if you have another unique field you can use it instead by
setting the key. At the moment the code does not check to see if the
field you set is unique, so setting it may cause unexpected results.

This also doesn't key the 'contained' Models. To do that I would have
to replace the original methods ( DboSource::read,
DboSource::fetchAll, DboSource::filterResults) rather than create
modified duplicates. This alternative way could be done, it would
probably require another option to be sent in from a find( 'all' )
that is checked on the new read method. For now though, I am happy
with the custom find instead of modifying the core find( 'all' ).

.. _http://www.pseudocoder.com/free-cakephp-book: http://www.pseudocoder.com/free-cakephp-book

.. author:: mbates
.. categories:: articles, behaviors
.. tags:: dbo extension,Behaviors


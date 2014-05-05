Make salesforce objects more cake like
======================================

I've just started to use the salesforce datasource created by
[url=http://bakery.cakephp.org/articles/cwestonr/2010/01/26/example-
datasource-for-salesforce-enterprise-1]cwestonr[/url] and have created
a method to make the results more cake like
There are 2 methods that you can add to app_model

::

     // convert the object into an nested associative array
    function __getRecordData( $recordObject )
    {
    	$recordArray = array( $recordObject->type => array() );
    	if( property_exists( $recordObject, 'Id' ) )
    	{
    		$recordArray[ $recordObject->type ][ 'id' ] = $recordObject->Id;
    	}
    	foreach( $recordObject->fields as $key => $field )
    	{
    		if( is_object( $field ) )
    		{
    			$subRecord = $this->__getRecordData( $field );
    			foreach( $subRecord as $key => $value )
    			{
    				// Add to array of sub records
    				if( array_key_exists( $key, $recordArray[ $recordObject->type ] ) )
    				{
    					// Checks to see if this is already an associatie array
    					if( is_assoc( $recordArray[ $recordObject->type ][ $key ] ) )
    					{
    						$first = $recordArray[ $recordObject->type ][ $key ];
    						$recordArray[ $recordObject->type ][ $key ][] = $first;
    					}
    					$recordArray[ $recordObject->type ][ $key ][] = $value;
    				}
    
    				// Create new subrecord
    				else
    				{
    					$recordArray[ $recordObject->type ][ $key ] = $value;
    				}
    			}
    		}
    		else
    		{
    			$key = strtolower( $key );
    			$recordArray[ $recordObject->type ][ $key ] = $field;
    		}
    	}
    	return $recordArray;
    }

::

    // Check to see if an array is associative( copied from http://php.net/manual/en/function.is-array.php )
    function is_assoc( $array )
    {
    	return ( is_array($array) and (count($array) == 0 || 0 !== count(array_diff_key($array, array_keys(array_keys($array))) )));
    }

You can then use these in your model when you get a result from
salesforce after sending it some soql

::

    function __findAccountList()
    {
    	$soql = "	SELECT Id, Name, Account.Owner.Name
    				FROM Account
    				WHERE IsDeleted = Null";
    		$result = $this->query( array( 'query', $soql ) );
    		$accounts = array();
    	foreach( $result->records as $record )
    	{
    		$account = $this->__getRecordData( $record );
    		$accounts[] = $account;
    	}
    }



.. author:: mbates
.. categories:: articles, models
.. tags:: datasource,salesforce,convert to cake array,Models


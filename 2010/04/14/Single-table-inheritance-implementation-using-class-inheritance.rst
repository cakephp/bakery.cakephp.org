Single table inheritance implementation using class inheritance
===============================================================

If you have a couple of document types that you don't want to create
individual db tables for you can put them all in a 'documents', have
an abstract Document model class and create those document types as
model classes each extending the Document class. You just need in your
documents table a column named like the TYPE_COLUMN constant declared
in this class. Disclaimer: I copied all the code form the
ExtendableBehavior
(http://bakery.cakephp.org/articles/view/extendablebehavior) but wrote
the idea as an abstract class rather than a Behavior. Some people on
IRC are already waiting for this to break in some unknown ways so use
it at your own risk! I will post updates if it breaks :)


Model Class:
````````````

::

    <?php 
    
    abstract class Document extends AppModel {
    	
    	const TYPE_COLUMN = 'type';
    	
    	var $useTable = 'documents';
    	
    	function beforeFind ($queryData=null) {
    		if (!isset($queryData['conditions'])) {
    			$queryData['conditions'] = array();
    		}
    		if (is_string($queryData['conditions'])) {
    			if (strlen(trim($queryData['conditions']))) {
    				$queryData['conditions'] = "({$queryData['conditions']}) AND ";
    			}
    			$queryData['conditions'] .= $this->alias. '.'. self::TYPE_COLUMN. ' = '. $this->alias;
    		} elseif (is_array($queryData['conditions'])) { 
    			if (!isset($queryData['conditions'][$this->alias.'.'. self::TYPE_COLUMN])) {
    				$queryData['conditions'][$this->alias. '.'. self::TYPE_COLUMN] = array(); 
    			}
    			$queryData['conditions'][$this->alias. '.'. self::TYPE_COLUMN] = $this->alias;
    		}
    		
    		return $queryData;
    	}
    	
    	function beforeSave () {
    		if (array_key_exists(self::TYPE_COLUMN, $this->_schema)) { 
                if (!isset($this->data[$this->alias])) {
                    $this->data[$this->alias] = array();
                } 
                $this->data[$this->alias][self::TYPE_COLUMN] = $this->alias; 
            } 
            return true;
    	}
    }
    
    ?>



.. author:: binarycrafts
.. categories:: articles, snippets
.. tags:: inheritance,sti,Snippets


Microsoft Windows Azure Tables Datasource
=========================================

An easy to use Datasource for Microsoft Windows Azure Tables. Azure
Tables is capable of storing an infinite amount of data with it's
design structure.
This is a DataSource file for CakePHP to utilize Microsoft's Windows
Azure Tables system. With the Azure Tables you can store terabytes of
data providing excellent scalability with virtually no cap. The only
limitation of Azure Tables is that because of how they are designed
they are not relational, however Tables are NOT limited to a specific
set of fields. Two different entity sets within a table may have
completely different fields.

Windows Azure information can be found at
`http://www.microsoft.com/windowsazure`_
To get to the point of this datasource. I found the official SDK for
PHP to connect to azure services bloated, and messy to interact with
CakePHP. Initially I tried to adapt that code to it to no avail, so
here is the Datasource, Scroll below it for usage information.

Store this file in /app/models/datasources/azure_source.php

::

    <?php

    /**
     * Microsoft Windows Azure Tables Datasource
     *
     * Datasource for Microsoft's Windows Azure Tables API
     *
     * Copyright (c) 2010 Howard Lince III
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     *
     * @author Howard Lince III
     * @license http://www.opensource.org/licenses/mit-license.php
     * @version 1.0
     */


    App::import('Core', 'HttpSocket');
    App::import('Core', 'Xml');
    class AzureSource extends DataSource {
        var $errorArray = true;

        var $_description = "Datasource for Windows Azure Storage Services";

        var $path_style = false;
        var $account_name = null;
        var $account_key = null;
        var $host_url = null;

        var $error = null;

        var $CONTENT_ATOMXML = 'application/atom+xml';

        public function __construct($config){
            parent::__construct($config);

            $this->account_name = $config['account_name'];
            $this->account_key  = $config['account_key'];
            $this->host_url     = $config['host_url'];

            if(isset($config['path_style']))
                $this->path_style   = $config['path_style'];
            else
                $this->path_style = false;
        }

        /**
         * AzureSource::merge()
         *
         * The Merge Entity operation updates an existing entity by updating the entity's properties. This operation does not replace the existing entity, as the Update Entity operation does.
         *
         * @param string $table
         * @param string $partitionKey
         * @param string $rowKey
         * @param array $fields
         * @return
         */
        function merge($table = null, $partitionKey = null, $rowKey = null, $fields = array()){
            if(is_null($table))
                return $this->_error('no table name specified');

            if(!isset($partitionKey) || !isset($rowKey))
                return $this->_error('The partitionKey or rowKey were not specified.');

            $xml = '';
            if(is_array($fields)){
                foreach($fields as $key => $value){
                    $xml .= "<d:$key>$value</d:$key>\n";
                }
            }

            $xml = $this->__buildXmlString(am($fields, array("PartitionKey" => $partitionKey, "RowKey" => $rowKey)));

            $response = $this->_request("$table(PartitionKey='$partitionKey',RowKey='$rowKey')", 'MERGE',null,$xml,$this->CONTENT_ATOMXML,array('If-Match' => "*"));

            if($response['status']['code'] == 204)
                return true;
            else
                return $this->_error($response);
        }

        /**
         * AzureSource::update()
         *
         * The Update Entity operation updates an existing entity in a table. The Update Entity operation replaces the entire entity and can be used to remove properties.
         *
         * @param string $table
         * @param string $partitionKey
         * @param string $rowKey
         * @param array $fields
         * @return bool true or false
         */
        function update($table = null, $partitionKey = null, $rowKey = null,  $fields = array()){
            if(is_null($table))
                return $this->_error('no table name specified');

            if(!isset($partitionKey) || !isset($rowKey))
                return $this->_error('The partitionKey or rowKey were not specified.');


            $xml = '';
            if(is_array($fields)){
                foreach($fields as $key => $value){
                    $xml .= "<d:$key>$value</d:$key>\n";
                }
            }

            $xml = $this->__buildXmlString(am($fields, array("PartitionKey" => $partitionKey, "RowKey" => $rowKey)));

            $response = $this->_request("$table(PartitionKey='$partitionKey',RowKey='$rowKey')", 'PUT',null,$xml,$this->CONTENT_ATOMXML,array('If-Match' => "*"));

            if($response['status']['code'] == 204)
                return true;
            else
                return $this->_error($response);

        }

        /**
         * AzureSource::delete()
         *
         * Deletes a table or entity from azure table storage
         *
         * note: to delete a table you *must* set confirmTable to true in the data array
         *
         * @param string $table Table Name
         * @param array $data accepts partitionKey, rowKey
         * @return mixed bool successful if false, bool false _error() if failed
         */
        function delete($table = null, $data = array()){
            if(is_null($table))
                return $this->_error('no table name specified');

            extract($data);

            if(!isset($partitionKey) && !isset($rowKey) && $confirmTable == true){
                $response = $this->_request("Tables('$table')", "DELETE",null,null,$this->CONTENT_ATOMXML);
                if($response['status']['code'] == 204)
                    return true;
                else
                    return $this->_error($response['parsed']);
            }else{
                $path = '';
                if(isset($partitionKey))
                    $path = "PartitionKey='$partitionKey'";

                if(isset($rowKey))
                    $path .= (strlen($path) > 0?",":null) . "RowKey='$rowKey'";

                $path = "$table($path)";

                $response = $this->_request($path,"DELETE",null,null,null,array("If-Match" => "*"));
                if($response['status']['code'] == 204)
                    return true;
                else
                    return $this->_error($response['parsed']);
            }
        }

        /**
         * AzureSource::read()
         *
         * Reads Entities from a Table
         *
         * @param string $table
         * @param array $data accepts the following partitionKey, rowKey, filter, limit, NextPartitionKey, NextRowKey
         *
         * @return mixed: If both partitionkey and rowkey are supplied it reacts as if a Find:First was performed and returns the properties of one row, otherwise it returns an array; array($tableName => $entities)
         *
         */
        function read($table = null, $data = array()){
            if(is_null($table))
                return $this->_error('no table name specified');

            extract($data);

            $path = '';
            if(isset($partitionKey))
                $path = "PartitionKey='$partitionKey'";

            if(isset($rowKey))
                $path .= (strlen($path) > 0?",":null) . "RowKey='$rowKey'";

            $path = "$table($path)";

            $qArray = array();

            if(isset($filter))
                $qArray[] = "\$filter=$filter";
            if(isset($limit))
                $qArray[] = "\$top=$limit";

            if(isset($NextPartitionKey))
                $qArray[] = "NextPartitionKey=$NextPartitionKey";
            if(isset($NextRowKey))
                $qArray[] = "NextRowKey=$NextRowKey";

            $query = "?".implode("&",$qArray);

            $response = $this->_request($path,'GET',$query);

            $continuation = array();

            foreach($response['header'] as $header => $value){
                $header = strtolower($header);
                switch($header){
                    case 'x-ms-continuation-nextpartitionkey':
                        $continuation['PartitionKey'] = $value;
                        break;
                    case 'x-ms-continuation-nextrowkey':
                        $continuation['RowKey'] = $value;
                        break;
                    case 'x-ms-continuation-nexttablename':
                        $continuation['TableName'] = $value;
                        break;
                }
            }

            $continuation = array("Next" => $continuation);

            if($response['status']['code'] == 200)
               if(isset($response['parsed']['Entry']) || !isset($response['parsed']['Feed']['Entry'][0])){
                    if(isset($rowKey) && isset($partitionKey))
                        return array_merge(array($table => $response['parsed']['Entry']['Content']['Properties']), $continuation);
                    else{
                        if(isset($response['parsed']['Feed']))
                            $response['parsed'] = $response['parsed']['Feed'];

                        return array_merge(array($table => array(0 => $response['parsed']['Entry']['Content']['Properties'])), $continuation);
                    }

                }else{
                    $return = array();

                    foreach($response['parsed']['Feed']['Entry'] as $entry){
                        $return[] = $entry['Content']['Properties'];
                    }

                    return array_merge(array($table => $return), $continuation);
                }
            else
                return $this->_error($response['parsed']);
        }

        /**
         * AzureSource::create()
         *
         * Creates a table if PartitionKey or RowKey aren't specified, if they are - inserts a single entity into the table
         *
         * @param mixed $table Table Name
         * @param mixed $partitionKey Partition Key
         * @param mixed $rowKey Row Key
         * @param mixed $fields Array of fields to be posted
         * @return bool true if successful, bool false _error() if there is an error
         */
        function create($table = null, $partitionKey = null, $rowKey = null, $fields = array()){
            if(is_null($table))
                return $this->_error("No table name was specified.");

            if(is_null($partitionKey) || is_null($rowKey)){
                if(!$this->tableExists($table)){
                    $xml = $this->__buildXmlString(array("TableName" => $table));

                    $response = $this->_request("Tables", "POST", null, $xml, $this->CONTENT_ATOMXML);

                    if($response['status']['code'] == 201)
                        return true;
                    else
                        return $this->_error($response['parsed']);
                }else{
                    return $this->_error("the partionKey, rowKey or both were not specified and this table already exists.");
                }
            }else{
                $xml = $this->__buildXmlString(am($fields, array("PartitionKey" => $partitionKey, "RowKey" => $rowKey)));

                $response = $this->_request($table, "POST", null, $xml, $this->CONTENT_ATOMXML);
                if($response['status']['code'] == 201)
                    return true;
                else
                    return $this->_error($response['parsed']);
            }
        }

        /**
         * AzureSource::tableExists()
         *
         * references tableInfo to see if a table exists.
         *
         * @param mixed $table Table Name
         * @return bool true if table exists, bool false if table doesn't exist, or bool false from _error() result if table isn't specified.
         */
        function tableExists($table = null){
            if(is_null($table))
                return $this->_error("No table name was specified.");

            $tableInfo = $this->tables($table);
            if(isset($tableInfo['Error']))
                return false;
            else
                return true;
        }

        /**
         * AzureSource::tables()
         *
         * Returns a list of tables if $table is left blank, otherwise information regarding the specified table is returned.
         *
         * @param string $table
         * @return array Result of _request
         */
        function tables($table = null){
            if(isset($table)){
                $response = $this->_request("Tables('$table')");
                return $response['parsed'];
            }else{
                $response = $this->_request("Tables");
                return $response['parsed'];
            }

        }

        function __buildXmlString($fields = array()){
            $items = array();
            foreach($fields as $key => $item){
                $items["d:$key"] = $item;
            }

            $xml = new Xml(array(
                'Entry' => array(
                    'title' => null,
                    'updated' => gmdate("Y-m-d\TH:i:s.u\Z"),
                    'author' => array('name' => null),
                    'id' => null,
                    'content' => array( 'm:properties' => $items)
                )
            ), array('format' => 'tags',
                'namespaces' => array(
                    'd' => 'http://schemas.microsoft.com/ado/2007/08/dataservices',
                    'm' => 'http://schemas.microsoft.com/ado/2007/08/dataservices/metadata',
                    ''  => 'http://www.w3.org/2005/Atom'
            )));

            $xml = $xml->toString(array('cdata' => true, 'header' => true, 'whitespace' => false));
            $xml = str_replace("xmlns:=", "xmlns=",$xml);
            $xml = str_replace("<content>", '<content type="application/xml">', $xml);

            return $xml;
        }


        function _request($path = null, $verb = 'GET', $query = null, $content = null, $contentType = null, $addtlheader = array()){
            if(is_array($path))
                $path = implode("/", $path);

            $host = $this->account_name.".".$this->host_url;
            if($this->path_style){
                $host = $this->host_url;
                $path = $this->account_name . "/" . $path;
            }

            $canonicalizedResources = "/".$this->account_name;
            if($this->path_style)
                $canonicalizedResources .= "/".$this->account_name;
            $canonicalizedResources .= "/".$path;

            $date = gmdate('D, d M Y H:i:s', time()) . ' GMT';
            $stringToSign = "$date\n$canonicalizedResources";
            $signedString = base64_encode(hash_hmac('sha256', $stringToSign, base64_decode($this->account_key), true));

            $header = array("date" => $date,"Authorization" => "SharedKeyLite ".$this->account_name.":".$signedString);

            if(!is_null($content)){
                if(!is_null($contentType))
                    $header = array_merge($header,array('Content-Type' => $contentType));
                else
                    $header = array_merge($header,array('Content-Type' => $this->CONTENT_ATOMXML));
            }

            $httpSocket = new HttpSocket();
            $httpSocket->reset();

            $request = array(
                'method' => $verb,
                'header' => array_merge($header, $addtlheader),
                'uri' => array(
                    'host' => $host,
                    'port' => 80,
                    'path' => $path,
                    'query'=> $query
                    )
                );

            if(isset($content))
                $request = array_merge($request, array('body' => $content));

            $response = $httpSocket->request($request);
            $response = $httpSocket->response;

            $xml = new Xml($response['body']);
            $response['parsed'] = $xml->toArray();
            return $response;
        }


        /**
         * AzureSource::_error()
         *
         * returns bool false and calls debug to show what went wrong.
         *
         * @param mixed $message
         * @return
         */
        private function _error($message = null){
            debug($message);
            return false;
        }

        public function describe($model){ return $this->_description; }
        public function listSources(){ return array('table.core.windows.net', 'blob.core.windows.net', 'queue.core.windows.net'); }
    }

    ?>


In /app/database.php add this line, and configure it as necessary.

::


    <?php
    var $azure = array(
         'datasource' => 'azure',
         'account_name' => '',
         'account_key'  => '',
         'host_url'     => 'table.core.windows.net',
         'path_style'   => false
      );
    ?>

Set path_style to true if you are using the local development tools,
otherwise leave it to false

and finally, how to implement the datasource.

Controller Class:
`````````````````

::

    <?php
       App::import('Core', 'ConnectionManager');
       $this->AzureTable = ConnectionManager::getDataSource("azure");
    ?>

$this->AzureTable can be changed out as you see fit, but it is what
will be used for the examples through this page;

::


    <?php

    //Retrieve a list of tables
    //returns an array of tables
    $this->AzureTable->tables();

    //Retrieve information about a specific table
    //returns an array of information regarding the table
    $this->AzureTable->tables('tableName');

    //Check if a table exists
    //returns true or false
    $this->AzureTable->tableExists('tableName');

    //Create a table
    //returns true or false
    $this->AzureTable->create('tableName');

    //Create an entity
    //returns true or false
    $this->AzureTable->create('tableName','partitionKey','rowKey',array("field1" => "somevalue", "foo" => "bar"));

    //List entities within a table
    //returns an array of entities array('tableName' => array(entities));
    $this->AzureTable->read('tableName');

    //Find one specific entity. Similar to cake's find('first') function on models.
    //returns an array, array('tableName' => array(entityProperties)) or false if none found.
    $this->AzureTable->read('tableName', array('partitionKey' => "pk", 'rowKey' => "rk"));

    //Limit the number of results in a search, this only returns 5 results
    $this->AzureTable->read('tableName', array('partitionKey' => "pk", "limit" => 5));

    //!!!
    //For more information about read() please read more below the code section
    //!!!


    //delete a table
    //returns true or false
    $this->AzureTable->delete('tableName', array('confirmTable' => true));

    //Delete an entity
    //returns true or false
    $this->AzureTable->delete('tableName', array('partitionKey' => "...", "rowKey" => "..."));

    //Update an entity: !NOTE! The Update Entity operation updates an existing entity in a table. The Update Entity operation replaces the entire entity and can be used to remove properties.
    //returns true or false
    $this->AzureTable->update('tableName', "partitionKey", "rowKey", array(fields));

    //Merge an entity: The Merge Entity operation updates an existing entity by updating the entity's properties. This operation does not replace the existing entity, as the Update Entity operation does.
    //returns true or false
    $this->AzureTable->merge('tableName', "partitionKey", "rowKey", array(fieldsToUpdate));

    ?>

Reading Entities Cont..(from the code section)
the read entity function accepts the following key values:
partitionKey, rowKey, filter, limit, NextPartitionKey, NextRowKey


#. partitionKey specifies the partition to search for entities
#. rowKey specifies the row key of a search
#. use filter to further specify search details, details on using
   filter can be found at `http://msdn.microsoft.com/en-us/library/dd541344(PROT.10).aspx`_
   please note: you should use filter
   as a last resort, try to use the table, partitionkey and rowkey for
   all of your finding needs
#. limit sets the number of entries that should return with a specific
   query
#. NextPartitionKey and NextRowKey are supplied in returns for
   pagination if there are more results than the current limit provides.
   They're in the return array

::


    <?php
    array(
      [tableName] => results,
      [Next] => array(
          "PartitionKey" => "...",
          "RowKey" => "...",
          "TableName" => "..."
      )
    )
    ?>



Final Notes A rowKey is the index of an entity and should be the only
method when searching for an entity under a partitionkey. While this
is true however you can use the filter function to finetune your
search - just know it does take more time to process, and because of
this it could incur additional fees (albeit potentially small) due to
more processor usage. When designing your tables design them smart so
that all you need to find your information is
Table:PartitionKey:RowKey. Row Keys are unique per Partition Key as
well.

Another important thing to point out is that the amount of content per
Partition Key should be limited in some factor. Each Partition Key is
much like a database of it's own and must remain in the same area.
This means when one Partition Key picks up too much information it
could result in any information within that Partition Key being slow
to interact with. Ideally you should find a good common ground for
partition keys, for example:

Table:PartitionKey:RowKey
Users:AccountName :Profile respectively

This would result in all of one users account information being stored
in one spot, but your entire Users Table might be store across
multiple servers for maximum scalibility.

Any two rows within a table do not have to have the same fields
either. While User A may store a username and address, User B may
store their favorite movies, or games in addition to the username and
address.

Big advantages behind tables is their scalibility, lack of requirement
for strict fields, and all data stored on Azure is backed up three
times to prevent loss of data.

This system does not handle blobs or queues at this time, check back
later and I may have an update version just for that.

Best of luck.

.. _http://www.microsoft.com/windowsazure: http://www.microsoft.com/windowsazure
.. _http://msdn.microsoft.com/en-us/library/dd541344(PROT.10).aspx: http://msdn.microsoft.com/en-us/library/dd541344(PROT.10).aspx

.. author:: Howard
.. categories:: articles, models
.. tags:: tables,datasource,azure,Models


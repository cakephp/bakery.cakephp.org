Cakephp V2 without a database (Fixed)
=====================================

This bug has now been fixed https://github.com/cakephp/cakephp/commit/
6aa08b5f52955d15fb7e44ed28efcd8156c958d2

A very simple explanation on how to get around the topical bug in
CakePHP V2 and use it without a database.

When you want to use CakePHP without a database create the file
/app/Model/Datasource/DummySource.php with the following content

::

    
    class DummySource extends DataSource {
    
        function connect() {
            $this->connected = true;
            return $this->connected;
        }
    
        function disconnect() {
            $this->connected = false;
            return !$this->connected;
        }
    
        function isConnected() {
    
            return true;
        }
    
    }

Next update your /app/Config/database.php file altering the ‘default’
array to include a datasource that reads

::

    
    'datasource' => 'DummySource'

Don’t forget, for every model you create include the property

::

    
    $useTable = false

That’s all folks.



.. author:: Primordial
.. categories:: articles
.. tags:: no database,Articles


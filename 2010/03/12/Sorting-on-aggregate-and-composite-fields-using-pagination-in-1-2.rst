Sorting on aggregate and composite fields using pagination in 1.2
=================================================================

While it may not be a common problem, I ran into this while working on
a simple website I was building, and have recieved permission to share
it with the community. I had a paginated table, and wanted a SUMed
column to support sorting. This is how I did it. Note that the coming
release of CakePHP 1.3, has an awesome feature known as Virtual Fields
[url]http://book.cakephp.org/view/1608/Virtual-fields[/url], which are
far superior to this little trick.
The first step was to disable CakePHP's field check for the field in
question, let's call it `sum`. So, I added

::

    function hasField($name) {
        if ($name === 'sum') {
            return true;
        }
        return parent::hasField($name);
    }

to my model. This reveals a second step - now that Cake has been
tricked into thinking that field is in the table, it specifies the
table name. To remove it, I created the paginate() method in my model,
as seen below:


Model Class:
````````````

::

    <?php 
    class DemoModel extends AppModel {
        var $name = 'Demo';
        
        function hasField($name) {
            if ($name === 'sum') {
                 return true;
            }
            return parent::hasField($name);
        }
        
        function paginate($conditions, $fields, $order, $limit, $page, $recursive, $extra) {
            // Perform an in-place key replacement, preserving order
            if (isset($order['Demo.sum'])) {
                $keys = array_keys($order);
                $vals = array_values($order);
                if( ($index = array_search('Demo.sum', $keys)) !== false) {
                    $keys[$index] = 'sum';
                }
                $order = array_combine($keys, $vals);
            }
            
            $type = 'all';
            if (isset($extra['type'])) {
                $type = $extra['type'];
            }
            
            $parameters = compact('conditions', 'fields', 'order', 'limit', 'page');
            if ($recursive != $this->recursive) {
                $parameters['recursive'] = $recursive;
            }
            $results = $this->find($type, array_merge($parameters, $extra));
            return $results;
        }
    }
    ?>

It's not a cut and paste solution, but hopefully helps others with
this same task. When CakePHP 1.3 is released it will be easier to just
use a virtual field.


.. author:: michaelc
.. categories:: articles, tutorials
.. tags:: pagination,paginate,fields,composite,aggregate,Tutorials


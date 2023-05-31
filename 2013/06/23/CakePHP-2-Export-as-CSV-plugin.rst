CakePHP 2 Export as CSV plugin
==============================

The Export as CSV plugin takes the results of a Model find('all')
call, including nested belongsTo associations, flattens the resulting
array, and exports it as a CSV.

Exporting a flat keys/values array as a CSV is pretty simple.

Exporting the results of a Model find('all') call, when there are
multiple nested belongsTo associations, when not every association
exists for every record, etc. is a bit more complex.

This plugin flattens out such an array and exports it as CSV.

Source and documentation available on GitHub:
`https://github.com/joshuapaling/CakePHP-Export-CSV-Plugin`_


Example Usage
-------------

::

    var $components = array('Export.Export');

    public function export_data() {
        $data = $this->MyModel->find('all');
        $this->Export->exportCsv($data);
    }



Options
~~~~~~~

The `exportCsv()` function has 5 params:

#. `$data` - an array of data to export. This array should be of the
   format returned by a call to $this->MyModel->find('all');
#. `$fileName` (optional) - the name of the file to download. If
   blank, it will use a date-stamped name like export_2013-09-24.csv
#. `$maxExecutionSeconds` (optional) - if set, this will change the
   PHP max_execution_time. Useful when dealing with large amounts of
   data.
#. `$delimiter` (optional) - The delimiter for your CSV. Defaults to
   comma (,).
#. `$enclosure` (optional) - The enclosure for your CSV. Defaults to
   double-quote (").



Example input / output
----------------------

Lets say City `belongsTo` State, which `belongsTo` country. You might
fetch data from the City model looking something like this:

::

    array(
        0 => array(
            'City' => array(
                'name' => 'Sydney',
                'population' => '4.6m'
            ),
            'State' => array(
                'name' => 'NSW',
                'Country' => array(
                    'name' => 'Australia',
                )
            )
        ),
        1 => array(
            'City' => array(
                'name' => 'Melbourne',
                'population' => '4.1m'
            ),
            'State' => array(
                'name' => 'VIC',
                'Country' => array(
                    'name' => 'Australia',
                )
            )
        ),
    )

And the export component will output a CSV like this:

<table cellpadding="7" > <tr> <th>City.name</th>
<th>City.population</th> <th>State.name</th>
<th>State.Country.name</th> </tr> <tr> <td>Sydney</td> <td>4.6m</td>
<td>NSW</td> <td>Australia</td> </tr> <tr> <td>Melbourne</td>
<td>4.1m</td> <td>VIC</td> <td>Australia</td> </tr></table>


License
-------

MIT - `https://opensource.org/licenses/MIT`_


.. _https://opensource.org/licenses/MIT: https://opensource.org/licenses/MIT
.. _https://github.com/joshuapaling/CakePHP-Export-CSV-Plugin: https://github.com/joshuapaling/CakePHP-Export-CSV-Plugin

.. author:: joshua.paling
.. categories:: articles, components
.. tags:: component,export,csv,Components


FileStorage plugin with optional Image Processing
=================================================

This plugin is giving you the possibility to store files in virtually
any kind of storage backend. This plugin is wrapping the Gaufrette
library (https://github.com/KnpLabs/Gaufrette) library in a CakePHP
fashion and provides a simple way to use the storage adapters through
the StorageManager class. Storage adapters are an unified interface
that allow you to store file data to your local file system, in
memory, in a database or into a zip file and remote systems. There is
a database table keeping track of what you stored were.


Adapters
~~~~~~~~

Included storage adapters through the Gaufrette vendor lib are

::

    Local File System
    Amazon S3
    ACL Aware Amazon S3
    Mogile FS
    Rackspace Cloudfiles
    Zip File
    Ftp
    Sftp
    In Memory
    Grid FS
    Apc
    Doctrine DBAL

You can always write your own adaper or extend and overload existing
ones.

::

    StorageManager::config('Local', array(
        'adapterOptions' => array(TMP, true),
        'adapterClass' => '\Gaufrette\Adapter\Local',
        'class' => '\Gaufrette\Filesystem'));

0
To configure adapters use the StorageManager::config method. First
argument is the name of the config, second an array of options for
that adapter
B0x1A1
To invoke a new instance using a before set configuration call:

::

    $Adapter = StorageManager::adapter('Local');

You can also call the adapter instances methods like this

::

    StorageManager::adapter('Local')->write($key, $data);

Alternativly you can pass a config array as first argument to get an
instance using these settings that is not in the configuration.

To delete configs and by this the instance from the StorageManager
call

::

    StorageManager::flush('Local');

If you want to flush *all* adapter configs and instances simply call
it without the first argument.


How to store an uploaded file
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The basic idea of this plugin is that files are always handled as
separate entities and are associated to other models.

So for example let's say you have a Report model and want to save a
pdf to it, you would then create an association lile:

::

    public $hasOne = array(
        'PdfFile' => array(
            'className' => 'FileStorage.FileStorage',
            'foreignKey' => 'foreign_key'));

In your add/edit report you would have something like:

::

    echo $this->Form->input('Report.title');
    echo $this->Form->input('PdfFile.file');
    echo $this->Form->input('Report.description');



Now comes the crucial point of the whole implementation:
````````````````````````````````````````````````````````

Because of to many different requirements and personal preferences out
there the plugin is *not* automatically storing the file. You'll have
to customize it a little but its just a matter for a few lines.

Lets go by this scenario inside the report model, assuming there is an
add() method:

::

    $this->create()
    if ($this->save($data)) {
        $key = 'your-file-name';
        if (StorageManager::adapter('Local')->write($key, file_get_contents($this->data['PdfFile']['tmp_name']))) {
            $this->data['PdfFile']['foreignKey'] = $this->getLastInsertId();
            $this->data['PdfFile']['model'] = 'Report';
            $this->data['PdfFile']['path'] = $key;
            $this->data['PdfFile']['adapter'] = 'Local';
        }
    }

Later, when you want to delete the file, for example in the
beforeDelete() or afterDelete() callback of your Report model, you'll
know the adapter you have used to store the attached PdfFile and can
get an instance of this adapter configuration using the
StorageManager. By having the path or key available you can then
simply call:

::

    StorageManager::adapter($data['PdfFile']['adapter'])->delete($data['PdfFile']['path']);

Insted of doing all of this in the model that has the files associated
to it you can also simply extend the FileStorage model from the plugin
and add your storage logic there and use that model for your
association.


Why is it done like this?
`````````````````````````

Because every developer might want to store the file at a different
point or apply other operations on the file before or after it is
store. Based on different circumstances you might want to save an
associated file even before you created the record its going to get
attached to, in other scenarios like in this documentation you want to
do it after.

The $key is also a key aspect of it: Different adapters might expect a
different key. A key for the Local adapter is usally a path and a file
name under which the data gets stored. Another adapter might require a
UUID. That is also the reason why you use `file_get_contents()`
instead of simply passing the tmp path as it is.


Download
~~~~~~~~

You can get the plugin from `https://github.com/burzum/FileStorage`_

I consider it as stable, I've used it for some time now without issue,
we have it used in an internal CakeDC project without issues and I
have not received a bug report yet from the 13 followers at this time.

If you find bugs or have suggestions please use the git issue tracker
to report them.


.. _https://github.com/burzum/FileStorage: https://github.com/burzum/FileStorage

.. author:: burzum
.. categories:: articles, plugins
.. tags:: plugin,upload,Files,file,amazon,image processing,storage,Plugins


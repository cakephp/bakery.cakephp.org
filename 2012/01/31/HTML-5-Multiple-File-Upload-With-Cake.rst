HTML 5 Multiple File Upload With Cake
=====================================

A quick tutorial on how to use HTML5's multiple file upload with
CakePHP

With HTML5 comes the ability to select multiple files using a regular
file input field.

It took me a little while to work out how to do this so I thought I'd
post it here.

To start with we are trying to get html similar to this using the cake
input helper.

::

    <input name='uploads[]' type=file multiple>

To achieve this we need to use the Form helper as so:

::

    <?php
    echo $this->Form->create('Model', array('type' => 'file'));
    echo $this->Form->input('files.', array('type' => 'file', 'multiple'));
    echo $this->Form->end('Upload');
    ?>

From the controller inspecting the $this->data property will give us
something like this:

::

    Array
    (
        [Model] => Array
            (
                [files] => Array
                    (
                        [0] => Array
                            (
                                [name] => 20120112_153642.jpg
                                [type] => image/jpeg
                                [tmp_name] => E:\wamp\tmp\phpD71.tmp
                                [error] => 0
                                [size] => 1922765
                            )
                        [1] => Array
                            (
                                [name] => 20120112_153845.jpg
                                [type] => image/jpeg
                                [tmp_name] => E:\wamp\tmp\phpD81.tmp
                                [error] => 0
                                [size] => 1122957
                            )
            )
    )

You can then loop through the files array and process them as usual.



.. author:: veganista
.. categories:: articles, snippets
.. tags:: html5 multiple file upload,Snippets


Simple Revisionable behavior with CakePHP 1.3
=============================================

I've wanted to do revisioning in cake for some time. I've taken a look
at others solution and it just seemed to complicated, required a
shadow table for each model you wanted revisioning on, didn't grab
related data(HABTM) and in the end I couldn't get it to work with the
current version of CakePHP (1.3.x). So as with all things opensource,
if you can can't find what you need already done, then write your own!
The behavior is built into a plugin because it also has an simple
model(table) that it uses to store revisions for all the other tables.
The idea is that when ever you update your table this behavior will
jump in, grab the current copy of the data and save it to the
revisions table with the current timestamp. It then adds a few
functions to your model you’ve added the behavior on to make sure it
can see the previous behaviors.

> One of the best features of this plugin is that it will store
multiple models revisions all in the same table.<br >
I’ve written this for CakePHP 1.3.x so it make not work with older or
newer versions. Let me know if you have any questions or feedback

You may now be asking your self, where can one find such a fine piece
of code? As with most of my code it resides on github
`https://github.com/analogrithems/revisionable`_

So far it is very simple, all you have to do add re-visioning to your
models is add the revisionable behavior to your plugin.

Setup
1) First you need to add the table to your project use the following
to generate that
cake schema create Revisionable.revision

2) add the behavior to your model like so

var $actAs = array('Revisionable.Revisionable');
SOME CONFIGURE OPTIONS

If you already have a table named revisions in your project and need
to call the it something else then
make a new table/model in your project that has the same schema as
this plugin and pass that model name
to the actAs setup like so

var $actAs('Revisionable.Revisionable'=>array('revisionableModel'=>$ne
wModelName));
TO DO

So far aside from creating a revision everytime the data changes the
only other feature of this plugin
is the listRevisions function. It works like this

$revisions = $this->Model->listRevisions($this->Model->id);

print_r($revisions);
array(
'2011-12-05 01:01:01'=> array(
'Pages' => array(
'id'=> '4edd8cc3-a628-490b-8cbf-6435ac1005e9',
'name'=> 'foobar',
'body'=> '....'
)
)
);
Need to create some more functions that add to this, like a a restore
where you pass the id & date and
it will do a restore and perhaps a diff viewer. Patches are warmly
welcome.

Also I use uuid as my primaryKeys I will try to find some time to ad a
configuration option that will allow for int as the primaryKey. In all
reality, nothing really prevents this from working with int except for
the table schema, so if you just change the table schema to use int
then the rest of the plugin will follow.

.. _https://github.com/analogrithems/revisionable: https://github.com/analogrithems/revisionable

.. author:: analogrithems
.. categories:: articles
.. tags:: behavior,plugins,Revisionable,Articles


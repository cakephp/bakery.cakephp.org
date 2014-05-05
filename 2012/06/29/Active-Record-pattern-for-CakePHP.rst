Active Record pattern for CakePHP
=================================

I wanted to build a state engine with CakePHP, and I realize that I
needed a kind of Active Record pattern. So I first built a behavior
that allows me to retrieve objects in place of associative arrays.


Installation
------------
To download it: go to `https://github.com/boutinb/Active-Record-for-CakePHP`_
I have tested this only with cakePHP 2.x


+ Copy the ActiveRecordBehavior.php in your Behavior folder
+ Tell your model to use it: $actsAs = array('ActiveRecord' =>
  array())
+ When you use a find('all') or find('first) function, add the option
  'activeRecord' => true

I chose this way, because I did not want to retrieve always objects
when a find function was called. But it is possible to use it in
another way: add in the constructor of the behavior the option
'allFind' => true, and if you do not want an object after a find add
'activeRecord' => false (this possibility was not yet thouroughly
tested: i'm afraid that cake generates sometimes a 'find' call that
needs associative arrays).


How to use it
-------------

When you retrieve an object record, you can use it in this way: assume
that you have the following models:

+ Post (title, message) belongsTo Writer, hasMany Comments,
  hasAndBelongsToMany Tags
+ Writer (name) hasMany Posts, belongsTo WriterGroup
+ WriterGroup (name) hasMany Writers
+ Comment (message) belongsTo Post
+ Tag (name) hasAndBelongsToMany Posts

Call find('first') of find('all') to retrieve the posts and with one
post you can do the following:

+ $message = $post->message : this retrieves the message of the post
+ $post->message = 'Hallo' : this updates the message of the post
+ $writer = $post->Writer : this retrieves the writer ActiveRecord
  object
+ $comments = $post->Comments : this retrieves the
  ActiveRecordAssociation object

The Behavior makes a difference between belongsTo/hasOne associations
and hasMany/hasAndBelongsToMany associations:

+ with belongsTo and hasOne associations, the ActiveRecord object
  pointed by the association is retrieved, and you can use it directly:
  e.g. $post->Writer->WriterGroup->name
+ with hasMany and hasAndBelongsToMany associations, the
  ActiveRecordAssociation object is retrieved. The class of this object
  implements the IteratorAggregate, Countable and ArrayAccess interfaces
  so that you can use it as an array:

    + foreach ($post->Comments as $comment) {}
    + count($post->Comments);
    + $comments = $post->Comments; $first_comment = $comments[0];


But also, the ActiveRecordAssociation class has 3 functions:

+ $comments->add($new_comment);
+ $comments->remove($first_comment);
+ $comments->replace($first_comment, $new_comment);

In order for the developer to clearly see the difference beween the 2
kinds of associations, I advice to use a plural name for hasMany and
hasAndBelongsToMany associations, and singular name for hasOne and
belongsTo associations.


Extend ActiveRecord class
-------------------------

Per default, the object you retrieve is of the class ActiveRecord. But
you can of course extend this class for one model. Per default, the
behavior will look for a class in the subfolder Model\ActiveRecord
with name 'AR', e.g.: ARPost or ARComment (the prefix 'AR' and the
subfolder name can be changed in the bahavior constructor options). In
the file ARPost.php:

::

     `

    App::import('Model\Behavior','ActiveRecord');

    classARTPostextendsActiveRecord{
    public$var;
    publicfunctionfunc(){...}
    }

    `

If you need to use the constructor:

::

     `
    publicfunction__construct(array$record,array$options=array()){
    parent::__construct($record,$options);
    ...
    }

    `

Then you can use $post->var and $post->func() in your code.
You can also create new object:

::

     `
    $post=newARPost(array(
    'title'=>'Mytitle',
    'message'=>'OK',
    'Writer'=>$writer));

    `

Here it becomes to be quite nice: in place of telling that the
writer_id of the post should be ` $writer->id`, you can directly say `
'Writer'=>$writer` You can also do:

::

     `
    $post->Comments=array($comment);

    `

This will set automatically the ` $comment->post_id` to the right one.


Useful functions
----------------

I realize that when using hasMany (or hasOne association), when you do

::

     `

    $post->Comments->remove($comment);
    or
    $post->Comments=null;

    `

You want not only to remove the $comment from $post, but most of the
time you want to delete $comment. I thought it would be quite handy if
this is done automatically. For this, if you set in the association
definition 'deleteWhenNotAssociated' to true, the behavior will
automatically delete all records that are removed from the
association.

The behavior offers also the possibility to delete, refresh and undo
an ActiveRecord:

::

     `
    $post->delete();//deletethispostrecord
    $post->refresh();//querythevaluesofpostinthedatabase.
    $post->undo();//undoallmodificationdoneinthe$postrecord.

    `

The modifications done in the active records are not sent to the
database. This is done only when calling the save() method.
But $post->save() will only save the modification in the post record,
not in its associated records. To save all modifications you made
(explicitely and implicitely), use $post->saveAll() or
ActiveRecord::saveAll() method Morevover saveAll() takes care that the
records are saved in the right order. For example:

::

     `
    $comment=newARComment(array('message'=>'Newmessage'));
    $post=newARPost(array('title'=>'Newtitle','message'=>'NewMessage','Writer'=>$writer));
    $post->Comment=array($comment);
    ActiveRecord::saveAll();

    `

Then saveAll() takes care that $post is created first so that its id
can be set to $comment->post_id.

What is really nice with this Active Record pattern, is that you don't
need anymore to bother about the keys and how you should construct the
associated arrays to be sure that cakePHP will save correctly your
data (especially with hasAndBelongsToMany associations!)


Extending even more
-------------------

I needed also a possiblility to have subclasses of ActiveRecord. For
example I had an Action model, but I needed to define subclasses for
each kind of action. A subclass action may use a (sub) model or not.
For this I told the behavior to check whether the Model has the
function getActiveRecordProperties(), and if yes it calls it before it
builds a new ActiveRecord. This function tells the behavior what is
the real ActiveAction name it must call, with which model and with
which data. Here an example:

My model Action has a column type. This column will determine which
kind of ActiveRecord class it must call. Then in the Action model, I
have added this function:

::

     `
    publicfunctiongetActiveRecordProperties(&$record){
    $type=$record[$this->alias]['type'];
    $active_record_name='AR'.$type.'Action';
    $model=$this;
    App::import('Model\ActiveRecord',$active_record_name);
    returnarray('active_record_name'=>$active_record_name,'record'=>$record,'model'=>$model);
    }

    `

My ARAction looks like this:

::

     `
    abstractclassARActionextendsAppActiveRecord{
    abstractpublicfunctionexecute(ARUserState$user_state,$parameter);
    }

    `

The SendEmail subaction looks like that:

::

     `
    classARSendEmailActionextendsARAction{
    publicfunctionexecute(ARUserState$user_state,$parameter){
    ....
    }
    }

    `

Then if I have a record in my Action table with type 'SendEmail',
Action->find() returns an object of Class ARSendEmailAction. When
calling execute(), it will call the right one that will send an email.
Here the ARSendEmailAction uses the same model as ARAction, but if
needed I could have set it to another one.


.. _https://github.com/boutinb/Active-Record-for-CakePHP: https://github.com/boutinb/Active-Record-for-CakePHP

.. author:: brunob
.. categories:: articles
.. tags:: ActiveRecord Behavior,Articles


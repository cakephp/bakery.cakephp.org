Save HABTM data in a single simple format
=========================================

Saving data from a HasAndBelongsToMany (HABTM) relationship with
CakePHP is not the easiest part of using this framework. The main
difficulty is that the format of HABTM data is not the same wether you
want to associate existing records together (only update entries in
the join table), or create new records and also associate them (create
new records in the models table and in the join table).

When you wander out of CakePHP standards and automatically baked views
and start saving custom data (using JavaScript for example), then you
have to manually construct the data you send to your controllers and
you have complete control over its format. You thus might want to be
sure that your records and association will be saved in the right way
wether you create new records or not. The simplest way is to settle
for a format and always construct your data in the same fashion and
let models handle the data (that is their job afterall).

The data format returned by a find() is the simplest to use: you
easily have access to it in your views, and it is quite logical to use
the same data format for find() and save(). You have an index for the
main model of the find() and then an index for each associated Model.
Multiple associated models like hasMany or hasAndBelongsToMany have
subsequent subarrays for each associated entry. Building this type of
array with existing data (we have an id) or new data (there is no id
yet) is very simple. In the following example, Foo hasAndBelongsToMany
Bar:

::

     `
    array(
    'Foo'=>array(
    'id'=>'...',
    ...
    ),
    'Bar'=>array(
    (int)0=>array(
    'id'=>'...',//ExistingBar,wehaveitsid
    'name'=>'...'//Thenamemayhavebeenmodified
    ),
    (int)1=>array(
    'name'=>'...'//ThisBarwillbecreated
    )
    )
    )
    `

Then with a simple snippet of code, you can overload the
saveAssociated() function to save each instance of Bar: create new
ones (those without an id) and update existing ones. Then call the
parent saveAssociated() function from the library (you rarely want to
entirely overload functions from the library) with a nicely formated
association array (the one from our first case) to update the entries
in the join table. Copy the following code in your AppModel.php and
the trick is done!

::

     `
    publicfunctionsaveAssociated($data=null,$options=array()){
    foreach($dataas$alias=>$modelData){
    if(!empty($this->hasAndBelongsToMany[$alias])){
    $habtm=array();
    $Model=ClassRegistry::init($this->hasAndBelongsToMany[$alias]['className']);
    foreach($modelDataas$modelDatum){
    if(empty($modelDatum['id'])){
    $Model->create();
    }
    $Model->save($modelDatum);
    $habtm[]=empty($modelDatum['id'])?$Model->getInsertID():$modelDatum['id'];
    }
    $data[$alias]=array($alias=>$habtm);
    }
    }
    returnparent::saveAssociated($data,$options);
    }
    `

`Read more....`_

.. _Read more....: http://patisserie.keensoftware.com/en/pages/view/how-to-save-habtm-data-in-cakephp

.. author:: ccadere
.. categories:: articles, snippets
.. tags:: model,save,HABTM,Snippets


HABTM Add & Delete Behavior for CakePHP 2.0
===========================================

The easy way to incrementally add|delete an HABTM association records
is to use this Behavior, written by `Brandon Parise`_:
`HABTM Add and Delete Behavior (posted May 9th 2007)`_
But since it was written by the age of CakePHP v1.2, it seems to
malfunction with the current head version of CakePHP Framework, which
is 2.0.x - so I've came up with a little fixation here.



Updated Version of ExtendAssociationsBehavior for CakePHP 2.0.x
```````````````````````````````````````````````````````````````

Download
~~~~~~~~

+ `Model/Behavior/ExtendAssociations2Behavior.php`_


Patch|Diff
``````````

::


    $ diff -u old new
    --- Vendor/Model/Behavior/ExtendAssociationsBehavior.php	2012-01-10 23:31:14.000000000 +0900
    +++ Vendor/Model/Behavior/ExtendAssociations2Behavior.php	2012-01-10 23:33:57.000000000 +0900
    @@ -1,5 +1,6 @@
     <?php
    -class ExtendAssociationsBehavior extends ModelBehavior {
    +App::uses('ModelBehavior', 'Model');
    +class ExtendAssociations2Behavior extends ModelBehavior {
         /**
          * Model-specific settings
          * @var array
    @@ -44,7 +45,7 @@
                 // important to use array_unique() since merging will add
                 // non-unique values to the array.
                 $data[$assoc][$assoc] = array_unique(am($data[$assoc][$assoc], $assoc_ids));
    -            return $model->save($data);
    +            return $model->save($data, array('fieldList'=>array($assoc)));
             }

             // association doesn't exist, return false
    @@ -82,7 +83,7 @@
                     // which is the ones we want to re-save.
                     $data[$assoc][$assoc] = array_diff($data[$assoc][$assoc], $assoc_ids);
                 }
    -            return $model->save($data);
    +            return $model->save($data, array('fieldList'=>array($assoc)));
             }

             // association doesn't exist, return false
    @@ -122,7 +123,7 @@

             // unbind all models except the habtm association
             $this->unbindAll($model, array('hasAndBelongsToMany' => array($assoc)));
    -        $data = $model->find(array($model->name.'.'.$model->primaryKey => $id));
    +        $data = $model->findById($id);

             $model->recursive = $tmp_recursive;
             $model->cacheQueries = $tmp_cacheQueries;
    @@ -149,8 +150,8 @@
          */
         function unbindAll(&$model, $exceptions = array()) {
             $unbind = array();
    -        foreach($model->__associations as $type) {
    -            foreach($model->{$type} as $assoc=>$assocData) {
    +        foreach($model->_associations as $type) {
    +            foreach($model->$type as $assoc=>$assocData) {
                     // if the assoc is NOT in the exceptions list then
                     // add it to the list of models to be unbound.
                     if(@!in_array($assoc, $exceptions[$type])) {
    @@ -164,3 +165,4 @@
             }
         }
     }
    +


Usage
`````

There's no change in usage/method API:

::


    ## add
    $model->habtmAdd($assoc_name, $from_id, array($to_id1, $to_id2, ...));
    e.g. $this->Post->habtmAdd('PostsTag', 1, array(2, 3));

    ## delete
    $model->habtmDelete($assoc_name, $from_id, array($to_id1, $to_id2, ...));
    e.g. $this->Post->habtmAdd('PostsTag', 1, array(3));

    ## delete all
    $model->habtmDeleteAll($assoc_name, $from_id);

Well thats it for now, and thanks Brian for sharing such cool
behavior.


.. _Brandon Parise: http://bakery.cakephp.org/users/view/bparise
.. _Model/Behavior/ExtendAssociations2Behavior.php: http://iandeth.dyndns.org/mt/ian/archives/20120110-cakephp-extendassociations-behavior/ExtendAssociations2Behavior.txt
.. _HABTM Add and Delete Behavior (posted May 9th 2007): http://bakery.cakephp.org/articles/bparise/2007/05/09/add-delete-habtm-behavior

.. author:: iandeth
.. categories:: articles, behaviors
.. tags:: model,unbindAll,save,hasAndBelongsToMany,HABTM,behavior,Delete,update,Behaviors


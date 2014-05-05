Force saving with know primary key
==================================

At first, sorry for my bad english but i'm italian.
i'm writing this article for illustrate how to force a save instead
update when we insert in the save fields the model's primary key
value.
this workaround use the beforeSave callback.
At first time insert in the app_model this function:

> <code><span style="color: #000000"> <br
>publicfunctionbeforeSave($opt){
parent::beforeSave($opt);
if(isset($opt['id'])&&!is_null($opt['id'])){
if(!isset($this->data[$this->name][$this->primaryKey])){
$this->data[$this->alias][$this->primaryKey]=$opt['id'];
}
}
returntrue;
}

><br > so, when you make a save in your code use this:
><br > `
$this->save(
array(
'Model'=>$fields,
),
array(
'id'=>$newId
)
)
`
><br > replace $fields with the fields array but NOT INSERT IN IT THE
PRIMARY KEY FIELD. replace $newId with the know value of the primary
key. using the beforeSave validate workaround, the primary key will be
set after cake has decided to perform an insert query, because there
is not primary key set. So if we need to make an insert, but we want
to set manually the primary key value, just using this method, avoid
that cake make an update query.


.. author::
.. categories:: articles, models
.. tags:: model,hack,force save,Models


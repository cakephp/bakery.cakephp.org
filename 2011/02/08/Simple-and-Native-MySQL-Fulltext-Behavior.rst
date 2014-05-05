Simple and Native MySQL Fulltext Behavior
=========================================

I will provide you simple Fulltext behavior. It's quite a simple. We
can get it working in four steps
Copy Search behavior into `/app/models/behaviors` (it is attached or
code is below)
`
<?php

classSearchBehaviorextendsModelBehavior{

functionsearch(&$model,$q,$options=array()){

App::import('Core','Sanitize');
$q=Sanitize::escape($q);

$myopts=array('conditions'=>array(
'MATCH('.implode(",",$model->fulltext).')AGAINST("'.$q.'"INBOOLEANMODE
)'
));

$opts=array_merge_recursive($myopts,$options);

return$model->find('all',$opts);
}

}

?>
`
Modify every model, which should be fulltexted, by these lines
`
var$actsAs=array("Search");
var$fulltext=array("Model.column","Model.column2");` where
"Model.column" is your real model name and column name

Create FULLTEXT indexes on used columns in MySQL (! IMPORTANT)

Use behavior like this: `
$this->set('nodes',$this->Node->search($searchedWords));
`

It is now ready to use, any questions and notes please leave under
article. Thanks


.. author:: SMarek
.. categories:: articles
.. tags:: fulltext,behaviour,mysql,behavior,Articles


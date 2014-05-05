PaginationRecall for CakePHP 2.x
================================

Have you used PaginationRecall component with CakePHP 1.x and wonder
why it doesn't work with CakePHP 2.x? Searching for a way to keep the
page or ordering of pagination?
I changed the old PaginationRecall component of mattc so that it works
under CakePHP 2.x. Here's the changes code:

::

    
     `
    
    <?php
    /*
    *PaginationRecallCakePHPComponent
    *Copyright(c)2008MattCurry
    *www.PseudoCoder.com
    *
    *@authormattc<matt@pseudocoder.com>
    *@version2.0
    *@licenseMIT
    *Changedtocakephp2.xby
    *
    */
    
    classPaginationRecallComponentextendsComponent{
    var$components=array('Session');
    var$Controller=null;
    
    functioninitialize(&$controller){
    $this->Controller=&$controller;
    
    $options=array_merge($this->Controller->request->params,
    $this->Controller->params['url'],
    $this->Controller->passedArgs
    );
    $vars=array('page','sort','direction','filter');
    $keys=array_keys($options);
    $count=count($keys);
    
    for($i=0;$i<$count;$i++){
    if(!in_array($keys[$i],$vars)||!is_string($keys[$i])){
    unset($options[$keys[$i]]);
    }
    }
    
    //savetheoptionsintothesession
    if($options){
    if($this->Session->check("Pagination.{$this->Controller->modelClass}.options")){
    $options=array_merge($this->Session->read("Pagination.{$this->Controller->modelClass}.options"),$options);
    }
    
    $this->Session->write("Pagination.{$this->Controller->modelClass}.options",$options);
    }
    
    //recallpreviousoptions
    if($this->Session->check("Pagination.{$this->Controller->modelClass}.options")){
    $options=$this->Session->read("Pagination.{$this->Controller->modelClass}.options");
    $this->Controller->passedArgs=array_merge($this->Controller->passedArgs,$options);
    $this->Controller->request->params['named']=$options;
    }
    }
    }
    ?>
    
    
    `



.. author:: Zaphod
.. categories:: articles
.. tags:: pagination recall 2.x,Articles


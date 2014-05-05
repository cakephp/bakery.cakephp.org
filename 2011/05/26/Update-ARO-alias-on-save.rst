Update ARO alias on save
========================

After much searching through google on how to set the alias of my
ARO's using parentNode only to eventually figure out that it was a
stupid question I began to wonder why the default AclBehavior does not
set the ARO's alias on save, nor update on edit.

This is my solution.

If you look into the default AclBehavior `here`_ you can see around
line 98 to 100 that it saves all other fields relating to the ARO
except for its alias. While there are countless ways around this, I
quite like the fact that the AclBehavior nicely ties in with Auth
without too much extra code. Therefore to fix this I decided to write
my own extension to the AclBehavior that could be simply inserted into
a Model Class to fix the issue.

What I have written could quite easily be converted into its own
behavior but I will leave that as a task for the reader. Below is my
solution (it must be put in the model, I use it in both my Users and
Groups models:

::

     `
    
    /*ACLafterSaveFix,asthedefaultacl-behaviordoesnotsaveanaro'salias
    *IhavecreatedthisfunctionwhichcanbedroppedintoANYmodel.Itwill
    *hookonaftertheacl-behaviorhasfinishedandsetthecorrectalias
    *dependingonmodelused.Nomodificationrequired.
    *
    *Requires:displayFieldandnamebesetinmodel!
    *
    *Created:26thMay2011
    *Author:SimonDann
    *Version:1.0.0
    */
    functionafterSave(){
    
    $saveAro=false;
    
    if($this->getLastInsertID()){
    $saveAro=true;
    $insertId=$this->getLastInsertID();
    }else{
    if($this->data[$this->name]['id']){
    $saveAro=true;
    $insertId=$this->data[$this->name]['id'];
    }
    }
    if($saveAro==true){
    $aroRecord=$this->Aro->find('first',array('conditions'=>array('foreign_key'=>$insertId,'model'=>$this->name)));
    $aroRecord['Aro']['alias']=$this->name.'::'.$this->data[$this->name][$this->displayField];
    $this->Aro->save($aroRecord);
    }
    }
    
    `



.. _here: http://api13.cakephp.org/view_source/acl-behavior/#line-91

.. author:: carbontwelve
.. categories:: articles, snippets
.. tags:: aftersave,aro,alias,acl behavior,Snippets


ACL: Checking Permissions in Views
==================================

Setting up the Access Control Lists functionality is undoubtedly one
of the most painful tasks when programming with CakePHP. Luckily
there's a lot of help around on this subject, but what happens once
you're all set and you want let's say to include links to actions only
if the user is allowed to access the destination?

Setting up the `Access Control Lists`_ functionality is undoubtedly
one of the most painful tasks when programming with `CakePHP`_.
Luckily `there's a lot of help around on this subject`_, but what
happens once you're all set and you want let's say to include links to
actions only if the user is allowed to access the destination? Here is
a suggested solution:

We assume that we have Users that belong to Groups. First thing we
need to do is store all permission values (as booleans) in session
variables naming them like Acl.Permissions.[Controller name].[Action].
This of course has to be done when the user logs in, so in the login
function we put:

::

     `if ($user = $this->Auth->user()) {
        $userGroup = $this->User->Group->findById($user['User']['group_id']);
        $aro = $this->Acl->Aro->find('first', array(
            'conditions' => array(
                'Aro.model' => 'Group',
                'Aro.foreign_key' => $this->_user['User']['group_id'],
            ),
        ));
        $acos = $this->Acl->Aco->children();
        foreach($acos as $aco){
        $permission = $this->Acl->Aro->Permission->find('first', array(
            'conditions' => array(
                'Permission.aro_id' => $aro['Aro']['id'],
                'Permission.aco_id' => $aco['Aco']['id'],
            ),
        ));
        if(isset($permission['Permission']['id'])){
            if ($permission['Permission']['_create'] == 1 ||
                $permission['Permission']['_read'] == 1 ||
                $permission['Permission']['_update'] == 1 ||
                $permission['Permission']['_delete'] == 1) {
                	$this->Session->write(
                        'Auth.Permissions.'.$permission['Aco']['alias'],
                         true
                    );
                	if(!empty($permission['Aco']['parent_id'])){
                		$parentAco = $this->Acl->Aco->find('first', array(
                            'conditions' => array(
                                'id' => $permission['Aco']['parent_id']
                            )	
                        ));
                		$this->Session->write(
                            'Auth.Permissions.'.$permission['Aco']['alias']
                            .'.'.$parentAco['Aco']['alias'], 
                            true
                        );
                    }
                }
            }
        }
        $this->redirect($this->Auth->redirect());
    }`

These session variables needs to be cleared right after the user logs
out:

::

     `function logout() {
        $this->Session->delete('Auth.Permissions');
        $this->Session->setFlash('Good-Bye');
        $this->redirect($this->Auth->logout());
    }`

Next step is to set our Permissions helper in
/app/views/helpers/permissions.php

::

     `<?php
    class PermissionsHelper extends AppHelper {
        
        var $helpers = array('Session');
        
        function check($path){
            // assuming that allow('controllers') grands access to all actions
            if($this->Session->check('Auth.Permissions.controllers') 
            && $this->Session->read('Auth.Permissions.controllers') === true){
                return true;
            }
            if($this->Session->check('Auth.Permissions'.$path)
            && $this->Session->read('Auth.Permissions'.$path) === true){
                return true;
            }
            return false;
        }
    }`

All set. Now to check if the user is allowed to eg publish posts
because we need to know whether to include the link to posts/add or
not:

::

     `<?php if($permissions->check('Posts.add')){
        echo $html->link('Add New Post',
            array(
                'controller' => 'posts',
                'action' => 'add'
            )
        );
    } ?>`



.. _CakePHP: http://cakephp.org/
.. _Access Control Lists: http://book.cakephp.org/view/1242/Access-Control-Lists
.. _there's a lot of help around on this subject: http://groups.google.co.uk/group/cake-php/web/faq

.. author:: thanos
.. categories:: articles, code
.. tags:: acl,Code


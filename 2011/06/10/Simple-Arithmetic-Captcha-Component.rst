Simple-Arithmetic-Captcha-Component
===================================

I wrote a simple Arithmetic Captcha Component and below is the
'readme.txt' file excerpt to reuse in your project for free. you can
find the component here ~ https://github.com/hakimkal/Simple-
Arithmetic-Captcha-Component

#. Copy 'captcha.php' file to your /app/controllers/component
   directory
#. add 'Captcha' into your component variable inside the controller
   where you want to use it.
#. go to the controller action where you would want to use the captcha
   and call component methods [__init(),first_number(),second_number()].

e.g.

<?php

class DummiesController extends AppController { var
$components=array('Captcha'); function foobar() {

::

    if(!empty($this->data) )
    {
    if(($this->Captcha->getFirst() + $this->Captcha->getSecond()) == $this->data['Dummy']['captcha_result']) 
    {
    ....your code logic
    }
    else
    {
    $this->Session->setFlash('oops, You are perhaps a bot!');
    exit;
    }
    }
    else
    {$this->Captcha->__init();
    
                    $this->set('p', $this->Captcha->getFirst());
                    $this->set('q', $this->Captcha->getSecond());
    }
    
    }

} ?>

/app/views/dummies/foobar.ctp

<?php e($form->create('Dummy',array('action'=>'foobar')));
e($form->label('Dummy',array('value'=> $p .'+' $q.'='));
e($form->text('Dummy.captcha_result');

e($form->end());

you could download the component from my github link ~

`https://github.com/hakimkal/Simple-Arithmetic-Captcha-Component`_


.. _https://github.com/hakimkal/Simple-Arithmetic-Captcha-Component: https://github.com/hakimkal/Simple-Arithmetic-Captcha-Component

.. author:: hakimkal
.. categories:: articles, code
.. tags:: Abdulhakim,Simple Captcha,Le Proghrammeen,Code


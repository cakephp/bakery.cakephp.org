CakePHP 2 Captcha Component Based on Simple Math Problems
=========================================================

In reference to jnay's [Simple Math Question Captcha
Component](http://bakery.cakephp.org/articles/jnay/2010/01/20/simple-
math-question-captcha-component) for 1.2 here is a cakePHP 2 version
of the component with a bunch of additional features.


MathCaptcha Component for CakePHP 2.
====================================

Generates a basic math equation with human phrasing to prevent
automated spam. It's still very much beatable by sophisticated spam
bots but tends to prevent 99% of a website's usual spam anyways.

Updates will be published on my `code blog`_.

Inspired by and partially based on `Jamie Nay's`_ cakePHP 1.2 Math
Captcha class.

Features:
B0x1A8
Version as of this writing: 0.2


Installation
------------

Simply copy the MathCaptchaComponent into your
app/Controller/Component directory.

Make sure to include `public $components = array('MathCaptcha');` into
every Controller you want to use this from.


Usage
-----

In any controller that uses this component you can call
`$this->MathCaptcha->getCaptcha();` and it will return a randomly
generated and always differently phrased math problem.

By default the answer will automatically be saved as a session
variable and can be checked in the next step with
`$this->MathCaptcha->validate($data);` This returns true if the answer
is correct. By default the function allows loose validation, so if the
user typed "one" instead of "1" the answer will also be correct.

Finally you can also set some options when instantiating the
component. Do this by giving extra parameters in the $components, like
this:

::

    public $components = array(
        'MathCaptcha' => array(
            'setting' => 'value',
            'setting2' => 1));

Available settings with their defaults are:
B0x1A9
For more advanced options please check the documentation inside the
source code.


Example
-------

In the controller:

::

    class UsersController extends AppController
    {
        public $name = 'Users';
        public $components = array('MathCaptcha', array('timer' => 3));

        public function add() {
            $this->set('captcha', $this->MathCaptcha->getCaptcha());

        if ($this->request->is('post')) {
          $this->User->create();
          if ($this->MathCaptcha->validate($this->request->data['User']['captcha'])) {
            $this->User->save($this->request->data);
          } else {
            $this->Session->setFlash('The result of the calculation was incorrect. Please, try again.');
          }
        }
      }
    }

And in the View:

::

    // Users/add.ctp
    echo $this->Form->create('User');
    # ...
    echo $this->Form->input('captcha', array('label' => 'Calculate this: '.$captcha));
    echo $this->Form->end('Submit');




.. _Jamie Nay's: https://github.com/jamienay/math_captcha_component
.. _code blog: http://codefool.tumblr.com/

.. author:: KonstantinKo
.. categories:: articles, components
.. tags:: forms,component,captcha,captcha component,spam,spam protection,Simple Captcha,Components


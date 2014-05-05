Twitter Bootstrap style for CakePHP instantly
=============================================

If you know what twitter's bootstrapp css and Javascript Library and
how awesome is, you need to use this tiny Javascript library.
Bootstrappifier for CakePHP is a Javascript library to use Twitter
Bootstrap library with CakePHP without need of FormHelper hacks.

For instructions and download:

`http://www.mtkocak.net/?p=338`_

Direct Link:

`https://github.com/mtkocak/Cakephp-Bootstrappifier`_

For install:

#. You have to have Twitter Bootstrap configured. (cake.generic.css
   removed from default.ctp, files downloaded and included to you
   webroot/css and web root/js folders )
#. Copy cakebootstrap.js in your webroot/js folder
#. Your View/Layouts/default.ctp file must include this in head tag:

echo $this->Html->css('bootstrap.min'); //You don't need to add again
if you have this echo $this->Html->script('libs/jquery-1.6.2.min.js');

+ For any question mtkocak@gmail.com




.. _http://www.mtkocak.net/?p=338: http://www.mtkocak.net/?p=338
.. _https://github.com/mtkocak/Cakephp-Bootstrappifier: https://github.com/mtkocak/Cakephp-Bootstrappifier

.. author:: mxkocak
.. categories:: articles
.. tags:: layout,bootstrap,twitter,mtkocak,Articles


File naming and class loading changes in CakePHP 2.0
====================================================

At first we glanced at the internal structure of CakePHP 1.3 and
realized that after all these years the core needed a new
reorganization on the files , the directory structure wasn't really
hinting where each file show be located at, specially for the classes
that did not math directly into the MVC structure. With this change we
would be allowed to experiment a little with (almost) automatic class
loading for increasing the overall framework performance.


File and folder naming, the new class loader in 2.0
===================================================

In CakePHP 2.0 we rethought the way we are structuring our files and
folders. Given that PHP 5.3 is supporting namespaces we decided to
prepare our code base for adopting in a near future this PHP version,
so we adopted the `PSR-0`_ recommendation from the PHP Standards Working Group

Biggest roadblock for achieving this was maintaining some sort of
backwards compatibility in the way the classes are loaded right now,
and we definitely did not want to become a framework of huge class
prefixes, having classnames like `My_Huge_Class_Name_In_Package`. We
decided adopting an strategy of keeping simple class names while
offering a very intuitive way of declaring class locations and clear
migration path for future PHP 5.3 version of CakePHP. At first let's
highlight the main changes in file naming standard we adopted:


File names
----------

All files containing classes should be named after the class it
contains. No file should contain more than one classes. So, no more
lowercasing and underscoring you file names. Here are some examples:

::

    App::$models
    App::$behaviors
    App::$controllers
    App::$components
    App::$datasources
    App::$libs
    App::$views
    App::$helpers
    App::$plugins
    App::$vendors
    App::$locales
    App::$shells

1
This makes a lot more clear an consistent the file naming across
applications, and also avoid a few edge cases where the file loader
would get confused in the past and load files it shouldn't.


Folder Names
------------

Folder containing classes should be also CamelCased, specially when
containing classes. Think of namespaces, each folder represents a
level in the namespacing hierarchy, folders that does not contain
classes, or does not constitute a namespace on themselves, should be
lowercased

CameCased Folders

+ Controller
+ Controller/Component
+ View/Helper
+ Model/Behavior

lowercased Folder:

+ config
+ webroot
+ tmp
+ vendors



New Class Loader
----------------

Although there has been a huge refactoring in how the classes are
loaded, in very few occasions you will need to change your application
code respect the way you were used to do it. The biggest change is the
introduction of a new method in the App class

::

    App::uses('ClassName', 'PackageName');

We decided the function name to somehow remind developers it is used
like the PHP 5.3 `use` keyword, just as a way of declaring where a
classname should be located at. The first parameter of `App::uses()`
is the complete name of the class you intend to load, and the second
one, the package name (or namespace) where it belongs to. The main
difference with CakePHP 1.3's `App::import()` is that the former won't
actually import the class, it will just setup the system so when the
class is used for the first time it will be located.

Some examples on using `App::uses` when migrating from `App::import()`

+ `App::import('Controller', 'Pages')` becomes
  `App::uses('PagesController', 'Controller')`
+ `App::import('Component', 'Email')` becomes
  `App::uses('EmailComponent', 'Controller/Component')`
+ `App::import('View', 'Media')` becomes `App::uses('MediaView',
  'View')`
+ `App::import('Core', 'Xml')` becomes `App::uses('Xml', 'Utility')`
+ `App::import('Datasource', 'MongoDb.MongoDbSource')` becomes
  `App::uses('MongoDbSource', 'MongoDb.Model/Datasource')`

All classes that were loaded in the past using `App::import('Core',
$class)` will need to be loaded using `App::uses()` referring to the
correct package. See the api to locate the class in their new folder.
Some examples:

+ `App::import('Core', 'CakeRoute')` becomes `App::uses('CakeRoute',
  'Routing/Route')`
+ `App::import('Core', 'Sanitize')` becomes `App::uses('Sanitize',
  'Utility')`
+ `App::import('Core', 'HttpSocket')` becomes `App::uses('HttpSocket',
  'Network/Http')`

In contrast to how `App::import()` worked in the past, the new class
loader *will not* locate classes recursively. This led to an
impressive performance gain even on develop mode, at the cost of some
seldom used features that always caused side effects. To be clear
again, the class loader will only fetch the classes exactly in the
package you told to find it.


Defining package locations
--------------------------

Just as in previous versions, you can use `App::build()` to define
folders for loading classes. You could define one to several folders
where CakePHP should look up for classes. Some examples:

+ `App::build(array('controllers' =>
  array('/full/path/to/controllers')))` becomes
  `App::build(array('Controller' => array('/full/path/to/Controller')))`
+ `App::build(array('helpers' => array('/full/path/to/controllers')))`
  becomes `App::build(array('View/Helper' =>
  array('/full/path/to/View/Helper')))`

Just use your common sense to change your previous uses of
`App::build()`


Overriding Core Classes
-----------------------

Ever wished to replace a class in the CakePHP core with your API
compatible implementation? Well, maybe you did not that it was already
possible, but in CakePHP 2.0 it is a lot cleaner and you can override
almost every class in the framework, exceptions are the App and
Configure classes. whenever you like to perform such overriding, just
add your class to your app/Lib folder mimicking the internal structure
of the framework. Some examples to follow

+ Override the Dispatcher class, create app/Lib/Routing/Dispatcher.php
+ Override the CakeRoute class, create
  app/Lib/Routing/Route/CakeRoute.php
+ Override the Model class, create app/Lib/Model/Model.php



API changes
-----------

`App::path($package, $plugin = null)` :

+ Now supports plugins, `App::path('Controller', 'Users')` will return
  the folder location the controllers in the User plugin
+ Won't core paths anymore, it will only return paths defined in
  App::build() or default ones in app (or correspondent plugin)

`App::build()` :

+ Will not merge app patch with core paths anymore

`App::objects()` :

+ Now supports plugins, `App::objects('Users.Model')` will return the
  models in plugin Users
+ Returns array() instead of false for empty results or invalid types
+ Does not return core objects anymore, `App::objects('core')` will
  return array()
+ Returns the complete class name

App class looses the following properties, use method `App::path()` to
access their value
B0x1A1
`App::import()` :

+ No longer looks for classes recursively, it stricty uses the values
  for the paths defined in App::build()
+ Will not be able to load App::import('Component', 'Component') use
  App::uses('Component', 'Controller');
+ Using App::import('Lib', 'CoreClass') to load core classes is no
  longer possible
+ Importing a non-existent file, supplying a wrong type or package
  name, or null values for $name and $file parameters will result in a
  `false` return value
+ App::import('Core', 'CoreClass') is not loger supported, use
  App::uses() instead and let the class autoloading do the rest
+ Loading Vendor files does not look recursively in the vendors
  folder, it will also not convert anymore the file to underscored as it
  did on the past

`App::core()` :

+ First parameter is no longer optional, it will always return one
  path
+ It can't be used anymore to get the vendors paths
+ It will only accept new style package names



Contants changes
----------------

+ `LIBS` now point to the folder containing the cake core classes
+ `TEST_CAKE_CORE_INCLUDE_PATH` does not exists anymore, use `LIBS`

We hope these changes will make you development experience a lot
better and benefit from the big improvements in performance CakePHP
2.0 is bringing.


.. _PSR-0: https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-0.md

.. author:: lorenzo
.. categories:: articles
.. tags:: loading,class,2.0,Articles


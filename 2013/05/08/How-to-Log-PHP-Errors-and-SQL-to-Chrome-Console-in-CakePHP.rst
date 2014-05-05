How to Log PHP Errors and SQL to Chrome Console in CakePHP
==========================================================

PHP errors can be a obnoxious when you’re developing an XHR heavy
application with lots of JSON responses. The errors just aren’t very
readable. So today I finally decided to implement ChromeLogger in our
application here at work. This is one thing I’ve always missed since
moving away from FireFox and its excellent plugin FirePHP.

First install `ChromeLogger`_.


Setting up Chrome Logger and Error Handling
```````````````````````````````````````````

After installing the chrome plugin you’ll want to add the associated
server-side library to app/Vendor/ChromePhp/ChromePhp.php. Next create
a new file for handing errors in your CakePHP 2 project. Create a new
class at app/Lib/AppError.php and add in the following code:

::

    
    App::import('Vendor', 'ChromePhp/ChromePhp');
    //in app/Lib/AppError.php
    class AppError {
        public static function handleError($code, $description, $file = null, $line = null, $context = null) {
            ChromePhp::error('PHP Error Code '.$code.': '.$description.' '.$file.':'.$line);
        }
    }

Next adjust your core.php and bootstrap.php files as follows.

**In core.php**

::

    
     'AppError::handleError',
        'level' => E_ALL & ~E_DEPRECATED,
        'trace' => true
    ));

**In bootstrap.php**

::

    
    App::uses('AppError', 'Lib');

You’re done! For more information in AppError review the CakePHP2
documentation.


Setting up Chrome Logger For SQL Logging
````````````````````````````````````````

Since most applications we write these days are XHR heavy the standard
SQL Log CakePHP ships with is rendered useless. If you’re like me and
obsess about optimizing queries then you’ll probably want all your
queries logged to the Chrome Console. To add this functionality to
your application open up your AppController and `add the following to
your afterFilter`_.

Now just set Configure::write(‘debug’,2) when you want to see queries
exported to your Chrome Console. You’ll notice that I set all queries
that took more than 100 milliseconds to appear as warnings and
everything else as informational. Check out `my blog for more CakePHP
tutorials.`_


.. _ChromeLogger: http://craig.is/writing/chrome-logger
.. _add the following to your afterFilter: https://gist.github.com/cnizzdotcom/5707745
.. _my blog for more CakePHP tutorials.: http://blog.cnizz.com/2013/05/07/how-to-log-php-errors-and-sql-to-chrome-console-in-cakephp/

.. author:: systematical
.. categories:: articles, tutorials
.. tags:: errorhandler,sql log,chrome,chromelogger,Tutorials


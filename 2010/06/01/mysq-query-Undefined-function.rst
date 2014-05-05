mysq_query, Undefined function..!!
==================================

How to solve PHP Fatal error: Call to undefined function mysql_query()
and others buit-in functions.
Suddenly calling:

::

    
    ./cake i18n

Something horrible happened.

::

    
    PHP Fatal error: Call to undefined function mysql_query() in .../cake/libs/model/datasources/dbo/dbo_mysql.php on line 588

Come on think. What is wrong here?
May be the library is not loaded by php called from the command line.
0k let's checking the php.ini file.

Right..! The mySql module is not loaded. I have to fix this.

::

    
    ...
    extension=php_mysql.dll
    extension=php_mysqli.dll
    ...

Let's try again

::

    
    ./cake i18n

Oh no warnings appear!!!

::

    
    PHP Warning:  PHP Startup: Unable to load dynamic library './php_mysql.dll' - The specified module could not be found.
     in Unknown on line 0
    
    PHP Warning:  PHP Startup: Unable to load dynamic library './php_mysqli.dll' - The specified module could not be found.
     in Unknown on line 0

Well let's copy them to the program folder. And run it again.

::

    
    php.exe - Unable To Locate Component.
    
    This application has failed to start because LIBMYSQL.dll was not found. Re-installing the application may fix this.

Grrrrr.... One more file to copy.
0k. One more Time.



Good. Problem Solved.. :)


.. author:: _i0n
.. categories:: articles, helpers
.. tags:: error,shell,in,undefined function,Helpers


Backup your SQL database with BackupMe console application
==========================================================

BackupMe is a console script to create SQL databases dump backups for
CakePHP applications.

A shell application to create SQL databases dump backups (Tables
only!).

Download: `https://bitbucket.org/mmahgoub/cakephp-backupme/`_

This script is based upon the one written by David Walsh and published
on his blog on August 18, 2008 `http://davidwalsh.name/backup-mysql-database-php`_

Many thanks to him!


Instructions
------------

#. Download the repo and put it in your app/ folder.
#. Open up your CakePHP shell and run the command "cake backup" (You
   can use cron jobs)

This script backup all of your tables by default but you can select
specific tables by uncommenting

::

    //$tables = array('orders', 'users', 'profiles');

and filling your own table names.

+ Notice: This application uses ProgressBar Task written by Matt
  Curry. If you want to use it should be in vendors/shells/tasks
  directory otherwise please comment the lines which contains:


::

    $this->ProgressBar->start($num_fields);

    $this->ProgressBar->next();

I don't know why you wanna do that! That progress bar is awesome!
Thanks Matt!

Arguments
---------


#. Database configuration, default is "default".
#. Rows per query (less rows = less ram usage but more running time)
   default is 0 which means all rows.
#. Absolute path for the directory to save your backup, it will be
   created automatically if not found, default is app/db-backups/yyyy-mm-
   dd



Additional possible features
----------------------------
1. Upload backup using FTP.



.. _https://bitbucket.org/mmahgoub/cakephp-backupme/: https://bitbucket.org/mmahgoub/cakephp-backupme/
.. _http://davidwalsh.name/backup-mysql-database-php: http://davidwalsh.name/backup-mysql-database-php

.. author:: mmahgoub
.. categories:: articles, code
.. tags:: console shell backup database,Code


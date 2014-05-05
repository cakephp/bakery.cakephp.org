Rails Migration in Your CakePHP application.
============================================

Manage your database like a PRO :) =================================
Today I wrote something that may help you in your cakephp application.
Managing database is a pain. If you ever have used rails. Switching
between rails and cakephp I always missed the migration thingy. If you
use composer.phar then its fairly simple to use this code. And I
believe application nowdays are not bound to one programming language.
So your next application can be a hybrid application that uses Ruby
and PHP :) ..... You find the code in github.
https://github.com/rajibahmed/rake-db-migrator

Rails Less Migration =====================

Today I was wanted to use rails goodness inside of my php project. So,
I searched online found a solution somewhere. Fixed it up for any
project to use using composer.

I assume you are using tools listed below and know how to use command
line.

+ POSIX OS
+ Ruby the programming Language
+ Rake the build tool written in Ruby
+ Activerecord gem, defaults with Rails !!!!

To enable it, add this dependency to your `composer.json` file:

::

    "rajibahmed/rake-db-migrator": "dev"

Or Find it here `rajibahmed/rake-db-migrator`_

Step 1: To enable it in your application you need to create few
directories from you terminal :)

::

    $ mkdir -p db/migrate
    $ mkdir config

Note 1: You do not need to create the structure if you already have
it. Note 2: I have provided a demo database.yml configuration file
copy over to config folder.

Step 2: symlink my rake file to root of you project.

::

    $ ln -s vendor/rajibahmed/rake-db-migrator/Rakefile .

Step 3: You are done !!

So now you can use this rake file to create and migrate you configured
database. Available Rake tasks are,

::

    rake db:create    # Create the database from config/database.yml for the current DATABASE_ENV
     rake db:drop      # Drops the database for the current DATABASE_ENV
     rake db:generate  # Generate migration files
     rake db:migrate   # Migrate the database (options: VERSION=x, VERBOSE=false).
     rake db:rollback  # Rolls the schema back to the previous version (specify steps w/ STEP=n).
     rake db:version   # Retrieves the current schema version number

Now, Running

::

    rake db:generate

Will create a template file that you can use as a reference point for
writing your first migration.

Note[IMPORTANT] : Class name in a migration file must match the file
naming convention. ie.

::

    CreateUser < ActiveRecord::Migration
     # file name should be timestramp_create_user.rb
     end

You are good to go !!! This is a few hours effort. If you want to
extend it please fork it or send me emails.

LICENSE: Do whatever you want with it. I don't want money from you and
can't be held responsible any fu*k ups. Good luck !!! Simple isn't it.


.. _rajibahmed/rake-db-migrator: https://github.com/rajibahmed/rake-db-migrator/

.. author:: rajibahmed
.. categories:: articles, tutorials
.. tags:: rails,database,migration,cakep,Tutorials


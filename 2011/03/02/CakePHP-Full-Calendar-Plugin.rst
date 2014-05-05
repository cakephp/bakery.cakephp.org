CakePHP Full Calendar Plugin
============================

The CakePHP Full Calendar Plugin easily integrates the jQuery based
Full Calendar application with your CakePHP application for a slick
ajax event calendar.



WHAT IS THE CAKEPHP FULL CALENDAR PLUGIN?
-----------------------------------------

The CakePHP Full Calendar Plugin allows you to easily integrate the
jQuery based Full Calendar application with your CakePHP application
for a slick ajax event calendar.

The plugin brings the following MIT licensed software (see LICENCE)
together to create a simple and sleek experience:

+ CakePHP (`http://cakephp.org`_)

    + Required by this plugin

+ Full Calendar (`http://arshaw.com/fullcalendar`_)

    + The jQuery based Calendar

+ jQuery (`http://jquery.com`_)

    + Required by Full Calendar

+ jQuery UI (`http://jqueryui.com`_)

    + Required for draggable and resizable events

+ qTip (`http://craigsworks.com/projects/qtip`_)

    + A jQuery plugin for hover details



WHY?
----

While working on another project I needed a visual calendar for event
management for multiple users/accounts. From that project I decided to
simplify the calendar and turn it into a plugin because there didn't
appear to be a clean (easy to install and use) CakePHP Calendar plugin
out there.

In it's current form this plugin is for a single user though I plan on
creating a few associated plugins to allow for multiple users, etc.

THE INSTALLATION PROCESS
------------------------

NOTE: These instructions assume you already have a working copy of
CakePHP with a database connection on your web server.

You can read up on CakePHP installation and DB config here:
`http://book.cakephp.org/#!/view/913/Development`_ AND
`http://book.cakephp.org/#!/view/922/Database-Configuration`_


INSTALLED IN 3 SIMPLE STEPS
===========================


+ Download or fork the CakePHP Full Calendar Plugin at:
  `https://github.com/silasmontgomery/CakePHP-Full-Calendar-Plugin`_
+ Copy or upload the "full_calendar-?.??" folder to your CakePHP
  "app/plugins" directory and rename to "full_calendar".
+ Create an "events" and "event_types" table by importing the
  "full_calendar.sql" file found in the "full_calendar/config" directory
  (Using PHPMyAdmin, command-line, etc).



THAT'S IT!
==========

You should now be able to access the Full Calendar Plugin at:
http://yoursite.com/full_calendar

You should add some Event Types first. Then you can start scheduling
some Events!

Support
-------

In order to more easily provide support, please use Github for any
questions/support requests.

`https://github.com/silasmontgomery/CakePHP-Full-Calendar-Plugin`_


.. _http://book.cakephp.org/#!/view/913/Development: http://book.cakephp.org/#!/view/913/Development
.. _http://book.cakephp.org/#!/view/922/Database-Configuration: http://book.cakephp.org/#!/view/922/Database-Configuration
.. _https://github.com/silasmontgomery/CakePHP-Full-Calendar-Plugin: https://github.com/silasmontgomery/CakePHP-Full-Calendar-Plugin
.. _http://jquery.com: http://jquery.com
.. _http://jqueryui.com: http://jqueryui.com
.. _http://cakephp.org: http://cakephp.org
.. _http://craigsworks.com/projects/qtip: http://craigsworks.com/projects/qtip
.. _http://arshaw.com/fullcalendar: http://arshaw.com/fullcalendar

.. author:: silasmontgomery
.. categories:: articles, plugins
.. tags:: AJAX,calendar,jquery,jqueryui,qtip,Plugins


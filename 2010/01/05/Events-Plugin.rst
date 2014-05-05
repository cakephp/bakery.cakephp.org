Events Plugin
=============

With Events plugin, you can add and remove events from admin panel and
frontend. I have created Events plugin with full calendar (Thanks to
Adam Shaw http://arshaw.com/fullcalendar/)


Installation:
~~~~~~~~~~~~~
Once you have downloaded the plugin, unzip and place the folder
"events" into your plugins directory. Once you have done that, your
pathing should be: /app/plugins/events/.


Setting up the URL routes
`````````````````````````
If you attempt to visit the plugin by going to the url
yourdomain.com/events, you will receive a missing controller error. Do
not worry; this is correct because the actual path is /events/index.
Cake internally looks for a events controller first because of its URL
routing system. To fix this you would add the following route to your
routes.php, which in turn will route the URL /events correctly.

Router::connect('/events', array('plugin' => 'events', 'controller' =>
'events', 'action' => 'index'));


Installing the necessary database tables
````````````````````````````````````````
For the events to work, you will of course need to create the database
table. You may find the database schema within the /events/vendors
/events.sql. Once you have opened the events.sql, simply open your
database, copy and paste the schema, and finally execute the SQL
statements.


Customizing the events theme
````````````````````````````
You would need to edit the CSS style sheet located at
/events/vendors/css/ or create your own from scratch. Additionally,
you may edit the views to inject or remove HTML as you please.


Download from mentioned link
````````````````````````````
`https://github.com/navidurrahman/events-plugin`_

.. _https://github.com/navidurrahman/events-plugin: https://github.com/navidurrahman/events-plugin

.. author:: navidurrahman
.. categories:: articles, plugins
.. tags:: calendar,events,Plugins


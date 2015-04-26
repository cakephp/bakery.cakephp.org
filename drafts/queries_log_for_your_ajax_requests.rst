Queries log for your Ajax requests
==================================

Have you ever needed to look inside what's going on with your AJAX requests?

With the rise of javascript-heavy applications it is becoming a need to have
more powerful tools for inspecting and debugging asynchronous requests without
reloading the browser or checking special browser plugins.

With DebugKit latest release (3.1), inspecting XHR requests is now possible.
By default, all AJAX requests are logged into the `History` panel in your DebugKit Toolbar:

|DebugKit Ajax Panel|

By clicking on any of the logged XHR requests you will be able to see the panel
information for that specific request, including the SQL log, view variables,
logged messages and timers.

This update is immediately available for all CakePHP 3.0.x users, please update
your DebugKit installation by doing::

    composer update cakephp/debug_kit

We hope this feature will make you as happy and excited as we are. Keep baking!

.. _DebugKit: https://github.com/cakephp/debug_kit
.. |DebugKit Ajax Panel| image:: https://cloud.githubusercontent.com/assets/37621/7336823/cf13e7ee-ec0f-11e4-83e9-9448d6efe62a.gif

.. author:: lorenzo
.. categories:: articles
.. tags:: debugkit,ajax
.. comments::

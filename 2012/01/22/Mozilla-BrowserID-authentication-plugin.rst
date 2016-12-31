Mozilla BrowserID authentication plugin
=======================================

I just stumbled on Mozilla's new OpenID competitor
(http://browserid.org ) and liked it. I figured I would be albe to
implement it on my currently existing user database without any
changes, so I started a simple cake plugin for it. The result is a
simple way to enable your users to login to your cake application
using only their email address.

Please let me know what you think of my first plugin. Github page is
`https://github.com/OverFlow636/ofbid`_

Prerequisites



#. Your application should already have an authentication method
   setup, this plugin is simply designed to augment it.
#. Your AppController needs to use the Auth and Session components
#. Your server needs to support curl and ssl

To Install
B0x1A0

#. Clone ` `https://github.com/OverFlow636/Ofbid.git`_ ` into
   `/Plugin/Ofbid`
#. Load the plugin in your bootstrap.php with the bootstrap option
   true ex. `CakePlugin::load(array('Ofbid'=>array('bootstrap'=>true)));`
#. In your AppController or in the controller you would like to use
   the button add the following helper `Ofbid.Ofbid`
#. In the login view call `$this->Ofbid->loginButton()` to print the
   BrowserID login button

Configuration
B0x1A0

+ Default settings will work for many applications, but there are many
  options to customize if you require
+ All session redirect messages
+ All redirect locations
+ Optional CakeEventListener can be configured to perform user login
  logic, without having to change plugin code
+ To configure any of theese options checkout the plugins
  `bootstrap.php` for the Configure keys, and write them in your
  applications config




.. _https://github.com/OverFlow636/Ofbid.git: https://github.com/OverFlow636/Ofbid.git
.. _https://github.com/OverFlow636/ofbid: https://github.com/OverFlow636/ofbid

.. author:: overflow636
.. categories:: articles, plugins
.. tags:: AJAX,login,authentication,curl,Plugins


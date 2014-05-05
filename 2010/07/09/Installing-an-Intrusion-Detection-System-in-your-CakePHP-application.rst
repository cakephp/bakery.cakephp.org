Installing an Intrusion Detection System in your CakePHP application
====================================================================

How to install an Intrusion Detection System to protect your CakePHP
application from hackers
I though some of you may find useful my plugin implementation of
PHPIDS for CakePHP since there is no documentation available for
CakePHP 1.3 & 1.2


What is PHPIDS?
~~~~~~~~~~~~~~~

PHPIDS (PHP-Intrusion Detection System) is a state-of-the-art security
layer for your PHP based web application written by `Mario
Heiderich`_.

The IDS neither strips, sanitizes nor filters any malicious input, it
simply recognizes when an attacker tries to break your site and reacts
in exactly the way you want it to. PHPIDS is by far the best open
source Intrusion Detection System for PHP right now. Don't forget to
read its documentation to take full advantage of its power.


What does the plugin actually do?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This plugin will monitor and protect your CakePHP against web attacks.
If an attacker tries to send malicious payload to your site, the IDS
will detect, log and either warn the attacker, alert the administrator
or ban the attacker's ip according to the attack's acumulated treat.
Also remember that you can easily extend the plugin to perform
additional actions when an attack is received.

Version 0.1 of the plugin supports the following attack reactions:
Log: Logs the attack in the database or logfile.
Send alert email: Sends to the administrator an email alert containing
the attack information.
Ban attacker's IP: Bans an ip from accessing your application.


Installation instructions for Cakephp 1.2 & 1.3
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


Step 1: Download and unpack
```````````````````````````

`Download`_ and extract the plugin into your main application plugin
folder [default folder:app/plugins/]


Step 2: Set up the database table
`````````````````````````````````

Set up the following table if you would like to store the intrusion
alerts in the database.

::


    CREATE TABLE IF NOT EXISTS `phpids_intrusions` (
      `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
      `name` varchar(128) NOT NULL,
      `value` text NOT NULL,
      `page` varchar(255) NOT NULL,
      `userid` int(11) unsigned NOT NULL,
      `session` varchar(32) NOT NULL,
      `ip` varchar(15) NOT NULL,
      `reaction` tinyint(3) unsigned NOT NULL COMMENT '0=log; 1=mail; 2=warn; 3=kill;',
      `impact` int(11) unsigned NOT NULL,
      `created` datetime NOT NULL,
      `tags` varchar(50) NOT NULL,
      PRIMARY KEY (`id`)
    )

Note: The plugin also supports file logging if a database connection
is not available.


Step 3: Configure PHPIDS
````````````````````````

Open the configuration file provided by PHPIDS (default path:
app/plugins/phpids/vendors/phpids/Config/Config.ini.php) and look for
the following section:

::


    [General]
        filter_type    =xml

        base_path      =/app/plugins/phpids/vendors/phpids/
        use_base_path  =true

Set the absolute path to the folder containing the PHPIDS library (The
folder named 'phpids' inside the plugin's vendors folder. Ex.
/var/www/website/app/plugins/phpids/vendors/phpids/)

::


    [General]
        filter_type    =xml

        base_path      =/var/www/myapp/app/plugins/phpids/vendors/phpids/
        use_base_path  =true

Note: This is the minimum required configuration to run PHPIDS.
However, there are more configuration options you should learn more
about if you want to take full advantage of its features.

Next, we will configure the plugin. Look for the section named
'Cakephpids' and change the values accordingly

::


    [CakephpIDS]
        production_mode = false
        notification_email = your@email.com
        ban_duration = 30

        ;Reaction threshold
        reaction_threshold_log=3
        reaction_threshold_warn=15
        reaction_threshold_mail=50
        reaction_threshold_kill=150

Configuration options:

base_path: Absolute path to the PHPIDS library folder (Same path as in
Step 3)
notification_email: Notification Email
production_mode: Set production mode to enable IP banning
ban_duration: Ban duration in days
reaction_threshold_log: Required attack impact to log the request
reaction_threshold_mail: Required attack impact to mail the
administrator
reaction_threshold_kill: Required attack impact to ban the attacker.


Step 4: Configure your application
``````````````````````````````````

To reduce the overhead of loading the plugin for every controller, we
will only monitor actions that handle user input. Ex. Let's say you
have the following action in your Comments controller:

::


    function add() {
            if (!empty($this-]data)) {
                if ($this-]Post-]save($this-]data)) {
                    $this-]Session-]setFlash('Your post has been saved.');
                    $this-]redirect(array('action' =] 'index'));
                }
            }
        }

To start monitoring this method you to add the line
'$this-]requestAction("/phpids/phpids_intrusions/detect");' at the
beginning of the function call.

::


    function add() {
        $this-]requestAction("/phpids/phpids_intrusions/detect");
            if (!empty($this-]data)) {
                if ($this-]Post-]save($this-]data)) {
                    $this-]Session-]setFlash('Your post has been saved.');
                    $this-]redirect(array('action' =] 'index'));
                }
            }
        }



Step 5: Testing
```````````````

Finally we need to test the IDS is working properly, so open your web
browser and try to break your CakePHP application now ;). Here are
some basic attack vectors in case you don't know any ('Just copy and
paste into your input fields'):

::


    <script>alert(1)</script>
    ' OR 'X'=X
    ../../../../../../etc/passwd

If everything went fine you should see a new intrusion alert in your
logs now.



Dealing with false positives
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

PHPIDS supports the use of exceptions to deal with the false positives
some valid requests may cause. These exceptions need to be added
manually to your PHPIDS configuration file.

Open your PHPIDS configuration file and find the exceptions section.

::


        exceptions[]   =GET.__utmz
        exceptions[]   =GET.__utmc

And please `submit your false positives`_ to help PHPIDS keep getting
better.


Keeping your rules and converter up to date
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Finally, it's very important that you keep your filter rules and
converter up to date. The community behind PHPIDS is very active and
new attack vectors keep getting added every week.

Download the latest `default_filter.xml`_ and `Converter.php`_ from
their subversion repository.


Contribute
~~~~~~~~~~

Feel free to contribute any ideas and code via GitHub.


Resources
~~~~~~~~~

`PHPIDS Official Website`_
`CakePHPIDS on GitHub`_
`Download CakePHPIDS (Latest tarball)`_
`Websec Blog`_
`Installing an Intrusion Detection System in your CakePHP application`_

.. _download: http://github.com/cldrn/cakephpids
.. _CakePHPIDS on GitHub: http://github.com/cldrn/cakephpids
.. _Mario Heiderich: http://mario.heideri.ch/
.. _submit your false positives: http://demo.php-ids.org/
.. _Websec Blog: http://www.websec.ca/blog
.. _default_filter.xml: https://svn.php-ids.org/svn/trunk/lib/IDS/default_filter.xml
.. _Download CakePHPIDS (Latest tarball): http://github.com/cldrn/cakephpids/zipball/master
.. _PHPIDS Official Website: http://www.phpids.org/
.. _Installing an Intrusion Detection System in your CakePHP application: http://websec.ca/blog/view/phpids-in-cakephp.html
.. _Converter.php: https://svn.php-ids.org/svn/trunk/lib/IDS/Converter.php

.. author:: _cldrn
.. categories:: articles, tutorials
.. tags:: intrusion detection ,web security,phpids,Tutorials


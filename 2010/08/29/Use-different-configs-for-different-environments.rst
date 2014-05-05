Use different configs for different environments
================================================

Coming from Rails, I was surprised that I couldn't find any support
for multiple configuration environments in CakePHP. There were a
couple of other solutions for Cake, but I found them a bit complex for
what they try to achieve. Having said that, my method only supports
config variables, and not database configs as yet.
So, my method works in a similar way to Rails, by using an environment
variable to set the current environment (which you can set in Apache),
and loading the corresponding config file.

This means you can keep your production config in version control, and
not have to edit it on your live servers. You just deploy however you
normally would (e.g. a source checkout), and the live config is
updated - much nicer in my opinion.

To get this to work, add this to the bottom of your config/core.php :

::

    
    $env = getenv('CAKE_ENV');
    if (!$env){$env = 'production';}
    $env = strtolower($env);
    Configure::load('core-'.$env);

Then, you need to create a config file called config/core-
production.php . This should overwrite any config variables that need
to be different from the one in config/core.php . Here's an example:

::

    
    <?php
    $config['MyConfig']['something'] = 'prod';
    $config['MyConfig']['something_else'] = 'PROD';
    Configure::write('Session.cookie', 'PROD COOKIE');

Note that you have to use Configure::write if you're overwriting
things e.g. 'Session.cooke', as otherwise Cake will overwrite the
whole array (in this case 'Session')

You can add as many of those config files as you like, I just have
core-production.php and core-development.php .

The code above will default to the production config, so you don't
need to do anything on your live servers. The final thing you need to
do is to set CAKE_ENV to 'development' in your dev environment. In
Apache this looks like this:

::

    
    SetEnv  CAKE_ENV  development

There you go - nice and simple multiple config environments. I'll be
extending this to handle database configs too, but for now that's all
there is to it.


.. author:: stevena0
.. categories:: articles, snippets
.. tags:: multiple,config,Snippets


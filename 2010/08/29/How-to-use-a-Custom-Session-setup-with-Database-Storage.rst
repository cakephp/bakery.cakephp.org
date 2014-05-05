How to use a Custom Session setup with Database Storage
=======================================================

There's plenty of information out there on how to create your own
session handler for CakePHP, but when I needed to add some
customization on top of the database storage system, I had to do a
good amount of debugging and tracing to find out the best way to
accomplish it. Hopefully, this will save you some time if you're doing
the same thing.
So we all know that you can write your own custom handler for sessions
in Cake. In fact, there's an article right here in the bakery:
`http://bakery.cakephp.org/articles/view/how-to-bend-cakephp-s-session-handling-to-your-needs`_.
Store your session file, let's say
it has the name 'my_session.php' in your config directory and then set
Configure::write('Session.save', 'my_session') in your core.php. But
what happens when you need to use database sessions and do
customization?

First off, I asked for help on this topic alot, annoyingly so, and I
apologize to all those in the IRC channel that put with me. It seemed
I kept getting the same questions:

1. "Why do you need to write your own? Cake comes with that out of the
box..."

True, but I needed to do ini customization as well. For me, 'high'
security has always caused problems due to the session regeneration,
so I have to use medium. But medium causes the session cookie lifetime
to not be set to die after the browser is closed, a feature I needed
for security.

Plus, because my app is jumping from a number of different domains,
not subdomains, I needed to set the referrer check differently from
what Cake does by default. This setting isn't available at all
anywhere unless you customize the session handler.

2. "Just copy all the database stuff from cake_session.php in the core
libs and you should be fine."

Ah ha, you'd think so, but this isn't the case. There's a critical
piece in the ConnectionManager class that causes problems. I know, why
would the ConnectionManager have anything to do with sessions? Well,
it comes at the very end of the file in the __destruct method. Let's
take a look:

::


    	function __destruct() {
    		if (Configure::read('Session.save') == 'database' && function_exists('session_write_close')) {
    			session_write_close();
    		}
    	}

Before I figured out what was going on with my handler, I was getting
a string of mysqli errors on every page that had sessions. What I
found was that the mysqli connection was getting cut before the
session data had finished being written. Since I knew I had all the
pieces from the cake_session.php file that dealt with db sessions, I
knew there had to be something in the core libs I was missing. I did a
file search on Configure::read('Session.save') to see what else was
using this setting. connection_manager.php was the only other file
that had a reference. As you can see, when Session.save is set to
database, an additional function needs to be run:
session_write_close(). Why is this you ask?

In PHP5, mysql/mysqli objects get destroyed BEFORE sessions do. In
fact, all objects do. This isn't a problem for file based sessions,
but for database sessions, it means that your connection to mysql gets
cleaned and destroyed before the session has been written. The
session_write_close function makes sure that the data gets written
before that object gets destroyed.

You can probably see the problem. CakePHP's core libs basically
prevent you from being able to use a database session handler because
it looks for Session.save to be 'database'. The way we fix it is to
trick it and make it think it is set to 'database' even when we've
written a custom handler.

Here's the code (ignore that it says Helper class, just wanted some
nice formatting):


Helper Class:
`````````````

::

    <?php
    /**
     * Setup the variables needed for initializing the Session model.
     * This is a straight copy from cake_session.php.
     */
    $modelName = Configure::read('Session.model');
    $database = Configure::read('Session.database');
    $table = Configure::read('Session.table');

    if (empty($database)) {
    	$database = 'default';
    }

    $settings = array(
    	'class' => 'Session',
    	'alias' => 'Session',
    	'table' => 'cake_sessions',
    	'ds' => $database
    );
    if (!empty($modelName)) {
    	$settings['class'] = $modelName;
    }
    if (!empty($table)) {
    	$settings['table'] = $table;
    }
    /**
     * Load the Session Model.
     */
    ClassRegistry::init($settings);

    /**
     * Setup any custom ini settings needed.
     */
    if (empty($_SESSION)) {
    	if ($iniSet) {
    		ini_set('session.use_trans_sid', 0);
    		ini_set('url_rewriter.tags', '');
    		ini_set('session.save_handler', 'user');
    		ini_set('session.serialize_handler', 'php');
    		ini_set('session.use_cookies', 1);
    		ini_set('session.name', Configure::read('Session.cookie'));
    		ini_set('session.cookie_lifetime', 0);
    		ini_set('session.cookie_path', $this->path);
    		ini_set('session.auto_start', 0);
    		ini_set('session.referer_check', null);
    	}
    }

    /**
     * Tell PHP what functions to run for the various session methods.
     * This is a straight copy from cake_session.php.
     */
    session_set_save_handler(
    	array('CakeSession', '__open'),
    	array('CakeSession', '__close'),
    	array('CakeSession', '__read'),
    	array('CakeSession', '__write'),
    	array('CakeSession', '__destroy'),
    	array('CakeSession', '__gc')
    );

    /**
     * The trick: tell Cake that we're actually using database session handling
     * from this point on.
     */
    Configure::write('Session.save', 'database');
    ?>

Wait...how does this actually work? It works like this: Cake only sets
the ini settings the first time the session is initiated. Once those
are set and the session is started, all that the CakeSession model
does is handle data. So once we've setup our session and told it which
save handlers to use, we tell Cake we're actually using 'database'
sessions from this point on. This allows ConnectionManager to
correctly write session data during the __destruct method and we still
get our custom ini settings.

While trying to get help with this, I got a lot of people saying to
write a Session component or copy the Cake files from core and edit
them as needed. That just seems hacky to me. This method is kind of
hacky as well, but it keeps core untouched and allows you to use
built-in components and helpers.

.. _http://bakery.cakephp.org/articles/view/how-to-bend-cakephp-s-session-handling-to-your-needs: http://bakery.cakephp.org/articles/view/how-to-bend-cakephp-s-session-handling-to-your-needs

.. author:: PHPdiddy
.. categories:: articles, tutorials
.. tags:: database,sessions,custom session,Tutorials


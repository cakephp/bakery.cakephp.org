Minify and Gzip plugin for your Javascript
==========================================

Hi, I wanted to share a solution to a problem I had with excessive
javascript file size in some of my more ambitious projects. I may be
reinventing the wheel here, but I had a very specific set of goals in
mind and I wanted to do it myself. I wanted to be able to easily add
an array of file names in the controller, have it all minified,
compressed and cached and then have a simple controller able to output
the cached file at a sensible url. I took some time to think it
through and came up with the following plugin that *just works* and
can be dropped into any project with no configuration.

Update

*I recently pushed some updates to GitHub so the source will have
changed. If you experience any problems, re-download the package and
check out this article for updated instructions*

*Also, I’ve struggled to get some code recognised on this tutorial so
I will attempt to have it available on the `GitHub wiki`_ shortly as
well*

Introduction

*All the files are on my `minify Github repo`_ so you can access them
there rather than me clogging up the source here.*

The files of interest are:

+ `controllers/js_controller.php`
+ `controllers/components/minify.php`
+ `views/helpers/minify_js.php`

When starting this, you need to make sure that you add `Minify.Minify`
as items to your $helpers and $components arrays within your
controllers (or set globally within your app_controller.php) eg:

::

    var $components = array('Minify.Minify');
    var $helpers = array('Minify.Minify');

I used rgrove's `jsmin-php`_ lib to actually perform the minification
but all the Caching and concatenation is handled within the minify.php
component.

Component: `minify.php`_

To use this from within a controller (or AppController if you want to
define it globally), you need to add:

::

    var $components = array('Minify.Minify');

After this, you are able to use $this->Minify within your procedures
to have the controller process a list of javascript file paths:

::

    $this->set('minified_javascript',$this->Minify->js(array(
      'js/path/lib.js','javascript/path/shiny.js
    )));

Minify::js() accepts a single string (if you only want to minify a
single file) or an array of strings. Each file is looped through,
minified and combined until there is a single string to be cached.
After caching, this procedure will simply check the existence of the
cached file. At the end of either of these two points, it returns a
token.

The token represents a simple unique id for that combination of files
and is also used in constructing the cache filename. The returned
value above is then set to 'minified_javascript'. This is passed in to
the view:

Helper: `minify_js.php`_

Within one of your view template files (perhaps html_head.ctp,
header.ctp or even footer.ctp) you will likely have some lines of
$javascript->link() (or $this->Javascript->link() YMMV.)

You will now replace those lines, with a simple, single line:

::

    <?php echo $this->Minify->js($minified_javascript);?>

MinifyJS::link() takes the token and outputs a script tag with the
token in place within a URL:

::

    [script src="/minify/js/gz/12341234123412341234123412341234"][/script]

As long as you don't have an insane route configuration, this path
will just work. At this point, we pass to the controller:

Controller: `js_controller.php`_

At this point, we've left the logic of the application has read the
array of files, minified them, compressed them and cached them. The
view helper has outputted a nice script tag and the user's browser has
found it and is requesting it.

JsController within the minify plugin is now being passed the token
from the url:

/minify/js/gz/12341234123412341234123412341234

JsController::gz() receives the token, checks for the existence of the
cached file, sets the necessary HTTP headers:
B0x1A5
All that's left is the compressed content. It makes its way down to
the browser et voila!

Wrapping it up

I wrote it because I have a number of apps that use jQuery and some
other javascript plugins of my own design and it really adds up to a
sizeable number. Working in a development environment means that I
don't really want to work with minified files when I may occasionally
need to crack open somebody else's javascript `polyfill`_ to fix an
issue or even to fix my own javascript logic.

This is handy for development, but you may wish to switch to a
hardcoded option in production using Apache's own capabilities. That
is a simple case of setting a configuration variable, adding an if
statement to your controller and view template and you can switch
easily between the two.


.. _jsmin-php: http://github.com/rgrove/jsmin-php/
.. _minify.php: http://github.com/connrs/minify/blob/master/controllers/components/minify.php
.. _polyfill: http://remysharp.com/2010/10/08/what-is-a-polyfill/
.. _GitHub wiki: http://github.com/connrs/minify/wiki/Cake-bakery-tutorial
.. _minify_js.php: http://github.com/connrs/minify/blob/master/views/helpers/minify_js.php
.. _minify Github repo: http://github.com/connrs/minify
.. _js_controller.php: http://github.com/connrs/minify/blob/master/controllers/js_controller.php

.. author:: connrs
.. categories:: articles
.. tags:: javascript,js,plugin,Compression,JSMin,compress,gz,Articles


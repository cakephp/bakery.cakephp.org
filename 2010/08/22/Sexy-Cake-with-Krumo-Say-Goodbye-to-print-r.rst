Sexy Cake with Krumo: Say Goodbye to print_r()
==============================================

Debugging nested arrays with print_r() can be wicked tough but `Krumo`_
makes this task a little less crack-a-lackin.
To put it simply, Krumo is a replacement for print_r() and var_dump().
By definition Krumo is a debugging tool (PHP4/PHP5), which displays
structured information about any PHP variable.
---Some Poindexter @ `http://krumo.sourceforge.net/`_

Installin Dat
~~~~~~~~~~~~~

`Downlizzle`_ and extract `Krumo`_ to your vendors directory.

Directory structure should look a little something like:

-app/

-cake/

-log/

-vendors/

--krumo/

---docs/

---skins/

---class.krumo.php

---krumo.ini

---krumo.js

---krumo.php


The krumo configamajiguration file:

::


    ;
    ; KRUMO CONFIGURATION FILE
    ;

    [skin]
    selected = "schablon.com"
    ;
    ; Change the above value to set the CSS skin used to render
    ; Krumo layout. If the skin is not found, then the "default" one
    ; is going to be used. Check the skins directory for options.
    ;

    [css]
    url = ""
    ;
    ; This value is used to set the URL path to
    ; where the Krumo folder is. This value doesn't
    ; need to be set. Works perfectly unset on my
    ; install.
    ;

vendors/krumo/krumo.ini


Helper Monkey
~~~~~~~~~~~~~

Warning: Geeksturbation in 3..2..1: Implementing krumo as a helper
will allow us to disable krumo simply by changing our app from DEBUG
level 1, 2 or 3 (development) to 0 (production) in our core config
file. This way we won't have to go back through all our views and
remove our krumo instances.



Helper Class:
`````````````

::

    <?php

    vendor('krumo/class.krumo');

    class KrumoHelper extends Helper {

        // enable krumo in development mode
        // disable krumo in production mode
        // (changed 2008-06-06 as per A. Martini's
        // comment, below, regarding v1.2 warnings)
        function __construct() {

            if(Configure::read('debug') != 0) {

                krumo::enable();

            } else {

                krumo::disable();

            }

        }

    }

    ?>

app/views/helpers/krumo.php


Using Krumo in Your Views
~~~~~~~~~~~~~~~~~~~~~~~~~

First we add Krumo to our array of helpers:

Controller Class:
`````````````````

::

    <?php
    ---EXAMPLE CONTROLLER---

    class FooController extends AppController {

         var $helpers = array('Krumo');

    ... controller logic ...

    }

    ?>

app/controllers/foo_controller.php

Next we include Krumo in our views:

View Template:
``````````````

::

    <?php
    ---EXAMPLE VIEW---

    // expands the arrays contained in the following variables:
    krumo($fooVariable1);
    krumo($fooVariable2);
    ?>

    ... view ...

    <?php foreach($fooVariable as $foo): ?>

        //expands the foo variables
        krumo($foo);

    ... foreach loop ...

    <?php endforeach; ?>


/app/views/foo/index.ctp

So how much help is Krumo? Well if you're a savant and rarely have to
dump your variables to see where you're going wrong then probably not
much but if you're trying to parse multidimensional arrays with a lot
of text it can get tough figuring the different depths your data is
at. Krumo uses css and the dom to make each layer of an array
collapsible so you can browse easily...but I'm sensing doubt on your
part. You still haven't seen it with your own eyes right?

CHECK IT:

`Examples`_ abound on `K to the ruzzle M to the izzo's site`_.

Word!..erm String!


.. _Krumo: http://krumo.sourceforge.net/
.. _http://krumo.sourceforge.net/: http://krumo.sourceforge.net/
.. _K to the ruzzle M to the izzo's site: http://krumo.sourceforge.net/
.. _Examples: http://kaloyan.info/krumo/index.php#example
.. _Downlizzle : http://sourceforge.net/project/showfiles.php?group_id=194198

.. author:: stac80
.. categories:: articles, helpers
.. tags:: krumo,array,print_r,Helpers


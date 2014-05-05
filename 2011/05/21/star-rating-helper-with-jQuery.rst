star rating helper with jQuery
==============================

I was looking for a simple widget that allows me to implement a star
rating functionality. Because I didn't found something, that fits my
needs I wrote my own.

You can see see how it looks like on my blog:
`http://techblog.pierrekrohmer.de`_

It's also a sandbox available: `cakePHP sandbox`_. There you can rate
a movie. The possible ratings are stored in the database so you can
create a new rating to extend the rater dynamiclly. Of course it's
also possible to use the star rating without an database backend so
you just have to provide an array with options.

Features:
~~~~~~~~~

+ Provides an easy to use star rating widget
+ Fully compatible with the cakePHP framework
+ Restore its selection if the form validation fails
+ Shows values on hover
+ Provides options for configureing the element
+ Preselect values
+ make element read-only


Usage:
~~~~~~

+ Download and extract the star-rating-helper.zip


+ Copy the src folder to your cake app directory


+ If you have not yet included jQuery in your app do that first

    + You can download it at `www.jquery.com`_
    + Then you have to include the js file in your view or layout



+ Include the rating helper in your controller

::

    var $helpers = array('Rating');


+ In your view you can use it like this:

::

        echo $this->Rating->star('field_name', 'model_name', $data_array);
        // $data_array is a key->value pair
        
        // e.g.:
        echo $this->Rating->star('rating_id', 'Movie', $ratings);
        
        // or with options:  
        echo $this->Rating->star('rating_id', 'Movie', $ratings, array(
           'label' => 'My rater',			    // Individual label
           'no_label' => false,			     // No label will be created
           'hover' => false,				     // Hover function on or off 
           'show_selection' => false, 	            // Show the value of the selection
           'selected_value' => 5,			    // preset selected value
           'read_only' => false,			    // make rater read-only
           'style' => margin-left: 3px;);         // css style of the surrounding div element

More dokumentation on my blog

Please do not hesitate to leave Feedback, comments, report bugs or
request new Features!



Download:
~~~~~~~~~

You can download it on my blog : `http://techblog.pierrekrohmer.de`_



Roadmap:
~~~~~~~~

+ Provide an option to disable the cancel button (hide the button)
+ Support for split stars
+ some other stuff :-)



.. _cakePHP sandbox: http://sandbox.pierrekrohmer.de/movies/add
.. _http://techblog.pierrekrohmer.de: http://techblog.pierrekrohmer.de/2011/05/jquery-star-rating-helper-cakephp/
.. _www.jquery.com: http://www.jquery.com

.. author:: infest696
.. categories:: articles, helpers
.. tags:: jQuery helper star rating,Helpers


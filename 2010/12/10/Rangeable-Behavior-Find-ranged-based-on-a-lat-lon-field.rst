Rangeable Behavior: Find ranged based on a lat/lon field
========================================================

After some really shoddy implementations of this functionality as
components and whatnot, I finally made a clean and simple behavior
which you can use naturally as a custom find type, even within
paginate(). It will also sort the results for you based on distance to
the source lat/lon, injecting a 'distance' field and setting as the
key of the array.

For code, better notes, and updates: `https://github.com/zeroasterisk/cakephp-behavior-rangeable`_

h1. Rangeable Behavior for CakePHP

After some really shoddy implementations of this functionality as
components and whatnot, I finally made a clean and simple behavior
which you can use naturally as a custom find type, even within
paginate().

It will also sort the results for you based on distance to the source
lat/lon, injecting a 'distance' field and setting as the key of the
array.

h2. Requirements

+ CakePHP 1.3.x. (untested with the 1.2.x series)
+ Model for a table which has lat/lon fields *(field names setable)*
+ Optionally, a Zip Model for zip code --> lat/lon lookup *(model and
  field names setable)*

h2. Installation

save the @rangeable.php@ file into
@./app/models/behaviors/rangeable.php@ in your application

on your model, add @Rangeable@ to your $actsAs array:

::

    <?php
    # ./app/models/job.php
    class Job extends AppModel {
        var $actsAs = array('Rangeable');
    }
    ?>

h2. Extra Setup

Ideally you'd have a @Zip@ model which maps to a table with at least
the fields: @zip@, @lat@, @lon@. That facilitates the automatic lookup
by a zip from the conditions array, without it, we don't know how to
lookup the lat/lon for the condition, so you'd have to include it in
the search terms.

Need a zips table? Contact me. Have a great zips table? Contact me.
*(I have one, US only, but I'm sure it's out of date... hook me up)*

h2. Usage

see link to github: `https://github.com/zeroasterisk/cakephp-behavior-rangeable`_

h2. License

Offered under an MIT license. Do what you need.


.. _https://github.com/zeroasterisk/cakephp-behavior-rangeable: https://github.com/zeroasterisk/cakephp-behavior-rangeable

.. author:: zeroasterisk
.. categories:: articles, behaviors
.. tags:: behaviour,Zip,zipcode,range,radius,distance,Behaviors


Extensible Calendar Plugin
==========================

This is a simple plugin for rendering a fully functional, yet very
extensible, calendar. Plugin can be downloaded at
https://github.com/passion4code/CakePHP-Calendar-Plugin
Greetings Bakers,

This is the first round of this calendar, and there are many more to
come.

Basically, just add the helper to your controller(s)

::

    
    var $helpers = array('Calendar.Calendar');

In your view, you can draw it out like this
` echo $this->Calendar->draw();
`
The method draw() accepts an array of options.

month -- Pass a month value to specify a month (named params from next
/ previous months navigation will override)
year -- Pass a month value to specify a year (named params from next /
previous months navigation will override)
next_prev_count Defaults to 2. How many months to show on either side
of the current month title?
events -- Array of content, nested by 4 digit year -> month -> day
(example below)
link_template -- Template of URL to use, can be in any standard
CakePHP URL format. Defaults to nothing (current page), but uses named
param keys of month, year and day show_day_link -- Boolean to
determine if the day within a calendar cell will be a link or not.
Defaulted to true.


Here is a brief example on how to use the calendar with some content
injected into some days. The content will only appear in the dates if
they are shown on the currently selected month.

::

    
    $events = array(
    '2011' => array(
        '10' => array(
            '5' => 'My Birthday',
            '8' => 'Joe\'s Birthday',
            '10' => array('Vern\'s Birthday','Columbus Day')
        )
    )
    );
    echo $this->Calendar->draw(array('events' => $events));

You can also add events to the calender prior to drawing like this

::

    
    //Single event on one day
    $this->Calendar->event('2011-12-25','Christmas');
    
    //Multiple events on one day
    
    $this->Calendar->event('2011-10-31',array('Halloween','Some Other Special Day'));
    
    //Multiple events in one call
    
    $this->Calendar->event(
     array(
       '2011-12-24' => 'Christmas Eve',
       '2011-12-31' => 'New Years Eve',
       '2011-12-15' => array('Special event','Another event')
     )
    );
    
    echo $this->Calendar->draw();


Note that I have a plan in my roadmap with lots of goodies in the
future. Requests excepted :)


`https://github.com/passion4code/CakePHP-Calendar-Plugin`_

.. _https://github.com/passion4code/CakePHP-Calendar-Plugin: https://github.com/passion4code/CakePHP-Calendar-Plugin

.. author:: passionforcode
.. categories:: articles, helpers
.. tags:: helper,calendar,Localization,plugin,utc,Helpers


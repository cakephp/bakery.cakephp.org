"ShareThis" Social media helper
===============================

This helper is used to add ShareThis buttons to your view. One can
also just use their Publisher Id in order to link their ShareThis
account with the buttons created using the helper. If you are new
about the ShareThis have a look at their official website
www.sharethis.com

The SharethisHelper Class

<?php class SharethisHelper extends Helper { var $helpers =
array('Html');

::

    /**
     * Initial call to load the required javascript code on the page.
     * @param string $pubid Publisher Id; Provided in user's account at sharethis.com
     * @param string $wtype Widget Type; It can be either o|c [o]auth | [c]lassic
     * @return string $sthis A string containing the initial call of a javascript.
     */
    function init($pubid=null, $wtype='c')
    {
        // Generate the javascript code to set Widget Type variable based on a passed argument.
        $wtype = 'o' === $wtype ? 'true' : 'false';
        $sthis = $this->Html->scriptBlock("var switchTo5x=$wtype;");

        // Add javascript that contains publisher id.
        $publink = "stLight.options({publisher:'";
        $publink .= empty($pubid) ? '' : $pubid;
        $publink .= "'});";
        $sthis .= $this->Html->scriptBlock($publink);

        // Add javascript to display share buttons.
        $btnjs = 'http://w.sharethis.com/button/buttons.js';
        $sthis .= $this->Html->script($btnjs);
        return $sthis;
    }

    /**
     * Print out a button based on the argument passed.
     * @param string|array $names A name of single button OR an array of more than one button names e.g. facebook|tweet
     * @param string $pos Position in which all the buttons will be displayed. (h-Horizontal|v-Vertical)
     * @return string A string containing span tag element with appropriate button value.
     */
    function btnWithCount($names, $pos='h')
    {
        // Display more than one buttons horizontally or vertically based on a value of second argument passed.
        if (is_array($names) && count($names) > 0)
        {
            $sthis = '';
            foreach ($names as &$btn)
            {
                $options = array('class' => 'st_' . $btn . '_' . $pos . 'count', 'displayText' => ucfirst($btn));
                $sthis .= $this->Html->tag('span', '', $options);
            }
            return $sthis;
        }
        // Here we check if the passed data is not an array and if user has not used comma to separate the button names
        // then only print the buttons for passed data.
        else if (!is_array($names) && false === strpos($names, ','))
        {
            $options = array('class' => 'st_' . $names . '_' . $pos . 'count', 'displayText' => ucfirst($names));
            $sthis = $this->Html->tag('span', '', $options);
            return $sthis;
        }
        else
            die('INVALID DATA PASSED!');
    }

    /**
     * Print out all the buttons passed into an argument array vector.
     * @param array $names Array containing all the button names to be displayed on the page.
     * @return string A string with the buttons in tray.
     */
    function btnsInTray($names)
    {
        // Display all the buttons in a single horizontal tray.
        if (is_array($names) && count($names) > 0)
        {
            $sthis = '';
            foreach ($names as &$btn)
            {
                $options = array('class' => "st_$btn", 'displayText' => ucfirst($btn));
                $sthis .= $this->Html->tag('span', '', $options);
            }
            return $sthis;
        }
        else
            die('PASSED ARGUMENT TYPE MUST BE AN ARRAY.');
    }

} ?>

Usage

The helper will be used to create the buttons such as facebook,
twitter, yahoo etc. either of the two special widget type called oauth
or classic. Furthermore, you can render each of their views on your
application in horizontal or vertical manner as per your requirement.
For that you will have to pass the required parameter as an argument
and its appropriate value based on the comment given at each section
of the functions written into a helper class file.

To customize any of the buttons very specifically you need to refer
the following documentation: `http://help.sharethis.com/customization/customization-overview`_

Example

The example shows how to initialize and call sharethis helper class
and its appropriate functions according to the users' needs.

<h1>Welcome to share this.</h1><?php // Pass your publisher id from
sharethis.com if you already owns, put NULL otherwise. $pubid = ''; //
857b74fe-5ced-4f87-8227-661fa9b8c6ee $wtype = ''; // widgetType can be
either 'o' or 'c' [Oauth or classic] echo $sharethis->init($pubid,
$wtype);

// Get facebook,twitter sharethis button horizontally with count. By
default it is horizontally. echo
$sharethis->btnWithCount(array('facebook', 'twitter'));

// Display all of them vertically with count. echo
$sharethis->btnWithCount(array('facebook', 'twitter', 'sharethis'),
'v');

// Get display of a tray containing all the buttons without count.
$btns = array('twitter', 'facebook', 'yahoo', 'gbuzz', 'email',
'sharethis'); echo $sharethis->btnsInTray($btns); ?>


.. _http://help.sharethis.com/customization/customization-overview: http://help.sharethis.com/customization/customization-overview

.. author:: rightwayindia
.. categories:: articles, helpers
.. tags:: helpers,Social Bookmark,twitter,facebook,social media,sharethis,Helpers


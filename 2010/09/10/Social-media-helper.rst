Social media helper
===================

This helpers allows you to simply add buttons using AddThis. I created
this out of the need to simply add social media bookmarking to one of
my clients' websites. For more information go to
http://www.addthis.com/.


The Helper:
~~~~~~~~~~~

Helper Class:
`````````````

::

    <?php 
    class SocialHelper extends Helper {
    
        var $helpers = array('Html');
    
        function init($userid = null) {
            if ($userid) {
                $userid = str_replace('#', '', $userid);
                $link = 'http://s7.addthis.com/js/250/addthis_widget.js#' . $userid;
            } else {
                $link = 'http://s7.addthis.com/js/250/addthis_widget.js';
            }
            $social = $this->Html->script($link);
            return $social;
        }
    
        function button($type) {
            if (!$type) {
                $social = 'ERROR: No type';
            } else {
                $social = $this->Html->div('addthis_toolbox', $this->Html->link('', '', array('class' => 'addthis_button_' . $type)));
            }
            return $social;
        }
    
        function buttonBig($type) {
            $social = $this->Html->div('addthis_toolbox addthis_32x32_style addthis_default_style', $this->Html->link('', '', array('class' => 'addthis_button_' . $type)));
            return $social;
        }
    
        function facebookLike() {
            $social = $this->Html->div('addthis_toolbox', $this->Html->link('', '', array('class' => 'addthis_button_facebook_like')));
            return $social;
        }
    
        function twitter($dir = null) {
            if (!$dir) {
                $dir = 'horizontal';
            }
            $social = $this->Html->div('addthis_toolbox', $this->Html->link('', '', array('class' => 'addthis_button_tweet', 'tw:count' => $dir)));
            return $social;
        }
    
        function hyves() {
            $social = $this->Html->div('addthis_toolbox', $this->Html->link('', '', array('class' => 'addthis_button_hyves')));
            return $social;
        }
    
    }
    ?>


Usage
~~~~~

I've added a few quick social bookmarking helper links in there,
ofcourse they can be customized to fit your needs.

To see what buttons you can create you'll have to go to API
`http://www.addthis.com/help/client-api`_

Example:
~~~~~~~~

This example shows you how to create a basic button using the helper.

View Template:
``````````````

::

    
    <h1>Welcome to my social page, want to bookmark it?</h1>
    <?php 
    echo $social->init('myspecialcodefromaddthis.com'); 
    //The code is not required, but when entered it allows you to keep track of sharing statistics.
    
    //This code generates the facebook like button
    echo $social->button('facebook_like'); ?>

If you want to create a big button :

View Template:
``````````````

::

    
    <h1>Welcome to my social page, want to bookmark it?</h1>
    <?php echo $social->init('myspecialcodefromaddthis.com'); ?>
    <?php echo $social->buttonBig('facebook_like'); ?>



.. _http://www.addthis.com/help/client-api: http://www.addthis.com/help/client-api

.. author:: stolkchris
.. categories:: articles, helpers
.. tags:: helper,social,media,twitter,facebook,addthis,Helpers


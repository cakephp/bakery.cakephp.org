Flattr Helper
=============

After the Flattr MOD for phpBB3 release some days ago I wrote this
simple flattr cakephp helper (basic cakephp helper knowledge is
required) to aid cakephp developers integrate flattr quick and easy
into their websites. The helper has only 1 function and is very simple
in use. (Taken from: [url]http://blog.wyrihaximus.net/2010/05/flattr-
cakephp-helper/[/url] as is most of the article.)
Basic usage

::

    <?php echo $flattr->badge(array(
        'uid' => 4080,
        'tle' => 'test',
    )); ?>

As you can see this is the bare minimum in options you need to use to
get it to work.


#. uid The Flattr User ID as found on the Flattr dashboard (in the
   example I used mine).
#. tle The title for the link to be submitted.

Since the helper supports the full range of options below are the
other options:


#. dsc A description for the link.
#. cat The category for the link. This can be any of the following:
   text, images, video, audio, software, rest. The default if this option
   isnâ€™t specified is text.
#. lng The language of the link. Any of the languages on this list and
   defaults to en_GB.
#. tags Any tags matching the link. This field must be an array!
#. url The URL of the link.
#. btn The badge to use. Currently the only option is compact but if
   not specified or set to something else it defaults to the standard
   larger badge

The helper it self:

Helper Class:
`````````````

::

    <?php <?php
    class FlattrHelper extends Helper {
        public $helpers = array('Javascript');
        function badge($options=array()) {
            App::import('Sanitize');
            $vars = '';
            $vars .= "var flattr_uid = '" . intval($options['uid']) . "';\r\n";
            $vars .= "var flattr_tle = '" . $options['tle'] . "';\r\n";
            if(!isset($options['dsc']))
            {
                $options['dsc'] = '';
            }
            $vars .= "var flattr_dsc = '" . $options['dsc'] . "';\r\n";
            if(!isset($options['cat']))
            {
                $options['cat'] = 'text';
            }
            $vars .= "var flattr_cat = '" . $options['cat'] . "';\r\n";
            if(!isset($options['lng']))
            {
                $options['lng'] = 'en_GB';
            }
            $vars .= "var flattr_lng = '" . $options['lng'] . "';\r\n";
            if(isset($options['tags']) && count($options['tags'])>0)
            {
                array_walk($options['tags'],'Sanitize::paranoid');
                $vars .= "var flattr_tag = '" . implode(', ',$options['tags']) . "';\r\n";
            }
            if(isset($options['url']) && ((version_compare(phpversion(), '5.2.0', '>=')  && function_exists('filter_var')) ? filter_var($options['url'], FILTER_VALIDATE_URL) : true))
            {
                $vars .= "var flattr_url = '" . $options['url'] . "';\r\n";
            }
            if(isset($options['btn']) && $options['btn']=='compact')
            {
                $vars .= "var flattr_btn = 'compact';\r\n";
            }
            $code = $this->Javascript->codeBlock($vars, array('inline' => true));
            $code .= $this->Javascript->link('http://api.flattr.com/button/load.js', array('inline' => true));
            return $code;
        }
    }?>

Any comments, tips, suggestions and bug reports are more then welcome.
For more information on Flattr check `http://flattr.com`_.

.. _http://flattr.com: http://flattr.com/

.. author:: WyriHaximus
.. categories:: articles, helpers
.. tags:: helper,flattr,Helpers


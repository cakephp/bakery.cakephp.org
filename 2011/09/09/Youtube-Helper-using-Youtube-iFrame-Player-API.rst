Youtube Helper using Youtube iFrame Player API
==============================================

I had some free time so I decided to play with Youtube API. I started
with [url=http://code.google.com/apis/youtube/iframe_api_reference.htm
l]iFrame Player API[/url] and I wrote small CakePHP Helper which can
create a code you might need for you website. It's good to mention
that according to official documentation of this API, Youtube iFrame
Player is still an experimental feature of Youtube and can be changed
any time.
Requirements The end user must be using a browser that supports the
HTML5 postMessage feature. Most modern browsers support postMessage,
though Internet Explorer 7 does not support it .

Any web page that uses the iFrame API must also implement the
following JavaScript function:


#. [li] onYouTubePlayerAPIReady – The API will call this function when
   the page has finished downloading the JavaScript for the player API,
   which enables you to then use the API on your page. Thus, this
   function might create the player objects that you want to display when
   the page loads.

CakePHP: Youtube Helper

::


    <?php
    /**
    * Author: Tomas Pavlatka [tomas.pavlatka@gmail.com]
    * Created: Sep 8, 2011
    */

    class YoutubeHelper extends Helper {
        /*
         * Options (Private).
         *
         * holds options for helper
         */
        var $_options = array(
            'width'     => 640,
            'height'    => 390,
            'video_id'  => null);

        /*
         * Player Vars (Private).
         *
         * holds parameters for embedded player
         * @see http://code.google.com/apis/youtube/player_parameters.html?playerVersion=HTML5
         */
         var $_playerVars = array(
             'autohide'  => 2,
             'autoplay'  => 0,
             'controls'  => 1,
             'enablejsapi'   => 0,
             'loop'      => 0,
             'origin'    => null,
             'start'     => null,
             'theme'     => 'dark');

         /*
          * iFrame Code.
          *
          * holds code for iFrame Player
          */
         var $_frameCode = null;

         /**
          * Init.
          *
          * inits helper
          * @param array $options - option for helper
          * @param array $playerVars - parameters for embedded player
          */
         function init(array $options = array(),array $playerVars = array()) {
              $this->_options = am($this->_options,$options);
              $this->_playerVars = am($this->_playerVars,$playerVars);
         }

        /**
         * iFrame Player.
         *
         * creates script for iframe player and returns it back
         * @param string url - url of youtube video
         * @param string divId - id of div element
         */
        function iframePlayer($url,$divId) {
            // Get video id.
            $this->_parseVideoId($url);

            // Validation.
            if(empty($this->_options['video_id'])) {
                $this->_iframeCode = __('Video id cannot be left blank. Check url of youtube video.',true);
            } else if(!is_numeric($this->_options['width']) || $this->_options['width'] < 1) {
                $this->_iframeCode = __('Width of video player must be numeric and greather than 1.',true);
            } else if(!is_numeric($this->_options['height']) || $this->_options['height'] < 1) {
                $this->_iframeCode = __('Height of video player must be numeric and greather than 1.',true);
            } else {
                // Build code.
                $this->_loadIframePlayer();
                $this->_createIframePlayer($divId);
                $this->_closeIframePlayer();
            }

            // Return code.
            return $this->_iframeCode;
        }

        /**
         * Close iFrame Player (Private)
         *
         * closes iframe player.
         */
        function _closeIframePlayer() {
            $this->_iframeCode  .= '</script>';
        }

        /**
         * Create iFrame Player.
         *
         * creates iframe player.
         * @param string divId - id of div element
         */
        function _createIframePlayer($divId) {

            // Build player params.
            $params = null;
            foreach($this->_playerVars as $key => $value) {
                if(is_numeric($value) || !empty($value)) {
                     $params .= "'{$key}': ";

                     if(is_numeric($value)) {
     	             $params .= $value;
                     } else {
                 	     $params .= "'{$value}'";
                     }

                     $params .= ',';
                }
            }

            // Build JS code.
            $this->_iframeCode .= 'var player;'."\r\n";
            $this->_iframeCode .= 'function onYouTubePlayerAPIReady() {'."\r\n";
            $this->_iframeCode .= 'player = new YT.Player("'.$divId.'", {'."\r\n";
            $this->_iframeCode .= 'height: "'.(int)$this->_options['height'].'",'."\r\n";
            $this->_iframeCode .= 'width:  "'.(int)$this->_options['width'].'",'."\r\n";
            $this->_iframeCode .= 'videoId: "'.$this->_options['video_id'].'",'."\r\n";
            if(!empty($params)) {
                $this->_iframeCode .= 'playerVars: {'.substr($params,0,-1).'},'."\r\n";
            }
            $this->_iframeCode .= '});'."\r\n";
            $this->_iframeCode .= '}'."\r\n\r\n";
        }

        /**
         * Load iFrame Player (Private).
         *
         * starts building iframe player code.
         */
        function _loadIframePlayer() {
            $this->_iframeCode  = '<script type="text/javascript">'."\r\n";
            $this->_iframeCode .= 'var tag = document.createElement("script");'."\r\n";
            $this->_iframeCode .= 'tag.src = "http://www.youtube.com/player_api"'."\r\n";
            $this->_iframeCode .= 'var firstScriptTag = document.getElementsByTagName("script")[0]'."\r\n";
            $this->_iframeCode .= 'firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)'."\r\n\r\n";
        }

        /**
         * Parse Video Id (Private).
         *
         * parses video id from url
         * @param string $url - url from youtube
         */
        function _parseVideoId($url) {
            //http://www.youtube.com/watch?v=UF6wdrRAZug&feature=relmfu

            $urlQuery = parse_url($url,PHP_URL_QUERY);
            if(!empty($urlQuery)) {
                $parseArray = explode('&',$urlQuery);
                foreach($parseArray as $key => $value) {
                    $explodeArray = explode('=',$value);
                    if($explodeArray[0] == 'v' && isset($explodeArray[1])) {
                        $this->_options['video_id'] = (string)$explodeArray[1];
                        break;
                    }
                }
            }
        }
    }

How to user Youtube Helper
It's very easy to use our new Youtube Helper.

Include helper into controller's helpers

::


    <?php
    // in controller
    var $helpers = array('Youtube');

Use Youtube Helper in view script We must do at least two things in
view script. First, we must create a div element with proper id tag.
Second, we must call iframePlayer function from Youtube Helper and
send url of video we what to show and id tag of div which we have
created.

Example 1 - Using default settings
We are going to create an iFrame Youtube Player with size 640x390
pixels with control panel using dark theme.

::


    <?php
    echo $this->Youtube->iframePlayer('http://www.youtube.com/watch?v=HT9_O3X9Llc&feature=feedrec','youtube-player');
    ?>

    // We must create a div with proper id - Youtube iFrame Player will be loaded in this div
    <div id="youtube-player"></div>

Example 2 - Updating player's settings
We are going to create an iFrame Youtube Player with size 1024x780px
without control panel using light theme. Video will start playing at
10 seconds from the start of video and will start automatically.

::


    <?php
    // Update player's options and variables.
    $playerOptions = array('width' => 1024, 'height' => 780);
    $playerVariables = array('autoplay' => 1, 'controls' => 0, 'start' => 10, 'theme' => 'light');

    // Apply new setting to helper.
    $this->Youtube->init($playerOptions,$playerVariables);

    // Build and show a code for player.
    echo $this->Youtube->iframePlayer('http://www.youtube.com/watch?v=HT9_O3X9Llc&feature=feedrec','youtube-player');
    ?>

    // We must create a div with proper id - Youtube iFrame Player will be loaded in this div
    <div id="youtube-player"></div>



.. author:: pavlatka
.. categories:: articles, helpers
.. tags:: api,youtube,youtube player,is_numeric,iframe api,parse_url,youtube helper,array_merge,Helpers


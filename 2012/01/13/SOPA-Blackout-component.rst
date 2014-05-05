SOPA Blackout component
=======================

On the Tuesday 24th January 2012, the US Senate will vote on the
internet censorship bill. Whilst it is an American law, it has far
reaching repurcusions for the web as a whole. Sites such as Reddit
have said that on January 18th they are going to go dark between 8am
and 8pm. This component will let you join the cause. On 18th January
your site will display a customisable page. Search engine rankings
will not be affected as the plugin sends a 503 status.

On the Tuesday 24th January 2012, the US Senate will vote on the
internet censorship bill.

Whilst it is an American law, it has far reaching repurcusions for the
web as a whole. Sites such as Reddit have said that on January 18th
they are going to go dark between 8am and 8pm.

This component will let you join the cause. On 18th January your site
will display a customisable page.

Search engine rankings will not be affected as the plugin sends a 503
status.

It's not very 'Cake-y' - I tried using plugin first, then thought
about an error page with the component, but I wanted just one file
people could download and then use if they wished.

Suggestions welcomed...

::

    <?php
        class SopaBlackoutComponent extends Object {
    
    
            var $sopa_blackout_page_title = 'Supporting anti-SOPA Blackout day'; // title and h1 content
            var $sopa_blackout_include_video = true; // embed the video from americancensorship.org on your site?
            var $sopa_blackout_include_form = true; // include the form from americancensorship.org on your site?
            var $sopa_blackout_message = '<p>On the Tuesday 24th January 2012, the US Senate will vote on the <a href="http://en.wikipedia.org/wiki/Stop_Online_Piracy_Act" target="_blank">internet censorship bill</a>.<br /><br />Whilst it is an American law, it has far reaching repurcusions for the web as a whole.<br /><br />There are many companies against SOPA, such as <a href="http://www.mattcutts.com/blog/internet-censorship-sopa/" target="_blank">Google</a>, <a href="http://blog.reddit.com/2012/01/stopped-they-must-be-on-this-all.html" target="_blank">Reddit</a>, <a href="http://news.cnet.com/8301-31921_3-57342914-281/silicon-valley-execs-blast-sopa-in-open-letter/" target="_blank">Facebook, Twitter, Wikipedia</a>, and today I am lending my weight to the argument by taking my site down for the day.<br /><br />If you think SOPA doesn\'t affect you, please think again. Watch the video below, or use the form below to force politicians to take notice.<br /><br />Thank you</p>';
            var $sopa_blackout_date = '2012-01-18'; // SOPA Blackout Day - 18th January 2012 
            var $sopa_blackout_timestart = 8; // Starting at 8am or 08:00:00
            var $sopa_blackout_timeend    = 20; // Ending at 8pm or 20:00:00
            var $sopa_blackout_timezone    = null; // recommended timezones would be America/New_York or America/Los_Angeles
    
    
            //called before Controller::beforeFilter()
            function initialize(&$controller, $settings = array()) {
                // saving the controller reference for later use
                $this->controller =& $controller;
            }
    
    
            //called after Controller::beforeRender()
            function beforeRender(&$controller) {
                if($this->sopablackout_checkdate()){
                $message = '<!DOCTYPE html>
        <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <title>'.$this->sopa_blackout_page_title.'</title>
            <style>
                body, html {background-color:#000000; color:#ffffff;font-family:"Trebuchet MS", Myriad, Arial;}
                div.sopablackout_padding {padding:24px;}
                #container {width:1000px; margin:40px auto;}
                p, div.sopablackout_padding { font-size:14px; line-height:140%;}
            </style>
        </head>
        <body>
            <div id="container">
                <h1>'.$this->sopa_blackout_page_title.'</h1>
                <div class="sopablackout_padding">
                    '.$this->sopa_blackout_message.'
                </div>';
                if($this->sopa_blackout_include_video===true){
                    $message .='
                    <div class="sopablackout_padding">
                        <iframe src="http://player.vimeo.com/video/31100268" width="600" height="338" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
                    </div>';
                } 
                if($this->sopa_blackout_include_form===true){
                    $message .='
                    <div class="sopablackout_padding">
                        <iframe src="http://americancensorship.org/callwidget" width="588" height="625" border="0"></iframe>
                    </div>';
                }
                $message .='
            </div>
        </body>
        </html>';
                header('HTTP/1.1 503 Service Temporarily Unavailable');
                header('Retry-After: ' . HOUR);
                echo $message;
                exit();
                }
            }
    
            function sopablackout_checkdate(){
                $toreturn = false;
                if(date('Y-m-d')==$this->sopa_blackout_date){
                    if($this->sopa_blackout_timezone){
                        date_default_timezone_set($this->sopa_blackout_timezone);
                    }
                    if(date('H')>=$this->sopa_blackout_timestart && date('H')<$this->sopa_blackout_timeend){
                        $toreturn = true;
                    }
                }
                return $toreturn;
            }
    
        }

?>



.. author:: eagerterrier2
.. categories:: articles, components
.. tags:: pipa,SOPA,Components


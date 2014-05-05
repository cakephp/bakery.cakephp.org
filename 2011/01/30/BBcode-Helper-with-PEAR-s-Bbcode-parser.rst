BBcode Helper with PEAR's Bbcode parser
=======================================

This is simple helper that converts
[url=http://en.wikipedia.org/wiki/BBCode]Bbcode[/url] tags into its
equivalent html tags. The helper is very light weight and utilises
[url=http://pear.php.net/package/HTML_BBCodeParser/download]PEAR's
Bbcode parser[/url] to give html outputs.

::

    
    <?php
    /*
     * BbcodeHelper utilises PEAR's BBcodeparser to parse the bbcode tags into
     * equivalent html tags.
     * 
     * @author : Kishor Kundan
     */
    
    class BbcodeHelper extends AppHelper {
    
        protected $BbcodeParser;
        protected $RequiredPackages = array("PEAR", "HTML/BBCodeParser");
    
        public function __construct() {
            parent::__construct();
    
            array_map(
                    function($FileName) {
                        ini_set('include_path', ini_get('include_path').':/usr/share/pear');
                        $FileName .= ".php";
                        return ((require_once($FileName)) ? true : false);
                    }, 
                    $this->RequiredPackages
           );
           return (($this->BbcodeParser = new HTML_BBCodeParser()) ? true : false);
        }
    
       
    
        public function htmlize($bbcode = null) {
            if($bbcode === null) {
                return false;
            }
            return $this->output(
                    $this->BbcodeParser->qParse(
                                htmlspecialchars($bbcode)
                            )
                   );
        }
    }
    

Usage

To use this helper you must include it in the controller

::

    
    <?php
    var $helpers = array('Bbcode'); // followed by all the other helpers you might need
    ?>

To use it in view simply

::

    
    <?php
    $this->Bbcode->htmlize($text-in-bb-code);
    ?>



.. author:: kishorkundan
.. categories:: articles, helpers
.. tags:: helpers,pear,BBCode,Helpers


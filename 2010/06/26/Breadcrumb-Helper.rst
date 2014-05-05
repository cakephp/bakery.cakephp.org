Breadcrumb Helper
=================

If you are tired of setting up breadcrumbs for your screens, this
helper is for you.

+ This line adds the current page to the breadcrumb list stored in
  session and returns the breadcrumb html.


View Template:
``````````````

::

    
    echo $crumb->getHtml('Postings') ;


+ second argument is used to instruct the helper to perform some pre-
  defined actions. Currently supported is 'reset'. It is used to clear
  the old stored list and start a new one. Normally, this option should
  be used when calling from the template to which the first link in the
  breadcrumb point to.

::

    
    echo $crumb->getHtml('Postings', 'reset') ;


+ The third parameter is to handle browser's Back button clicks. For
  example, If we have a listing page 'Postings' which links to an Edit
  page and an Add page. Here, give the level something like 'Post'. So
  the Helper can identify the Add and Edit screens falls in the same
  level as Postings > Add and Postings > Edit. Otherwise it will build
  one as, Postings->Add->Edit if we clicked on the Edit link followed by
  "Back" button then the Add link.

::

    
    echo $crumb->getHtml('Postings', null, 'Post' ) ;

If you are not sure what to use for the third parameter, use 'auto'
and let the Breadcrumb helper to analyse it for you.

::

    
    echo $crumb->getHtml('Postings', null, 'auto' ) ; 

Create this file app/views/helpers/crumb.php:

Helper Class:
`````````````

::

    <?php 
    class CrumbHelper extends Helper
    {
    var $link_class    = 'crumb_link'    ;    // css class for anchor tags.
    var $span_class    = 'crumb_span'    ;    // css class for the span element .(last label).
    var $separator    = ' > '            ;    // separator between links.
    var $protocol    = 'http'            ;
    var $helpers     = Array("Session");
    
    function addThisPage($title = null, $what_to_do = null , $level = null )    // add the calling page
    {
        define('THIS_URL' , $this->protocol.  '://' . $_SERVER['HTTP_HOST'] .  $_SERVER['REQUEST_URI']) ;
    
        $controller   	=    $this->params['controller']    ;
        $action    		=    $this->params['action']    	;
    
        if (is_null($title)) {
            $title = Inflector::humanize($controller);
        }
    
        if ($what_to_do == 'reset' )    { // add this argument if it comes from menu.
            $this->Session->del('crumb_links') ;
            $this->Session->del('crumb_titles') ;
            $this->Session->del('crumb_levels') ;
        }
        if ( !isset($_SESSION['crumb_links'])) {
            $_SESSION['crumb_links'] = array() ;
            $_SESSION['crumb_titles'] = array() ;
            $_SESSION['crumb_levels'] = array() ;
        }
        $arr_links    = $this->Session->read('crumb_links')    ;
        $arr_titles    = $this->Session->read('crumb_titles');
        $arr_levels    = $this->Session->read('crumb_levels');
    
        if (is_null($level) AND $this->params['action'] != 'index' && $level != 'auto') {
            $level = $controller ;
        }
        if ( $level == 'unique'){
        	$level = $controller . '_' . $action ;
        }
    
        // check that same level exists. if yes strip all after it.
        if ( is_array($arr_levels)) {
            $level_found_at    =    array_search($level, $arr_levels );
        }
        if (is_numeric($level_found_at)) {
            $arr_links    = $this->__stripAfter($arr_links    , $level_found_at  )        ;                // Delete items after current
            $arr_titles    = $this->__stripAfter($arr_titles    , $level_found_at  )        ;                // Delete items after current
            $arr_levels    = $this->__stripAfter($arr_levels    , $level_found_at  )        ;                // Delete items after current
            // reindex
            unset($arr_links[$level_found_at] )    ;
            unset($arr_titles[$level_found_at] );
            unset($arr_levels[$level_found_at] );
            $arr_links    = array_values( $arr_links )     ;
            $arr_titles    = array_values( $arr_titles )     ;
            $arr_levels    = array_values( $arr_levels )     ;
        }
        // check last item is current page. if not, add, else do nothing.
        if ( is_array($arr_titles)) {
            $found_at    =    array_search($title, $arr_titles);
        }
        if ( is_numeric($found_at)) {    //            ;    // already in the link, don't add
            $arr_links    = $this->__stripAfter($arr_links    , $found_at  )    ;                // Delete items after current
            $arr_titles    = $this->__stripAfter($arr_titles    , $found_at  )    ;                // Delete items after current
            $arr_links[count($arr_links) - 1]    =     THIS_URL            ;
        } else { // not in list, add
            $arr_links[]    =     THIS_URL;
            $arr_titles[]    =    $title    ;
            $arr_levels[]    =    $level    ;
        }
    
        //write back to session
        $_SESSION['crumb_links'] = $arr_links ;
        $_SESSION['crumb_titles'] = $arr_titles ;
        $_SESSION['crumb_levels'] = $arr_levels ;
    
    }
    
    /**
     * Add called page to the Bredcrumb session array and returns the new breadcrumb string.
     * @param string $title        : Title for the href tag.
     * @param string $action     : predefined actions, now supports 'reset'.
     * @param string $level        : Page level. Calling controller name by default.
     */
    function getHtml($title = null, $what_to_do=null, $level = null)
    {
        $this->addThisPage($title, $what_to_do, $level)    ;
    
        $arr_links    = $this->Session->read('crumb_links') ;
        $arr_titles    = $this->Session->read('crumb_titles') ;
        $last_index    = count($arr_titles) - 1        ;
        $string        = '' ;
        for ($i = 0  ; $i <= $last_index  ; $i++) {
            $title    =    $arr_titles[$i]    ;
            $link    =    $arr_links[$i]    ;
            if ($i < $last_index) { // no need to build link for last item
                $link = sprintf('<a href="%s" class="%s">%s</a> %s ', $link, $this->link_class, $title, $this->separator)        ;
            } else {
                $link = sprintf("<span class='%s'>%s</span>", $this->span_class, $title )                    ;     //last text, ie current page without link
            }
            $string    .=  $link                            ;
        }
        return $string;
    }
    
    
     function __stripAfter($arr, $after)
    {
        $count = count($arr)    ;
        for ($i = $after + 1 ; $i < $count ; $i++ ) {
            unset($arr[$i])    ;
        }
        return $arr ;
    }
    }
    ?>



Sample Code
;;;;;;;;;;;

app/contollers/wizards_controller.php

Controller Class:
`````````````````

::

    <?php 
    class WizardsController extends AppController {
    
    	var $helpers = array('Html', 'Crumb');
    	var $uses	 = array() ;
    
    	public function index(){
    	}
    	public function one(){
    	}
    	public function two(){
    	}
    	public function three(){
    	}
    }?>

app/views/wizards/index.ctp( or .thtml if you have old version of
cake)

View Template:
``````````````

::

    
    <?
    echo $crumb->getHtml('Home Page', 'reset' ) ;
    echo '<br /><br />' ;
    echo $html->link('One', 'one') ;
    ?>

app/views/wizards/one.ctp

View Template:
``````````````

::

    
    <?
    echo $crumb->getHtml('First Page', null, 'auto' ) ;
    echo '<br /><br />' ;
    echo $html->link('Two', 'two') ;
    ?>

app/views/wizards/two.ctp

View Template:
``````````````

::

    
    <?
    echo $crumb->getHtml('Second Page' , null, 'auto') ;
    echo '<br /><br />' ;
    echo $html->link('Three', 'three') ;
    ?>

app/views/wizards/three.ctp

View Template:
``````````````

::

    
    <?
    echo $crumb->getHtml('Third Page' , null, 'auto') ;
    ?>



.. author:: toxic_brain
.. categories:: articles, helpers
.. tags:: crumb,crumbs,pathway,Breadcrumbs,Helpers


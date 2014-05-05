Breadcrumbs
===========

This is my first contribution to cake's bakery. Here is Easy to use
breadcrumbs, Adding this functionality to your website is 'peace of
cake'. If you have any query's, comment and I will help as much as I
can.


Summary Check list
;;;;;;;;;;;;;;;;;;


#. Breadcrumb Component
#. Breadcrumb Helper
#. The layout
#. App Controller
#. Interact from your controller



1. Breadcrumb Component
```````````````````````

/app/controllers/components/breadcrumb.php

Component Class:
````````````````

::

    <?php 
    class BreadcrumbComponent extends Object {
    
        private $breadcrumbs = array();
    
        /*
         * @usage add breadcrumb to the list
         */
        public function addBreadcrumb($breadcrumb = array()) {
            if (is_array($breadcrumb)) {
              $this->breadcrumbs[] = $breadcrumb;
            }
        }
    
        /* 
         * @usage Return the breadcrumbs to the controller 
         * @return void
         */
        public function getBreadcrumbs() {
            return $this->breadcrumbs;
        }
    
    }
    ?>



2. Breadcrumb Helper
````````````````````
[p]/app/views/helpers/breadcrumb.php[p]

Helper Class:
`````````````

::

    <?php 
    class BreadcrumbHelper extends Helper {
    
        var $helpers    = array('Html');
        var $sHome      = 'Home';
        var $sAdmin     = 'Admin';
    
        public function display($aBreadcrumbs) {
    
            if (is_array($aBreadcrumbs)) {
    
            $sBreadcrumbsID = isset($this->params['admin']) ? 'breadcrumbs' : 'breadcrumbs_admin';
            $returnHTML = '<ul id="' . $sBreadcrumbsID . '">';
    
            # Build the first breadcrumb dependent on if admin area is active or the front end  
            $this->aFirstBreadcrumb = isset($this->params['admin']) ? array('title' => $this->sAdmin, 'slug' => 'admin/') : array('title' => $this->sHome, 'slug' => '');
            $returnHTML .= '<li>' . $this->Html->link($this->aFirstBreadcrumb['title'], "/" . $this->aFirstBreadcrumb['slug']) . '</li>';
    
            foreach($aBreadcrumbs as $key => $value) {
                $returnHTML .= '<li>' . $this->Html->link($value['title'], "/" . $value['slug']) . '</li>';
            }
    
            $returnHTML .= '</ul>';
            return $returnHTML;
            }
    
        }
    
    }
    ?>



3. The layout
`````````````
[p]/app/views/layouts/default.ctp

View Template:
``````````````

::

    
    <? if(isset($breadcrumbs)) : ?>
      <?=$breadcrumb->display($breadcrumbs); ?>
    <? endif; ?>



4. App Controller
`````````````````
[p]/app/app_controller.php

Controller Class:
`````````````````

::

    <?php 
    class AppController extends Controller {
    
        var $components = array('Breadcrumb');
        var $helpers    = array('Breadcrumb');
    
        function beforeRender() {
    
            /*
             * Breadcrumbs
             * The breadcrumbs variable will only be set if used in the controller action this saves time with setting 
             * the variable multiple times in different controllers/actions.
             */
            if (is_object($this->Breadcrumb)) {
                $this->set('breadcrumbs', $this->Breadcrumb->getBreadcrumbs());
            }
        }
    }
    ?>



5. Usage through any controller/action
``````````````````````````````````````

Controller Class:
`````````````````

::

    <?php 
    class StaticPages extends AppController {
    
        function view($id) {
            $this->Breadcrumb->addBreadcrumb(array('title' => 'Pages', 'slug' => '/example-of-page-slug'));
        }
    }
    ?>



.. author:: rees
.. categories:: articles, components
.. tags:: navigation,Breadcrumbs,Components


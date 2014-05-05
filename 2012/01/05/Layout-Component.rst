Layout Component
================

Configurable Layouts for themes
I am using Cake 2.0 (beta - havent upgraded properlly yet)

Using themes and redering different view files based on theme, I cam
across a limitation which locks you into using the same layouts for
view files in each theme. I had a need to change the layout in a new
theme so did not want to load the same layout file in
app/views/layouts which is dictated by the controller.

So I came up with a configurable approach to loading layouts which
removes hardcoding in individual controllers

It involves installing a custom Layout component. This component uses
Controller and Action mappings to advise which layout should be loaded
and centralises the configuration of layouts in app/config/core.php

The Layout Component class is here

::

    
    <?php
    class LayoutComponent extends Object {
    
        public function beforeRedirect(&$controller, $url, $status = null, $exit = true){}
        public function beforeRender(&$controller){}
        public function initialize(&$controller, $settings = array())
        {
            $this->controller = &$controller;
            if (is_array(Configure::read('App.controller.layouts'))) {
                $layoutMap = Configure::read('App.controller.layouts');
                foreach ($layoutMap as $key => $value) {
                    if ($key == $this->controller->name) {
                        if (is_array($value['action'])) {
                            // many action mappings apply but maybe not all
                            if (in_array($$this->controller->action, $value['action'])) {
                                if (isset($value['layout'])) {
                                    $this->controller->layout = $value['layout'];
                                }
                            }
                        } else if (isset($value['action']) && $value['action'] == '*') {
                            // All actions mappings apply
                            if (isset($value['layout'])) {
                                $this->controller->layout = $value['layout'];
                            }
                        }
                    }
                }
            }
        }
        public function shutdown(&$controller){}
        public function startup(&$controller){}
    }

To use it simply load it into your controller or AppController's
component array

eg:

::

    
    public $components = array(        
            'Layout'
        );

To configure layouts here is the setting to place in your core.php
file

::

    
    Configure::write('App.controller.layouts', array(
        'Pages' => array('action' => '*', 'layout' => 'my_layout')
        ));

The above configuration says load a layout file called 'my_layout' if
the controller requested is called 'Pages' and do this for any of
'Pages' actions

You can also single out actions in your configuration like so

::

    
    Configure::write('App.controller.layouts', array(
        'Pages' => array('action' => array('home'), 'layout' => 'my_layout')
        ));

The above configuration says load the 'my_layout' file only when the
requested controller name is 'Pages' and the action of this controller
is 'home'. All other actions will use the default layout still.

You can list as many controllers as required in the configuration like
so;

::

    
    Configure::write('App.controller.layouts', array(
        'Pages' => array('action' => '*', 'layout' => 'my_layout'),
        'Searches' => array('action' => array('index'), 'layout' => 'search_layout')
        ));

This may be useful to you and keeps your controllers cleaner and more
configurable.


.. author:: tpuglia
.. categories:: articles, components
.. tags:: Layouts,component,Components


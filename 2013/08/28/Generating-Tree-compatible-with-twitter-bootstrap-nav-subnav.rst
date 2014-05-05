Generating Tree compatible with twitter bootstrap nav subnav
============================================================

I needed a helper which show my Menu items in twitter bootstrap
navigation bar format with unlimited deep. First i did google for
finding it but there was no result or there was not free. So i will
show you how i did do that.
first of all:
My MenuItems Model has simple fields: id,parent_id,title,link,lft,rght
and it's actsAs Tree (Behavior)

so after i fetched data in threaded mode with find function i passed
it to this little tiny long time function in a helper:

::

    
        public function renderMenu($array,$root=true,$hasChildren=false) {
            if (count($array)) {
                if ($root)
                    echo "\n<ul class=\"nav\">\n";
                else
                    if ($hasChildren)
                        echo "\n<ul class=\"dropdown-menu\">\n" ;
                    else
                        echo "\n<ul>\n";
                foreach ($array as $vals) {
    
                    if (count($vals['children']) && (!$hasChildren))
                        $liClass="dropdown" ;
                    else
    					if ($hasChildren && count($vals['children']))
    						$liClass = 'dropdown-submenu' ;
    					else
    						$liClass=null ;
    
    
                    echo "<li " ;
                    if (!is_null($liClass))
                        echo 'class="'.$liClass.'"' ;
    
                    echo " id=\"".$vals['MenuItem']['id']."\">".$this->Html->link($vals['MenuItem']['title'],$vals['MenuItem']['link'],array('class'=>'dropdown-toggle', 'data-toggle'=>'dropdown'));
                    if (count($vals['children'])) {
                        $this->renderMenu($vals['children'],false,true);
                    }
                    echo "</li>\n";
                }
                echo "</ul>\n";
            } 
        }

it will print out a Bootstrap navigation bar compatible nested ul li.

Regards


.. author:: cybercoder
.. categories:: articles, helpers
.. tags:: helper,tree,bootstrap,Helpers


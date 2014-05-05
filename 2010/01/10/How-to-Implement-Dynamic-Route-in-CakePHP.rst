How to: Implement Dynamic Route in CakePHP
==========================================

You may want people to define the url of their site. Can we add
dynamic route in order to send the request to corresponding
controller? The answer is YES.
I've found a method to implement Dynamic Route in CakePHP.
If we develop a CMS program using CakePHP, we often let people to
define their menu code. The menu code basically is the URL path.
For example: An admin create a menu named 'Milk Product', and give
this menu a code 'product'.
He wish to access this menu via /product

So we can add a static route in routes.php
Router::connect('/product', array('controller' => 'product', 'action'
=> 'index'));

But one day, he want to change the menu code from 'product' to
'milkproduct'? What to do then? Ask the site admin to edit the
routes.php? Of course not.

We can use the code below to resolve this problem.

::

    $menus = '';
    //Cache::delete('routemenus'); You can uncomment this to delete cache if you change menus
    if($menus = Cache::read('routemenus') === false){
        echo 'load from db';
        $menusModel = ClassRegistry::init('Menu');
        $menus = $menusModel->find('all', array('conditions' => array('parent_id' => '1')));
        Cache::write('routemenus', $menus);
    }
    
    foreach($menus as $menuitem){
        Router::connect('/' . $menuitem['Menu']['code'] . '/:action/*', array('controller' => $menuitem['MenuType']['code'], 'action' => 'index'));
    }
    
    Router::connect('/', array('controller' => 'homepage', 'action' => 'index'));

We have 2 menu related tables: menus and menu_types.
Their structure as belows:
menus

id

menu_type_id

parent_id

lft

rght

code

name

created

modified

menu_types

id

code

name

created

modified
The code in menu_types means the controller name, and the code in
menus means the path.


.. author:: iworm
.. categories:: articles, tutorials
.. tags:: databse driven,dynamic route,Tutorials


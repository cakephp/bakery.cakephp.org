Jquery Engine Helper patch for updating multiple divs via AJAX
==============================================================

This article is focused on CakePHP 1.3.8 and the users who moved to Js
Helper (jQuery). The part below contains all the code needed for
performing multiple `div` update via ajax.


Edit Cake Helper
================

If you want to update multiple div elements using a link or ajax call,
you have to edit the file `cake/libs/view/helpers/jquery_engine.php`.
In `function request(...` there's the php code generating javascript
for the `update` key in `options` array.

::

    $success .= $this->jQueryObject . '("' . $options['update'] . '").html(data);';

It is necessary to add a check before this line of code, resulting in:

::

    if(is_array($options['update'])){
        $success .= 'var temp = ' . $this->jQueryObject . '("<div/>").html(data);';
        foreach($options['update'] as $divId){
            $success .= $this->jQueryObject . '("' . $divId . '").html(' . $this->jQueryObject . '("' . $divId . '", temp).html());';
        }
    } else {
        $success .= $this->jQueryObject . '("' . $options['update'] . '").html(data);';
    }



Use the Helper
==============

I'm using this code for updating 2 divs via ajax. Here some code for
testing:

::

    <?php
    echo $this->Js->link('works', '/works/', array('update' => array('#content', '#versatile'), 'evalscripts' => true, 'before' => $this->Js->get('#content,#versatile')->effect('fadeOut', array('buffer' => false)), 'complete' => $this->Js->get('#content,#versatile')->effect('fadeIn', array('buffer' => false)))); ?>

The `works_controller` contains the action index which returns 2 `div`
elements, respectively having `content` and `versatile` as `id`.
CakePHP understands automatically if incoming requests areAJAX calls
(and render them as we expect) by using `RequestHandler` component and
`Js` helper.



.. author:: lucabelluccini
.. categories:: articles, helpers
.. tags:: AJAX,update,jquery helper,cakephp 1.3,Helpers


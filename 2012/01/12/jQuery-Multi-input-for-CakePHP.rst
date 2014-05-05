jQuery Multi-input for CakePHP
==============================

I apologize for my English! This plugin helps you create are
automatically added inputs. They can be used by adding a few pages of
the book.
`men__1@mail.ru`_ for any questions

Code for view:
--------------

::

    
    <?php
    echo $this->Html->script('jquery-1.7.1.min');
    echo $this->Html->script('jquery.multinput');
    echo $this->Form->create();
    echo $this->Form->input('User.name');
    ?>
    <div id="multi-input">
        <?php
        echo $this->Form->input('User.Children.multi_i.name');
        echo $this->Form->input('User.Children.multi_i.age');
        ?>
    </div>
    <?php
    echo $this->Form->end('test');
    ?>
    <script>
    $(function() {
        $("#multi-input").multinput();
    });
    </script>



Options for plugin:
~~~~~~~~~~~~~~~~~~~

+ **myPag** - Object for paginator. If not passed, the paginator will
  be posted after the current object.
+ **iterator** - The string to be replaced by an array index
+ **addText** - The text for the button to add input
+ **hideOld** - Hide the new inputs or no


Code for jQuery plugin:
-----------------------

::

    
    jQuery.fn.multinput = function(options) {
        var options = jQuery.extend({
            myPag: false, 
            iterator: "multi_i",
            addText: "Add",
            hideOld: true
        }, options);
        
        var deffContent;
        var count = 1;
        return this.each(function(){
            var thisM = this;
            deffContent = jQuery(thisM).clone();
            var tmpContent = deffContent.clone();
            tmpContent.find("input").each(function() {
                jQuery(this).attr("name", jQuery(this).attr("name").replace(options.iterator, count));
            });
            jQuery(thisM).html("<div multi_i='" + count + "'>" + tmpContent.html() + "</div>");
            if(options.myPag == false) {
                jQuery(thisM).after("<div id='multi-paginator'></div>");
                var paginator = jQuery("#multi-paginator");
            } else {
                var paginator = options.myPag;
            }
            paginator.html("<ul><li><a class='multi-add' href='#'>" + options.addText + "</a></li><li class='active'><a href='#'>" + count + "</a></li></ul>");
            if(options.hideOld) {
                paginator.find("ul li a").live("click", function() {
                    if(!jQuery(this).hasClass("multi-add")) {
                        var id = $(this).text();
                        jQuery(thisM).children().each(function() {
                            if($(this).attr("multi_i") == id) {
                                $(this).show();
                            } else {
                                $(this).hide();
                            }
                        });
                    }
                });
            }
            paginator.find("ul li a.multi-add").click(function() {
                count++;
                paginator.find("ul li").removeClass("active").parent().append("<li class='active'><a href='#'>" + count + "</a></li>");
                var tmpContent = deffContent.clone();
                tmpContent.find("input").each(function() {
                    jQuery(this).attr("name", jQuery(this).attr("name").replace(options.iterator, count));
                });
                if(options.hideOld) {jQuery(thisM).children().hide();};
                jQuery(thisM).append("<div multi_i='" + count + "'>" + tmpContent.html() + "</div>");
            });
        });
    };



Result
------

::

    
    Array
    (
        [User] => Array
            (
                [name] => menOne
                [Children] => Array
                    (
                        [1] => Array
                            (
                                [name] => Max
                                [age] => 34
                            )
    
                        [2] => Array
                            (
                                [name] => Jon
                                [age] => 23
                            )
    
                        [3] => Array
                            (
                                [name] => Frad
                                [age] => 5
                            )
    
                    )
    
            )
    
    )

`men__1@mail.ru`_ for any questions

.. _men__1@mail.ru: mailto:men__1@mail.ru

.. author:: MenOne
.. categories:: articles, snippets
.. tags:: CakePHP,jquery,plugin,input,multi,multi input,Snippets


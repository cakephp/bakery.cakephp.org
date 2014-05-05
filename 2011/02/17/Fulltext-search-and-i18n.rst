Fulltext search and i18n
========================

Fulltext MySQL search using MATCH () AGAINST () and the i18n tables
requires a more complex search query.
First, add a FULLTEXT index to your i18n MySQL table:

::

    ALTER TABLE `i18n` ADD FULLTEXT `content` ( `content` );


For your query, you need to create an "OR" condition with an entry for
every field you want to add to your search. In my example, I search
the 'title' and 'text' fields of a Post model.
The `"I18n__"` prefix for your fieldname is the automagic CakePHP naming
for your i18n content relations.


In your controller
``````````````````

::


    <?php
        $conditions = array('OR' => array());
        foreach( array('title','text') as $field ) {
            $conditions['OR']['MATCH(I18n__'.$field.'.content) AGAINST(?)'] =
                $keywords;
        }
        $results = $this->Post->find('all', array('conditions' => $conditions));
    ?>

That should be it!



.. author:: macjoost
.. categories:: articles, tutorials
.. tags:: i18n,fulltext,mysql,match against,Tutorials


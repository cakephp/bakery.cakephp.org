Don't forget afterFind callback
===============================

Many beginners like me ask something like, how could I get total
comments count for a post? of course, there are many answers, but the
most easier answer is " Don't forget afterFind callback in your Post
model!

Suppose that you have Post and Comment model where Post model hasMany
Comment while Comment model is belongsTo Post. Now we want to find all
posts and each post's comment count, we may do the following code in
posts_controller:

::

    function index(){
       $this->Post->unbindModel(array('hasMany' => array('Comment')), false);
       // Notice the above line
       $posts = $this->Post->find('all');
       $this->set('posts', $post);
    }

We used unbindModel method to improve performance by stopping non
required database queries to the Comment model. Now lets we look at
the magic of afterFind in our Post model:

::

    function afterFind($results, $primary = false) {
    parent::afterFind($results, $primary);
    foreach($results as $key => $val){
      if (isset($val['Post']['id'])){    
        $results[$key]['Post']['commentsCount'] = $this->Comment->find('count', array('conditions' => array('Comment.post_id' => $results[$key]['Post']['id'])));
      }
    }
    return $results;
    }

In the above code, we could able to add new key -commentsCount- to the
Post result array and its value is retrieved from the Commen model.
Using this solution we could able to do the following in the index
view:

::

    <?php foreach ($posts as $post): ?>
    <h1><?php echo $post['Post']['title'];?></h1>
    <span>There are <?php echo $post['Post']['commentsCount'];?> comments for this post</span>
    <div><?php echo $post['Post']['content'];?></div>
    <?php endforeach; ?>



I tested this code using CakePHP 1.2.11 and the following is the
documentation link for afterFind
callback:`https://book.cakephp.org/1.2/en/view/681/afterFind`_

I hope this article to be useful for you and it is clear that it may
be applied for any hasMany relations.


.. _https://book.cakephp.org/1.2/en/view/681/afterFind: https://book.cakephp.org/1.2/en/view/681/afterFind

.. author:: saidbakr
.. categories:: articles
.. tags:: model,hasMany,afterFind,comments count,Articles


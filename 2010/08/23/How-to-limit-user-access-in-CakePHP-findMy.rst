How to limit user access in CakePHP: findMy
===========================================

Perhaps like many people starting a CakePHP project, I created a `site
where users could log in and create/modify their own files`_ (in my
case Japanese flashcards and tests) while not being able to screw with
other people's stuff. One would think that you could solve this with
some nifty ACL and Auth work, but if you thought that, then you would
be [b]wrong[/b].
Unforunately ACL only lets you determine what actions a user is
allowed to perform, not on which items they're allowed to perform it.

And Auth only checks to make sure a person is logged in, not who they
are or what they're doing.

The Traditional Way
~~~~~~~~~~~~~~~~~~~
However, thanks to the glory of cake, it's not that hard to limit a
search by user! Just replace your find with the following function.


Controller Class:
`````````````````

::

    <?php
    $my_file = $this->SomeModel->findAllByUserId($this>Auth->user(id);
    ?>

And we're done!

Oops! Not so fast!
``````````````````
We just got all of the SomeModels! Well crap , I guess we'll have to
make an option array


Controller Class:
`````````````````

::

    <?php
    $opt = array(
       'conditions' => array(
          'SomeModel.user_id' => $this->Auth->user('id'),
       ),
       'order' => 'SomeModel.date DESC',
    );
    $my_file = $this->SomeModel->find('first', $opt);
    ?>

That's a lot of work for just getting my latest SomeModel. Even more
work if I have to replace every instance of a simple find with
something like that. I also need to do the same thing for every save
and delete as well to make sure that they're not saving over someone
else's data.

Sure, I could put that code throughout all my Controllers, but that's
messy -- and if I forget to put it somewhere someone gets their data
deleted.

So what can we do?
~~~~~~~~~~~~~~~~~~
Well, I don't know about you, but I put a function in my AppModel file
that lets me easily make sure that whoever's touching the file has
permission to do so.


Model Class:
````````````

::

    <?php
    function findMy($type, $options=array())
    {
       if($this->hasField('user_id') && !empty($_SESSION['Auth']['User']['id'])){
          $options['conditions'][$this->alias.'.user_id'] = $_SESSION['Auth']['User']['id'];
          return parent::find($type, $options);
       }
       else{
          return parent::find($type, $options);
       }
    }
    ?>


What this does
``````````````

#. Make sure that the model has an 'user_id' field
#. Make sure that the user is logged in
#. Add the user_id condition to the find options

    + Be sure to use the $this->alias in case you're using an alias for
      the Model in a BelongsTo or HasMany relationship.

#. Find the data

This is a pretty simple function, and can form the base for any logic
that you want to do.

For example, if you want to allow Admins to view anything, just add an
$_SESSION['Auth']['User']['role'] == 'admin' to the mix.

If you want to allow users access to any 'public' items, add a
condition for 'OR is_public == true'

Extending the function
~~~~~~~~~~~~~~~~~~~~~~
This function is set in the AppModel, so it can be overridden in any
of your defined models if you need to do any custom filtering on a
per-model basis.

Also, it is possible to extend this to save and delete functions, to
make sure that users are only saving or deleting their own files. If
they try to delete a file that doesn't belong to them, return false
and alert the user that that file could not be found.


Model Class:
````````````

::

    <?php
    function deleteMy($id = null, $cascade = true)
    {
       if (!empty($id)) {
          $this->id = $id;
       }
       $id = $this->id;

       if($this->hasField('user_id') && !empty($_SESSION['Auth']['User']['id'])){
          $opt = array(
             'conditions' => array(
                $this->alias.'.user_id' => $_SESSION['Auth']['User']['id'],
                $this->alias.'.id' => $id,
                ),
             );
          if($this->find('count', $opt) > 0){
             return parent::delete($id, $cascade);
          }
          else{
             return false;
          }

       }
       else
          return parent::delete($id, $cascade);
    }
    ?>



Conclusion
~~~~~~~~~~
The power of CakePHP comes from it's infinite extensibility, and the
fact that at it's core, it's still just a PHP program .

While I recommend following MVC practices, and to use the built-in
CakePHP functions as much as possible, there are times when `you just
need to do it the simple way`_.

Also, for those who balk at my use of $_SESSION, I talked with one of
the CakePHP core developers at a conference a while ago, and was
asking him about this problem.

I asked,
"Why is Auth only available in controllers? It would be much more
useful if we could use it everywhere. Is it a design decision?" He
replied.
"Because it's a component. That's the only reason." Remember: the
framework is there to help you . You are not its slave.

Taken from:
`http://blog.japanesetesting.com/2010/05/07/how-to-limit-user-access-in-cakephp-findmy/`_

.. _site where users could log in and create/modify their own files: http://japanesetesting.com
.. _http://blog.japanesetesting.com/2010/05/07/how-to-limit-user-access-in-cakephp-findmy/: http://blog.japanesetesting.com/2010/05/07/how-to-limit-user-access-in-cakephp-findmy/
.. _you just need to do it the simple way: http://blog.japanesetesting.com/2009/11/24/the-programmers-folly-simple-is-best/

.. author:: harisenbon
.. categories:: articles, tutorials
.. tags:: system design,Tutorials


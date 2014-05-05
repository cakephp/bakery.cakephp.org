SQL INSERT with known primaryKey from CakePHP Model::save()
===========================================================

I've asked myself and others quite a number of times if this is even
possible in CakePHP, and always, always the answer has been that since
CakePHP uses the presence/absence of the Model's id to do a save or
update - that it's impossible. Today I show you how.

So - you have a table which, for whatever reason you wish to specify
the value of the primary key when you insert into it. You "can't do
that in CakePHP". Well, you can. And it's not that difficult to do
either.

Create a table.
` createtabletests(idintprimarykeynotnull,titletinytextnotnull);`
Bake your models / controllers / views.

Add this to your model:

::

    
    function set($one, $two = null) {
        parent::set($one, $two);
        // if not already found in database
        if (!$this->exists()) {
            if ($this->id) {
                $this->data[$this->alias][$this->primaryKey] = $this->id;
                $this->id = false;
            }
        }
    }

Add this line to your add.ctp (replace 'id' with your model's
primaryKey if you need to):
` echo$this->Form->input('id',array('type'=>'text'));`
Note that this will not prevent you from overwriting a record of the
same id, in which case your add form becomes the same as an edit form,
but without the prior data.

If you wish to prevent this, add a validation rule for id on create
which checks for the presence of the record. You should be validating
your id now anyway.

Note that this is more useful if you really need to be able to
insert/update a known id - typically which has been generated code
somewhere.

As always when using clever hacks, be careful to weigh the costs and
benefits. I've never been in a situation where I needed this enough to
find it.



.. author:: Iiridayn
.. categories:: articles
.. tags:: model,save,id,hack,primaryKey,Articles


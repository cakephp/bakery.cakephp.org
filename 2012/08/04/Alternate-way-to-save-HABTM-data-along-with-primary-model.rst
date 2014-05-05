Alternate way to save HABTM data along with primary model
=========================================================

The CakePHP documentation on saving HABTM data didn't cover a use-case
my app needed. My form submits a comma-separated list of associated-
model ids to save with a user. With a little data-format massaging, I
found a way to save it all with one call to Model->save(...).

My app has a schema with a User model and Equipment model that share a
HABTM relationship. In other words, one or more users may be the go-to
contacts for one or more pieces of equipment. Because there are
already over 100 pieces of equipment, using a multi-select drop-down
or checkboxes for Equipment on the User edit form might get awkward
and unwieldy on what should be a simple form. So I took a different
tack and used an auto-complete edit box. When the user types part of a
name and selects a piece of equipment from the displayed matches, it
shows that piece of equipment in the list of equipment already
associated with that user along with a little "x" icon that will allow
him to remove it again. Using the auto-complete box and the "x" image-
links, he can add or remove equipment from the list until he is ready
to submit the form.

When the user submits the form, a Javascript submit-event-handler
generates an array of ids of the form "1,2,3,4..." and inserts it into
a hidden field that gets submitted with the form.

So Controller->request->data will look something like this:

::

    $data = array(
      'Equipment' => '37,97,98',
      'User' => array(
        'id' => '99',
        'username' => 'testuser1',
        'fullname' => 'Test User',
        'phone' => '222-2222',
        'email' => 'foo@bar.baz',
        'Role' => '2'
      ),
    );

I need to convert that 'Equipment' element to this:

::

    'Equipment' => array(37, 97, 98)

That's easy:

::

    $data['Equipment'] = array_split(',', $data['Equipment']);

Now I can save the User along with the list of equipment he's related
to:

::

    $result = $this->User->save($data, array(
      'validate' => true,
      'fieldList' => null,
    ));

I'm taking the time to post this because I struggled with this for
some time. The documentation seemed to indicate that I needed to post
an array like this:

::

    $data = array(
      'Equipment' => array(
          array('equipment_id' => 37),
          array('equipment_id' => 97),
          array('equipment_id' => 98),
      ),
      'User' => array(
        'id' => '1',
        'username' => 'testuser1',
        'fullname' => 'Test User',
        'phone' => '222-2222',
        'email' => 'foo@bar.baz',
        'Role' => '2'
      ),
    );

That resulted in the Cake core generating one insert statement for
equipment_id=37, followed by two update statements for id's 97 and 98.
So the final result would be that the query

::

    select * from equipment_users where user_id = 99

would produce only

::

    array(
    (int) 0 => array(
        'equipment_users' => array(
            'equipment_id' => '98',
            'user_id' => '1'
        )
    )
    )

instead of the desired

::

    array(
    (int) 0 => array(
        'equipment_users' => array(
            'equipment_id' => '98',
            'user_id' => '1'
        )
    ),
    (int) 1 => array(
        'equipment_users' => array(
            'equipment_id' => '37',
            'user_id' => '1'
        )
    ),
    (int) 2 => array(
        'equipment_users' => array(
            'equipment_id' => '97',
            'user_id' => '1'
        )
    )
    )

I hope this helps someone. I also hope that one of the regular
contributors to the CakePHP documentation can work with me to find a
way to include this use-case in the chapter on `Saving Your Data`_.


.. _Saving Your Data: http://book.cakephp.org/2.0/en/models/saving-your-data.html

.. author:: lsiden
.. categories:: articles
.. tags:: Articles


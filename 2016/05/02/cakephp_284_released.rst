CakePHP 2.8.4 Released
======================

The CakePHP core team is happy to announce the immediate availability of CakePHP
2.8.4. This is a maintenance release for the 2.8 branch that fixes several
community reported issues.

Bugfixes
--------

You can expect the following changes in 2.8.4. See the `changelog
<http://cakephp.org/changelogs/2.8.4>`_ for every commit.

* ``FormHelper::postLink()`` now correctly generates SecurityComponent field
  hashes when used within another form. (@MarkusBauer)
* ``Validation::phone()`` now accepts 'N11' exchanges for North American phone
  numbers. (@markstory)
* The Equifax Secure Certificate Authority root certificate was re-added. This
  fixes several issues with the certificate bundle update in 2.8.3. (@markstory)
* BlowfishPasswordHasher now generates a random salt when comparing to a hashed
  password of ''. This prevents incorrect password matching on empty values.
  (@markstory)
* FixtureTask honours the ``--records`` and ``--schema`` options when creating
  a fixture in a non-interactive fashion. (@markstory)
* Several missing European locales were added (@bancer)
* HTTP Range header parsing is more resilient (@markstory)
* A regression introduced in 2.8.0 in FormHelper when handling the deprecated
  ``action`` option has been fixed. (@markstory)

Minor Features
--------------

* Improved API docs (@jrbasso, @ravage84)
* Added example configuration for using letsencrypt with CakePHP. (@ravage84)
* You can now set the Response class used in ``ControllerTestCase`` (@felixmaier1989)

As always, a huge thanks to all the community members that helped make this
release happen by reporting issues and sending pull requests.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news
.. tags:: release, news

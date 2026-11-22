CakePHP 5.4.5 and 4.6.7 Released
================================

The CakePHP core team is happy to announce the immediate availability of CakePHP
5.4.5. This is a maintenance release for the 5.4 branch that fixes security
issues, community reported issues, regressions. The security fixes have also
been released as 5.2.17, 5.3.9, and 4.6.7. Security advisories will be released
in the future as they are assigned CVE numbers.

Bugfixes
--------

You can expect the following changes in 5.4.4. See the `changelog
<https://github.com/cakephp/cakephp/compare/5.4.4...5.4.5>`_ for every commit.

* Improved API docs, and assertions in tests.
* Fix ``SlidingWindowRateLimiter`` allowing unlimited requests when window
  values were decayed.
* Fix potential divide by zero error in ``SlidingWindowRateLimiter``.
* Fix ``EavStrategy`` a potential data corruption issue caused by not applying
  ``model`` conditions when finding existing translations.
* ``CheckboxWidget`` and ``FormHelper::control()`` now HTML escape the
  ``value`` attribute.
* Split package dependencies and suggested packages were updated.
* Fix potential SQL injection weakness in ``WindowExpression`` and
  ``StringAggExpression`` when unvalidated array values were passed as
  parameters.
* Fix regression in ``FunctionsBuilder::cast()`` that would forbid valid
  postgres types like ``int[]``.
* ``MultiCheckboxWidget`` and ``FormHelper::control()`` now HTML escape the option
  group names of select inputs rendered as multiple checkboxes.
* Fix potential header injection if ``Http\Client`` is provided user controlled
  data as header values.

In 4.6.7 you the following changes were made. See the
`changelog<https://github.com/cakephp/cakephp/4.6.6..4.6.7>`_ for every commit.

* ``CheckboxWidget`` and ``FormHelper::control()`` now HTML escape the
  ``value`` attribute.
* Fix potential SQL injection weakness in ``WindowExpression`` and
  ``StringAggExpression`` when unvalidated array values were passed as
  parameters.
* Fix regression in ``FunctionsBuilder::cast()`` that would forbid valid
  postgres types like ``int[]``.
* ``MultiCheckboxWidget`` and ``FormHelper::control()`` now HTML escape the option
  group names of select inputs rendered as multiple checkboxes.

Contributors to 5.4.4
----------------------

Thank you to all the contributors that submitted a pull request:

* ADmad
* Dylan Pulver
* Jasper Smet
* Kevin Pfeifer
* Mark Scherer
* Mark Story
* Mikkel Bonde Wiuff
* Mirko Pagliai
* Val Bancer

As always, we would like to also thank all the contributors that opened issues,
or updated the documentation.

Download a `packaged release on github
<https://github.com/cakephp/cakephp/releases>`_.

.. author:: markstory
.. categories:: release, news, security
.. tags:: release, news, security

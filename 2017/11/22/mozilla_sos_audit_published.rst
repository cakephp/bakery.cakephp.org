Mozilla Secure Open Source security review published
====================================================

Earlier this year we were contacted by Mozilla and notified that our application
to the `Mozilla Secure Open Source
<https://blog.mozilla.org/blog/2016/06/09/help-make-open-source-secure/>`_
program was accepted and that we would be receiving a review through the SOS
program.

The SOS program provides security auditing, remediation, and
verification for key open source software projects, and is funded by `Mozilla's
Open Source Support
<https://blog.mozilla.org/blog/2015/10/23/mozilla-launches-open-source-support-program/>`
fund.

The CakePHP audit was performed by `NCC Group <https://www.nccgroup.trust/>`_.
The CakePHP team was actively participated and was available to the NCC team
throughout the audit and remediation.

The audit uncovered 1 High, 5 Medium, 9 Low, and  5 Informational issues. Where
possible these issues have been fixed as of 3.5.6. The recommended changes to
random number generation and form tampering prevention tokens will be released
in 3.6.0 as their fixes could potentially disrupt applications.

We'd like to thank both Mozilla for funding the audit and NCC Group for their
time and expertise. The `full audit report
<https://wiki.mozilla.org/images/4/40/Cakephp-report.pdf>`_ and `fix and
validation log
<https://docs.google.com/document/d/1oJg5XqEZasm6RE-Ql7D7OUSiUhXFKApCPMwZxFaq0W8/edit#>`_
are available.

.. author:: markstory
.. categories:: news, security
.. tags:: news, security

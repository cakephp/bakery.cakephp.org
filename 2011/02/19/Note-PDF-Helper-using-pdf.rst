Note: PDF Helper using pdf
==========================

This article is to inform bugs when we use this post
http://bakery.cakephp.org/articles/sdevore_myopenid_com/2007/01/18/pdf-helper-using-pdf-php

I have followed this article:
`http://bakery.cakephp.org/articles/sdevore_myopenid_com/2007/01/18/pdf-helper-using-pdf-php`_
To complete the guides, we need to modify
something as follow: 1. In the pdf.php file, add the command: var
$helpers = array(); 2. Use file "views/layouts/pdf.ctp instead of
pdf.thtml 3. Don't need to add this header output, means that removing
the like header("Content-type: application/pdf");


.. _http://bakery.cakephp.org/articles/sdevore_myopenid_com/2007/01/18/pdf-helper-using-pdf-php: http://bakery.cakephp.org/articles/sdevore_myopenid_com/2007/01/18/pdf-helper-using-pdf-php

.. author:: tung
.. categories:: articles, helpers
.. tags:: pdf helpers,Helpers


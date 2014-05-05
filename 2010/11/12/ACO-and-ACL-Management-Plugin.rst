ACO and ACL Management Plugin
=============================

There are a couple of these out there already but this is based on the
tutorial in the documentation. Leaving ARO Management out because
those are created automatically with users and groups.

Just extract the contents to your plugins directory and access it by
going to `http://yoursite/acls.`_ You may need to initially rebuild
the ACOs but there is a button for that. Then grant yourself access to
the plugin's ACOs and remove the $this->Auth->allow('*') from the 3
controllers. I can't get the file to attach so to download the code
and get more info visit `http://www.jbcrawford.net/archives/314`_


.. _http://www.jbcrawford.net/archives/314: http://www.jbcrawford.net/archives/314
.. _http://yoursite/acls.: http://yoursite/acls.

.. author:: jbcrawford
.. categories:: articles, plugins
.. tags:: acl,aco,Plugins


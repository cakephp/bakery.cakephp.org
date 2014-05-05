Sync ACL acos Alias and View ACLs easily
========================================

While following the tutorial at http://book.cakephp.org/view/1543
/Simple-Acl-controlled-Application , I found it very frustrating that
the AclBehavior didn't set User and Group aliases, nor was there a
simple way to view what permissions I had set.


Keeping aro.alias in Sync
=========================

For this purpose, I took advantage of a simple trigger:

::

    CREATE TRIGGER fix_alias BEFORE INSERT ON aros FOR EACH ROW SET NEW.alias = CONCAT(NEW.model, '.', NEW.foreign_key)`

If this is done prior to adding users and groups, the alias will
automatically be set to User.<user_id> or Group.<group_id>, otherwise
you may also have to do a:

::

    UPDATE acos SET alias = CONCAT(model, '.', foreign_key) WHERE 1`

I found this quiet useful when using `Rafael Soto's ACL Tutorial`_.


Viewing all set ACL's Easily
============================

For this, another simple SQL query - it will show the model, view,
user/group, and the ID in the aros_acos table should it need to be
manually removed.

::

    SELECT aros_acos.id permission_id, ac2.alias parent, ac1.alias what, aros.alias who, _create allow FROM aros_acos LEFT JOIN aros ON aro_id = aros.id LEFT JOIN acos ac1 ON aco_id = ac1.id LEFT JOIN acos ac2 ON ac1.parent_id = ac2.id WHERE 1

Quick and easy, but a lifesaver when I've already forgotten what I've
done.


.. _Rafael Soto's ACL Tutorial: http://net.tutsplus.com/tutorials/php/how-to-use-cakephps-access-control-lists/

.. author:: jtsage
.. categories:: articles, tutorials
.. tags:: acl,authentication,acl auth permissions,Tutorials


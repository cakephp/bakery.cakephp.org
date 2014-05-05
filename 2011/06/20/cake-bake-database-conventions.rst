cake bake database conventions
==============================

Trying to document all of the database conventions for cake bake


Currently the only conventions I've been able to easily find are:
=================================================================


Table and Field Names:
----------------------
All table names should be plural.
All foreign keys should be 'SingularTableName_TableField' this will
make a list box with the foreign keys, and associate relationships.


Data Types:
-----------
char[36] on 'id' makes a UID, somewhat better idea than using an int
with AUTO_INCREMENT
NOT NULL automatically makes a required field
Field names 'created' and 'modified' when using DATETIME will always
be hidden and will have correct created and modified dates where
expected.


Feedback:
---------
Anyone else know any other goodies that make cake bake help DB
engineers work smarter?



.. author:: alphaseinor
.. categories:: articles
.. tags:: Articles


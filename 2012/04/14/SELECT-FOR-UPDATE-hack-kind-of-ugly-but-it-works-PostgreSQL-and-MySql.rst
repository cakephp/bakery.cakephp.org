SELECT FOR UPDATE (hack) (kind of ugly but it works) (PostgreSQL and MySql)
===========================================================================

Sometimes one needs to do a SELECT ... FOR UPDATE in order to preserve
the integrity of our transactions. This isn't at the moment supported
by CakePHP model find operations. Here is a use-at-you-own-discretion
'hack', which saves coding time if you are in a hurry (like me at the
moment) or don't mind writing a useful behaviour for all of us.

Sometimes one needs to do a SELECT ... FOR UPDATE in order to preserve
the integrity of our transactions. The problem can be seen easily with
the following example:

Suppose we have a user, an `account table` with the
`account.available_money` field on it. Suppose the user has initially
$100.

The problem arrives if the hacker manages to concurrently run two
processes (only the relevant generated queries by `find()` and
`save()` are shown) :

One process does:

::

    BEGIN
    SELECT available_money from account where user_id = '1' ; -- $money = $100
    UPDATE account SET available_money = 0 where user_id = '1'; -- the user buy $100 and depletes his account
    COMMIT

While another *concurrent* process does

::

    -- php process _also_ finds $100 money so the user can user can use the $100 again it _again_
    BEGIN
    SELECT available_money from account  where user_id = '1'; // $money = $100
    UPDATE account SET available_money = 0 where user_id = '1'; //the user buys _again_ $100 and he depletes his account
    COMMIT

If this happens, then the user could use more money than he is
entitled to. SELECT FOR UPDATE comes to the rescue. Following the
previous example

One process does:

::

    BEGIN
    SELECT available_money from account  where user_id = '1' FOR UPDATE; // $money = $100
    UPDATE account SET available_money = 0 where user_id = '1';
    COMMIT

While another *concurrent* process does

::

    BEGIN
    SELECT available_money from account where user_id = '1'; // now this second process must wait the first process to finish, so $money = $0
    -- the user doest not have money to buy anything
    COMMIT

Now, how to achieve this using CakePHP ?

CakePHP's dbo doesn't currently support FOR UPDATE syntax. BUT there
is a litlle quick and dirty (maybe too dirty for some) hack you can do
without doing any modifications to the core ...

Since in the dbo_source, in the `SELECT`statement, the `LIMIT` clause
gets parsed at last (see line 1497 from
cake/libs/models/dbo_source.php):

::

    switch (strtolower($type)) {
        case 'select':
            return "SELECT {$fields} FROM {$table} {$alias} {$joins} {$conditions} {$group} {$order} {$limit}";
        break;
        //...

If in a need, and if using PostgreSQL (mysql later), you *could* do

::

    $transac = $this->AccountModel->find('all', array(
        'conditions' => array(
            'user_id' =>$id
        ),
        'fields' => array('available_money'),
        'limit' => 'ALL FOR UPDATE'
    ));`

... and this would generate the `SELECT available_money from account
where user_id = '1' FOR UPDATE` clause we are looking for... The trick
is in the `'limit' => 'ALL FOR UPDATE'`. This selects ALL records that
match the conditions FOR UPDATE.

For MySql you would have to do something a lot uglier. Since MySql
doesn't support LIMIT ALL, you would have to use LIMIT
0,18446744073709551615. This is pretty horrible , I know... The other
options are to code a behavior for all of us : )

Just remember to put you `find` inside a transaction !

Watch out , there is a little (but important) catch... You can't do
`find('first)`, since the LIMIT clause would be overwritten by Cake as
`LIMIT 1`, instead you can do find('all', ... 'limit' => '1 FOR
UPDATE' ...)



.. author:: arod
.. categories:: articles
.. tags:: postgreSQL mysql "SELECT ... F,Articles


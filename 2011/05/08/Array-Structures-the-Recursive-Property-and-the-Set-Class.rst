Array Structures, the Recursive Property and the Set Class
==========================================================

Even after using CakePHP for a little while, I found that I was still
a bit confused by the structure of the arrays that are returned when
performing find operations on Models, how it's affected by changing
`the recursive property`_, and the SQL involved.

So, I decided to play around a bit with some of the associations on
the dev site I set up to try out the 'Blog' and 'Simple Aclo
controlled Application' tutorials. I used CakePHP 1.2.5 for this,
because that's what was current when I first set the dev site up!

recursive = -1
``````````````

Say we have a model, for example, for our application's users,
represented by M. If we perform a find operation on it such as

` $this->M->recursive=-1;
$result=$this->M->find('first');`

If we were to use debug() on $result, it would look something like
this:

::

    
    Array
    (
    	[M] => Array
    		(
    			[id] => 123
    			[name] => Stephen Thomson
    			[created] => 2010-05-04 15:07:41
    			[modified] => 2010-05-04 15:07:41
    			...
    		)
    )

(As this is just for illustrative purposes, the ellipsis represents
other columns that may be in the table 'm', which we don't need to
show here - I've included created and modified because they are part
of CakePHP's automagic features (as are id and name))

And if we were to examine the SQL dump, the SQL performed would have
been along the lines of:

SELECT *
FROM M

(Again, as this is just for illustrative purposes, I leave the use of
LIMIT 1 or TOP(1) etc. to your imagination)


recursive = 0
`````````````

Now, say there where associations between M and some other Models. If
we were to change the recursive property to:

` $this->M->recursive=0;
$result=$this->M->find('first');`

We would get a $result like...

::

    
    Array
    (
    	[M] => Array
    		(
    			[id] => 123
    			[name] => Stephen Thomson
    			[created] => 2010-05-04 15:07:41
    			[modified] => 2010-05-04 15:07:41
    			...
    			[mbt1_id] => 456
    			[mbt2_id] => 789
    		)
    		
    	[Mbt1] => Array	// Appears when $M->recursive > -1
    		(
    			[id] => 456
    			[name] => Red Squadron
    			[created] => 2010-05-04 15:01:39
    			[modified] => 2010-05-08 15:29:32
    			...
    		)
    	
    	[Mbt2] => Array	// Appears when $M->recursive > -1
    		(
    			[id] => 789
    			[name] => Vegetarian
    			[created] => 2010-05-03 12:57:08
    			[modified] => 2010-05-04 15:07:41
    			...
    		)
    	
    	[Mho] => Array // Appears when $M->recursive > -1
    		(
    			[id] => 234
    			[name] => N77XX18
    			[created] => 2010-05-05 09:22:39
    			[modified] => 2010-05-05 09:22:39
    			...
    			[m_id] => 123
    		)
    )

Where...

Mbt1 = A Model that M belongsTo (such as a squadron)
Mbt2 = Another Model, that M also belongsTo (say, a dietary group)
Mho = A Model that M hasOne of (e.g. a fighter craft)

The SQL involved this time, would be along the lines of

SELECT *
FROM M
LEFT JOIN Mbt1 ON M.mbt1_id = Mbt1.id
LEFT JOIN Mbt2 ON M.mbt2_id = Mbt2.id
LEFT JOIN Mho ON Mho.m_id = M.id

NOTE: If you're using CakePHP 1.3, I believe you can change the type
of join used between M and models it belongsTo by changing the 'type'
property in the M->belongsTo array - see the `CakePHP 1.3 Manual`_. I
haven't tried this myself


recursive = 1
`````````````

If we up the recursion level again, we will get yet more data back:

`$this->M->recursive=1;
$result=$this->M->find('first');`

This time the result includes more models...

::

    
    Array
    (
    	[M] => Array
    		(
    			[id] => 123
    			[name] => Stephen Thomson
    			...
    			[mbt1_id] => 456
    			[mbt2_id] => 789
    		)
    		
    	[Mbt1] => Array	// Appears when $M->recursive > -1
    		(
    			[id] => 456
    			[name] => Red Squadron
    			...
    		)
    	
    	[Mbt2] => Array	// Appears when $M->recursive > -1
    		(
    			[id] => 789
    			[name] => Vegetarian
    			...
    		)
    	
    	[Mho] => Array // Appears when $M->recursive > -1
    		(
    			[id] => 234
    			[name] => N77XX18
    			...
    			[m_id] => 123
    		)
    		
    	[Mhm] => Array	// Appears when $M->recursive > 0
    		(
    			[0] => Array
    				(
    					[id] => 432
    					[title] => I realised the other day that when flying by asteroid belts, one should always...
    					...
    					[m_id] => 123
    				)
    			[1] => Array
    				(
    					[id] => 434
    					[title] => My top tips for getting your bird off a swamp planet would be...
    					...
    					[m_id] => 123
    				)
    		)
    	[Mhabtm] => Array // Appears when $M->recursive > 0
    		(
    			[0] => Array
    				(
    					[id] => 567
    					[name] => 'Private Health Care'
    					...
    					[MhabtmM] => Array  // Appears only when columns other than m_id, mhabtm_id specified in Look-up table
    						(
    							[id] => 7
    							[m_id] => 123
    							[mhabtm_id] => 567
    						)
    				)
    			[1] => Array
    				(
    					[id] => 598
    					[name] => 'Parking'
    					...
    					[MhabtmM] => Array  // Appears only when columns other than m_id, mhabtm_id specified in Look-up table
    						(
    							[id] => 12
    							[m_id] => 123
    							[mhabtm_id] => 598
    						)
    				)
    			[2] => Array
    				(
    					[id] => 601
    					[name] => 'Pension'
    					...
    					[MhabtmM] => Array  // Appears only when columns other than m_id, mhabtm_id specified in Look-up table
    						(
    							[id] => 15
    							[m_id] => 123
    							[mhabtm_id] => 601
    						)
    				)
    		)
    )

Where...

Mhm = A Model that M hasMany of (for example, blog posts)
Mhabtm = A Model that M hasAndBelongsToMany of (e.g. staff benefits)

NOTE: MhabtmM represents the model that CakePHP sutomatically creates
for the Look-up table required in the hasAndBelongsToMany
relationship. The MhabtmM array only seems to be created if you use a
look-up table with columns other than m_id or mhabtm_id, such as one
for a primary key for the table, as specified in the `manual`_, or one
for a 'created' date.

As well as the SQL SELECT for M and the models it belongsTo and hasOne
of, we see that other, seperate,select queries are made for these
hasMany and hasAndBelongsToMany relationshps, along the lines of:

SELECT *
FROM Mhm
WHERE Mhm.m_id = 123

and

SELECT *
FROM Mhabtm
JOIN MhatbtmM ON (MhabtmM.m_id = 123 AND MhabtmM.mhabtm_id =
Mhabtm.id)


recursive = 2
`````````````

Next, we move onto

` $this->M->recursive=2;
$result=$this->M->find('first');`

And this is where $result start to get really large. Basically, it
seems that at this point CakePHP will now retrieve all of the items
that Mbt1, Mbt2, Mho, Mhm, and Mhabtm either belongTo, hasOne, hasMany
or hasAndBelongsToMany of (except for those models which M
hasAndBelongsToMany of: it will ignore the reverse relationship Mhabtm
hasAndBelongsToMany of M, possibly because $result could become
ridiculously large).

So, we get an array like this...

::

    
    Array
    (
    	[M] => Array
    		(
    			[id] => 123
    			[name] => Stephen Thomson
    			...
    			[mbt1_id] => 456
    			[mbt2_id] => 789
    		)
    		
    	[Mbt1] => Array	// Appears when $M->recursive > -1
    		(
    			[id] => 456
    			[name] => Red Squadron
    			...
    			[Mbt1Hm] => Array   // Appears when $M->recursive > 1
    				(
    					[1] => Array
    						(
    							[id] => 97 
    							[name] => Eric Burns
    							...
    							[mbt1_id] => 456
    							[mbt2_id] => 99
    						)
    					
    					[1] => Array  
    						(
    							[id] => 123 
    							[name] => Stephen Thomson
    							...
    							[mbt1_id] => 456
    							[mbt2_id] => 789
    						)
    					...
    				)
    		)
    	
    	[Mbt2] => Array	// Appears when $M->recursive > -1
    		(
    			[id] => 789
    			[name] => Vegetarian
    			...
    			[mbt2_bt_id] => 35
    			[Mbt2Bt] => Array  // Appears when $M->recursive > 1
    				(
    					[id] => 35
    					[name] => Cook n' Go
    					...
    				)
    			[Mbt2Ho] => Array  // Appears when $M->recursive > 1
    				(
    					[id] => 87
    					[name] => Area X81
    					...
    					[mbt2_id] => 789
    				)
    			[Mbt2Hm] => Array  // Appears when $M->recursive > 1
    				(
    					...
    					[8] => Array
    						(
    							[id] => 107 
    							[name] => Chris Edens
    							...
    							[mbt1_id] => 449
    							[mbt2_id] => 881
    						)
    					[9] => Array
    						(
    							[id] => 123 
    							[name] => Stephen Thomson
    							...
    							[mbt1_id] => 456
    							[mbt2_id] => 789
    						)
    					...
    				)
    			[Mbt2Habtm] => Array  // Appears when $M->recursive > 1
    				(
    					[0] => Array
    						(
    							[id] => 879
    							[title] => Christmas Lunch
    							...
    						)
    					[1] => Array
    						(
    							[id] => 879
    							[title] => Bank Holiday Breakfast
    							...
    						)
    					...
    				)
    		)
    	
    	[Mho] => Array // Appears when $M->recursive > -1
    		(
    			[id] => 234
    			[name] => N77XX18
    			...
    			[m_id] => 123
    			[MhoBt] = Array // Appears when $M->recursive > 1
    				(
    					[id] => 123 
    					[name] => Stephen Thomson
    							...
    					[mbt1_id] => 456
    					[mbt2_id] => 789
    				)
    		)
    		
    	[Mhm] => Array	// Appears when $M->recursive > 0
    		(
    			[0] => Array
    				(
    					[id] => 432
    					[title] => I realised the other day that when flying by asteroid belts, one should always...
    					...
    					[m_id] => 123
    					[mhm_bt2_id] => 87
    					[MhmBt1] => Array  // Appears when $M->recursive > 1
    						(
    							[id] => 123
    							[name] => Stephen Thomson
    							...
    						)
    					[MhmBt2] => Array // Appears when $M->recursive > 1
    						(
    							[id] => 87
    							[name] => Flight Blogger
    							...
    						)
    				)
    			[1] => Array
    				(
    					[id] => 434
    					[title] => My top tips for getting your bird off a swamp planet would be...
    					...
    					[m_id] => 123
    					[mhm_bt2_id] => 49
    					[MhmBt1] => Array  // Appears when $M->recursive > 1
    						(
    							[id] => 123
    							[name] => Stephen Thomson
    							...
    						)
    					[MhmBt2] => Array // Appears when $M->recursive > 1
    						(
    							[id] => 49
    							[name] => FlyHarder.com
    							...
    						)
    				)
    		)
    	[Mhabtm] => Array // Appears when $M->recursive > 0
    		(
    			[0] => Array
    				(
    					[id] => 567
    					[name] => 'Private Health Care'
    					...
    					[mhabtm_bt_id] => 241
    					[MhabtmM] => Array  // Appears only when columns other than m_id, mhabtm_id specified in Look-up table
    						(
    							[id] => 7
    							[m_id] => 123
    							[mhabtm_id] => 567
    						)
    					[MhabtmBt] => Array // Appears when $M->recursive > 1
    						(
    							[id] => 241
    							[title] => SupaCare
    							...
    						)
    					[MhabtmHm] => Array  // Appears when $M->recursive > 1
    						(
    							[0] => Array
    								(
    									[id] => 241
    									[title] => Wouln't treat my stubbed toe...
    									...
    									[mhabtm_id] => 567
    								)
    							[1] => Array
    								(
    									[id] => 202
    									[title] => Food had nutritional value of wallpaper paste...
    									...
    									[mhabtm_id] => 567
    								)
    						)
    				)
    			[1] => Array
    				(
    					[id] => 579
    					[name] => 'Parking'
    					...
    					[mhabtm_bt_id] => 292
    					[MhabtmM] => Array  // Appears only when columns other than m_id, mhabtm_id specified in Look-up table
    						(
    							[id] => 12
    							[m_id] => 123
    							[mhabtm_id] => 579
    						)
    					[MhabtmBt] => Array // Appears when $M->recursive > 1
    						(
    							[id] => 292
    							[title] => DynaPark
    							...
    						)
    					[MhabtmHm] => Array  // Appears when $M->recursive > 1
    						(
    							[0] => Array
    								(
    									[id] => 253
    									[title] => Gave me a ticket for being 2 minutes late...
    									...
    									[mhabtm_id] => 579
    								)
    						)
    				)
    			[2] => Array
    				(
    					[id] => 601
    					[name] => 'Pension'
    					...
    					[mhabtm_bt_id] => 241
    					[MhabtmM] => Array  // Appears only when columns other than m_id, mhabtm_id specified in Look-up table
    						(
    							[id] => 15
    							[m_id] => 123
    							[mhabtm_id] => 601
    						)
    					[MhabtmBt] => Array // Appears when $M->recursive > 1
    						(
    							[id] => 241
    							[title] => SupaCare
    							...
    						)
    					[MhabtmHm] => Array  // Appears when $M->recursive > 1
    						(
    							[0] => Array
    								(
    									[id] => 253
    									[title] => I think they may be stealing from me...
    									...
    									[mhabtm_id] => 601
    								)
    							[1] => Array
    								(
    									[id] => 208
    									[title] => I won't be able to retire until I'm 75!...
    									...
    									[mhabtm_id] => 601
    								)
    							...
    						)
    				)
    		)
    )

Where...

Mbt1Hm = A Model that Mbt1 hasMany of = M
Mbt2Bt = A Model that Mbt2 belongsTo (e.g. Caterer)
Mbt2Ho = A Model that Mbt2 hasOne of (e.g. A Kitchen Prep Area)
Mbt2Hm = A Model that Mbt2 hasMany of = M
Mbt2Habtm = A Model that Mbt2 hasAndBelongsToMany of (e.g. Canteen
Menus)
MhoBt = A Model that Mho belongsTo = M
MhmBt1 = A Model that Mhm belongsTo = M
MhmBt2 = Another Model that Mhm belongsTo (e.g. Blogging websites)
MhabtmBt = A Model that Mhabtm belongsTo (e.g. Service Provider (this
might even cross over with Mbt2Bt (the Caterer)))
MhabtmHm = A Model that Mhatbm hasMany of (e.g.
Complaints/Suggestions)

The extra SQL involved seems to be not quite as clever as our previous
collections of LEFT JOINs: instead we seem to have individual cases
along the lines of

SELECT *
FROM Mbt1Hm
WHERE Mbt1Hm.mbt1_id = 456

and

SELECT *
FROM Mbt2Bt
WHERE Mbt2Bt.id = 35

and

SELECT *
FROM Mbt2Ho
WHERE Mbt2Ho.mbt2_id = 789

which are then glued in. NOTE: If, like me, you perhaps expected that
Mbt2Bt would be LEFT JOINed to Mbt2, which is LEFT JOINed to M, as
when $M->recursive is set to 0, and that it would appear at the top
level, rather than inside the array for Mbt2, then you can achieve
something similar yourself with use of `the joins parameter`_, like so
(please note the fields parameter - If you don't use this it seems
nothing will come back for Mbt2 or Mbt2Bt) :

`
$params=array('conditions'=>array('M.id'=>123),
'fields'=>array('M.id','M.name','Mbt2.id','Mbt2.name','Mbt2Bt.id','Mbt
2Bt.name'),
'joins'=>array(array('table'=>'mbt2',
'alias'=>'Mbt2',
'type'=>'LEFT',
'conditions'=>'M.mbt_id=Mbt2.id'
),
array('table'=>'mbt2_bt',
'alias'=>'Mbt2Bt',
'type'=>'LEFT',
'conditions'=>'Mbt2.mbt2_bt_id=Mbt2Bt.id'
)
),
);
$result=$this->M->find('first',$params);
`

However, back to the query we were discussing, I did notice that the
SQL involved in retrieving arrays of multiple results found within
arrays of multiple results is more interesting. For example, to
retrieve the arrays for MhabtmHm above, rather than multiple SELECTS
for each Mhabtm, we see use of IN() i.e.

SELECT *
FROM MhabtmHm
WHERE MhabtmHm.mhabtm_id IN (567,579,601)

Similarly, if we made this into

`
$result=$this->M->find('all');`

We would find that the structure of $result changes to

::

    
    Array
    (
    	[0] => Array
    		(
    			[M] => Array 
    				(
    					[id] => 123
    					...
    				)
    				
    			[Mbt1] => Array  // Appears when $M->recursive > -1
    				(
    					[id] => 456
    					...
    				)
    			
    			[Mbt2] => Array  // Appears when $M->recursive > -1
    				(
    					[id] => 789
    					...
    				)
    			
    			[Mho] => Array  // Appears when $M->recursive > -1
    				(
    					[id] => 234
    					...
    				)
    			
    			[Mhm] => Array // Appears when $M->recursive > 0
    				(
    					[0] => Array 
    						(
    							[id] => 432
    							...
    						)
    					...
    				)
    			
    			[Mhabtm] => Array // Appears when $M->recursive > 0
    				(
    					[0] => Array 
    						(
    							[id] => 567
    							...
    						)
    					...
    				)
    		)
    	[1] => Array
    		(
    			[M] => Array 
    				(
    					[id] => 129
    					...
    				)
    				
    			[Mbt1] => Array  // Appears when $M->recursive > -1
    				(
    					[id] => 456
    					...
    				)
    			
    			[Mbt2] => Array  // Appears when $M->recursive > -1
    				(
    					[id] => 789
    					...
    				)
    			
    			[Mho] => Array  // Appears when $M->recursive > -1
    				(
    					[id] => 287
    					...
    				)
    			
    			[Mhm] => Array // Appears when $M->recursive > 0
    				(
    					[0] => Array 
    						(
    							[id] => 415
    							...
    						)
    					...
    				)
    			
    			[Mhabtm] => Array // Appears when $M->recursive > 0
    				(
    					[0] => Array 
    						(
    							[id] => 567
    							...
    						)
    					...
    				)
    		)
    	...
    )
     

And although we get individual calls to

SELECT *
FROM MhabtmHm
WHERE MhabtmHm.mhabtm_id IN (...)

for each row of M, we do now have

SELECT *
FROM Mhabtm
JOIN MhabtmM ON (MhabtmM.m_id IN (123, 129...) AND MhabtmM.mhabtm_id =
Mhabtm.id)


The Set Class
`````````````

Now that we've seen how CakePHP returns data, hopefully this will make
it easier to break down finds into smaller methods in the models. For
example, if in your code you already had the id for the model M that a
find('first') is being performed upon, and we now know that seperate
select queries are being performed to retrieve its hasMany
relationships (compared to retrieving the details abput M itself)
perhaps it's worth setting $M->recursive to a value less than 1 and
creating a wrapper function to make a call to $Mhm->find('all')?
However, (and this was one of the things that was causing me
confusion), you should notice that our $result of a call to
find('all') is laid out differently at the very top level to our other
arrays containing multiple results that we find inside the calls to
$M->find('first') when $M->recursive was greater than 0. Rather than a
structure along the lines of

Array[Model Name][Index Number][Column Name]

we get

Array[Index Number][Model Name][Column Name]

(the keys for the first and second dimension of the array have swapped
places).

Therefore, in order to prevent confusion when passing data from Model
to Controller to View, if taking one part of a much larger $result
array (e.g. with use of something like $this->set('posts',
$result['Mhm']) in your Controller) it may be worth trying to stick to
the structural conventions we've seen here through use of the `Set
class`_

I feel like I'm still new to CakePHP, and this is all based on playing
around with associations and calls to find(), and looking at the SQL
dump at the bottom of the page, so if anything I've written here seems
like nonsense, please leave a comment below!


.. _manual: http://book.cakephp.org/view/83/hasAndBelongsToMany-HABTM
.. _the joins parameter: http://book.cakephp.org/view/872/Joining-tables
.. _the recursive property: http://book.cakephp.org/view/439/recursive
.. _Set class: http://book.cakephp.org/view/640/Set
.. _CakePHP 
  1.3 Manual: http://book.cakephp.org/view/1042/belongsTo

.. author:: DaveyM
.. categories:: articles, tutorials
.. tags:: beginner,beginners,Tutorials


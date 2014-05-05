Simple way to memcache (almost) all database queries
====================================================

Most common way to access data is a database. Most common way to speed
this up - Memcached. As a quite young CakePHP developer I had a bit of
headache "how to cache queries effectively?". Now I know the way, so I
share. Feel free to disagree, upgrade and so on.
Text from now on assumes you have Memcached configured as default
caching engine.

The goal was to create simple and fast yet safe and universal caching
for my models. Caching collections takes long time. Of course it
allows to make much less calls to a model, but is that what we really
want?

What my code does not do is saving memory. If you often ask your
database about crossing sets of data, don't use it. Code below caches
each find result, which is OK if those results does not overlap to
much. If they do, you'll end with the same data in the memory many
many times, as a part of different result sets.

I keep this code in app_model.php; that way setting cache to false in
models allows me to use more specialized caching strategies where
needed, and have this one wherever it is sufficient (in most places,
that is):

Model Class:
````````````

::

    <?php 
      class AppModel extends Model
      {
          var $cache = true;
          function find($type, $params)
          {
              if ($this->cache) {
                  $tag = isset($this->name) ? '_' . $this->name : 'appmodel';
                  $paramsHash = md5(serialize($params));
                  $version = (int)Cache::read($tag);
                  $fullTag = $tag . '_' . $type . '_' . $paramsHash;
                  if ($result = Cache::read($fullTag)) {
                      if ($result['version'] == $version)
                          return $result['data'];
                  }
                  $result = array('version' => $version, 'data' => parent::find($type, $params), );
                  Cache::write($fullTag, $result);
                  Cache::write($tag, $version);
                  return $result['data'];
              } else {
                  return parent::find($type, $params);
              }
          }
          
          private function updateCounter()
          {
              if ($this->cache) {
                  $tag = isset($this->name) ? '_' . $this->name : 'appmodel';
                  Cache::write($tag, 1 + (int)Cache::read($tag));
              }
          }
          
          function afterDelete()
          {
              $this->updateCounter();
              parent::afterDelete();
          }
          
          function afterSave($created)
          {
              $this->updateCounter();
              parent::afterSave($created);
          }
      }
    ?>

So here goes assumptions:

#. Serialization is worth it
#. md5 is sufficient
#. We don't need to care about overlapping results, we have sufficient
   ram to ignore this aspect


1) Serialization is worth it
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
To make a hash we have to serialize query parameters. It takes time.
It will be done each and every time app is going to read from a model,
so the gain from memcache must be higer than loss from serialization
and hashing.

2) md5 is sufficient
~~~~~~~~~~~~~~~~~~~~
This code operates under the assumption that it is very unlikely to
get the same md5 sum for two parameter sets. None the less it may
happen for some models. It didn't for me, but it is possible.

3) We don't need to care about overlapping results
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
I wrote it already but I'll repeat here - this approach caches find
results, not objects. If you'll ask for first 100 records, and then
for last 100 records you'll end up with 200 records cached - even if
this table has 100 records total and results are identical. Mere
different sort order will end up just the same way.

For many applications assumptions above may be, well, assumed. It
seems unlikely to fall in serious trouble starting with them and
eventually tweaking the code if something doesn't work as wanted.

So what's the trick, really? And what was the actual problem? Well the
problem was with invalidating. Memcached does not invalidate data by
wildcards. You have to pass exact key to it. Assume you have 4000
pages of photos (I do, at one place, if you wonder). You'll have to
refresh pagination every time someone will add a photo. But wait, each
page has it's own cache key! 4000-long for loop? Ineffective. Emulate
namespaces as suggested in FAQ (by adding "version" number to a key)?
It lefts behind trash data and makes debugging cache harder.
I searched a bit and found an idea, as far as I remember from
memcached developer, to put version in the data part. And that's
exactly what I do. If cached version of the result is different than
current one, the packet gets refreshed. Simple, fast, reliable enough.
But how do I make sure I have version number? Of course I keep it in
memcached just as well. As you can see, it's updated every time any
package is updated. The reason is to make the version number least
attractive for deletion, if we would ever run out of memory.

Last note - all this works well... if only you don't use query() nor
change bindings. If for half reads you treat the model as associated
with the other, and for other half not (and there are no other
differences), tweak this or use some other code.

Good luck coding, guys.


.. author:: Molot
.. categories:: articles, models
.. tags:: model,memcached,memcache,Models


Configuring memcache in cakephp on ubuntu
=========================================

Configuring memcache functionality in cakePHP on ubuntu flavor. Steps
might change little bit for other OS.

Scope : Configuring memcache functionality in cakePHP on ubuntu
flavor. Steps might change little bit for other OS.

Pre-requirement : Apache, PHP, mysql and cakePHP should be properly
installed and configured. Assuming default installation of cakephp on
ubuntu machine in /var/www/cake with document root as /var/www, to
check if cakephp is working fine or not, open
`http://localhost/cake.`_ It should show all the checks in green
color.



CakePHP: the rapid development php framework Release Notes for CakePHP
1.3.6. Read the changelog

Your tmp directory is writable.

The FileEngine is being used for caching. To change the config edit
APP/config/core.php

Your database configuration file is present.

Cake is able to connect to the database.
B0x1A0
Procedure : There will be two steps involved in configuring memcache
in cakePHP. 1> Installation of memcache on system 2> Configuration of
memcache in cakePHP

Installation of memcache : There are multiple methods and products
which gives functionality of memcache on UNIX flavor. Installation can
be done from source code but easy way to do it in ubuntu is through
package.

Below line will install the memcache on ubuntu and will start it. raj
@raj-VirtualBox:~$ sudo apt-get install memcache

Below command can be used to verify if memcache is running or not. raj
@raj-VirtualBox:~$ sudo /etc/init.d/memcached status [sudo] password
for raj: * memcached is running

raj@raj-VirtualBox:~$ telnet localhost 11211 Trying ::1... Trying
127.0.0.1... Connected to localhost. Escape character is '^]'.

Above result confirms that memcache is installed. Only installing and
starting memcache do not enable it for websites. One has to configure
it.

Configuring memcache with cakePHP : To configure memcache in PHP,
either we can use pecl install memcache to plugin memcache with our
PHP. For above command to run, you need to have pecl on your ubuntu
server.

Easier way is to install PHP memcache package in ubuntu

raj@raj-VirtualBox:~$ sudo apt-get install php5-memcache

Once the above package is installed, open /config/core.php and edit
set Configure::write('Session.save', 'php'); This tells cake to let
PHP handle sessions. Also setup a unique name for Session.cookie in
core.php and change the Security.salt to something unique.

Edit the /etc/php5/apache2/php.ini | grep -i session [Session]
;session.save_handler = files session.save_handler = memcache
session.save_path = "tcp://127.0.0.1:11211" Rest all lines need not to
be edited. Restart apache and open the default page of cakePHP. If it
do not complains about session handler then it means everything is at
proper place.

To test if memcache is working or not, either call phpinfo() function
from a test programm from command line.

raj@raj-VirtualBox:/var/www$ cat test.php <?php phpinfo(); ?>

raj@raj-VirtualBox:/var/www$ php test.php | grep "memca"
/etc/php5/cli/conf.d/memcache.ini, memcache memcache support =>
enabled memcache.allow_failover => 1 => 1 memcache.chunk_size => 32768
=> 32768 memcache.compress_threshold => 20000 => 20000
memcache.default_port => 11211 => 11211 memcache.hash_function =>
crc32 => crc32 memcache.hash_strategy => consistent => consistent
memcache.lock_timeout => 15 => 15 memcache.max_failover_attempts => 20
=> 20 memcache.protocol => ascii => ascii memcache.redundancy => 1 =>
1 memcache.session_redundancy => 2 => 2 Registered save handlers =>
files user memcache

Other method to test it is to telnet localhost 11211 and enter stats.
Whenever you will be accessing website, cmd_get and cmd_put value will
keep on changing.

raj@raj-VirtualBox:/var/www$ telnet localhost 11211 Trying ::1...
Trying 127.0.0.1... Connected to localhost. Escape character is '^]'.
stats STAT pid 7083 STAT uptime 3233 STAT time 1294533083 STAT version
1.4.5 STAT pointer_size 64 STAT rusage_user 0.140000 STAT
rusage_system 0.000000 STAT curr_connections 5 STAT total_connections
10 STAT connection_structures 7 STAT cmd_get 2 STAT cmd_set 6 STAT
cmd_flush 0 STAT get_hits 1 STAT get_misses 1 STAT delete_misses 0
STAT delete_hits 0 STAT incr_misses 2 STAT incr_hits 0 STAT
decr_misses 0 STAT decr_hits 0 STAT cas_misses 0 STAT cas_hits 0 STAT
cas_badval 0 STAT auth_cmds 0 STAT auth_errors 0 STAT bytes_read 687
STAT bytes_written 1812 STAT limit_maxbytes 67108864 STAT
accepting_conns 1 STAT listen_disabled_num 0 STAT threads 4 STAT
conn_yields 0 STAT bytes 304 STAT curr_items 2 STAT total_items 6 STAT
evictions 0 STAT reclaimed 0 END

Hope you will like it and will find it easy. Feel free to revert back
for any questions. I will be happy to assist you.


.. _http://localhost/cake.: http://localhost/cake.

.. author:: rajender120
.. categories:: articles, tutorials
.. tags:: Memcache cakephp ubuntu,Tutorials


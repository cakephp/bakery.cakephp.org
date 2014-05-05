CakePHP rewrites on Windows server (.NET Framework 4.0 Extensionless
url's fix)
==========

For a recent project of mine I had to deploy cakephp on a windows
server which had .NET Framework 4.0 running. Due to this framework all
url rewrites get /eurl.axd/GUID/ appended to all url's without an
extension. Using ISAPI_Rewrite I have rewritten the .htaccess files to
make cake have pretty URL's again.
After alot of research I finally ended upon several resources which
were of high value. In the end I ended up with this solution:

In core.php you do **NOT** have to uncomment

::

    Configure::write('App.baseUrl', env('SCRIPT_NAME'));

like some websites suggest. Instead you just have to replace the
following .htaccess files:

in the root folder of your cakephp installation:

::


    RewriteEngine on
    RewriteRule    ^$ app/webroot/    [L]
    RewriteRule      (.*) app/webroot/$1 [L]


in /app/:

::


    RewriteEngine on
    RewriteRule ^$ webroot/ [L]
    RewriteRule  (.*) webroot/$1 [L]


and the most important part, inside your webroot:

::


    RewriteEngine on

    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^eurl.axd/[a-f0-9]{32}(.*)$ index.php?url=$1$2 [L,QSA]

    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)/eurl.axd/[a-f0-9]{32}(.*)$ index.php?url=$1$2 [L,QSA]


The first rule strips out the eurl.axd and guid for the root request
The second rule fixes all other requests.

I hope this article may be of some use to other people.


.. author:: vanremortele
.. categories:: articles
.. tags:: mod_rewrite,CakePHP,Rewrite,pretty urls,windows server,ISAPI,eurl.axd,url rewrite,Articles


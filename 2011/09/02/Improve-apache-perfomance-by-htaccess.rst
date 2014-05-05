Improve apache perfomance by .htaccess
======================================

Here is some idea in improving apache performance by adding some lines
in the app/webroot/.htacces.

Improve apache perfomance by .htaccess

Here is some idea in improving apache performance by adding some lines
in the app/webroot/.htacces.

My app/webroot/.htacces looks like:

::

    <IfModule mod_rewrite.c> RewriteEngine On RewriteCond
    %{REQUEST_FILENAME} !-d RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^(.*)$ index.php?url=$1 [QSA,L]</IfModule> IndexIgnore
    *<IfModule mod_headers.c> # 1 YEAR <FilesMatch "\.(ico|pdf|flv)$">
    Header set Cache-Control "max-age=29030400, public" </FilesMatch> # 1
    WEEK <FilesMatch "\.(jpg|jpeg|png|gif|swf)$"> Header set Cache-Control
    "max-age=604800, public" </FilesMatch> # 2 DAYS <FilesMatch
    "\.(xml|txt|css|js)$"> Header set Cache-Control "max-age=172800,
    proxy-revalidate" </FilesMatch></IfModule><IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/text text/plain text/css
    application/x-javascript application/javascript
    text/javascript</IfModule>

The additional lines basically set some cache and compression
(mod_deflate) headers for the static content.

Original: `http://inf.ufrgs.br/~labianchin/wiki/doku.php/cakephp/improve_apache`_

More info:

`http://www.howtoforge.com/apache2_mod_deflate`_

`http://www.askapache.com/htaccess/speed-up-sites-with-htaccess-caching.html`_


.. _http://www.askapache.com/htaccess/speed-up-sites-with-htaccess-caching.html: http://www.askapache.com/htaccess/speed-up-sites-with-htaccess-caching.html
.. _http://inf.ufrgs.br/~labianchin/wiki/doku.php/cakephp/improve_apache: http://inf.ufrgs.br/~labianchin/wiki/doku.php/cakephp/improve_apache
.. _http://www.howtoforge.com/apache2_mod_deflate: http://www.howtoforge.com/apache2_mod_deflate

.. author:: luisarmando
.. categories:: articles
.. tags:: Articles


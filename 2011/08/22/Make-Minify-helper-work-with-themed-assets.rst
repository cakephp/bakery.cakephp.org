Make Minify helper work with themed assets
==========================================

Make Minify helper work with themed assets

I was working with Minfiy Helper in Cake 2.0 and once moving my themed
css files to the "/views/themed/<mytheme>/webroot/css/" folder they
were not located by MinifyHelper.

If I turned MinifyHelper off the assets were located corerctly by
HtmlHelper->css function

MinifyHelper expects assets such as (css and js files) to be
physically located at the url path specified. When moving themed
assests to the themed folder these assets are served dynamically via
php at this location.

app/webroot/theme/<mytheme>/

Hence, the physical file is not found at this location. As per cake
documentation (also recommended for better performance) you can copy
your themed assets into the folder above. This way the served path
will also contain the physical files needed for Minify to work.

example:

From: app/views/themed/<mytheme>/webroot/css/site.css To:
app/webroot/theme/<mytheme>/css/site.css

Once you copy your themed assets to 'app/webrrot/theme' You can them
update MinifyHelper to make it work with thems by updating this
function of MinifyHeper

::

    public function _path($assets, $ext)
    {
        $path = $this->webroot . "min/f=";
        $url = '';
        foreach($assets as $asset) {
            if (strpos($asset, '/') !== false) {
                $url = ("{$asset}.{$ext}");
            } else {
                $url = $ext . '/' . ("{$asset}.{$ext}");
            }
            $path .= ("{$url},");
        }
        return substr($path, 0, -1) . '&' . Configure::read('App.version');
    }

To load your themed assets via MinifyHelper refer to the themed assets
in the served path using a '/' at the begining of the path name.

example;

$this->Minify->css(array('core', '/theme/<mytheme>/css/site'));




.. author:: tpuglia
.. categories:: articles
.. tags:: minify,Articles


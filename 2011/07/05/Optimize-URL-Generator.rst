Optimize URL Generator
======================

Each time there is a link in some view, the Router::url() method is
called and the URL string is computed. The idea is to cache some URL
parts in the AppHelper::url().

It is important to note that each time you put a link in your view,
the Router::url() method is called and the URL string is computed.

Now think about a page full of links, and also you'll see that this
URLs have common parts. For example, the typical index actions shows a
list rows, and in each row there is a link to edit and delete. The
fact is that this links have the pattern /:controller/:action/:id.

The idea here is that is not necessary to calculate the part
/:controler/:action in each time a URL is generated.

To do that put this code snippet on your app/AppHelper.php.

::

    var $urls = array();
    /* increases url performance in 50%, by "caching" urls */
    function url($url = null, $full = false){
        //return $this->url($url);
        if ($full || !is_array($url) || array_diff(array_keys($url), array('controller', 'action', 0, 1, 2, 3, 4))){
            return parent::url($url, $full);
        }
        if (!isset($url['controller']))
            $url['controller'] = $this->params['controller'];
        if (!isset($url['action']))
            $url['action'] = $this->params['action'];
        $key = $url['controller'].'#'.$url['action'];
        if (!isset($this->urls[$key])){
            $pre = $this->urls[$key] = parent::url(array('controller' => $url['controller'], 'action' => $url['action']));
        }else 
            $pre = $this->urls[$key];
        for ($i=0; $i<4; $i++)
            if (isset($url[$i]))
                $pre.=DS.$url[$i];
        return $pre; 
    }

More in:
`http://inf.ufrgs.br/~labianchin/wiki/doku.php/cakephp/url_optimize`_


.. _http://inf.ufrgs.br/~labianchin/wiki/doku.php/cakephp/url_optimize: http://inf.ufrgs.br/~labianchin/wiki/doku.php/cakephp/url_optimize

.. author:: luisarmando
.. categories:: articles, snippets
.. tags:: Snippets


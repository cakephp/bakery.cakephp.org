CakeHtmlHelper speed up your site enabling html cache - Cakephp 2.x
===================================================================

I have rewrite the Matt Curry Html Cache Plugin. Taken from
https://github.com/mcurry/html_cache -- Cake's core cache helper is
great, but the files it outputs are PHP files, so it will never be as
fast as straight HTML files. This HTML Cache Helper writes out pure
HTML, meaning the web server doesnt have to touch PHP when a request
is made.
Okey, first you must have mod_rewrite enable to make the html cache
working;

::

    
    <IfModule mod_rewrite.c>
        RewriteEngine On
    
        RewriteCond %{REQUEST_METHOD} ^GET$
        RewriteCond %{DOCUMENT_ROOT}/cache/$1/index.html -f
        RewriteRule ^(.*)$ /cache/$1/index.html [L]
    
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteRule ^(.*)$ index.php?/$1 [QSA,L]
    </IfModule>

Now create the helper in the file View/Helper/CacheHtmlHelper.php

::

    
    <?php
    // Original idea from Matt Curry, rewritten by Eugenio Fage
    App::uses('AppHelper', 'View/Helper');
    
    App::uses('Folder', 'Utility');
    App::uses('File', 'Utility');
    
    class CacheHtmlHelper extends AppHelper {
    	private $CacheHtmlStrategy=null;
    	
    	public function __construct(View $view, $settings = array()) {
            parent::__construct($view, $settings);
            $defaults=array('CacheHtmlStrategy'=>'CacheHtmlStrategy');
            $settings=array_merge($settings,$defaults);
            
            if(!class_exists($settings['CacheHtmlStrategy'])) $settings['CacheHtmlStrategy']='CacheHtmlStrategy';
            $this->CacheStrategy=new $settings['CacheHtmlStrategy']();
        }
    	
    	public function afterLayout($viewFile) {
    		$this->CacheStrategy->save($this->request,$this->_View->output);
    	}
    }
    
    
    class CacheHtmlStrategy{
    	public function save($request,$content){
    		$File = new File($this->url2file($request->url), true);
    		$File->write($content);
    	}
    	
    	public function url2file($url){
    		$path=WWW_ROOT.'cache'.DS;
    		$path.=implode(DS, array_filter(explode('/', $url))).DS;
    		$path=str_replace('//','/',$path);
    		return $path.'index.html';
    	}
    	
    	public function rendercache($url=null){
    		if(!$url){
    			if(isset($_SERVER['PATH_INFO']) && $_SERVER['PATH_INFO']){
    				$url=$_SERVER['PATH_INFO'];
    			}else{
    				return;
    			}
    		}
    		$file=cacheUrl2File($this->url2file($url));
    
    		if(file_exists($file)){
    			$fp = fopen($file, 'r');
    			fpassthru($fp);
    			exit;
    		}
    	}
    }

Now, each time you want to cache an action add the helper in the
controller;
function someaction(){
$this->helpers[]='HtmlCache';
}

You could create your own cache strategy to save the files in
diferents path or doing some crazy thing, for example:
Config/Crazyhtmlcacheconfig.php

::

    
    <?
    class CrazyHtmlStrategy extends CacheHtmlStrategy{
    	public function url2file($request){
    		$path=WWW_ROOT.'cache2'.DS;
    		$path.=implode(DS, array_filter(explode('/', $request->url))).DS;
    		$path=str_replace('//','/',$path);
    		return $path.'index.html';
    	}
    }

Then add in your bootstrap;
config('Crazyhtmlcacheconfig');

And when you add the helper

$this->helpers['HtmlCache']=array('CacheHtmlStrategy'=>'CrazyHtmlStrat
egy');

You could also try to render the files using php instead of the
.htaccess routing, just have to add this in the bootstrap;

::

    
        // use CacheHtmlStrategy or the strategy that you are currently using
        $cache=new CacheHtmlStrategy();
        $cache->rendercache();


Cheers to all!
Written by Eugenio Fage


.. author:: eugenioclrc
.. categories:: articles
.. tags:: helper,html,cache,Articles


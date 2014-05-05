Dropbox Component
=================

A CakePHP component that connects to the most excellent file syncing
tool known as Dropbox.

Since Dropbox (`http://www.dropbox.com`_) currently doesn't offer an
API this component will login to Dropbox and parse their HTML using
cURL. This component requires that you have the cURL extension loaded.

This component can...

+ List the files/folders of a dropbox folder using the files function.
+ Get a dropbox file using the file function.
+ Upload a file to a dropbox folder using the upload function.
+ Download a file from dropbox using the download function.
+ Compare files in a local folder and a dropbox folder then
  uploads/downloads the difference using the sync function.



Component Class:
````````````````

::

    <?php 
    /**
     * CAKEPHP DROPBOX COMPONENT v0.4
     * Connects Cakephp to Dropbox using cURL.
     * 
     * Copyright (C) 2010 Kyle Robinson Young
     * 
     * Permission is hereby granted, free of charge, to any person
     * obtaining a copy of this software and associated documentation
     * files (the "Software"), to deal in the Software without
     * restriction, including without limitation the rights to use,
     * copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the
     * Software is furnished to do so, subject to the following
     * conditions:
     * 
     * The above copyright notice and this permission notice shall be
     * included in all copies or substantial portions of the Software.
     * 
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
     * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
     * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
     * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
     * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
     * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
     * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
     * OTHER DEALINGS IN THE SOFTWARE.
     * 
     * @author Kyle Robinson Young <kyle at kyletyoung.com>
     * @copyright 2010 Kyle Robinson Young
     * @license http://www.opensource.org/licenses/mit-license.php The MIT License
     * @version 0.4
     * @link http://www.kyletyoung.com/code/cakephp_dropbox_component
     * 
     * SETTINGS:
     * 	email/password: To your dropbox account
     * 	cache: Set to name of cache config or false for no cache
     * 
     * When in doubt, clear the cache.
     * 
     * TODO:
     * Make sync function smarter (use modified).
     *
     */
    class DropboxComponent extends Object 
    {
        var $email, $password;
        var $loggedin = false;
        var $post, $cookie = array();
        var $cache = 'default';
        var $_wcache = array();
        
        /**
         * INITIALIZE
         * @param class $controller
         * @param array $settings
         */
        function initialize(&$controller, $settings=array())
        {
            if (!extension_loaded('curl'))
            {
                trigger_error('Dropbox Component: I require the cURL extension to work.');
            } // no curl
            if (empty($settings['email']) || empty($settings['password']))
            {
                trigger_error('Dropbox Component: I need your dropbox email and password to login.');
            } // email|pass empty
            else
            {
                $this->email = $settings['email'];
                $this->password = $settings['password'];
                if (isset($settings['cache'])) $this->cache = $settings['cache'];
                $this->login();
            } // else
        } // initialize
        
        /**
         * UPLOAD
         * Upload a local file to a remote folder.
         * 
         * @param $file
         * @param $dir
         * @return bool
         */
        function upload($from=null, $to='/')
        {
            if (!file_exists($from)) return false;
            $data = $this->request('https://www.dropbox.com/home');
            $token = $this->findOnDropbox('token_upload', $data);
            if ($token === false) return false;
            $this->post = array(
            	'plain'    => 'yes',
            	'file'     => '@'.$from,
            	'dest'     => $to,
            	't'        => $token
            );
            $data = $this->request('https://dl-web.dropbox.com/upload');
            if (strpos($data, 'HTTP/1.1 302 FOUND') === false) return false;
            return true;
        } // upload
        
        /**
         * DOWNLOAD
         * Download a remote file to a local folder.
         * Both from and to must be a path to a file name.
         * 
         * @param str $from
         * @param str $to
         * @param str $w
         * @return bool
         */
        function download($from=null, $to=null, $w=null)
        {
            $data = $this->file($from, $w);
            if (empty($data['data'])) return false;
            if (!is_writable(dirname($to))) return false;
            if (!$fp = fopen($to, 'w')) return false;
            if (fwrite($fp, $data['data']) === false) return false;
            fclose($fp);
            return true;
        } // download
        
        /**
         * SYNC
         * Compares files from the local and remote folders 
         * then syncs them.
         * Both local and remote must be folders.
         * 
         * TODO:
         * Currently only checks if files exists. Doesn't 
         * check if they are up to date which it should.
         * 
         * @param str $local
         * @param str $remote
         * @return bool
         */
        function sync($local=null, $remote=null)
        {
            if (!is_dir($local)) return false;
            
            // GET REMOTE FILES
            $remote_files = $this->files($remote);
            
            // GET LOCAL FILES
            $local_files = array();
            $d = dir($local);
            while (false !== ($entry = $d->read())) 
            {
                if (substr($entry, 0, 1) == '.') continue;
                if (is_dir($local.DS.$entry)) continue;
                $local_files[] = $entry;
            } // while
            $d->close();
            
            // DOWNLOAD FILES
            $tmp = array();
            foreach ($remote_files as $file)
            {
                if (empty($file['w'])) continue;
                $tmp[] = $file['name'];
                if (in_array($file['name'], $local_files)) continue;
                $this->download($file['path'].$file['name'], $local.$file['name'], $file['w']);
            } // foreach
            
            // UPLOAD FILES
            foreach ($local_files as $file)
            {
                if (in_array($file, $tmp)) continue;
                $this->upload($local.$file, $remote);
            } // foreach
            
            return true;
        } // sync
       
        /**
         * FILES
         * Returns an array of remote files/folders 
         * within the given dir param.
         * 
         * @param str $dir
         * @return array
         */
        function files($dir='/') 
        {
            $dir = $this->escape($dir);
            if ($this->cache === false) Cache::delete('dropbox_files_'.$dir, $this->cache);
            if (($files = Cache::read('dropbox_files_'.$dir, $this->cache)) === false)
            {
                $files = array();
                $data = $this->request('https://www.dropbox.com/browse_plain/'.$dir.'?no_js=true');
                
                // GET FILES
                $matches = $this->findOnDropbox('files', $data);
                if ($matches === false) return false;
                
                // GET TYPES
                $types = $this->findOnDropbox('file_types', $data);
                
                // GET SIZES
                $sizes = $this->findOnDropbox('file_sizes', $data);
                
                // GET MODS
                $mods = $this->findOnDropbox('file_modified_dates', $data);
                
                $i = 0;
                foreach ($matches as $key => $file)
                {
                    // IF PARENT
                    if (strpos($file, "Parent folder") !== false) continue;
                    
                    // GET FILENAME
                    $found = $this->findOnDropbox('filename', $file);
                    if ($found === false) continue;
                    $found = parse_url($found);
                    $filename = pathinfo($found['path']);
                    $filename = $filename['basename'];
                    if (empty($filename)) continue;
                    
                    // SET DEFAULTS
                    $path = $dir.$filename;
                    $type = 'unknown';
                    $size = 0;
                    $modified = 0;
                    
                    // GET TYPE
                    if (!empty($types[$key])) $type = trim($types[$key]);
                    
                    // GET SIZE
                    if (!empty($sizes[$key])) $size = trim($sizes[$key]);
                    
                    // GET MODIFIED
                    if (!empty($mods[$key])) $modified = trim($mods[$key]);
                    
                    // ADD TO FILES
                    $files[$i] = array(
                        'path'		=> urldecode($dir),
                        'name'		=> $filename,
                        'type'		=> $type,
                        'size'		=> $size,
                        'modified'	=> $modified
                    );
                    
                    // IF FILE OR FOLDER - FILES HAVE W
                    $w = $this->findOnDropbox('w', $file);
                    if ($w !== false)
                    {
                        $files[$i]['w'] = $w;
                        
                        // SAVE W FOR LATER
                        $this->_wcache[$dir.'/'.$filename] = $w;
                    } // !empty
                    
                    $i++;
                } // foreach
                
            } // Cache::read
            if ($this->cache !== false) 
            {
                Cache::write('dropbox_files_'.$dir, $files, $this->cache);
            } // if cache
            return $files;
        } // files
        
        /**
         * FILE
         * Returns a remote file as an array.
         * 
         * @param str $file
         * @param str $w
         * @return array
         */
        function file($file=null, $w=null)
        {
            $file = $this->escape($file);
            if ($this->cache === false) Cache::delete('dropbox_file_'.$file, $this->cache);
            if (($out = Cache::read('dropbox_file_'.$file, $this->cache)) === false)
            {
                if (empty($w))
                {
                    if (!empty($this->_wcache[$file])) $w = $this->_wcache[$file];
                    else return false;
                } // empty w
                $data = $this->request('https://dl-web.dropbox.com/get/'.$file.'?w='.$w);
                $type = $this->findOnDropbox('content_type', $data);
                $data = substr(stristr($data, "\r\n\r\n"), 4);
                if (!empty($type[0])) $type = $type[0];
                $out = array(
                    'path'			  => $file,
                    'w'				  => $w,
                	'data'            => $data,
                	'content_type'    => $type
                );
                if ($this->cache !== false) 
                {
                    Cache::write('dropbox_file_'.$file, $out, $this->cache);
                } // if cache
            } // Cache::read
            return $out;
        } // file
        
        /**
         * LOGIN
         * to dropbox
         * 
         * @return bool
         */
        function login() 
        {
            if (!$this->loggedin)
            {
                if (empty($this->email) || empty($this->password)) return false;
                $data = $this->request('https://www.dropbox.com/login');
                
                // GET TOKEN
                $token = $this->findOnDropbox('token_login', $data);
                if ($token === false) return false;
                
                // LOGIN TO DROPBOX
                $this->post = array(
                	'login_email'        => $this->email,
                	'login_password'     => $this->password,
                	't'                  => $token
                );
                $data = $this->request('https://www.dropbox.com/login');
    
                // IF WERE HOME
                if (stripos($data, 'location: /home') === false) return false;
                $this->loggedin = true;
            } // if loggedin
            return true;
        } // login
    
        /**
         * REQUEST
         * Returns data from given url and 
         * saves cookies. Use $this->post and 
         * $this->cookie to submit params.
         * 
         * @param str $url
         * @return str
         */
        function request($url=null)
        {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
            curl_setopt($ch, CURLOPT_HEADER, 1);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            
            // IF POST
            if (!empty($this->post)) 
            {
                curl_setopt($ch, CURLOPT_POST, true);
                curl_setopt($ch, CURLOPT_POSTFIELDS, $this->post);
                $this->post = array();
            } // !empty
            
            // IF COOKIES
            if (!empty($this->cookie))
            {
                $cookies = array();
                foreach ($this->cookie as $key => $val)
                {
                    $cookies[] = "$key=$val";
                } // foreach
                $cookies = implode(';', $cookies);
                curl_setopt($ch, CURLOPT_COOKIE, $cookies);
            } // !empty
            
            // GET DATA
            $data = curl_exec($ch);
            
            // SAVE COOKIES
            $cookies = $this->findOnDropbox('cookies', $data);
            if ($cookies !== false)
            {
                $this->cookie = array_merge($this->cookie, $cookies);
            } // if cookies
            
            curl_close($ch);
            return $data;
        } // request
        
        /**
         * ESCAPE
         * Returns a dropbox friendly str
         * for a url
         * 
         * @param str $str
         * @return str
         */
        function escape($str=null)
        {
            return str_replace(
                array('+','_','%2E','-','%2F','%3A'),
                array('%20','%5F','.','%2D','/',':'),
                urlencode($str)
            );
        } // escape
    
        /**
         * FIND ON DROPBOX
         * A single function for parsing data from 
         * Dropbox. For easy update when/if Dropbox 
         * updates their html.
         * 
         * @param str $key
         * @param str $data
         * @return mixed
         */
        function findOnDropbox($key=null, $data=null)
        {
            switch (strtolower($key))
            {
                // FIND FILES & NAMES
                case 'files':
                    preg_match_all('/<div.*details-filename.*>(.*?)<\/div>/i', $data, $matches);
                    if (!empty($matches[0])) return $matches[0];
                    break;
                    
                // FIND FILE TYPES
                case 'file_types':
                    preg_match_all('/<div.*details-icon.*>(<img.*class="sprite s_(.*)".*>)<\/div>/i', $data, $matches);
                    if (!empty($matches[2])) return $matches[2];
                    break;
                    
                // FIND FILE SIZES
                case 'file_sizes':
                    preg_match_all('/<div.*details-size.*>(.*)<\/div>/i', $data, $matches);
                    if (!empty($matches[1])) return $matches[1];
                    break;
                    
                // FIND FILE MODIFIED DATES
                case 'file_modified_dates':
                    preg_match_all('/<div.*details-modified.*>(.*)<\/div>/i', $data, $matches);
                    if (!empty($matches[1])) return $matches[1];
                    break;
                    
                // FIND FILE NAME
                case 'filename':
                    preg_match('/href=[("|\')]([^("|\')]+)/i', $data, $match);
                    if (!empty($match[1])) return $match[1];
                    break;
                    
                // FIND W
                case 'w':
                    preg_match('/\?w=(.[^"]*)/i', $data, $match);
                    if (!empty($match[1])) return $match[1];
                    break;
                    
                // FIND CONTENT TYPE
                case 'content_type':
                    preg_match('/Content-Type: .+\/.+/i', $data, $type);
                    if (!empty($type)) return $type;
                    break;
                    
                // FIND COOKIES
                case 'cookies':
                    preg_match_all('/Set-Cookie: ([^=]+)=(.*?);/i', $data, $matches);
                    $return = array();
                    foreach ($matches[1] as $key => $val)
                    {
                        $return[(string)$val] = $matches[2][$key];
                    } // foreach
                    if (!empty($return)) return $return;
                    break;
                    
                // FIND LOGIN FORM TOKEN
                case 'token_login':
                    preg_match('/<form [^>]*\/login[^>]*>.*?<\/form>/si', $data, $match);
                    if (!empty($match[0]))
                    {
                        preg_match('/<input [^>]*name="t" [^>]*value="(.*?)"[^>]*>/si', $match[0], $match);
                        if (!empty($match[1])) return $match[1];
                    } // !empty
                    break;
                    
                // FIND UPLOAD FORM TOKEN
                case 'token_upload':
                    preg_match('/<form [^>]*https\:\/\/dl-web\.dropbox\.com\/upload[^>]*>.*?<\/form>/si', $data, $match);
                    if (!empty($match[0]))
                    {
                        preg_match('/<input [^>]*name="t" [^>]*value="(.*?)"[^>]*>/si', $match[0], $match);
                        if (!empty($match[1])) return $match[1];
                    } // !empty
                    break;
                    
            } // switch
            return false;
        } // findOnDropbox
        
    } // DropboxComponent
    ?>



Install
~~~~~~~

Upload/Copy dropbox.php to your app/controllers/components/ folder.

Add the component to your controller...

::

    
    var $components = array(
    	'Dropbox' => array(
    		'email' 	=> 'your@dropboxemail.com',
    		'password'	=> 'password',
    		//'cache'	=> false
    	)
    );

Caching is enabled by default and is recommended. Set 'cache' to false
to disable caching or set cache to the name of the cache config name
you would like to use.



Usage
~~~~~

array files ( str $dropbox_folder )
Returns an array of remote files/folders within the given dir param.

array file ( str $dropbox_file [, str $dropbox_file_id ] )
Returns a remote file as an array.

bool upload ( str $from_file_path , str $to_dropbox_folder )
Upload a local file to a remote folder.

bool download ( str $dropbox_file_path , str $local_file_path [, str
$dropbox_file_id ] )
Download a remote file to a local folder. Both from and to must be a
path to a file name.

bool sync ( str $local_folder_path , str $dropbox_folder_path )
Compares files from the local and remote folders then syncs them. Both
local and remote must be folders.



Example
~~~~~~~

A CakePHP Dropbox Webserver Controller
``````````````````````````````````````

This example is a mini cakephp webserver that loads files on the fly
from Dropbox.

Controller Class:
`````````````````

::

    <?php 
     /**
     * DROPBOX WEBSERVER CONTROLLER
     * A CakePHP webserver controller using files on the fly from Dropbox.
     * 
     * Copyright (C) 2010 Kyle Robinson Young
     * 
     * Permission is hereby granted, free of charge, to any person
     * obtaining a copy of this software and associated documentation
     * files (the "Software"), to deal in the Software without
     * restriction, including without limitation the rights to use,
     * copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the
     * Software is furnished to do so, subject to the following
     * conditions:
     * 
     * The above copyright notice and this permission notice shall be
     * included in all copies or substantial portions of the Software.
     * 
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
     * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
     * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
     * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
     * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
     * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
     * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
     * OTHER DEALINGS IN THE SOFTWARE.
     * 
     * @author Kyle Robinson Young <kyle at kyletyoung.com>
     * @copyright 2010 Kyle Robinson Young
     * @license http://www.opensource.org/licenses/mit-license.php The MIT License
     * @link http://www.kyletyoung.com/code/cakephp_dropbox_component
     *
     */
    class DropboxWebserverController extends AppController
    {
        var $name = 'DropboxWebserver';
        var $uses = array();
        var $autoRender = false;
        var $components = array('Dropbox' => array(
        	'email'     => 'your@dropboxemail.com',
            'password'	=> 'dropboxpassword',
            //'cache'		=> false
        ));
        
        var $root_folder = '/';
        var $default_home = array('index.html', 'index.htm', 'index.php');
        
        /**
         * INDEX
         */
        function index()
        {
            $args = func_get_args();
            $args = implode('/', $args);
            
            $path = pathinfo($args);
            if ($path['dirname'] == ".")
            {
                $folder = $path['basename'];
                $file = '';
            } // dirname == .
            else
            {
                $folder = $path['dirname'];
                $file = $path['basename'];
            } // else
            
            $files = $this->Dropbox->files($this->root_folder.$folder);
            //debug($files);
            
            // FIND FILE
            foreach ($files as $f)
            {
                if (strpos($f['type'], 'folder') !== false) continue;
                if (empty($f['name'])) continue;
                if ($f['name'] == $file)
                {
                    $file = $this->Dropbox->file($this->root_folder.$folder.'/'.$file, $f['w']);
                    $output = $file['data'];
                    $content_type = $file['content_type'];
                    break;
                } // name == file
                
                // FIND DEFAULT HOME
                if (in_array($f['name'], $this->default_home))
                {
                    $default = $f;
                } // in_array
            } // foreach
            
            if (!empty($output))
            {
                header('Content-Type: '.$content_type);
                echo $output;
            } // !empty
            elseif (!empty($default))
            {
                $file = $this->Dropbox->file($this->root_folder.$folder.'/'.$default['name'], $default['w']);
                header('Content-Type: '.$file['content_type']);
                echo $file['data'];
            } // !empty default
            else
            {
                echo 'Error 404: File Not Found';
            } // else
            
        } // index
        
    } // DropboxWebserver
    ?>


Enjoy!


.. _http://www.dropbox.com: http://www.dropbox.com/

.. author:: kylerobinsonyoung
.. categories:: articles, components
.. tags:: dropbox,Components


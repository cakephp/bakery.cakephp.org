Extending HttpSocket for use with Amazon among other things for 1.3.x
and 2.x
=======

When trying to use the Amazon API, I read a lot about the Amazon rule
of only being allowed to make 1 request a second or your web site
would be refused access to Amazon if this was ignored too often. So I
set about solving the issue using CakePHP and ended up with a few
classes that could be of use to others.
The source for this article is downloadable from `Github`_. The Master
branch is for CakePHP1.3.x and there is now a 2.x branch.

The obvious solution to the Amazon request frequency problem is to
ensure your website makes no more than 1 request a second. I decided
to implement this with a locked file approach that would marshall the
requests being made.

The system presented here consists of 3 classes and an interface.

The interface ISocket simply outlines methods as implemented by
HttpSocket in CakePHP.

::

    
    interface ISocket {
        public function put($uri = null, $data = array(), $request = array());
        public function delete($uri = null, $data = array(), $request = array());
        public function get($uri=NULL, $query = array(), $request = array());
        public function post($uri = null, $data = array(), $request = array());
    }

The abstract class BaseSocket wraps any ISocket implementing class and
takes
care of passing calls to that class.

::

    
    abstract class BaseSocket implements ISocket {
        private $_socket;
    
        public function  __construct( ISocket $socket ) {
            $this->_socket = $socket;
        }
    
        public function  delete($uri = null, $data = array(), $request = array()) {
            return $this->_socket->delete($uri,$data,$request);
        }
    
        public function post($uri = null, $data = array(), $request = array()) {
            return $this->_socket->post($uri,$data,$request);
        }
    
        public function get($uri = NULL, $query = array(), $request = array()) {
            return $this->_socket->get($uri,$query,$request);
        }
    
        public function put($uri = null, $data = array(), $request = array()) {
            return $this->_socket->put($uri,$data,$request);
        }
    }

The class NormalSocket simply extends HttpSocket and implements
ISocket which enables it to be used by BaseSocket. Other than this, it
is identical to HttpSocket supplied by CakePHP.

::

    
    class NormalSocket extends HttpSocket implements ISocket {
        public function __construct($config = array() ) {
            parent::__construct($config);
        }
    }

You could use NormalSocket just as you would use HttpSocket.

::

    
    /* Create a NormalSocket which has the same usage as HttpSocket */
    $ns = new NormalSocket();
    /* Get content from a URI */
    $response = $ns->get($uri);

ThrottledSocket throttles another ISocket implementing object which is
passed in the constructor.

::

    
    class ThrottledSocket extends BaseSocket implements ISocket {
    
        /**
         * Filename used for synchronisation
         */
        private $_filename;
    
        /**
         * Create a Throttled Socket.
         */
        public function __construct(ISocket $socket) {
            parent::__construct($socket);
            $this->_filename = ROOT . DIRECTORY_SEPARATOR . APP_DIR . DIRECTORY_SEPARATOR . 'tmp' . DIRECTORY_SEPARATOR . 'throttle.dat';
            if (!file_exists($this->_filename)) {
                file_put_contents($this->_filename, time());
            }
        }
    
        /**
         * Issues a GET request to the specified URI, query, and request.
         */
        public function get($uri=NULL, $query = array(), $request = array()) {
            $delay = $this->throttle();
            if ($delay > 0) {
                sleep($delay);
            }
            return parent::get($uri, $query, $request);
        }
    
        /**
         * Issues a POST request to the specified URI, query, and request.
         */
        public function post($uri = null, $data = array(), $request = array()) {
            $delay = $this->throttle();
            if ($delay > 0) {
                sleep($delay);
            }
            return parent::post($uri, $query, $request);
        }
    
        /**
         * Introduce a delay. Requests are only allowed to be sent
         * once a second.
         */
        private function throttle() {
            $curtime = time();
            $filetime = $curtime;
            $fp = fopen($this->_filename, "r+");
            if (flock($fp, LOCK_EX)) {
                $nbr = fread($fp, filesize($this->_filename));
                $filetime = intval(trim($nbr));
                $curtime = time();
                if ($curtime > $filetime) {
                    $filetime = $curtime;
                } else {
                    $filetime++;
                }
                rewind($fp);
                ftruncate($fp, 0);
                fprintf($fp, "%d", $filetime);
                flock($fp, LOCK_UN);
            }
            fclose($fp);
            return $filetime - $curtime;
        }
    }

You use ThrottledSocket as follows...

::

    
    $ts = new ThrottledSocket(new NormalSocket());
    /* Requests to Throttled socket now happen only once per second */
    $response = $ts->get($uri);

CachedSocket caches another ISocket implementing object which is
passed in the constructor. The class uses the standard CakePHP
Cacheing mechanism to cache the responses returned by the wrapped
socket.

::

    
    class CachedSocket extends BaseSocket implements ISocket {
    
        /**
         * The cache key
         */
        private $_cacheKey;
        
        /**
         * The duration of the cache in seconds
         */
        private $_cacheDuration;
    
    
        /**
         * Create the object and assign a cache key.
         */
        public function __construct(ISocket $socket, $key, $duration=3600) {
            parent::__construct($socket);
            $this->_cacheKey = $key;
            $this->_cacheDuration = $duration;
        }
    
        /**
         * Set the number of seconds for which responses should be cached.
         */
        public function setCacheDuration($duration) {
            $this->_cacheDuration = $duration;
        }
    
        /**
         * Set the cache key
         */
        public function setCacheKey($key) {
            $this->_cacheKey = $key;
        }
    
        /**
         * GET Request a URL.
         */
        public function get($uri=NULL, $query = array(), $request = array()) {
            $response = Cache::read($this->_cacheKey);
            if ($response === false) {
                $response = parent::get($uri, $query, $request);
                if ($response) {
                    Cache::set(array('duration' => '+' . $this->_cacheDuration . ' seconds'));
                    Cache::write($this->_cacheKey, $response);
                }
            }
            return $response;
        }
    
        /**
         * POST Request a URL.
         */
        public function post($uri=NULL, $query = array(), $request = array()) {
            $response = Cache::read($this->_cacheKey);
            if ($response === false) {
                $response = parent::post($uri, $query, $request);
                if ($response) {
                    Cache::set(array('duration' => '+' . $this->_cacheDuration . ' seconds'));
                    Cache::write($this->_cacheKey, $response);
                }
            }
            return $response;
        }
    
    }

You could use CachedSocket to cache responses from an HttpSocket

::

    
    /* Cache the NormalSocket with the key 'CacheKey' for 1 hour */
    $cs = new CachedSocket(new NormalSocket(), 'CacheKey', 3600 );
    /* Requests to Cached socket now return the cached response for the next hour */
    $response = $cs->get($uri);

Using this system of wrapping other ISocket implementing objects we
can cache throttled requests which is ideal for accessing Amazon. Once
a request is made, the response will be cached so amazon requests are
only made when necessary and they will not occur more than once per
second.

::

    
    function GetBookByAsin( $asin ) {
        /* Throttle an HttpSocket to send requests at once a second */
        $ts = new ThrottledSocket( new NormalSocket() );
        /* Cache the throttled socket */
        $amazonSocket = new CachedSocket( $ts, 'ASIN' . $asin, 3600 );
        /* Build amazon request URL in $url */
        $response = $amazonSocket->get($url);
        /* Process XML returned by Amazon or by the Cache */
    }

The first time the example function is called it will make a throttled
request to amazon and cache the response. For the next hour any
requests for the same item will return the cached response and not
make any calls to amazon at all.

The source code is available from GitHub at the URL shown above and it
is simply a matter of copying the classes into your app/libs (or
app/Lib for 2.x) directory and using them. I have documented each
class and provided a couple of test cases.

Another bonus of wrapping the socket classes in other classes can be
seen in the test cases. It is simple to create a dummy class that
implements ISocket and feed that to CachedSocket or ThrottledSocket so
those classes can be tested without the need of making any actual
requests.

.. _Github: https://github.com/SteveFound/CakePHP-Sockets

.. author:: Ratty
.. categories:: articles, code
.. tags:: cache,httpsocket,amazon,Socket,Code


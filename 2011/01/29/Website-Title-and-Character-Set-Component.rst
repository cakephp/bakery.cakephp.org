Website Title and Character Set Component
=========================================

This component allows you to pass a URL to one of its functions and
retrieve an external page's and character set.

Usage:

#. Add the website.php component to your "/app/controllers/components"
   folder, and then include it in your controller using:

::

    	public $components = array('Website');

#. Call either of the two functions in your controller:

::

    	debug($this->Website->getTitle('http://www.cakephp.org'));
    	debug($this->Website->getCharset('http://www.cakephp.org'));



Let me know if you have any problems!


Arron Bailiss `http://www.arronbailiss.com`_

::

    Permission to use, copy, modify, and distribute this software for
    any purpose with or without fee is hereby granted, provided that the
    above copyright notice and this permission notice appear in all
    copies. THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS
    ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED
    WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE
    AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL
    DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA
    OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
    TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.


::

    class WebsiteComponent extends Object
    { /** * Reference to the controller using this component * @var
    Controller */ protected $controller; /** * Time in seconds to cache
    website information * @var int */ public $cacheLimit; /** * Setup the
    component ready for use * @param Controller $controller */ public
    function startup($controller = null) { App::import('Core',
    'HttpSocket'); $this->HttpSocket = new HttpSocket(); $this->controller
    = $controller; $this->cacheLimit = 60 * 15; // 15 mins } /** * Get the
    page title from a URL * @param string $url URL to retrieve the page
    title from * @param bool $html Set to TRUE to retrieve the html
    entities title */ public function getTitle($url = '', $html = false) {
    if (empty($url)) return false; $title = ''; $request =
    $this->__loadContent($url); $content = $request['content'];
    $currCharset = $this->getCharset($url); if (!empty($content)) { // Get
    the page title and convert to UTF-8 $matches = array(); preg_match('#



.. _http://www.arronbailiss.com: http://www.arronbailiss.com

.. author:: abailiss
.. categories:: articles, components
.. tags:: encoding,page title,charset,website,Components


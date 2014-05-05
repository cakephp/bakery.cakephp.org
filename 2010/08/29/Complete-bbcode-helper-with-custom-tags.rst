Complete bbcode helper with custom tags
=======================================

Hi to everybody, this is a simple way of implement a bbcode parser,
the parser its extended from a class written based on the worpress
shortcode http://core.svn.wordpress.org/trunk/wp-
includes/shortcodes.php


Installation
~~~~~~~~~~~~

Okay first create the shortcode helper, this will let you add and
create personalized tags;

Put it in app/views/helper/shortcode.php

Helper Class:
`````````````

::

    <?php 
    /**
     *
     * Adapted to Cakephp Shortcode Helper
     * @modified Eugenio Fage
     *
     *
     * WordPress API for creating bbcode like tags or what WordPress calls
     * "shortcodes." The tag and attribute parsing or regular expression code is
     * based on the Textpattern tag parser.
     *
     *
     * @link http://codex.wordpress.org/Shortcode_API
     */
    
    
    class Shortcode extends AppHelper{
    
    	/**
    	 * Container for storing shortcode tags and their hook to call for the shortcode
    	 *
    	 * @name $shortcode_tags
    	 * @var array
    	 */
    	protected $shortcode_tags = array();
    	
    
    	/**
    	 * Add hook for shortcode tag.
    	 *
    	 * There can only be one hook for each shortcode. Which means that if another
    	 * plugin has a similar shortcode, it will override yours or yours will override
    	 * theirs depending on which order the plugins are included and/or ran.
    	 *
    	 * Simplest example of a shortcode tag using the API:
    	 *
    	 * <code>
    	 * // [footag foo="bar"]
    	 * function footag_func($atts) {
    	 * 	return "foo = {$atts[foo]}";
    	 * }
    	 * add_shortcode('footag', 'footag_func');
    	 * </code>
    	 *
    	 * Example with nice attribute defaults:
    	 *
    	 * <code>
    	 * // [bartag foo="bar"]
    	 * function bartag_func($atts) {
    	 * 	extract(shortcode_atts(array(
    	 * 		'foo' => 'no foo',
    	 * 		'baz' => 'default baz',
    	 * 	), $atts));
    	 *
    	 * 	return "foo = {$foo}";
    	 * }
    	 * add_shortcode('bartag', 'bartag_func');
    	 * </code>
    	 *
    	 * Example with enclosed content:
    	 *
    	 * <code>
    	 * // [baztag]content[/baztag]
    	 * function baztag_func($atts, $content='') {
    	 * 	return "content = $content";
    	 * }
    	 * add_shortcode('baztag', 'baztag_func');
    	 * </code>
    	 *
    	 * @since 2.5
    	 * @uses $shortcode_tags
    	 *
    	 * @param string $tag Shortcode tag to be searched in post content.
    	 * @param callable $func Hook to run when shortcode is found.
    	 */
    	function add_shortcode($tag, $func=null) {
    		if(is_array($tag)){
    			foreach ($tag as $code){
    				
    				$this->add_shortcode($code[0], $code[1]);
    			}
    		}else if ( is_callable($func) ){
    			$this->shortcode_tags[$tag] = $func;
    		}
    		return $this;
    	}
    	/**
    	 * Removes hook for shortcode.
    	 *
    	 * @since 2.5
    	 * @uses $shortcode_tags
    	 *
    	 * @param string $tag shortcode tag to remove hook for.
    	 */
    	function remove_shortcode($tag) {
    		unset($this->shortcode_tags[$tag]);
    		return $this;
    	}
    
    	/**
    	 * Clear all shortcodes.
    	 *
    	 * This function is simple, it clears all of the shortcode tags by replacing the
    	 * shortcodes global by a empty array. This is actually a very efficient method
    	 * for removing all shortcodes.
    	 *
    	 * @since 2.5
    	 * @uses $shortcode_tags
    	 */
    	function remove_all_shortcodes() {
    		$this->shortcode_tags = array();
    		return $this;
    	}
    
    	
    	public function doShortcode($content){
    		$content=$this->_beforeShortcode($content);
    		$content=$this->do_shortcode($content);
    		$content=$this->_afterShortcode($content);
    		
    		return $content;
    	}
    	
    	protected function _beforeShortcode($content){
    		return $content;
    	}
    		
    	protected function _afterShortcode($content){
    		return $content;
    	}
    		
    	
    	/**
    	 * Search content for shortcodes and filter shortcodes through their hooks.
    	 *
    	 * If there are no shortcode tags defined, then the content will be returned
    	 * without any filtering. This might cause issues when plugins are disabled but
    	 * the shortcode will still show up in the post or content.
    	 *
    	 * @since 2.5
    	 * @uses $shortcode_tags
    	 * @uses get_shortcode_regex() Gets the search pattern for searching shortcodes.
    	 *
    	 * @param string $content Content to search for shortcodes
    	 * @return string Content with shortcodes filtered out.
    	 */
    	protected function do_shortcode($content) {
    		
    		if (empty($this->shortcode_tags) || !is_array($this->shortcode_tags)){
    			return $content;
    		}
    		
    		$pattern = $this->get_shortcode_regex();
    		return preg_replace_callback('/'.$pattern.'/s', array(&$this, 'do_shortcode_tag'), $content);
    	}
    
    	/**
    	 * Retrieve the shortcode regular expression for searching.
    	 *
    	 * The regular expression combines the shortcode tags in the regular expression
    	 * in a regex class.
    	 *
    	 * The regular expresion contains 6 different sub matches to help with parsing.
    	 *
    	 * 1/6 - An extra [ or ] to allow for escaping shortcodes with double [[]]
    	 * 2 - The shortcode name
    	 * 3 - The shortcode argument list
    	 * 4 - The self closing /
    	 * 5 - The content of a shortcode when it wraps some content.
    	 *
    	 * @since 2.5
    	 * @uses $shortcode_tags
    	 *
    	 * @return string The shortcode search regular expression
    	 */
    	function get_shortcode_regex() {
    		$tagnames = array_keys($this->shortcode_tags);
    		$tagregexp = join( '|', array_map('preg_quote', $tagnames) );
    
    		// WARNING! Do not change this regex without changing do_shortcode_tag() and strip_shortcodes()
    		return '(.?)\[('.$tagregexp.')\b(.*?)(?:(\/))?\](?:(.+?)\[\/\2\])?(.?)';
    	}
    
    	/**
    	 * Regular Expression callable for do_shortcode() for calling shortcode hook.
    	 * @see get_shortcode_regex for details of the match array contents.
    	 *
    	 * @since 2.5
    	 * @access private
    	 * @uses $shortcode_tags
    	 *
    	 * @param array $m Regular expression match array
    	 * @return mixed False on failure.
    	 */
    	function do_shortcode_tag( $m ) {
    		// allow [[foo]] syntax for escaping a tag
    		if ( $m[1] == '[' && $m[6] == ']' ) {
    			return substr($m[0], 1, -1);
    		}
    
    		$tag = $m[2];
    		$attr = $this->shortcode_parse_atts( $m[3] );
    
    		if ( isset( $m[5] ) ) {
    			// enclosing tag - extra parameter
    			return $m[1] . call_user_func( $this->shortcode_tags[$tag], $attr, $m[5], $tag ) . $m[6];
    		} else {
    			// self-closing tag
    			return $m[1] . call_user_func( $this->$shortcode_tags[$tag], $attr, NULL,  $tag ) . $m[6];
    		}
    	}
    
    	/**
    	 * Retrieve all attributes from the shortcodes tag.
    	 *
    	 * The attributes list has the attribute name as the key and the value of the
    	 * attribute as the value in the key/value pair. This allows for easier
    	 * retrieval of the attributes, since all attributes have to be known.
    	 *
    	 *
    	 * @param string $text
    	 * @return array List of attributes and their value.
    	 */
    	function shortcode_parse_atts($text) {
    		$atts = array();
    		$pattern = '/(\w+)\s*=\s*"([^"]*)"(?:\s|$)|(\w+)\s*=\s*\'([^\']*)\'(?:\s|$)|(\w+)\s*=\s*([^\s\'"]+)(?:\s|$)|"([^"]*)"(?:\s|$)|(\S+)(?:\s|$)/';
    		$text = preg_replace("/[\x{00a0}\x{200b}]+/u", " ", $text);
    		if ( preg_match_all($pattern, $text, $match, PREG_SET_ORDER) ) {
    			foreach ($match as $m) {
    				if (!empty($m[1]))
    				$atts[strtolower($m[1])] = stripcslashes($m[2]);
    				elseif (!empty($m[3]))
    				$atts[strtolower($m[3])] = stripcslashes($m[4]);
    				elseif (!empty($m[5]))
    				$atts[strtolower($m[5])] = stripcslashes($m[6]);
    				elseif (isset($m[7]) and strlen($m[7]))
    				$atts[] = stripcslashes($m[7]);
    				elseif (isset($m[8]))
    				$atts[] = stripcslashes($m[8]);
    			}
    		} else {
    			$atts = ltrim($text);
    		}
    		return $atts;
    	}
    
    	/**
    	 * Combine user attributes with known attributes and fill in defaults when needed.
    	 *
    	 * The pairs should be considered to be all of the attributes which are
    	 * supported by the caller and given as a list. The returned attributes will
    	 * only contain the attributes in the $pairs list.
    	 *
    	 * If the $atts list has unsupported attributes, then they will be ignored and
    	 * removed from the final returned list.
    	 *
    	 * @param array $pairs Entire list of supported attributes and their defaults.
    	 * @param array $atts User defined attributes in shortcode tag.
    	 * @return array Combined and filtered attribute list.
    	 */
    	function shortcode_atts($pairs, $atts) {
    		$atts = (array)$atts;
    		$out = array();
    		foreach($pairs as $name => $default) {
    			if ( array_key_exists($name, $atts) )
    			$out[$name] = $atts[$name];
    			else
    			$out[$name] = $default;
    		}
    		return $out;
    	}
    
    	/**
    	 * Remove all shortcode tags from the given content.
    	 *
    	 * @uses $shortcode_tags
    	 *
    	 * @param string $content Content to remove shortcode tags.
    	 * @return string Content without shortcode tags.
    	 */
    	function strip_shortcodes( $content ) {
    
    		if (empty($this->shortcode_tags) || !is_array($this->shortcode_tags))
    		return $content;
    
    		$pattern = $this->get_shortcode_regex();
    
    		return preg_replace('/'.$this->pattern.'/s', '$1$6', $content);
    	}
    }
    ?>

Tests, the test case of the Shortcode helper;

/tests/cases/helpers/shortcode.test.php

::

    
    <?php
    // bases on the wordpress test case, adapted by Eugenio Fage
    //Import the helper to be tested.
    //If the tested helper were using some other helper, like Html,
    //it should be impoorted in this line, and instantialized in startTest().
    App::import('Helper', 'Shortcode');
    
    class ShortcodeTest extends CakeTestCase {
    
    	public $instance;
    
    	public $atts = null;
    	public $content = null;
    	public $tagname = null;
    
    
    	//Here we instantiate our helper, and all other helpers we need.
    	public function startTest() {
    		$this->instance=new Shortcode();
    		$this->instance->add_shortcode('footag', array(&$this,'_footag_func'));
    		$this->instance->add_shortcode('paragraph', array(&$this,'_paragraph_func'));
    		$this->instance->add_shortcode('bartag', array(&$this,'_bartag_func'));
    		$this->instance->add_shortcode('baztag', array(&$this,'_baztag_func'));
    		$this->instance->add_shortcode('dumptag', array(&$this,'_dumptag_func'));
    
    		$this->instance->add_shortcode('test-shortcode-tag', array(&$this, '_shortcode_tag'));
    		#error_reporting(E_ALL);
    		#ini_set('display_errors', '1');
    		$this->atts = null;
    		$this->content = null;
    		$this->tagname = null;
    	}
    
    	function _shortcode_tag($atts, $content=NULL, $tagname=NULL) {
    		$this->atts = $atts;
    		$this->content = $content;
    		$this->tagname = $tagname;
    		
    	}
    
    	function testNoatts() {
    		
    		$this->instance->doShortcode('[test-shortcode-tag /]');
    		$this->assertEqual('', $this->atts );
    		$this->assertEqual( 'test-shortcode-tag', $this->tagname );
    
    	}
    
    	function assertEquals($expectation, $compare,$msg=null){
    		return parent::assert($compare,$expectation,$msg);
    	}
    
    	function test_one_att() {
    		$this->instance->doShortcode('[test-shortcode-tag foo="asdf" /]');
    		$this->assertEqual( array('foo' => 'asdf'), $this->atts );
    		$this->assertEqual( 'test-shortcode-tag', $this->tagname );
    	}
    
    	function test_not_a_tag() {
    		$out = $this->instance->doShortcode('[not-a-shortcode-tag]');
    		$this->assertEqual( '[not-a-shortcode-tag]', $out );
    	}
    
    	function test_two_atts() {
    		$this->instance->doShortcode('[test-shortcode-tag foo="asdf" bar="bing" /]');
    		$this->assertEqual( array('foo' => 'asdf', 'bar' => 'bing'), $this->atts );
    		$this->assertEqual( 'test-shortcode-tag', $this->tagname );
    	}
    
    	function test_noatts_enclosing() {
    		$this->instance->doShortcode('[test-shortcode-tag]content[/test-shortcode-tag]');
    		$this->assertEqual( '', $this->atts );
    		$this->assertEqual( 'content', $this->content );
    		$this->assertEqual( 'test-shortcode-tag', $this->tagname );
    	}
    
    	function test_one_att_enclosing() {
    		$this->instance->doShortcode('[test-shortcode-tag foo="bar"]content[/test-shortcode-tag]');
    		$this->assertEqual( array('foo' => 'bar'), $this->atts );
    		$this->assertEqual( 'content', $this->content );
    		$this->assertEqual( 'test-shortcode-tag', $this->tagname );
    	}
    
    	function test_two_atts_enclosing() {
    		$this->instance->doShortcode('[test-shortcode-tag foo="bar" baz="bing"]content[/test-shortcode-tag]');
    		$this->assertEqual( array('foo' => 'bar', 'baz' => 'bing'), $this->atts );
    		$this->assertEqual( 'content', $this->content );
    		$this->assertEqual( 'test-shortcode-tag', $this->tagname );
    	}
    
    	function test_unclosed() {
    		$out = $this->instance->doShortcode('[test-shortcode-tag]');
    		$this->assertEqual( '', $out );
    		$this->assertEqual( '', $this->atts );
    		$this->assertEqual( 'test-shortcode-tag', $this->tagname );
    	}
    
    	function test_positional_atts_num() {
    		$out = $this->instance->doShortcode('[test-shortcode-tag 123]');
    		$this->assertEqual( '', $out );
    		$this->assertEqual( array(0=>'123'), $this->atts );
    		$this->assertEqual( 'test-shortcode-tag', $this->tagname );
    	}
    
    	function test_positional_atts_url() {
    		$out = $this->instance->doShortcode('[test-shortcode-tag http://www.youtube.com/watch?v=eBGIQ7ZuuiU]');
    		$this->assertEqual( '', $out );
    		$this->assertEqual( array(0=>'http://www.youtube.com/watch?v=eBGIQ7ZuuiU'), $this->atts );
    		$this->assertEqual( 'test-shortcode-tag', $this->tagname );
    	}
    
    	function test_positional_atts_quotes() {
    		$out = $this->instance->doShortcode('[test-shortcode-tag "something in quotes" "something else"]');
    		$this->assertEqual( '', $out );
    		$this->assertEqual( array(0=>'something in quotes', 1=>'something else'), $this->atts );
    		$this->assertEqual( 'test-shortcode-tag', $this->tagname );
    	}
    
    	function test_positional_atts_mixed() {
    		$out = $this->instance->doShortcode('[test-shortcode-tag 123 http://wordpress.com/ 0 "foo" bar]');
    		$this->assertEqual( '', $out );
    		$this->assertEqual( array(0=>'123', 1=>'http://wordpress.com/', 2=>'0', 3=>'foo', 4=>'bar'), $this->atts );
    		$this->assertEqual( 'test-shortcode-tag', $this->tagname );
    	}
    
    	function test_positional_and_named_atts() {
    		$out = $this->instance->doShortcode('[test-shortcode-tag 123 url=http://wordpress.com/ foo bar="baz"]');
    		$this->assertEqual( '', $out );
    		$this->assertEqual( array(0=>'123', 'url' => 'http://wordpress.com/', 1=>'foo', 'bar' => 'baz'), $this->atts );
    		$this->assertEqual( 'test-shortcode-tag', $this->tagname );
    	}
    
    	function test_footag_default() {
    		$out = $this->instance->doShortcode('[footag]');
    		$this->assertEqual('foo = ', $out);
    	}
    
    	function test_footag_val() {
    		$val = rand(1*10000, 9*100000);
    		$out = $this->instance->doShortcode('[footag foo="'.$val.'"]');
    		$this->assertEqual('foo = '.$val, $out);
    	}
    
    	function test_nested_tags() {
    		$out = $this->instance->doShortcode('[baztag][dumptag abc="foo" def=123 http://wordpress.com/][/baztag]');
    		$expected = <<<EOF
    content = abc = foo
    def = 123
    0 = http://wordpress.com
    
    EOF;
    		$this->assertEqual($expected, $out);
    	}
    
    	function test_tag_escaped() {
    
    		$out = $this->instance->doShortcode('[[footag]] [[bartag foo="bar"]]');
    		$this->assertEqual('[footag] [bartag foo="bar"]', $out);
    
    		$out = $this->instance->doShortcode('[[footag /]] [[bartag foo="bar" /]]');
    		$this->assertEqual('[footag /] [bartag foo="bar" /]', $out);
    
    		$out = $this->instance->doShortcode('[[baztag foo="bar"]the content[/baztag]]');
    		$this->assertEqual('[baztag foo="bar"]the content[/baztag]', $out);
    
    		// double escaped
    		$out = $this->instance->doShortcode('[[[footag]]] [[[bartag foo="bar"]]]');
    		$this->assertEqual('[[footag]] [[bartag foo="bar"]]', $out);
    	}
    
    	function test_tag_not_escaped() {
    		// these have square brackets on either end but aren't actually escaped
    		$out = $this->instance->doShortcode('[[footag] [bartag foo="bar"]]');
    		$this->assertEqual('[foo =  foo = bar]', $out);
    
    		$out = $this->instance->doShortcode('[[footag /] [bartag foo="bar" /]]');
    		$this->assertEqual('[foo =  foo = bar]', $out);
    
    		$out = $this->instance->doShortcode('[[baztag foo="bar"]the content[/baztag]');
    		$this->assertEqual('[content = the content', $out);
    
    		$out = $this->instance->doShortcode('[[not-a-tag]]');
    		$this->assertEqual('[[not-a-tag]]', $out);
    
    		$out = $this->instance->doShortcode('[[[footag] [bartag foo="bar"]]]');
    		$this->assertEqual('[[foo =  foo = bar]]', $out);
    	}
    
    	function test_mixed_tags() {
    		$in = <<<EOF
    So this is a post with [footag foo="some stuff"] and a bunch of tags.
    
    [bartag]
    
    [baztag]
    Here's some content
    on more than one line
    [/baztag]
    
    [bartag foo=1] [baztag] [footag foo="2"] [baztag]
    
    [baztag]
    more content
    [/baztag]
    
    EOF;
    		$expected = <<<EOF
    So this is a post with foo = some stuff and a bunch of tags.
    
    foo = no foo
    
    content = 
    Here's some content
    on more than one line
    
    
    foo = 1 content =  foo = 2 content = 
    
    content = 
    more content
    EOF;
    
    		
    		$out = trim($this->instance->doShortcode($in));
    		$this->assertEqual(($expected), ($out));
    	}
    
    	/*
    	 enabled = the shortcode works as normal (default)
    	 strip = the shortcode will be parsed and removed.  e.g. '[shortcode foo="bar"]' produces ''.  '[shortcode]foo[/shortcode]' produces 'foo'.
    	 faux = the shortcode will be abbreviated.  e.g. '[shortcode foo="bar"]' products '[shortcode]'.  '[shortocde]foo[/shortcode]' produces '[shortcode]'
    	 disabled = the shortcode is not parsed at all.  e.g. '[shortcode foo="bar"]' products '[shortcode foo="bar"]'
    	 */
    
    	function test_shortcodes_enabled() {
    		if (is_callable(array(&$this,'set_all_shortcode_status')) ){
    				
    			$this->instance->set_all_shortcode_status('enabled');
    			$out = $this->instance->doShortcode("[baztag]foo is [footag foo='bar'][/baztag]");
    			$expected = 'content = foo is foo = bar';
    			$this->assertEqual( $expected, $out );
    		}
    	}
    
    	function test_shortcodes_disabled() {
    		if (is_callable(array(&$this,'set_all_shortcode_status')) ){
    				
    			$this->instance->set_all_shortcode_status('disabled');
    			$out = $this->instance->doShortcode("[baztag]foo is [footag foo='bar'][/baztag]");
    			$expected = $out;
    			$this->assertEqual( $expected, $out );
    		}
    	}
    
    	function test_shortcodes_strip() {
    		if (is_callable(array(&$this,'set_all_shortcode_status')) ){
    				
    			set_all_shortcode_status('strip');
    			$out = $this->instance->doShortcode("[baztag]foo is [footag foo='bar'][/baztag]");
    			$expected = 'foo is ';
    			$this->assertEqual( $expected, $out );
    		}
    	}
    
    	function test_shortcodes_faux() {
    		if (is_callable(array(&$this,'set_all_shortcode_status')) ){
    			$this->markTestSkipped();
    			set_all_shortcode_status('faux');
    			$out = $this->instance->doShortcode("[baztag]foo is [footag foo='bar'][/baztag]");
    			$expected = '[baztag]';
    			$this->assertEqual( $expected, $out );
    		}
    	}
    
    
    
    
    
    
    
    
    	// [footag foo="bar"]
    	function _footag_func($atts) {
    		return @"foo = {$atts['foo']}";
    	}
    
    	// [bartag foo="bar"]
    	function _bartag_func($atts) {
    		extract($this->instance->shortcode_atts(array(
    			'foo' => 'no foo',
    			'baz' => 'default baz',
    		), $atts));
    
    		return "foo = {$foo}";
    	}
    
    	// [baztag]content[/baztag]
    	function _baztag_func($atts, $content='') {
    		return 'content = '.$this->instance->doShortcode($content);
    	}
    
    	function _dumptag_func($atts) {
    		$out = '';
    		foreach ($atts as $k=>$v)
    		$out .= "$k = $v\n";
    		return $out;
    	}
    
    
    	// suggested by markj for testing p-wrapping of shortcode output
    	function _paragraph_func($atts, $content='') {
    		extract($this->instance->shortcode_atts(array(
    	'class' => 'graf',
    		), $atts));
    		return "<p class='$class'>$content</p>\n";
    	}
    
    }



After this we create the bbcode parser helper class, the parser i have
create only parse the tags [ b] [ i] [ u] [ img] [ quote]

Helper Class:
`````````````

::

    <?php 
    App::import('helper','shortcode');
    class Bbcode extends Shortcode{
    
    	function __construct(){
    		// Register the shortcodes
    		$this->add_shortcode(array(
    			array( 'b' , array(&$this, 'shortcode_bold')),
    			array( 'i' , array(&$this, 'shortcode_italics') ),
    			array( 'u' , array(&$this, 'shortcode_underline') ),
    			array( 'url' , array(&$this, 'shortcode_url') ),
    			array( 'img' , array(&$this, 'shortcode_image') ),
    			array( 'quote' , array(&$this, 'shortcode_quote') )
    		));
    	}
    	
    	function _beforeShortcode($content){
    		return htmlspecialchars($content);
    	}
    	
    	function _afterShortcode($content){
    		return nl2br($content);
    	}
    	
    
    	// No-name attribute fixing
    	function attributefix( $atts = array() ) {
    		if ( empty($atts[0]) ) return $atts;
    
    		if ( 0 !== preg_match( '#=("|\')(.*?)("|\')#', $atts[0], $match ) )
    			$atts[0] = $match[2];
    
    		return $atts;
    	}
    
    
    	// Bold shortcode
    	function shortcode_bold( $atts = array(), $content = NULL ) {
    		return '<strong>' . $this->do_shortcode( $content ) . '</strong>';
    	}
    
    	// Italics shortcode
    	function shortcode_italics( $atts = array(), $content = NULL ) {
    		return '<em>' . $this->do_shortcode( $content ) . '</em>';
    	}
    
    	function shortcode_underline( $atts = array(), $content = NULL ) {
    		return '<span style="text-decoration:underline">' . $this->do_shortcode( $content ) . '</span>';
    	}
    
    	function shortcode_url( $atts = array(), $content = NULL ) {
    		$atts = $this->attributefix( $atts );
    
    		// `Google`_
    		if ( isset($atts[0]) ) {
    			$url = $atts[0];
    			$text = $content;
    		}
    		// http://www.google.com/
    		else {
    			$url = $text = $content;
    		}
    
    		if ( empty($url) ) return '';
    		if ( empty($text) ) $text = $url;
    
    		return '<a href="' . $url . '">' . $this->do_shortcode( $text ) . '</a>';
    	}
    
    	function shortcode_image( $atts = array(), $content = NULL ) {
    		return '<img src="' . $content . '" alt="" />';
    	}
    
    	function shortcode_quote( $atts = array(), $content = NULL ) {
    		return '<blockquote>' . $this->do_shortcode( $content ) . '</blockquote>';
    	}
    	
    }
    ?>




[H3]Usage

Remember to add "Bbcode" to the array of helpers in your controller.

In your view add this;

::

    
    $bbcodeText='[ b]Hello everyone!![/ b]';
    
    echo '<br />Before<br />'.$bbcodeText;
    
    echo '<br />After<br />';
    
    echo  $bbcode->doShortcode($bbcodeText) ;

Adding a shortcode on the fly;

::

    
    $bbcode->add_shortcode('something','someFunction'); 

Or

::

    
    $bbcode->add_shortcode('something',array('object','someMethod'));

You could create your own parsers extending from the Shortcode class
like the bbcode class does, or you just could add tags own the fly.

I hope you enjoy it!, thanks for reading.



.. author:: eugenioclrc
.. categories:: articles, helpers
.. tags:: helper,BBCode,parser,forum,wordpress,shortcode,Helpers


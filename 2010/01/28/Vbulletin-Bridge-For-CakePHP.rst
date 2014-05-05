Vbulletin Bridge For CakePHP
============================

Vbulletin bridge for cakephp. special thanks to Netrosis
(www.syphex.com)
Config

::


    <?php

    /*
     * VBulletin Config
     *
     * Author: Enang Yusuf - enangyusuf@gmail.com
     * Original Source for kohana author Netrosis ( www.syphex.com )
     *
     * Last Modified: 28 Januari 2010
     */

    # vibulletin licence for use cookie salt
    $config['vb']['license'] = '';

    # url your vbulletin forum
    $config['vb']['forum_url'] = 'http://localhost/forum/';

    $config['vb']['db_prefix']	= 'vb_';
    $config['vb']['groups'] = array(
    					'admin'				=> 6,
    					'moderator'			=> 7,
    					'super_moderator' => 5,
    					'user'				=> 2,
    					'banned'				=> 8,
    					'guest'				=> 1
    					);
    $config['vb']['cookie_timeout'] = 1800; //30 Mins
    $config['vb']['cookie_prefix'] = 'bb';
    $config['vb']['user_columns'] = array(
    					'userid',
    					'username',
    					'email',
    					'avatarid',
    					'pmunread',
    					'salt'
    					);
    $config['vb']['default_avatar'] = 'img/no_foto.png';
    ?>



Model Class:
````````````

::

    <?php
    /*
     * VBulletin Model
     *
     * Author: Enang Yusuf - enangyusuf@gmail.com
     * Original Source for kohana author Netrosis ( www.syphex.com )
     *
     * Last Modified: 28 Januari 2010
     */

    class Vbulletin extends AppModel
    {
    	var $name = 'Vbulletin';
    	var $useTable = false;
    	var $useDbConfig = "forum";

    	var $dbprefix;
    	var $user_columns;
    	var $config;

    	function __construct() {
    		parent::__construct();

    		Configure::load('vbulletin');

    		$this->config = Configure::read('vb');
    		$this->dbprefix = $this->config['db_prefix'];
    		$this->user_columns = $this->config['user_columns'];
    	}

    	function getSession($sessionhash,$idhash,$timeout) {
    		$sql = " SELECT * FROM {$this->dbprefix}session
    					WHERE
    						sessionhash 	= '" . $sessionhash . "' AND
    						idhash			= '" . $idhash . "' AND
    						lastactivity 	> '" . $timeout . "' LIMIT 1";
    		$result = $this->query($sql);
    		if ($result) {
    			foreach($result as $rows) $data = $rows;
    			foreach($data as $row) $session = $row;
    			return $session;
    		} else return false;
    	}

    	function getUser($userid) {
    		$sql = " SELECT " . implode(', ', $this->user_columns) . "
    					FROM {$this->dbprefix}user
    					WHERE userid = {$userid} LIMIT 1";

    		$result = $this->query($sql);
    		if ($result) {
    			foreach($result as $rows) $data = $rows;
    			foreach($data as $row) $userinfo = $row;
    			return $userinfo;
    		} else return false;
    	}

    	function getAvatar($userid = 0) {
    		$sql = " SELECT dateline, width, height
    					FROM {$this->dbprefix}customavatar
    					WHERE userid= " . $userid;
    		$result = $this->query($sql);
    		if ($result) {
    			foreach($result as $row) {
    				$avatarurl = $this->config['forum_url'].'image.php?u='.$userid."&dateline=".$row[$this->dbprefix.'customavatar']['dateline'];
    			}
    			return $avatarurl;
    		} else return false;
    	}

    	function getDefaultAvatar($id) {
    		$sql = " SELECT * FROM {$this->dbprefix}avatar
    					WHERE avatarid = " . $id;
    		$result = $this->query($sql);
    		if ($result) {
    			foreach($result as $row) {
    				$avatar = $this->config['forum_url'] . $row[$this->dbprefix.'avatar']['avatarpath'];
    			}
    			return $avatar;
    		} else return false;
    	}

    }
    ?>



Component Class:
````````````````

::

    <?php
    /*
     * VBulletin Brigde Component
     *
     * Author: Enang Yusuf - enangyusuf@gmail.com
     * Original Source for kohana author Netrosis ( www.syphex.com )
     *
     * Last Modified: 28 Januari 2010
     */

    class BridgeComponent extends Object
    {
       var $controller = true;
     	var $cookie_prefix;
    	var $default_user = array(
    		'userid' 			=> 0,
    		'username'			=> 'guest',
    		'usergroupid' 		=> 3,
    		'membergroupids'	=> '',
    		'sessionhash'		=> '',
    		'avatarurl'			=> '',
    		'logouthash'		=> '',
    		'salt'				=> '',
    		'email'				=> ''
    	);

    	var $userinfo;
    	var $config;
    	var $vb;

       function startup(&$controller) {
    		$this->controller =& $controller;

    		Configure::load('vbulletin');
    		$this->config = Configure::read('vb');

    		if(empty($this->config['license'])) die('no vBulletin licence, exiting');

    		$this->cookie_prefix = $this->config['cookie_prefix'];
    		$this->vb = $this->controller->Vbulletin;
       }

    	function authenticate_session() {
    		$userid = @$_COOKIE[$this->cookie_prefix . 'userid'];
    		$password = @$_COOKIE[$this->cookie_prefix . 'password'];
    		$sessionhash = @$_COOKIE[$this->cookie_prefix . 'sessionhash'];

    		$this->set_userinfo($this->default_user);

    		if(!$sessionhash) return;

    		$timeout = time() - $this->config['cookie_timeout'];
    		$session = $this->vb->getSession($sessionhash,$this->fetch_id_hash(),$timeout);

    		if(!$session) return;

    		if($session['host'] != $this->fetch_ip()) return;

    		$userinfo = $this->vb->getUser($session['userid']);

    		if(!$userinfo) return;

    		$securitytoken_raw = sha1(@$userinfo['userid'] . sha1(@$userinfo['salt']) . sha1($this->config['license']));
    		$userinfo['logouthash'] = time() . '-' . sha1(time() . $securitytoken_raw);

    		$this->set_userinfo($userinfo);

    		$this->userinfo['sessionhash'] = $session['sessionhash'];

    		if($this->userinfo['avatarid'] > 0){
    			$this->userinfo['avatarurl'] = $this->vb->getDefaultAvatar($userinfo['avatarid']);
    		} elseif($this->vb->getAvatar($userinfo['userid'])) {
    			$this->userinfo['avatarurl'] = $this->vb->getAvatar($userinfo['userid']);
    		} else {
    			$this->userinfo['avatarurl'] = $this->config['default_avatar'];
    		}
    		return false;
    	}

    	function set_userinfo($userinfo) {
    		foreach($userinfo as $key => $value) {
    			$this->userinfo[$key] = $value;
    		}
    	}

    	function fetch_id_hash() {
    		return md5(@$_SERVER['HTTP_USER_AGENT'] . $this->fetch_substr_ip($this->fetch_alt_ip()));
    	}

    	function fetch_substr_ip($ip, $length = null) {
    		if($length === NULL OR $length > 3) {
    			$length = 1;
    		}
    		return implode('.', array_slice(explode('.', $ip), 0, 4 - $length));
    	}

    	function fetch_ip() {
    		return $_SERVER['REMOTE_ADDR'];
    	}

    	function fetch_alt_ip() {
    		$alt_ip = $_SERVER['REMOTE_ADDR'];

    		if (isset($_SERVER['HTTP_CLIENT_IP'])) {
    			$alt_ip = $_SERVER['HTTP_CLIENT_IP'];
    		} else if (isset($_SERVER['HTTP_X_FORWARDED_FOR']) AND preg_match_all('#\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}#s', $_SERVER['HTTP_X_FORWARDED_FOR'], $matches)) {
    			$ranges = array(
    				'10.0.0.0/8' => array(ip2long('10.0.0.0'), ip2long('10.255.255.255')),
    				'127.0.0.0/8' => array(ip2long('127.0.0.0'), ip2long('127.255.255.255')),
    				'169.254.0.0/16' => array(ip2long('169.254.0.0'), ip2long('169.254.255.255')),
    				'172.16.0.0/12' => array(ip2long('172.16.0.0'), ip2long('172.31.255.255')),
    				'192.168.0.0/16' => array(ip2long('192.168.0.0'), ip2long('192.168.255.255')),
    			);
    			foreach ($matches[0] AS $ip) {
    				$ip_long = ip2long($ip);
    				if ($ip_long === false OR $ip_long == -1) {
    					continue;
    				}

    				$private_ip = false;
    				foreach ($ranges AS $range) {
    					if ($ip_long >= $range[0] AND $ip_long <= $range[1])
    					{
    						$private_ip = true;
    						break;
    					}
    				}

    				if (!$private_ip) {
    					$alt_ip = $ip;
    					break;
    				}
    			}
    		} else if (isset($_SERVER['HTTP_FROM'])) {
    			$alt_ip = $_SERVER['HTTP_FROM'];
    		}

    		return $alt_ip;
    	}


    	function __get($var) {
    		if(!isset($this->userinfo["$var"])) {
    			return;
    		} else{
    			return $this->userinfo["$var"];
    		}
    	}

    	function isLogged() {
    		if (!isset($this->userinfo["userid"])) return false;
    		else {
    			if ($this->userinfo["userid"] < 1) return false;
    			else return true;
    		}
    	}

    }

    ?>



Controller Class:
`````````````````

::

    <?php
    class HomeController extends AppController {
       var $uses = array('Vbulletin');
       var $components = array('Bridge');
    	var $helpers = array('Html', 'Form', 'Javascript');

    	function index() {
    		$this->pageTitle = 'Ngetest cakephp jeung vbulletin';
    		$this->Bridge->authenticate_session();
    		$furl = Configure::read('vb.forum_url');
    		$this->set('furl',$furl);
    		if($this->Bridge->isLogged()) {
    			$this->set('username',$this->Bridge->__get('username'));
    			$this->set('avatarimg',$this->Bridge->__get('avatarurl'));
    			$this->set('profileurl', $furl . 'member.php?u=' . $this->Bridge->__get('userid'));

    			$pms = $this->Bridge->__get('pmunread');
    			$pmline = ($pms != 1) ? "$pms new PMs" : "$pms new PM";
    			$this->set('pmunread',$pmline);
    			$this->set('logouthash', $this->Bridge->__get('logouthash'));
    			$this->set('islogged', true);
    		} else {
    			$this->set('sessionhash', $this->Bridge->__get('sessionhash'));
    			$this->set('islogged', false);
    		}
    	}

    }
    ?>



View Template:
``````````````

::


    <div id="userlogin">

    	<?php if (@$islogged) : ?>

    		<div id="userlogin_header">
    			<h3 style="padding:5px; text-align:center">Welcome <?=@$username?></h3>
    		</div>
    		<div style="padding:10px">
    			<div><a class="avatar" href="<?=@$profileurl?>"><img src="<?=@$avatarimg?>" width="100" title="Ieu fotona <?=$username?>" /></a></div>
    			<div style="margin:10px">
    				<table border="0" cellspacing="0" cellpadding="0">
    					<tr><td><a href="<?=@$furl?>private.php"><?=$pmunread?></a></td></tr>
    					<tr><td><a href="<?=@$furl?>profile.php?do=editprofile">Edit Profile</a></td></tr>
    					<tr><td><a href="<?=@$furl?>search.php?do=getdaily">Today's Posts</a></td></tr>
    				</table>
    			</div>
    		<div align="right" style="margin-top:-5px; padding-right: 15px;"><h3><a href="<?= $furl.'login.php?do=logout&logouthash='.$logouthash ?>" onclick="return confirm('are you sure?')">Logout</a></h3></div>
    		</div>
    	<?php else : ?>

    		<div id="userlogin_header">
    			<h2><span>User Login </span></h2>
    		</div>

    		<form action="<?= @$furl ?>login.php?do=login" method="post" id="loginForm">
    			<input type="hidden" name="do" value="login" />
    			<input type="hidden" name="url" value="<?= $this->here ?>" />
    			<input type="hidden" name="vb_login_md5password" />
    			<input type="hidden" name="vb_login_md5password_utf" />
    			<input type="hidden" name="s" value="<?= @$sessionhash; ?>" />
    			<input type="hidden" name="cookieuser" value="1" id="cb_cookieuser" />

    			<div id="field_username">
    				<strong><span>Log in:</span></strong>
    				<input name="vb_login_username" value="Username" type="text" onfocus="this.value=''" />
    			</div>

    			<div id="field_password">
    				<strong><span>Password:</span></strong>
    				<input name="vb_login_password" value="" type="password" onfocus="this.value=''" />
    			</div>

    			<div id="button_enter">
    			<input type="image" src="img/userlogin_enter.gif" title="Enter" class="button" />
    			</div>

    		</form>

    		<div id="userlogin_links">
    			<a href="<?=@$furl?>register.php?s=<?=@$sessionhash?>" id="register"><strong><span>Register >>></span></strong></a>
    			<br />
    			<a href="<?=@$furl?>login.php?do=lostpw" id="notregister"><strong><span>Not Registered Yet?</span></strong></a>
    		</div>

    	<?php endif ?>

    </div>



My Full Example `http://github.com/enangyusuf/Vbulletin-Bridge-For-CakePHP`_
Hopefully useful, semoga bermanfaat
`enangyusuf@gmail.com`_

.. _enangyusuf@gmail.com: mailto:enangyusuf@gmail.com
.. _http://github.com/enangyusuf/Vbulletin-Bridge-For-CakePHP: http://github.com/enangyusuf/Vbulletin-Bridge-For-CakePHP

.. author:: enangyusuf
.. categories:: articles, tutorials
.. tags:: vbulletin bridge,Tutorials


CakePHP SQL Shell - simple and powerful
=======================================

This shell helps to migrate sql databases accross several accounts. It
stores the version number in a txt file (make sure you ignore this
file in your version control system) and executes the sql scripts
stored in simple sql files until it reaches the highest version
number.
This is my first article on bakery. Comments and Contributions to the
code are welcome.

This is how it works:

1. Store the code (shown at the end of the article) in
app/vendors/shells/sql.php

2. Execute it (from root folder) on the bash with:
cake/console/cake sql

3. Now the script should create the file app/sql/version.txt with the
content '0' and print out the current version number (0).

4. Start to add sql files in app/config/sql. Filename has to be
numerical (1.sql, 2.sql) and monotonically increasing, which means
there must be no missing numbers (1.sql and 3.sql won't work). DON'T
ADD leading zeros to it! If you want to have more than one statement
in one file, separate it with 2 unix-style line endings (one blank
line, \n\n). I recommend to create only ONE sql file in one commit.
Don't edit this file again (except if there are mistakes), because it
could had been already spread out to the team.

5. If you work in a team (for example with git) and 2 or more team
members are adding the same file number (both of you want to create
2.sql), git should care about that so there should be the same version
number twice.

6. After pulling your copy from the server, just run
cake/console/cake sql update
and the shell should interactively update your database to the latest
version (in every step, the whole db is backuped into the tmp folder).


::

    
    <?php
    App::import('Folder');
    
    class SqlShell extends Shell {
    	private $version;
    	private $versionFile;
    	
    	function startup() {
    		parent::startup();
    		$this->out('Cake Sql Shell');
    		$this->hr();
    		$this->versionFile = APP.'config/sql/version.txt';
    		if (!is_file($this->versionFile)) {
    			$folder = new Folder(dirname($this->versionFile),true);
    			if (file_put_contents($this->versionFile, "0")) {
    				$this->out("Created version File with initial version 0 in ".$this->versionFile);	
    				$this->hr();
    			} else {
    				$this->out("Couldn't create version File in ".$this->versionFile.", aborting.");
    				$this->_stop();
    			}
    		}
    		
    	}
    
    	private function getVersion() {
    		$this->version = trim(file_get_contents($this->versionFile));
    		if (!is_numeric($this->version)) {
    			$this->out('Version not numeric in APP/config/sql/version.txt File, aborting...');
    			$this->_stop();
    		}
    		return (int)$this->version;
    	} 
    	
    	private function setVersion($version) {
    		if (!file_put_contents($this->versionFile, $version)) {
    			$this->out("Couldn't update version.txt file, aborting...");
    			$this->_stop();
    		}
    	}
    
    	function main() {
    		$this->out('Currently at version '.$this->getVersion());
    	}
    
    	private function getSql($number) {
    		if (($text = file_get_contents($filename = APP.'config/sql/'.$number.'.sql')) !== false) {
    			return $text;
    		} else {
    			$this->out("Couldn't load contents of file {$filename}, aborting...");
    			$this->_stop();
    		}
    	}
    
    	function backup($version) {
    		$folder = new Folder(TMP . 'dumps', true);
    		$c = ConnectionManager::getInstance()->config->default;
    		$this->filename = TMP . 'dumps'.DS.'sql_shell_backup_'.$version.'.sql.gz';
    		$this->out("Writing backup dump file to $this->filename");
    		if (file_exists($this->filename)) {
    			if ($this->in('File exists, overwrite? [y/n]') !== 'y') {
    				return;
    			}
    		}
    		$command = exec($c = "mysqldump -u {$c['login']} --password={$c['password']} -h {$c['host']} {$c['database']} | gzip > $this->filename");
    		if (!file_exists($this->filename)) {
    			$this->out("Couldn't create backup, aborting.");
    			$this->_stop();
    		}
    	}
    
    	function update() {
    		$sqlFolder = new Folder(APP.'config/sql');
    		list($dirs, $files)	 = $sqlFolder->read();
    		foreach ($files as $i => $file) {
    			if (!preg_match( '/\d+\.sql$/', $file))  {
    				unset($files[$i]);
    			}
    		}
    		sort($files, SORT_NUMERIC);
    		foreach ($files as $i => $file) {
    			$fileParts = explode(".", $file);
    			if ($fileParts[0] !== (string)($i+1)) {
    				return $this->out("Can't run update, something broken with sql files");
    			}
    		}
    		if (empty($this->args)) {
    			$version = count($files); 
    		} else {
    			if (!is_numeric($this->args[0])) {
    				$this->out('Version number must be numeric');
    				$this->_stop();
    			}
    			if (!isset($files[$this->args[0]-1])) {
    				$this->out('Version doesn\'t exist: '.$this->args[0]);
    				$this->_stop();
    			}
    			$version = $this->args[0];
    		}
    		App::import('Model', 'AppModel');
    		
    		$model = new AppModel(false, false);
    		for ($currentVersion = $this->getVersion(); $currentVersion < $version; $currentVersion = $this->getVersion()) {
    			$this->out('Currently at Version '.$currentVersion);
    			$this->out('Updating to Version '.($currentVersion+1).', executing sql:');
    			$this->hr();
    			$this->out($sql = $this->getSql($currentVersion+1));
    			$this->hr();
    			if ($this->in('Execute SQL? [y/n]') !== 'y') {
    				break;
    			} else {
    				$this->backup($currentVersion);
    				$sql = explode("\n\n", $sql);
    				foreach ($sql as $s)
    					if (trim($s)) {
    						$model->query($s);	
    					}
    				$this->setVersion((int)($currentVersion+1));	
    			}
    		}
    		$this->out('Now at version '.$this->getVersion());
    	}
    }
    ?>



.. author:: erma
.. categories:: articles, snippets
.. tags:: sql,shell,versioning,migrate,Snippets


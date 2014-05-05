Migrations
==========

A rails-like migrations script.

Everybody knows how hard is to keep a database up-to-date, when you
work with more than one programmer at the same time, in the same
project. On my company, we started to use a directory, containing all
.sql files, with CREATE TABLEs, INSERTs and UPDATEs. But today I
thought that we could make it even better to manage them.

I read about CakePHP's migration script, but just couldn't make it
work. Probably my fault, I'm not a cake bake fan. Then I decided to
create a script to manage all those .sql files we create, using the
rails migration idea. So here's the code:

::

    
    <?php
    
    # Getting database configuration
    
    $dir = realpath(dirname(__FILE__).'/../');
    
    require $dir."/config/database.php";
    
    $config = new DATABASE_CONFIG();
    $config = $config->default;
    
    # Connecting to MySQL
    
    $link = mysql_connect($config['host'], $config['login'], $config['password']);
    
    # Selecting database - create it if it doesn't exists
    
    if (!mysql_select_db($config['database'], $link))
    {
    	mysql_query("CREATE DATABASE {$config['database']}", $link);
    	mysql_select_db($config['database'], $link);
    }
    
    # Get all migrations made - create table if it doesn't exists
    $sql = "SELECT file FROM migrations";
    $result = mysql_query($sql);
    
    $migrations = array();
    
    if (!$result)
    {
    	$sql = "CREATE TABLE `migrations` (`file` VARCHAR( 255 ) NOT NULL, UNIQUE (`file`)) ENGINE = MYISAM ;";
    	mysql_query($sql);
    }
    else
    {
    	while ($row = mysql_fetch_array($result))
    	{
    		$migrations[] = $row[0];
    	}
    }
    
    # Read all files from /db folder
    if ($handle = opendir($dir.'/db'))
    {
    	while (false !== ($file = readdir($handle)))
    	{
    		if ($file == '.' || $file == '..')
    			continue;
    
    		if (!in_array($file, $migrations))
    		{
    			# File hasn't been migrated yet
    			# Send it to mysql
    			shell_exec("mysql -u{$config['login']} -p{$config['password']} {$config['database']} < {$dir}/db/{$file}");
    
    			# Add file name to migrations table
    			mysql_query("INSERT INTO migrations (file) VALUES ('{$file}')");
    		}
    	}
    }
    
    die("Migration Complete.\n");
    
    ?>

And that's it! Now all we need to do is to create files in the /db
folder we created, and run "php scripts/migrations.php" every time
someone adds a file there.

Hope it helps someone. And please let me know if anyone has a better
idea! =)



.. author:: Thaissa
.. categories:: articles, snippets
.. tags:: database,migrations,mysql,DB Migrations,migration,Snippets


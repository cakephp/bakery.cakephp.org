Deploying CakePHP with Capistrano
=================================

I was looking for a good deployment solution for my CakePHP apps and
as nothing seems to fit perfectly, Capistrano does a very good job at
keeping it simple. My setup is using a Git repository but almost SCM
all supported by cap. Here is a basic guide into Capistrano setup
configuration for CakePHP.
First install and/or update your Ruby and Capistrano (ruby -v, cap
-V). Get to know the basics of Capistrano at
`http://www.capify.org/index.php/From_The_Beginning`_. I only describe
here how to configure a basic recipe for CakePHP.

::

    cd /your/project/root
    mkdir config
    capify .

This creates a few files. The important one which I'll explain how to
configure for CakePHP is config/deploy.rb.

You must set a few configuration first :

::

    set :application, "example.com"
    set :repository,  "ssh://git@repo.repo.com/repo/repo.git"
    set :branch, "master"
    set :scm, :git 
    set :deploy_to, "/home/user/domains/dev.#{application}"
    set :deploy_via, :remote_cache # see http://www.capify.org/index.php/Understanding_Deployment_Strategies
    # Configuration of you app path in the repo
    set :cakephp_app_path, "public_html/app"
    set :cakephp_core_path, "public_html/cake"
    # Nice optional configurations
    set :use_sudo, false # don't need this on most setup
    set :keep_releases, 10  # only keep 10 version to save space
    set :copy_exclude, [".git",".gitignore"] # or any match like [".svn","/documents-on-repo-but-dont-deploy"]

Your server(s) with SSH access :

::

    # Roles
    role :app, "user@exemple.com:12345"

Custom environments shortcut task (optional). It executes tasks and/or
change configurations for a specific deploy. In my example, you can
use "cap production deploy" which will deploy "production" branch on
www and run CakePHP tests. You can also use "cap staging deploy" which
will prompt for which branch to deploy and run cake tests. Default
"cap deploy", on dev., does not run the tests (you may change all
this, its just an example).

::

    # Environements
    task :production do
    	set :deploy_to, "/home/user/domains/www.#{application}/"
    	set :branch, "production"
    	after "deploy:finalize_update", "deploy:cakephp:testsuite"
    end
    
    task :staging do
    	set :deploy_to, "/home/user/domains/stating.#{application}/"
    	set(:branch) { Capistrano::CLI.ui.ask("Branch to stage: ") }
    	after "deploy:finalize_update", "deploy:cakephp:testsuite"
    end

There is a default set of tasks executed on deploy, but we can add a
few to the chain using before or after functions. I have set
web:disable and web:enable which will create a temporary .capistrano-
lock file for wich my CakePHP app will detect and display the
maintenance page to users. Cleanup is to remove old releases (not
executed by default as it would be an unexpected default behaviour).

::

    # Custom events configuration
    before "deploy:update", "deploy:web:disable"	
    after "deploy:restart", "deploy:web:enable"
    after "deploy:update", "deploy:cleanup" 

The tasks I configured :

::

    # Custom deployment tasks
    namespace :deploy do
    		
    	desc "This is here to overide the original :restart"
    	task :restart, :roles => :app do
    		# do nothing but overide the default because we don't need to restart a RoR app
    	end
    	
    	task :finalize_update, :roles => :app do
    		# link a custom configuration file for environment specifics
    		run "ln -s #{deploy_to}/#{shared_dir}/bootstrap.remote.php #{release_path}/#{cakephp_app_path}/config/bootstrap.remote.php"
    		# you may link here upload file folders if you have any, which should be placed in #{deploy_to}/#{shared_dir} which won't be overide on each deployment
    		# overide the rest of the default method
    	end
    		
    	namespace :web do
    		
    		desc "Lock the current access during deployment"
    		task :disable, :roles => :app do
    			run "touch #{current_release}/#{cakephp_app_path}/webroot/.capistrano-lock"
    		end
    		
    		desc "Enable the current access after deployment"
    		task :enable, :roles => :app do
    			run "rm #{current_release}/#{cakephp_app_path}/webroot/.capistrano-lock"
    		end
    	
    	end
    	
    	namespace :cakephp do
    	
    		desc "Verify CakePHP TestSuite pass"
    		task :testsuite, :roles => :app do
    			run "#{release_path}/#{cakephp_cake_path}/console/cake testsuite app all -app #{release_path}/#{cakephp_app_path}", :env => { :TERM => "linux" } do |channel, stream, data|
    				if stream == :err then
    					error = CommandError.new("CakePHP TestSuite failed")
    					raise error
    				else
    					puts data
    				end
    			end
    		end
    	
    	end
    
    end


Put all this code in your deploy.rb and you can now run "cap
deploy:setup" once to init the Capistrano structure on the server.

Then point your document root to
/home/user/www.exemple.com/current/app/webroot (which is an alias-
symlink to
/home/user/www.exemple.com/releases/20080819001122/app/webroot).

.. _http://www.capify.org/index.php/From_The_Beginning: http://www.capify.org/index.php/From_The_Beginning

.. author:: j15e
.. categories:: articles, tutorials
.. tags:: capistrano,Tutorials


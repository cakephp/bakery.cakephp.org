Autotest using Watchr getting notified via Growl
================================================

[p]I was taking a look at ZenTest a while ago, especially the autotest
functionality. As stated in the ZenTest site, autotest:[/p] [ulist]
[li]Improves feedback by running tests continuously.[/li]
[li]Continually runs tests based on files youâ€™ve changed.[/li]
[li]Get feedback as soon as you save. Keeps you in your editor
allowing you to get stuff done faster.[/li] [/ulist] [p]To add more
bang to your buck, you can get continuous notifications from growl
every time you save a file, alerting you if any of your previous test
cases have failed.[/p] [p]Googling around I wanted to see if this can
be tied into testing with CakePHP. If I did a horrible job googling
and there is already something out there that mimics this
functionality please send me a link. Anyways, I stumbled across
Watchr. Watchr is a tool that monitors a directory tree, and triggers
a user defined action whenever an observed file is modified. At that
point trigger a CakePHP test suite command line argument and send the
results to growl. And there we have it, continuous testing with growl
notifications on CakePHP using Watchr.[/p]
Step 1: Install the Watchr gem: `http://github.com/mynyml/watchr`_
Step 2: Upload images that growl will use to display passed/failed
cases in the directory ~/.watchr_images/

Step 3: Set up a watchr configuration file in app/config/watchr.rb

Step 4: Every time you develop have watchr runing. Type the following
in your root directory:

watchr app/config/watchr.rb

watchr config file:
```````````````````

::


    $cake = "/Applications/MAMP/bin/php5/bin/php /Applications/MAMP/htdocs/yourProject/cake/console/cake.php"

    watch('app/(models|controllers)/(.*).php')  { |m| test_changed_model_or_controller(m[0]) }
    watch('app/tests/cases/(models|controllers)/(.*).test.php')  { |m| test_changed_test_case(m[0]) }
    watch('app/config/(.*).php') { |m| test_app() }
    watch('app/(app_controller|app_model).php')  { |m| test_app() }

    def test_changed_model_or_controller(file)
      type = file.split('/')[1]
      name = file.split('/')[2].split('.')[0]
      run "#{$cake} testsuite app case #{type}/#{name}"
    end

    def test_changed_test_case(file)
      type = file.split('/')[3]
      name = file.split('/')[4].split('.')[0]
      run "#{$cake} testsuite app case #{type}/#{name}"
    end

    def test_app()
      run "#{$cake} testsuite app all"
    end

    def run(cmd)
      puts(cmd)
      result = `#{cmd}`
      growl result rescue nil
      puts result
    end

    def growl(message)
      message = message.split('---------------------------------------------------------------')[3].split('Time taken by tests')[0]
      growlnotify = `which growlnotify`.chomp
      image = message.include?('fails') ? "~/.watchr_images/failed.png" : "~/.watchr_images/passed.png"
      options = "-w -n Watchr --image '#{File.expand_path(image)}' -m '#{message}'"
      system %(#{growlnotify} #{options} &)
    end

Sources:

Original Article Posted Here: `http://www.amitsamtani.com/2010/05/09/cakephp-autotest-using-watchr/`_

`http://github.com/mynyml/watchr/blob/master/README.md`_

`http://gist.github.com/276317`_

`http://bjhess.com/blog/2010/2/23/setting_up_watchr_and_rails`_

`http://www.rubyinside.com/watchr-generic-autotest-alternativ-2511.html`_

`http://book.cakephp.org/view/863/Running-tests-in-the-Command-Line`_


.. _http://gist.github.com/276317: http://gist.github.com/276317
.. _http://github.com/mynyml/watchr: http://github.com/mynyml/watchr
.. _http://bjhess.com/blog/2010/2/23/setting_up_watchr_and_rails: http://bjhess.com/blog/2010/2/23/setting_up_watchr_and_rails
.. _http://book.cakephp.org/view/863/Running-tests-in-the-Command-Line: http://book.cakephp.org/view/863/Running-tests-in-the-Command-Line
.. _http://github.com/mynyml/watchr/blob/master/README.md: http://github.com/mynyml/watchr/blob/master/README.md
.. _http://www.rubyinside.com/watchr-generic-autotest-alternativ-2511.html: http://www.rubyinside.com/watchr-generic-autotest-alternativ-2511.html
.. _http://www.amitsamtani.com/2010/05/09/cakephp-autotest-using-watchr/: http://www.amitsamtani.com/2010/05/09/cakephp-autotest-using-watchr/

.. author:: amitsamtani
.. categories:: articles, tutorials
.. tags:: testing,autotest,growl,watchr,zentest,Tutorials


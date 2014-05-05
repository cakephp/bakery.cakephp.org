session setflash with cool jquery effects
=========================================

Hi, I am Gautam Lakum. I am a php web developer and love to use
cakephp for custom applications. I love to share and post something
new articles, tutorials and tools with others. For that, you can visit
my blog www.gautamlakum.com This is my first article for cakephp.org.
I hope it will be useful to all of you.

Hi there, I have something new for cakephp developers to customize
their setflash messages. I can't say it much different, but I have
added some cool css and jquery effects to it. So it looks different
then simple cakephp flash message. So let us start.

#. Add jquery file to your layout or view file. You can download it
   from here(`http://code.jquery.com/jquery-1.4.4.js).`_
#. Add some jQuery code into your layout file or create another
   separate javascript file for it.<code> // Location :
   /app/webroot/js/flash.js $(document).ready(function(){
   $('.cancel').click(function(){ $(this).parent().parent().fadeOut();
   return false; }); });</code>
#. Create separate element or layout for session setflash message. If
   you are using cakephp 1.2.6 or older version, then you will need to
   create layout for it. And if you are using cakephp 1.3.x, then you
   will need to create separate element file.

Here is the sample code.<code> // Location for cakephp 1.3.x :
/app/views/elements/flash_good.ctp // Location for cakephp 1.2.x :
/app/views/layouts/flash_good.ctp<div class="flash_good"> <a
href="javascript:void(0);" class="cancel"><img src="<?php echo
SITE_URL.SITE_ROOT; ?>/img/delete.png" alt="Close" /></a> <?php // for
cakephp 1.3.x echo $message; // for cakephp 1.2.x echo
$content_for_layout; ?></div></code>

<code> // Location for cakephp 1.3.x :
/app/views/elements/flash_bad.ctp // Location for cakephp 1.2.6 :
/app/views/layouts/flash_bad.ctp<div class="flash_bad"> <a
href="javascript:void(0);" class="cancel"><img src="<?php echo
/img/delete.png" alt="Close" /></a> <?php // for cakephp 1.3.x echo
$message; // for cakephp 1.2.x echo $content_for_layout;
?></div></code>

#. Now it is time to play with some css. Add following css code to
   your layout or create separate css file for it::

    Location : /app/webroot/css/flash.css
    .flash_good { background:none repeat
    scroll 0 0 #94DDF9; border:1px solid #69CFF6; float:left; margin:5px
    10px; padding:3px; text-align:center; width:932px; border-radius:5px;
    behavior: url(border-radius.htc); -moz-border-radius: 5px; }
    .flash_bad { background:none repeat scroll 0 0 #FC7862; border:1px
    solid #ff0000; float:left; margin:5px 10px; padding:3px; text-
    align:center; width:932px; border-radius:5px; behavior: url(border-
    radius.htc); -moz-border-radius: 5px; } .flash_good img { float:right;
    } .flash_bad img { float:right; }

#. Here is sample of your main layout that you can use to display site
   content::

    <?php echo $html->css('flash'); echo
    $javascript->link('/js/jquery-1.4.4.js'); echo
    $javascript->link('/js/flash.js'); ?>

#. Here I have sample code to use in your controller file::

    function editprofile($username = null) { if (!empty($this->data)) {
    $save = $this->User->save($this->data['User']); if (!empty($save)) {
    $this->Session->setFlash('Your profile has been saved successfully.',
    'flash_good'); $this->redirect('/profile'); } else {
    $this->Session->setFlash('An error occured!', 'flash_bad');
    $this->redirect('/profile'); } } }

So, that's all. I am done with this. I hope it will be helpful to you
all. Let me know your feedback or changes in this.


.. _http://code.jquery.com/jquery-1.4.4.js).: http://code.jquery.com/jquery-1.4.4.js).

.. author:: webdevbit
.. categories:: articles, tutorials
.. tags:: session,session flash,setflash,Tutorials


Rolling you own Gallery2 component
==================================

update Jan 28 2010: This Article is deprecated and here for reference
and historical purposes. It is still usable however as comments below
suggest and I agree, Helper is more suited for such simple
functionality. [url=http://gallery.menalto.com/]Gallery2[/url] is a
Media Manager and can be embedded in other applications like CMS.
Gallery2 also has an API that we can use to embed Gallery into our Web
Apps. Below is only a sample of what can be done. If you find it
interesting enough, please contribute your improvements and
suggestions as well as any code. I have only been working with CakePHP
for little over two weeks, so not saying this is the best way. My
first post so go easy :)

First of all you need to have installed CakePHP 1.2.xxx version (may
work with 1.1xx but I have not tested that). You also need to have a
working installation of Gallery 2. For this case I have used Gallery
2.3 svn. Upload a few images in Gallery2 before you begin. Don't worry
about albums etc.


Note: You need to have Gallery2 installed on the same server as Cake.
I used /dohnut for cake and /gallery2 for gallery2. Also do not
restrict Guest view in Gallery2 or this will not work. make sure the
group 'Everyone' in G2 (gallery2) has Full View access, by default
they do.

Now if everything works individually and we just want to get on with
it. Here's what we do.

1. Create a Gallery Component in your /app/controller/components name
it gallery.php and paste the following code. Modify where necessary.


Component Class:
````````````````

::

    <?php 
    Class GalleryComponent extends Object{
    	function startup(&$controller)
        {
        	/* Change this or specify in config or var?
    'embedUri' can point to our example page, it should 
    actually point to your embedded Gallery index page 
    when you have one */
        require_once('/var/www/html/gallery2/embed.php');
       $ret = GalleryEmbed::init(array('fullInit' => true, 
      'embedUri' => '/dohnut/posts/randomstuff', 'g2Uri' =>
    '/gallery2/main.php')); // Change this, could be in Config or var?
     	if ($ret) {
         	$data =  $ret->getAsHtml();
         	return false;
     		}
        		return true;
        } 
    /* Read the Fun Stuff towards the end of this article*/  
        function imageBlock($options = array('blocks' => 'randomImage',
        'show' => 'title|date')){
        		
     	/*
     	 * See "Site admin" -> "image block" for all available
             * options. the parameters are the same as for 
             * the external imageblock
      	*/
     	list ($ret, $bodyHtml, $headHtml) = GalleryEmbed::getImageBlock($options);
     	if ($ret) {
         	 $error = $ret->getAsHtml();
         	return $error;
     	}
     	/* $bodyHtml contains the image block. 
             Print it somewhere on your website */
    	return $bodyHtml;
        }
    }
    ?>


2. Now in any controller of your choice, which you can bake if you
want we will write a function and its corresponding view. So let's say
we have posts_controller.php. This function will display a single
random image on each page reload.


Controller Class:
`````````````````

::

    <?php 
    Class PostsController extends AppController {
        var $name  = 'Posts';
        var $components = array('Gallery');
        .
        .
        /* your rest of the functions */
        
       // Our gallery function
      function randomstuff(){
        $this->set('g2data',$this->Gallery->imageBlock());
      }
    
    }
    ?>

3. Now for the view.
create /views/posts/randomstuff.ctp with the following


View Template:
``````````````

::

    
    <H1> Random Pictures </H1.
    <?php echo $g2data; ?>

..and we're done here!

now point your browser to the correct url http://.../posts/randomstuff
and hit refresh as many times as it takes you to get satisfied.
Not so hard was it. :)

Resources:
`http://codex.gallery2.org/Gallery2:API`_ - The full API documentation


Fun Stuff: The function imageBlock is an actual copy paste from the
API documentation with very minor changes if any. Try to work out
other examples in their API.

Hope to see a better Gallery2 integration in Cake than there are in
some *other* apps.

my blog `http://vangel.3ezy.com`_

.. _http://codex.gallery2.org/Gallery2:API: http://codex.gallery2.org/Gallery2:API
.. _http://vangel.3ezy.com: http://vangel.3ezy.com/

.. author:: Vangel
.. categories:: articles, tutorials
.. tags:: image,api,gallery,plugin,media,Components,Tutorials


ThumbnailHelper, a thumbnail generator with cache dynamic
=========================================================

A helper that generates thumbnails of images and uses a cache to store
them.

On every site I've ever worked had the problem of image thumbnails,
because we always have to have thumbnails of certain images to display
them in views in cakephp was no different. I found the behavior that
makes MeioUpload everywhere upload images, but it uses to generate the
thumbnails phpThumb but I could not use it in any way without
mentioning that it would generate the thumbnail image at the time of
upload, but often need these miniatures in several different sizes and
is not feasible to create several thumbnails, so I created a helper
that "serves" these thumbnails according to the passed parameters such
as size, height, quality and cutting method, where he serves as a
miniature based on these parameters it creates a cache of the image
thus forming her only once, saving resources and increasing server
performance. The use of ThumbnailHelper looks like this:

::

    //I declare the helper in
    public $helpers = array('Html', 'Thumbnail');

//updated echo $this->Thumbnail->render('teste.jpg', array( 'path' =>
'', 'width' => '100', 'height' => '100', 'resizeOption' => 'portrait',
'quality' => '100' ), array('id' => 'img-test', 'alt' => 'thumbnail
test'));

To download the helper visit my github, make a clone of the repository
folder inside the app/View/Helper.

`https://github.com/emersonsoares/ThumbnailsHelper-for-CakePHP`_


.. _https://github.com/emersonsoares/ThumbnailsHelper-for-CakePHP: https://github.com/emersonsoares/ThumbnailsHelper-for-CakePHP

.. author:: emersonsoares
.. categories:: articles, helpers
.. tags:: thumbnail,Helpers


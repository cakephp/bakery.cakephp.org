RESTful web application development in cakephp
==============================================

Nowadays RESTful architecture based API (web services) development is
accepted across the Web as a simpler alternative to SOAP - and Web
Services Description Language (WSDL)-based Web services. Key evidence
of this shift is the adoption of REST by web 2.0 service providers,
including Yahoo, Google, and Facebook, who have shifted their SOAP and
WSDL-based web services to RESTFul API. RESTful development has become
the standard way of creating a web application.
Representational State Transfer (REST) is a stateless client-server
architecture in which the resources are identified by their URLs and
are manipulated through their representations, this basically means
that each unique URL is a representation of some object (resource).
Within the REST architecture, requests from the Web service clients or
browser use standard HTTP methods to manipulate the application's
resources. As far as REST is concerned GET, POST, PUT, and DELETE HTML
methods are used to manipulate resources. However, the HTTP protocol
defines eight methods, GET, POST, PUT, DELETE, HEAD, TRACE, OPTIONS,
and CONNECT

Multiple representations for a resource - When you request a page
using a RESTful architecture, the page that is returned can be
considered a representation of the resource that you are requesting.
However, an HTML page is just one possible representation of any given
resource. Other representations might include an XML document, a text
document, or a block of JSON encoded JavaScript. Using the RESTful
architecture, you would request a different representation of a
resource using the same method, but by passing a different piece of
metadata to the server indicating the representation that you would
like to have returned. For example the following two requests would
both be routed to the same controller and action method:

**How easy to develop a RESTful architecture based web application
using cakephp framework?**
The power of CakePHP has a lot to do with conventions. The framework
enforce certain conventions and standards that users must follow. You
name your database tables, file names, etc; a particular way and boom,
models, views and controllers are automatically created and ready for
use. This is the beauty of the MVC structure. Your URLs also follow
thing structure: `www.mydomain.com/controller/action/params`_

According to the introduction of a controller given in cookbook of
cakephp, A controller is used to manage the logic for a part of your
application. Most commonly, controllers are used to manage the logic
for a single model. For example, if you were building a site for an
online bakery, you might have a RecipesController and a
IngredientsController managing your recipes and their ingredients.
Controllers can include any number of methods which are usually
referred to as actions. An action is a single method of a controller.
CakePHPâ€™s inbuilt dispatcher calls actions when an incoming request
matches a URL to a controllerâ€™s action

You can easily add REST functionality to your application with only a
few changes, below are all changes which you need to make to get REST
benefits:

1) Open app/config/routes.php file and add

::

    Router::mapResources(â€˜articleâ€™);

line at the end of the file (here article is a resource and a
controller of the application), this line will map GET, POST, PUT,
DELETE HTML methods with index, view(show), add(creation),
edit(update), delete methods/actions of article resource (controller).
This line has to be repeated for every resource. So this single line
has done the half job for making an RESTful architecture based web
application development. Now only thing which remains for complete
RESTful development is multiple representations of a resource. This is
also very smartly handled in cakephp framework and described below in
2rd, 3rd and 4th points.

2) Add

::

    Router::parseExtensions();

line after

::

    Router::mapResources(â€˜articleâ€™);

3) Include RequestHandler component in article controller

::

    var $components = array('RequestHandler');

4) At last for every alternative type of representations of a resource
you need add a directory under views/articles and views/layouts , the
name of the directory would be extension such as txt, pdf, doc
etcâ€¦(note â€“ that in case of xml you donâ€™t have to create
directory under views/layouts as this is already provided by cakephp
standard installation).

5) If you want to customize how the url maps to any action in your
RESTful api you can add a line like this to your routes.php file

::


    Router::connect(
    	"/:controller/:id",
    	array("action" => "edit", "[method]" => "PUT"),
    	array("id" => "[0-9]+")
    )

Where [method] can be one of the HTTP verbs already mentioned.

Once you follow above 4 points as described, you will have RESTful
architecture ready for your application. So it is quite easy to
develop a REST based web application using cakephp framework.

.. _www.mydomain.com/controller/action/params: http://www.mydomain.com/controller/action/params

.. author:: rightwayindia
.. categories:: articles, tutorials
.. tags:: CakePHP,REST,web services,api development,restful web developm,restful development,restful web service,Tutorials


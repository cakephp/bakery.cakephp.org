Creating a Micro Jobs Application from scratch in flat 1 month
==============================================================

Considering the growth in freelance and micro jobs industry, we built
an application using Cake PHP (Below I've explained why) which will
cater to startups planning to come up with micro jobs marketplace.
That's how Nano Bazaar was born.

We brainstormed a lot initially to figure out the right framework to
ensure rapid development of the application and deployment ease. We
were sure of only one thing at that time - application has to be
developed in PHP or PHP based framework.

We have had some experience with Code Igniter and Cake PHP however it
was not a touch decision to make which one to choose considering the
advantages Cake comes with, e.g. CLI support for baking M/V/C so we
can develop a quick working prototype, Auth/ACL support, core Ajax
helper, availability of variety of plugins and components to ensure we
don't end up reinventing the wheel (Code Igniter too has a good
collection of reusable components however it's not as large as
Cake's).

I won't go into a full comparison mode here since that is already done
by many geeks very well. Neither my intention is to make a point that
Cake is superior than Code Igniter in all aspects.

We considered Zend as well however we planned not to continue with it
due to it's "not really MVC" approach and our lack of expertise of
course. One thing we found a bit disappointing (the same might sound
plus point to many) was that they have a API/Helper for everything but
it's more like "vendors" thing in Cake, very few things are supported
natively in pure MVC fashion.

Well, our decision proved right. We developed a working prototype
within 3 days and resolved dependency issues in next 2-3 days. Ajax
was an important part of our application and Cake's Ajax helper was
simply great. Our "time to market" was not so good since we entered in
micro jobs space a little late however we are glad to have used Cake
PHP else it would have been really too late to enter the market. So
far, Nano Bazaar has done well and hopefully it'll continue to do so.

**About** : Nano Bazaar is a micro jobs marketplace application (or
`fiverr clone`_) similar to popular site **www.fiverr.com**. You can
see Nano Bazaar in action at `http://demo.nano-bazaar.com`_


.. _http://demo.nano-bazaar.com: http://demo.nano-bazaar.com
.. _fiverr clone: http://www.nano-bazaar.com

.. author:: nanobazaar
.. categories:: articles, case_studies
.. tags:: AJAX,cakephp 1.2,Case Studies


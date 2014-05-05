OpenInviter for CakePHP
=======================

[p] A few months ago, I've published a case study on the bakery about
a website made with Cake. [/p] [ulist] [li]
[url]http://bakery.cakephp.org/articles/view/unaneem-com-a-community-
website-built-on-cakephp-with-extensive-use-of-ajax[/url] [/li]
[/ulist] [p] As I listed the components I used, i spoke of an
OpenInviter component for CakePHP. A lot of people asked more
informations about it. [/p] [p] The thing is that the OpenInviter tool
evolves very fast (a new version every 2-3 days) so it's hard to
disclose a stable CakePHP version component. [p] Whatever, I decided
to disclose my current version and hope that the community will
contribute to make it stable. So here it is... [/p]


About OpenInviter

OpenInviter (`http://openinviter.com/`_) is a tool that allows your
clients to import their contacts from a social network or a webmail.

It's an open source project (license GNU GPL v2).

I didn't find any available components/snippets/... that could help me
to integrate OpenInviter with CakePHP so i had to create one of my
own.


Issues with OpenInviter

The problem was that this tool has a lot of existing features that are
annoying.


+ First of all, the need of an api account on the OpenInviter website
  and the use of a remote password check to use the tool. Isn't that
  strange to you...
+ Then there are remote debugging methods and the possibility to use a
  hosted solution which could be a threat to your server security or
  clients data security.
+ Finally, there's the structure itself of the tool which makes it
  hard to use with CakePHP as it is meant and designed to be used as a
  stand-alone tool.


OpenInviter for CakePHP

I've come with a solution which is available at :
`http://code.google.com/p/cakeoinviter/`_. It is based on a CakePHP
component replacing the openinviter.php file and then the rest of the
tool dispatched among cakephp folders as specified in the archive (or
the trunk).

Features :


+ It's a GNU GPL v2 license as it stands for the original tool.
+ openinviter.php has been reengineered as a working CakePHP component
  class . All references to hosted / remote solutions are disabled.
+ The file _base.php has been modified to remove all references to any
  hosted / remote solutions to prevent sensitivie informations from your
  website from being disclosed to a third party.
+ The plugins are the same as provided by the official website.
+ It does not require any download from the official OpenInviter
  website. Every needed files are embedded within the archive provided.


Issues with OpenInviter for CakePHP

There's a need for regular updates that I can't provide on my own on a
daily basis. So I'm counting on you to help me maintain this
component.

If you notice bugs or security threats please tell me.

I'm waiting for your comments to improve this article with your
updates.



Thanks !

Thanks for reading this article and forgive my english, I'm not a
native speaker. Thanks to the CakePHP developers for their great
framework and to all the community for its contributions.



.. _http://openinviter.com/: http://openinviter.com/
.. _http://code.google.com/p/cakeoinviter/: http://code.google.com/p/cakeoinviter/

.. author:: Kainchi
.. categories:: articles, components
.. tags:: component,Contact,openinviter,open,inviter,importer,Components


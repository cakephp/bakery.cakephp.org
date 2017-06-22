Upcoming CakePHP Roadmap & Releases
===================================

With Cakefest complete, I'd like to share the meat of my talk concerning the
roadmap and release schedule for CakePHP.

3.5 and 3.6
-----------

We're currently working towards 3.5, which will ship sometime this summer. It
contains a number of improvements to the middleware layer, and introduces more
deprecations for combined methods with complex parameter types. 3.6 is the next
logical release, that like all 3.x releases will be backwards compatible. 3.6
will introduce a number of new features, and deprecations. It is notably
different from other 3.x releases, as it will convert all documented
deprecations into runtime errors.

By having runtime errors you'll be able to more easily locate the places your
application and its dependencies are using deprecated features of CakePHP. These
deprecation warnings will be easy to turn on and off allowing you to upgrade to
3.6 early and incrementally fix the deprecation warnings your application has.

4.0.0
-----

As the next major version of CakePHP 4.0 will be the first release in 4 years to
contain breaking changes. Unlike the upgrade from 2.x to 3.x we want this to be
a dramatically simpler upgrade. The breaking changes will be focused on:

* Removing methods/features that were deprecated in 3.x. All features that emit
  runtime warnings in 3.6 will be removed in 4.0
* Interfaces will be updated to contain the methods that currently exist as
  documentation. Because there is no way to add methods to interfaces in
  a backwards compatible way, we're using 4.0.0 to update interfaces.

4.0 will also move the minimum required PHP version to 7.1.0. This will allow
us to update CakePHP to use strict typing internally allowing you to benefit
from a safer and easier to use CakePHP. All currently documented types will be
converted into strict typehints where possible. This is one of the driving
factors for the numerous deprecations being done in 3.5 and 3.6.

In addition to the breaking changes being made, we'd also like to use 4.0 as an
opportunity to refine and improve our error messages with the goals of providing
a better development experience. As users of Rust and Elm we see what can be
done with error messages and want to bring the quality of error messages
available with those tools to PHP.

Lastly, an explicit goal is to make the upgrade *easy*. If your application
application runs in the latest 3.6 without any deprecation errors, then it
should run in 4.0.0 with *minimal effort*. Because of the additional
typehinting, there may be minor changes needed in an application. We recognize
that the 2.x upgrade was unpleasant and don't want a repeat of that experience.

In an ideal world, we'd like to release 3.6 and 4.0 very close to each other.
Our current timelines put the first betas for these releases in late 2017 and
early 2018.

Long Term Support for 3.x
-------------------------

Our current plans would make the 3.x to 4.0 upgrade relatively easy. Because of
this we don't currently see many reasons to continue doing 3.x feature releases.
This would make 3.6 the last 3.6 with the possibility of 3.7 happening.
Furthermore, we plan on doing supporting 3.x with:

* Bug fixes for *18 months* after 4.0.0.
* Security fixes for *36 months* after 4.0.0 is released.

Our hope is that these time frames give you and your teams ample time to plan
and execute an upgrade.

Long Term Support for 2.x
-------------------------

2.x has enjoyed a long life. Given the rate of issues being opened, and pull
requests being created for 2.x, *2.10 be the last 2.x release*. We recognize
that there are still a number of applications running on 2.x so we plan on
supporting 2.x with:

* Bug fixes for *12 months* after the release of 4.0.0.
* Security fixes for *18 months* after the release of 4.0.0.

After that point, 2.x will become unmaintained and receive no further updates.

As always these timelines and milestone scope are not finalized, and we'd like
to get your feedback and involvement in this process.

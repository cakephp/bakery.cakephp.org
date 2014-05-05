Success story: Using CakePHP at the Instituto Nacional de Educacion
Tecnologica.
============

In this article we describe an experience of software development.
CakePHP was critical to the projectâ€™s success. Here I emphasize what
we consider are some of the main advantages to using the Framework.
Here we want to pass on our experience as a development team "in the
trenches". In this context, we can say that CakePHP has been very
useful and has perfectly fulfilled our expectations. We hope that our
experience serves as guidance for other developers to evaluate whether
to use CakePHP.


Background and project objectives
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In mid 2008, at the â€œInstituto Nacional de EducaciÃ³n
TecnolÃ³gicaâ€ (INET, `http://www.inet.edu.ar/`_) we began to
evaluate the performance of the management systems used by the
organizationâ€™s Information Unit. Among other responsibilities, the
Information Unit maintains the data of the Federal Register of
Institutions of Professional Technical Education in accordance with
Law No. 26,058. The Register is a list of approximately 3,500
institutions that offer technical education throughout the country,
containing basic information for each one (features, location,
address, telephone, directorâ€™s personal data, etc.) as well as
further information about courses, degrees and certificates granted,
enrollment of students in each curriculum, and so on.

At the time, information had been maintained through two complementary
applications: a Web application developed in Java used for updating
information, and a desktop application developed in Visual Basic 5 for
data query (using a scheme client / server). Oracle 10g was used for
data management.

Existing developments were limited so it was necessary to perform a
series of modifications and upgrades to facilitate the areaâ€™s work
and improve the quality and quantity of information available. The
problem was that the teams who had developed these applications and
designed the original database were no longer working for the
institution. Moreover, in addition to being heterogeneous as far as
their language (Java, VB5) was concerned, these applications were
developed without using similar design patterns, standards, or
frameworks â€“all factors that would have made maintenance and
updating tasks much easier.

To resolve the difficulties encountered and improve the quality of
systems in the short and medium term, we elaborated a work plan which
included:

1) Migrating systems to a new technology platform (Linux Ubuntu
Server, Apache 2, PostgreSQL, PHP, CakePHP)

2) Redesigning the database (since the existing data model had many
limitations)

3) Developing a new application which integrated prior developments,
improved their services, and enabled continuous improvement and
maintenance.


Development
~~~~~~~~~~~

We started working on the project in late 2008. Between October and
December we defined the new architecture for the application,
redesigned the database, and developed a basic design of what the new
application should be like. All these tasks paved the way for the
development we carried out throughout 2009.

In January 2009, two people joined the work team: a DBA who was a
manager of the new technology platform, and a developer.
Interestingly, the programmer had good knowledge of PHP but had never
used CakePHP, so he was trained in the new technology during January
and February. We started developing the new application in March. The
entire development cycle took 3 months -from March to May. In June,
the new application was put into production on the INET intranet, and
replaced all previous developments.

The development was highly successful. As a result, the institution
authorities decided to strengthen the team in order to continue the
ongoing improvement of the new application and extend the
computerization of systems to other INET areas. To this end, two new
programmers were hired in August. As in the previous case, the new
programmers had good knowledge of PHP -as well as programming in
general- but not of CakePHP, so they began studying the Framework.
Again, within a very short period of just over a month â€“less than
expectedÂ¬â€“ new programmers were able to join the application
development with no setbacks. Collaborating towards this rapid
integration was our most experienced programmer, who served as mentor
and leader of the rest of the team.

In 2010 we expect to expand the development team, as well as continue
the maintenance and improvement of the application developed. We also
wish to initiate new developments for as-yet non-computerized areas
connected to the Register of Institutions, where in some cases new
programs will be integrated as modules in their present development
and in other cases, they will operate as separate applications with
one same central database.


The role of CakePHP
~~~~~~~~~~~~~~~~~~~

CakePHP was critical to the projectâ€™s success. Here I emphasize what
we consider are some of the main advantages to using the Framework.

It offers many useful, ready-to-use tools. CakePHP prevents us from
having to â€œreinvent the wheelâ€ every time. For common problems
that must be solved when using an application of medium complexity,
CakePHP already provides a solution. In our case the most useful
features were: authentication (auth), session management, automatic
data sanitization, data validation at the model level. Its different
Helpers also proved quite useful: HTML, forms, pagination, AJAX,
Javascript, etc. This is actually just a partial list of the utilities
it offers. Furthermore, if a solution cannot be found in the core, one
can always check the plugins.

It promotes the use of standards and design patterns. Using CakePHP
greatly facilitates communication among programmers by providing
programming conventions and use patterns, such as MVC, to organize an
applicationâ€™s components. This is invaluable in the medium term.
When standards or patterns are not used, programmers write code
according to their own discretion, which in the medium-term causes
many maintenance problems. As we all know, each programmer codes
differently. With CakePHP, one can quickly determine â€“and with quite
a degree of certainty- where to tweak the code to change a particular
view or functionality.

It has an active community. CakePHP has a large community which is
beneficial when the team faces a difficult problem. We have made very
good use of its mailing lists and online documentation, as well as
â€œthe bakeryâ€. In this regard, CakePHP has a comparative advantage
over other development frameworks which have closed or less active
communities.

Among other results of using CakePHP we may mention:

It improves productivity. The productivity of the development team was
somewhat surprising. While development is of medium complexity, the
speed with which it was put into production was striking as compared
to other projects of similar scope we had seen in our previous
experience. The ease with which CakePHP allows you to implement basic
functionality (common to any application) contributes to this high
productivity.

It simplifies the incorporation of new programmers. Experience has
shown that using CakePHP makes incorporating new programmers easier.
The Framework learning period varied from one to two months. After
this period, new members were incorporated into the development team
smoothly. Its conventions, standards and use of design patterns
greatly facilitate communication within the team, providing a shared,
meaningful technical language. This benefit of using CakePHP
facilitates the incorporation of new programmers, and also helps
mitigate the effects of staff turnover, which is quite frequent in our
segment of Argentinaâ€™s current labor market. With todayâ€™s intense
competition, itâ€™s hard to keep from losing trained human resources,
but using CakePHP allows you to replace lost resources with less
impact than that of other settings.

Programmers like it. In our case, programmers joining our team had no
prior experience with CakePHP. After a brief training period, they all
felt comfortable with the Framework, and several began to use it on
their own personal projects.

Thus far we have gone over the advantages we found in using CakePHP.
Certainly many of these advantages can be obtained using other
frameworks and there are many currently available that are probably as
good as CakePHP. But the point of these commentaries is not to compare
frameworks: here we want to pass on our experience as a development
team "in the trenches", with applications used by INET staff every
day. In this context, we can say that CakePHP has been very useful and
has perfectly fulfilled our expectations. We hope that our experience
serves as guidance for other developers to evaluate whether to use
CakePHP.


Project Management
~~~~~~~~~~~~~~~~~~

Some final words in order to put our experience in perspective.
CakePHP is an important part of the solution, but it is also no more
than a tool that makes sense within a broader context. Our use of
agile management methodologies has also been crucial to the
projectâ€™s success. We used a combination of techniques, taking ideas
from XP and Scrum and adapting them to INETâ€™s characteristics and
resources. The details of these methodologies and their adaptation are
beyond the scope of this article; however this should be mentioned to
avoid painting too simplistic a picture of what it means to develop a
corporate application.

RomÃ¡n Mussi, February 2010.


.. _http://www.inet.edu.ar/: http://www.inet.edu.ar/

.. author:: romanmussi
.. categories:: articles, case_studies
.. tags:: CakePHP,development,Case Studies


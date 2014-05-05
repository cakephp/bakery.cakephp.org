Email template management plugin
================================

Hi everyone, This is my first open source plugin. which we can use to
manage email templates in cakephp

Just to provice a little breath of relief to every Cake baker out
there, here is a solution for creating and updating email content as
per requirement of client every time to time. The objective is to skip
the amount of effort of developer from every time email content
changes according to the requirement. This Plugin will help
administrator to change email content as per there requirement and
need, whenever it is needed,

How to use?
-----------

1) Download (https://github.com/madhavi-
webonise/email_template/downloads ) or clone (https://github.com
/madhavi-webonise/email_template ) the code for this plugin .

2) Add the email_template folder into your "your-app-path/app/plugins"
folder.

3) Run the migration to create required table. Migration will add one
dummy email template in your database table.

4) Now check the email templates list in your application.

5) You can add more email templates from "your-app-
url/email_template/email_templates/add".

6) you can check Constants list which you can use into email content
to replace by real value by clicking "Email Constants" link from add
or edit page.

7) you can add more constants in "$emailconstants" array from
EmailTemplateAppController with blank value. If we didn't provide for
any constant in code then it will replace with black and it will not
show direct constant in email.

8) You can add same constant in "EmailTemplateController" with there
one or two lines description Where and why we can use that constant.

9) Now In code where you have to use the email template fetch it from
database by there slug name and Replace the constants with there valid
values to how to do this check "getEmailTemplateAndReplaceConstant"
action from "EmailTemplateController".

10) Send the email using email templates.

for any further queries or suggestions, please write me to madhavi
[at] weboniselab.com.



.. author:: madhavi
.. categories:: articles, plugins
.. tags:: plugin,Email content management,email templates,email template plugin,email management,Plugins


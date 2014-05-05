How to save core configurations to database table
=================================================

This will enable `config.php` settings to be managed from admin panel.
CREATE TABLE IF NOT EXISTS `settings` (
`id` int(11) NOT NULL auto_increment,
`name` varchar(255) NOT NULL,
`value` varchar(255) NOT NULL,
`type` varchar(20) NOT NULL,
`notes` varchar(255) NOT NULL,
`mutable` tinyint(1) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=117 ;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `name`, `value`, `type`, `notes`,
`mutable`) VALUES
(1, 'App.base', '', 'text', 'Don''t change, unless you know what are
you doing.', 0),
(2, 'App.baseUrl', '', 'text', 'Don''t change, unless you know what
are you doing.', 0),
(3, 'App.name', 'My Shop Online', 'text', 'Name of your website, This
would appear on everywhere front-end and emails.', 1),
(4, 'App.email', 'ish1301@gmail.com', 'text', 'Your official email,
You will receive all from submissions on front-end.', 1),
(6, 'App.phone', '647-772-1301', 'text', 'Your official phone, It
would be published on front-end.', 1),
(7, 'App.fax', '647-772-1301', 'text', 'Your official fax number, It
would be published on front-end.', 1),
(8, 'App.userLimit', '5', 'text', 'Number of records to be displayed
per page on front-end.', 1),
(9, 'App.adminLimit', '15', 'text', 'Number of records to be displayed
per page in admin-panel.', 1),
(10, 'discount', '1', 'checkbox', 'If checked, discount will applied
on checkout. percentage can be managed in users module.', 1),
(11, 'App.weightUnits', 'LBS', 'text', 'Weight units (LBS or KGS),
weights can be changed in products module. ', 1),
(12, 'App.Inventory.safetyStock', '20', 'text', 'Backup stock, If any
item stock fall below this amount, System will show it as "out of
stock".', 1)


.. author:: ihs1301
.. categories:: articles, tutorials
.. tags:: database,configuration,save,Tutorials


<?php

$host = $_SERVER['SERVER_NAME'];
$port = $_SERVER['SERVER_PORT'] == 80 ? '' : ':' . $_SERVER['SERVER_PORT'];
$url = $_SERVER['PATH_INFO'];
$root = __DIR__ . '/';

$byebye = function () {
	header('HTTP/1.1 404 Not Found');
	exit;
};

if (!preg_match('#/articles/[A-Za-z0-9_\-]+/([0-9]{4})/([0-9]{2})/([0-9]{2})/(.*)#', $url, $matches)) {
	$bybye();
}

$year = $matches[1];
$month = $matches[2];
$day = $matches[3];
$article = $matches[4];

$path = implode('/', [$year, $month, $day]) . '/';

if (!is_dir($root . $path)) {
	$byebye();
}

$files = array_map(function ($file) {
	return current(explode('.rst', $file));
}, array_map('basename', glob($path . '*.rst')));

$files = array_map(function ($file) {
	return [strtolower(str_replace('-', '_', $file)), $file];
}, $files);

foreach ($files as $file) {
	similar_text($file[0], $article, $percent);
	if ($percent >= 90) {
		header("HTTP/1.1 301 Moved Permanently");
		header('Location:/'  . $path . $file[1] . '.html');
		exit;
	}
}

$bybye();

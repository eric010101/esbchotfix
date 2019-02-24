<?php
$v2tname = @$_GET["v2tname"];
$path = "/var/www/html/v2t/".$v2tname;
$fileContent = file_get_contents($path);
echo $fileContent;
?>
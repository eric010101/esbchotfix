<?php
// HTTP
define('HTTP_SERVER', 'http://$SSH_IP$/cart/admin/');
define('HTTP_CATALOG', 'http://$SSH_IP$/cart/');
// HTTPS
define('HTTPS_SERVER', 'http://$SSH_IP$/cart/admin/');
define('HTTPS_CATALOG', 'http://$SSH_IP$/cart/');
// DIR
define('DIR_APPLICATION', '/var/www/html/cart/admin/');
define('DIR_SYSTEM', '/var/www/html/cart/system/');
define('DIR_IMAGE', '/var/www/html/cart/image/');
define('DIR_STORAGE', DIR_SYSTEM . 'storager3li728tg11x/');
define('DIR_CATALOG', '/var/www/html/cart/catalog/');
define('DIR_LANGUAGE', DIR_APPLICATION . 'language/');
define('DIR_TEMPLATE', DIR_APPLICATION . 'view/template/');
define('DIR_CONFIG', DIR_SYSTEM . 'config/');
define('DIR_CACHE', DIR_STORAGE . 'cache/');
define('DIR_DOWNLOAD', DIR_STORAGE . 'download/');
define('DIR_LOGS', DIR_STORAGE . 'logs/');
define('DIR_MODIFICATION', DIR_STORAGE . 'modification/');
define('DIR_SESSION', DIR_STORAGE . 'session/');
define('DIR_UPLOAD', DIR_STORAGE . 'upload/');

// DB
define('DB_DRIVER', 'mysqli');
define('DB_HOSTNAME', 'localhost');
define('DB_USERNAME', 'esbcocadmin');
define('DB_PASSWORD', 'esbcochappy');
define('DB_DATABASE', 'esbcoc_shop1');
define('DB_PREFIX', 'op_');
define('DB_PORT', '3306');
// OpenCart API
define('OPENCART_SERVER', 'https://www.equalsmart.com/');

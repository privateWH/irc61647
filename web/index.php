<?php
/**
 * Created by PhpStorm.
 * User: Weinian He
 * Date: 9/25/17
 * Time: 6:44 PM
 */

require_once (realpath(dirname(__FILE__)."/../classes/autoloader.php"));

//Core\Logger::setLoggerLevel(\Core\Logger::LOG_LEVEL_DEBUG);

$router = new Router();

/* All paths are using Regular Expression, PHP doesn't support named group in RegEx so it will be cryptic*/

$router->accept("GET","/^\/$/s","Controller\IndexController::response");

/*
 * This get the dynamic pagination limit for a specified data source by id.
 * PATH /data/get/(?P<dataSourceId>[::number::])/list-of-limit
 * Example: /data/get/1/list-of-limit. This gets the list of page size by data source id 1.
 */
$router->accept("GET","/^\/data\/get\/(\d+)\/list-of-limit$/s", "Controller\DataController::getListOfLimit");

/*
 * This get the paginated data by a specified data source id, start index and the number of rows .
 * PATH /data/get/(?P<dataSourceId>[::number::]/start/(?P<startIndex>[::number::])/limit/(?P<limitBy>[::number::])/sort/(?P<sort>(ASCEND OR DESCEND))/by/(?P<listOfKeys>[::number::] follow by comma or just [::number::]
 * Example: /data/get/1/start/0/limit/20/sort/asc/by/0. This gets the data source id 1 started from index 0 up to 20 sorted ascend by the key index 0.
 */
$router->accept("GET", "/^\/data\/get\/(\d+)\/start\/(\d+)\/limit\/(\d+)\/sort\/(asc|des)\/by\/((?:\d+,?)*)$/s","Controller\DataController::getData");

/**
 *
 */
$router->accept("POST", "/^\/data\/(\d+)\/add$/s","Controller\DataController::addNewData");


$router->response();
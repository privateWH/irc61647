<?php
/**
 * Created by PhpStorm.
 * User: Weinian He
 * Date: 9/25/17
 * Time: 6:51 PM
 */
namespace Controller;

class IndexController
{
    public static function response(){
        $content = realpath(dirname(__FILE__).'/../../web/assets/views/desktop-index.html');
        readfile($content);
    }
}
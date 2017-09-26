<?php
/**
 * Created by PhpStorm.
 * User: Weinian He
 * Date: 9/25/17
 * Time: 6:43 PM
 */

class autoloader
{
    public function __construct()
    {
        spl_autoload_register(function ($className){
            if (class_exists($className)) return true;
            $classWithNamespace = str_replace('\\',DIRECTORY_SEPARATOR,$className);
            $fileName = (dirname(__FILE__)."/{$classWithNamespace}.php");
            if (file_exists($fileName)){
                require $fileName;
                return true;
            }

            return false;
        });
    }
}
$loader = new autoloader();


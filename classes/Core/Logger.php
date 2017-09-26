<?php
/**
 * Created by PhpStorm.
 * User: Weinian He
 * Date: 9/25/17
 * Time: 7:54 PM
 */

namespace Core;


class Logger
{
    public const LOG_LEVEL_DEBUG = "debug";
    public const LOG_LEVEL_INFO = "info";
    public const LOG_LEVEL_NONE = "none";
    public const LOG_LEVEL_RUNTIME = "runtime";

    private static $logLevel = Logger::LOG_LEVEL_NONE;

    public static function setLoggerLevel($level){
        switch ($level){
            case Logger::LOG_LEVEL_DEBUG:
            case Logger::LOG_LEVEL_INFO:
            case Logger::LOG_LEVEL_NONE:
            case Logger::LOG_LEVEL_RUNTIME:
                self::$logLevel = $level;
                break;
            default:
                self::$logLevel = Logger::LOG_LEVEL_NONE;
        }
    }

    public static function getLoggerLevel(){
        return self::$logLevel;
    }

    public function debug($title, $content){
        if (self::$logLevel == Logger::LOG_LEVEL_DEBUG){
            echo "<div class='debug'><span class='title'>$title</span><span>$content</span></div>";
        }
    }
    public function info($title, $content){
        if (self::$logLevel == Logger::LOG_LEVEL_INFO){
            echo "<div class='info'><span class='title'>$title</span><span>$content</span></div>";
        }
    }

    /**
     * @param $title
     * @param $content
     */
    public function runtime($title, $content)
    {
        if (self::$logLevel == Logger::LOG_LEVEL_RUNTIME) {
            //TODO: This is for production logging

        }
    }
}
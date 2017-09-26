<?php
/**
 * Created by PhpStorm.
 * User: Weinian He
 * Date: 9/25/17
 * Time: 7:09 PM
 */
namespace Core;
class Resolver{
    private $requestMethod;
    private $matchPath;
    private $handler;

    /**
     * @return mixed
     */
    public function getRequestMethod()
    {
        return $this->requestMethod;
    }

    /**
     * @param mixed $requestMethod
     */
    public function setRequestMethod($requestMethod)
    {
        $this->requestMethod = $requestMethod;
    }

    /**
     * @return mixed
     */
    public function getMatchPath()
    {
        return $this->matchPath;
    }

    /**
     * @param mixed $matchPath
     */
    public function setMatchPath($matchPath)
    {
        $this->matchPath = $matchPath;
    }

    /**
     * @return mixed
     */
    public function getHandler()
    {
        return $this->handler;
    }

    /**
     * @param mixed $handler
     */
    public function setHandler($handler)
    {
        $this->handler = $handler;
    }

}
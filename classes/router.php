<?php
/**
 * Created by PhpStorm.
 * User: Weinian He
 * Date: 9/25/17
 * Time: 6:45 PM
 */



class Router{

    private $logger;

    /**
     * @var Core\Resolver[] resolvers
     */
    private static $resolvers;
    /**
     * @var string $currentPath
     */
    private static $currentPath;

    /**
     * @var string $currentRequestMethod
     */
    private static $currentRequestMethod;

    private function registerController($requestMethod, $path, $handler){
        if (!isset(self::$resolvers)){
            self::$resolvers = array();
        }
        $resolver = new Core\Resolver();
        $resolver->setRequestMethod($requestMethod);
        $resolver->setMatchPath($path);
        $resolver->setHandler($handler);
        self::$resolvers [] = $resolver;
    }

    public function __construct()
    {
        $this->logger = new \Core\Logger();
        //$path = isset($_SERVER['PATH_INFO'])?$_SERVER['PATH_INFO']:"/";
        self::$currentPath = isset($_SERVER['REQUEST_URI'])?$_SERVER['REQUEST_URI']:"/";
        self::$currentRequestMethod = $_SERVER['REQUEST_METHOD'];

    }

    public function accept($requestMethod, $path, $handler){
        $this->registerController($requestMethod,$path,$handler);
    }

    public function response(){
        $this->logger->debug("Current Path",self::$currentPath);
        $this->logger->debug("Request Method",self::$currentRequestMethod);

        $foundMatch = false;

        foreach(self::$resolvers as $resolver){
            //var_dump($resolver);
            if ($resolver->getRequestMethod() == self::$currentRequestMethod){
                $this->logger->debug("Request Method", self::$currentRequestMethod);
                $this->logger->debug("Resolver Matching", self::$currentPath . " with: " .$resolver->getMatchPath());
                if (preg_match($resolver->getMatchPath(),self::$currentPath, $matches)){
                    $this->logger->debug("Match Found! Handling","Path: ". self::$currentPath. " Resolver: ". $resolver->getHandler());
                    $this->logger->debug("Parameters for Handler", json_encode($matches));
                    $foundMatch = true;
                    if (call_user_func_array($resolver->getHandler(),$matches) === false){
                        // Make sure your handler doesn't return false see: http://php.net/manual/en/function.call-user-func-array.php
                        $this->logger->debug("Fail to call handler", "The Handler for ".self::$currentPath. " failed!");
                    }
                    break;
                }
            }
        }
        if (!$foundMatch){
            new \Controller\NoPathFoundController();
        }
    }
}
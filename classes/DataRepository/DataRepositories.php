<?php
/**
 * Created by PhpStorm.
 * User: Weinian He
 * Date: 9/25/17
 * Time: 10:58 PM
 */

namespace DataRepository;


class DataRepositories
{
    /**
     * @var DataSourceInterface[] $dataSources
     */
    private $dataSources;

    /**
     * @var DataRepositories $instance
     */
    private static $instance;

    /**
     * DataRepository constructor.
     */
    private function __construct()
    {
        $this->registerRepository();
    }

    /**
     * @return DataRepositories
     */
    public static function getInstance(){
        if (self::$instance == null) {
            self::$instance = new static();
        }
        return self::$instance;
    }

    /**
     * @param int $id
     * @return bool|DataSourceInterface
     */
    public static function getDataSource($id){
        if (isset(self::getInstance()->dataSources[$id])){
            return self::getInstance()->dataSources[$id];
        }
        return false;
    }


    private function registerRepository(){
        /* This data sources can be generated dynamically */
        $this->dataSources = array(
            1=>new DataSourceIRC61647(),
        );
    }

}
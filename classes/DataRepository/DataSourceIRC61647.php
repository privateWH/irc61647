<?php
/**
 * Created by PhpStorm.
 * User: Weinian He
 * Date: 9/25/17
 * Time: 10:22 PM
 */
namespace DataRepository;
use DataRepository\Model\IRC61647Model;

class DataSourceIRC61647 implements DataSourceInterface
{
    /**
     * @var IRC61647Model[] $data
     */
    private $data = array();

    private function insertIRC61647($name,$model,$macAddress){
        $index = count($this->data);
        $obj = new IRC61647Model($index,$name,$model,$macAddress);
        $this->data [] = $obj;
        return $index;
    }

    public function insert(...$insertParams){
        if(count($insertParams) == 3){
            return $this->insertIRC61647(...$insertParams);
        } else {
            throw new \Exception("Implementation error with data source one insert should be 3 parameters");
        }
    }
    public function get(...$getParams)
    {
        echo "Hello";
        // TODO: Implement get() method.
    }

    public function delete(...$deleteParams)
    {
        // TODO: Implement delete() method.
    }

    public function update(...$updateParams)
    {
        // TODO: Implement update() method.
    }
}
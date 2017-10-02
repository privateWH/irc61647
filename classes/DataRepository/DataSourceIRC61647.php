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
    private $path = null;


    public function __construct()
    {
        $this->path = dirname(__FILE__)."/../../Data/IRC61647.js";
        if (realpath($this->path) === false){
            $json = fopen(($this->path), "w") or die ("Unable to open file!");
            fclose($json);
            $this->data = array();
        } else {
            $readFile = file_get_contents(realpath($this->path));
            if (empty($readFile)){
                $this->data = array();
            } else {
                $this->data = json_decode($readFile);
            }
        }
    }

    private function saveDataBase(){
        // ADD MORE DATA CHECK HERE
        file_put_contents($this->path,json_encode($this->data));
    }

    private function insertIRC61647($name,$model,$macAddress){
        $index = 0;
        if (count($this->data) >0){
            //var_dump($this->data);
            /**
             * @var stdClass $last
             */
            $last = $this->data[count($this->data)-1];
            $index = $last->id+1; // TODO: CURRENTLY IMPLEMENT AS SQL AUTO_INCREMENT
        }
        $obj = new IRC61647Model($index,$name,$model,$macAddress);
        $this->data [] = $obj->getModel();
        $this->saveDataBase();
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
        if (count($getParams) == 1){
            $query = $getParams[0];
            $getLimitedData = array_slice($this->data,$query->startIndex,$query->limitBy);
            return $getLimitedData;

            //TODO Implement sort By feature
            if ($getLimitedData != null && count($getLimitedData) > 0){

            }

        }
        return [];
        /*
        $output->dataSourceId = $dataSourceId;
        $output->startIndex = $startIndex;
        $output->limitBy = $limitBy;
        $output->sortOrder = $sortOrder;
        $output->sortKeys = $sortKeys;
        $output->data = array('test','good','yes');
        */

    }

    public function delete(...$deleteParams)
    {
        if (count($deleteParams) == 1){
            $query = $deleteParams[0];
            if (isset($query->deleteAll)){
                //TODO current if property exists then it will reset;
                $this->data = array();
            } elseif (isset($query->deleteByIndex)){
                $idx = $this->indexOfRecordById(intval($query->deleteByIndex));
                if ($idx === -1) return false;
                array_splice($this->data,$idx,1);
            }
            $this->saveDataBase();
            return true;
        }
        return false;
    }

    private function ifRecordExists($id){
        //TODO Optimize this with hash key table
        foreach($this->data as $record){
            if ($record->id == $id) return true;
        }
        return false;
    }
    private function indexOfRecordById($id){
        //TODO Hash Key give O(1)
        foreach($this->data as $idx=>$record){
            if ($record->id == $id) return $idx;
        }
        return -1;
    }
    public function update(...$updateParams)
    {
        $output = new \stdClass();
        $output->error = true;
        if (count($updateParams) == 1) {
            $query = $updateParams[0];
            if (isset($query->id) && ($updateId = intval($query->id)) >= 0 && $this->ifRecordExists(intval($query->id))) {
                if (isset($query->name) && isset($query->model) && isset($query->macAddress)) {
                    $sanatizeRecord = new \stdClass();
                    // TODO Further sanatize with htmlspecial and etc
                    $sanatizeRecord->name = $query->name;
                    $sanatizeRecord->model = $query->model;
                    $sanatizeRecord->macAddress = $query->macAddress;

                    $this->data[$updateId] = $sanatizeRecord;
                    $output->error = false;
                    $output->query = $query;
                    $output->data = "success";
                } else {
                    $output->query = $query;
                    $output->data = "update query failed with missing fields";
                }
            } else {
                $output->query = $query;
                $output->data = "update index check failed";
            }
        } else {
            $output->data = "internal error update query implementation error";
        }
        return $output;


    }
}
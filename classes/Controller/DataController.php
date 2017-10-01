<?php
/**
 * Created by PhpStorm.
 * User: Weinian He
 * Date: 9/25/17
 * Time: 7:44 PM
 */

namespace Controller;

class DataController
{
    /**
     * Example: http://localhost:1987/data/get/2/list-of-limit
     * @param $url
     * @param $dataSourceId
     */
    public static function getListOfLimit($url,$dataSourceId){
        if (intval($dataSourceId) == 1){
            $output = new \stdClass();
            $output->dataSourceId = $dataSourceId;
            $output->limits = [10,30,50];
            echo json_encode($output);
        }
    }

    /**
     * Example: http://localhost:1987/data/get/1/start/0/limit/1/sort/asc/by/123,111
     * @param $url
     * @param $dataSourceId
     * @param $startIndex
     * @param $limitBy
     * @param $sortOrder
     * @param $sortKeys
     */
    public static function getData($url,$dataSourceId,$startIndex,$limitBy,$sortOrder,$sortKeys){
        $query = new \stdClass();
        $query->dataSourceId = $dataSourceId;
        $query->startIndex = $startIndex;
        $query->limitBy = $limitBy;
        $query->sortOrder = $sortOrder;
        $query->sortKeys = $sortKeys;
        //$query->data = array('test','good','yes');
        $dataSourceId = intval($dataSourceId);
        $output = new \stdClass();
        $output->query = $query;
        $output->error = false;

        if ($dataSourceId == 1){
            $dataSource = \DataRepository\DataRepositories::getDataSource($dataSourceId);
            $output->data = $dataSource->get($query);
            echo json_encode($output);
        } else {
           $output->error = true;
           $output->data = "Wrong Data Source Id";
           echo json_encode($output);
        }
    }

    public static function deleteData($url, $dataSourceId){
        $data = file_get_contents('php://input');
        $dataRoot = json_decode($data);
        //var_dump($data);
        if ($dataRoot != null && isset($dataRoot->data)){
            $packet = $dataRoot->data;

            if (isset($packet->deleteAll)){
                DataController::resetData($dataSourceId);
            } else if (isset($packet->index)) {
                DataController::deleteDataByIndex($dataSourceId,$packet->index);
            }
        } else {
            $output = new \stdClass();
            $output->error = true;
            $output->data = "The delete command support deleteAll or index=number";
            http_response_code(500);
            echo json_encode($output);
        }
    }

    private static function resetData($url,$dataSourceId){
        $output = new \stdClass();
        $output->error = false;
        $dataSourceId = intval($dataSourceId);
        if ($dataSourceId == 1){
            $dataSource= \DataRepository\DataRepositories::getDataSource($dataSourceId);
            //var_dump($dataSource);
            $query = new \stdClass();
            $query->deleteAll = true;
            $output->query = $query;
            if ($dataSource->delete($query)){
                $output->data = "success";
            } else {
                $output->data = "failed";
                $output->error = true;
            }
        } else {
            $output->error = true;
            $output->data = "Data Source Not supported";
        }
        echo json_encode($output);

    }

    private static function deleteDataByIndex($dataSourceId,$index){
        $output = new \stdClass();
        $output->error = false;
        $dataSourceId = intval($dataSourceId);
        $query = new \stdClass();
        $query->deleteByIndex = $index;
        $output->query = $query;

        if ($dataSourceId== 1){
            $dataSource = \DataRepository\DataRepositories::getDataSource($dataSourceId);
            if ($dataSource->delete($query)){
                $output->data = "success";
            } else {
                $output->data = "failed";
                $output->error = true;
            }
        } else {
            $output->error = true;
            $output->data = "Data Source Not Supported";
        }
        echo json_encode($output);
    }

    public static function updateData($url,$dataSourceId){
        $output = new \stdClass();
        $output->error = false;
        $dataSourceId = intval($dataSourceId);
        if ($dataSourceId== 1){
            $data = file_get_contents('php://input');
            $dataRoot = json_decode($data);
            $dataSource = \DataRepository\DataRepositories::getDataSource($dataSourceId);
            // THIS OVERWRITES default $output implementation

            if (!isset($dataRoot) || !isset($dataRoot->data) || empty($dataRoot->data->name) || empty($dataRoot->data->model) || empty($dataRoot->data->macAddress)||
                !is_string($dataRoot->data->name) || !is_string($dataRoot->data->model) || !is_string($dataRoot->data->macAddress)){
                throw new \Exception("Name, Model and Mac Address are needed and must be string");
            }

            $output = $dataSource->update($dataRoot->data);
        } else {
            $output->error = true;
            $output->data = "Data Source Not Supported";
        }
        echo json_encode($output);
    }

    public static function addNewData($url,$dataSourceId){
        $dataSourceId = intval($dataSourceId);
        $output = new \stdClass();
        $output->error = false;
        if ($dataSourceId == 1){
            $data = file_get_contents('php://input');
            $dataRoot = json_decode($data);
            if ($dataRoot === null){
                $output->error = true;
                $output->data = "Cannot parse the input json for addNewData";
                http_response_code(500);
                echo json_encode($output);
            } else {
                $dataSource = \DataRepository\DataRepositories::getDataSource($dataSourceId);
                $dataPacket = $dataRoot->data;
                try {
                    if (empty($dataPacket->name) || empty($dataPacket->model) || empty($dataPacket->macAddress)||
                        !is_string($dataPacket->name) || !is_string($dataPacket->model) || !is_string($dataPacket->macAddress)){
                        throw new \Exception("Name, Model and Mac Address are needed and must be string");
                    }
                    // Validation in here
                    $returnId = $dataSource->insert($dataPacket->name, $dataPacket->model, $dataPacket->macAddress);
                    $output->data = $returnId;
                    echo json_encode($output);
                } catch (\Exception $e) {
                    $output = new \stdClass();
                    $output->error = true;
                    $output->data = $e->getMessage();
                    http_response_code(500);
                    echo json_encode($output);
                }
            }
        }
    }
}
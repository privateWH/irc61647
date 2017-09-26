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
        $output = new \stdClass();
        $output->dataSourceId = $dataSourceId;

        $output->limits = [10,30,50];
        echo json_encode($output);
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
        $output = new \stdClass();
        $output->dataSourceId = $dataSourceId;
        $output->startIndex = $startIndex;
        $output->limitBy = $limitBy;
        $output->sortOrder = $sortOrder;
        $output->sortKeys = $sortKeys;
        $output->data = array('test','good','yes');
        echo json_encode($output);
    }

    public static function addNewData($url,$dataSourceId){
        $dataSourceId = intval($dataSourceId);
        $data = file_get_contents('php://input');
        $formatted = json_decode($data);
        if ($formatted === null){
            $output = new \stdClass();
            $output->status = "error";
            $output->message = "Cannot parse the input json for addNewData";
            echo json_encode($output);
        } else {
            $dataSource = \DataRepository\DataRepositories::getDataSource($dataSourceId);
            try {
                $returnId = $dataSource->insert($formatted->name, $formatted->model, $formatted->macAddress);
                $output = new \stdClass();
                $output->status = "success";
                $output->id = $returnId;
                echo json_encode($output);
            } catch (\Exception $e) {
                $output = new \stdClass();
                $output->status = "error";
                $output->message = $e->getMessage();
                echo json_encode($output);
            }
        }
    }
}
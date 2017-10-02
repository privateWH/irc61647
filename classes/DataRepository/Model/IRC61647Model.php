<?php
/**
 * Created by PhpStorm.
 * User: Weinian He
 * Date: 9/25/17
 * Time: 10:44 PM
 */
namespace DataRepository\Model;

class IRC61647Model
{
    private $id;
    private $name;
    private $model;
    private $macAddress;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return mixed
     */
    public function getMacAddress()
    {
        return $this->macAddress;
    }

    /**
     * @param mixed $macAddress
     */
    public function setMacAddress($macAddress)
    {
        $this->macAddress = $macAddress;
    }

    /**
     * IRC61647Model constructor.
     * @param $id
     * @param $name
     * @param $model
     * @param $macAddress
     */
    public function __construct($id, $name, $model, $macAddress)
    {
        $this->id = $id;
        $this->name = $name;
        $this->model = $model;
        $this->macAddress = $macAddress;
    }

    public function getModel(){
        $model = new \stdClass();
        $model->id = $this->id;
        $model->name =$this->name;
        $model->model = $this->model;
        $model->macAddress = $this->macAddress;
        return $model;
    }

}
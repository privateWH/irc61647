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

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param int $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getModel()
    {
        return $this->model;
    }

    /**
     * @param string $model
     */
    public function setModel($model)
    {
        $this->model = $model;
    }

    /**
     * @return string
     */
    public function getMacAddress()
    {
        return $this->macAddress;
    }

    /**
     * @param string $macAddress
     */
    public function setMacAddress($macAddress)
    {
        $this->macAddress = $macAddress;
    }
    private $name;
    private $model;
    private $macAddress;


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

}
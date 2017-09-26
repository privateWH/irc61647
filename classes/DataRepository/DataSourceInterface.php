<?php
/**
 * Created by PhpStorm.
 * User: Weinian He
 * Date: 9/25/17
 * Time: 10:23 PM
 */
namespace DataRepository;

interface DataSourceInterface
{
    public function insert(...$insertParams);
    public function get(...$getParams);
    public function delete(...$deleteParams);
    public function update(...$updateParams);
}
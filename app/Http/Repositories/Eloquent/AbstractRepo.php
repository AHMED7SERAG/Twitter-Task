<?php

namespace App\Http\Repositories\Eloquent;

use App\Http\Repositories\Interfaces\AbstractRepoInterface;
class AbstractRepo implements AbstractRepoInterface
{
    protected $model;

    public function __construct(string $model)
    {
        $this->model = $model;
    }

    public function findOrFail($id)
    {
        return $this->model::findOrFail($id);
    }
    public function findWhereFirst($column, $value)
    {
        return $this->model::where($column, $value)->firstOrFail();
    }
}

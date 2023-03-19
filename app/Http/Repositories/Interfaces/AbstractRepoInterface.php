<?php

namespace App\Http\Repositories\Interfaces;

use App\Http\Requests\PaginateRequest;

interface AbstractRepoInterface
{
    public function findOrFail($id);
    public function findWhereFirst($column,$value);
 

}

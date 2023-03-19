<?php

namespace App\Http\Repositories\Interfaces;

interface  ImageRepoInterface

{
    public function store($request,$image);
    public function destroy($image_id);
    public function deleteAll();
    public function getAllImage();

}

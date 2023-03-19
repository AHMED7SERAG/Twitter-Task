<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Rules\FileNameRule;
use Illuminate\Http\Request;
use App\Models\DocumentImage;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Http\Repositories\Eloquent\ImageRepo;
use Illuminate\Validation\ValidationException;

class ImageUploadController extends Controller
{


    public $repo;
    public function __construct(ImageRepo $repo)
    {
        $this->repo = $repo;
    }
    public function index()
    {
       return view('image');
    }
    public function store(Request $request)
    {
        try {
            $image = $request->file('file');
           return $this->repo->store($request,$image);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }


    public function destroy($image_id)
    {
        try {
            return $this->repo->destroy($image_id);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }

    }
    public function deleteAll()
    {
        try {
            return $this->repo->deleteAll();
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
    public function getAllImage()
    {

        try {
            return $this->repo->getAllImage();
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }

    }
}

<?php

namespace App\Http\Repositories\Eloquent;

use App\Models\Document;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Http\Repositories\Eloquent\AbstractRepo;
use App\Http\Repositories\Interfaces\ImageRepoInterface;
use App\Models\Image;

class ImageRepo extends AbstractRepo implements ImageRepoInterface
{
    public function __construct()
    {
        parent::__construct(Image::class);
    }
    public function store($request, $image)
    {
        $extension = $image->getClientOriginalExtension();
        $url = uniqid() . '.' . $extension;
        $validator = Validator::make($request->all(), [
            'file' => 'required|mimes:jpg,jpeg,png,gif',
        ], [
             'file.mimes' => trans('document.formatMimes'),
            'file.required' =>  trans('document.required')

        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
        $image->move(storage_path('app'.DIRECTORY_SEPARATOR.'public'.DIRECTORY_SEPARATOR.'images'), $url);
        $image = new Image();
        $image->url = $url;
        $image->approved = false;
        $image->save();
        return response()->json(['success'=> __('general.added_successfully')]);
    }

    public function destroy($image_id)
    {
        $image = Image::where('id',$image_id)->first();
        $image->delete();
        $path='public'.DIRECTORY_SEPARATOR.'images'.DIRECTORY_SEPARATOR.$image->url;
        if (Storage::exists($path)) {
            Storage::delete($path);
        }
        $data['imageCount'] = count(Image::get());
        $data['success'] = __('general.deleted_successfully');
        return response()->json($data);
    }
     public function deleteAll()
    {
        $images = Image::get();
        if(count($images) == 0){
        $data['imageCount'] = 0;
        $data['error'] = __('document.ThereNoImage');
        return response()->json($data);
        }
        foreach ($images as $image) {
            $this->destroy($image->id);
        }
        $data['imageCount'] = count (Image::get());
        $data['success'] = __('general.deleted_successfully');
        return response()->json($data);
    }
    public function getAllImage()
    {
        $images = Image::get();

        foreach ($images as $image) {
            $image->image = $image->image;
        }
        $data['image_count'] = count($images);
        $data['images'] = $images;
        return response()->json($data);
    }

}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    protected $fillable = [
        'url',
        'approved',
    ];
    function insertImageIntoDatabase($imageUrl) {
        $image = new Image();
        $image->url = $imageUrl;
        $image->approved = false;
        $image->save();
        return $image->id;
    }

    public function approveImage($imageId)
    {
        $image = Image::find($imageId);
        $image->approved = true;
        $image->save();
    }

    public function getImageAttribute(){
        return asset('storage'.DIRECTORY_SEPARATOR.'images' . DIRECTORY_SEPARATOR .$this->url);
    }
}

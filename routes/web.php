<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ImageUploadController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
Route::get('/dashboard', [HomeController::class, 'index'])->name('dashboard');
Route::delete('/image/delete/{image_id}', [ImageUploadController::class, 'destroy'])->name('image.destroy');
Route::post('/imageStore', [ImageUploadController::class, 'store'])->name('image.upload');
Route::get('/images', [ImageUploadController::class, 'getAllImage'])->name('images');
Route::delete('/image/deleteAll', [ImageUploadController::class, 'deleteAll'])->name('.image.deleteAll');
Route::get('/imagesIndex', [ImageUploadController::class,'index'])->name('images.index');
Route::get('/login', function () {
    return view('login');
});

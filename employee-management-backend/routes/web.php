<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\API\DepartmentController;
use App\Middleware\HandleCors;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return view('admin.dashboard');
})->name('admin.dashboard');

// Route::group(['prefix'=>'admin','as'=>'admin.'],function(){
//     Route::group(['prefix'=>'employees','as'=>'employees.'],function(){
//         // Route::
//     });
// });

// Route::get('/logout')
Route::get('login',[AuthenticationController::class,'login'])->name('login');
Route::post('postLogin',[AuthenticationController::class,'postLogin'])->name('postLogin');
Route::get('logout',[AuthenticationController::class,'logout'])->name('logout');
require __DIR__ . '/api.php';
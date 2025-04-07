<?php

use App\Http\Controllers\API\PositionController;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\API\DepartmentController;
use App\Middleware\HandleCors;
use Illuminate\Support\Facades\Route;

// Route::prefix('api')->middleware('cors')->group(function () {
//     Route::get('/departments', [DepartmentController::class, 'index']);
//     Route::post('/departments', [DepartmentController::class, 'store']);
// });
Route::prefix('api')->middleware('cors')->group(function () {
    Route::apiResource('departments', DepartmentController::class);
    Route::apiResource('positions', PositionController::class);
    Route::post('/positions/import', [PositionController::class, 'import']);
});
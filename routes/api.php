<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/create_user',[UserController::class, 'insert'])->name('create_user');
Route::get('/get_userslist',[UserController::class, 'display']);
Route::post('/delete_user',[UserController::class, 'delete_user']);
Route::get('/edit_user/{id}',[UserController::class, 'edit_user']);
Route::post('/update_user',[UserController::class, 'update_user']);

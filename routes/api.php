<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


//test router
Route::post('/signIn', 'Api\UserController@login');
Route::post('/register', 'Api\UserController@register');

Route::group(["middleware" => ['api-auth']], function ($router) {
    $router->post('switchLike','Api\ItemsController@switchLike');
});


Route::fallback('Api\NotFoundController@notFound')->name('fallback');

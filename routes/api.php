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

    //Categories
    $router->post('getItemsCategories', 'Api\CategoriesController@getItemsCategories');
    $router->post('getItemsFromCategory', 'Api\CategoriesController@getItemsFromCategory');


    // Items
    $router->post('switchLike', 'Api\ItemsController@switchLike');
    $router->post('getLikedItems', 'Api\ItemsController@getLikedItems');


    // Users
    $router->post('followUser', 'Api\UserController@followUser');
    $router->post('unfollowUser', 'Api\UserController@unfollowUser');
    $router->post('getProfile', 'Api\UserController@getProfile');
    $router->post('getFollowingUsers', 'Api\UserController@getFollowingUsers');
    $router->post('getFollowersUsers', 'Api\UserController@getFollowersUsers');
    $router->post('profileUpdate', 'Api\UserController@profileUpdate');

});


Route::fallback('Api\NotFoundController@notFound')->name('fallback');

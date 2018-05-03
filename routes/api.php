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
Route::post('/registerDesigner', 'Api\UserController@registerDesigner');
// Sizes
Route::post('/getSizes', 'Api\HomeController@getSizes');
// Colors
Route::post('/getColors', 'Api\ColorController@getColors');
// Countries
Route::post('/getCountries', 'Api\HomeController@getCountries');

Route::group(["middleware" => ['api-auth']], function ($router) {


    // Home
    $router->post('/home', 'Api\HomeController@home');
    $router->post('/trending', 'Api\HomeController@trending');

    // Search
    $router->post('/search', 'Api\HomeController@search');
    // Brands
    $router->post('/getBrands', 'Api\ItemsController@getBrands');
    //filters
    $router->post('/filter', 'Api\HomeController@filter');


    // Collection
    $router->post('createCollection', 'Api\CollectionController@createCollection');
    $router->post('getCollections', 'Api\CollectionController@getCollections');
    $router->post('deleteCollection', 'Api\CollectionController@deleteCollection');
    $router->post('addItemToCollection', 'Api\CollectionController@addItemToCollection');
    $router->post('addSetToCollection', 'Api\CollectionController@addSetToCollection');
    $router->post('editCollection', 'Api\CollectionController@editCollection');
    // Collection >> comments
    $router->post('addCommentToCollection', 'Api\CollectionController@addCommentToCollection');
    $router->post('getCollectionComments', 'Api\CollectionController@getCollectionComments');
    $router->post('deleteCollectionComment', 'Api\CollectionController@deleteCollectionComment');

    // Sets
    $router->post('setDetails', 'Api\SetsController@setDetails');
    $router->post('addCommentToSet', 'Api\SetsController@addCommentToSet');
    $router->post('getSetComments', 'Api\SetsController@getSetComments');
    $router->post('getLikedSets', 'Api\SetsController@getLikedSets');
    $router->post('addSet', 'Api\SetsController@addSet');
    $router->post('deleteComment', 'Api\SetsController@deleteComment');
    $router->post('deleteSet', 'Api\SetsController@deleteSet');
    $router->post('getSets', 'Api\SetsController@getSets');
    $router->post('editSet', 'Api\SetsController@editSet');

    //Categories
    $router->post('getItemsFromCategory', 'Api\CategoriesController@getItemsFromCategory');
    $router->post('getItemsCategories', 'Api\CategoriesController@getItemsCategories');

    // Items
    $router->post('switchLike', 'Api\ItemsController@switchLike');
    $router->post('getLikedItems', 'Api\ItemsController@getLikedItems');
    $router->post('/itemDetails', 'Api\ItemsController@itemDetails');


    //Contests
    $router->post('getContests', 'Api\ContestController@getContests');
    $router->post('getContestPhotos', 'Api\ContestController@getContestPhotos');
    $router->post('publishContestPhoto', 'Api\ContestController@publishContestPhoto');

    // Contests >> comments
    $router->post('addCommentToContest', 'Api\ContestController@addCommentToContest');
    $router->post('getContestComments', 'Api\ContestController@getContestComments');
    $router->post('deleteContestComment', 'Api\ContestController@deleteContestComment');


    // Users
    $router->post('followUser', 'Api\UserController@followUser');
    $router->post('unfollowUser', 'Api\UserController@unfollowUser');
    $router->post('getProfile', 'Api\UserController@getProfile');
    $router->post('getFollowingUsers', 'Api\UserController@getFollowingUsers');
    $router->post('getFollowersUsers', 'Api\UserController@getFollowersUsers');
    $router->post('profileUpdate', 'Api\UserController@profileUpdate');
    $router->post('blockUser', 'Api\UserController@blockUser');
    $router->post('unblockUser', 'Api\UserController@unblockUser');
    $router->post('listBlocked', 'Api\UserController@listBlocked');

    //Notifications
    $router->post('getNotifications', 'Api\NotificationsController@getNotifications');
    $router->post('setNotificationSeen', 'Api\NotificationsController@setNotificationSeen');

});

Route::group(["middleware" => ['api-auth:designer']], function ($router) {
    $router->post('/listItems', 'Api\ItemsController@listItems');
    $router->post('/deleteItems', 'Api\ItemsController@deleteItems');
    $router->post('/addItem', 'Api\ItemsController@addItem');
    $router->post('/getEditingItemDetails', 'Api\ItemsController@getEditingItemDetails');
    $router->post('/editItem', 'Api\ItemsController@editItem');
    // Exports
    $router->post('/importFile', 'Api\ExportsController@importFile');
});


Route::get('/designer-register', function () {
    return view('designer-register');
});

Route::group(["middleware" => ['api-auth:designer']], function ($router) {


});
Route::fallback('Api\NotFoundController@notFound')->name('fallback');

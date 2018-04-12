<?php

/**
 * Maps for User objects
 */

namespace Maps\User {

    /**
     * Login Object Maps
     * @param $user
     * @return \stdClass
     */
    function login($user)
    {
        $std = new \stdClass();
        $std->userId = $user->id;
        $std->email = $user->email;
        $std->name = $user->first_name . ' ' . $user->last_name;
        $std->avater = new \stdClass();
        $std->user_type = "USER";
        return $std;
    }

    /**
     * @param $users
     * @return array
     */
    function users($users)
    {
        if (!is_array($users)) {
            $users = [$users];
        }

        $newArray = [];
        foreach ($users as $user) {
            $newUser = new \stdClass();
            $newUser->fname = $user->first_name;
            $newUser->lname = $user->last_name;
            $newUser->username = $user->username;
            $newUser->user_type = "USER";
            $newUser->following_counter = $user->following()->count();
            $newUser->follower_counter = $user->follower()->count();
            $newUser->is_followed = $user->follower()->where('following_id', fauth()->user()->id)->count() ? true : false;
            $newUser->photo = null;
            if ($newUser->photo) {
                $newUser->photo = new \stdClass();
                $newUser->table_id = $user->photo->id;
                $newUser->photo_name = uploads_url($user->photo->path);
            }
            $newUser->photo = $newUser->photo ? $newUser->photo : null;
            $newArray[] = $newUser;
        }
        return $newArray;
    }

}

namespace Maps\Category {

    /**
     * @param $categories
     * @return \stdClass
     */
    function categories($categories)
    {
        $newCategories = new \stdClass();

        foreach ($categories as $category) {
            $object = $newCategories->{$category->name} = new \stdClass();

            $object->id = $category->id;
            $object->title = $category->name;
            $object->image = $category->image ? $category->image->path : null;
            $object->subcategories = [];
            foreach ($category->categories as $subCategory) {
                $subObject = new \stdClass();
                $subObject->id = $subCategory->id;
                $subObject->title = $subCategory->name;
                $subObject->image = $subCategory->image ? $subCategory->image->path : null;
                $object->subcategories[] = $subObject;
            }
        }
        return $newCategories;
    }
}


namespace Maps\Item {

    use Dot\Colors\Models\Color;

    function items($items)
    {
        // {"id":404,"title_en":"test","price":"0.00","currency":"USD","text_en":"","url_en":"","brand":"","likes":0
        //,"categories_id":9,"color_id":0,"is_liked":false,"user_currency":"EUR","photos":[],"color":null}

        $newItems = [];
        foreach ($items as $item) {
            $newItem = new \stdClass();
            $newItem->id = $item->id;
            $newItem->title_en = $item->title;
            $newItem->price = $item->price;
            $newItem->currency = $item->currency;
            $newItem->text_en = $item->content;
            $newItem->url_en = $item->url;
            $newItem->brand = $item->brand ? $item->brand->title : "";
            $newItem->likes = $item->likes()->count();
            $newItem->is_liked = $item->likes()->where('id', fauth()->user()->id)->count() ? true : false;
            $newItem->user_currency = $item->user->currency? $item->user->currency:"";
            $newItem->color_id = $item->color_id;
            $newItem->color = ($color = Color::find($item->color_id)) ? $color->value : null;
            $newItem->photo = [];
            if ($item->image) {
                $photo = new \stdClass();
                $photo->table_id = $item->image->id;
                $photo->photo_name = uploads_url($item->image->path);
                $newItem->photo[] = $photo;
            }
            $newItems[]=$newItem;
        }
        return $newItems;
    }
}
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
        $std->user_type = $user->role_id == 2 ? "RETAILER" : "USER";
        return $std;
    }

    /**
     * @param $users
     * @return array
     */
    function users($users)
    {
        if ((!is_array($users))&&!($users instanceof \Illuminate\Support\Collection)) {
            $users = [$users];
        }

        $newArray = [];
        foreach ($users as $user) {
            $newUser = new \stdClass();
            $newUser->id = $user->id;
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

    /**
     * @param $user
     * @return \stdClass
     */
    function user($user)
    {
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
        return $newUser;
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

    /**
     * @param $items
     * @return array
     */
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
            $newItem->user_currency = $item->user->currency ? $item->user->currency : "";
            $newItem->color_id = $item->color_id;
            $newItem->color = ($color = Color::find($item->color_id)) ? $color->value : null;
            $newItem->photo = [];
            if ($item->image) {
                $photo = new \stdClass();
                $photo->table_id = $item->image->id;
                $photo->photo_name = uploads_url($item->image->path);
                $newItem->photo[] = $photo;
            }
            $newItems[] = $newItem;
        }
        return $newItems;
    }

    /**
     * @param $item
     * @return mixed
     */
    function itemDetails($item, $similarItems)
    {
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
        $newItem->user_currency = $item->user->currency ? $item->user->currency : "";
        $newItem->color_id = $item->color_id;
        $newItem->color = ($color = Color::find($item->color_id)) ? $color->value : null;
        $newItem->photo = [];
        $newItem->similar = \Maps\Item\items($similarItems);
        if ($item->image) {
            $photo = new \stdClass();
            $photo->table_id = $item->image->id;
            $photo->photo_name = uploads_url($item->image->path);
            $newItem->photo[] = $photo;
        }
        return $newItem;
    }
}

namespace Maps\Set {

    /**
     * @param $set
     * @param bool $withItem
     * @return \stdClass
     */
    function setDetails($set, $withItem = false)
    {
        $newSet = new \stdClass();
        $newSet->id = $set->id;
        $newSet->user_id = $set->user_id;
        $newSet->title_en = $set->title;
        $newSet->likes = $newSet->likes_counter = $set->likes()->count();
        $newSet->created = $set->created_at->diffForHumans();
        $newSet->contest_id = null;
        $newSet->is_liked = $set->likes()->where('id', fauth()->user()->id)->count() ? true : false;
        $newSet->comments_counter = $set->comments()->count();
        $newSet->group = [];
        $newSet->photo = null;
        if ($set->image) {
            $photo = new \stdClass();
            $photo->table_id = $set->image->id;
            $photo->photo_name = uploads_url($set->image->path);
            $newSet->photo = $photo;
        }
        $newSet->user = \Maps\User\user($set->user);
        if ($withItem) {
            $newSet->items = \Maps\Set\items($set->items, $set->id);
            $newSet->contest = null;
        }
        return $newSet;
    }

    /**
     * @param $comments
     * @return array
     */
    function comments($comments)
    {
        $newComments = [];
        foreach ($comments as $comment) {
            $newComment = new \stdClass();
            $newComment->id = $comment->id;
            $newComment->text_en = $comment->comment;
            $newComment->from_id = $comment->user_id;
            $newComment->procitano = 0;
            $newComment->created = $comment->created_at->diffForHumans();
            $newComment->user = \Maps\User\user($comment->user);

            $newComments[] = $newComment;
        }
        return $newComments;
    }

    /**
     * @param $items
     * @param $set_id
     * @return array
     */
    function items($items, $set_id)
    {
        $newItems = [];
        foreach ($items as $item) {
            $newItem = new \stdClass();
            $newItem->id = $item->id;
            $newItem->title_en = $item->title;
            $newItem->price = $item->price;
            $newItem->currency = $item->currency;
            $newItem->is_liked = $item->likes()->where('id', fauth()->user()->id)->count() ? true : false;
            $newItem->user_currency = $item->user->currency ? $item->user->currency : "";
            $newItem->photos = [];

            if ($item->image) {
                $photo = new \stdClass();
                $photo->table_id = $item->image->id;
                $photo->photo_name = uploads_url($item->image->path);
                $newItem->photo[] = $photo;
            }
            $newItem->pivot = new \stdClass();
            $newItem->pivot->set_id = $set_id;
            $newItem->pivot->items_id = $item->id;
            $newItems[] = $newItem;
        }
        return $newItems;
    }

    /**
     * @param $sets
     * @return array
     */
    function sets($sets)
    {
        $newSets = [];
        foreach ($sets as $set) {
            $newSets[] = setDetails($set);
        }
        return $newSets;
    }
}


namespace Maps\Collection {


    use Dot\Colors\Models\Color;

    /**
     * @param $items
     * @return array
     */
    function items($items)
    {
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
            $newItem->is_liked = $item->likes()->where('id', fauth()->user()->id)->count() ? true : false;
            $newItem->user_currency = $item->user->currency ? $item->user->currency : "";
            $newItem->photo = [];
            if ($item->image) {
                $photo = new \stdClass();
                $photo->table_id = $item->image->id;
                $photo->photo_name = uploads_url($item->image->path);
                $newItem->photo[] = $photo;
            }
            $newItems[] = $newItem;
        }
        return $newItems;
    }

    /**
     * @param $collection
     * @return \stdClass
     */
    function collection($collection)
    {
        $newCollection = new \stdClass();
        $newCollection->id = $collection->id;
        $newCollection->user_id = $collection->user_id;
        $newCollection->title_en = $collection->title;
        $newCollection->text_en = $collection->excerpt;
        $newCollection->created = $collection->created_at->diffForHumans();
        $newCollection->items = \Maps\Collection\items($collection->items);
        $newCollection->user = \Maps\User\user($collection->user);
        $newCollection->sets = \Maps\Set\sets($collection->sets);
        return $newCollection;
    }

    /**
     * @param $collections
     * @return array
     */
    function collections($collections)
    {

        $newArray = [];
        foreach ($collections as $collection) {
            $newArray[] = \Maps\Collection\collection($collection);
        }
        return $newArray;
    }

}
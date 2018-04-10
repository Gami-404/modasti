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

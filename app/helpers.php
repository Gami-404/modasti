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

}


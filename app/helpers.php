<?php

/**
 * Maps for User objects
 */

namespace Maps\User {

    function login($user)
    {
        $std=new \stdClass();
        $std->userId=$user->id;
        $std->email=$user->email;
        $std->name=$user->first_name.' '.$user->last_name;
        $std->avater=new \stdClass();


//        $std

//        "userId": "202",
//    "email": "abdo.gamy2010@gmail.com",
//    "name": "abdo ",
//    "user_type": "USER",
//    "avatar": {}


    }

}


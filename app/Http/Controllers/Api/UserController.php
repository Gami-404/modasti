<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Validator;

class UserController extends Controller
{


    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {

        $response = [];
        $response['data'] = [];
        $response['errors'] = [];

        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);
        if ($validator->fails()) {
            $response['errors'] = ($validator->errors()->all());
            return response()->json($response, '400');
        }

        $isAuthed = Auth::once([
            'email' => $request->get('email'),
            'password' => $request->get('password'),
            'backend' => 0,
            'status' => 1
        ]);
        if (!$isAuthed) {
            $response['errors'] = ["User not found."];
            return response()->json($response, '400');
        }
        $response['data'] = \Maps\User\login(Auth::user());
        $response['token'] = Auth::user()->api_token;
        return response()->json($response);
    }


}

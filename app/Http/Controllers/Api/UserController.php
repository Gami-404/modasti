<?php

namespace App\Http\Controllers\Api;

use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{


    /**
     * POST api/login
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


    /**
     * POST /api/register
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    function register(Request $request)
    {
        $response = ['data' => [], 'errors' => []];
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
            'name' => 'required',
        ]);
        if ($validator->fails()) {
            $response['errors'] = ($validator->errors()->all());
            return response()->json($response, '400');
        }
        $user = new User();
        $user->email = $request->get('email');
        $user->password = bcrypt($request->get('password'));
        $names = explode(' ', $request->get('name'));
        $user->first_name = isset($names[0]) ? $names[0] : '';
        $user->last_name = isset($names[1]) ? $names[1] : '';
        $user->username = str_slug($request->get('name'));
        $user->api_token = str_random(60);
        $user->backend = 0;
        $user->save();
        $response['data'] = \Maps\User\login(Auth::user());
        $response['token'] = Auth::user()->api_token;
        return response()->json($response);
    }
}

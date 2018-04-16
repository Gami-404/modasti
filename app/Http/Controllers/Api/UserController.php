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

        $response = ['data' => [], 'errors' => []];

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
    public function register(Request $request)
    {
        $response = ['data' => [], 'errors' => []];
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users,email,[id],id',
            'password' => 'required',
            'name' => 'required',
        ]);
        if ($validator->fails()) {
            $response['errors'] = ($validator->errors()->all());
            return response()->json($response, '400');
        }
        $user = new User();
        $user->username = $request->get('email');
        $user->email = $request->get('email');
        $user->password = bcrypt($request->get('password'));
        $names = explode(' ', $request->get('name'));
        $user->first_name = isset($names[0]) ? $names[0] : '';
        $user->last_name = isset($names[1]) ? $names[1] : '';
        $user->api_token = str_random(60);
        $user->backend = 0;
        $user->status = 1;
        $user->role_id = 3;
        $user->save();
        $response['data'] = \Maps\User\login($user);
        $response['token'] = $user->api_token;
        return response()->json($response);
    }


    /**
     * POST /api/register
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function registerDesigner(Request $request)
    {
        $response = ['data' => [], 'errors' => []];
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users,email,[id],id',
            'password' => 'required',
            'name' => 'required',
        ]);
        if ($validator->fails()) {
            $response['errors'] = ($validator->errors()->all());
            return response()->json($response, '400');
        }
        $user = new User();
        $user->username = $request->get('email');
        $user->email = $request->get('email');
        $user->password = bcrypt($request->get('password'));
        $names = explode(' ', $request->get('name'));
        $user->first_name = isset($names[0]) ? $names[0] : '';
        $user->last_name = isset($names[1]) ? $names[1] : '';
        $user->api_token = str_random(60);
        $user->backend = 0;
        $user->status = 1;
        $user->role_id = 2;
        $user->save();
        $response['data'] = \Maps\User\login($user);
        $response['token'] = $user->api_token;
        return response()->json($response);
    }

    /**
     * POST api/followUser
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function followUser(Request $request)
    {
        $data = ['data' => [], 'errors' => []];
        $id = $request->get('userId');
        if (!User::find($id)) {
            $data['errors'][] = "User not found";
            return response()->json($data, 400);
        }
        (fauth()->user()->following()->detach($id));
        (fauth()->user()->following()->attach($id));
        return response()->json($data);
    }

    /**
     * POST api/unfollowUser
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function unfollowUser(Request $request)
    {
        $data = ['data' => [], 'errors' => []];
        $id = $request->get('userId');
        if (!User::find($id)) {
            $data['errors'][] = "User not found";
            return response()->json($data, 400);
        }
        (fauth()->user()->following()->detach($id));
        return response()->json($data);
    }

    /**
     * POST api/getProfile
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getProfile(Request $request)
    {
        $data = ['data' => [], 'errors' => []];
        $id = $request->get('userId');
        $user = User::find($id);
        if (!$user) {
            $data['errors'][] = "User not found";
            return response()->json($data, 400);
        }
        return response()->json(\Maps\User\users($user));
    }

    /**
     * POST api/getFollowingUsers
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getFollowingUsers(Request $request)
    {
        $data = ['data' => [], 'errors' => []];
        $limit = $request->get('limit', 8);
        $offset = $request->get('offset', 0);
        $user = User::find($request->get('userId', 0));
        if (!$user) {
            $data['errors'][] = "User not found";
            return response()->json($data);
        }

        $followingUsers = $user->following()->take($limit)->offet($offset)->get();
        $data['data']['users'] = \Maps\User\users($followingUsers);
        return response()->json($data);
    }

    /**
     * POST api/getFollowersUsers
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getFollowersUsers(Request $request)
    {
        $data = ['data' => [], 'errors' => []];
        $limit = $request->get('limit', 8);
        $offset = $request->get('offset', 0);
        $user = User::find($request->get('userId', 0));
        if (!$user) {
            $data['errors'][] = "User not found";
            return response()->json($data);
        }

        $followerUsers = $user->follower()->take($limit)->offet($offset)->get();
        $data['data']['users'] = \Maps\User\users($followerUsers);
        return response()->json($data);
    }

    /**
     * POST api/profileUpdate
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function profileUpdate(Request $request)
    {
        $data = ['data' => [], 'errors' => []];
        $user = fauth()->user();
        $validator = Validator::make($request->all(), []);
        $validator->sometimes('lastName', 'required', function () use ($request) {
            return $request->filled('lastName');
        });
        $validator->sometimes('firstName', 'required', function () use ($request) {
            return $request->filled('firstName');
        });
        $validator->sometimes('password', 'required|min:6', function () use ($request) {
            return $request->filled('password') || $request->filled('currentPassword');
        });
        $validator->sometimes('currentPassword', 'required|min:6', function () use ($request) {
            return $request->filled('password') || $request->filled('currentPassword');
        });
        $validator->sometimes('userName', 'required|unique:users,username,[id],id', function () use ($request, $user) {
            return $request->filled('userName') && (trim($request->get('userName')) != trim($user->username));
        });
        $validator->sometimes('email', 'required|email|unique:users,email,[id],id', function () use ($request, $user) {
            return $request->filled('email') && (trim($request->get('email')) != trim($user->email));
        });
        if ($validator->fails()) {
            $data['errors'] = ($validator->errors()->all());
            return response()->json($data, 400);
        }
        if ($request->filled('firstName')) {
            $user->first_name = $request->get('firstName');
        }
        if ($request->filled('lastName')) {
            $user->last_name = $request->get('lastName');
        }
        if ($request->filled('userName')) {
            $user->username = $request->get('userName');
        }
        if ($request->filled('email')) {
            $user->email = $request->get('email');
        }
        if ($request->filled('password')) {
            $user->password = $request->get('password');
        }
        $user->save();
        return response()->json($data);
    }
}

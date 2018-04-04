<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Validator;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ItemsController extends Controller
{
    /**
     * GET api/switchLike
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function switchLike(Request $request)
    {

        $response = ['data' => [], 'errors' => []];
        $validator = Validator::make($request->all(), [
            'objId' => 'required',
            'targetObject' => 'required',
        ]);

        if ($validator->fails()) {
            $response['errors'] = $validator->errors();
            return response()->json($response, 400);
        }

        $user = Auth::user();
        $id = $request->get('objId');
        $type = $request->get('targetObject');
        $table = DB::table('users_posts_like');
        $data = [
            'object_id' => $id,
            'user_id' => $user->id,
            'type' => $type
        ];
        $object = $table->where($data)->get();

        if (count($object)) {
            $table->where($data)->delete();
            $response = ['result' => "Like removed"];
            return response()->json($response, 200);
        }
        $table->insert($data);
        $response = ['result' => "Like added"];
        return response()->json($response, 200);
    }
}

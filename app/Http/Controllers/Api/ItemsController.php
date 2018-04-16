<?php

namespace App\Http\Controllers\Api;

use App\Model\Post;
use App\User;
use Dot\Posts\Posts;
use Illuminate\Support\Facades\DB;
use function Maps\Collection\collection;
use Validator;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ItemsController extends Controller
{


    /**
     * POST api/switchLike
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

        $user = fauth()->user();
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

    /**
     * POST api/getLikedItems
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getLikedItems(Request $request)
    {
        $data = ['data' => [], 'errors' => []];
        $offset = $request->get('offset', 0);
        $limit = $request->get('limit', 6);
        $user = User::where(['id' => $request->get('userId', fauth()->user()->id), 'status' => 1])->first();

        if (!$user) {
            $data['errors'][] = 'User not found';
            return response()->json($data);
        }

        $items = $user->liked_items()->with('image', 'brand', 'user')->take($limit)->offset($offset)->get();
        $data['data'] = \Maps\Item\items($items);
        return response()->json($data);
    }


    /**
     * POST api/itemDetails
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function itemDetails(Request $request)
    {
        $data = ['data' => [], 'errors' => []];
        $validator = Validator::make($request->all(), [
            'itemId' => 'required|exists:posts,id',
        ]);
        if ($validator->fails()) {
            $data['errors'] = ($validator->errors()->all());
            return response()->json($data, 400);
        }

        $item = Post::find($request->get('itemId'));
        $category = $item->categories()->where('parent', '<>', 0)->first();
        $similarItems = collect();
        if ($category) {
            $similarItems = $category->posts()->take(3)->get();
        }
        $data['data'] = \Maps\Item\itemDetails($item, $similarItems);
        return response()->json($data);

    }
}

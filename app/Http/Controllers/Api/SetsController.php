<?php

namespace App\Http\Controllers\Api;

use App\Model\Set;
use App\Model\SetComment;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Validator;

class SetsController extends Controller
{
    /**
     * POST /api/setDetails
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function setDetails(Request $request)
    {
        $data = ['data' => [], 'errors' => []];
        $set = Set::with(['user', 'image', 'items'])->where('id', $request->get("setId"))->first();
        if (!$set) {
            return response()->json($data, 400);
        }
        $data['set'] = \Maps\Set\setDetails($set, true);
        return response()->json($data, 200);
    }


    /**
     * POST api/addCommentToSet
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function addCommentToSet(Request $request)
    {
        $data = ['data' => [], 'errors' => []];
        $validator = Validator::make($request->all(), [
            'text' => 'required',
            'setId' => 'required|exists:sets,id',
            'parentId' => 'required'
        ]);

        $validator->sometimes('required', 'exists:set_comments,id', function () use ($request) {
            return !($request->get('parentId') == "0" && $request->get('parentId') == 0);
        });

        if ($validator->fails()) {
            $data['errors'] = ($validator->errors()->all());
            return response()->json($data, 400);
        }

        SetComment::create([
            'set_id' => $request->get('setId'),
            'parent' => $request->get('parentId'),
            'comment' => $request->get('text'),
            'user_id' => fauth()->user()->id
        ]);
        return response()->json($data, 400);
    }

    /**
     * POST /api/getSetComments
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSetComments(Request $request)
    {
        $offset = $request->get('offset', 0);
        $limit = $request->get('limit', 4);
        $data = ['data' => [], 'errors' => []];
        $set_id = $request->get('setId');
        if (!Set::find($set_id)) {
            $data['errors'] = "Set not found";
            return response()->json($data, 400);
        }

        $comments = SetComment::with('user')->where(['set_id' => $set_id, 'parent' => 0])->offset($offset)->limit($limit)->get();
        $data['data']['comments'] = \Maps\Set\comments($comments);
        return response()->json($data);
    }

    /**
     * POST api/getLikedSets
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getLikedSets(Request $request)
    {
        $data = ['data' => [], 'errors' => []];
        $offset = $request->get('offset', 0);
        $limit = $request->get('limit', 6);
        $user = User::where(['id' => $request->get('userId', fauth()->user()->id), 'status' => 1])->first();

        if (!$user) {
            $data['errors'][] = 'User not found';
            return response()->json($data, 400);
        }

        $sets = $user->liked_sets()->with('image', 'user')->take($limit)->offset($offset)->get();
        $data['data'] = \Maps\Set\sets($sets);
        return response()->json($data);
    }

    /**
     * POST api/deleteSet
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteSet(Request $request)
    {
        $data = ['data' => [], 'errors' => []];
        $set = Set::where([
            'id' => $request->get('setId'),
            'user_id' => fauth()->user()->id
        ])->first();

        if (!$set) {
            $data['errors'][] = 'Set not found';
            return response()->json($data, 400);
        }
        $set->likes()->detach();
        $set->items()->detach();
        $set->delete();
        SetComment::where('set_id', $set->id)->delete();
        return response()->json($data);
    }
}

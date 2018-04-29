<?php

namespace App\Http\Controllers\Api;

use App\Model\Contest;
use App\Model\ContestItem;
use App\Model\Media;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Validator;

class ContestController extends Controller
{
    /**
     * POST api/getContests
     * @return \Illuminate\Http\JsonResponse
     */
    public function getContests(Request $request)
    {
        $offset = $request->get('offset', 0);
        $limit = $request->get('limit', 8);

        $contests = Contest::with('image')->where(['status' => 1])
            ->take($limit)
            ->offset($offset)
            ->get();
        $contests = \Maps\Contest\contests($contests);
        return response()->json($contests);
    }

    /**
     * POST api/getContestPhotos
     * @return \Illuminate\Http\JsonResponse
     */
    public function getContestPhotos(Request $request)
    {
        $data = ['data' => [], 'errors' => []];
        $offset = $request->get('offset', 0);
        $limit = $request->get('limit', 8);
        $validator = Validator::make($request->all(), [
            'contestId' => 'required|exists:contests,id'
        ]);
        if ($validator->fails()) {
            $data['errors'] = ($validator->errors()->all());
            return response()->json($data, 400);
        }
        $contestItems = ContestItem::with('image', 'user')
            ->where(['contest_id' => $request->get('contestId')])->take($limit)->offset($offset)->get();

        $contestItems = \Maps\Contest\items($contestItems);
        return response()->json($contestItems);
    }

    /**
     * POST api/publishContestPhoto
     * @return \Illuminate\Http\JsonResponse
     */
    public function publishContestPhoto(Request $request)
    {
        $data = ['data' => [], 'errors' => []];
        $validator = Validator::make($request->all(), [
            'contestId' => 'required|exists:contests,id',
            'imageName' => 'required',
            'image' => 'required'
        ]);
        $media = new Media();
        if ($validator->fails() && ($request->filled('image') && !$media->isBase64($request->get('image')))) {
            $data['errors'] = ($validator->errors()->all());
            return response()->json($data, 400);
        }

        // User Must has one Item in contest >> check this
        $isExist = ContestItem::where(['user_id' => fauth()->id(), 'contest_id' => $request->get('contestId')])->count() ? true : false;
        if ($isExist) {
            $data['errors'] = ['You has already item in this contest'];
            return response()->json($data, 400);
        }

        $media = $media->saveContent(explode('base64,', $request->get('image'))[1]);
        $item = ContestItem::create([
            'image_id' => $media->id,
            'title' => $request->get('imageName'),
            'user_id' => fauth()->id(),
            'contest_id' => $request->get('contestId')
        ]);
        $data['data'] = $item;
        return response()->json($data);
    }
}

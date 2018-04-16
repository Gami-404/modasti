<?php

namespace App\Http\Controllers\Api;

use App\Model\Collection;
use App\Model\Media;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Validator;

class CollectionController extends Controller
{
    /**
     * POST api/createCollection
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createCollection(Request $request)
    {
        $data = ['data' => [], 'errors' => []];
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'description' => 'required',
        ]);

        $validator->sometimes('image', 'required', function () use ($request) {
            return $request->filled('image');
        });

        $media = new Media();

        if ($validator->fails() && ($request->filled('image') && !$media->isBase64($request->get('image')))) {
            $data['errors'] = ($validator->errors()->all());
            return response()->json($data, 400);
        }
        $media = $media->saveContent(explode('base64,',$request->get('image'))[1]);

        $collection = Collection::create([
            'title' => $request->get('title'),
            'excerpt' => $request->get('description'),
            'image_id' => isset($media->id) ? $media->id : 0,
            'lang'=>'en'
        ]);
        $data['data']['collection_id'] = $collection->id;
        return response()->json($data);
    }
}

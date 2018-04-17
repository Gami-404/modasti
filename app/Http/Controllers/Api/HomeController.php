<?php

namespace App\Http\Controllers\Api;

use Dot\Posts\Models\PostSize;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class HomeController extends Controller
{
    //

    /**
     * POST api/getSizes
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSizes(Request $request)
    {
        $data = ['data' => [], 'errors' => []];
        $data['data'] = PostSize::groupBy('size')->get(['size'])->pluck("size")->toArray();
        return response()->json($data);
    }
}

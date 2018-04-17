<?php

namespace App\Http\Controllers\Api;

use Dot\I18n\Models\Place;
use Dot\Posts\Models\PostSize;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class HomeController extends Controller
{
    //

    /**
     * POST api/getCountries
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCountries(Request $request)
    {
        $data = ['data' => [], 'errors' => []];
        $places = Place::all();
        $newPlaces = [];

        foreach ($places as $place) {
            $newPlaces[] = [
                'id' => $place->id,
                'title_en' => $place->name->en,
                'currency' => $place->currency->en,
            ];
        }
        $data['data'] = $newPlaces;
        return response()->json($data);
    }

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

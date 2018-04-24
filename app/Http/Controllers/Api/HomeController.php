<?php

namespace App\Http\Controllers\Api;

use App\Model\Collection;
use App\Model\Post;
use App\Model\Set;
use App\User;
use Dot\I18n\Models\Place;
use Dot\Posts\Models\PostSize;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Validator;

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


    /**
     * POST api/search
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function search(Request $request)
    {
        $data = ['data' => [], 'errors' => []];
        $offset = $request->get('offset', 0);
        $limit = $request->get('limit', 8);
        $for = $request->get('searchArea', "items");
        $validator = Validator::make($request->all(), [
            'searchString' => 'required',
            'searchArea' => 'required|in:items,sets,users,collections',
        ]);
        if ($validator->fails()) {
            $data['errors'] = ($validator->errors()->all());
            return response()->json($data, 400);
        }
        $classes = [
            "items" => Post::class,
            "sets" => Set::class,
            "users" => User::class,
            "collections" => Collection::class,
        ];
        $maps = [
            "users" => '\Maps\User\users',
            "sets" => '\Maps\Set\sets',
            "items" => '\Maps\Item\items',
            "collections" => '\Maps\Collection\collections',
        ];
        $class = $classes[$for];

        $objects = $class::search($request->get('searchString'))->take($limit)->offset($offset)->get();
        $data['data'] = $maps[$for]($objects);
        return response()->json($data);
    }


    /**
     * POST api/filter
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function filter(Request $request)
    {
        $data = ['data' => [], 'errors' => []];
        $offset = $request->get('offset', 0);
        $limit = $request->get('limit', 8);


        $validator = Validator::make($request->all(), [
            'orderby' => 'required|in:id,price,title,created_at,updated_at',
            'order' => 'required|in:desc,asc',
        ]);
        if ($validator->fails()) {
            $data['errors'] = ($validator->errors()->all());
            return response()->json($data, 400);
        }

        $query = Post::with('image');

        if ($request->filled('brands')) {
            $query->whereHas('brand', function ($query) use ($request) {
                $query->whereIn('id', $request->get('brands', []));
            });
        }
        if ($request->filled('colors')) {
            $query->whereIn('color_id', $request->get('colors', []));
        }

        if ($request->filled('sizes')) {
            $query->whereHas('sizes', function ($query) use ($request) {
                $query->whereIn('size', $request->get('sizes'));
            });
        }
        if ($request->filled('categoryId')) {
            $query->whereHas('categories', function ($query) use ($request) {
                $query->where('category_id', $request->get('categoryId'));
            });
        }
        $items = $query->orderBy($request->get('orderby', 'created_at'), $request->get('order', 'ASC'))
            ->take($limit)
            ->offset($offset)
            ->get();

        $data['data'] = \Maps\Item\items($items);
        return response()->json($data);
    }

    /**
     * POST api/home
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function home(Request $request)
    {
        $data = ['data' => [], 'errors' => []];
        $items_most_popular = Post::with('image')->confirmed()->orderBy('likes', 'desc')->take(8)->get();
        $data['items_most_popular'] = \Maps\Item\items($items_most_popular);

        $sets_best_from_community = Set::with('image')->orderBy('views', 'desc')->take(8)->get();
        $data['sets_best_from_community'] = \Maps\Set\sets($sets_best_from_community);


    }

}

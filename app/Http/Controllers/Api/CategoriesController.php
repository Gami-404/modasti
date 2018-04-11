<?php

namespace App\Http\Controllers\Api;

use App\Model\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CategoriesController extends Controller
{
    /**
     * POST api/getItemsCategories
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getItemsCategories(Request $request)
    {
        $data = ['data' => [], 'errors' => []];
        $categories = Category::with('categories', 'image')->where('parent', 0)->get();
        $data['data'] = \Maps\Category\categories($categories);
        return response()->json($data);
    }

    /**
     * POST api/getItemsFromCategory
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getItemsFromCategory(Request $request)
    {
        $data = ['data' => [], 'errors' => []];

        $category = Category::with('categories', 'image')->where('id', $request->get('id'))->first();
        if (!$category) {
            $data['errors'][] = 'Category not found';
            return response()->json($data);
        }


    }
}
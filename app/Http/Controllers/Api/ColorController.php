<?php

namespace App\Http\Controllers\Api;

use App\Model\Color;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ColorController extends Controller
{

    /**
     * POST api/getColors
     * @return \Illuminate\Http\JsonResponse
     */
    public function getColors()
    {
        return response()->json(['errors' => [], 'data' => Color::all()]);
    }

    /**
     *
     */
}

<?php

namespace App\Http\Controllers\Api;

use App\Model\Media;
use App\Model\Post;
use App\User;
use Dot\Colors\Models\Color;
use Dot\Posts\Models\PostSize;
use Illuminate\Support\Facades\DB;
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

    /**
     * POST api/listItems
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function listItems(Request $request)
    {
        $offset = $request->get('offset', 0);
        $limit = $request->get('limit', 8);
        $items = Post::with('image', 'brand', 'categories')
            ->where('user_id', fauth()->id())
            ->offset($offset)
            ->take($limit)
            ->get();
        return response()->json(['errors' => [], 'data' => $items]);
    }

    /**
     * POST api/addItem
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function addItem(Request $request)
    {
        $data = ['data' => [], 'errors' => []];
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'description' => 'required',
            'color' => 'required|exists:colors,id',
            'category' => 'required|exists:categories,id',
            'brand' => 'required',
            'shop_url' => 'required|url',
            'price' => 'required|numeric',
            'sale_price' => 'required|numeric',
            'size' => 'required',
            'coverage' => 'required|in:1,2,3,4',
            'sizeSystem' => 'required|in:eu,uk,us',
            'image' => 'required',

        ]);
        $media = new Media();
        if ($validator->fails() && ($request->filled('image') && !$media->isBase64($request->get('image')))) {
            $data['errors'] = ($validator->errors()->all());
            return response()->json($data, 400);
        }

        $media = $media->saveContent(explode('base64,', $request->get('image'))[1]);
        $post = new Post();
        $post->title = $request->get('title');
        $post->content = $request->get('description');
        $post->excerpt = $request->get('description');
        $post->color_id = $request->get('color');
        $post->brand_id = getBrandId($request->get('brand'));
        $post->url = ($request->get('shop_url'));
        $post->price = ($request->get('price'));
        $post->sale_price = ($request->get('sale_price'));
        $post->coverage = ($request->get('coverage'));
        $post->size_system = ($request->get('sizeSystem'));
        $post->image_id = $media->id;
        $post->save();
        $post->categories()->attach($request->get('category'));

        $sizes_fields = explode(',', $request->get("size", ''));
        foreach ($sizes_fields as $value) {
            $meta = new PostSize();
            $meta->size = $value;
            $post->sizes()->save($meta);
        }
        return response()->json($data, 200);
    }

    /**
     * POST api/deleteItems
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteItems(Request $request)
    {
        $data = ['data' => [], 'errors' => []];
        $itemId = $request->get('itemId');
        $item = Post::where(['id' => $itemId, 'user_id' => fauth()->id()])->first();
        if (!$item) {
            $data['errors'][] = "Items not found";
            return response()->json($data, 400);
        }
        DB::table('posts_blocks')->where(['post_id' => $itemId])->delete();
        DB::table('posts_blocks_orders')->where(['post_id' => $itemId])->delete();
        DB::table('posts_categories_orders')->where(['post_id' => $itemId])->delete();
        DB::table('posts_sizes')->where(['post_id' => $itemId])->delete();
        DB::table('users_posts_like')->where(['object_id' => $itemId])->delete();
        DB::table('collections_posts')->where(['post_id' => $itemId])->delete();
        $item->delete();
        return response()->json($data, 400);
    }


    /**
     * POST api/getEditingItemDetails
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getEditingItemDetails(Request $request)
    {
        $data = ['data' => [], 'errors' => []];
        $validator = Validator::make($request->all(), [
            'itemId' => 'required|exists:posts,id',
        ]);
        if ($validator->fails()) {
            $data['errors'] = ($validator->errors()->all());
            return response()->json($data, 400);
        }
        $post = Post::find($request->get('itemId'));
        $category = $post->categories()->where('parent', '<>', 0)->first();
        $data['data'] = [
            'title' => $post->title,
            'description' => $post->title,
            'color' => ($color = Color::find($post->color_id)) ? $color->value : null,
            'brand' => $post->brand_id,
            'price' => $post->price,
            'sale_price' => $post->sale_price,
            'coverage' => $post->coverage,
            'sizeSystem' => $post->size_system,
            'category' => $category ? $category->id : 0,
            'image' => $post->image ? uploads_url($post->image->path) : '',
            'sizes' => implode(",", $post->sizes->pluck("size")->toArray())
        ];
        return response()->json($data);
    }
}

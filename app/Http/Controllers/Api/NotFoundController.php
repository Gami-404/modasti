<?php

namespace App\Http\Controllers\Api;

use GuzzleHttp\Exception\ClientException;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class NotFoundController extends Controller
{

    /**
     * @param Request $request
     * @return \Psr\Http\Message\StreamInterface
     */
    public function notFound(Request $request)
    {

        $client = new \GuzzleHttp\Client();
        $path = $request->path();
        $res = null;
        try {
            $res = $client->request($request->getMethod(), 'http://stage-api.modasti.net/' . $path, [
                'headers' => $this->getHeaders($request),
                'json' => ($request->all()),
            ]);
        } catch (ClientException $e) {
            return response($e->getResponse()->getBody()->getContents());
        }

        return response()->json(json_decode($res->getBody()));
    }


    /***
     * @param Request $request
     * @return array
     */
    private function getHeaders(Request $request)
    {
        $new = [
            'User-Agent' => 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
            'Content-Type' => 'application/json',
        ];
        if ($request->header('authorization', false)) {
            $new['Authorization'] = $request->header('authorization');
        }
        return $new;
    }
}

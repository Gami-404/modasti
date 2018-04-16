<?php

namespace App\Model;

use Dot\Posts\Models\Collection as Model;

class Collection extends Model
{
    protected $fillable=['title','excerpt','image_id','lang'];
}

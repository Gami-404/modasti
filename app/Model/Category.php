<?php

namespace App\Model;

use Dot\Categories\Models\Category as Model;
use Dot\Posts\Models\Post;

class Category extends Model
{

    /**
     * Items relation
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    function items()
    {
        return $this->belongsToMany(Post::class, "posts_categories", "category_id",'post_id');
    }
}

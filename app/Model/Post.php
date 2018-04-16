<?php

namespace App\Model;

use App\User;
use Dot\Posts\Models\Post as Model;

class Post extends Model
{
    /**
     * User relation
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function user()
    {
        return $this->hasOne(User::class, "id", "user_id");
    }

}

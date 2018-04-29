<?php

namespace App\Model;

use Dot\Posts\Models\Contest as Model;

class Contest extends Model
{

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates=[
        'published_at',
        'expired_at'
    ];

    /**
     * Winner items
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function winner(){
        return $this->belongsTo(ContestItem::class,'winner_id','id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function items(){
        return $this->hasMany(ContestItem::class,'contest_id','id');
    }
}

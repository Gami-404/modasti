<?php

namespace App\Events;

use App\Model\Contest;
use Illuminate\Queue\SerializesModels;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;

class ContestEvents
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public $contest = null;
    public $winner = null;

    public function __construct(Contest $contest, $winner)
    {
        $this->contest = $contest;
        $this->winner = $winner;
    }
}

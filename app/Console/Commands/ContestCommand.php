<?php

namespace App\Console\Commands;

use App\Model\Contest;
use Carbon\Carbon;
use Illuminate\Console\Command;

class ContestCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'contest:winner';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Contest Winner';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $contests = Contest::where('winner_id', 0)->where('expired_at', '<=', Carbon::now())->get();
        foreach ($contests as $contest) {
            $item = $contest->items()->orderBy('likes', 'DESC')->first();
            if ($item) {
                $contest->winner_id = $item->id;
            }
            $contest->winner_id = -1;
            $contest->save();
        }
    }
}

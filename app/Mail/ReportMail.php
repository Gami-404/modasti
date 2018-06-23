<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ReportMail extends Mailable
{
    use Queueable, SerializesModels;

    public $mesg = '';
    public $user = null;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user, $mesg)
    {
        //
        $this->user = $user;
        $this->mesg = $mesg;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('no-reply@modasti.com')->view('emails.report', ['mesg' => $this->mesg, 'user' => $this->user]);
    }
}

<?php

namespace App\Listeners;

use Statamic\Events\GlobalSetSaved;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class FontUpdateListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(GlobalSetSaved $event): void
    {
        if ($event->globals->handle() === 'theme_settings') {
            Artisan::call('theme:extract-font');
        }
    }
}

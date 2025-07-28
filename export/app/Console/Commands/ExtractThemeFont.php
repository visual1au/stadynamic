<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;

class ExtractThemeFont extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'theme:extract-font';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Extracts the font from the theme settings';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $process = new Process(
            [
                'node',
                base_path('scripts/extract-theme-font.js')
            ]
        );

        $process->run();
    }
}

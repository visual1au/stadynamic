<?php

namespace App\Providers;

use Statamic\Facades\Form;
use Statamic\Facades\Fieldset;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        foreach (Form::all() as $form) {
            Form::redirect($form->handle, function ($submission) {
                return 'success';
            });
        }
    }
}

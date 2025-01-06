<?php

namespace App\Providers;

use Statamic\Facades\Form;
use Statamic\Facades\Fieldset;
use Statamic\Events\GlobalSetSaved;
use Illuminate\Support\Facades\Event;
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
        // Listen for when a GlobalSet is saved
        Event::listen(GlobalSetSaved::class, function ($event) {
            if ($event->globals->handle() === 'theme_settings') {
                $this->updateColourPickerFieldset($event->globals);
            }
        });

        Form::redirect('contact', function ($submission) {
            return 'success';
        });
    }

    protected function updateColourPickerFieldset($themeSettings)
    {
        // Get the colors from the saved global set
        $colours = $themeSettings->in('default')->data()['colours'] ?? [];

        $swatches = collect($colours)
            ->where('enabled', true)
            ->pluck('color')
            ->toArray();

        if (! empty($swatches)) {
            // Find the fieldset
            $fieldset = Fieldset::find('colour_picker');

            if ($fieldset) {
                $contents = $fieldset->contents();

                // Add or update the colour field with swatches
                $contents['fields'] = array_map(function ($field) use ($swatches) {
                    if ($field['handle'] === 'colour') {
                        $field['field']['swatches'] = $swatches;
                    }
                    if ($field['handle'] === 'secondary_colour') {
                        $field['field']['swatches'] = $swatches;
                    }
                    return $field;
                }, $contents['fields']);

                $fieldset->setContents($contents)->save();
            }
        }
    }
}

<?php

namespace App\Listeners;

use Statamic\Facades\Fieldset;
use Statamic\Events\GlobalSetSaved;
use Illuminate\Support\Facades\Artisan;

class ColorUpdateListener
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
            $this->updateColourPickerFieldset($event->globals);
            Artisan::call('theme:extract-colours');
        }
    }

    /**
     * Summary of updateColourPickerFieldset
     * @param mixed $themeSettings
     * @return void
     */
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

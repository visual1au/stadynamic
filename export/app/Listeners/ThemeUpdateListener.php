<?php

namespace App\Listeners;

use Illuminate\Support\Str;
use Statamic\Facades\Fieldset;
use Statamic\Facades\GlobalSet;
use Statamic\Events\GlobalSetSaved;
use Illuminate\Support\Facades\Artisan;

class ThemeUpdateListener
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
            $this->extractData();
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
        $swatches = collect($themeSettings->in('default')->data())
            ->filter(fn($value) => is_string($value) && Str::startsWith($value, '#'))
            ->values()
            ->toArray();

        if (!empty($swatches)) {
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

    /**
     * Summary of extractData
     * @return void
     */
    protected function extractData()
    {
        // Get the theme settings
        $theme = GlobalSet::findByHandle('theme_settings');

        $data = $theme->inDefaultSite()->data();

        // Extract colors as a simple array in order
        $colors = collect($data)
            ->only(['primary', 'secondary', 'tertiary', 'quaternary', 'white', 'lightGrey', 'darkGrey', 'black'])
            ->values()
            ->toArray();

        file_put_contents(resource_path('data/themeColours.json'), json_encode($colors, JSON_PRETTY_PRINT));

        // Extract font
        $googleFontHtml = $data->get('google_font')['code'] ?? '';

        // Parse the font name from the <link> tag
        preg_match('/family=([^: &]+)(?::|&|$)/', $googleFontHtml, $matches);

        $fontFamily = $matches[1] ?? 'sans-serif';

        $fontJson = [
            'primary' => [
                str_replace('+', ' ', $fontFamily),
                'sans-serif'
            ]
        ];

        file_put_contents(resource_path('data/themeFont.json'), json_encode($fontJson, JSON_PRETTY_PRINT));
    }
}

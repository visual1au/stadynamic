{{-- blade-formatter-disable --}}
<x-mail::message>
# New contact form submission

Someone has taken the time to fill out the contact form on your website. Here are the details:

<x-mail::panel>
@foreach ($fields as $item)
@php
$displayValue = match($item['fieldtype']) {
'checkboxes' => $item['value']->raw() ? implode(', ', $item['value']->raw()) : null,
'toggle' => $item['value']->value() !== null ? ($item['value']->value() ? 'Yes' : 'No') : null,
default => $item['value']->value()
};
@endphp

@if ($displayValue)
<strong>{{ $item['display'] }}:</strong>
{{ $displayValue }}
<br>
@endif
@endforeach
</x-mail::panel>
</x-mail::message>

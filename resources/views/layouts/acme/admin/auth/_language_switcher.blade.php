<div class="content-header row justify-content-end">
    <div class="pr-3 pt-1 jinja-text">
        <a href="{{ LaravelLocalization::getLocalizedURL('en', null, [], true) }}"
           @if(app()->getLocale() == 'en') class="disabled-link " @endif >@lang('auth.en')</a> |
        <a href="{{ LaravelLocalization::getLocalizedURL('ar', null, [], true) }}"
           @if(app()->getLocale() == 'ar') class="disabled-link " @endif >@lang('auth.ar')</a>
    </div>
</div>

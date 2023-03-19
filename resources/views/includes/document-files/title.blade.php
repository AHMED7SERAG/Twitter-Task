@isset($title)
    @if (array_key_exists(app()->getLocale(), $title))

        @if (str_word_count($title[app()->getLocale()]) === 1)
            {{ mb_substr($title[app()->getLocale()], 0, 15, 'UTF-8') ?? '' }}
        @else
            {{ mb_substr($title[app()->getLocale()], 0, 20, 'UTF-8') ?? '' }}
        @endif
        @if (array_key_exists(app()->getLocale(), $title))
            @if (strlen($title[app()->getLocale()]) > 20)
                <a href="#" class="badge badge-secondary " data-toggle="modal" data-target="#row_{{ $id }}">
                    {{ __('general.see_more') }}
                </a>
                <div class="modal fade bd-example-modal-xl" id="row_{{ $id }}" tabindex="-1" role="dialog"
                    aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title offset-5" id="exampleModalLabel">{{ __('documentFile.title') }}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                {{ $title[app()->getLocale()] ?? '' }}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary"
                                    data-dismiss="modal">{{ __('general.close') }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            @endif
        @endif
    @endif
@endisset

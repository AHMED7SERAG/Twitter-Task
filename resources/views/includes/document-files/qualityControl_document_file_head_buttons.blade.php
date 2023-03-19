<div class="col-12">
    <div class="row">
        <h4 class="col-6 font-weight-bold"><i class="nav-icon fa-lg fas fa-folder"></i>
            {{ $documentfile->barcode }}
        </h4>
        <div class="col-6 d-flex justify-content-end">
            @if ($documentfile->last_updated_by_id == auth()->user()->id && $checkAllActionsQualityControl == true)
                <div class="mr-2">
                    <form action="{{ route('quality-control.document-file.changeStatus', $documentfile->id) }}" method="post">
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <button type="submit" class="btn btn-warning confirm"><i class=" fa fa-paper-plane"></i> @lang('documentFile.send')</button>
                    </form>
                </div>
            @endif
            <button type="button" class="btn btn-info" data-toggle="modal"
                    data-target="#LogsTrackingModal">{{ __('documentFile.LogsStatus') }}</button>
            @include('includes.document-files.LogsTrackingModal')
        </div>
    </div>
</div>

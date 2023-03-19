        <div class="col-12">
            <div class="row">
                <h4 class="col-6 font-weight-bold"><i class="nav-icon fa-lg fas fa-folder"></i>
                    {{ $documentfile->barcode }}
                </h4>
                <div class="col-6 text-right">
                    <button type="button" class="btn btn-info" data-toggle="modal"
                        data-target="#LogsTrackingModal">{{ __('documentFile.LogsStatus') }}</button>
                    @include('includes.document-files.LogsTrackingModal')
                    @if ($documentfile->documentFileTracking->first()->df_state_id == config('status.document_file_state.dl_accept_modified_file')  ||
                    $documentfile->documentFileTracking->first()->df_state_id == config('status.document_file_state.dl_accept_new_file'))
                        <a href="{{ route('digital-lab.documentFile.AssignUser', $documentfile->id) }}}}"
                            class="btn btn-primary ml-1 mt-1" ><i
                                class="fa fa-users"></i>@lang('documentFile.assignUsers')</a>
                    @endif
                    
                </div>
            </div>
        </div>

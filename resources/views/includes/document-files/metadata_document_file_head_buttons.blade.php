        <div class="col-12">
            <div class="row">
                <h4 class="col-6 font-weight-bold"><i class="nav-icon fa-lg fas fa-folder"></i>
                    {{ $documentfile->barcode }}
                </h4>
                <div class="col-6 text-right">
                    {{--  <button type="button" class="btn btn-info" data-toggle="modal"
                        data-target="#LogsTrackingModal">{{ __('documentFile.LogsStatus') }}</button>
                    @include('includes.document-files.LogsTrackingModal')  --}}

                    @if (count($documentfile->documentFileReason) > 0)
                        {{-- @if ($documentFileLog->last()->df_logs_state_id == config('status.document_file_logs.review_reject_content_nf'))   --}}
                        <div class="float-right">
                            <button data-placement="top" title="{{ trans('document-file-reason.reject-reason') }}"
                                class="btn btn-secondary mr-1 ml-1" data-dismiss="modal" data-toggle="modal"
                                data-target="#createDocumentFileReason_{{ $documentfile->id }}"><i
                                    class="fa fa-ban"></i> {{ __('document-file-reason.reject-reason') }}</button>
                        </div>
                        <div class="modal fade" id="createDocumentFileReason_{{ $documentfile->id }}" tabindex="-1"
                            role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">
                                            {{ trans('document-file-reason.reject-reason') }}
                                        </h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body" style="height: 500px">
                                        <iframe id="iFrame"
                                            src="{{ route('metadata.document-file-reason.show', $documentfile->id) }}"
                                            title="{{ trans('documentFile.reject-document-file') }}" width="100%"
                                            height="100%"></iframe>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary"
                                            data-dismiss="modal">{{ trans('general.close') }}</button>


                                    </div>
                                </div>
                            </div>
                        </div>
                    @endif
                    @if ($documentfile->document_count > 0 && $documentfile->last_updated_by_id == auth()->user()->id)
                        @if ($checkAllActions)
                            <div class="float-right">
                                <form action="{{ route('metadata.document-file.changeStatus', $documentfile->id) }}"
                                    method="post">
                                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                                    <button type="submit" class="btn btn-warning mr-1 ml-1 confirm float-right"><i
                                            class=" fa fa-paper-plane"></i> {{ __('documentFile.send') }}</button>
                                </form>
                            </div>
                        @endif
                    @endif
                    {{--  
                    @if (($documentfile->documentFileContentTracking->last()->state->id != config('status.document_file_content_state.entry_claim_accept_nf') && $documentfile->documentFileTracking->first()->state->phase_id == config('phases.prepare')) || ($documentfile->documentFileTracking->first()->df_state_id != config('status.document_file_state.review_send_nf_entry') && ($documentfile->documentFileContentTracking->last()->state->id != config('status.document_file_content_state.entry_claim_accept_nf') && $documentfile->lockedby_id == auth()->user()->id)))  --}}
        
                    @if (  
                         $documentfile->documentFileTracking->first()->df_state_id !=
                            config('status.document_file_state.review_send_nf_entry') &&
                            $documentfile->documentFileContentTracking->last()->state->id !=
                                config('status.document_file_content_state.entry_claim_accept_nf'))
                        <a href="{{ route($link . '.document-file.edit', $documentfile->id) }}"
                            class="btn btn-success">
                            <i class=" fa  fa-edit"> {{ __('documentFile.edit') }} </i></a>
                    @endif

                    {{--  @endif  --}}


                </div>
            </div>
        </div>

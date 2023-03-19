        <div class="col-12">
            <div class="row">
                <h4 class="col-6 font-weight-bold"><i class="nav-icon fa-lg fas fa-folder"></i>
                    {{ $documentfile->barcode }}
                </h4>
                <div class="col-6 text-right">
                    <button type="button" class="btn btn-info" data-toggle="modal"
                        data-target="#LogsTrackingModal">{{ __('documentFile.LogsStatus') }}</button>
                    @include('includes.document-files.LogsTrackingModal')
                    @if ($reviewCheckAllActions == true)
                        <div class="float-right">
                            <form action="{{ route('review.document-file.changeStatus', $documentfile->id) }}"
                                method="post">
                                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                                <button type="submit" class="btn btn-warning ml-1 confirm"><i
                                        class=" fa fa-paper-plane"></i>
                                    {{ trans('documentFile.send') }} </button>
                            </form>
                        </div>
                    @endif
                    @if (count($documentfile->documentFileReason) > 0)
                        <div class="float-right">
                            <button class="btn btn-secondary ml-1" data-dismiss="modal" data-toggle="modal"
                                data-target="#createDocumentFileReason"><i
                                    class="fa fa-ban"></i>{{ trans('document-file-reason.reject-reason') }}</button>
                        </div>
                        <div class="modal fade" id="createDocumentFileReason" tabindex="-1" role="dialog"
                            aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                            src="{{ route('review.document-file-reason.show', $documentfile->id) }}"
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
                    {{--  close edit button if user take only one action on reject or accept  but if tacke action and data is accpted then he cant take action --}}
                    @if ($checkReviewEditButton )
                        <a href="{{ route($link . '.document-file.edit', $documentfile->id) }}"
                            class="btn btn-success">
                            <i class=" fa  fa-edit"> {{ __('documentFile.edit') }} </i></a>
                    @endif
                    {{--  @if (
                        $documentfile->lockedby_id == auth()->user()->id &&
                            $documentfile->documentFileTracking->first()->state->phase_id == config('phases.review') &&
                            $documentfile->documentFileTracking->first()->state->id !=
                                config('status.document_file_state.entry_send_nf_review'))
                        <a href="{{ route($link . '.document-file.edit', $documentfile->id) }}"
                            class="btn btn-success">
                            <i class=" fa  fa-edit"> {{ __('documentFile.edit') }} </i></a>
                    @endif  --}}



                </div>
            </div>
        </div>

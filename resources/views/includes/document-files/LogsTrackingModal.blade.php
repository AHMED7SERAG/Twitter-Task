<div class="modal fade bd-example-modal-xl" id="LogsTrackingModal" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title offset-5" id="exampleModalLabel">{{ __('documentFile.LogsStatus') }}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="col-12 table mt-2 w-100">
                    <table
                        class="table table-striped  zero-configuration documentFileLogsTrackingDatatable  w-100 text-center ">
                        <thead>
                            <tr>
                                <th dt-type="select" dt-enc="yes"
                                    dt-options="{{ base64_encode(json_encode($users)) }}" dt-name="user_id">
                                    @lang('document.user_id') </th>
                                <th dt-type="select" dt-enc="yes"
                                    dt-options="{{ base64_encode(json_encode($LogsStates)) }}"
                                    dt-name="df_logs_state_id"> @lang('document.df_state_id') </th>
                                <th dt-type="select" dt-enc="yes"
                                    dt-options="{{ base64_encode(json_encode($phases)) }}" dt-name="phase_id">
                                    @lang('document.phase') </th>
                                <th dt-type="text" dt-name="assigned">
                                    {{ trans('documentFile.assignedStatus') }}
                                </th>
                                <th dt-type="text" dt-name="document_count">
                                    {{ trans('documentFile.document_count') }}
                                </th>
                                <th dt-type="text" dt-name="created_at">{{ trans('document.operation_date') }}
                                </th>
                                <th></th>

                            </tr>
                            <tr id="searchable-row4"></tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">@lang('general.close')</button>
            </div>
        </div>
    </div>
</div>

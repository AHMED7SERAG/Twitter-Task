<div class="card">

  <div class="content-header row ">
    @include('includes.document-files.head_buttons')
  </div>
  <hr>
  <div class="row">
    <div class="col-4">
      <div class="card-header  " style="background-color: #F0F0F1">
        <h4 class=" "> @lang('documentFile.fileData')

          <button type="button" class="btn btn-info float-right" data-toggle="modal" data-target="#bd-example-modal-lg">{{ __('documentFile.contentStatus') }}</button>
          @include('includes.document-files.contentTrackingModal')
        </h4>
        
      </div>
     @include('includes.document-files._side_table')
    </div>
    <div class="col-8  ">
      <div class="card-header text-center " style="background-color: #F0F0F1">
        <h4 class=" "> @lang('documentFile.history')</h4>
      </div>
      @include('includes.document-files.document_file_tracking_table')
    </div>
    </div>
  </div>
</div>
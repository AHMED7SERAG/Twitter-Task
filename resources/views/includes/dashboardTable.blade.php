<div class="col-10 table mt-2 ">
  <table class="table-sm table-striped data-table w-100  text-center ">
    <thead>
      <tr>

        <th dt-type="text" dt-name="barcode">{{ trans('documentFile.name') }}
        </th>
        <th  dt-type="text" dt-name="title">{{ trans('documentFile.title') }}
        </th>
        <th dt-type="select" dt-enc="yes" dt-options="{{ base64_encode(json_encode($documentStoringPlace))}}" dt-name="document_storing_place_id"> @lang('documentFile.document_storing_place_id') </th>

        <th dt-type="text" dt-name="internal_number">
          {{ trans('documentFile.internal_number') }}
        </th>
        <th dt-type="text" dt-name="document_count">
          {{ trans('documentFile.document_count') }}
        </th>
              <th dt-type="text" dt-name="page_count">
          {{ trans('documentFile.page_count') }}
        </th>
        
      <th dt-type="select" dt-enc="yes" dt-options="{{ base64_encode(json_encode($states))}}" dt-name="df_state_id">  {{ trans('documentFile.status') }}</th>

        <th dt-type="text" dt-name="assigned">
          {{ trans('documentFile.assignedStatus') }}
      </th>

        <th style="width: 25%;">@lang('general.action')</th>
        {{-- <th  style="width: 25%;">@lang('general.files')</th>  --}}

      </tr>
      <tr id="searchable-row"></tr>
    </thead>
    <tbody>

    </tbody>
  </table>
</div>
<div class="col-10 table mt-2">
  <table class="table table-striped  zero-configuration data-table  text-center ">
    <thead>
      <tr>

        <th dt-type="text" dt-name="barcode">{{ trans('documentfile.name') }}
        </th>
        <th dt-type="text" dt-name="title">{{ trans('documentfile.title') }}
        </th>
        <th dt-type="select" dt-enc="yes" dt-options="{{ base64_encode(json_encode($documentStoringPlace))}}" dt-name="document_storing_place_id"> @lang('documentfile.document_storing_place_id') </th>

        <th dt-type="text" dt-name="internal_number">
          {{ trans('documentfile.internal_number') }}
        </th>
        <th dt-type="text" dt-name="document_count">
          {{ trans('documentfile.document_count') }}
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
<div class="col-12 table mt-2">
  <table class="table table-striped  zero-configuration data-table w-100 text-center ">
    <thead>
      <tr>
        <th dt-type="text" dt-name="barcode">{{ trans('documentFile.barcode') }}
        </th>
        <th dt-type="select" dt-enc="yes" dt-options="{{ base64_encode(json_encode($languages))}}" dt-name="dsp_language_id"> @lang('document.language') </th>
        <th dt-type="select" dt-enc="yes" dt-options="{{ base64_encode(json_encode($types))}}" dt-name="type_id">{{ trans('document.type') }}</th>
        <th dt-type="select" dt-enc="yes" dt-options="{{ base64_encode(json_encode($sources))}}" dt-name="source_id"> @lang('document.source') </th>
        <th dt-type="select" dt-enc="yes" dt-options="{{ base64_encode(json_encode($document_states))}}" dt-name="d_state_id"> @lang('document.state') </th>

         <th style="width: 25%;">@lang('general.action')</th>

      </tr>
      <tr id="searchable-row"></tr>
    </thead>
    <tbody>

    </tbody>
  </table>
</div>
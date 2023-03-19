<div class="content-body">

  <section id="column-filtering">
    <div class="row">
      <div class="col-12">
        {{-- <div class="card">  --}}

        <div class="card-content show">
          <div class="card-body card-dashboard row">

            <div class=" table mt-2">
              <table class="table table-striped  zero-configuration documentFileTrackingDatatable w-100 text-center ">
                <thead>
                  <tr>
                    <th  dt-type="select" dt-enc="yes" dt-options="{{ base64_encode(json_encode($users))}}" dt-name="user_id"> @lang('document.user_id') </th>
                    <th  dt-type="select" dt-enc="yes" dt-options="{{ base64_encode(json_encode($states))}}" dt-name="df_state_id"> @lang('document.df_state_id') </th>
                    <th  dt-type="select" dt-enc="yes" dt-options="{{ base64_encode(json_encode($phases))}}" dt-name="phase_id"> @lang('document.current_phase') </th>
                    <th dt-type="text" dt-name="created_at">{{ trans('document.operation_date') }}
                    </th>

                    {{-- <th style="width: 25%;">@lang('general.action')</th>  --}}
                    <th></th>
                  </tr>
                  <tr id="searchable-row2"></tr>
                </thead>
                <tbody>

                </tbody>
              </table>
            </div>
          </div>
        </div>
        {{-- </div>  --}}
      </div>
    </div>
  </section>
  <!--/ datatable -->
</div>
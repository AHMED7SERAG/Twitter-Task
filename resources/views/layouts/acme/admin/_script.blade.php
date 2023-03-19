<!-- BEGIN: JS-->
<script>
    var sure = "@lang('general.recover')" ;
    var recover = "@lang('general.recover')";
    var cancelText = "@lang('general.cancel')";
    var deleteText = "@lang('general.delete')";
    var successText = "@lang('general.success')"
</script>

<script src="{{asset('admin-assets/js/adminlte.js')}}"></script>
<script src="{{asset('calendars/js/calendars.js')}}"></script>

<!-- END: JS-->

@stack('scripts')

<script>

    $(function () {

        $('.select-custom').select2( {
            theme: "classic"
        });
    }); //end of document ready
</script>



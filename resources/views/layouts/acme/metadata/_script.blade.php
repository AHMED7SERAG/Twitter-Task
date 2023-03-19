<!-- BEGIN: JS-->
<script>
    var recover = "@lang('general.recover')";
    var cancelText = "@lang('general.cancel')";
    var deleteText = "@lang('general.delete')";
    var successText = "@lang('general.success')";
    var sure = "@lang('general.sure')";
    var ConfirmText = "@lang('general.confirm')";
    var confirm = "@lang('general.areConfirm')";
    var app_url = '{{ url(' / ') }}';
    var url = app_url;
    var events = "@lang('document.events')";
    var keywords = "@lang('document.keywords')";
    var places = "@lang('document.places')";
    var persons = "@lang('document.persons')";
</script>
<script src="{{asset('admin-assets/js/adminlte.js')}}"></script>
<script src="{{asset('admin-assets/js/jQuery.tagify.min.js')}}"></script>
<script src="{{asset('admin-assets/js/bootstrap-tagsinput.min.js')}}"></script>
<script src="{{asset('admin-assets/js/tagify.min.js')}}"></script>
<script src="{{asset('admin-assets/js/tagify.polyfills.min.js')}}"></script>
<script src="{{asset('calendars/js/calendars.js')}}"></script>
<!-- END: JS-->

@stack('scripts')

<script>
    $(function() {

        $('.select-custom').select2({
            theme: "classic"
        });
    }); //end of document ready
</script>





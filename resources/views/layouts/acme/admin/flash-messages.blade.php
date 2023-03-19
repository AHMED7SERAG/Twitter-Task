@if (Session::has('flash_message'))
<div class="w-100 alert alert-info closable">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
    {{ Session::get('flash_message') }}
</div>
@endif
@if (Session::has('error'))
<div class="w-100 alert alert-default-danger closable">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
    {{ Session::get('error') }}
</div>
@endif
@if (Session::has('success'))
<div class="w-100 alert alert-default-success closable">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
    {{ Session::get('success') }}
</div>
@endif


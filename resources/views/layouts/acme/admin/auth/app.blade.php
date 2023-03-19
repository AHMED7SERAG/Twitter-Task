<!DOCTYPE html>
<html class="loading" lang="{{app()->getLocale()}}" dir="@if(app()->getLocale() == 'ar') rtl @else ltr @endif">

<!-- BEGIN: Head-->
@include('layouts.acme.admin.auth._head')
<!-- END: Head-->

<!-- BEGIN: Body-->
<body dir="@if(app()->getLocale() == 'ar') rtl @else ltr @endif">
<!-- BEGIN: Content-->
@yield('content')
<!-- END: Content-->

<!-- BEGIN: Footer-->
<!-- END: Footer-->

<!-- BEGIN: Script-->
@include('layouts.acme.admin.auth._script')
<!-- END: Script-->

</body>
<!-- END: Body-->
</html>

<!DOCTYPE html>
<html class="loading" lang="{{app()->getLocale()}}">

<!-- BEGIN: Head-->
@include('layouts.acme.admin._head')
<!-- END: Head-->

<body class="hold-transition login-page">
<div class="login-box">



    @yield('content')




@include('layouts.acme.admin._script')
</body>
<!-- END: Body-->
</html>

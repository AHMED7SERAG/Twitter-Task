<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="author" content="">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title')</title>
    @if(app()->getLocale() == 'ar')
        <link rel="stylesheet" href="{{asset('admin-assets/css/adminlte-rtl.min.css')}}">
    @else
        <link rel="stylesheet" href="{{asset('admin-assets/css/adminlte-ltr.min.css')}}">
    @endif
    <link rel="stylesheet" href="{{asset('datatables/css/jquery.dataTables.min.css')}}">
    <link rel="stylesheet" href="{{asset('select2/css/select2.min.css')}}">
    @stack('styles')

</head>

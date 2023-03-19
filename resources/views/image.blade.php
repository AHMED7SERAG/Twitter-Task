@extends('layouts.acme.metadata.app')

@section('title')
    @lang('general.app')
@endsection
@push('styles')
    <style href="{{ asset('dropzone/css/dropzone.css') }}"></style>


@endpush

@section('content')
    <div class="app-content content">
        <div class="content-header row">
            <div class="content-header-left col-md-6 col-12 mb-2">
                <div class="row breadcrumbs-top">
                    {{--  <div class="breadcrumb-wrapper col-12">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="{{ route('dashboard') }}">{{ __('general.dashboard') }}</a>
                            </li>

                            <li class="breadcrumb-item"><a href="{{ route('scan.dashboard') }}">@lang('documentFile.documentfile')</a>
                            <li class="breadcrumb-item"><a
                                    href="{{ route('scan.document-file.show', $document->file_id) }}">{{ $document->documentFile->barcode }}</a>
                            <li class="breadcrumb-item"><a
                                    href="{{ route('scan.document.show', $document->id) }}">{{ $document->barcode }}</a>
                            </li>
                            <li class="breadcrumb-item">@lang('general.edit')
                            </li>
                        </ol>
                    </div>  --}}
                </div>
            </div>

            <div class="content-header-right text-md-right col-md-6 col-12">
                <div class="btn-group">
                    {{--  <a href="{{ route('scan.document-file.show', $document->file_id) }}"
                        class="btn btn-primary mb-1 buttonAnimation" data-animation="flash"> <span
                            class="display-inline-block">@lang('general.back')</span> </a>  --}}
                </div>
            </div>
        </div>

        <div class="content-body">
            <!-- Form Section -->
            <section id="horizontal-form-layouts">
                <div class="row">
                    <div class="col-md-12">
                        @include('includes.flash_message')
                        <div class="card">
                            <div class="card-header">
                                <h3 class="">@lang('document.upload')</h3>
                                <a class="heading-elements-toggle"><i class="la la-ellipsis-v font-medium-3"></i></a>

                            </div>
                            <div class="card-content show">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="card-header " style="background-color: #F0F0F1">
                                                <h4 class=""> @lang('document.data')
                                                </h4>
                                            </div>
                                            {{--  @include('includes.documents.document_side_table_show')  --}}
                                        </div>

                                    </div>

                                        @if ($errors->any())
                                            <div class="row mb-2">
                                                <div class="col-6 ">
                                                    <div class="">
                                                        <ul class="list-group ">
                                                            <li class="list-group-item alert alert-danger">

                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            @endif
                                        <div class=" row text-left">
                                            <div class="col-6 ">

                                                    @include('includes.documents.dropzone', [
                                                        'phase' => 'download_nd_scan',
                                                        'images_count' => 0,
                                                    ])

                                            </div>

                                        </div>



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!--/ Form Sections -->
        </div>
    </div>

    <!-- Modal -->

@endsection


@push('scripts')
    <script>
        let deleteRoute = '/image/delete/';
        let documentImage = "/images";
        let uploadedImage = "/imageStore";
        let formatMessage = " {{ trans('document.format') }}";
        let confirmRplace = "{{ __('document.confirmRplace') }}"
        let errorMessage = "{{ __('document.errorMessage') }}"
        let deleteAllRoute = "/image/deleteAll"
    </script>
    @include('includes.documents.dropzone_script')
@endpush

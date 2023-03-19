<div class="content-header row">
    @include ('layouts.acme.metadata._breadcrumb', ['routeGroup' => $routeGroup, 'viewName' => $viewName, 'type' => $type])
    <div class="content-header-right text-md-right col-md-6 col-12">
        <div class="btn-group">
            @if($type != 'index')
                <a href="{{ url()->previous() }}" class="btn btn-primary mb-1 buttonAnimation" data-animation="flash" > <span class="display-inline-block">@lang('general.back')</span> </a>
            @else
                <a class="btn btn-success rounded  m-1" href="{{ url($routeGroup . '/' . $viewName .'/create') }}" > <span class="display-inline-block">@lang('general.add')</span> <i class="fa  fa-plus"></i></a>
            @endif
        </div>
    </div>
</div>

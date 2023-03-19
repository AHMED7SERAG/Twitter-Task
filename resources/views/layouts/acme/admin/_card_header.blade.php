<div class="content-header row">
    @include ('layouts.acme.admin._breadcrumb', ['routeGroup' => $routeGroup, 'viewName' => $viewName, 'type' => $type])
    <div class="content-header-right text-md-right col-md-6 col-12">
        <div class="btn-group">
            @if($type != 'index')
                <a href="{{ url()->previous() }}" class="btn btn-primary mb-1 buttonAnimation" data-animation="flash" > <span class="display-inline-block">@lang('general.back')</span> </a>
            @else
                <a class="btn btn-success rounded  m-1" href="{{ url($routeGroup . '/' . $viewName .'/create') }}" > <span class="display-inline-block">@lang('general.add')</span> <i class="fa  fa-plus"></i></a>
                {{--  <form method="post" action="{{ route($routeGroup . '.' . $viewName .'.bulk_delete') }}" style="display: inline-block;">
                    @csrf
                    @method('delete')
                    <input type="hidden" name="record_ids" id="record-ids">
                    <button class="btn btn-jinja rounded  mb-1 mt-1 white buttonAnimation" type="submit" id="bulk-delete" data-animation="pulse" > <span class="display-inline-block">@lang('general.bulk_delete')</span> <i class="fa fa-trash"></i></button>
                </form>  --}}
            @endif
        </div>
    </div>
</div>

<!-- Brand Logo -->
<div class="text-center">
    <a href="{{ route('dashboard') }}" class="brand-link">
        <i class="fa ml-3  fa-flag"></i>
        <span class="brand-text font-weight-light mr-3"> {{ __('general.app') }}</span>
    </a>
</div>

<!-- Sidebar -->
<div class="sidebar">

    <!-- Sidebar user panel (optional) -->
    <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
            <img src="{{ asset('admin-assets//dist/img/business-male.jpg') }}" class="img-circle elevation-2"
                 alt="User Image">
        </div>
        <div class="info">
            <a href="#" class="d-block">{{ auth()->user()->username ?? '' }}</a>
        </div>
    </div>

    <!-- SidebarSearch Form -->
{{-- <div class="form-inline">
    <div class="input-group" data-widget="sidebar-search">
        <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search">
        <div class="input-group-append">
            <button class="btn btn-sidebar">
                <i class="fas fa-search fa-fw"></i>
            </button>
        </div>
    </div>
</div> --}}

<!-- Admin Sidebar Menu -->
    <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false"
            style="overflow: hidden">
            {{--  @php
                $roles = Auth::user()->deviceRoles;
            @endphp
            @foreach ($roles as $role)
                @php
                    $permissions = $role->listablePermissions;
                    $roleRoutes = App\Models\Route::join('permission_route', 'permission_route.route_id', '=', 'routes.id')
                        ->join('permission_role', 'permission_role.permission_id', '=', 'permission_route.permission_id')
                        ->join('role_user', 'role_user.role_id', '=', 'permission_role.role_id')
                        ->where('role_user.role_id', $role->id)
                        ->pluck('name', 'name')
                        ->toArray();
                    $isActive = in_array(request()->route()->getName(), $roleRoutes);
                @endphp
                <li class="nav-item {{ $isActive ? 'menu-open' : '' }} ">
                    <a href="{{ route('dashboard') }}" class="nav-link {{ $isActive ? 'active' : '' }}">
                        <i class="fa fa-bullseye mr-1"></i>
                        <p>
                            {{ $role->label }}
                            <i class="{{ app()->getLocale() == 'ar' ? 'left' : 'right' }} fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        @foreach ($permissions as $permission)
                            @php
                                $currentRoute = str_replace('.', '/', $permission->masked_link);
                                $splittedRoute = explode('/', $currentRoute);
                                if (count($splittedRoute) > 1) {
                                    //for any route has more than one part "eg. admin/roles"
                                    $routeWithoutLastElement = array_slice($splittedRoute, 0, -1);
                                    //dd(implode('/', $routeWithoutLastElement).'/*');
                                    $isActiveLink = request()->is(implode('/', $routeWithoutLastElement) . '/*') || request()->is(implode('/', $routeWithoutLastElement));
                                } else {
                                    $isActiveLink = request()->is($currentRoute);
                                }

                            @endphp
                            <li class="nav-item">
                                <a href="{{ route($permission->masked_link) }}"
                                   class="nav-link p-0 {{ $isActiveLink ? 'active' : '' }}">
                                    <div class="container">
                                        <div class="row p-2">
                                            <div class="col-3 ">
                                                <i class="{{ $permission->icon }} nav-icon py-1"></i>
                                            </div>

                                            <p style="font-size: small;">
                                                {{ trans($permission->label) }}
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        @endforeach
                    </ul>
                </li>
            @endforeach  --}}
        </ul>
    </nav>
    <!-- /.sidebar-menu -->
</div>
<!-- /.sidebar -->

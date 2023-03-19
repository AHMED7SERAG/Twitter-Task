<div class="main-menu menu-fixed menu-dark menu-accordion menu-shadow" data-scroll-to-active="true">
    <div class="main-menu-content">
        <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">

            {{--home--}}
            <li class=" nav-item">
                <a href="{{url('/admin')}}">
                    <i class="la la-home"></i>
                    <span class="menu-title" data-i18n="Dashboard">@lang('gen')</span>
                </a>
            </li>

            @foreach($laravelAdminMenus->menus as $section)
                @if($section->items)
                    @if($section->section == 'Tools')
                        <li class="navigation-header">
                            <span data-i18n="{{ $section->section }}" style="font-size: large;">{{strtoupper(__('general.'. strtolower($section->section)))}}</span>
                            <i class="la la-ellipsis-h" data-toggle="tooltip" data-placement="right" data-original-title="General"></i>
                        </li>
                    @endif
                    @foreach($section->items as $menu)
                        {{--            @if (auth()->check() && auth()->user()->can('read ' . $menu->title))--}}
                        <li class=" nav-item">
                            <a href="{{url($menu->url)}}">
                                <i class="la la-lock"></i>
                                <span class="menu-title">@lang(strtolower($menu->title) .'.'. strtolower($menu->title))</span>
                            </a>
                        </li>
                        {{--            @endif--}}
                    @endforeach
                @endif
            @endforeach


        </ul>
    </div>
</div>

<nav class="mt-2 nav-background">
    @if (count($DocumentFiles) > 0)
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview">
            @foreach ($DocumentFiles as $file)
                <li class="nav-item row {{ request()->is($aside_link . '/document-file/' . $file->id) ? 'menu-open' : '' }}"
                    data-toggle="tooltip" data-placement="top" title="{{ __('documentFile.openFile') }}">
                    <a href="{{ route($aside_link . '.document-file.show', $file->id) }}" class="col-2 mt-2">
                        <i class="nav-icon fas fa-folder"></i>
                    </a>
                    <label
                        class="col-10 nav-link {{ request()->is($aside_link . '/document-file/' . $file->id) ? 'active' : '' }}">
                        {{ $file->barcode }}
                        <i class="{{ app()->getLocale() == 'ar' ? 'left' : 'right' }} fas fa-angle-left "></i>
                    </label>
                    @if ($file->documents)
                        <ul class="nav nav-nd nav-treeview pl-3">
                            @foreach ($file->documents as $document)
                                <li class="nav-item pl-2">
                                    <a href="{{ route($aside_link . '.document.show', $document->id) }}"
                                        class="nav-link">
                                        <i class="fa fa-file"></i>
                                        {{ $document->barcode ?? '' }}</p>
                                    </a>
                                </li>
                            @endforeach
                        </ul>
                    @endif
                </li>
            @endforeach
        </ul>
    @else
        <label class="col-10 nav-link">
            @lang('general.no_data_files')
        </label>
    @endif
</nav>

@if($document_storing_place_id)
    <a href="{{route($phase.'.document-file.show', $id) }}" data-toggle="tooltip" data-placement="top" title="{{ trans('documentFile.fileData') }}">{{ $barcode }}</a>
@else 
     <a href="{{ route($phase.'.document-file.edit',$id) }}" data-toggle="tooltip" data-placement="top" title="{{ trans('documentFile.edit-document-file') }}">{{ $barcode }}</a>
@endif

<table class="table table-light table-striped text-center mt-4">
    <tbody>
      <tr>
        <th scope="col">{{ __('documentFile.barcode') }}</th>
        <td>{{ $documentfile->barcode }}</td>
      </tr>
      <tr>
        <th>{{ __('documentFile.document_storing_place_id') }}</th>
        <td>{{ $documentfile->documentStoringPlace->name ?? '' }}</td>
      </tr>
      <tr>
        <th>{{ __('documentFile.title') }} </th>
        <td>{{ substr(  $documentfile->title, 0, 30) ?? ''}} 
          @if(strlen( $documentfile->title) > 30)               
            <a href="#" class="badge badge-secondary" data-toggle="modal" data-target="#title">
                  @lang('general.see_more')
            </a>
            @include('includes.contentModal',["title"=>__('document.title') ,'content'=>  $documentfile->title,'id'=>'title'])    
          @endif

        </td>
      </tr>
      <tr>
        <th>{{ __('documentFile.internal_number') }}</th>
        <td>{{ $documentfile->internal_number ?? '' }}</td>
      </tr>
      <tr>
        <th>{{ __('documentFile.contentStatus') }}</th>
        <td>{{ $documentfile->documentFileContentTracking->last()->state->name ?? '' }}</td>
      </tr>
      <tr>
        <th scope="col">{{ __('documentFile.document_count') }}</th>
        <td>{{ $documentfile->document_count ?? '' }}</td>
      </tr>
      <tr>
        <th scope="col">{{ __('documentFile.total_pages') }}</th>
        <td>{{ $documentfile->total_pages ?? '' }}</td>
      </tr>
      
      <tr>
        <th scope="col">{{ __('documentFile.dsp_language_id') }}</th>
        <td>{{ $documentfile->documentStoringPlace->language->name ?? trans('document.languageNotFound')}}</td>
      </tr>
      <tr>
        <th>{{ __('documentFile.createdby_id') }}</th>
        <td>{{ $documentfile->createdby->full_name ?? '' }}</td>
      </tr>
      <tr>
        <th scope="col">{{ __('documentFile.created_date') }}</th>
        <td>{{ $documentfile->created_at ?? '' }}</td>
      </tr>

    </tbody>
  </table>
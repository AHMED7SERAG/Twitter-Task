@foreach($errors->all() as $error)
    <div class="w-100 alert alert-default-danger">
        <button type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        <strong>{{ $error }}</strong>
    </div>
@endforeach

@push('scripts')
    <script>
        $(function(){
            /**
             * for display radius value
             * */
            $('.close').on('click', function (e){
                $(this).parent().fadeOut("slow");
            });
        })
    </script>
@endpush

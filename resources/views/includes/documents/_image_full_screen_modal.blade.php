<!-- Modal -->
<div class="modal top fade p-0"
     id="fullScreenModal"
     tabindex="-1"
     aria-labelledby="fullScreenModalLabel"
     aria-hidden="true"
     data-mdb-backdrop="true"
     data-mdb-keyboard="true">
    <div class="modal-dialog modal-fullscreen w-100 h-100 m-0" style="max-width: none">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="fullScreenModalLabel"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body text-center">
                <img id="fullScreenModalImage" style="max-width: 100%" src="" alt="">
            </div>
        </div>
    </div>
</div>

@push('scripts')
    <script>
        $(function(){
            /**
             * for display radius value
             * */
            $('body').on('click', '.preview', function (e){
                $('.modal-fullscreen #fullScreenModalImage').attr('src', $(this).children().attr('src'));
                $('.modal-fullscreen #fullScreenModalLabel').text($(this).parent().parent().find('.lead').text());
                $('#fullScreenModal').modal('show');
            });
        })
    </script>
@endpush
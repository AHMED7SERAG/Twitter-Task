<div class="card card-default">
    <div class="card-header">
        <h3 class="card-title alert alert-default-secondary float-none overflow-hidden">
            <span class="float-left">{{ trans('document.'.$phase) }}</span>
            <span class="float-right">{{ trans('document.imageCount') }}
                <span class="font-weight-bold bg-gradient-gray" style="padding: 5px 10px;border-radius: 5px" id="imageCount">{{ $images_count }}</span>
            </span>
        </h3>
    </div>
    <div class="card-body">
        <div id="actions" class="row">
            <div class="col-lg-6">
                <div class="btn-group w-100">
                    <span  class="btn btn-success col fileinput-button">
                        <i class="fas fa-plus"></i>
                        <span>{{ trans('general.addFile') }}</span>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="btn-group w-100">
                    <span class="btn btn-danger col deleteAll" id="deleteAll">
                        <i class="fas fa-trash"></i>
                        <span>{{ trans('document.deleteAll') }}</span>
                </div>
            </div>
            {{--  <button >Delete All Images</button>  --}}

            {{--  <div class="col-lg-6 d-flex align-items-center">
                <div class="fileupload-process w-100">
                    <div id="total-progress"
                        class="progress progress-striped active"
                        role="progressbar" aria-valuemin="0" aria-valuemax="100"
                        aria-valuenow="0">
                        <div class="progress-bar progress-bar-success"
                            style="width:0%;" data-dz-uploadprogress>
                        </div>
                    </div>
                </div>
            </div>  --}}
        </div>
        <div class="table table-striped files" id="previews">
            <div id="template" class="row mt-2">
                <div class="col-auto">
                    <span class="preview"><img data-mdb-toggle="modal" data-mdb-target="#fullScreenModal" src="data:,"
                            data-dz-thumbnail /></span>
                </div>
                <div class="col d-flex align-items-center">
                    <p class="mb-0">
                        <span class="lead" data-dz-name></span>
                        <span></span>
                    </p>
                    <strong class="error text-danger"
                        data-dz-errormessage></strong>
                </div>
                <div class="col-4 d-flex align-items-center">
                    <div class="progress progress-striped active w-100"
                        role="progressbar" aria-valuemin="0" aria-valuemax="100"
                        aria-valuenow="0">
                        <div class="progress-bar progress-bar-success"
                            style="width:0%;" data-dz-uploadprogress>
                        </div>
                    </div>
                </div>
                <div class="col-auto d-flex align-items-center">
                    <div class="btn-group">
                        <a href="#" class="btn btn-primary download" download>
                            <i class="fas fa-download"></i>
                            <span>{{ trans('general.download') }}</span>
                        </a>
                        <button class="btn btn-danger delete">
                            <i class="fas fa-trash"></i>
                            <span>{{ trans('general.delete') }}</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <!-- /.card-body -->
</div>

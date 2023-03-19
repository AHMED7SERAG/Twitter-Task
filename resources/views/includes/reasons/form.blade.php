<div class="form-body">
    {!! Form::hidden('phase_id', $phase) !!}

    <div class="row">
        <div class="col-3">
            {!! Form::label('reason_id', trans('document-reason.reason_id'), ['class' => 'control-label']) !!}
        </div>
        <div class="col-9">
            <div class="form-group{{ $errors->has('reason_id') ? 'has-error' : '' }} ">
                {!! Form::select('reason_id', $reasons, null, [
                    'class' => 'form-control select-custom w-100',
                    'required' => 'required',
                    'placeholder' => '',
                ]) !!}
                {!! $errors->first('reason_id', '<p class="text-danger help-block">:message</p>') !!}
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-3">

        </div>
        <div class="col-9">

        </div>
    </div>
    <div class="row">
        <div class="col-3">
            {!! Form::label('from', trans('document-file-reason.from'), ['class' => 'control-label']) !!}
        </div>
        <div class="col-9">
            {!! Form::number('from', null, ['class' => 'form-control ', 'placeholder' => '', 'min' => '1']) !!}

        </div>

    </div>
    <div class="row mt-2">
        <div class="col-3">
            {!! Form::label('to', trans('document-file-reason.to'), ['class' => 'control-label']) !!}

        </div>
        <div class="col-9">
            {!! Form::number('to', null, ['class' => ' form-control', 'placeholder' => '', 'min' => '1']) !!}

        </div>
    </div>
    <div class="row mt-2 mb-2">
        <div class="col-3">
            {!! Form::label('comment', trans('document-reason.comment'), ['class' => 'control-label']) !!}
        </div>
        <div class="col-9">
            {!! Form::textarea('comment', null, [
                'class' => 'form-control',
                'cols' => 40,
                'rows' => 5,
                'maxlength' => '400',
            ]) !!}

            {!! $errors->first('comment', '<p class="text-danger help-block">:message</p>') !!}

        </div>

    </div>

</div>

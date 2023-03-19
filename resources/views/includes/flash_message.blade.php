
  @if (session()->has('success'))
  <div class="alert alert-success" id="success-alert">
      <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
      {{ session()->get('success') }}

  </div>
@endif
@if (session()->has('error'))
  <div class="alert alert-danger" id="success-alert">
      <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
      {{ session()->get('error') }}
  </div>
@endif
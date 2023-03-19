/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!********************************************************************************!*\
  !*** ./resources/assets/datatables/js/documentFileContentTrackingDatatable.js ***!
  \********************************************************************************/
$(function () {
  //$.fn.dataTable.ext.errMode = 'none';
  /**
   * for datatable
   * */
  var currentColumns3 = [];
  // currentColumns.push({
  //     data: 'activate',
  //     name: 'activate',
  //     searchable: false,
  //     sortable: false,
  // });

  var thLen = $(".documentFileContentTrackingDatatable thead th").length;
  $(".documentFileContentTrackingDatatable thead th").each(function (index) {
    $(this).addClass("text-center align-middle");
    if (index >= 0 && index < thLen - 1) {
      var data = $(this).attr("dt-name");
      var col_type = $(this).attr("dt-type");
      if (col_type == "text") {
        $("#searchable-row3").append('<th class="text-center"><input type="text" class="text-center filter-table"/></th>');
      }
      if (col_type == "no_filter") {
        $("#searchable-row3").append('<th class="text-center"></th>');
      }
      if (col_type == "name") {
        $("#searchable-row3").append('<th class="text-center"><input type="text" class="text-center filter-table" style="width:130px"/></th>');
      }
      if (col_type == "date") {
        $("#searchable-row3").append("<th class=\"text-center\"><input type=\"text\" class=\"text-center filter-table date-range\" style=\"width:100px\"/></th>");
      }
      if (col_type == "select") {
        var select_options = $(this).attr("dt-options");
        if ($(this).attr("dt-enc") == "yes") {
          var select_options = atob($(this).attr("dt-options"));
        }
        select_options = select_options.replace(/\'/g, '"');
        var options = JSON.parse(select_options);
        var th_select = '<th class="text-center"><select dir="' + lang + '" type="text" class="select-custom text-center filter-table">';
        th_select += '<option value=""></option>';
        $.each(options, function (index, value) {
          th_select += '<option value="' + index + '">';
          th_select += value;
          th_select += "</option>";
        });
        th_select += "</select></th>";
        $("#searchable-row3").append(th_select);
        $(".select-custom").select2();
      }
      if (col_type == "forignkey") {
        var select_options = $(this).attr("dt-options");
        select_options = select_options.replace(/\'/g, '"');
        var _options = JSON.parse(select_options);
        var _th_select = '<th class="text-center"><select dir="' + lang + '" type="text" class="select-custom text-center filter-table">';
        _th_select += '<option value=""></option>';
        $.each(_options, function (index, value) {
          _th_select += '<option value="' + index + '">';
          _th_select += value;
          _th_select += "</option>";
        });
        _th_select += "</select></th>";
        $("#searchable-row3").append(_th_select);
        $(".select-custom").select2();
      }
      currentColumns3.push({
        data: data.toLowerCase(),
        name: data.toLowerCase()
      });
    } else {
      if (index == 0) {
        $("#searchable-row3").append('<th class="align-middle text-center"></th>');
      } else {
        $("#searchable-row3").append('<th class="align-middle text-center"><div style="width: 80px"></div></th>');
      }
    }
  });
  currentColumns3.push({
    data: "actions",
    name: "actions",
    searchable: false,
    sortable: false
  });
  // currentColumns.push({
  //     data: "files",
  //     name: "files",

  //     searchable: false,
  //     sortable: false,
  // });
  $(".documentFileContentTrackingDatatable").dataTable().fnDestroy();
  var table = $(".documentFileContentTrackingDatatable").DataTable({
    dom: "ltipr",
    processing: true,
    serverSide: false,
    info: true,
    language: {
      url: dataTablesLanguageLink
    },
    ajax: {
      url: dataTablesSearchLink3,
      type: "POST",
      headers: {
        'X-CSRF-TOKEN': csrf
      }
    },
    pageLength: 6,
    paging: true,
    columns: currentColumns3,
    order: [],
    createdRow: function createdRow(row, data, dataIndex, cells) {
      $(cells).addClass("text-center align-middle");
    }
  }); //end datatable

  //search datatable
  table.columns().eq(0).each(function (colIdx) {
    $(".filter-table", table.column(colIdx).header()).on("keyup change apply.daterangepicker cancel.daterangepicker", function (ev, picker) {
      if ($(this).hasClass("date-range")) {
        if (ev.type == "apply") {
          $(this).val(picker.startDate.format("DD/MM/YYYY HH:mm:ss"));
        } else {
          $(this).val("");
        }
      }
      table.column(colIdx).search(this.value).draw();
    });
  });
});
/******/ })()
;
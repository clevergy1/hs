﻿
$(function () {

    $(document).ready(function () {
        $("#pageOperation").empty();
        $('#Cod_Add').val('');
        $('#Descr_Add').val('');
        $('#marcamodello_Add').val('');
        $('#installationDate_Add').val('');

        $('.dpd1').datepicker({
            format: 'dd/mm/yyyy',
            language: localStorage.getItem("CurrentLanguage"),
            orientation: "top left"
        });

        Readhs();
        setlanguage();

        function Readhs() {
            var req = $.DataAccess.HeatingSystem_Read(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#hsDescr").text(data.DesImpianto + ' ' + data.Descr);
                }
            });
        }

        $('#btnAdd').on('click', function (e) {
            var hsId = localStorage.getItem('hsId'),
                Cod = $('#Cod_Add').val().trim(),
                Descr = $('#Descr_Add').val().trim(),
                marcamodello = $('#marcamodello_Add').val().trim(),
                installationDate = $('#installationDate_Add').val(),
                UserName = localStorage.getItem("OperatorName");
            if (chkAdd(hsId, Cod, Descr) == true) {
                var req = $.DataAccess.hs_Sca_header_Add(hsId, Cod, Descr, UserName, marcamodello, installationDate);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        var r = $.DataAccess.hs_Sca_header_ReadByCod(hsId, Cod);
                        r.success(function (json) {
                            var rrr = json.d;
                            if (rrr) {
                                localStorage.setItem("scaId", rrr.Id);
                                $.module.load('Impianti/Operators/hs_sca_detail_add');
                                loadhs_Elem(); //posta in common.js
                            }
                        });
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }
        }); //btnAdd


        function chkAdd(hsId, Cod, Descr) {
            var retVal = false;
            var error_present = false;

            if (!error_present) {
                if (Descr == '') {
                    error_present = true;
                    toastr["warning"](langResources['msg4descr'], langResources['alert']);
                }
            }

            if (!error_present) {
                var req = $.DataAccess.hs_Sca_header_ReadByCodSync(hsId, Cod);
                req.success(function (json) {
                    var data = json.d;
                    if (data) {
                        if (data.Id > 0) {
                            error_present = true;
                            toastr["warning"](langResources['msg4codepresent'], langResources['alert']);
                        }
                    }
                });
            }

            retVal = !error_present;
            return retVal;
        } //chkAdd

    }); //document ready

});
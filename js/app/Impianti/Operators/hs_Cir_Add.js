/*
Impianti Operators Manage Heating System Circulator Add
------------------------------------------*/
$(function () {

    $(document).ready(function () {
        $("#pageOperation").empty();
        $('#CirCod_Add').val('');
        $('#Descr_Add').val('');
        $('#NoteInterne_Add').val('');
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
                    $("#hsDescr").text(data.Descr);
                }
            });
        }

        $('#btnAdd').on('click', function (e) {
            var hsId = localStorage.getItem('hsId'),
                CirCod = $('#CirCod_Add').val(),
                CalDescr = $('#Descr_Add').val(),
                NoteInterne = $('#NoteInterne_Add').val(),
                marcamodello = $('#marcamodello_Add').val().trim(),
                installationDate = $('#installationDate_Add').val(),
                UserName = localStorage.getItem("OperatorName");

            if (chkAdd(hsId, CirCod, CalDescr) == true) {
                var req = $.DataAccess.hs_Cir_Add(hsId, CirCod, CalDescr, NoteInterne, UserName, marcamodello, installationDate);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        $.module.load('Impianti/Operators/Device8Cir');
                        loadhs_Elem(); //posta in common.js
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }
        }); //btnAdd


        function chkAdd(hsId, CirCod, CirDescr) {
            var retVal = false;
            var error_present = false;

            if (!error_present) {
                if (CirDescr == '') {
                    error_present = true;
                    toastr["warning"](langResources['msg4descr'], langResources['alert']);
                }
            }

            if (!error_present) {
                var req = $.DataAccess.hs_Cir_ReadByCirCodSync(hsId, CirCod);
                req.success(function (json) {
                    var data = json.d;
                    if (data) {
                        if (data.CirId>0) {
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
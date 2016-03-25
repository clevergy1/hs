/*
Impianti Operators Manage Heating System SDIN Electric power meter Add
------------------------------------------*/
$(function () {

    $(document).ready(function () {
        $("#pageOperation").empty();
        $('#Cod_Add').val('');
        $('#sn_Add').val('');
        $('#Descr_Add').val('');
        $('#marcamodello_Add').val('');
        $('#NoteInterne_Add').val('');
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
                sn = $('#sn_Add').val().trim(),
                Descr = $('#Descr_Add').val().trim(),
                marcamodello = $('#marcamodello_Add').val().trim(),
                installationDate = $('#installationDate_Add').val(),
                NoteInterne = $('NoteInterne_Add').val(),
                UserName = localStorage.getItem("OperatorName");

            if (chkAdd(hsId, Cod,sn, Descr) == true) {
                var req = $.DataAccess.cymt100_Add(hsId, Cod, Descr, sn, UserName, marcamodello, installationDate, NoteInterne);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        $.module.load('Impianti/Operators/Device8sdinAnz');
                        loadhs_Elem(); //posta in common.js
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }
        }); //btnAdd


        function chkAdd(hsId, Cod, sn, Descr) {
            var retVal = false;
            var error_present = false;

            if (!error_present) {
                if (Descr == '') {
                    error_present = true;
                    toastr["warning"](langResources['msg4descr'], langResources['alert']);
                }
            }

            if (!error_present) {
                if (sn == '') {
                    error_present = true;
                    toastr["warning"](langResources['msg4descr'], langResources['alert']);
                }
            }

            if (!error_present) {
                var req = $.DataAccess.cymt100_ReadByCodSync(hsId, Cod);
                req.success(function (json) {
                    var data = json.d;
                    if (data) {
                        if (data.Cod == Cod) {
                            error_present = true;
                            toastr["warning"](langResources['msg4codepresent'], langResources['alert']);
                        }
                    }
                });
            }

            if (!error_present) {
                var req = $.DataAccess.cymt100_ReadBysn(hsId, sn);
                req.success(function (json) {
                    var data = json.d;
                    if (data) {
                        if (data.sn == sn) {
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

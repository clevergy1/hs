/*
Impianti Operators Manage Heating System flowmeter Add
------------------------------------------*/
$(function () {
    $('.isNumeric').autoNumeric('init');

    $(document).ready(function () {
        $("#pageOperation").empty();
        $('#CtlCod_Add').val('');
        $('#Descr_Add').val('');
        $('#NoteInterne_Add').val('');
        $('#marcamodello_Add').val('');
        $('#installationDate_Add').val('');
        $('#Lxmin_Add').autoNumeric('set', 0);


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
                CtlCod = $('#CtlCod_Add').val().trim(),
                CtlDesc = $('#Descr_Add').val().trim(),
                marcamodello = $('#marcamodello_Add').val().trim(),
                installationDate = $('#installationDate_Add').val(),
                UserName = localStorage.getItem("OperatorName"),
                LxMin = $('#Lxmin_Add').autoNumeric('get');

            if (chkAdd(hsId, CtlCod, CtlDesc) == true) {
                var req = $.DataAccess.hs_Ctl_Add(hsId, CtlCod, CtlDesc, UserName, marcamodello, installationDate, LxMin);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        $.module.load('Impianti/Operators/Device8Ctl');
                        loadhs_Elem(); //posta in common.js
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }
        }); //btnAdd


        function chkAdd(hsId, CtlCod, CtlDesc) {
            var retVal = false;
            var error_present = false;

            if (!error_present) {
                if (CtlDesc == '') {
                    error_present = true;
                    toastr["warning"](langResources['msg4descr'], langResources['alert']);
                }
            }

            if (!error_present) {
                var req = $.DataAccess.hs_Ctl_ReadByCtlCodSync(hsId, CtlCod);
                req.success(function (json) {
                    var data = json.d;
                    if (data) {
                        if (data.CtlId > 0) {
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
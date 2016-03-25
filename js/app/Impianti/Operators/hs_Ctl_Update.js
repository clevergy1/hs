/*
Impianti Operators Manage Heating System flomwter Update
------------------------------------------*/
$(function () {

    $(document).ready(function () {
        $("#pageOperation").empty();
        $('#CtlCod_Upd').val('');
        $('#Descr_Upd').val('');
        $('#NoteInterne_Upd').val('');
        $('#marcamodello_Upd').val('');
        $('#installationDate_Upd').val('');
        $('#Lxmin_Upd').autoNumeric('set', 0);

        $('.dpd1').datepicker({
            format: 'dd/mm/yyyy',
            language: localStorage.getItem("CurrentLanguage"),
            orientation: "top left"
        });

        Readhs();
        ReadCtl();
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

        function ReadCtl() {
            var req = $.DataAccess.hs_Ctl_Read(localStorage.getItem("CtlId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#CtlCod_Upd').val(data.CtlCod);
                    $("#Descr_Upd").val(data.CtlDesc);
                    $("#Descr_Delete").text(data.CtlDesc);
                    $('#marcamodello_Upd').val(data.marcamodello);
                    if (moment(data.installationDate).year() > 1900) {
                        $('#installationDate_Upd').val(moment(data.installationDate).format('DD/MM/YYYY'));
                    }
                    else {
                        $('#installationDate_Upd').val('');
                    }
                    $('#Lxmin_Upd').autoNumeric('set', data.LxMin);
                }
            });
        }

        $('#btnUpd').on('click', function (e) {
            var hsId = localStorage.getItem('hsId'),
                CtlId = localStorage.getItem("CtlId"),
                CtlCod = $('#CtlCod_Upd').val(),
                CtlDesc = $('#Descr_Upd').val(),
                marcamodello = $('#marcamodello_Upd').val().trim(),
                installationDate = $('#installationDate_Upd').val(),
                UserName = localStorage.getItem("OperatorName"),
                LxMin = $('#Lxmin_Upd').autoNumeric('get');

            if (chkUpd(hsId, CtlId, CtlCod, CtlDesc) == true) {
                var req = $.DataAccess.hs_Ctl_Update(CtlId, CtlCod, CtlDesc, UserName, marcamodello, installationDate, LxMin);
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

        });

        function chkUpd(hsId, CtlId, CtlCod, CtlDesc) {
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
                        if (data.CtlId != CtlId) {
                            error_present = true;
                            toastr["warning"](langResources['msg4codepresent'], langResources['alert']);
                        }
                    }
                });
            }

            retVal = !error_present;
            return retVal;
        } //chkAdd

        $('#btnDelete').on('click', function (e) {
            $('body').removeClass('modal-open');
            $("#DeleteModal").modal('hide');

            setTimeout(function () {
                var req = $.DataAccess.hs_Ctl_Del(localStorage.getItem("CtlId"));
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        localStorage.removeItem("CtlId");
                        $.module.load('Impianti/Operators/Device8Ctl');
                        loadhs_Elem(); //posta in common.js
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }, 300);
        });

    }); //document ready

});
/*
Impianti Operators Manage Heating System servomotor Update
------------------------------------------*/
$(function () {

    $(document).ready(function () {
        $("#pageOperation").empty();
        $('#CronCod_Upd').val('');
        $('#Descr_Upd').val('');
        $('#NoteInterne_Upd').val('');
        $('#marcamodello_Upd').val('');
        $('#installationDate_Upd').val('');

        $('.dpd1').datepicker({
            format: 'dd/mm/yyyy',
            language: localStorage.getItem("CurrentLanguage"),
            orientation: "top left"
        });

        Readhs();
        ReadCron();
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

        function ReadCron() {
            var req = $.DataAccess.hs_Cron_Read(localStorage.getItem("CronId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#CronCod_Upd').val(data.CronCod);
                    $("#Descr_Upd").val(data.CronDescr);
                    $("#Descr_Delete").text(data.CronDescr);
                    $("#NoteInterne_Upd").val(data.NoteInterne);
                    $('#marcamodello_Upd').val(data.marcamodello);
                    if (moment(data.installationDate).year() > 1900) {
                        $('#installationDate_Upd').val(moment(data.installationDate).format('DD/MM/YYYY'));
                    }
                    else {
                        $('#installationDate_Upd').val('');
                    }
                }
            });
        }

        $('#btnUpd').on('click', function (e) {
            var hsId = localStorage.getItem('hsId'),
                CronId = localStorage.getItem("CronId"),
                CronCod = $('#CronCod_Upd').val(),
                CronDescr = $('#Descr_Upd').val(),
                NoteInterne = $('#NoteInterne_Upd').val(),
                marcamodello = $('#marcamodello_Upd').val().trim(),
                installationDate = $('#installationDate_Upd').val(),
                UserName = localStorage.getItem("OperatorName");

            if (chkUpd(hsId, CronId, CronCod, CronDescr) == true) {
                var req = $.DataAccess.hs_Cron_Update(CronId, CronCod, CronDescr, NoteInterne, UserName, marcamodello, installationDate,0);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        $.module.load('Impianti/supervisors/Device8Cron');
                        
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }

        });

        function chkUpd(hsId, CronId, CronCod, CronDescr) {
            var retVal = false;
            var error_present = false;

            if (!error_present) {
                if (CronDescr == '') {
                    error_present = true;
                    toastr["warning"](langResources['msg4descr'], langResources['alert']);
                }
            }

            if (!error_present) {
                var req = $.DataAccess.hs_Cron_ReadByCronCodSync(hsId, CronCod);
                req.success(function (json) {
                    var data = json.d;
                    if (data) {
                        if (data.CronId != CronId) {
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
                var req = $.DataAccess.hs_Cron_Del(localStorage.getItem("CronId"));
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        localStorage.removeItem("CronId");
                        $.module.load('Impianti/supervisors/Device8Cron');
                        
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }, 300);
        });

    }); //document ready

});
/*
Impianti Operators Manage Heating System probe Update
------------------------------------------*/
$(function () {

    $(document).ready(function () {
        $("#pageOperation").empty();
        $('#ProbeCod_Upd').val('');
        $('#ProbeDesc_Upd').val('');
        $('#NoteInterne_Upd').val('');
        $('#marcamodello_Upd').val('');
        $('#installationDate_Upd').val('');

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
            var req = $.DataAccess.hs_TemperatureProbes_Read(localStorage.getItem("ProbeId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#ProbeCod_Upd').val(data.ProbeCod);
                    $("#ProbeDesc_Upd").val(data.ProbeDesc);
                    $("#Descr_Delete").text(data.ProbeDesc);
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
                ProbeId = localStorage.getItem("ProbeId"),
                ProbeCod = $('#ProbeCod_Upd').val(),
                ProbeDesc = $('#ProbeDesc_Upd').val(),
                NoteInterne = $('#NoteInterne_Upd').val(),
                marcamodello = $('#marcamodello_Upd').val().trim(),
                installationDate = $('#installationDate_Upd').val(),
                UserName = localStorage.getItem("SupervisorName");

            if (chkUpd(hsId, ProbeId, ProbeCod, ProbeDesc) == true) {
                var req = $.DataAccess.hs_TemperatureProbes_Update(ProbeId, ProbeCod, ProbeDesc, UserName, marcamodello, installationDate, NoteInterne);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        $.module.load('Impianti/Supervisors/Device8TempProbe');
                        //loadhs_Elem(); //posta in common.js
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }

        });

        function chkUpd(hsId, ProbeId, ProbeCod, ProbeDesc) {
            var retVal = false;
            var error_present = false;

            if (!error_present) {
                if (ProbeDesc == '') {
                    error_present = true;
                    toastr["warning"](langResources['msg4descr'], langResources['alert']);
                }
            }

            if (!error_present) {
                var req = $.DataAccess.hs_TemperatureProbes_ReadByProbeCodSync(hsId, ProbeCod);
                req.success(function (json) {
                    var data = json.d;
                    if (data) {
                        if (data.ProbeId != ProbeId) {
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
                var req = $.DataAccess.hs_TemperatureProbes_Del(localStorage.getItem("ProbeId"));
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        localStorage.removeItem("ProbeId");
                        $.module.load('Impianti/Supervisors/Device8TempProbe');
                        
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }, 300);
        });

    }); //document ready

});
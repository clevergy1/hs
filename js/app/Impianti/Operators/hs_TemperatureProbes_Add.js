/*
Impianti Operators Manage Heating System probe Add
------------------------------------------*/
$(function () {

    $(document).ready(function () {
        $("#pageOperation").empty();
        $('#ProbeCod_Add').val('');
        $('#ProbeDesc_Add').val('');
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
                ProbeCod = $('#ProbeCod_Add').val().trim(),
                ProbeDesc = $('#ProbeDesc_Add').val().trim(),
                NoteInterne = $('#NoteInterne_Add').val(),
                marcamodello = $('#marcamodello_Add').val().trim(),
                installationDate = $('#installationDate_Add').val(),
                UserName = localStorage.getItem("OperatorName");

            if (chkAdd(hsId, ProbeCod, ProbeDesc) == true) {
                var req = $.DataAccess.hs_TemperatureProbes_Add(hsId, ProbeCod, ProbeDesc, UserName, marcamodello, installationDate, NoteInterne);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        $.module.load('Impianti/Operators/Device8TempProbe');
                        loadhs_Elem(); //posta in common.js
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }
        }); //btnAdd


        function chkAdd(hsId, ProbeCod, ProbeDesc) {
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
                        if (data.ProbeId > 0) {
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
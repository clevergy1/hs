/*
Impianti Operators Config Heating System Boiler 
------------------------------------------*/
$(function () {
    $('.isNumeric').autoNumeric('init');
    $('#TempoOn').autoNumeric('set', '0');
    $('#TempoOff').autoNumeric('set', '0');

    $(document).ready(function () {
        var $elementCode;
        $("#pageOperation").empty();

        Readhs();
        requestCalDelay();
        //ReadCal();
        //loadAssignedProbes();
        //loadAvailableProbes();
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

        function ReadCal() {
            var req = $.DataAccess.hs_Cal_Read(localStorage.getItem("IdCal"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $elementCode = data.CalCod;
                    $("#CalDescr").text(data.CalDescr);
                    $('#TempoOn').autoNumeric('set', data.TempoOn);
                    $('#TempoOff').autoNumeric('set', data.TempoOff);
                    loadAssignedProbes();
                    loadAssignedCronos();
                }
            });
        }

        /*
        Probes for boiler
        -----------------------------------------------------------------*/
        function loadAssignedProbes() {
            $("#assignedList").empty();
            var req = $.DataAccess.hs_TemperatureProbeElem_List(localStorage.getItem("hsId"), $elementCode);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplassignedList").tmpl(data).appendTo("#assignedList");
                    $("#assignedList").niceScroll({
                        cursorcolor: "#1FB5AD",
                        cursorborder: "0px solid #fff",
                        cursorborderradius: "0px",
                        cursorwidth: "3px"
                    });
                    loadAvailableProbes();
                }
                else {
                    loadAvailableProbes();
                }

            });
        }

        function loadAvailableProbes() {
            $("#availableList").empty();
            var req = $.DataAccess.hs_TemperatureProbes_List(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplavailableList").tmpl(data).appendTo("#availableList");
                    $("#availableList").niceScroll({
                        cursorcolor: "#1FB5AD",
                        cursorborder: "0px solid #fff",
                        cursorborderradius: "0px",
                        cursorwidth: "3px"
                    });

                    $("#assignedList li").each(function () {
                        var assigned = $(this).text().trim();
                        $("#availableList li").each(function () {
                            if ($(this).text().search(new RegExp(assigned, "i")) < 0) {
                                //console.log('trovato : ' + assigned);
                                //$(this).fadeOut();
                            } else {
                                //$(this).show();
                                $(this).fadeOut();
                            }
                        });
                    });

                }
            });
        }

        $.fnseleAvailProbe = function (ProbeCod) {
            var req = $.DataAccess.hs_TemperatureProbeElem_Add(localStorage.getItem("hsId"), $elementCode, ProbeCod);
            req.success(function (json) {
                loadAssignedProbes();
                //loadAvailableProbes();
            });
        }

        $.selassignedProbe = function (id) {
            var req = $.DataAccess.hs_TemperatureProbeElem_Del(id);
            req.success(function (json) {
                loadAssignedProbes();
                //loadAvailableProbes();
            });
        }
        /*---------------------------------------------------------------*/

        /*
        Cronos 
        -----------------------------------------------------------------*/
        function loadAssignedCronos() {
            $("#CronosassignedList").empty();
            var req = $.DataAccess.hs_CalCron_List(localStorage.getItem("IdCal"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplCronosassignedList").tmpl(data).appendTo("#CronosassignedList");
                    $("#CronosassignedList").niceScroll({
                        cursorcolor: "#1FB5AD",
                        cursorborder: "0px solid #fff",
                        cursorborderradius: "0px",
                        cursorwidth: "3px"
                    });
                    loadAvailableCronos();
                }
                else {
                    loadAvailableCronos();
                }
            });
        }

        function loadAvailableCronos() {
            $("#CronosavailableList").empty();
            var req = $.DataAccess.hs_Cron_List(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplCronosavailableList").tmpl(data).appendTo("#CronosavailableList");
                    $("#CronosavailableList").niceScroll({
                        cursorcolor: "#1FB5AD",
                        cursorborder: "0px solid #fff",
                        cursorborderradius: "0px",
                        cursorwidth: "3px"
                    });

                    $("#CronosassignedList li").each(function () {
                        var assigned = $(this).text().trim();
                        $("#CronosavailableList li").each(function () {
                            if ($(this).text().search(new RegExp(assigned, "i")) < 0) {
                                //console.log('trovato : ' + assigned);
                                //$(this).fadeOut();
                            } else {
                                //$(this).show();
                                $(this).fadeOut();
                            }
                        });
                    });

                }
            });
        }

        $.fn.seleAvailCrono = function (Id) {
            var req = $.DataAccess.hs_CalCron_Add(localStorage.getItem("IdCal"), Id, localStorage.getItem("OperatorName"));
            req.success(function (json) {
                loadAssignedCronos();
                //loadAvailableProbes();
            });
        }

        $.fn.selassignedCrono = function (Id) {
            var req = $.DataAccess.hs_CalCron_Del(Id);
            req.success(function (json) {
                loadAssignedCronos();
                //loadAvailableProbes();
            });
        }
        /*---------------------------------------------------------------*/

        /*
        parameters
        -----------------------------------------------------------------*/
        function requestCalDelay() {
            var r = $.DataAccess.hs_Cal_getDelayOnOff(localStorage.getItem("IdCal"));
            r.success(function (json) {
                ReadCal();
            });
        }

        $('#btnUpd').on('click', function () {
            var TempoOn = $('#TempoOn').autoNumeric('get'),
                TempoOff = $('#TempoOff').autoNumeric('get');
            var req1 = $.DataAccess.hs_Cal_setDelayOnOff(localStorage.getItem("IdCal"), TempoOn, TempoOff)
            req1.success(function (json) {
                var data = json.d;
                if (data == true) {
                    toastr["success"](langResources['msg4operationok'], langResources['yes']);
                }
                else {
                    toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                }
            });
        });
        /*---------------------------------------------------------------*/

    }); //document ready

});

/*
Probes 
-----------------------------------------------------------------*/
function seleAvailProbe(ProbeCod) {
    $.fnseleAvailProbe(ProbeCod);
}
function selassignedProbe(id) {
    $.selassignedProbe(id);
}
/*---------------------------------------------------------------*/




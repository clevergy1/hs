
$(function () {

    $(document).ready(function () {
        var $elementCode;
        $("#pageOperation").empty();

        Readhs();
        ReadSpl();
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

        function ReadSpl() {
            var req = $.DataAccess.hs_spl_Read(localStorage.getItem("SplId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $elementCode = data.Cod;
                    $("#Descr").text(data.Descr);
                    loadAssignedProbes();
                    loadAssignedCronos();
                }
            });
        }

        /*
        Probes for split
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
            var req = $.DataAccess.hs_SplCron_List(localStorage.getItem("SplId"));
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
            var req = $.DataAccess.hs_SplCron_Add(localStorage.getItem("SplId"), Id, localStorage.getItem("OperatorName"));
            req.success(function (json) {
                loadAssignedCronos();
                //loadAvailableProbes();
            });
        }

        $.fn.selassignedCrono = function (Id) {
            var req = $.DataAccess.hs_SplCron_Del(Id);
            req.success(function (json) {
                loadAssignedCronos();
                //loadAvailableProbes();
            });
        }
        /*---------------------------------------------------------------*/

    }); //document ready

});

function seleAvailProbe(ProbeCod) {
    $.fnseleAvailProbe(ProbeCod);
}
function selassignedProbe(id) {
    $.selassignedProbe(id);
}
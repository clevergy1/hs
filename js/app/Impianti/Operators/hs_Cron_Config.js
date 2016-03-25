/*
Impianti Operators Config Heating System Servomotor 
------------------------------------------*/
$(function () {

    $(document).ready(function () {
        var $elementCode;
        $("#pageOperation").empty();

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
                    $elementCode = data.CronCod;
                    $("#CronDescr").text(data.CronDescr);
                    loadAssignedProbes();
                    loadAssignedcymt200();
                }
            });
        }

        /*
        Probes
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
                                console.log('trovato : ' + assigned);
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
        SDIN Ambient sensors
        -----------------------------------------------------------------*/
        function loadAssignedcymt200() {
            $("#cymt200assignedList").empty();
            var req = $.DataAccess.cymt200Elem_List(localStorage.getItem("hsId"), $elementCode);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplcymt200assignedList").tmpl(data).appendTo("#cymt200assignedList");
                    $("#cymt200assignedList").niceScroll({
                        cursorcolor: "#1FB5AD",
                        cursorborder: "0px solid #fff",
                        cursorborderradius: "0px",
                        cursorwidth: "3px"
                    });
                    loadAvailablecymt200();
                }
                else {
                    loadAvailablecymt200();
                }

            });
        }

        function loadAvailablecymt200() {
            $("#cymt200availableList").empty();
            var req = $.DataAccess.cymt200_List(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplcymt200availableList").tmpl(data).appendTo("#cymt200availableList");
                    $("#cymt200availableList").niceScroll({
                        cursorcolor: "#1FB5AD",
                        cursorborder: "0px solid #fff",
                        cursorborderradius: "0px",
                        cursorwidth: "3px"
                    });

                    $("#cymt200assignedList li").each(function () {
                        var assigned = $(this).text().trim();
                        $("#availableList li").each(function () {
                            if ($(this).text().search(new RegExp(assigned, "i")) < 0) {
                                console.log('trovato : ' + assigned);
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

        $.fn.seleAvailcymt200 = function (ZTHLCod) {
            var req = $.DataAccess.cymt200Elem_Add(localStorage.getItem("hsId"), $elementCode, ZTHLCod);
            req.success(function (json) {
                loadAssignedcymt200();
                //loadAvailableProbes();
            });
        }

        $.fn.selassignedcymt200 = function (id) {
            var req = $.DataAccess.cymt200Elem_Del(id);
            req.success(function (json) {
                loadAssignedcymt200();
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
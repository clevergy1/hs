/*
Impianti Operators Config Heating System Boiler 
------------------------------------------*/
$(function () {

    $(document).ready(function () {
        var $elementCode;
        $("#pageOperation").empty();

        Readhs();
        ReadGru();
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

        function ReadGru() {
            var req = $.DataAccess.hs_Gru_Read(localStorage.getItem("IdhsGru"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $elementCode = data.GruCod;
                    $("#CalDescr").text(data.GruDescr);
                    loadAssigned();
                    loadAssignedProbes();
                }
            });
        }

        /*
        Caldaie per gruppo termico
        -----------------------------------------------------------------*/
        function loadAssigned() {
            $("#assignedCalList").empty();
            var req = $.DataAccess.hs_GruElem_List(localStorage.getItem("IdhsGru"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplassignedCalList").tmpl(data).appendTo("#assignedCalList");
                    $("#assignedCalList").niceScroll({
                        cursorcolor: "#1FB5AD",
                        cursorborder: "0px solid #fff",
                        cursorborderradius: "0px",
                        cursorwidth: "3px"
                    });
                    loadAvailable();
                }
                else {
                    loadAvailable();
                }

            });
        }

        function loadAvailable() {
            $("#availableCalList").empty();
            var req = $.DataAccess.hs_Cal_List(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplavailableCalList").tmpl(data).appendTo("#availableCalList");
                    $("#availableCalList").niceScroll({
                        cursorcolor: "#1FB5AD",
                        cursorborder: "0px solid #fff",
                        cursorborderradius: "0px",
                        cursorwidth: "3px"
                    });

                    $("#assignedCalList li").each(function () {
                        var assigned = $(this).text().trim();
                        console.log('assigned = ' + assigned);
                        $("#availableCalList li").each(function () {
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

        $.fnseleAvail = function (CalCod, CalId) {
            UserName = localStorage.getItem("OperatorName");
            var req = $.DataAccess.hs_GruElem_Add(localStorage.getItem("IdhsGru"), CalId, 'CAL', UserName);
            req.success(function (json) {
                loadAssigned();
            });
        }

        $.selassigned = function (id) {
            var req = $.DataAccess.hs_GruElem_Del(id);
            req.success(function (json) {
                loadAssigned();
            });
        }
        /*---------------------------------------------------------------*/


        /*
        sonde per gruppo termico
        -----------------------------------------------------------------*/
        function loadAssignedProbes() {
            $("#assignedSList").empty();
            var req = $.DataAccess.hs_TemperatureProbeElem_List(localStorage.getItem("hsId"), $elementCode);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplassignedSList").tmpl(data).appendTo("#assignedSList");
                    $("#assignedSList").niceScroll({
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
            $("#availableSList").empty();
            var req = $.DataAccess.hs_TemperatureProbes_List(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplavailableSList").tmpl(data).appendTo("#availableSList");
                    $("#availableSList").niceScroll({
                        cursorcolor: "#1FB5AD",
                        cursorborder: "0px solid #fff",
                        cursorborderradius: "0px",
                        cursorwidth: "3px"
                    });

                    $("#assignedSList li").each(function () {
                        var assigned = $(this).text().trim();
                        $("#availableSList li").each(function () {
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

    }); //document ready

});

function seleAvail(CalCod, CalId) { $.fnseleAvail(CalCod, CalId); }
function selassigned(id) { $.selassigned(id); }

function seleAvailProbe(ProbeCod) { $.fnseleAvailProbe(ProbeCod); }
function selassignedProbe(id) { $.selassignedProbe(id); }
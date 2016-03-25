
$(function () {

    $(document).ready(function () {
        var $elementCode;
        $("#pageOperation").empty();

        Readhs();
        Readhvac();
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

        function Readhvac() {
            var req = $.DataAccess.hs_hvac_Read(localStorage.getItem("Id"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $elementCode = data.Cod;
                    $("#CalDescr").text(data.Descr);
                    loadAssignedProbes();
                    loadAssignedCronos();
                    //loadAssignedCronographs();
                }
            });
        }

        /*
        co2
        -----------------------------------------------------------------*/
        function loadAssignedProbes() {
            $("#assignedList").empty();
            var req = $.DataAccess.hs_CoovElem_List(localStorage.getItem("hsId"), $elementCode);
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
            var req = $.DataAccess.hs_Coov_List(localStorage.getItem("hsId"));
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

        $.fn.seleAvail = function (ProbeCod) {
            var req = $.DataAccess.hs_CoovElem_Add(localStorage.getItem("hsId"), $elementCode, ProbeCod);
            req.success(function (json) {
                loadAssignedProbes();
                //loadAvailableProbes();
            });
        }

        $.fn.selassigned = function (id) {
            var req = $.DataAccess.hs_CoovElem_Del(id);
            req.success(function (json) {
                loadAssignedProbes();
                //loadAvailableProbes();
            });
        }
        /*---------------------------------------------------------------*/


        /*
         * Cronotermostati
         ----------------------------------------------------------------*/
        function loadAssignedCronos() {
            $("#CronosassignedList").empty();
            var req = $.DataAccess.hs_hvacCron_List(localStorage.getItem("Id"));
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
        
        $.fn.selAvailCrono = function (Id) {
            var req = $.DataAccess.hs_hvacCron_Add(localStorage.getItem("Id"), Id, localStorage.getItem("OperatorName"));
            req.success(function (json) {
                loadAssignedCronos();
                //loadAvailableProbes();
            });
        }

        $.fn.selassignedCrono = function (Id) {
            var req = $.DataAccess.hs_hvacCron_Del(Id);
            req.success(function (json) {
                loadAssignedCronos();
                //loadAvailableProbes();
            });
        }
        /*---------------------------------------------------------------*/

        /*
         * Cronografi
         ----------------------------------------------------------------*/
        function loadAssignedCronographs() {
            $("#cronographsassignedList").empty();
            var req = $.DataAccess.hs_hvacCron_List(localStorage.getItem("Id"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplCronographassignedList").tmpl(data).appendTo("#cronographsassignedList");
                    $("#cronographsassignedList").niceScroll({
                        cursorcolor: "#1FB5AD",
                        cursorborder: "0px solid #fff",
                        cursorborderradius: "0px",
                        cursorwidth: "3px"
                    });
                    loadAvailableCronographs();
                }
                else {
                    loadAvailableCronographs();
                }
            });
        }

        function loadAvailableCronographs() {
            $("#cronographsavailableList").empty();
            var req = $.DataAccess.hs_Cron_ListOnOff(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplCronographavailableList").tmpl(data).appendTo("#cronographsavailableList");
                    $("#cronographsavailableList").niceScroll({
                        cursorcolor: "#1FB5AD",
                        cursorborder: "0px solid #fff",
                        cursorborderradius: "0px",
                        cursorwidth: "3px"
                    });

                    $("#cronographsassignedList li").each(function () {
                        var assigned = $(this).text().trim();
                        $("#cronographsavailableList li").each(function () {
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

        $.fn.selAvailCronograph = function (Id) {
            var req = $.DataAccess.hs_hvacCron_Add(localStorage.getItem("Id"), Id, localStorage.getItem("OperatorName"));
            req.success(function (json) {
                loadAssignedCronographs();
                //loadAvailableProbes();
            });
        }

        $.fn.selassignedCronograph = function (Id) {
            var req = $.DataAccess.hs_hvacCron_Del(Id);
            req.success(function (json) {
                loadAssignedCronographs();
                //loadAvailableProbes();
            });
        }
        /*---------------------------------------------------------------*/
    }); //document ready

});


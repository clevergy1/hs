$(function () {

    $(document).ready(function () {
        var $elementCode;
        $("#pageOperation").empty();

        Readhs();
        ReadLux();
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

        function ReadLux() {
            var req = $.DataAccess.Lux_Read(localStorage.getItem("Id"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $elementCode = data.Cod;
                    $("#LuxDesc").text(data.Descr);
                    loadAssignedAstrs();
                    loadAssignedCronos();
                }
            });
        }



        /*
         * Cron
         ----------------------------------------------------------------*/
        function loadAssignedCronos() {
            $("#CronosassignedList").empty();
            var req = $.DataAccess.LuxCron_List(localStorage.getItem("Id"));
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
            var req = $.DataAccess.hs_Cron_ListOnOff(localStorage.getItem("hsId"));
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
            var req = $.DataAccess.LuxCron_Add(localStorage.getItem("Id"), Id, localStorage.getItem("OperatorName"));
            req.success(function (json) {
                loadAssignedCronos();
                //loadAvailableProbes();
            });
        }

        $.fn.selassignedCrono = function (Id) {
            var req = $.DataAccess.LuxCron_Del(Id);
            req.success(function (json) {
                loadAssignedCronos();
                //loadAvailableProbes();
            });
        }
        /*---------------------------------------------------------------*/

        /*
        * Astrs
         ----------------------------------------------------------------*/
        function loadAssignedAstrs() {
            $("#AstrsassignedList").empty();
            var req = $.DataAccess.LuxAstr_List(localStorage.getItem("Id"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplAstrsassignedList").tmpl(data).appendTo("#AstrsassignedList");
                    $("#AstrsassignedList").niceScroll({
                        cursorcolor: "#1FB5AD",
                        cursorborder: "0px solid #fff",
                        cursorborderradius: "0px",
                        cursorwidth: "3px"
                    });
                    loadAvailableAstrs();
                }
                else {
                    loadAvailableAstrs();
                }
            });
        }

        function loadAvailableAstrs() {
            $("#AstrsavailableList").empty();
            var req = $.DataAccess.hs_Astr_List(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplAstrsavailableList").tmpl(data).appendTo("#AstrsavailableList");
                    $("#AstrsavailableList").niceScroll({
                        cursorcolor: "#1FB5AD",
                        cursorborder: "0px solid #fff",
                        cursorborderradius: "0px",
                        cursorwidth: "3px"
                    });

                    $("#AstrsassignedList li").each(function () {
                        var assigned = $(this).text().trim();
                        $("#AstrsavailableList li").each(function () {
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


        $.fn.selAvailAstr = function (Id) {
            var req = $.DataAccess.LuxAstr_Add(localStorage.getItem("Id"), Id, localStorage.getItem("OperatorName"));
            req.success(function (json) {
                loadAssignedAstrs();
            });
        }

        $.fn.selassignedAstr = function (Id) {
            var req = $.DataAccess.LuxAstr_Del(Id);
            req.success(function (json) {
                loadAssignedAstrs();
            });
        }
        /*---------------------------------------------------------------*/

    }); //document ready

});
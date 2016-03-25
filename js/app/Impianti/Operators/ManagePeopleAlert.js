
$(function () {

    $(document).ready(function () {
        Readhs();

        loadAssigned();

        function Readhs() {
            var req = $.DataAccess.HeatingSystem_Read(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#hsDescr").text(data.Descr);
                }
            });
        }

        function loadAssigned() {
            $("#assignedList").empty();
            var req = $.DataAccess.hs_UserAlert_List(localStorage.getItem("hsId"));
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
                    loadAvailable();
                }
                else {
                    loadAvailable();
                }

            });
        }

        function loadAvailable() {
            $("#availableList").empty();
            var req = $.DataAccess.Impianti_Contatti_List(localStorage.getItem("IdImpianto"));
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

        $.fn.seleAvail = function (IdContatto) {
            var req = $.DataAccess.hs_UserAlert_Add(localStorage.getItem("hsId"), IdContatto);
            req.success(function (json) {
                loadAssigned();
                //loadAvailableProbes();
            });
        }

        $.fn.selassigned = function (id) {
            var req = $.DataAccess.hs_UserAlert_Del(id);
            req.success(function (json) {
                loadAssigned();
                //loadAvailableProbes();
            });
        }

    }); // document ready

});

function seleAvail(IdContatto) {
    $.fn.seleAvail(IdContatto);
}
function selassigned(id) {
    $.fn.selassigned(id);
}

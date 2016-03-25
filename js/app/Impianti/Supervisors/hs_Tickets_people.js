

$(function () {

    $(document).ready(function () {
        Readhs();

        loadRequester();
        loadExecutor()

        function Readhs() {
            var req = $.DataAccess.HeatingSystem_Read(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#hsDescr").text(data.Descr);
                }
            });
        }  

        /*----------------------REQUESTER------------------------------------*/


        function loadRequester() {
            $("#ListRequester").empty();
            var req = $.DataAccess.hs_Tickets_Requesters_List(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplListRequester").tmpl(data).appendTo("#ListRequester");
                    $("#ListRequester").niceScroll({
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

                    $("#ListRequester li").each(function () {
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
            var req = $.DataAccess.hs_Tickets_Requesters_Add(localStorage.getItem("hsId"), IdContatto);
            req.success(function (json) {
                loadRequester();
               
            });
        }



        $.fn.selrequester = function (id) {
            var req = $.DataAccess.hs_Tickets_Requesters_Del(id);
            req.success(function (json) {
                loadRequester();
               
            });
        }

        /*----------------------EXECUTOR------------------------------------*/

        function loadExecutor() {
            $("#ListExecutor").empty();
            var req = $.DataAccess.hs_Tickets_Executors_List(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplListExecutor").tmpl(data).appendTo("#ListExecutor");
                    $("#ListExecutor").niceScroll({
                        cursorcolor: "#1FB5AD",
                        cursorborder: "0px solid #fff",
                        cursorborderradius: "0px",
                        cursorwidth: "3px"
                    });
                    loadAvailable2();
                }
                else {
                    loadAvailable2();
                }

            });
        }

        function loadAvailable2() {
            $("#availableList2").empty();
            var req = $.DataAccess.Impianti_Contatti_List(localStorage.getItem("IdImpianto"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplavailableList2").tmpl(data).appendTo("#availableList2");
                    $("#availableList2").niceScroll({
                        cursorcolor: "#1FB5AD",
                        cursorborder: "0px solid #fff",
                        cursorborderradius: "0px",
                        cursorwidth: "3px"
                    });

                    $("#ListExecutor li").each(function () {
                        var assigned = $(this).text().trim();
                        $("#availableList2 li").each(function () {
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

        $.fn.seleAvail2 = function (IdContatto) {
            var req = $.DataAccess.hs_Tickets_Executors_Add(localStorage.getItem("hsId"), IdContatto);
            req.success(function (json) {
                loadExecutor();

            });
        }



        $.fn.selexecutor = function (id) {
            var req = $.DataAccess.hs_Tickets_Executors_Del(id);
            req.success(function (json) {
                loadExecutor();

            });
        }


    }); // document ready

});

function seleAvail(IdContatto) {
    $.fn.seleAvail(IdContatto);
}

function seleAvail2(IdContatto) {
    $.fn.seleAvail2(IdContatto);
}

function selrequester(id) {
    $.fn.selrequester(id);
}
function selexecutor(id) {
    $.fn.selexecutor(id);
}





 
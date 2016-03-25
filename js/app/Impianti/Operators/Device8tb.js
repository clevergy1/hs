
$(function () {
    $(document).ready(function () {

        /*
        signalR
        ----------------------------------------------*/
        $.fn.received_hs_tb_setValue = function (hsId, Cod, currentValue) {
            if (localStorage.getItem("hsId") == hsId) {
                $('#currentValue_' + Cod).text(Number(currentValue).toLocaleString());
            }
        }
        /*--------------------------------------------*/

        Readhs();
        loadtb();
        setlanguage();

        function Readhs() {
            $("#ListPlants").empty();
            var req = $.DataAccess.HeatingSystem_Read(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#hsDescr").text(data.DesImpianto + ' ' + data.Descr);
                }
            });
        }

        function loadProbeElem(elementCode) {
            $("#sList_" + elementCode).empty();
            var r = $.DataAccess.hs_TemperatureProbeElem_List(localStorage.getItem("hsId"), elementCode);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplProbeElem").tmpl(data).appendTo("#sList_" + elementCode);
                    setlanguage();
                }
            });
        }

        /*
        termostati di blocco
        ------------------------------------------------------------------------*/
        $('#btnCallAddtbs').on('click', function (e) {
            $.module.load('Impianti/Operators/hs_tb_Add');
        });

        function loadtb() {
            $("#tbsList").empty();
            var r = $.DataAccess.hs_tb_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmpltbs").tmpl(data).appendTo("#tbsList");
                    $('.tabletbs').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }

        $.fn.callUpdatetbs = function (tbId) {
            localStorage.setItem("tbId", tbId);
            $.module.load('Impianti/Operators/hs_tb_Update');
        }

        /* Replacements
        ------------------------------------------------------------------------*/
        $.fn.callReplacements = function (Id) {
            localStorage.setItem("ParentId", Id);
            $.module.load('Impianti/Operators/hs_tb_Replacements');
        }
        /*----------------------------------------------------------------------*/

    }); //document ready
});
function callUpdatetbs(id) { $.fn.callUpdatetbs(id); }
function callErrorLog(Cod) { $.fn.callErrorLog(Cod); }

$(function () {
    $(document).ready(function () {


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

        Readhs();
        LoadControllers();

        /*
        Controller
        -------------------------------------------------------------------------*/
        function LoadControllers() {
            $("#ListControllers").empty();
            var r = $.DataAccess.hs_Controller_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplListControllers").tmpl(data).appendTo("#ListControllers");
                    $('.tableContollers').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }

        $('#btnCallAddController').on('click', function (e) {
            $.module.load('Impianti/Operators/hs_Controller_Add');
        });

        $.fn.sel = function (ControllerId) {
            localStorage.setItem("ControllerId", ControllerId);
            $.module.load('Impianti/Operators/hs_Controller_Detail');
        }

        $.fn.callUpdateController = function (ControllerId) {
            localStorage.setItem("ControllerId", ControllerId);
            $.module.load('Impianti/Operators/hs_Controller_Update');
        }
        /*----------------------------------------------------------------------*/

    }); //document ready
});
function sel(ControllerId) {
    $.fn.sel(ControllerId);
}
function callUpdateController(ControllerId) {
    $.fn.callUpdateController(ControllerId);
}
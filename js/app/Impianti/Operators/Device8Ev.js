
$(function () {

    $(document).ready(function () { }); //document ready

    Readhs();
    loadEvs();
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

    /*
    Elettrovalvole
    ---------------------------------------------------------------------------*/
    function loadEvs() {
        $("#EvsList").empty();
        var r = $.DataAccess.hs_Ev_List(localStorage.getItem("hsId"));
        r.success(function (json) {
            var data = json.d;
            if (data) {
                $("#tmplEvsList").tmpl(data).appendTo("#EvsList");
                setlanguage();
            }
        });
    }

    $('#btnCallAdd').on('click', function (e) {
        $.module.load('Impianti/Operators/hs_Ev_Add');
    });

    $.fn.callUpdate = function (Id) {
        localStorage.setItem("EvId", Id);
        $.module.load('Impianti/Operators/hs_Ev_Update');
    }

    /*-------------------------------------------------------------------------*/

});
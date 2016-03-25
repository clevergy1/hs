/*
Supervisor - installation list
-----------------------------------------------------------*/
$(function () {

    $(document).ready(function () {
        $.rt.stop();

        $('#usermenu').empty();
        $('#ApplicationTitle').html('<span name="lbl" caption="currentInstallations">Current installations</span>');
        $("#pageOperation").empty();
        $("#tmplpageOperation").tmpl(null).appendTo("#pageOperation");

        /*
        Tabella impianti
        -------------------------------------------------------------*/
        $('.tableImpianti').footable();
        $('.footable').data('page-size', 20);
        $('.footable').data('limit-navigation', 4);
        $('.footable').trigger('footable_initialized');
        loadImpianti('');

        function loadImpianti(searchString) {
            //console.log("loadImpianti");
            $("#ListImpianti").empty();
            var r = $.DataAccess.Impianti_ListByUser(localStorage.getItem("keyS"), searchString);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplImpiantiList").tmpl(data).appendTo("#ListImpianti");
                    $('table').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }

        $('#siteSearch').on('keyup', function (e) {
            var filter = $(this).val();
            if (filter.length > 2) {
                loadImpianti(filter);
            }
            if (filter.length == 0) {
                loadImpianti('');
            }
        });

        $.fn.selImpianto = function (IdImpianto) {
            localStorage.setItem("IdImpianto", IdImpianto);            
            $.module.load('Impianti/Supervisors/MasterDevices')
        }

        $.fn.detailImpianto = function (IdImpianto) {
            localStorage.setItem("IdImpianto", IdImpianto);
            $.module.load('Impianti/Supervisors/Impianto_Detail');
        }

    }); //document ready

});

function selImpianto(IdImpianto) {
    $.fn.selImpianto(IdImpianto);
}
function detailImpianto(IdImpianto) {
    $.fn.detailImpianto(IdImpianto);
}
/*
Impianti Operators List
------------------------------------------*/
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

        loadImpianti('');

        $('#btnCallAdd').on('click', function () {            
            $.module.load('Impianti/Operators/Add');
        });
        
        $.fn.selImpianto = function (IdImpianto) {            
            localStorage.setItem("IdImpianto", IdImpianto);
            //loadNavigationBar();
            //$.rt.load();            
            $.module.load('Impianti/Operators/Detail');
            
        }


        function loadImpianti(searchString) {
            //console.log("loadImpianti");
            $("#ListImpianti").empty();
            var r = $.DataAccess.Impianti_List(searchString);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplImpiantiList").tmpl(data).appendTo("#ListImpianti");                    
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

    }); //document ready




});

function selImpianto(IdImpianto) {
    $.fn.selImpianto(IdImpianto);
}






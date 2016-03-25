$(function () {
    $(document).ready(function () {
        //$('.tableProbes').footable();
        //$('.tableProbes').data('page-size', 30);
        //$('.tableProbes').data('limit-navigation', 4);
        //$('.tableProbes').trigger('footable_initialized');

        /*
        signalR
        ----------------------------------------------*/
        $.fn.received_hs_TemperatureProbes_setValue = function (hsId, ProbeCod, currentValue) {
            console.log('received_hs_TemperatureProbes_setValue', hsId, ProbeCod, currentValue);
            if (localStorage.getItem("hsId") == hsId) {
                $('#btnrequestLog').show();
                $('#currentValue_' + ProbeCod).text(Number(currentValue).toLocaleString()+'° C');
            }
        }
        /*--------------------------------------------*/

        Readhs();
        loadProbes();
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
        Probes
        ------------------------------------------------------------------------*/
        $('#btnCallAddProbe').on('click', function (e) {
            $.module.load('Impianti/supervisors/hs_TemperatureProbes_Add');
        });

        $('#btnrequestLog').on('click', function () {
            //setTimeout(function () { $.rt.start(); }, 1000);
            console.log('btnrequestLog');
            $.DataAccess.HeatingSystem_requestLog(localStorage.getItem("hsId"));
            $('#btnrequestLog').hide();
        });

        function loadProbes() {
            $("#ProbesList").empty();
            var r = $.DataAccess.hs_TemperatureProbes_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplProbes").tmpl(data).appendTo("#ProbesList");
                    $('.tableProbes').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }

        $.fn.callUpdateProbe = function (ProbeId) {
            localStorage.setItem("ProbeId", ProbeId);
            $.module.load('Impianti/supervisors/hs_TemperatureProbes_Update');
        }

        $.fn.logProbe = function (ProbeCod) {
            localStorage.setItem("ProbeCod", ProbeCod);
            $.module.load('Impianti/supervisors/hs_Probe_log');
        }
        /*----------------------------------------------------------------------*/

        /*
        Error codes
        ------------------------------------------------------------------------*/
        var $errorRowNumber0;
        $.fn.callErrorLog = function (Cod) {
            $errorRowNumber = 0
            $('#Cod').text(Cod);
            $("#ListErrorLog").empty();
            $('#Errors').show();
            loadErrorLog();
        }
        $('#closeErrors').on('click', function () {
            $('#Errors').hide();
        });

        function loadErrorLog( ) {
            var req = $.DataAccess.hs_ErrorLog_ListByElement(localStorage.getItem("hsId"), $('#Cod').text(), $errorRowNumber);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    //for (var i = 0; i < data.length; i++) {
                    //    data[i].LogDate = moment(data[i].LogDate).format('DD/MM/YYYY HH:mm');
                    //}//end for
                    $("#tmplListErrorLog").tmpl(data).appendTo("#ListErrorLog");
                    var o = [{ id: $errorRowNumber }];
                    $("#tmplListErrorLogLastItem").tmpl(o).appendTo("#ListErrorLog");
                    $('.tableErrorLog').trigger('footable_redraw');
                    $errorRowNumber = $errorRowNumber + 100;
                }
            });
        }

        $('#panel-body-ListErrorLog').scroll(function (e) {
            if (e) {
                e.stopPropagation();
                e.preventDefault();
            }
            if ($('#loadMore').length) {
                try {
                    //console.log("'$('#loadMore').offset().top=" + $('#loadMore').offset().top);
                    if ($(window).scrollTop() + $(window).height() >= $('#loadMore').offset().top) {
                        $('#loadMore').remove();
                        loadErrorLog();
                    }
                }
                catch (err) {
                    console.log(err);
                }
            }

        });
        /*----------------------------------------------------------------------*/

        /* Replacements
        ------------------------------------------------------------------------*/
        $.fn.callReplacements = function (Id) {
            localStorage.setItem("ParentId", Id);
            $.module.load('Impianti/supervisors/hs_TemperatureProbes_Replacements');
        }
        /*----------------------------------------------------------------------*/



    }); //document ready
});
function callUpdateProbe(ProbeId) {
    $.fn.callUpdateProbe(ProbeId);
}
function logProbe(ProbeCod) {
    $.fn.logProbe(ProbeCod);
}

function callErrorLog(Cod) { $.fn.callErrorLog(Cod); }

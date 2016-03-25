
$(function () {

    $(document).ready(function () {
        $('.tableCirculators').footable();
        $('.tableCirculators').data('page-size', 300);
        $('.tableCirculators').data('limit-navigation', 4);
        $('.tableCirculators').trigger('footable_initialized');

        /*
        signalR
        ----------------------------------------------*/
        $.fn.received_hs_Cir_setStatus = function (hsId, CirCod, isRunning, stato) {
            if (localStorage.getItem("hsId") == hsId) {
                statusChanged('#Cirstato_' + CirCod, stato);
                $('#isRunning_' + CirCod).text(isRunning);
            }
        }
        $.fn.received_hs_Cir_setManualMode = function (hsId, CirCod, ManualMode) {
            if (localStorage.getItem("hsId") == hsId) {
                if (ManualMode == true) {
                    $('#CirManualMode_' + CirCod).html('<i class="fa fa-check-square-o"></i>');
                }
                else {
                    $('#CirManualMode_' + CirCod).html('<i class="fa fa-square-o"></i>');
                }
            }
        }
        /**/
        function statusChanged(elem, stato) {
            if (stato == 0) {
                $(elem).html('<i class="fa fa-thumbs-o-up"></i>');
            }
            else {
                if (stato == 1) {
                    $(elem).html('<img src="images/status1.png" style="height:24px;width:24px" />');
                }
                else {
                    $(elem).html('<img src="images/status2.png" style="height:24px;width:24px" />');
                }
            }
        }
        /**/
        /*--------------------------------------------*/

        Readhs();
        loadCirculators();
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
                    $('.tableProbeElem').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }

        /*
        Circulators
        ------------------------------------------------------------------------*/
        $('#btnCallAddCir').on('click', function (e) {
            $.module.load('Impianti/Operators/hs_Cir_Add');
        });

        function loadCirculators() {
            $("#CirculatorsList").empty();
            var r = $.DataAccess.hs_Cir_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplCirculatorsList").tmpl(data).appendTo("#CirculatorsList");
                    $('.tableCirculators').trigger('footable_redraw');
                    setlanguage();
                    for (var i = 0; i < data.length; i++) { loadProbeElem(data[i].CirCod) }
                }
            });
        }

        $.fn.callUpdateCir = function (CirId) {
            localStorage.setItem("CirId", CirId);
            $.module.load('Impianti/Operators/hs_Cir_Update');
        }

        $.fn.callconfigCir = function (CirId) {
            localStorage.setItem("CirId", CirId);
            $.module.load('Impianti/Operators/hs_Cir_Config');
        }

        $.fn.logCir = function (CirCod) {
            localStorage.setItem("CirCod", CirCod);
            $.module.load('Impianti/Operators/hs_Cir_log');
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
            loadErrorLog();
        }
        $('#closeErrors').on('click', function () {
            $('#Errors').hide();
            $('#list').show();
        });

        function loadErrorLog() {
            var req = $.DataAccess.hs_ErrorLog_ListByElement(localStorage.getItem("hsId"), $('#Cod').text(), $errorRowNumber);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplListErrorLog").tmpl(data).appendTo("#ListErrorLog");
                    if (data.length > 99) {
                        var o = [{ id: $errorRowNumber }];
                        $("#tmplListErrorLogLastItem").tmpl(o).appendTo("#ListErrorLog");
                        $errorRowNumber = $errorRowNumber + 100;
                    }
                    $('#Errors').show();
                    $('#list').hide();
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
            $.module.load('Impianti/Operators/hs_Cir_Replacements');
        }
        /*----------------------------------------------------------------------*/

        /**/
        $.fn.callChangeCurrentProfile = function (CirId) {
            localStorage.setItem("CirId", CirId);
            $.module.load('Impianti/Operators/ChangeCirCurrentProfile');
        }
        /**/

    }); //document ready

});

function callUpdateCir(CirId) {
    $.fn.callUpdateCir(CirId);
}
function callconfigCir(CirId) {
    $.fn.callconfigCir(CirId);
}
function logCir(CirCod) {
    $.fn.logCir(CirCod);
}
function CallShowErrorLog(CirCod) { $.fn.callErrorLog(CirCod); }
function callErrorLog(Cod) {    $.fn.callErrorLog(Cod);}
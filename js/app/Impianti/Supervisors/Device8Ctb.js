
$(function () {
    $(document).ready(function () {
        $('.tableCtb').footable();
        $('.tableCtb').data('page-size', 3000);
        $('.tableCtb').data('limit-navigation', 4);
        $('.tableCtb').trigger('footable_initialized');

        /*
        signalR
        ----------------------------------------------*/
        $.fn.received_hs_Ctb_setValue=function(hsId, CtbCod, Tsend, Tret, Flowrate, Power, EnergyCounter, stato) {
            if (localStorage.getItem("hsId") == hsId) {
                $('#btnrequestLog').show();
                statusChanged('#stato_' + CtbCod, stato);
                $('#Tsend_' + CtbCod).text(Tsend +'°C');
                $('#Tret_' + CtbCod).text(Tret + '°C');
                $('#Flowrate_' + CtbCod).text(Flowrate + ' m3/h');
                $('#EnergyCounter_' + CtbCod).text(EnergyCounter +' W');
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

        $('#mainTable').floatThead({
            scrollContainer: function ($table) {
                return $table.closest('.panel-body');
            }
        });

        Readhs();
        loadCtb();
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
        Meters
        ------------------------------------------------------------------------*/
        $('#btnCallAddCtb').on('click', function (e) {
            $.module.load('Impianti/supervisors/hs_Ctb_Add');
        });

        $('#btnrequestLog').on('click', function () {
            $.DataAccess.HeatingSystem_requestLog(localStorage.getItem("hsId"));
            $('#btnrequestLog').hide();
        });

        function loadCtb() {
            $("#CtbList").empty();
            var r = $.DataAccess.hs_Ctb_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplCtb").tmpl(data).appendTo("#CtbList");
                    $('.tableCtb').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }

        $.fn.callUpdateCtb = function (CtbId) {
            localStorage.setItem("CtbId", CtbId);
            $.module.load('Impianti/supervisors/hs_Ctb_Update');
        }

        $.fn.log = function (CtbCod) {
            localStorage.setItem("CtbCod", CtbCod);
            $.module.load('Impianti/supervisors/hs_ctb_log');
        }
        /*----------------------------------------------------------------------*/

        /*
        Error codes
        ------------------------------------------------------------------------*/
        var $errorRowNumber0;
        $.fn.callErrorLog = function (Cod) {
            console.log('callErrorLog');
            $errorRowNumber = 0
            $('#Cod').text(Cod);
            $("#ListErrorLog").empty();
            $('#Errors').show();
            loadErrorLog();
        }
        $('#closeErrors').on('click', function () {
            $('#Errors').hide();
        });

        function loadErrorLog() {
            var req = $.DataAccess.hs_ErrorLog_ListByElement(localStorage.getItem("hsId"), $('#Cod').text(), $errorRowNumber);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#tableErrors').floatThead({
                        scrollContainer: function ($table) {
                            return $table.closest('.panel-body');
                        }
                    });
                    $("#tmplListErrorLog").tmpl(data).appendTo("#ListErrorLog");
                    if (data.length > 99) {
                        var o = [{ id: $errorRowNumber }];
                        $("#tmplListErrorLogLastItem").tmpl(o).appendTo("#ListErrorLog");
                        $errorRowNumber = $errorRowNumber + 100;
                    }
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
            $.module.load('Impianti/supervisors/hs_Ctb_Replacements');
        }
        /*----------------------------------------------------------------------*/

    }); //document ready
});

function callUpdateCtb(CtbId) {
    $.fn.callUpdateCtb(CtbId);
}
function callErrorLog(Cod) { $.fn.callErrorLog(Cod); }
function log(Cod) {   $.fn.log(Cod);}
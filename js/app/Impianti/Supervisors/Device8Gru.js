
$(function () {

    $(document).ready(function () {
        //$('.tableGrus').footable();
        //$('.tableGrus').data('page-size', 300);
        //$('.tableGrus').data('limit-navigation', 4);
        //$('.tableGrus').trigger('footable_initialized');


        /*
        signalR
        ----------------------------------------------*/
        $.fn.received_hs_Gru_setStatus = function (hsId, GruCod) {
            console.log('received_hs_Gru_setStatus', hsId, GruCod)
            if (localStorage.getItem("hsId") == hsId) {
                $('#btnrequestLog').show();
                ReadGru(GruCod);
                //statusChanged('#stato_' + GruCod, stato);
                //if (Number(SetPoint) > 1000) {
                //    $('#SetPoint_' + GruCod).text(SetPoint);
                //}
                //else {
                //    $('#SetPoint_' + GruCod).text('--');
                //}
                //$('#isRunning_' + GruCod).text(isRunning);
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

        function loadGruElem(GruId, GruCode) {
            $("#sList_" + GruCode).empty();
            var r = $.DataAccess.hs_GruElem_List(GruId);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplGruElem").tmpl(data).appendTo("#sList_" + GruCode);
                    $('.tableGruElem').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }


        Readhs();
        LoadhsGrus();

        /*
        Gruppo termici
        -------------------------------------------------------------------------*/
        function ReadGru(GruCod) {
            var req = $.DataAccess.hs_Gru_ReadByGruCod(localStorage.getItem("hsId"), GruCod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    statusChanged('#Calstato_' + GruCod, data.stato);
                    $('#SetPoint_' + data.GruCod).text(data.SetPoint + '°C');
                    $('#isRunning_' + data.GruCod).text(data.isRunning + '%');
                }
            });
        }

        $('#btnAddhsGru').on('click', function (e) {
            $.module.load('Impianti/supervisors/hs_Gru_Add');
        });

        $('#btnrequestLog').on('click', function () {
            //setTimeout(function () { $.rt.start(); }, 1000);
            console.log('btnrequestLog');
            $.DataAccess.HeatingSystem_requestLog(localStorage.getItem("hsId"));
            $('#btnrequestLog').hide();
        });
    
        function LoadhsGrus() {
            $("#hsGrusList").empty();
            var r = $.DataAccess.hs_Gru_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplhs_grusList").tmpl(data).appendTo("#hsGrusList");
                    $('.tableGrus').trigger('footable_redraw');
                    setlanguage();
                    for (var i = 0; i < data.length; i++) {
                        loadGruElem(data[i].Id, data[i].GruCod);
                        loadProbeElem(data[i].GruCod);
                    }
                }
            });
        }

        $.fn.callUpdateGru = function (Id) {
            localStorage.setItem("IdhsGru", Id);
            $.module.load('Impianti/supervisors/hs_Gru_Update');
        }

        $.fn.logGru = function (GruCod) {
            localStorage.setItem("GruCod", GruCod);
            $.module.load('Impianti/supervisors/hs_Gru_log');
        }

        $.fn.callEditGru = function (GruId) {
            localStorage.setItem("GruId", GruId);
            $.module.load('Impianti/Supervisors/hs_Gru_CC');
        }
        /*-----------------------------------------------------------------------*/
        
        /* Replacements
        ------------------------------------------------------------------------*/
        $.fn.callReplacements = function (Id) {
            localStorage.setItem("ParentId", Id);
            $.module.load('Impianti/supervisors/hs_Gru_Replacements');
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
            $('#Errors').show();
        }
        $('#closeErrors').on('click', function () {
            $('#Errors').hide();
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

    }); //document ready

});

function callEditGru(GruId) { $.fn.callEditGru(GruId); }
function callErrorLog(Cod) { $.fn.callErrorLog(Cod); }
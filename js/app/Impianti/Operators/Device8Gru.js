
$(function () {

    $(document).ready(function () {
        $('.tableGrus').footable();
        $('.tableGrus').data('page-size', 3);
        $('.tableGrus').data('limit-navigation', 4);
        $('.tableGrus').trigger('footable_initialized');

        /*
        signalR
        ----------------------------------------------*/
        $.fn.received_hs_Gru_setStatus = function (hsId, GruCod) {
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
                    console.log('loadProbeElem', data);
                    $("#tmplProbeElem").tmpl(data).appendTo("#sList_" + elementCode);
                    //$('.tableProbeElem').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }

        function loadGruElem(GruId, GruCode) {
            $("#calList_" + GruCode).empty();
            var r = $.DataAccess.hs_GruElem_List(GruId);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplGruElem").tmpl(data).appendTo("#calList_" + GruCode);
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
                    statusChanged('#Calstato_' + CalCod, data.stato);
                    $('#SetPoint_' + data.CalCod).text(SetPoint + '°C');

                    $('#isRunning_' + data.CalCod).text(isRunning + '%');
                }
            });
        }

        $('#btnAddhsGru').on('click', function (e) {
            $.module.load('Impianti/Operators/hs_Gru_Add');
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
            $.module.load('Impianti/Operators/hs_Gru_Update');
        }
        $.fn.callconfigGru = function (Id) {
            localStorage.setItem("IdhsGru", Id);
            $.module.load('Impianti/Operators/hs_Gru_Config');
        }
        $.fn.logGru = function (GruCod) {
            localStorage.setItem("GruCod", GruCod);
            $.module.load('Impianti/Operators/hs_Gru_log');
        }
        /*-----------------------------------------------------------------------*/

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
            $.module.load('Impianti/Operators/hs_Gru_Replacements');
        }
        /*----------------------------------------------------------------------*/


    }); //document ready

});

function callUpdateGru(Id) {
    $.fn.callUpdateGru(Id);
}
function callconfigGru(Id) {
    $.fn.callconfigGru(Id);
}
function logGru(GruCod) {
    $.fn.logGru(GruCod);
}
function callErrorLog(Cod) { $.fn.callErrorLog(Cod); }

$(function () {

    $(document).ready(function () {
        $('.tableboilers').footable();
        $('.tableboilers').data('page-size', 3);
        $('.tableboilers').data('limit-navigation', 4);
        $('.tableboilers').trigger('footable_initialized');

        /*
        signalR
        ----------------------------------------------*/
        $.fn.received_hs_cal_setStatus = function (hsId, CalCod) {
            if (localStorage.getItem("hsId") == hsId) {
                ReadCal(CalCod);

                //statusChanged('#Calstato_' + CalCod, stato);
                //$('#SetPoint_' + CalCod).text(SetPoint);
                //$('#isRunning_' + CalCod).text(isRunning);
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
        loadBoilers();
        setlanguage();

        function Readhs() {
            $("#ListPlants").empty();
            var req = $.DataAccess.HeatingSystem_Read(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#hsDescr").text(data.DesImpianto + ' '+ data.Descr);
                }
            });
        }

        function loadProbeElem(elementCode) {
            console.log('loadProbeElem', elementCode);
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

        function loadCalCron(CalId, CalCod) {
            $("#CalCronList_" + CalCod).empty();
            var r = $.DataAccess.hs_CalCron_List(CalId);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    //console.log('loadCirCron', data);
                    $("#tmplCalCron").tmpl(data).appendTo("#CalCronList_" + CalCod);
                    setlanguage();
                }
                else {
                    $('#tableCalCron').hide();
                }
            });
        }

        /*
        Boilers
        ------------------------------------------------------------------------*/
        function ReadCal(CalCod) {
            var req = $.DataAccess.hs_Cal_ReadByCalCod(localStorage.getItem("hsId"), CalCod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    statusChanged('#Calstato_' + CalCod, data.stato);
                    $('#SetPoint_' + data.CalCod).text(SetPoint + '°C');

                    $('#isRunning_' + data.CalCod).text(isRunning + '%');
                }
            });
        }

        $('#btnCallAddBoiler').on('click', function (e) {
            $.module.load('Impianti/Operators/hs_Cal_Add');
        });

        function loadBoilers() {
            $("#boilersList").empty();
            var r = $.DataAccess.hs_Cal_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplboilersList").tmpl(data).appendTo("#boilersList");
                    $('.tableboilers').trigger('footable_redraw');
                    setlanguage();
                    setTimeout(function () { loadOthers(data); }, 200);
                    //for (var i = 0; i < data.length; i++) { loadProbeElem(data[i].CalCod) }
                }
            });
        }

        function loadOthers(data) {
            for (var i = 0; i < data.length; i++) {
                loadProbeElem(data[i].CalCod);
                loadCalCron(data[i].CalId, data[i].CalCod);
            }
        }

        $.fn.callUpdateCal = function (IdCal) {
            localStorage.setItem("IdCal", IdCal);
            $.module.load('Impianti/Operators/hs_Cal_Update');
        }

        $.fn.callEditCal = function (CalId) {
            localStorage.setItem("CalId", CalId);
            $.module.load('Impianti/Operators/hs_Cal_CC');
        }

        $.fn.callconfigCal = function (IdCal) {
            localStorage.setItem("IdCal", IdCal);
            $.module.load('Impianti/Operators/hs_Cal_Config');
        }

        $.fn.logCal = function (CalCod) {
            localStorage.setItem("CalCod", CalCod);
            $.module.load('Impianti/Operators/hs_Cal_log');
        }

        $.fn.callTryRearm = function (CalId) {
            var r = $.DataAccess.hs_Cal_tryRearm(CalId);
            r.success(function (json) {
                var data = json.d;
                if (data == true) {
                    toastr["success"](langResources['msg4operationok'], langResources['yes']);
                }
                else {
                    $("body").removeClass("loading");
                    toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                }
            });
        }
        /*----------------------------------------------------------------------*/


        /* Replacements
        ------------------------------------------------------------------------*/
        $.fn.callReplacements = function (Id) {
            localStorage.setItem("ParentId", Id);
            $.module.load('Impianti/Operators/hs_Cal_Replacements');
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

    }); //document ready

});
function callconfigCal(IdCal) {
    $.fn.callconfigCal(IdCal);
}
function callUpdateCal(IdCal) {
    $.fn.callUpdateCal(IdCal);
}
function logCal(CalCod) {
    $.fn.logCal(CalCod);
}

function callEditCal(CalId) { $.fn.callEditCal(CalId); }

function callErrorLog(Cod) { $.fn.callErrorLog(Cod); }
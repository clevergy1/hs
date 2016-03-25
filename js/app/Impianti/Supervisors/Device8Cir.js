
$(function () {

    $(document).ready(function () {

        /*
        signalR
        ----------------------------------------------*/
        $.fn.received_hs_Cir_setStatus = function (hsId, CirCod, isRunning, stato, forcedRun, forcedStop) {
            console.log('received_hs_Cir_setStatus');
            if (localStorage.getItem("hsId") == hsId) {
                $('#btnrequestLog').show();
                statusChanged('#Cirstato_' + CirCod, stato);
                $('#isRunning_' + CirCod).text(isRunning + '%');

                var onoff = ''
                if (isRunning) { onoff = langResources['hsCirForceStop'] } else { onoff = langResources['hsCirForceRun'] }
                $('#cmdCirRun_' + CirCod).text(onoff);
            }
        }
        $.fn.received_hs_Cir_setManualMode = function (hsId, CirCod, ManualMode) {
            if (localStorage.getItem("hsId") == hsId) {
                $('#btnrequestLog').show();
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

        /*
        fixed header table
        ---------------------------------------------------------------*/
        $('#mainTable').floatThead({
            scrollContainer: function ($table) {
                return $table.closest('.panel-body');
            }
        });
        //$('#tableErrors').floatThead({
        //    scrollContainer: function ($table) {
        //        return $table.closest('.panel-body');
        //    }
        //});        
        /*-------------------------------------------------------------*/

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

        function loadCirCron(CirId, CirCod) {
            $("#CirCronList_" + CirCod).empty();
            var r = $.DataAccess.hs_CirCron_List(CirId);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    console.log('loadCirCron', data);
                    $("#tmplCirCron").tmpl(data).appendTo("#CirCronList_" + CirCod);
                    setlanguage();
                }
            });
        }

        /*
        Circulators
        ------------------------------------------------------------------------*/
        $('#btnCallAddCir').on('click', function (e) {
            $.module.load('Impianti/supervisors/hs_Cir_Add');
        });

        $('#btnrequestLog').on('click', function () {
            //setTimeout(function () { $.rt.start(); }, 1000);
            console.log('btnrequestLog');
            $.DataAccess.HeatingSystem_requestLog(localStorage.getItem("hsId"));
            $('#btnrequestLog').hide();
        });

        function loadCirculators() {
            $("#CirculatorsList").empty();
            var r = $.DataAccess.hs_Cir_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplCirculatorsList").tmpl(data).appendTo("#CirculatorsList");                    
                    setlanguage();
                    setTimeout(function () { loadOthers(data); }, 200);
                }
            });
        }

        function loadOthers(data) {
            for (var i = 0; i < data.length; i++) {
                loadProbeElem(data[i].CirCod);
                loadCirCron(data[i].CirId, data[i].CirCod);
            }
        }

        $.fn.callUpdateCir = function (CirId) {
            localStorage.setItem("CirId", CirId);
            $.module.load('Impianti/supervisors/hs_Cir_Update');
        }

        $.fn.callconfigCir = function (CirId) {
            localStorage.setItem("CirId", CirId);
            $.module.load('Impianti/supervisors/hs_Cir_Config');
        }

        $.fn.logCir = function (CirCod) {
            localStorage.setItem("CirCod", CirCod);
            $.module.load('Impianti/supervisors/hs_Cir_log');
        }


        $.fn.execCmd = function (CirId, isRunning) {
            if (isRunning) {
                var req = $.DataAccess.hs_Cir_ForceStop(CirId);
                req.success(function (json) {
                    var data = json.d;
                    console.log('ForceStop', data);
                    if (data == true) {
                        //loadLuxs();
                        toastr["success"](langResources['msg4operationok'], "success");
                    }
                });
            }
            else {
                var req = $.DataAccess.hs_Cir_ForceRun(CirId);
                req.success(function (json) {
                    var data = json.d;
                    console.log('ForceRun', data);
                    if (data == true) {
                        //loadLuxs();
                        toastr["success"](langResources['msg4operationok'], "success");
                    }
                });
            }
        }
        $.fn.ReleaseForce = function (CirId) {
            var req = $.DataAccess.hs_Cir_ReleaseForce(CirId);
            req.success(function (json) {
                var data = json.d;
                console.log('ReleaseForce', data);
                if (data == true) {
                    //loadLuxs();
                    toastr["success"](langResources['msg4operationok'], "success");
                }
            });
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
            $('#Errors').show();
            $("#ListErrorLog").empty();
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
            $.module.load('Impianti/supervisors/hs_Cir_Replacements');
        }
        /*----------------------------------------------------------------------*/


        /**/
        $.fn.callChangeCurrentProfile = function (CirId) {
            localStorage.setItem("CirId", CirId);
            $.module.load('Impianti/supervisors/ChangeCirCurrentProfile');
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
$(function () {

    $(document).ready(function () {
        var $table_data;

        /*
        signalR
        ----------------------------------------------*/
        $.fn.received_hs_Cirdm_setStatus = function (hsId, Cod, isRunning, stato) {
            if (localStorage.getItem("hsId") == hsId) {
                $('#btnrequestLog').show();
                statusChanged('#Cirstato_' + Cod, stato);
                //$('#isRunning_' + Cod).text(isRunning);
            }
        }
        $.fn.received_hs_Cirdm_setValue = function (hsId, Cod) {
            console.log('received_hs_Cirdm_setValue', hsId, Cod);
            var elem = '#Cirstato_' + Cod;
            if (localStorage.getItem("hsId") == hsId) {
                $('#btnrequestLog').show();
                var r = $.DataAccess.hs_Cirdm_ReadByCod(hsId, Cod);
                r.success(function (json) {
                    var data = json.d;
                    if (data) {
                        if (data.stato == 2) {                           
                            $(elem).html('<img src="images/status2.png" style="height:24px;width:24px" />');
                        }
                        else {
                            if (data.stato == 1) {
                                $(elem).html('<img src="images/status1.png" style="height:24px;width:24px" />');
                            }
                            else {
                                $(elem).html('<i class="fa fa-thumbs-o-up"></i>');
                            }
                        }

                        var onoff = '';
                        if (data.isRunning1>0 || data.isRunning1>0) { onoff = langResources['hsCirForceStop'] } else { onoff = langResources['hsCirForceRun'] }
                        $('#cmdCirRun_' + data.Cod).text(onoff);

                        if (data.WorkingStatus == 0) { $('#WorkingMode_' + data.Cod).text(langResources['cirDMworkingStatus0']) };
                        if (data.WorkingStatus == 1) { $('#WorkingMode_' + data.Cod).text(langResources['cirDMworkingStatus1']) };
                        if (data.WorkingStatus == 2) { $('#WorkingMode_' + data.Cod).text(langResources['cirDMworkingStatus2']) };

                        $('#isRunning1_' + data.Cod).text(data.isRunning1 + '%');
                        $('#isRunning2_' + data.Cod).text(data.isRunning2 + '%');

                        //$("#tmplProbeElem").tmpl(data).appendTo("#sList_" + data.Cod);
                    }

                    for (var i = 0; i < $table_data.length; i++) {
                        if ($table_data[i].Id == data.Id) {
                            $table_data[i] = data;
                            if (!$('#divDetail').is(':visible')) {
                                $("#divDetail").empty();
                                $("#tmplDetail").tmpl($table_data[i]).appendTo("#divDetail");
                            }
                        }
                    }

                });
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
                    console.log('loadProbeElem', data);
                    $("#tmplProbeElem").tmpl(data).appendTo("#sList_" + elementCode);
                    $('.tableProbeElem').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }

        function loadCirCron(CirId, CirCod) {
            $("#CirCronList_" + CirCod).empty();
            var r = $.DataAccess.hs_CirdmCron_List(CirId);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    console.log('loadCirCron', data);
                    $("#tmplCirCron").tmpl(data).appendTo("#CirCronList_" + CirCod);
                    setlanguage();
                }
            });
        }

        function loadOthers(data) {
            for (var i = 0; i < data.length; i++) {
                loadProbeElem(data[i].Cod);
                loadCirCron(data[i].Id, data[i].Cod);
            }
        }

        /*
        Circulators
        ------------------------------------------------------------------------*/
        $('#btnCallAddCir').on('click', function (e) {
            $.module.load('Impianti/Operators/hs_Cirdm_Add');
        });
        
        $('#btnrequestLog').on('click', function () {
            $.DataAccess.HeatingSystem_requestLog(localStorage.getItem("hsId"));
            $('#btnrequestLog').hide();
        });

        function loadCirculators() {
            $("#CirculatorsList").empty();
            var r = $.DataAccess.hs_Cirdm_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                $table_data = json.d;
                if ($table_data) {
                    $("#tmplCirculatorsList").tmpl($table_data).appendTo("#CirculatorsList");
                    setlanguage();
                    //for (var i = 0; i < data.length; i++) { loadProbeElem($table_data[i].Cod) }
                    setTimeout(function () { loadOthers($table_data); }, 200);
                }
            });
        }

        $.fn.callUpdateCir = function (CirId) {
            localStorage.setItem("CirId", CirId);
            $.module.load('Impianti/supervisors/hs_Cirdm_Update');
        }

        $.fn.callconfigCir = function (CirId) {
            localStorage.setItem("CirId", CirId);
            $.module.load('Impianti/supervisors/hs_Cirdm_Config');
        }

        $.fn.logCir = function (Cod) {
            localStorage.setItem("CirCod", Cod);
            $.module.load('Impianti/supervisors/hs_Cirdm_log');
        }

        $.fn.callShowDetail = function (Id) {
            for (var i = 0; i < $table_data.length; i++) {
                if ($table_data[i].Id == Id) {
                    $("#divDetail").empty();
                    $("#tmplDetail").tmpl($table_data[i]).appendTo("#divDetail");
                    $('#divDetail').show();
                    $('#divList').hide();
                }
            }
        }
        $.fn.closeDetail = function () {
            $('#divDetail').hide();
            $('#divList').show();
        }

        $.fn.execCmd = function (CirId, isRunning1,isRunning2) {
            if ( (isRunning1 + isRunning2)>0) {
                var req = $.DataAccess.hs_Cirdm_ForceStop(CirId);
                req.success(function (json) {
                    var data = json.d;
                    console.log('ForceStop', data);
                    if (data == true) {
                        toastr["success"](langResources['msg4operationok'], "success");
                    }
                });
            }
            else {
                var req = $.DataAccess.hs_Cirdm_ForceRun(CirId);
                req.success(function (json) {
                    var data = json.d;
                    console.log('ForceRun', data);
                    if (data == true) {
                        toastr["success"](langResources['msg4operationok'], "success");
                    }
                });
            }
        }
        $.fn.ReleaseForce = function (CirId) {
            var req = $.DataAccess.hs_Cirdm_ReleaseForce(CirId);
            req.success(function (json) {
                var data = json.d;
                console.log('ReleaseForce', data);
                if (data == true) {
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
                    $('#tableErrors').floatThead({
                        scrollContainer: function ($table) {
                            return $table.closest('.panel-body');
                        }
                    });
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
            $.module.load('Impianti/supervisors/hs_Cirdm_Replacements');
        }
        /*----------------------------------------------------------------------*/

        /**/
        $.fn.callChangeCurrentProfile = function (Id) {
            localStorage.setItem("CirId", Id);
            $.module.load('Impianti/supervisors/ChangeCirdmCurrentProfile');
        }
        /**/

    }); //document ready

});

function callUpdateCir(Id) {
    $.fn.callUpdateCir(Id);
}
function callconfigCir(Id) {
    $.fn.callconfigCir(Id);
}
function logCir(Cod) {
    $.fn.logCir(Cod);
}
function CallShowErrorLog(Cod) { $.fn.callErrorLog(Cod); }
function callErrorLog(Cod) { $.fn.callErrorLog(Cod); }
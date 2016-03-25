
$(function () {

    $(document).ready(function () {

        /*
        signalR
        ---------------------------------------------------------------------------*/
        $.fn.received_Lux_setStatus = function (hsId, Cod, stato) {
            if (localStorage.getItem("hsId") == hsId) {
                $('#btnrequestLog').show();
                statusChanged('#stato_' + Cod, stato);
            }
        }
        $.fn.received_Lux_changed = function (hsId, Cod) {
            if (localStorage.getItem("hsId") == hsId) {
                $('#btnrequestLog').show();
                console.log('received_Lux_changed', hsId, Cod);
                ReadLuxByCod(hsId, Cod);
            }
        }

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

        /*-----------------------------------------------------------------------*/

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
        loadLuxs();
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

        function loadLuxs() {
            $("#LuxList").empty();
            var r = $.DataAccess.Lux_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplList").tmpl(data).appendTo("#LuxList");
                    setlanguage();
                    setTimeout(function () { loadOthers(data); }, 200);
                }
            });
        }

        function loadOthers(data) {
            for (var i = 0; i < data.length; i++) {
                loadLuxAstr(data[i].Id, data[i].Cod);
            }
        }

        function loadLuxAstr(Id, Cod) {
            $("#LuxAstrList_" + Cod).empty();
            var r = $.DataAccess.LuxAstr_List(Id);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplLuxAstr").tmpl(data).appendTo("#LuxAstrList_" + Cod);
                    setlanguage();
                }
            });
        }

        function ReadLux(Id) {
            console.log('ReadLux', Id);
            var req = $.DataAccess.Lux_Read(Id);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    console.log('ReadLux', data);
                    $('#WorkingTimeCounter_' + data.Cod).text(Number(data.WorkingTimeCounter).toLocaleString());
                    $('#PowerOnCycleCounter_' + data.Cod).text(Number(data.PowerOnCycleCounter).toLocaleString());
                    var onoff = ''
                    if (data.LightON) {
                        onoff = "ON";
                        $('#cmdLightStatus_' + Id).text(langResources['hsLuxOff']);
                    } else {
                        onoff = "OFF";
                        $('#cmdLightStatus_' + Id).text(langResources['hsLuxOn']);
                    }
                    $('#LightON_' + data.Cod).text(onoff);

                    //if (data.forcedOn || data.forcedOff) {
                    //    $('#forced_' + data.Cod).text(langResources['hsLuxForced']);
                    //}
                    //else {
                    //    $('#forced_' + data.Cod).text('');
                    //}
                   
                    CurrentMode = '';
                    if (data.CurrentMode == 0) {
                        $('#CurrentMode_' + data.Cod).text(langResources['hsLuxManual']);
                    }
                    if (data.CurrentMode == 1) {
                        $('#CurrentMode_' + data.Cod).text(langResources['hsLuxAutomatic']);
                    }
                    if (data.CurrentMode == 2) {
                        $('#CurrentMode_' + data.Cod).text(langResources['hsLuxScheduled']);
                    }
                }
            });
        }
        function ReadLuxByCod(hsId, Cod) {
            var req = $.DataAccess.Lux_ReadByCod(hsId, Cod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#WorkingTimeCounter_' + data.Cod).text(Number(data.WorkingTimeCounter).toLocaleString());
                    $('#PowerOnCycleCounter_' + data.Cod).text(Number(data.PowerOnCycleCounter).toLocaleString());
                    var onoff = ''
                    if (data.LightON==true) { onoff = "ON" } else { onoff = "OFF" }
                    $('#LightON_' + data.Cod).text(onoff);

                    //if (data.forcedOn || data.forcedOff) {
                    //    $('#forced_' + data.Cod).text(langResources['hsLuxForced']);
                    //}
                    //else {
                    //    $('#forced_' + data.Cod).text('');
                    //}

                    CurrentMode = '';
                    if (data.CurrentMode == 0) {
                        $('#CurrentMode_' + data.Cod).text(langResources['hsLuxManual']);
                    }
                    if (data.CurrentMode == 1) {
                        $('#CurrentMode_' + data.Cod).text(langResources['hsLuxAutomatic']);
                    }
                    if (data.CurrentMode == 2) {
                        $('#CurrentMode_' + data.Cod).text(langResources['hsLuxScheduled']);
                    }
                }
            });
        }


        $.fn.callog = function (Cod) {            
            localStorage.setItem("Cod", Cod);
            $.module.load('Impianti/supervisors/Lux_log');
        }

        $.fn.execCmd = function (Id, LightON) {
            var req = $.DataAccess.Lux_Read(Id);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    if (data.LightON) {
                        console.log('la luce risulta accesa. Spengo');
                        LightOff(Id);
                    }
                    else {
                        console.log('la luce risulta spenta. Accendo');
                        LightOn(Id);
                    }
                }
            });
        }

        $.fn.RestoreWorkingMode = function (Id) {
            var req = $.DataAccess.Lux_cmd_RestoreWorkingMode(Id);
            req.success(function (json) {
                var data = json.d;
                if (data == true) {
                    toastr["success"](langResources['msg4operationok'], "success");
                }
            });
        }

        function LightOn(Id) {
            var req = $.DataAccess.Lux_cmd_LightOn(Id);
            req.success(function (json) {
                var data = json.d;
                if (data ==true) {
                    $('#cmdLightStatus_' + Id).text(langResources['hsLuxOn']);
                    ReadLux(Id);
                    //loadLuxs();
                    toastr["success"](langResources['msg4operationok'], "success");
                }
            });
        }

        function LightOff(Id) {
            var req = $.DataAccess.Lux_cmd_LightOff(Id);
            req.success(function (json) {
                var data = json.d;
                console.log('LightOff',data);
                if (data == true) {
                    $('#cmdLightStatus_' + Id).text(langResources['hsLuxOff']);
                    ReadLux(Id);
                    //loadLuxs();
                    toastr["success"](langResources['msg4operationok'], "success");
                }
            });
        }

        $('#btnrequestLog').on('click', function () {
            //setTimeout(function () { $.rt.start(); }, 1000);
            console.log('btnrequestLog');
            $.DataAccess.HeatingSystem_requestLog(localStorage.getItem("hsId"));
            $('#btnrequestLog').hide();
        });

        /*----------------------------------------------------------------------*/

        /* Replacements
        ------------------------------------------------------------------------*/
        $.fn.callReplacements = function (Id) {
            localStorage.setItem("ParentId", Id);
            $.module.load('Impianti/supervisors/Lux_Replacements');
        }
        /*----------------------------------------------------------------------*/

        /*
        Error codes
        ------------------------------------------------------------------------*/
        var $errorRowNumber0;
        $.fn.callErrorLog = function (Cod) {
            //close_rowModal();
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
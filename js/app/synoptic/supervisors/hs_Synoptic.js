
$(function () {
    
    $(document).ready(function () {       
        window.cancelAnimationFrame(localStorage.getItem('requestAnimationFrameID'));
        $("#pageOperation").empty();
        $("#tmplpageOperation").tmpl(null).appendTo("#pageOperation");

        $("#open_system_detail").css("display", "visible");
     

        var $SensorRead = false; //per evitare inneschi di eventi sullo switch non voluti
        var $hsIdOnLine = false;
        /*
        Colors
        ------------------------------------------------------*/
        $verde = '#008000';
        $giallo = '#ffc800'; //'#ffd655';
        $rosso = '#aa0000';
        $grigio = '#cccccc';
        /*----------------------------------------------------*/
        var runningObj = [],
            elements=[];

        /*
        received messages
        --------------------------------------------------------------*/
        //set element status
        function SetElementStatus(Cod,stato) {
            var objName =Cod + '_STATUS';
            var obj = document.getElementById(objName);
            if (obj) {
                if (stato == 0) {
                    obj.style.fill = $verde;
                }
                else if (stato == 1) {
                    obj.style.fill = $giallo;
                }
                else if (stato == 2) {
                    obj.style.fill = $rosso;
                }
                else if (stato == 3) {
                    obj.style.fill = $rosso;
                }
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
        


        //temperature probe signalR
        $.fn.received_HeatingSystem_setStatus = function (hsId, stato) {
            if (data.stato > 0) {
                $('#btnResetSystemStatus_' + data.hsId).show();
            }
            else {
                $('#btnResetSystemStatus_' + data.hsId).hide();
            }
        }
        $.fn.received_hs_TemperatureProbes_setValue = function (hsId, ProbeCod, currentValue) {
            if (localStorage.getItem("hsId") == hsId) {
                console.log("aggiornato probe element");
                var txtobjName = 'txt_' + ProbeCod + '_STATUS';
                var txtobj = document.getElementById(txtobjName);
                if (txtobj) { txtobj.textContent = currentValue + 'C°' }
            }
        }
        // caldaie signalr
        $.fn.received_hs_cal_setStatus = function (hsId, CalCod, SetPoint, isRunning, stato) {
            if (localStorage.getItem("hsId") == hsId) {

                var req = $.DataAccess.hs_Cal_ReadByCalCod(hsId, CalCod);
                req.success(function (json) {
                    var data = json.d;
                    if (data) {
                        var txtobjName = 'txt_' + data.CalCod + '_STATUS';
                        var txtobj = document.getElementById(txtobjName);
                        if (txtobj) {
                              txtobj.textContent = data.isRunning + '%°';
                        }
                        SetElementStatus(data.CalCod, stato);
                        for (var i = 0; i < runningObj.length; i++) {
                            if (runningObj[i] == data.CalCod) {
                                runningObj[i].run = isRunning;
                            }
                        }
                    } //data
                });


                //console.log("aggiornato boilers element");
                //var txtobjName = 'txt_' + CalCod + '_STATUS';
                //var txtobj = document.getElementById(txtobjName);
                //if (txtobj) {
                //    // txtobj.textContent = SetPoint + ' C°';
                //    txtobj.textContent = isRunning + '%°';
                //}
                //var objName = CalCod + '_STATUS';
                //var obj = document.getElementById(objName);
                //if (obj) {
                //    if (stato == 0) {
                //        obj.style.fill = $verde;
                //    }
                //    else if (stato == 1) {
                //        obj.style.fill = $giallo;
                //    }
                //    else if (stato == 2) {
                //        obj.style.fill = $rosso;
                //    }
                //    else if (stato == 3) {
                //        obj.style.fill = $rosso;
                //    }                    
                //}
                //for (var i = 0; i < runningObj.length; i++) {
                //    if (runningObj[i] == CalCod) {
                //        runningObj[i].run = isRunning;
                //    }
                //}
            }
        }
        //circulators signalr
        $.fn.received_hs_Cir_setStatus = function (hsId, CirCod, isRunning, stato) {           
            if (localStorage.getItem("hsId") == hsId) {
                console.log("aggiornato cir element", CirCod, isRunning, stato);
                
                $('#isRunning_' + CirCod).text(isRunning);
                console.log($('#isRunning_' + CirCod).text());

                for (var i = 0; i < runningObj.length; i++) {
                    if (runningObj[i] == CirCod) {
                        runningObj[i].run = isRunning;
                    }
                }
                SetElementStatus(CirCod,stato);
                var hsId = localStorage.getItem("hsId");
                var req = $.DataAccess.hs_Cir_ReadByCirCod(hsId, CirCod);
                req.success(function (json) {
                    var data = json.d;
                    if (data) {
                        $('#CronoProfilesList').empty();
                        readCurrentCirProfile(data.CirId);
                    }
                });

            }
        }
        $.fn.received_hs_Cir_setManualMode = function (hsId, CirCod, ManualMode) {
            if (localStorage.getItem("hsId") == hsId) {
                console.log("aggiornato cir manula mode element");
                var txtobjName = 'txt_' + CirCod + '_STATUS';
                var txtobj = document.getElementById(txtobjName);
                if (txtobj) {
                    if (ManualMode == true) {
                        txtobj.textContent = "MANUALE";
                    }
                    else  {
                        txtobj.textContent = 'AUTO';
                    }
                }
            }
        }
        //vrd signalr
        $.fn.received_hs_Vrd_setStatus = function (hsId, VrdCod, SetPoint, SetPosition, Position, stato) {
            if (localStorage.getItem("hsId") == hsId) {
                console.log("aggiornato vrd element");
                var txtobjName = 'txt_' + VrdCod + '_STATUS';
                var txtobj = document.getElementById(txtobjName);
                if (txtobj) {
                    txtobj.textContent = SetPoint + ' C°';
                }
                SetElementStatus(VrdCod, stato);
                //var objName = VrdCod + '_STATUS';
                //var obj = document.getElementById(objName);
                //if (obj) {
                //    if (stato == 0) {
                //        obj.style.fill = $verde;
                //    }
                //    else if (stato == 1) {
                //        obj.style.fill = $giallo;
                //    }
                //    else if (stato == 2) {
                //        obj.style.fill = $rosso;
                //    }
                //    else if (stato == 3) {
                //        obj.style.fill = $rosso;
                //    }
                //}

                for (var i = 0; i < runningObj.length; i++) {
                    if (runningObj[i] == VrdCod) {
                        runningObj[i].run = Position;
                    }
                }
            }
        }
        //ctl signalr
        $.fn.received_hs_Ctl_setValue = function (hsId, CtlCod, stato, currentValue) {
            if (localStorage.getItem("hsId") == hsId) {
                console.log("aggiornato ctl element");
                var txtobjName = 'txt_' + CtlCod + '_STATUS';
                var txtobj = document.getElementById(txtobjName);
                if (txtobj) { txtobj.textContent = currentValue + 'L' }
                SetElementStatus(CtlCod, stato);
                //var objName = CtlCod + '_STATUS';
                //var obj = document.getElementById(objName);
                //if (obj) {
                //    if (stato == 0) {
                //        obj.style.fill = $verde;
                //    }
                //    else if (stato == 1) {
                //        obj.style.fill = $giallo;
                //    }
                //    else if (stato == 2) {
                //        obj.style.fill = $rosso;
                //    }
                //    else if (stato == 3) {
                //        obj.style.fill = $rosso;
                //    }
                //}
            }
        }
        //ctb signalair
        $.fn.received_hs_Ctb_setValue = function (hsId, CtbCod, currentValue) {
            if (localStorage.getItem("hsId") == hsId) {
                console.log("aggiornato ctb element");
                var txtobjName = 'txt_' + CtbCod + '_STATUS';
                var txtobj = document.getElementById(txtobjName);
                if (txtobj) { txtobj.textContent = currentValue }

                var stato = 0;
                if (currentValue > 0) { stato = 2;}
                SetElementStatus(CtbCod,stato);
                //var objName = CtbCod + '_STATUS';
                //var obj = document.getElementById(objName);
                //if (obj) {
                //    if (stato == 0) {
                //        obj.style.fill = $verde;
                //    }
                //    else if (stato == 1) {
                //        obj.style.fill = $giallo;
                //    }
                //    else if (stato == 2) {
                //        obj.style.fill = $rosso;
                //    }
                //    else if (stato == 3) {
                //        obj.style.fill = $rosso;
                //    }
                //}
            }
        }
        // doors signalr
        $.fn.received_hs_Doors_setValue = function (hsId, DoorCod, currentValue) {
            if (localStorage.getItem("hsId") == hsId) {
                console.log("aggiornato doors element");
                var txtobjName = 'txt_' + DoorCod + '_STATUS';
                var txtobj = document.getElementById(txtobjName);
                if (txtobj) {
                    if (currentValue == false) {
                        txtobj.textContent = 'Chiusa';
                    }
                    else {
                        txtobj.textContent = 'Aperta';
                    }
                }
            }
        }
        // gas signalr 
        $.fn.received_hs_Gas_setStatus = function (hsId, Cod, stato) {           
            if (localStorage.getItem("hsId") == hsId) {
                console.log("aggiornato gas status element");
                statusChanged('#Gasstato_' + Cod, stato);
                SetElementStatus(Cod, stato);
            }
        }
        $.fn.received_hs_Gas_setValue = function (hsId, Cod, currentValue) {
            if (localStorage.getItem("hsId") == hsId) {
                console.log("aggiornato gas value element");
                $('#currentValue_' + Cod).text(Number(currentValue).toLocaleString());
            }
        }
        $.fn.received_hs_Gas_setValueDigital = function (hsId,
                                                        Cod,
                                                        CorrectedGasCounter,
                                                        MeasuredGasCounter,
                                                        Pressure,
                                                        Temperature,
                                                        ConversionCostant,
                                                        CorrectedVolInErrCond,
                                                        CorrectedVolDay,
                                                        CorrectedVolMonth,
                                                        MeasuredVolDay,
                                                        MeasuredFlow,
                                                        CorrectedFlow,
                                                        BatteryCapacity) {
            $('#MeasuredGasCounter_' + Cod).text(Number(MeasuredGasCounter).toLocaleString());
            $('#CorrectedGasCounter_' + Cod).text(Number(CorrectedGasCounter).toLocaleString());
            $('#Pressure_' + Cod).text(Number(Pressure).toLocaleString());
            $('#Temperature_' + Cod).text(Number(Temperature).toLocaleString());
            $('#ConversionCostant_' + Cod).text(Number(ConversionCostant).toLocaleString());
            $('#CorrectedVolInErrCond_' + Cod).text(Number(CorrectedVolInErrCond).toLocaleString());
            $('#CorrectedVolDay_' + Cod).text(Number(CorrectedVolDay).toLocaleString());
            $('#CorrectedVolMonth_' + Cod).text(Number(CorrectedVolMonth).toLocaleString());
            $('#MeasuredVolDay_' + Cod).text(Number(MeasuredVolDay).toLocaleString());
            $('#MeasuredFlow_' + Cod).text(Number(MeasuredFlow).toLocaleString());
            $('#CorrectedFlow_' + Cod).text(Number(CorrectedFlow).toLocaleString());
            $('#BatteryCapacity_' + Cod).text(Number(BatteryCapacity).toLocaleString());
        }
        //cron signalair
        $.fn.received_hs_Cron_setStatus = function (hsId, CronCod, SetPoint, stato) {
            if (localStorage.getItem("hsId") == hsId) {
                console.log("aggiornato cron element");
                SetElementStatus(CronCod,stato);
                statusChanged('#Cronstato_' + Cod, stato);
            }
        }
        // analizzatori di rete signalair
        $.fn.received_hs_Anz_setStatus = function (hsId, Cod, stato) {
            //console.log("received_hs_Anz_setStatus");
            if (localStorage.getItem("hsId") == hsId) {
                console.log("aggiornato anz status element");
                SetElementStatus(Cod, stato);
                statusChanged('#Anzstato_' + Cod, stato);

            }
        }
        $.fn.received_hs_Anz_changed = function (hsId, Cod) {
            console.log("Device8Anz received_hs_Anz_changed");
            if (localStorage.getItem("hsId") == hsId) {
                console.log("aggiornato probe element");
                anzDetail(Cod);
            }
        }
        // ctp misuratori di portata signalair
        $.fn.received_hs_Ctp_setValue = function (hsId, Cod, stato, VolumeCounter, FlowRate) {
            if (localStorage.getItem("hsId") == hsId) {
                console.log("aggiornato ctp element");
                statusChanged('#Ctpstato_$' + Cod, stato);
                SetElementStatus(Cod, stato);
                $('#Flowrate_' + Cod).text(Flowrate);
                $('#VolumeCounter_' + Cod).text(VolumeCounter);
            }
        }
        // gru signalair
        $.fn.received_hs_Gru_setStatus = function (hsId, GruCod) {
            if (localStorage.getItem("hsId") == hsId) {

                var req = $.DataAccess.hs_Cal_ReadByCalCod(hsId, CalCod);
                req.success(function (json) {
                    var data = json.d;
                    if (data) {
                        var txtobjName = 'txt_' + data.GruCod + '_STATUS';
                        var txtobj = document.getElementById(txtobjName);
                        if (txtobj) {
                            txtobj.textContent = data.isRunning + '%°';
                        }
                        $('#SetPoint_' + data.GruCod).text(SetPoint);
                        SetElementStatus(data.GruCod, data.stato);
                        statusChanged('#stato_' + data.GruCod, stato);
                        for (var i = 0; i < runningObj.length; i++) {
                            if (runningObj[i] == data.GruCod) {
                                runningObj[i].run = isRunning;
                            }
                        }
                    } //data
                });


                //console.log("aggiornato gru element");
                //var txtobjName = 'txt_' + GruCod + '_STATUS';
                //var txtobj = document.getElementById(txtobjName);
                //if (txtobj) {
                //    // txtobj.textContent = SetPoint + ' C°';
                //    txtobj.textContent = isRunning + '%°';
                //}
                //SetElementStatus(GruCod, stato);
                //var objName = GruCod + '_STATUS';
                //var obj = document.getElementById(objName);
                //if (obj) {
                //    if (stato == 0) {
                //        obj.style.fill = $verde;
                //    }
                //    else if (stato == 1) {
                //        obj.style.fill = $giallo;
                //    }
                //    else if (stato == 2) {
                //        obj.style.fill = $rosso;
                //    }
                //    else if (stato == 3) {
                //        obj.style.fill = $rosso;
                //    }
                //}
                //statusChanged('#stato_' + GruCod, stato);
                //$('#SetPoint_' + GruCod).text(SetPoint);
                //$('#isRunning_' + GruCod).text(isRunning);
            }
        }
        // pb pressostati di blocco signalair
        $.fn.received_hs_pb_setValue = function (hsId, Cod, currentValue) {
            if (localStorage.getItem("hsId") == hsId) {
                console.log("aggiornato pb element");
                $('#currentValue_' + Cod).text(Number(currentValue).toLocaleString());
            }
        }
        //pm pressostati di minima signalair
        $.fn.received_hs_pm_setValue = function (hsId, Cod, currentValue) {
            if (localStorage.getItem("hsId") == hsId) {
                console.log("aggiornato pm element");
                $('#currentValue_' + Cod).text(Number(currentValue).toLocaleString());
            }
        }
        // sca signalair
        $.fn.received_hs_sca_changed = function (hsId, scaId, Id, currentValue) {
            console.log("aggiornato sca element");
            var onoff = '';
            if (currentValue == true) {
                onoff = 'ON';
            }
            else {
                onoff = 'OFF';
            }
            $('#currentValue_' + scaId + '_' + id).text(onoff);
        }
        // tb termostato blocco signalair
        $.fn.received_hs_tb_setValue = function (hsId, Cod, currentValue) {
            if (localStorage.getItem("hsId") == hsId) {
                console.log("aggiornato tb  element");
                $('#currentValue_' + Cod).text(Number(currentValue).toLocaleString());
            }
        }
           
        /*-----------------------------------------------------------*/
    
        //init();
        //tolgo full-with da body per poter fare apparirie il menu di sx con dentro le info
        $("body").removeClass('full-width');
        //$('.chiudi_finestra').on('click', function () {
           
        //    $('#main-content').addClass('merge-left');
        //});
        //$('#main-content').addClass('merge-left');
        $("body").addClass("loading");
        function fixWebkitHeightBug() {
            var svgW = $('#svg2').attr("width");
            var svgH = $('#svg2').attr("height")
            var curSVGW =parseInt( $('#svg-main').width());
            var curSVGH = parseInt($(window).height()) - parseInt($('header').height())- 100;
            //var newSVGH = heightInRatio(svgH, svgW, curSVGW);
            //$('#svg-main').height(newSVGH);
            //console.log('newSVGH', newSVGH);
            function heightInRatio(oH, oW, nW) {
                return (oH / oW * nW);
            }
        };

        $(window).resize(function () {
            fixWebkitHeightBug();
        });

        function loadSynoptic(MapId) {
            var map2load = $.appParms.urlGlobal() + 'gethsMap.ashx?MapId=' + MapId;
            $('#svg-main').load(map2load, null, function () {
                               
                var svg = document.getElementById('svg2');
                svg.setAttribute("width", "100%");
                svg.setAttribute("height", "100%");
                var windowH = $(window).height() - 200;
                //alert(windowH);
                var wrapperH = $('#wrapper').height();
                if (windowH > wrapperH) {
                    $('#wrapper').css({ 'height': ($(window).height()) + 'px' });
                }
                $('#synoptic').css("height", windowH);
                $('#svg-main').css("height", windowH);
                // returns height of browser viewport
                $(window).resize(function () {
                    svg.setAttribute("width", "100%");
                    svg.setAttribute("height", "100%");
                    var windowH = $(window).height() - 200;
                    //alert(windowH);
                    var wrapperH = $('#wrapper').height();
                    if (windowH > wrapperH) {
                        $('#wrapper').css({ 'height': ($(window).height()) + 'px' });
                    }
                    $('#synoptic').css("height", windowH);
                    $('#svg-main').css("height", windowH);
                });



                var texts = svg.getElementsByTagName("text");
                for (var i = 0; i < texts.length; i++) {
                    texts[i].setAttribute("font-family", "Arial");
                    //var fontfamily = texts[i].getAttribute("font-family");
                    //console.log(fontfamily);
                }

                $('#svg2').zoomPanTouchSVG({ zoomBtnContainer: '#zoomBtnContainer' });
                //$('#svg2').zoomPanTouchSVG().zoom('in');
                fixWebkitHeightBug();
                $("body").removeClass("loading");
                runningObj = [];
                elaborContent();
            });
        }

        function readMap(MapId) {
            var r = $.DataAccess.hs_Maps_Read(MapId);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#MapDesc').text(data.MapDesc);
                }
            });
        }

        function Readhs() {          
            var req = $.DataAccess.HeatingSystem_Read(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    localStorage.setItem("IdImpianto", data.IdImpianto);
                    $("#hsDescr").text(data.DesImpianto + ' ' + data.Descr);
                    $hsIdOnLine = data.isOnline;
                    $hsMaintenanceMode = data.MaintenanceMode;
                    
                    if ($hsIdOnLine == false) {

                        $("#errorOffline").css("display", "block");
                    }

                    if ($hsMaintenanceMode == true) {

                        $("#MaintenanceMode").css("display", "block");
                        
                    }

                    setlanguage();
                }
            });
        }

        function ReadImpianto() {
            var req = $.DataAccess.Impianti_Read(localStorage.getItem("IdImpianto"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#DesImpianto").text(data.DesImpianto);
                }
            });
        }

        function loadProbeElem(elementCode) {
            //console.log('loadProbeElem elementCode: ' + elementCode);
            $("#ProbeElem_" + elementCode).empty();
            var r = $.DataAccess.hs_TemperatureProbeElem_List(localStorage.getItem("hsId"), elementCode);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplProbeElem").tmpl(data).appendTo("#ProbeElem_" + elementCode);                   
                    setlanguage();
                }
            });
        }

        function loadcymt200Elem(elementCode) {
            $("#cymt200List_" + elementCode).empty();
            var r = $.DataAccess.cymt200Elem_List(localStorage.getItem("hsId"), elementCode);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplcymt200Elem").tmpl(data).appendTo("#cymt200List_" + elementCode);
                    setlanguage();
                }
            });
        }

        Readhs();
        readMap(localStorage.getItem("MapId"));
        loadSynoptic(localStorage.getItem("MapId"));

        /*
        work on map
        ------------------------------------------------------*/
        function elaborContent() {
            loadBoilers();
            loadCirculators();
            loadCird();
            loadCirm();
            loadCirdm();
            LoadhsGru();
            loadhvac();           

            loadServomotors();
            loadCron();
            loadAnz();

            loadCtl();
            loadCtb();
            loadGas();

            loadLux();

            loadcymt200();
            loadProbes();

            loadtb();
            loadpm();
            loadpb();
            loadev();
            //loadSca();
            LoadDoors();

            setTimeout(function () {
                var requestAnimationFrameID = requestAnimationFrame(doAnim);
            }, 1000);
        }
        /*----------------------------------------------------*/

        /*
        System 
        -------------------------------------------------------------------------*/
        $('#open_system_detail').on('click', function () {
            LoadSystem();
        });
        function LoadSystem() {
            sidebar();
            $("#usermenu").empty();            
            var req = $.DataAccess.HeatingSystem_Read(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {

                    //console.log("data.MaintenanceMode", data.MaintenanceMode);
                    //console.log("SISTEMA DETTAGLIO", data)
                    
                    $("#hsDescr").text(data.DesImpianto + ' ' + data.Descr);
                    $("#tmplSystemDetail").tmpl(data).appendTo("#usermenu");

                    console.log('stato', data.stato);
                    if (data.stato > 0) {
                        $('#btnResetSystemStatus_'+data.hsId).show();
                    }
                    else {
                        $('#btnResetSystemStatus_' + data.hsId).hide();
                    }
                    loadTotDoc(data);
                    loadTotTickets(data);
                  
                    $(".make-switch input").bootstrapSwitch();
                    $('#BSswitch').bootstrapSwitch('state', data.MaintenanceMode, data.MaintenanceMode);
                   
                    //$(".BSswitch").bootstrapSwitch();
                    $('#BSswitch').on('switchChange.bootstrapSwitch', function (event, state) {
                        console.log(this); // DOM element
                        console.log(event); // jQuery event
                        console.log(state); // true | false
                        if (state == true) {

                            $("#MaintenanceMode").css("display", "block");
                        }
                        else {
                            $("#MaintenanceMode").css("display", "none");
                        }
                        var req = $.DataAccess.HeatingSystem_setMaintenanceMode(localStorage.getItem("hsId"), state);
                        req.success(function (json) {
                            var data = json.d;
                            if (data == true) {
                                setlanguage();
                                console.log("ok");
                            }

                        });

                    });
                   

                    loadProbeElem(localStorage.getItem("hsId")); // !!!!chiedere a marco se la fuznione delle sonde è la stessa di quella sopra

                    setlanguage();
                }
            });          
        }


        /*
        Documents
        ----------------------------------------------------------------*/
        function loadTotDoc(data) {
            var r = $.DataAccess.hs_DocsgetTot(data.hsId);
            var qts = '#totDoc_' + data.hsId
            r.success(function (json) {
                var tot = json.d;
                $(qts).text(tot);
                $('#totDoc_' + data.hsId).text(tot);
            });
        }
        $.fn.CalhsDoc = function () {
            $.module.load('Impianti/Supervisors/hs_Docs_Manage');
        }
        /*--------------------------------------------------------------*/

        /*
        Tickets
        ----------------------------------------------------------------*/
        function loadTotTickets(data) {
            var r = $.DataAccess.hs_Tickets_getTotOpen(data.hsId);
            r.success(function (json) {
                var tot = json.d;
                $('#totTickets_' + data.hsId).text(tot);
            });
        }
        $.fn.CalhsTickets = function () {           
            $.module.load('Impianti/Supervisors/hs_Tickets_Manage');
        }       
        /*--------------------------------------------------------------*/
        $.fn.ResetSystemStatus = function () {        
            var req = $.DataAccess.HeatingSystem_resetSystemStatus(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data == true) {
                    toastr["success"](langResources['msg4operationok'], langResources['yes'])
                    LoadSystem();
                }
                else { toastr["warning"](langResources['msg4operationfailed'], langResources['alert']); }
            });
        }
        $('#btnResetSystemStatus').on('click', function () {            
            var req = $.DataAccess.HeatingSystem_resetSystemStatus(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data == true) {
                    toastr["success"](langResources['msg4operationok'], langResources['yes'])
                    LoadSystem();
                }
                else { toastr["warning"](langResources['msg4operationfailed'], langResources['alert']); }
            });
        });
        /*--------------------------------------------------------------*/


        /*-----------------------------------------------------------------------*/

        /*
        Doors
        -------------------------------------------------------------------------*/
        function LoadDoors() {
            $("#ListDoors").empty();
            var r = $.DataAccess.hs_Doors_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                       
                        $('#' + data[i].DoorCod).on('touchstart click', function (event) {
                            doorDetail(this.id);
                            sidebar();
                        });
                        $('#' + data[i].DoorCod+'_1_').on('touchstart click', function (event) {
                            doorDetail(this.id.replace("_1_", ""));
                            sidebar();
                        });
   
                        var txtobjName = 'txt_' + data[i].DoorCod + '_STATUS';
                        var txtobj = document.getElementById(txtobjName);
                        if (txtobj) {
                            if (data[i].currentValue == false) {
                                txtobj.textContent = 'Chiusa';
                            }
                            else {
                                txtobj.textContent = 'Aperta';
                            }
                        }
                        txtobjName = 'txt_' + data[i].DoorCod + '_STATUS' + '_1_';
                        txtobj = document.getElementById(txtobjName);
                        if (txtobj) {
                            if (data[i].currentValue == false) {
                                txtobj.textContent = 'Chiusa';
                            }
                            else {
                                txtobj.textContent = 'Aperta';
                            }
                        }

                        elements.push({
                            'code': data[i].DoorCod,
                            'type': 'DOORS'
                        });

                    } //end for
                }
            });
        }

        function doorDetail(DoorCod) {                      
            $("#usermenu").empty();
            var hsId = localStorage.getItem("hsId");
            var req = $.DataAccess.hs_Doors_ReadByDoorCod(hsId, DoorCod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    data.installationDate = moment(data.installationDate).format('DD/MM/YYYY');
                    $("#tmplDoorsDetail").tmpl(data).appendTo("#usermenu");
                    setlanguage();
                }
            });
        }
        /*-----------------------------------------------------------------------*/

        /*
        Gruppo termici
        -------------------------------------------------------------------------*/
        function LoadhsGru() {
            $("#hsGrusList").empty();
            var r = $.DataAccess.hs_Gru_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {                    
                    for (var i = 0; i < data.length; i++) {
                        $('#' + data[i].GruCod).on('touchstart click', function (event) {
                            gruDetail(this.id);
                            sidebar();
                        });
                        $('#' + data[i].GruCod + '_1_').on('touchstart click', function (event) {
                            gruDetail(this.id.replace("_1_", ""));                            
                            sidebar();
                        });

                        var txtobjName = 'txt_' + data[i].GruCod + '_STATUS';
                        var txtobj = document.getElementById(txtobjName);
                        if (txtobj) {
                            txtobj.textContent = data[i].isRunning + '%';
                        }
                        txtobjName = 'txt_' + data[i].GruCod + '_STATUS' + '_1_';
                        txtobj = document.getElementById(txtobjName);
                        if (txtobj) {
                            txtobj.textContent = data[i].isRunning + '%';
                        }

 
                        var objName = data[i].GruCod + '_STATUS';
                        var obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }
                        objName = data[i].GruCod + '_STATUS' + '_1_';
                        obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }

                        var isRunName = data[i].GruCod + '_RUN';
                        var isRun = document.getElementById(isRunName);
                        if (isRun) {
                            runningObj.push({
                                'id': isRunName,
                                'transform': isRun.getAttribute("transform"),
                                'run': data[i].isRunning
                            });
                            isRun.currentTheta = 0;
                        }
                        isRunName = data[i].GruCod + '_RUN' + '_1_';
                        isRun = document.getElementById(isRunName);
                        if (isRun) {
                            runningObj.push({
                                'id': isRunName,
                                'transform': isRun.getAttribute("transform"),
                                'run': data[i].isRunning
                            });
                            isRun.currentTheta = 0;
                        }

                        elements.push({
                            'code': data[i].GruCod,
                            'type': 'GRU'
                        });

                    } //end for
                }
            });
        }

        function gruDetail(GruCod) {
            $("#usermenu").empty();           
            var hsId = localStorage.getItem("hsId");
            var req = $.DataAccess.hs_Gru_ReadByGruCod(hsId, GruCod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    data.installationDate = moment(data.installationDate).format('DD/MM/YYYY');
                    $("#tmplGruDetail").tmpl(data).appendTo("#usermenu");                   
                    loadProbeElem(GruCod);
                    if (data.stato == 0) { $('.ShowErrorLog').hide(); } else { $('.ShowErrorLog').show(); }
                    setlanguage();
                }
            });
        }

        $.fn.callEditGru = function (GruId) {
            localStorage.setItem("GruId", GruId);
            $('#synoptic').hide();
            $.module.load('Impianti/Supervisors/hs_Gru_CC');
            $('#detail').show();
        }
        /*-----------------------------------------------------------------------*/

        /*
        Boilers
        ------------------------------------------------------------------------*/
        function loadBoilers() {
            $("#boilersList").empty();
            var r = $.DataAccess.hs_Cal_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    for (var i = 0; i < data.length; i++) {

                        $('#' + data[i].CalCod).on('touchstart click', function (event) {
                            calDetail(this.id);
                            sidebar();
                        });
                        $('#' + data[i].CalCod + '_1_').on('touchstart click', function (event) {
                            calDetail(this.id.replace("_1_", ""));
                            sidebar();
                        });

                        var txtobjName = 'txt_' + data[i].CalCod + '_STATUS';
                        var txtobj = document.getElementById(txtobjName);
                        if (txtobj) {
                            txtobj.textContent = data[i].isRunning + '%';
                        }
                        txtobjName = 'txt_' + data[i].CalCod + '_STATUS' + '_1_';
                        txtobj = document.getElementById(txtobjName);
                        if (txtobj) {
                            txtobj.textContent = data[i].isRunning + '%';
                        }


                        var objName = data[i].CalCod + '_STATUS';
                        var obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }
                        objName = data[i].CalCod + '_STATUS' + '_1_';
                        obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }

                        var isRunName = data[i].CalCod + '_RUN';
                        var isRun = document.getElementById(isRunName);
                        if (isRun) {
                            runningObj.push({
                                'id': isRunName,
                                'transform': isRun.getAttribute("transform"),
                                'run': data[i].isRunning
                            });
                            isRun.currentTheta = 0;
                        }
                        isRunName = data[i].CalCod + '_RUN' + '_1_';
                        isRun = document.getElementById(isRunName);
                        if (isRun) {
                            runningObj.push({
                                'id': isRunName,
                                'transform': isRun.getAttribute("transform"),
                                'run': data[i].isRunning
                            });
                            isRun.currentTheta = 0;
                        }

                        elements.push({
                            'code': data[i].CalCod,
                            'type': 'CAL'
                        });
                                              

                    } //end for
                }
            });
        }

        function calDetail(CalCod) {
            $("#usermenu").empty();
            var hsId = localStorage.getItem("hsId");
            var req = $.DataAccess.hs_Cal_ReadByCalCod(hsId, CalCod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    data.installationDate = moment(data.installationDate).format('DD/MM/YYYY');
                    $("#tmplCalDetail").tmpl(data).appendTo("#usermenu");
                    loadProbeElem(CalCod);
                    if (data.stato == 0) { $('.ShowErrorLog').hide(); } else { $('.ShowErrorLog').show(); }
                    setlanguage();
                }
            });
        }

        $.fn.callEditCal = function (CalId) {
            localStorage.setItem("CalId", CalId);
            $('#synoptic').hide();
            $.module.load('Impianti/Supervisors/hs_Cal_CC');
            $('#detail').show();
        }
        /*----------------------------------------------------------------------*/

        /*
        Gruppo Cronotermostati
        -------------------------------------------------------------------------*/
        function loadCron() {
            $("#CronList").empty();
            var r = $.DataAccess.hs_Cron_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    
                    for (var i = 0; i < data.length; i++) {
                        $('#' + data[i].CronCod).on('touchstart click', function (event) {
                            cronDetail(this.id);
                            sidebar();
                        });
                        $('#' + data[i].CronCod + '_1_').on('touchstart click', function (event) {
                            cronDetail(this.id.replace("_1_", ""));
                            sidebar();
                        });

                        var txtobjName = 'txt_' + data[i].CronCod + '_STATUS';
                        var txtobj = document.getElementById(txtobjName);
                        if (txtobj) {
                            txtobj.textContent = data[i].isRunning + '%';
                        }
                        txtobjName = 'txt_' + data[i].Cronod + '_STATUS' + '_1_';
                        txtobj = document.getElementById(txtobjName);
                        if (txtobj) {
                            txtobj.textContent = data[i].isRunning + '%';
                        }


                        var objName = data[i].CronCod + '_STATUS';
                        var obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }
                        objName = data[i].CronCod + '_STATUS' + '_1_';
                        obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }

                        objName = data[i].CronCod + '_x5F_SETPOINT';
                        obj = document.getElementById(objName);
                        if (obj) {
                            obj.textContent = data[i].SetPoint + '°C';
                        }

                        elements.push({
                            'code': data[i].CronCod,
                            'type': 'CRON'
                        });

                    } //end for
                }
            });
        }

        function cronDetail(CronCod) {            
            $("#usermenu").empty();
         
            var hsId = localStorage.getItem("hsId");
            var req = $.DataAccess.hs_Cron_ReadByCronCod(hsId, CronCod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    localStorage.setItem("CronId", data.CronId);
                    data.installationDate = moment(data.installationDate).format('DD/MM/YYYY');
                    $("#tmplCronDetail").tmpl(data).appendTo("#usermenu");                 
                    loadProbeElem(CronCod);
                    loadcymt200Elem(CronCod);
                    setlanguage();
                    if (data.stato == 0) { $('.ShowErrorLog').hide(); } else { $('.ShowErrorLog').show(); }
                }
            });
        }

        $.fn.callEditCron = function (CronId) {
            localStorage.setItem("CronId", CronId);
            $('#detail').show();
            $('#synoptic').hide();
            $.module.load('Impianti/Supervisors/hs_Cron_Edit');
        }
        /*-----------------------------------------------------------------------*/

        /*
        Circulators
        ------------------------------------------------------------------------*/
        function loadCirculators() {           
            var r = $.DataAccess.hs_Cir_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                   
                    for (var i = 0; i < data.length; i++) {
                                               
                        $('#' + data[i].CirCod).on('touchstart click', function (event) {
                            cirDetail(this.id);
                            sidebar();
                           
                        });
                        $('#' + data[i].CirCod + '_1_').on('touchstart click', function (event) {
                            cirDetail(this.id.replace("_1_", ""));
                            sidebar();
                        });


                        var txtobjName = 'txt_' + data[i].CirCod + '_STATUS';
                        var txtobj = document.getElementById(txtobjName);
                        if (txtobj) {
                            //console.log(txtobj);
                            if (data[i].ManualMode == true) {
                                txtobj.textContent = "MAN";
                            }
                            else  {
                                txtobj.textContent = 'AUTO';
                            }                   
                        }
                        txtobjName = 'txt_' + data[i].CirCod + '_STATUS' + '_1_';
                        txtobj = document.getElementById(txtobjName);
                        if (txtobj) {
                            //console.log(txtobj);
                            if (data[i].ManualMode == true) {
                                txtobj.textContent = "MAN";
                            }
                            else {
                                txtobj.textContent = 'AUTO';
                            }
                        }

                        var objName = data[i].CirCod + '_STATUS';
                        var obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }
                        objName = data[i].CirCod + '_STATUS' + '_1_';
                        obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }
                        
                        var isRunName = data[i].CirCod + '_RUN';
                        var isRun = document.getElementById(isRunName);
                        if (isRun) {
                            runningObj.push({
                                'id': isRunName,
                                'transform': isRun.getAttribute("transform"),
                                'run': data[i].isRunning
                            });
                            isRun.currentTheta = 0;                                               
                        }
                        //isRunName = data[i].CirCod + '_RUN' + '_1_';
                        //isRun = document.getElementById(isRunName);
                        //if (isRun) {
                        //    runningObj.push({
                        //        'id': isRunName,
                        //        'transform': isRun.getAttribute("transform"),
                        //        'run': data[i].isRunning
                        //    });
                        //    isRun.currentTheta = 0;
                        //}

                        //console.log(data[i].CirCod, data[i].isRunning);

                        elements.push({
                            'code': data[i].CirCod,
                            'type': 'CIR'
                        });

                    } //end for

                   
                }
            });
        }

        function cirDetail(CirCod) {
            $("#usermenu").empty();
      
            var hsId = localStorage.getItem("hsId");
            var req = $.DataAccess.hs_Cir_ReadByCirCod(hsId, CirCod);
            req.success(function (json) {
                var data = json.d;
                if (data) {                    
                    data.installationDate = moment(data.installationDate).format('DD/MM/YYYY');
                    $("#tmplCirDetail").tmpl(data).appendTo("#usermenu");                  
                    loadProbeElem(CirCod);
                    setlanguage();
                    if (data.stato == 0) { $('.ShowErrorLog').hide(); } else { $('.ShowErrorLog').show(); }
                    //readCurrentCirProfile(data.CirId);
                    setTimeout(function () { readCurrentCirProfile(data.CirId);; }, 200);
                }
            });
        }

        function readCurrentCirProfile(CirId) {
            console.log('readCurrentCirProfile', CirId);
            $("#CronoProfilesList").empty();
            var currMonth = moment().month() + 1;
            var currYear = moment().year();
            var currDay = moment().date();
            //console.log('mese/anno/giorni', currMonth, currYear, currDay);
            var now = moment([currYear, currMonth - 1, currDay]).format("DD/MM");
            var req = $.DataAccess.hs_CirCron_List(CirId);
            req.success(function (json) {
                var data = json.d;
                console.log('hs_CirCron_List', data);
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        var CronId = data[i].CronId;
                        var CronCod = data[i].CronCod;
                        //var r = $.DataAccess.hs_Cron_Calendar_get(CronId, currYear, currMonth);
                        var r = $.DataAccess.hs_Cron_CalendarReadFromDB(CronId, currYear, currMonth);
                        //console.log('hs_Cron_Calendar_get', CronId, currYear, currMonth);
                        r.success(function (json) {
                            var dataCronCalendar = json.d;
                            //console.log('dataCronCalendar', dataCronCalendar);
                            if (dataCronCalendar) {
                                //console.log('dataCronCalendar', dataCronCalendar);
                                for (var i = 1; i < daysInMonth(currMonth, currYear) + 1 ; i++) {
                                    var dd = moment([currYear, currMonth - 1, i]).format("DD/MM");
                                    if (dd == now) {
                                        //console.log('data ok');
                                        //var r2 = $.DataAccess.hs_cron_Profile_get(localStorage.getItem("hsId"),CronCod, currYear, dataCronCalendar.RealMonthData[i - 1]);
                                        var r2 = $.DataAccess.hs_cron_Profile_Read(CronId, currYear, dataCronCalendar.RealMonthData[i - 1]);
                                        r2.success(function (json) {
                                            var profileData = json.d;
                                            console.log('profileData', profileData);                                                                                    
                                            populateTable(profileData);
                                        });

                                    }
                                }
                            }
                        });
                    }
                }
            });
        }

        $.fn.CallChangeCirCurrentProfile = function (CirId) {
            //var req = $.DataAccess.hs_CirCron_List(localStorage.getItem("CirId"));
            //req.success(function (json) {
            //    var data = json.d;
            //    if (data) {
            //        localStorage.setItem("CronId", data[0].CronId);
            //        $.module.load('Impianti/Supervisors/hs_Cron_calendar');
            //    }
            //});

            //localStorage.setItem("CirId", CirId);
            //$.module.load('synoptic/supervisors/ChangeCirCurrentProfile');
        }
        /*----------------------------------------------------------------------*/

        /*
        Cird
        ------------------------------------------------------------------------*/
        function loadCird() {
            var r = $.DataAccess.hs_Cird_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {

                    for (var i = 0; i < data.length; i++) {

                        $('#' + data[i].Cod).on('touchstart click', function (event) {
                            cirdDetail(this.id);
                            sidebar();

                        });
                        $('#' + data[i].Cod + '_1_').on('touchstart click', function (event) {
                            cirdDetail(this.id.replace("_1_", ""));
                            sidebar();
                        });


                        var txtobjName = 'txt_' + data[i].Cod + '_STATUS';
                        var txtobj = document.getElementById(txtobjName);
                        if (txtobj) {
                            //console.log(txtobj);
                            if (data[i].ManualMode == true) {
                                txtobj.textContent = "MAN";
                            }
                            else {
                                txtobj.textContent = 'AUTO';
                            }
                        }
                        txtobjName = 'txt_' + data[i].Cod + '_STATUS' + '_1_';
                        txtobj = document.getElementById(txtobjName);
                        if (txtobj) {
                            //console.log(txtobj);
                            if (data[i].ManualMode == true) {
                                txtobj.textContent = "MAN";
                            }
                            else {
                                txtobj.textContent = 'AUTO';
                            }
                        }

                        var objName = data[i].Cod + '_STATUS';
                        var obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }
                        objName = data[i].Cod + '_STATUS' + '_1_';
                        obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }

                        var objName = data[i].Cod + '_STATUS1';
                        var obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }
                        var objName = data[i].Cod + '_STATUS2';
                        var obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }

                        var isRunName = data[i].Cod + '_RUN1';
                        var isRun = document.getElementById(isRunName);
                        if (isRun) {
                            runningObj.push({
                                'id': isRunName,
                                'transform': isRun.getAttribute("transform"),
                                'run': data[i].isRunning1
                            });
                            isRun.currentTheta = 0;
                        }
                        var isRunName = data[i].Cod + '_RUN2';
                        var isRun = document.getElementById(isRunName);
                        if (isRun) {
                            runningObj.push({
                                'id': isRunName,
                                'transform': isRun.getAttribute("transform"),
                                'run': data[i].isRunning2
                            });
                            isRun.currentTheta = 0;
                        }


                        //console.log(data[i].CirCod, data[i].isRunning);

                        elements.push({
                            'code': data[i].Cod,
                            'type': 'CIRD'
                        });

                    } //end for


                }
            });
        }

        function cirdDetail(CirCod) {
            $("#usermenu").empty();

            var hsId = localStorage.getItem("hsId");
            var req = $.DataAccess.hs_Cird_ReadByCod(hsId, CirCod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    data.installationDate = moment(data.installationDate).format('DD/MM/YYYY');
                    $("#tmplCirdDetail").tmpl(data).appendTo("#usermenu");
                    loadProbeElem(CirCod);
                    setlanguage();
                    if (data.stato == 0) { $('.ShowErrorLog').hide(); } else { $('.ShowErrorLog').show(); }
                    //readCurrentCirProfile(data.CirId);
                    setTimeout(function () { readCurrentCirProfile(data.Id); }, 200);
                }
            });
        }

        $.fn.CallChangeCirdCurrentProfile = function (CirId) {
            localStorage.setItem("CirId", CirId);
            $.module.load('synoptic/supervisors/ChangeCirdCurrentProfile');
        }
        /*----------------------------------------------------------------------*/

        /*
        Cirm
        ------------------------------------------------------------------------*/
        function loadCirm() {
            var r = $.DataAccess.hs_Cirm_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {

                    for (var i = 0; i < data.length; i++) {

                        $('#' + data[i].Cod).on('touchstart click', function (event) {
                            cirmDetail(this.id);
                            sidebar();

                        });
                        $('#' + data[i].Cod + '_1_').on('touchstart click', function (event) {
                            cirmDetail(this.id.replace("_1_", ""));
                            sidebar();
                        });


                        var txtobjName = 'txt_' + data[i].Cod + '_STATUS';
                        var txtobj = document.getElementById(txtobjName);
                        if (txtobj) {
                            //console.log(txtobj);
                            if (data[i].ManualMode == true) {
                                txtobj.textContent = "MAN";
                            }
                            else {
                                txtobj.textContent = 'AUTO';
                            }
                        }
                        txtobjName = 'txt_' + data[i].Cod + '_STATUS' + '_1_';
                        txtobj = document.getElementById(txtobjName);
                        if (txtobj) {
                            //console.log(txtobj);
                            if (data[i].ManualMode == true) {
                                txtobj.textContent = "MAN";
                            }
                            else {
                                txtobj.textContent = 'AUTO';
                            }
                        }

                        var objName = data[i].Cod + '_STATUS';
                        var obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }
                        objName = data[i].Cod + '_STATUS' + '_1_';
                        obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }

                        var isRunName = data[i].Cod + '_RUN';
                        var isRun = document.getElementById(isRunName);
                        if (isRun) {
                            runningObj.push({
                                'id': isRunName,
                                'transform': isRun.getAttribute("transform"),
                                'run': data[i].isRunning
                            });
                            isRun.currentTheta = 0;
                        }
                        //isRunName = data[i].CirCod + '_RUN' + '_1_';
                        //isRun = document.getElementById(isRunName);
                        //if (isRun) {
                        //    runningObj.push({
                        //        'id': isRunName,
                        //        'transform': isRun.getAttribute("transform"),
                        //        'run': data[i].isRunning
                        //    });
                        //    isRun.currentTheta = 0;
                        //}

                        //console.log(data[i].CirCod, data[i].isRunning);

                        elements.push({
                            'code': data[i].Cod,
                            'type': 'CIRM'
                        });

                    } //end for


                }
            });
        }

        function cirmDetail(CirCod) {
            $("#usermenu").empty();

            var hsId = localStorage.getItem("hsId");
            var req = $.DataAccess.hs_Cirm_ReadByCod(hsId, CirCod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    data.installationDate = moment(data.installationDate).format('DD/MM/YYYY');
                    $("#tmplCirmDetail").tmpl(data).appendTo("#usermenu");
                    loadProbeElem(CirCod);
                    setlanguage();
                    if (data.stato == 0) { $('.ShowErrorLog').hide(); } else { $('.ShowErrorLog').show(); }
                    //readCurrentCirProfile(data.CirId);
                    setTimeout(function () { readCurrentCirProfile(data.Id); }, 200);
                }
            });
        }

        $.fn.CallChangeCirmCurrentProfile = function (CirId) {
            localStorage.setItem("CirId", CirId);
            $.module.load('synoptic/supervisors/ChangeCirmCurrentProfile');
        }
        /*----------------------------------------------------------------------*/

        /*
        Cirdm
        ------------------------------------------------------------------------*/
        function loadCirdm() {
            var r = $.DataAccess.hs_Cirdm_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {

                    for (var i = 0; i < data.length; i++) {

                        $('#' + data[i].Cod).on('touchstart click', function (event) {
                            cirdmDetail(this.id);
                            sidebar();

                        });
                        $('#' + data[i].Cod + '_1_').on('touchstart click', function (event) {
                            cirdmDetail(this.id.replace("_1_", ""));
                            sidebar();
                        });


                        var txtobjName = 'txt_' + data[i].Cod + '_STATUS';
                        var txtobj = document.getElementById(txtobjName);
                        if (txtobj) {
                            //console.log(txtobj);
                            if (data[i].ManualMode == true) {
                                txtobj.textContent = "MAN";
                            }
                            else {
                                txtobj.textContent = 'AUTO';
                            }
                        }
                        txtobjName = 'txt_' + data[i].Cod + '_STATUS' + '_1_';
                        txtobj = document.getElementById(txtobjName);
                        if (txtobj) {
                            //console.log(txtobj);
                            if (data[i].ManualMode == true) {
                                txtobj.textContent = "MAN";
                            }
                            else {
                                txtobj.textContent = 'AUTO';
                            }
                        }
                        txtobjName = 'txt_' + data[i].Cod + '_STATUS' + '1';
                        txtobj = document.getElementById(txtobjName);
                        if (txtobj) {
                            //console.log(txtobj);
                            if (data[i].ManualMode == true) {
                                txtobj.textContent = "MAN";
                            }
                            else {
                                txtobj.textContent = 'AUTO';
                            }
                        }

                        var objName = data[i].Cod + '_STATUS';
                        var obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }
                        objName = data[i].Cod + '_STATUS' + '_1_';
                        obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }

                        var objName = data[i].Cod + '_STATUS1';
                        var obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }
                        var objName = data[i].Cod + '_STATUS2';
                        var obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }

                        var isRunName = data[i].Cod + '_RUN1';
                        var isRun = document.getElementById(isRunName);
                        if (isRun) {
                            runningObj.push({
                                'id': isRunName,
                                'transform': isRun.getAttribute("transform"),
                                'run': data[i].isRunning1
                            });
                            isRun.currentTheta = 0;
                        }
                        var isRunName = data[i].Cod + '_RUN2';
                        var isRun = document.getElementById(isRunName);
                        if (isRun) {
                            runningObj.push({
                                'id': isRunName,
                                'transform': isRun.getAttribute("transform"),
                                'run': data[i].isRunning2
                            });
                            isRun.currentTheta = 0;
                        }

                        //console.log(data[i].CirCod, data[i].isRunning);

                        elements.push({
                            'code': data[i].Cod,
                            'type': 'CIRDM'
                        });

                    } //end for


                }
            });
        }

        function cirdmDetail(CirCod) {
            $("#usermenu").empty();

            var hsId = localStorage.getItem("hsId");
            var req = $.DataAccess.hs_Cirdm_ReadByCod(hsId, CirCod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    data.installationDate = moment(data.installationDate).format('DD/MM/YYYY');
                    $("#tmplCirdmDetail").tmpl(data).appendTo("#usermenu");
                    loadProbeElem(CirCod);
                    setlanguage();
                    if (data.stato == 0) { $('.ShowErrorLog').hide(); } else { $('.ShowErrorLog').show(); }
                    //readCurrentCirProfile(data.CirId);
                    setTimeout(function () { readCurrentCirProfile(data.Id); }, 200);
                }
            });
        }
        
        $.fn.CallChangeCirdmCurrentProfile = function (CirId) {
            localStorage.setItem("CirId", CirId);
            $.module.load('synoptic/supervisors/ChangeCirdmCurrentProfile');
        }
        /*----------------------------------------------------------------------*/

        /*
        hvac
        ------------------------------------------------------------------------*/
        function loadhvac() {
            var r = $.DataAccess.hs_hvac_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {

                    for (var i = 0; i < data.length; i++) {

                        $('#' + data[i].Cod).on('touchstart click', function (event) {
                            hvacDetail(this.id);
                            sidebar();

                        });
                        $('#' + data[i].Cod + '_1_').on('touchstart click', function (event) {
                            hvacDetail(this.id.replace("_1_", ""));
                            sidebar();
                        });


                        var objName = data[i].Cod + '_STATUS';
                        var obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }
                        objName = data[i].Cod + '_STATUS' + '_1_';
                        obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }

                        var isRunName = data[i].Cod + '_RUN';
                        var isRun = document.getElementById(isRunName);
                        if (isRun) {
                            runningObj.push({
                                'id': isRunName,
                                'transform': isRun.getAttribute("transform"),
                                'run': data[i].isRunning
                            });
                            isRun.currentTheta = 0;
                        }
                        //isRunName = data[i].CirCod + '_RUN' + '_1_';
                        //isRun = document.getElementById(isRunName);
                        //if (isRun) {
                        //    runningObj.push({
                        //        'id': isRunName,
                        //        'transform': isRun.getAttribute("transform"),
                        //        'run': data[i].isRunning
                        //    });
                        //    isRun.currentTheta = 0;
                        //}

                        //console.log(data[i].CirCod, data[i].isRunning);

                        elements.push({
                            'code': data[i].Cod,
                            'type': 'HVAC'
                        });

                    } //end for


                }
            });
        }

        function hvacDetail(Cod) {
            $("#usermenu").empty();

            var hsId = localStorage.getItem("hsId");
            var req = $.DataAccess.hs_hvac_ReadByCod(hsId, Cod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    data.installationDate = moment(data.installationDate).format('DD/MM/YYYY');
                    $("#tmplhvacDetail").tmpl(data).appendTo("#usermenu");
                    loadProbeElem(Cod);
                    setlanguage();
                    if (data.stato == 0) { $('.ShowErrorLog').hide(); } else { $('.ShowErrorLog').show(); }
                }
            });
        }
        /*----------------------------------------------------------------------*/

        /*
        cymt200 (ZTHL)
        ------------------------------------------------------------------------*/
        function loadcymt200() {
            var r = $.DataAccess.cymt200_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {

                    for (var i = 0; i < data.length; i++) {

                        $('#' + data[i].Cod).on('touchstart click', function (event) {
                            cymt200Detail(this.id);
                            sidebar();

                        });
                        $('#' + data[i].Cod + '_1_').on('touchstart click', function (event) {
                            cymt200Detail(this.id.replace("_1_", ""));
                            sidebar();
                        });


                        var objName = data[i].Cod + '_STATUS';
                        var obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }
                        objName = data[i].Cod + '_STATUS' + '_1_';
                        obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }

                        objName = data[i].Cod + 'TEMPERATURE';
                        obj = document.getElementById(objName);
                        if (obj) {                            
                            obj.textContent = Number(data[i].Temperature).toLocaleString() + '°C';
                            $(obj).css("font-size", "5px");
                        }
                        objName = data[i].Cod + 'HUMIDITY';
                        obj = document.getElementById(objName);
                        if (obj) {                            
                            obj.textContent = Number(data[i].Humidity).toLocaleString() + '%';
                            $(obj).css("font-size", "5px");
                        }
                        objName = data[i].Cod + 'LIGHT';
                        obj = document.getElementById(objName);
                        if (obj) {
                            obj.textContent = Number(data[i].Light).toLocaleString() + 'Lux';
                            $(obj).css("font-size", "5px");
                        }


                        //var isRunName = data[i].Cod + '_RUN';
                        //var isRun = document.getElementById(isRunName);
                        //if (isRun) {
                        //    runningObj.push({
                        //        'id': isRunName,
                        //        'transform': isRun.getAttribute("transform"),
                        //        'run': data[i].isRunning
                        //    });
                        //    isRun.currentTheta = 0;
                        //}


                        //console.log(data[i].CirCod, data[i].isRunning);

                        elements.push({
                            'code': data[i].Cod,
                            'type': 'CYMT200'
                        });

                    } //end for


                }
            });
        }

        function cymt200Detail(Cod) {
            $("#usermenu").empty();

            var hsId = localStorage.getItem("hsId");
            var req = $.DataAccess.cymt200_ReadByCod(hsId, Cod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    data.installationDate = moment(data.installationDate).format('DD/MM/YYYY');
                    $("#tmplcymt200Detail").tmpl(data).appendTo("#usermenu");
                    setlanguage();
                    if (data.stato == 0) { $('.ShowErrorLog').hide(); } else { $('.ShowErrorLog').show(); }
                   
                }
            });
        }
        /*----------------------------------------------------------------------*/

        /*
        Lux
        ------------------------------------------------------------------------*/
        function loadLux() {
            var r = $.DataAccess.Lux_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {

                    for (var i = 0; i < data.length; i++) {

                        $('#' + data[i].Cod).on('touchstart click', function (event) {
                            LuxDetail(this.id);
                            sidebar();

                        });
                        $('#' + data[i].Cod + '_1_').on('touchstart click', function (event) {
                            LuxDetail(this.id.replace("_1_", ""));
                            sidebar();
                        });


                        var objName = data[i].Cod + '_STATUS';
                        var obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }
                        objName = data[i].Cod + '_STATUS' + '_1_';
                        obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }

                        objName = data[i].Cod + 'ONOFF';
                        obj = document.getElementById(objName);
                        if (obj) {
                            obj.textContent = Number(data[i].LightON).toLocaleString();
                            $(obj).css("font-size", "5px");
                        }

                        var svgElement = document.getElementById(data[i].Cod); // get the parent node
                        var circles = svgElement.getElementsByTagName('circle'); // get child nodes 
                        for (var ii = 0; ii < circles.length; ii++) {
                            console.log(data[i].Cod, data[i].LightON);
                            if (data[i].LightON) {
                                circles[ii].style.fill = $giallo;
                            }
                            else {
                                circles[ii].style.fill = $grigio;
                            }
                        }

                        //var isRunName = data[i].Cod + '_RUN';
                        //var isRun = document.getElementById(isRunName);
                        //if (isRun) {
                        //    runningObj.push({
                        //        'id': isRunName,
                        //        'transform': isRun.getAttribute("transform"),
                        //        'run': data[i].isRunning
                        //    });
                        //    isRun.currentTheta = 0;
                        //}


                        //console.log(data[i].CirCod, data[i].isRunning);

                        elements.push({
                            'code': data[i].Cod,
                            'type': 'LUX'
                        });

                    } //end for


                }
            });
        }

        function LuxDetail(Cod) {
            $("#usermenu").empty();

            var hsId = localStorage.getItem("hsId");
            var req = $.DataAccess.Lux_ReadByCod(hsId, Cod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    data.installationDate = moment(data.installationDate).format('DD/MM/YYYY');
                    $("#tmplLuxDetail").tmpl(data).appendTo("#usermenu");
                    setlanguage();
                    if (data.stato == 0) { $('.ShowErrorLog').hide(); } else { $('.ShowErrorLog').show(); }

                }
            });
        }
        /*----------------------------------------------------------------------*/

        /*
        profiles
        -------------------------------------------------------------------------*/
        var editGraphData = []
        ProfileData = [];
        var $plotupd;
        var options = {
            series: {
                lines: {
                    show: true
                },
                points: {
                    show: false
                }
            },
            grid: {
                hoverable: true,
                clickable: true
            },
            xaxis: {
                mode: "time",
                timeformat: "%H:%M"
            },
            selection: {
                mode: "x"
            }
        };
        function populateTable(data) {
            
            $("#tmplProfile").tmpl(data).appendTo("#CronoProfilesList");

            //var div2plot = "#placeholder_" + data.ProfileNr;
            //var d1 = [];
            //for (var i = 0; i < 97; i++) {
            //    d1.push([i, data.ProfileData[i]]);
            //}
            //$.plot(div2plot, [{ data: d1 }]);

            var div2plot = "#placeholder_" + data.ProfileNr;
            var d1 = [];
            editGraphData = [];
            ProfileData = [];
            var d0 = new Date(2015, 1, 1),
                d1 = new Date(d0);
            for (var i = 0; i < 96; i++) {
                var temp = parseFloat(data.ProfileData[i]).toFixed(1);
                $('#' + i).text(temp);
                var date1 = new Date(d1);
                editGraphData.push([date1, temp]);
                ProfileData.push(temp);
                d1 = new Date(moment(d0).add(15, 'm'));
                d0 = new Date(d1);
            }
            var graphData = [];
            graphData.push({ data: editGraphData });
            $.plot(div2plot, graphData, options)
        }
        /*----------------------------------------------------------------------*/

        /*
        CTB - Contabilizzatori di calore
        ------------------------------------------------------------------------*/
        function loadCtb() {
            var r = $.DataAccess.hs_Ctb_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {

                    for (var i = 0; i < data.length; i++) {

                        $('#' + data[i].CtbCod).on('touchstart click', function (event) {
                            ctbDetail(this.id);
                            sidebar();

                        });
                        $('#' + data[i].CtbCod + '_1_').on('touchstart click', function (event) {
                            ctbDetail(this.id.replace("_1_", ""));
                            sidebar();
                        });


                        var txtobjName = 'txt_' + data[i].CtbCod + '_STATUS';
                        var txtobj = document.getElementById(txtobjName);
                        if (txtobj) {
                            //console.log(txtobj);
                            if (data[i].ManualMode == true) {
                                txtobj.textContent = "MANUALE";
                            }
                            else {
                                txtobj.textContent = 'AUTO';
                            }
                        }
                        txtobjName = 'txt_' + data[i].CtbCod + '_STATUS' + '_1_';
                        txtobj = document.getElementById(txtobjName);
                        if (txtobj) {
                            //console.log(txtobj);
                            if (data[i].ManualMode == true) {
                                txtobj.textContent = "MANUALE";
                            }
                            else {
                                txtobj.textContent = 'AUTO';
                            }
                        }

                        var objName = data[i].CtbCod + '_STATUS';
                        var obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }
                        objName = data[i].CtbCod + '_STATUS' + '_1_';
                        obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }

                  
                        elements.push({
                            'code': data[i].CtbCod,
                            'type': 'CTB'
                        });

                    } //end for


                }
            });
        }

        function ctbDetail(CtbCod) {
            $("#usermenu").empty();

            var hsId = localStorage.getItem("hsId");
            var req = $.DataAccess.hs_ctb_ReadByCtbCod(hsId, CtbCod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    data.installationDate = moment(data.installationDate).format('DD/MM/YYYY');
                    $("#tmplCtbDetail").tmpl(data).appendTo("#usermenu");
                    loadProbeElem(CtbCod);
                    setlanguage();
                    if (data.stato == 0) { $('.ShowErrorLog').hide(); } else { $('.ShowErrorLog').show(); }
                }
            });
        }
        /*----------------------------------------------------------------------*/

        /*
        GAS / GASM - Analogici / digitali
        ------------------------------------------------------------------------*/
        function loadGas() {
            var r = $.DataAccess.hs_Gas_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {

                    for (var i = 0; i < data.length; i++) {

                        $('#' + data[i].Cod).on('touchstart click', function (event) {
                            gasDetail(this.id);
                            sidebar();

                        });
                        $('#' + data[i].Cod + '_1_').on('touchstart click', function (event) {
                            GasDetail(this.id.replace("_1_", ""));
                            sidebar();
                        });


                        var txtobjName = 'txt_' + data[i].Cod + '_STATUS';
                        var txtobj = document.getElementById(txtobjName);
                        if (txtobj) {
                            //console.log(txtobj);
                            if (data[i].ManualMode == true) {
                                txtobj.textContent = "MANUALE";
                            }
                            else {
                                txtobj.textContent = 'AUTO';
                            }
                        }
                        txtobjName = 'txt_' + data[i].Cod + '_STATUS' + '_1_';
                        txtobj = document.getElementById(txtobjName);
                        if (txtobj) {
                            //console.log(txtobj);
                            if (data[i].ManualMode == true) {
                                txtobj.textContent = "MANUALE";
                            }
                            else {
                                txtobj.textContent = 'AUTO';
                            }
                        }

                        var objName = data[i].Cod + '_STATUS';
                        var obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }
                        objName = data[i].Cod + '_STATUS' + '_1_';
                        obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }


                        elements.push({
                            'code': data[i].Cod,
                            'type': 'GAS'
                        });

                    } //end for


                }
            });
        }

        function gasDetail(Cod) {
            $("#usermenu").empty();

            var hsId = localStorage.getItem("hsId");
            var req = $.DataAccess.hs_Gas_ReadByCod(hsId, Cod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    data.installationDate = moment(data.installationDate).format('DD/MM/YYYY');
                    $("#tmplGasDetail").tmpl(data).appendTo("#usermenu");
                    loadProbeElem(Cod);
                    setlanguage();
                    if (data.stato == 0) { $('.ShowErrorLog').hide(); } else { $('.ShowErrorLog').show(); }
                }
            });
        }
        /*----------------------------------------------------------------------*/

        /*
        Servomotors
        ------------------------------------------------------------------------*/
        function loadServomotors() {
            $("#ServomotorsList").empty();
            var r = $.DataAccess.hs_Vrd_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {

                    for (var i = 0; i < data.length; i++) {

                        $('#' + data[i].VrdCod).on('touchstart click', function (event) {
                            vrdDetail(this.id);
                            sidebar();
                        });
                        $('#' + data[i].VrdCod + '_1_').on('touchstart click', function (event) {
                            vrdDetail(this.id.replace("_1_", ""));
                            sidebar();
                        });

                        var txtobjName = 'txt_' + data[i].VrdCod + '_STATUS';
                        var txtobj = document.getElementById(txtobjName);
                        if (txtobj) { txtobj.textContent = data[i].Position + '%'; }
                        txtobjName = 'txt_' + data[i].VrdCod + '_STATUS' + '_1_';
                        txtobj = document.getElementById(txtobjName);
                        if (txtobj) { txtobj.textContent = data[i].Position + '%'; }


                        var objName = data[i].VrdCod + '_STATUS';
                        var obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }
                        objName = data[i].VrdCod + '_STATUS' + '_1_';
                        obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }

                        var isRunName = data[i].VrdCod + '_RUN';
                        var isRun = document.getElementById(isRunName);
                        if (isRun) {
                            runningObj.push({
                                'id': isRunName,
                                'transform': isRun.getAttribute("transform"),
                                'run': data[i].Position
                            });
                            isRun.currentTheta = 0;
                        }
                        isRunName = data[i].VrdCod + '_RUN' + '_1_';
                        isRun = document.getElementById(isRunName);
                        if (isRun) {
                            runningObj.push({
                                'id': isRunName,
                                'transform': isRun.getAttribute("transform"),
                                'run': data[i].Position
                            });
                            isRun.currentTheta = 0;
                        }

                        elements.push({
                            'code': data[i].VrdCod,
                            'type': 'VRD'
                        });

                    } //end for
                }

                //var requestAnimationFrameID = requestAnimationFrame(doAnim);
            });
        }

        function vrdDetail(VrdCod) {
            $("#usermenu").empty();
            var hsId = localStorage.getItem("hsId");
            var req = $.DataAccess.hs_Vrd_ReadByVrdCod(hsId, VrdCod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    data.installationDate = moment(data.installationDate).format('DD/MM/YYYY');
                    $("#tmplVrdDetail").tmpl(data).appendTo("#usermenu");
                    if (data.stato == 0) { $('.ShowErrorLog').hide(); } else { $('.ShowErrorLog').show(); }
                    setlanguage();
                }
            });
        }
        /*----------------------------------------------------------------------*/


        /*
        ANZ / Analizzatori di rete
        ------------------------------------------------------------------------*/
        function loadAnz() {
            var r = $.DataAccess.hs_Anz_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    for (var i = 0; i < data.length; i++) {

                        $('#' + data[i].Cod).on('touchstart click', function (event) {
                            anzDetail(this.id);
                            sidebar();

                        });
                        $('#' + data[i].Cod + '_1_').on('touchstart click', function (event) {
                            anzDetail(this.id.replace("_1_", ""));
                            sidebar();
                        });
                      

                        var objName = data[i].Cod + '_STATUS';
                        var obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }
                        objName = data[i].Cod + '_STATUS' + '_1_';
                        obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }

                        objName = data[i].Cod + 'ENERGY';                       
                        obj = document.getElementById(objName);
                        if (obj) {
                            data[i].ActiveEnergy = Number(data[i].ActiveEnergy / 1000).toLocaleString();
                            obj.textContent = data[i].ActiveEnergy + 'kW';
                            $(obj).css("font-size", "5px");
                        }
                        objName = data[i].Cod + 'POWER';
                        obj = document.getElementById(objName);
                        if (obj) {
                            data[i].ActivePower = Number(data[i].ActivePower / 1000).toLocaleString();
                            obj.textContent = data[i].ActivePower + 'kW';
                            $(obj).css("font-size", "5px");
                        }

                        objName = data[i].Cod + 'ENERGY' + '_1_';
                        obj = document.getElementById(objName);
                        if (obj) {
                          
                            obj.textContent = data[i].ActiveEnergy + 'kW';
                            $(obj).css("font-size", "5px");
                        }
                        objName = data[i].Cod + 'POWER' + '_1_';
                        obj = document.getElementById(objName);
                        if (obj) {
                            
                            obj.textContent = data[i].ActivePower + 'kW';
                            $(obj).css("font-size", "5px");
                        }


                        elements.push({
                            'code': data[i].Cod,
                            'type': 'GAS'
                        });

                    } //end for


                }
            });
        }

        function anzDetail(Cod) {
            $("#usermenu").empty();

            var hsId = localStorage.getItem("hsId");
            var req = $.DataAccess.hs_Anz_ReadByCod(hsId, Cod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    data.installationDate = moment(data.installationDate).format('DD/MM/YYYY');
                    $("#tmplAnzDetail").tmpl(data).appendTo("#usermenu");
                    //loadProbeElem(Cod);
                    setlanguage();
                    if (data.stato == 0) { $('.ShowErrorLog').hide(); } else { $('.ShowErrorLog').show(); }
                }
            });
        }

        $.fn.callEditAnz = function (AnzId) {
            localStorage.setItem("AnzId", AnzId);
            $('#detail').show();
            $('#synoptic').hide();
            $.module.load('Impianti/Supervisors/Device8Anz');
        }
        /*----------------------------------------------------------------------*/

        /*
        Probes
        ------------------------------------------------------------------------*/
        function loadProbes() {
            $("#ProbesList").empty();
            var r = $.DataAccess.hs_TemperatureProbes_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    for (var i = 0; i < data.length; i++) {

                        $('#' + data[i].ProbeCod).on('touchstart click', function (event) {
                            TemperatureProbeDetail(this.id);
                            sidebar();
                        });
                        $('#' + data[i].ProbeCod + '_1_').on('touchstart click', function (event) {
                            TemperatureProbeDetail(this.id.replace("_1_", ""));
                            sidebar();
                        });

                        var txtobjName = 'txt_' + data[i].ProbeCod + '_STATUS';
                        var txtobj = document.getElementById(txtobjName);
                        if (txtobj) { txtobj.textContent = data[i].currentValue + '°C' }
                        txtobjName = 'txt_' + data[i].ProbeCod + '_STATUS' + '_1_';
                        txtobj = document.getElementById(txtobjName);
                        if (txtobj) { txtobj.textContent = data[i].currentValue + '°C' }

                        var objName = data[i].ProbeCod + '_STATUS';
                        var obj = document.getElementById(objName);
                        if (obj) { obj.style.fill = $verde; }
                        objName = data[i].ProbeCod + '_STATUS' + '_1_';
                        obj = document.getElementById(objName);
                        if (obj) { obj.style.fill = $verde; }

                        elements.push({
                            'code': data[i].ProbeCod,
                            'type': 'S'
                        });
                    } //end for
                }
            });
        }

        function TemperatureProbeDetail(probeCod) {
            $("#usermenu").empty();
            var hsId = localStorage.getItem("hsId");
            var req = $.DataAccess.hs_TemperatureProbes_ReadByProbeCod(hsId, probeCod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    data.installationDate = moment(data.installationDate).format('DD/MM/YYYY');
                    $("#tmplProbeDetail").tmpl(data).appendTo("#usermenu");
                    if (data.stato == 0) { $('.ShowErrorLog').hide(); } else { $('.ShowErrorLog').show(); }
                    setlanguage();
                }
            });
        }
        /*----------------------------------------------------------------------*/

        /*
        Flowmeters
        ------------------------------------------------------------------------*/
        function loadCtl() {
            $("#CtlList").empty();
            var r = $.DataAccess.hs_Ctl_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {

                    for (var i = 0; i < data.length; i++) {

                        $('#' + data[i].CtlCod).on('touchstart click', function (event) {
                            ctlDetail(this.id);
                            sidebar();
                        });
                        $('#' + data[i].CtlCod + '_1_').on('touchstart click', function (event) {
                            ctlDetail(this.id.replace("_1_", ""));
                            sidebar();
                        });

                        var txtobjName = 'txt_' + data[i].CtlCod + '_STATUS';
                        var txtobj = document.getElementById(txtobjName);
                        if (txtobj) { txtobj.textContent = data[i].currentValue + 'L' }
                        txtobjName = 'txt_' + data[i].CtlCod + '_STATUS' + '_1_';
                        txtobj = document.getElementById(txtobjName);
                        if (txtobj) { txtobj.textContent = data[i].currentValue + 'L' }

                        var objName = data[i].CtlCod + '_STATUS';
                        var obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }
                        objName = data[i].CtlCod + '_STATUS' + '_STATUS';
                        obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }

                        elements.push({
                            'code': data[i].CtlCod,
                            'type': 'CTL'
                        });
                    } //end for
                }
            });
        }

        function ctlDetail(CtlCod) {
            $("#usermenu").empty();
            var hsId = localStorage.getItem("hsId");
            var req = $.DataAccess.hs_Ctl_ReadByCtlCod(hsId, CtlCod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    data.installationDate = moment(data.installationDate).format('DD/MM/YYYY');
                    $("#tmplCtlDetail").tmpl(data).appendTo("#usermenu");
                    if (data.stato == 0) { $('.ShowErrorLog').hide(); } else { $('.ShowErrorLog').show(); }
                    setlanguage();
                }
            });
        }

        $.fn.callUpdateCtl = function (CtlId) {
            localStorage.setItem("CtlId", CtlId);
            $.module.load('Impianti/supervisors/hs_Ctl_Update');
        }
        /*----------------------------------------------------------------------*/

        /*
        Meters
        ------------------------------------------------------------------------*/
        function loadCtb() {
            $("#CtbList").empty();
            var r = $.DataAccess.hs_Ctb_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        $('#' + data[i].CtbCod).on('touchstart click', function (event) {
                            ctbDetail(this.id);
                            sidebar();
                        });
                        $('#' + data[i].CtbCod + '_1_').on('touchstart click', function (event) {
                            ctbDetail(this.id.replace("_1_", ""));
                            sidebar();
                        });


                        var txtobjName = 'txt_' + data[i].CtbCod + '_STATUS';
                        var txtobj = document.getElementById(txtobjName);
                        if (txtobj) { txtobj.textContent = data[i].currentValue }
                        txtobjName = 'txt_' + data[i].CtbCod + '_STATUS' + '_1_';
                        txtobj = document.getElementById(txtobjName);
                        if (txtobj) { txtobj.textContent = data[i].currentValue }


                        var objName = data[i].CtbCod + '_STATUS';
                        var obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }
                        var objName = data[i].CtbCod + '_STATUS' + '_1_';
                        var obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }

                        elements.push({
                            'code': data[i].CtbCod,
                            'type': 'CTB'
                        });

                    } //end for
                }
            });
        }

        function ctbDetail(CtbCod) {
            $("#usermenu").empty();
            var hsId = localStorage.getItem("hsId");
            var req = $.DataAccess.hs_Ctb_ReadByCtbCod(hsId, CtbCod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    data.installationDate = moment(data.installationDate).format('DD/MM/YYYY');
                    $("#tmplCtbDetail").tmpl(data).appendTo("#usermenu");
                    if (data.stato == 0) { $('.ShowErrorLog').hide(); } else { $('.ShowErrorLog').show(); }
                    setlanguage();
                }
            });
        }
        /*----------------------------------------------------------------------*/

        /*
        termostati di blocco
        ------------------------------------------------------------------------*/
        function loadtb() {
            $("#tbsList").empty();
            var r = $.DataAccess.hs_tb_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    for (var i = 0; i < data.length; i++) {

                        $('#' + data[i].Cod).on('touchstart click', function (event) {
                            tbDetail(this.id);
                            sidebar();
                        });
                        $('#' + data[i].Cod + '_1_').on('touchstart click', function (event) {
                            tbDetail(this.id.replace("_1_", ""));
                            sidebar();
                        });

                        var txtobjName = 'txt_' + data[i].Cod + '_STATUS';
                        var txtobj = document.getElementById(txtobjName);
                        if (txtobj) { txtobj.textContent = data[i].currentValue }
                        txtobjName = 'txt_' + data[i].Cod + '_STATUS' + '_1_';
                        txtobj = document.getElementById(txtobjName);
                        if (txtobj) { txtobj.textContent = data[i].currentValue }

                        var objName = data[i].Cod + '_STATUS';
                        var obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].currentValue == false) {
                                obj.style.fill = $verde;
                            }
                            else {
                                obj.style.fill = $rosso;
                            }
                        }
                        objName = data[i].Cod + '_STATUS' + '_1_';
                        obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].currentValue == false) {
                                obj.style.fill = $verde;
                            }
                            else {
                                obj.style.fill = $rosso;
                            }
                        }

                        elements.push({
                            'code': data[i].Cod,
                            'type': 'TB'
                        });

                    } //end for
                }
            });
        }

        function tbDetail(Cod) {
            $("#usermenu").empty();
            var hsId = localStorage.getItem("hsId");
            var req = $.DataAccess.hs_tb_ReadByCod(hsId, Cod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    data.installationDate = moment(data.installationDate).format('DD/MM/YYYY');
                    $("#tmpltbDetail").tmpl(data).appendTo("#usermenu");
                    if (data.stato == 0) { $('.ShowErrorLog').hide(); } else { $('.ShowErrorLog').show(); }
                    setlanguage();
                }
            });
        }
        /*----------------------------------------------------------------------*/

        /*
        pressostati di minima
        ------------------------------------------------------------------------*/
        function loadpm() {
            $("#pmsList").empty();
            var r = $.DataAccess.hs_pm_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    for (var i = 0; i < data.length; i++) {

                        $('#' + data[i].Cod).on('touchstart click', function (event) {
                            pmDetail(this.id);
                            sidebar();
                        });
                        $('#' + data[i].Cod + '_1_').on('touchstart click', function (event) {
                            pmDetail(this.id.replace("_1_", ""));
                            sidebar();
                        });

                        var txtobjName = 'txt_' + data[i].Cod + '_STATUS';
                        var txtobj = document.getElementById(txtobjName);
                        if (txtobj) { txtobj.textContent = data[i].currentValue }
                        txtobjName = 'txt_' + data[i].Cod + '_STATUS' + '_1_';
                        txtobj = document.getElementById(txtobjName);
                        if (txtobj) { txtobj.textContent = data[i].currentValue }

                        var objName = data[i].Cod + '_STATUS';
                        var obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].currentValue == false) {
                                obj.style.fill = $verde;
                            }
                            else {
                                obj.style.fill = $rosso;
                            }
                        }
                        objName = data[i].Cod + '_STATUS' + '_1_';
                        obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].currentValue == false) {
                                obj.style.fill = $verde;
                            }
                            else {
                                obj.style.fill = $rosso;
                            }
                        }

                        elements.push({
                            'code': data[i].Cod,
                            'type': 'PM'
                        });

                    } //end for
                }
            });
        }

        function pmDetail(Cod) {
            $("#usermenu").empty();
            var hsId = localStorage.getItem("hsId");
            var req = $.DataAccess.hs_pm_ReadByCod(hsId, Cod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    data.installationDate = moment(data.installationDate).format('DD/MM/YYYY');
                    $("#tmplpmDetail").tmpl(data).appendTo("#usermenu");
                    if (data.stato == 0) { $('.ShowErrorLog').hide(); } else { $('.ShowErrorLog').show(); }
                    setlanguage();
                }
            });
        }
        /*----------------------------------------------------------------------*/

        /*
        pressostati di blocco
        ------------------------------------------------------------------------*/
        function loadpb() {
            $("#pbsList").empty();
            var r = $.DataAccess.hs_pb_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    for (var i = 0; i < data.length; i++) {

                        $('#' + data[i].Cod).on('touchstart click', function (event) {
                            pbDetail(this.id);
                            sidebar();
                        });
                        $('#' + data[i].Cod + '_1_').on('touchstart click', function (event) {
                            pbDetail(this.id.replace("_1_", ""));
                            sidebar();
                        });

                        var txtobjName = 'txt_' + data[i].Cod + '_STATUS';
                        var txtobj = document.getElementById(txtobjName);
                        if (txtobj) { txtobj.textContent = data[i].currentValue }
                        txtobjName = 'txt_' + data[i].Cod + '_STATUS' + '_1_';
                        txtobj = document.getElementById(txtobjName);
                        if (txtobj) { txtobj.textContent = data[i].currentValue }


                        var objName = data[i].Cod + '_STATUS';
                        var obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].currentValue == false) {
                                obj.style.fill = $verde;
                            }
                            else {
                                obj.style.fill = $rosso;
                            }
                        }
                        objName = data[i].Cod + '_STATUS' + '_1_';
                        obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].currentValue == false) {
                                obj.style.fill = $verde;
                            }
                            else {
                                obj.style.fill = $rosso;
                            }
                        }

                        elements.push({
                            'code': data[i].Cod,
                            'type': 'PB'
                        });

                    } //end for
                }
            });
        }

        function pbDetail(Cod) {
            $("#usermenu").empty();
            var hsId = localStorage.getItem("hsId");
            var req = $.DataAccess.hs_pb_ReadByCod(hsId, Cod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    data.installationDate = moment(data.installationDate).format('DD/MM/YYYY');
                    $("#tmplpbDetail").tmpl(data).appendTo("#usermenu");
                    if (data.stato == 0) { $('.ShowErrorLog').hide(); } else { $('.ShowErrorLog').show(); }
                    setlanguage();
                }
            });
        }
        /*----------------------------------------------------------------------*/

        /*
      Elettrovalvole
      ------------------------------------------------------------------------*/
        function loadev() {
            $("#EvList").empty();
            var r = $.DataAccess.hs_Ev_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    console.log("ELETTROVALVOLE", data);
                    for (var i = 0; i < data.length; i++) {

                        $('#' + data[i].Cod).on('touchstart click', function (event) {
                            EvDetail(this.id);
                            sidebar();
                        });
                        $('#' + data[i].Cod + '_1_').on('touchstart click', function (event) {
                            EvDetail(this.id.replace("_1_", ""));
                            sidebar();
                        });

                        var txtobjName = 'txt_' + data[i].Cod + '_STATUS';
                        var txtobj = document.getElementById(txtobjName);
                        if (txtobj) { txtobj.textContent = data[i].currentValue }
                        txtobjName = 'txt_' + data[i].Cod + '_STATUS' + '_1_';
                        txtobj = document.getElementById(txtobjName);
                        if (txtobj) { txtobj.textContent = data[i].currentValue }

                        var objName = data[i].Cod + '_STATUS';
                        var obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].currentValue == false) {
                                obj.style.fill = $verde;
                            }
                            else {
                                obj.style.fill = $rosso;
                            }
                        }
                        objName = data[i].Cod + '_STATUS' + '_1_';
                        obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].currentValue == false) {
                                obj.style.fill = $verde;
                            }
                            else {
                                obj.style.fill = $rosso;
                            }
                        }

                        elements.push({
                            'code': data[i].Cod,
                            'type': 'EV'
                        });

                    } //end for
                }
            });
        }

        function EvDetail(Cod) {
            $("#usermenu").empty();
            var hsId = localStorage.getItem("hsId");
            var req = $.DataAccess.hs_Ev_ReadByCod(hsId, Cod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    data.installationDate = moment(data.installationDate).format('DD/MM/YYYY');
                    $("#tmplEvDetail").tmpl(data).appendTo("#usermenu");
                    if (data.stato == 0) { $('.ShowErrorLog').hide(); } else { $('.ShowErrorLog').show(); }
                    setlanguage();
                }
            });
        }
        /*----------------------------------------------------------------------*/

        /*
    SCA ALLARMI
    ------------------------------------------------------------------------*/
        function loadSca() {
            $("#ScaList").empty();
            var r = $.DataAccess.hs_Sca_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    console.log("SCA", data);
                
                }
            });
        }

        function ScaDetail(Cod) {
            $("#usermenu").empty();
            var hsId = localStorage.getItem("hsId");
            var req = $.DataAccess.hs_Ev_ReadByCod(hsId, Cod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    data.installationDate = moment(data.installationDate).format('DD/MM/YYYY');
                    $("#tmplEvDetail").tmpl(data).appendTo("#usermenu");
                    if (data.stato == 0) { $('.ShowErrorLog').hide(); } else { $('.ShowErrorLog').show(); }
                    setlanguage();
                }
            });
        }
        /*----------------------------------------------------------------------*/
        
        /*
        animazioni
        ------------------------------------------------------------------------*/
        function doAnim() {
            //console.log('doAnim');
            for (var i = 0; i < runningObj.length; i++) {
                //console.log(runningObj[i].id,runningObj[i].run);

                if (runningObj[i].run > 0) {
                    var thetaDelta = parseFloat(runningObj[i].run / 10);
                    var obj = document.getElementById(runningObj[i].id);
                    if (obj) {
                        //console.log('doAnim', obj.id);

                        //if (isNaN(obj.currentTheta==false)){}
                        obj.setAttribute("transform", " rotate(" + obj.currentTheta.toFixed(3) + "," + obj.getAttribute('cx') + "," + obj.getAttribute('cy') + ")");
                        obj.currentTheta += thetaDelta;
                        if (obj.currentTheta > 360) { obj.currentTheta = 0 };
                    }
                }
                
            }
            requestAnimationFrameID = requestAnimationFrame(doAnim);
            localStorage.setItem('requestAnimationFrameID', requestAnimationFrameID);
        }
        /*----------------------------------------------------------------------*/
        
        /*
        azioni
        ------------------------------------------------------------------------*/
        $.fn.obj_click = function (ele, code) {
                      
            switch (ele) {
                case "DOOR":
                    doorDetail(ele + code);
                    break;
                case "CRON":
                    cronDetail(ele + code);
                    break;
                case "GRU":
                    break;
                case "CAL":
                    calDetail(ele + code);
                    break;
                case "CIR":
                    cirDetail(ele + code);
                    break;
                case "VRD":
                    vrdDetail(ele + code);
                    break;
                case "CTL":
                    ctlDetail(ele + code);
                    break;
                case "CTB":
                    ctbDetail(ele + code);
                    break;
                case "PB":
                    pbDetail(ele + code);
                    break;
                case "PM":
                    pmDetail(ele + code);
                    break;
                case "TB":
                    tbDetail(ele + code);
                    break;
                case "EV":
                    EvDetail(ele + code);
                    break;
                case "S":
                    TemperatureProbeDetail(ele + code);
                    break;
            }
        }

        function manage(ele,code) {
            //alert('ele=' + ele + ' code=' + code);
        }
        /*----------------------------------------------------------------------*/

        /*
       sidebar - aggiunge le calssi per la slide bar latera su desktop - tablet e mobile.
       ------------------------------------------------------------------------*/
        function sidebar() {
            $('#sidebar').addClass('merge-left');            
            $('#main-content').removeClass('merge-left');
        }
        /*----------------------------------------------------------------------*/


        /////*
        ////debug
        ////------------------------------------------------------*/
        ////$('#btnLoad').on('click', function (e) {
        ////    $("body").addClass("loading");
        ////    loadSynoptic(localStorage.getItem("MapId"));
        ////    $('#btnLoad').hide();
        ////});
        /////*----------------------------------------------------*/

      


        $.fn.btnCloseDetail = function () {
            //console.log("CHIUDO");
            //$('#sidebar').removeClass('merge-left');
            //$('#main-content').addClass('merge-left');
            $('#usermenu').empty();
            $('#bit_box').hide();
            $.module.load('Impianti/Supervisors/hs_Synoptic.html');
           
        }


        $('#back2backoffice').on('click', function () {
            var whereigo = 'supervisors/main.html';
            //$("body").addClass("full-width");
            //$("body").removeClass("full-width");
            $.router.navigate(whereigo);
        });

        $('#back2map').on('click', function () {
            window.cancelAnimationFrame(localStorage.getItem('requestAnimationFrameID'));
            $("#usermenu").empty();
            var req = $.DataAccess.HeatingSystem_getTotMap(localStorage.getItem("IdImpianto"));
            req.success(function (json) {
                var data = json.d;
                if (data == 0) {
                    localStorage.setItem("Tipo_Mappa", 1);
                    $.module.load('synoptic/supervisors/hs_UsageMap_1');
                }
                else {
                    localStorage.setItem("Tipo_Mappa", 0);
                    $.module.load('synoptic/supervisors/hs_UsageMap');
                }
            });
        });

        $('#openticket').on('click', function () {
            //$('#Ticket').show();
            //$('#detail').hide();
            //$('#DivErrorLog').hide();
            //$('#synoptic').hide();

            //$('#sidebar').removeClass('merge-left');
            //$('#main-content').removeClass('merge-left');
            $('#sidebar').addClass('merge-left');
            $('#main-content').removeClass('merge-left');
            $.module.load('Impianti/Supervisors/hs_Tickets_Manage');

            //var whereigo = 'supervisors/main.html';
            //$("body").addClass("full-width");
            //$.router.navigate(whereigo);
        });

        $('#documents').on('click', function () {
            $('#detail').show();
            $('#synoptic').hide();
            $.module.load('Impianti/Supervisors/hs_doc_manage.html');
      
        });

        $.fn.Close_det = function () {            
            ////console.log("CHIUDO");          
            //$('#sidebar').removeClass('merge-left');
            //$('#main-content').addClass('merge-left');
            $('#usermenu').empty();
            //$("#tmplgoback").tmpl(null).appendTo("#usermenu");
            setlanguage();
            $.module.load('synoptic/supervisors/hs_Synoptic');
        }


        /*
        //Error log
        //------------------------------------------------------------------------*/
        var $logRowNumber = 0;
        var $ElementCod = '';


        $.fn.CallShowErrorLog = function (CirCod) {
            
            //$('.detail2').show();
            $('#synoptic').hide();
                        
            //$.module.load('Impianti/Supervisors/errorlog');
            $ElementCod = CirCod;
            $logRowNumber = 0;

            $("#ListErrorLog").empty();
            $('#DivErrorLog').show();
            loadErrorLog();
        }

        $('#btnCloseDivErrorLog').on('click', function () {
            $('#DivErrorLog').hide();
            $('#synoptic').show();
        });

        function loadErrorLog() {
            var r = $.DataAccess.hs_ErrorLog_ListByElement(localStorage.getItem("hsId"), $ElementCod, $logRowNumber);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                                    
                    $("#tmplListErrorLog").tmpl(data).appendTo("#ListErrorLog");
                    if (data.length == 100) {
                        var o = [{ id: $logRowNumber }];
                        $("#tmplListLogLastItem").tmpl(o).appendTo("#ListErrorLog");
                        $logRowNumber = $logRowNumber + 100;
                    }
                } 
            });
        }

        $('.panel-body-ListLog').scroll(function (e) {
            if (e) {
                e.stopPropagation();
                e.preventDefault();
            }
            if ($('#loadMore').length) {
                try {
                    //console.log("$(window).scrollTop() + $(window).height()="+$(window).scrollTop() + $(window).height()+  " '$('#loadMore').offset().top=" + $('#loadMore').offset().top);
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

        $.fn.loadMore = function () {
            $('#loadMore').remove();
            loadErrorLog();
        }
                     
        /*----------------------------------------------------------------------*/

        /*
        generic function
        -------------------------------------------------------------------------*/
        function daysInMonth(month, year) {
            return new Date(year, month, 0).getDate();
        }
        /*-----------------------------------------------------------------------*/

    });//fine document ready

});

function obj_click(ele, code) {
    //$.fn.obj_click(ele, code);
}
function callEditCal(CalId) { $.fn.callEditCal(CalId); }
function callEditGru(GruId) { $.fn.callEditGru(GruId); }
function callEditCron(CronId) { $.fn.callEditCron(CronId); }
function callEditAnz(AnzId) { $.fn.callEditAnz(AnzId); }
function CallShowErrorLog(CirCod) { $.fn.CallShowErrorLog(CirCod); }
function Close_det() { $.fn.Close_det(); }
function btnCloseDetail() { $.fn.btnCloseDetail(); }




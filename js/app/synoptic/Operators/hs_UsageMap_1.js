/*
Impianti operators stall geolocation
--------------------------------------*/
$(function () {

    $(document).ready(function () {
        /*
        SignalR
        ------------------------------------------------------------------*/
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
        // caldaie signalair
        $.fn.received_hs_cal_setStatus = function (hsId, CalCod, SetPoint, isRunning, stato) {
            if (localStorage.getItem("hsId") == hsId) {
                console.log("aggiornato boilers element");
                var txtobjName = 'txt_' + CalCod + '_STATUS';
                var txtobj = document.getElementById(txtobjName);
                if (txtobj) {
                    // txtobj.textContent = SetPoint + ' C°';
                    txtobj.textContent = isRunning + '%°';
                }
                var objName = CalCod + '_STATUS';
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
                for (var i = 0; i < runningObj.length; i++) {
                    if (runningObj[i] == CalCod) {
                        runningObj[i].run = isRunning;
                    }
                }
            }
        }
        //circulators signalair
        $.fn.received_hs_Cir_setStatus = function (hsId, CirCod, isRunning, stato) {
            if (localStorage.getItem("hsId") == hsId) {
                console.log("aggiornato cir element");
                SetElementStatus(CirCod);
                //var objName =CirCod + '_STATUS';
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
                    if (runningObj[i] == CirCod) {
                        runningObj[i].run = isRunning;
                    }
                }
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
                    else {
                        txtobj.textContent = 'AUTO';
                    }
                }
            }
        }
        //vrd signalair
        $.fn.received_hs_Vrd_setStatus = function (hsId, VrdCod, SetPoint, SetPosition, Position, stato) {
            if (localStorage.getItem("hsId") == hsId) {
                console.log("aggiornato vrd element");
                var txtobjName = 'txt_' + VrdCod + '_STATUS';
                var txtobj = document.getElementById(txtobjName);
                if (txtobj) {
                    txtobj.textContent = SetPoint + ' C°';
                }
                SetElementStatus(VrdCod);
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
        //ctl signalair
        $.fn.received_hs_Ctl_setValue = function (hsId, CtlCod, stato, currentValue) {
            if (localStorage.getItem("hsId") == hsId) {
                console.log("aggiornato ctl element");
                var txtobjName = 'txt_' + CtlCod + '_STATUS';
                var txtobj = document.getElementById(txtobjName);
                if (txtobj) { txtobj.textContent = currentValue + 'L' }
                SetElementStatus(CtlCod);
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
                SetElementStatus(CtbCod);
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
        // doors signalair
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
        // gas signalair 
        $.fn.received_hs_Gas_setStatus = function (hsId, Cod, stato) {
            if (localStorage.getItem("hsId") == hsId) {
                console.log("aggiornato gas status element");
                statusChanged('#Ctlstato_' + Cod, stato);
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
                SetElementStatus(CronCod);
                statusChanged('#Cronstato_' + Cod, stato);
                $('#SetPoint_' + CirCod).text(SetPoint);
            }
        }
        // analizzatori di rete signalair
        $.fn.received_hs_Anz_setStatus = function (hsId, Cod, stato) {
            //console.log("received_hs_Anz_setStatus");
            if (localStorage.getItem("hsId") == hsId) {
                console.log("aggiornato anz status element");
                statusChanged('#Anzstato_' + Cod, stato);

            }
        }
        $.fn.received_hs_Anz_changed = function (hsId, Cod) {
            console.log("Device8Anz received_hs_Anz_changed");
            if (localStorage.getItem("hsId") == hsId) {
                console.log("aggiornato probe element");
                //readAnz(Cod); lista anz la devo metetre qui marco?
            }
        }
        // ctp misuratori di portata signalair
        $.fn.received_hs_Ctp_setValue = function (hsId, Cod, stato, VolumeCounter, FlowRate) {
            if (localStorage.getItem("hsId") == hsId) {
                console.log("aggiornato ctp element");
                statusChanged('#Ctpstato_$' + Cod, stato);
                $('#Flowrate_' + Cod).text(Flowrate);
                $('#VolumeCounter_' + Cod).text(VolumeCounter);
            }
        }
        // gru signalair
        $.fn.received_hs_Gru_setStatus = function (hsId, GruCod, SetPoint, isRunning, stato) {
            if (localStorage.getItem("hsId") == hsId) {
                console.log("aggiornato gru element");
                var txtobjName = 'txt_' + GruCod + '_STATUS';
                var txtobj = document.getElementById(txtobjName);
                if (txtobj) {
                    // txtobj.textContent = SetPoint + ' C°';
                    txtobj.textContent = isRunning + '%°';
                }
                SetElementStatus(GruCod);
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
                statusChanged('#stato_' + GruCod, stato);
                $('#SetPoint_' + GruCod).text(SetPoint);
                $('#isRunning_' + GruCod).text(isRunning);
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
        /*------------------------------------------------------------------*/

        $('#SetMaintenanceModeResult').removeClass("operationOk");
        $('#SetMaintenanceModeResult').removeClass("operationNok");
        $("#pageOperation").empty();
        $("#tmplpageOperation").tmpl(null).appendTo("#pageOperation");

        $("body").css("-ms-content-zooming", "none");
        $("body").css("touch-action", "none");
        $("html").css("-ms-content-zooming", "none");
        $("body").css("touch-action", "none");

        $("#Scontainter").draggable();
        $("#DivErrorLog").draggable();

        $('#openticket').on('click', function () {
            $('#Ticket').show();
            $('#detail').hide();
            $('#DivErrorLog').hide();
            $('#synoptic').hide();
            $.module.load('Impianti/Operators/hs_Tickets_Manage');

            //var whereigo = 'supervisors/main.html';
            //$("body").addClass("full-width");
            //$.router.navigate(whereigo);
        });


        var impLat = 0;
        var impLong = 0;
        var Latitude = 0;
        var Longitude = 0;
        var map;
        var elevator;
        var elevation = 0;
        var AddressOnMap = null;
        var geocoder = null;
        var shadow = null;
        var clickIcon = null;
        var clickMarker = null;
        var markers = [];
        var marker = null;
        var infowindow = null;
        var MAPFILES_URL = "http://maps.gstatic.com/intl/en_us/mapfiles/";
        var bounds;

        //$("#Scontainter").draggable();
        elevator = new google.maps.ElevationService();
        geocoder = new google.maps.Geocoder();
        infowindow = new google.maps.InfoWindow();

        var markersCollection = [];

        var clevergygmarkerimage_verde = {
            url: 'images/markers_verde.png',
            // This marker is 20 pixels wide by 32 pixels tall.
            size: new google.maps.Size(32, 37),
            // The origin for this image is 0,0.
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at 0,32.
            anchor: new google.maps.Point(0, 37)
        };

        var clevergygmarkerimage_giallo = {
            url: 'images/markers_giallo.png',
            // This marker is 20 pixels wide by 32 pixels tall.
            size: new google.maps.Size(32, 37),
            // The origin for this image is 0,0.
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at 0,32.
            anchor: new google.maps.Point(0, 37)
        };

        var clevergygmarkerimage_rosso = {
            url: 'images/markers_rosso.png',
            // This marker is 20 pixels wide by 32 pixels tall.
            size: new google.maps.Size(32, 37),
            // The origin for this image is 0,0.
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at 0,32.
            anchor: new google.maps.Point(0, 37)
        };

        //Readhs();
        setlanguage();
        ReadImpianto_hs()

        function ReadImpianto_hs() {
            var req = $.DataAccess.HeatingSystem_List(localStorage.getItem("IdImpianto"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    localStorage.setItem("hsId", data[0].hsId);
                    $("#hsDescr").text(data[0].DesImpianto);
                    $("#MapDesc").text(data[0].Descr);
                    impLat = data[0].Latitude;
                    impLong = data[0].Longitude;
                    Latitude = data[0].Latitude;
                    Longitude = data[0].Longitude;

                    if (data[0].isOnline == false) {
                        $("#errorOffline").css("display", "block");
                    }
                    if (data[0].MaintenanceMode == true) {
                        $("#MaintenanceMode").css("display", "block");
                    }
                    setTimeout(function () { loadmap(Latitude, Longitude); }, 1000);
                    setlanguage();
                }
            });
        }

        function loadmap() {
            var h = $(window).height() - $('.header').height() - 30;
            //google maps

            $('#googlemap').height(h);
            map = new google.maps.Map(document.getElementById('googlemap'), {
                zoom: 18,
                panControl: true,
                zoomControl: true,
                mapTypeControl: true,
                scaleControl: true,
                overviewMapControl: true,
                center: new google.maps.LatLng(Latitude, Longitude),
                mapTypeId: google.maps.MapTypeId.HYBRID
            });
            bounds = new google.maps.LatLngBounds();



            $('#Scontainter').show({
                left: "100px",
                top: "100px",
                opacity: 1
            });
            $("#Scontainter").animate({
                left: "100px",
                top: "100px",
                opacity: 1
            }, {
                duration: 500,
                queue: false
            });

            setTimeout(function () { Read_componenti(); }, 1000);
        }

        $(window).resize(function () {
            var h = $(window).height() - $('.header').height() - 30;
            $('#googlemap').height(h);
        });

        /*
        system detail
        -----------------------------------------------*/
        $('#open_system_detail').on('click', function () {
            loadSystem();
        });

        function loadSystem() {
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

                    if (data.stato > 0) {
                        $('#btnResetSystemStatus_' + data.hsId).show();
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
                                $('#SetMaintenanceModeResult').addClass("operationOk");
                            }
                            else {
                                $('#SetMaintenanceModeResult').addClass("operationNok");
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
            $.module.load('Impianti/Operators/hs_Docs_Manage');
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
            $.module.load('Impianti/Operators/hs_Tickets_Manage');
        }

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
        /*--------------------------------------------------------------*/

        $('#btnResetSystemStatus').on('click', function () {
            var req = $.DataAccess.HeatingSystem_resetSystemStatus(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data == true) {
                    toastr["success"](langResources['msg4operationok'], langResources['yes'])
                    loadSystem();
                }
                else { toastr["warning"](langResources['msg4operationfailed'], langResources['alert']); }
            });
        });
        /*--------------------------------------------------------------*/


        /*
        map
        -----------------------------------------------*/
        $.fn.sidebar = function () {
            //$("body").addClass("full-width");
            //$("body").removeClass("full-width");
            //$('#sidebar').addClass('merge-left');
            //$('#main-content').removeClass('merge-left');
        }
        $.fn.Close_det = function () {           
            //console.log("CHIUDO");
            //$('#sidebar').removeClass('merge-left');
            //$('#main-content').addClass('merge-left');
            $('#usermenu').empty();
        }
        $.fn.Close_SystemDetail = function () {
            $('#usermenu').empty();
            $.module.load('synoptic/Operators/hs_UsageMap_1');
        }
      
        function geocodefromLatLong(Latitude, Longitude, latlng, Cod, Id, Desc, data, stato) {

            //DeleteMarker(Id);
            //marker = new google.maps.Marker({
            //    position: latlng,
            //    icon: clevergygmarkerimage_verde,
            //    map: map,
            //    draggable: false,
            //    type: localStorage.getItem("Cod"),
            //    data: data,
            //    id: Id
            //});
            //markersCollection.push(marker);

            if (stato == 0) {


                DeleteMarker(Id);
                marker = new google.maps.Marker({
                    position: latlng,
                    icon: clevergygmarkerimage_verde,
                    map: map,
                    draggable: false,
                    type: localStorage.getItem("Cod"),
                    data: data,
                    id: Id
                });
                markersCollection.push(marker);
            } else if (stato == 1) {
                DeleteMarker(Id);
                marker = new google.maps.Marker({
                    position: latlng,
                    icon: clevergygmarkerimage_giallo,
                    map: map,
                    draggable: false,
                    type: localStorage.getItem("Cod"),
                    data: data,
                    id: Id
                });
                markersCollection.push(marker);


            } else {
                DeleteMarker(Id);
                marker = new google.maps.Marker({
                    position: latlng,
                    icon: clevergygmarkerimage_rosso,
                    map: map,
                    draggable: false,
                    type: localStorage.getItem("Cod"),
                    data: data,
                    id: Id
                });
                markersCollection.push(marker);


            }






            //var content = setInfowindowContent(DesImpianto, Descr, Indirizzo, isOnline, MaintenanceMode, hsId);
            //se c'e un infowindow la chiudo se no vadoavanti ela creo 
            if (infowindow) infowindow.close();
            infowindow = new google.maps.InfoWindow()
            google.maps.event.addListener(marker, 'click', function () {                
                removeActiveClass();
                $('#li_' + this.Id).addClass("active");
                set_marker_detail(this.data, this.type);
                infowindow.setContent(setInfowindowContent(Latitude, Longitude, latlng, Cod, Id, Desc));
                infowindow.open(map, this);
                setlanguage();
            });

            bounds.extend(latlng);
            map.fitBounds(bounds);

            map.setCenter(latlng);


        }

        function set_marker_detail(data, type) {
            data.installationDate = moment(data.installationDate).format('DD/MM/YYYY');
            $('#usermenu').empty();
            //console.log(data);
            //alert(type);
            switch (type) {
                case "Ctb":

                    $("#tmplCtbDetail").tmpl(data).appendTo("#usermenu");
                    break;
                case "Anz":
                    initAnz(Id);
                    break;
                case "Gru":
                    initGru(Id);
                    break;
                case "cal":
                    initCtb(Id);
                    break;
                case "Cir":
                    initCir(Id);
                    break;
                case "vrd":
                    initVrd(Id);
                    break;
                case "Gas":
                    $("#tmplGasDetail").tmpl(data).appendTo("#usermenu");
                    break;
                case "Ctp":
                    $("#tmplCtpDetail").tmpl(data).appendTo("#usermenu");
                    break;
                case "Cron":
                    initCron(Id);
                    break;
                case "Ctl":
                    initCtl(Id);
                    break;
                case "Tprobe":
                    $("#tmplProbeDetail").tmpl(data).appendTo("#usermenu");
                    break;
                case "sca":
                    $("#tmplScaDetail").tmpl(data).appendTo("#usermenu");
                    break;

            }


        }


        function setInfowindowContent(Latitude, Longitude, latlng, Cod, Id, Desc) {
            var html = "";
            html = '<div id="content" style="display:block;white-space: nowrap;width:400px;">';
            //html += '<a style="color:#337ab7;" href="javascript:selPlant(' + Id + ',' + Cod + ');" id="impianto">' + Desc + '</a>';
            html += '<a style="color:#337ab7;" href="javascript:sidebar();" class="open_detail">' + Desc + '</a>';
            html += '<div id="info_window">';
            html += 'Codice:' + Cod + '<br />';
            html += '</div>';
            html += '</div>';

            return html;

        }
        /*---------------------------------------------*/


        function DeleteMarker(id) {
            //Find and remove the marker from the Array
            for (var i = 0; i < markersCollection.length; i++) {

                if (markersCollection[i].id == id) {                    
                    //Remove the marker from Map                  
                    markersCollection[i].setMap(null);
                    //Remove the marker from array.
                    markersCollection.splice(i, 1);
                    return;
                }
            }
        };

        function removeActiveClass() {
            $('#PlantList li').each(function (n) {
                $(this).removeClass("active");
            });
        }

        /*
        Synoptic
        ----------------------------------------------------------------*/
        $.fn.selSynoptic = function (Id, cod) {



        }
        /*--------------------------------------------------------------*/


        /*
        selezione dell elemento al click sulla lista
        ----------------------------------------------------------------*/


        $.fn.selPlant = function (Id, codice) {
            //alert(codice);
            //prendo il codice dell elemento cliccato e creo il marker sulla mappa

            switch (codice) {
                case "Ctb":
                    initCtb(Id);
                    break;
                case "Anz":
                    initAnz(Id);
                    break;
                case "Gru":
                    initGru(Id);
                    break;
                case "cal":
                    initCtb(Id);
                    break;
                case "Cir":
                    initCir(Id);
                    break;
                case "vrd":
                    initVrd(Id);
                    break;
                case "Gas":
                    initGas(Id);
                    break;
                case "Ctp":
                    initCtp(Id);
                    break;
                case "Cron":
                    initCron(Id);
                    break;
                case "Ctl":
                    initCtl(Id);
                    break;
                case "Tprobe":
                    initTprobe(Id);
                    break;
                case "sca":
                    initSca(Id);
                    break;

            }


        }

        /*--------------------------------------------------------------*/
        $('#close_list').on('click', function (e) {
            $.fn.Close_det();
            //Find and remove the marker from the Array
            for (var i = 0; i < markersCollection.length; i++) {
                markersCollection[i].setMap(null);
            }
            markersCollection = [];
            Read_componenti();

        });

        function Read_componenti() {
            $('#PlantList').empty();
            var voicesMenu = [];
            //voicesMenu.push({ Name: "Installation", page: "Device8Plant", tot: 1, stato: 0 });

            var r = $.DataAccess.hs_Elem_Read(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                   // console.log(data);
                    if (data.totAnz > 0) {
                        voicesMenu.push({ Name: "hs_Anzs", page: "$.fn.Anz()", tot: data.totAnz, stato: data.statoAnz });
                    }
                    if (data.totGru > 0) {
                        voicesMenu.push({ Name: "hs_grus", page: "$.fn.Gru()", tot: data.totGru, stato: data.statoGru });
                    }
                    if (data.totCal > 0) {
                        voicesMenu.push({ Name: "boilers", page: "$.fn.Cal()", tot: data.totCal, stato: data.statoCal });
                    }
                    if (data.totCir > 0) {
                        voicesMenu.push({ Name: "circulators", page: "$.fn.Cir()", tot: data.totCir, stato: data.statoCir });
                    }
                    if (data.totVrd > 0) {
                        voicesMenu.push({ Name: "servomotors", page: "$.fn.Vrd()", tot: data.totVrd, stato: data.statoVrd });
                    }
                    if (data.totGas > 0) {
                        voicesMenu.push({ Name: "hs_ctGas", page: "$.fn.Gas()", tot: data.totGas, stato: data.statoGas });
                    }
                    if (data.totCtp > 0) {
                        voicesMenu.push({ Name: "hs_ctps", page: "$.fn.Ctp()", tot: data.totCtp, stato: data.statoCtp });
                    }
                    if (data.totCron > 0) {
                        voicesMenu.push({ Name: "chronothermostats", page: "$.fn.Cron()", tot: data.totCron, stato: data.statoCron });
                    }
                    if (data.totCtl > 0) {
                        voicesMenu.push({ Name: "flowmeters", page: "$.fn.ctl()", tot: data.totCtl, stato: data.statoCtl });
                    }
                    if (data.totCtb > 0) {
                        voicesMenu.push({ Name: "meters", page: "$.fn.ctb()", tot: data.totCtb, stato: data.statoCtb });
                    }
                    if (data.totTemperatureProbes > 0) {
                        voicesMenu.push({ Name: "temperatureprobes", page: "$.fn.TempProb()", tot: data.totTemperatureProbes, stato: data.statoTemperatureProbes });
                    }
                    if (data.tottb > 0) {
                        voicesMenu.push({ Name: "hs_tbs", page: "Device8tb", tot: data.tottb, stato: data.statotb });
                    }
                    if (data.totpm > 0) {
                        voicesMenu.push({ Name: "hs_pms", page: "Device8pm", tot: data.totpm, stato: data.statopm });
                    }
                    if (data.totpb > 0) {
                        voicesMenu.push({ Name: "hs_pbs", page: "Device8pb", tot: data.totpb, stato: data.statopb });
                    }
                    if (data.totDoor > 0) {
                        voicesMenu.push({ Name: "doors", page: "Device8Door", tot: data.totDoor, stato: data.statoDoor });
                    }
                    if (data.totSca > 0) {
                        voicesMenu.push({ Name: "hs_sca", page: "$.fn.TempSca()", tot: data.totSca, stato: data.statoSca });
                    }
                    if (data.totcymt100 > 0) {
                        voicesMenu.push({ Name: "sdin_Anzs", page: "Device8sdinAnz", tot: data.totcymt100, stato: data.statocymt100 });
                    }
                    if (data.totcymt200 > 0) {
                        voicesMenu.push({ Name: "cymt200s", page: "Device8sdincymt200", tot: data.totcymt200, stato: data.statocymt200 });
                    }
                    if (data.totW0077 > 0) {
                        voicesMenu.push({ Name: "W0077s", page: "Device8W0077", tot: data.totW0077, stato: data.statoW0077 });
                    }

                    //$("#tmplMenuDetail").tmpl(voicesMenu).appendTo("#usermenu");
                    $("#tmplPlantList").tmpl(voicesMenu).appendTo("#PlantList");
                    setlanguage();
                    //$.module.load('Impianti/supervisors/Device8Plant');

                    $('#PlantList').slimscroll({
                        height: '315px',
                        wheelStep: 15
                    });
                    setlanguage();


                }
            });
        }


        /*
        contabilizzatori
        ----------------------------------------------------------------*/
        $.fn.ctb = function (hsId) {
            $("#PlantList").empty();
            localStorage.setItem("Cod", "Ctb");//setto il codice nel local storage per sapere che tipo di device è per il marker
            var r = $.DataAccess.hs_Ctb_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {                    
                    $("#tmplCtb").tmpl(data).appendTo("#PlantList");

                    for (var i = 0; i < data.length; i++) {
                        Latitude = data[i].Latitude;
                        Longitude = data[i].Longitude;
                        if (Longitude == 0 && Latitude == 0) {


                            Latitude = impLat;
                            Longitude = impLong;
                            var latlng = new google.maps.LatLng(parseFloat(Latitude), parseFloat(Longitude));
                        } else {
                            var latlng = new google.maps.LatLng(parseFloat(data[i].Latitude), parseFloat(data[i].Longitude));
                        }
                        var Desc = data[i].CtbDesc;
                        var Flowrate = data[i].Flowrate;
                        var Cod = data[i].CtbCod;
                        var stato = data[i].stato;
                        var marcamodello = data[i].marcamodello;
                        var Id = data[i].CtbId;
                        //var latlng = new google.maps.LatLng(parseFloat(data[i].Latitude), parseFloat(data[i].Longitude));
                        geocodefromLatLong(Latitude, Longitude, latlng, Cod, Id, Desc, data[i], stato);
                    }//end for            
                    setlanguage();
                }
            });
        }

        function initCtb(Id) {
            $("#usermenu").empty();
            var r = $.DataAccess.hs_Ctb_Read(Id);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#usermenu").empty();
                    data.installationDate = moment(data.installationDate).format('DD/MM/YYYY');
                    $("#tmplCtbDetail").tmpl(data).appendTo("#usermenu");
                    if (data.stato == 0) { $('.ShowErrorLog').hide(); } else { $('.ShowErrorLog').show(); }

                    Latitude = data.Latitude;
                    Longitude = data.Longitude;
                    if (Longitude == 0 && Latitude == 0) {
                        Latitude = impLat;
                        Longitude = impLong;
                        var latlng = new google.maps.LatLng(parseFloat(Latitude), parseFloat(Longitude));
                    } else {
                        var latlng = new google.maps.LatLng(parseFloat(data.Latitude), parseFloat(data.Longitude));
                    }
                    var Desc = data.CtbDesc;
                    var Flowrate = data.Flowrate;
                    var Cod = data.CtbCod;
                    var stato = data.stato;
                    var marcamodello = data.marcamodello;
                    var Id = data.CtbId;                    
                    geocodefromLatLong(Latitude, Longitude, latlng, Cod, Id, Desc, data, stato);
                    infowindow.setContent(setInfowindowContent(Latitude, Longitude, latlng, Cod, Id, Desc));
                    infowindow.open(map, marker);
                    setlanguage();
                }
            });
        }
        /* ----------------------------------------------------------------*/
        /*
        ANZ?
        ----------------------------------------------------------------*/

        $.fn.Anzs = function (hsId) {
            $("#PlantList").empty();
            localStorage.setItem("Cod", "Anz");
            var r = $.DataAccess.hs_Anz_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if ($tablehs_Anz_data) {
                    data.installationDate = moment(data.installationDate).format('DD/MM/YYYY');
                    $("#tmplAnz").tmpl(data).appendTo("#PlantList");

                    for (var i = 0; i < data.length; i++) {
                        Latitude = data[i].Latitude;
                        Longitude = data[i].Longitude;
                        if (Longitude == 0 && Latitude == 0) {


                            Latitude = impLat;
                            Longitude = impLong;
                            var latlng = new google.maps.LatLng(parseFloat(Latitude), parseFloat(Longitude));
                        } else {
                            var latlng = new google.maps.LatLng(parseFloat(data[i].Latitude), parseFloat(data[i].Longitude));
                        }
                        var Desc = data[i].CtbDesc;
                        var Cod = data[i].CtbCod;
                        var stato = data[i].stato;
                        var marcamodello = data[i].marcamodello;
                        var Id = data[i].CtbId;
                        //var latlng = new google.maps.LatLng(parseFloat(data[i].Latitude), parseFloat(data[i].Longitude));
                        geocodefromLatLong(Latitude, Longitude, latlng, Cod, Id, Desc, data[i], stato);
                    }//end for 
                    setlanguage();
                }
            });

        }
        /* ----------------------------------------------------------------*/
        /*
       GRUPPO TERMICO
       ----------------------------------------------------------------*/

        $.fn.Gru = function (hsId) {
            $("#PlantList").empty();

        }
        /* ----------------------------------------------------------------*/
        /*
       CALDAIE
      ----------------------------------------------------------------*/

        $.fn.Cal = function (hsId) {
            $("#PlantList").empty();

        }
        /* ----------------------------------------------------------------*/
        /*
        CIR
        ----------------------------------------------------------------*/

        $.fn.Cir = function (hsId) {
            $("#PlantList").empty();

        }
        /* ----------------------------------------------------------------*/
        /*
       VRD
       ----------------------------------------------------------------*/

        $.fn.Vrd = function (hsId) {
            $("#PlantList").empty();

        }
        /* ----------------------------------------------------------------*/
        /*
       GAS
       ----------------------------------------------------------------*/

        $.fn.Gas = function (hsId) {
            $("#PlantList").empty();
            localStorage.setItem("Cod", "Gas");
            var r = $.DataAccess.hs_Gas_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    data.installationDate = moment(data.installationDate).format('DD/MM/YYYY');
                    $("#tmplGas").tmpl(data).appendTo("#PlantList");
                    for (var i = 0; i < data.length; i++) {
                        Latitude = data[i].Latitude;
                        Longitude = data[i].Longitude;
                        if (Longitude == 0 && Latitude == 0) {


                            Latitude = impLat;
                            Longitude = impLong;
                            var latlng = new google.maps.LatLng(parseFloat(Latitude), parseFloat(Longitude));
                        } else {
                            var latlng = new google.maps.LatLng(parseFloat(data[i].Latitude), parseFloat(data[i].Longitude));
                        }
                        var Desc = data[i].Descr;
                        var Cod = data[i].Cod;
                        var stato = data[i].stato;
                        var marcamodello = data[i].marcamodello;
                        var Id = data[i].Id;
                        //var latlng = new google.maps.LatLng(parseFloat(data[i].Latitude), parseFloat(data[i].Longitude));
                        geocodefromLatLong(Latitude, Longitude, latlng, Cod, Id, Desc, data[i], stato);
                    }//end for 

                    setlanguage();
                }
            });
        }
        function initGas(Id) {
            $("#usermenu").empty();
            var r = $.DataAccess.hs_Gas_Read(Id);
            r.success(function (json) {
                var data = json.d;
                if (data) {                  

                    data.installationDate = moment(data.installationDate).format('DD/MM/YYYY');
                    $("#tmplGasDetail").tmpl(data).appendTo("#usermenu");

                    if (data.stato == 0) { $('.ShowErrorLog').hide(); } else { $('.ShowErrorLog').show(); }

                    Latitude = data.Latitude;
                    Longitude = data.Longitude;
                    if (Longitude == 0 && Latitude == 0) {


                        Latitude = impLat;
                        Longitude = impLong;
                        var latlng = new google.maps.LatLng(parseFloat(Latitude), parseFloat(Longitude));
                    } else {
                        var latlng = new google.maps.LatLng(parseFloat(data.Latitude), parseFloat(data.Longitude));
                    }
                    var Desc = data.Descr;
                    var Cod = data.Cod;
                    var stato = data.stato;
                    var marcamodello = data.marcamodello;
                    var Id = data.Id;
                    data.installationDate = moment(data.installationDate).format('DD/MM/YYYY');
                    geocodefromLatLong(Latitude, Longitude, latlng, Cod, Id, Desc, data, stato);
                    infowindow.setContent(setInfowindowContent(Latitude, Longitude, latlng, Cod, Id, Desc));
                    infowindow.open(map, marker);
                    setlanguage();
                }
            });
        }
        /* ----------------------------------------------------------------*/
        /*
       Temperature Probes
       ----------------------------------------------------------------*/

        $.fn.TempProb = function (hsId) {
            $("#PlantList").empty();
            localStorage.setItem("Cod", "Tprobe");
            var r = $.DataAccess.hs_TemperatureProbes_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    //console.log(data);
                    $("#tmplProbes").tmpl(data).appendTo("#PlantList");
                    for (var i = 0; i < data.length; i++) {
                        Latitude = data[i].Latitude;
                        Longitude = data[i].Longitude;
                        if (Longitude == 0 && Latitude == 0) {


                            Latitude = impLat;
                            Longitude = impLong;
                            var latlng = new google.maps.LatLng(parseFloat(Latitude), parseFloat(Longitude));
                        } else {
                            var latlng = new google.maps.LatLng(parseFloat(data[i].Latitude), parseFloat(data[i].Longitude));
                        }
                        var Desc = data[i].ProbeDesc;
                        var Cod = data[i].ProbeCod;
                        var stato = data[i].stato;
                        var marcamodello = data[i].marcamodello;
                        var Id = data[i].ProbeId;
                        //var latlng = new google.maps.LatLng(parseFloat(data[i].Latitude), parseFloat(data[i].Longitude));
                        geocodefromLatLong(Latitude, Longitude, latlng, Cod, Id, Desc, data[i], stato);
                    }//end for 

                    setlanguage();
                }
            });
        }
        function initTprobe(Id) {
            $("#usermenu").empty();
            var r = $.DataAccess.hs_TemperatureProbes_Read(Id);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                                        
                    data.installationDate = moment(data.installationDate).format('DD/MM/YYYY');
                    $("#tmplProbeDetail").tmpl(data).appendTo("#usermenu");
                    if (data.stato == 0) { $('.ShowErrorLog').hide(); } else { $('.ShowErrorLog').show(); }


                    Latitude = data.Latitude;
                    Longitude = data.Longitude;
                    if (Longitude == 0 && Latitude == 0) {


                        Latitude = impLat;
                        Longitude = impLong;
                        var latlng = new google.maps.LatLng(parseFloat(Latitude), parseFloat(Longitude));
                    } else {
                        var latlng = new google.maps.LatLng(parseFloat(data.Latitude), parseFloat(data.Longitude));
                    }
                    var Desc = data.ProbeDesc;
                    var Cod = data.ProbeCod;
                    var stato = data.stato;
                    var marcamodello = data.marcamodello;
                    var Id = data.ProbeId;
                    geocodefromLatLong(Latitude, Longitude, latlng, Cod, Id, Desc, data, stato);
                    infowindow.setContent(setInfowindowContent(Latitude, Longitude, latlng, Cod, Id, Desc));
                    infowindow.open(map, marker);
                    setlanguage();
                }
            });
        }
        /* ----------------------------------------------------------------*/
        /*
         CTP
         ----------------------------------------------------------------*/

        $.fn.Ctp = function (hsId) {
            $("#PlantList").empty();
            localStorage.setItem("Cod", "Ctp");
            var r = $.DataAccess.hs_Ctp_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    //console.log(data);
                    $("#tmplCtp").tmpl(data).appendTo("#PlantList");
                    for (var i = 0; i < data.length; i++) {
                        Latitude = data[i].Latitude;
                        Longitude = data[i].Longitude;
                        if (Longitude == 0 && Latitude == 0) {


                            Latitude = impLat;
                            Longitude = impLong;
                            var latlng = new google.maps.LatLng(parseFloat(Latitude), parseFloat(Longitude));
                        } else {
                            var latlng = new google.maps.LatLng(parseFloat(data[i].Latitude), parseFloat(data[i].Longitude));
                        }
                        var Desc = data[i].Descr;
                        var Cod = data[i].Cod;
                        var stato = data[i].stato;
                        var marcamodello = data[i].marcamodello;
                        var Id = data[i].Id;
                        //var latlng = new google.maps.LatLng(parseFloat(data[i].Latitude), parseFloat(data[i].Longitude));
                        geocodefromLatLong(Latitude, Longitude, latlng, Cod, Id, Desc, data[i], stato);
                    }//end for 

                    setlanguage();
                }
            });

        }
        function initCtp(Id) {
            $("#usermenu").empty();

            var r = $.DataAccess.hs_Ctp_Read(Id);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                                       
                    data.installationDate = moment(data.installationDate).format('DD/MM/YYYY');
                    $("#tmplCtpDetail").tmpl(data).appendTo("#usermenu");
                    if (data.stato == 0) { $('.ShowErrorLog').hide(); } else { $('.ShowErrorLog').show(); }


                    Latitude = data.Latitude;
                    Longitude = data.Longitude;
                    if (Longitude == 0 && Latitude == 0) {


                        Latitude = impLat;
                        Longitude = impLong;
                        var latlng = new google.maps.LatLng(parseFloat(Latitude), parseFloat(Longitude));
                    } else {
                        var latlng = new google.maps.LatLng(parseFloat(data.Latitude), parseFloat(data.Longitude));
                    }
                    var Desc = data.Descr;
                    var Cod = data.Cod;
                    var stato = data.stato;
                    var marcamodello = data.marcamodello;
                    var Id = data.Id;
                    geocodefromLatLong(Latitude, Longitude, latlng, Cod, Id, Desc, data, stato);
                    infowindow.setContent(setInfowindowContent(Latitude, Longitude, latlng, Cod, Id, Desc));
                    infowindow.open(map, marker);
                    setlanguage();
                }
            });
        }
        /* ----------------------------------------------------------------*/
        /*
        CRON
        ----------------------------------------------------------------*/

        $.fn.Cron = function (hsId) {
            $("#PlantList").empty();

        }
        /* ----------------------------------------------------------------*/
        /*
        SCA - Allarmi
        ----------------------------------------------------------------*/

        $.fn.TempSca = function (hsId) {
            $("#PlantList").empty();
            localStorage.setItem("Cod", "sca");
            var r = $.DataAccess.hs_Sca_header_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                   // console.log(data);
                    $("#tmplAllarmi").tmpl(data).appendTo("#PlantList");
                    for (var i = 0; i < data.length; i++) {
                        Latitude = data[i].Latitude;
                        Longitude = data[i].Longitude;
                        if (Longitude == 0 && Latitude == 0) {
                            Latitude = impLat;
                            Longitude = impLong;
                            var latlng = new google.maps.LatLng(parseFloat(Latitude), parseFloat(Longitude));
                        } else {
                            var latlng = new google.maps.LatLng(parseFloat(data[i].Latitude), parseFloat(data[i].Longitude));
                        }
                        var Desc = data[i].Descr;
                        var Cod = data[i].Cod;
                        var stato = 0;
                        var marcamodello = data[i].marcamodello;
                        var Id = data[i].Id;
                        //var latlng = new google.maps.LatLng(parseFloat(data[i].Latitude), parseFloat(data[i].Longitude));
                        geocodefromLatLong(Latitude, Longitude, latlng, Cod, Id, Desc, data[i], stato);
                    }//end for 

                    setlanguage();
                }
            });

        }
        function initSca(Id) {
            $("#usermenu").empty();
            var r = $.DataAccess.hs_Sca_header_Read(Id);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    //alert("qui");
                    var title = data.Descr;
                    var detail = $.DataAccess.hs_Sca_detail_List(data.Id);
                    detail.success(function (json) {
                        var data2 = json.d;
                        if (data2) {
                            var fakedata = [{ title: title, data: data2 }];
                            //console.log("SONO QUESTI I DATI ", data2);
                            //data.installationDate = moment(data.installationDate).format('DD/MM/YYYY HH:mm');
                            $("#tmplScaDetail").tmpl(fakedata).appendTo("#usermenu");

                            if (data.stato == 0) { $('.ShowErrorLog').hide(); } else { $('.ShowErrorLog').show(); }
                        }
                    });

                    Latitude = data.Latitude;
                    Longitude = data.Longitude;
                    if (Longitude == 0 && Latitude == 0) {


                        Latitude = impLat;
                        Longitude = impLong;
                        var latlng = new google.maps.LatLng(parseFloat(Latitude), parseFloat(Longitude));
                    } else {
                        var latlng = new google.maps.LatLng(parseFloat(data.Latitude), parseFloat(data.Longitude));
                    }
                    var Desc = data.Descr;
                    var Cod = data.Cod;
                    var stato = 0;
                    var marcamodello = data.marcamodello;
                    var Id = data.Id;
                    geocodefromLatLong(Latitude, Longitude, latlng, Cod, Id, Desc, data, stato);
                    infowindow.setContent(setInfowindowContent(Latitude, Longitude, latlng, Cod, Id, Desc));
                    infowindow.open(map, marker);
                    setlanguage();
                }
            });
        }
        /* ----------------------------------------------------------------*/

        /*
      //Error log
      //------------------------------------------------------------------------*/
        var $logRowNumber = 0;
        var $ElementCod = '';


        $.fn.CallShowErrorLog = function (CirCod) {
            
            //$('.detail2').show();

            $('#DivErrorLog').show({
                right: "100px",
                top: "100px",
                opacity: 1
            });
            $("#DivErrorLog").animate({
                right: "100px",
                top: "100px",
                opacity: 1
            }, {
                duration: 500,
                queue: false
            });



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

      


    }); // document ready

});

function selSynoptic(hsId) {
    $.fn.selSynoptic(hsId);
}

function selPlant(Id, codice) {
    $.fn.selPlant(Id, codice);
}

function sidebar() {
    $.fn.sidebar();
}

function Close_det() { $.fn.Close_det(); }

function CallShowErrorLog(CirCod) { $.fn.CallShowErrorLog(CirCod); }

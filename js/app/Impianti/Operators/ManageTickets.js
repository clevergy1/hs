/*
Impianti Operators Manage Device8 Heating system
------------------------------------------*/
$(function () {

    $(document).ready(function () {
        //setTimeout($.rt.start(), 1000);

        var $recUpdateRead = false;

        $('#MaintenanceMode_UpdResult').removeClass("operationOk");
        $('#MaintenanceMode_UpdResult').removeClass("operationNok");

        $("#pageOperation").empty();

        //tmplNavigationbar
        $('#usermenu').empty();
        $("#tmplNavigationbar").tmpl([{ foo: "" }]).appendTo("#usermenu");
        setlanguage();


        function readImpianto() {
            var req = $.DataAccess.Impianti_Read(localStorage.getItem("IdImpianto"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#DesImpianto").text(data.DesImpianto);
                }
            });
        }

        /*
        Tabella tableHeatingSystem
        -------------------------------------------------------------*/
        $('.tableHeatingSystem').footable();
        $('.tableHeatingSystem').data('page-size', 20);
        $('.tableHeatingSystem').data('limit-navigation', 4);
        $('.tableHeatingSystem').trigger('footable_initialized');


        readImpianto();
        loadHeatingSystem();

        /*
        List
        -----------------------------------------------------------*/
        function loadHeatingSystem() {
            $("#ListHeatingSystem").empty();
            var r = $.DataAccess.HeatingSystem_List(localStorage.getItem("IdImpianto"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplHeatingSystemList").tmpl(data).appendTo("#ListHeatingSystem");
                    $('.tableHeatingSystem').trigger('footable_redraw');
                    setlanguage();
                    loadTotDoc(data);
                    loadTotTickets(data);
                }
            });
        }

        function loadTotDoc(data) {
            for (var i = 0; i < data.length; i++) {
                var r = $.DataAccess.hs_DocsgetTot(data[i].hsId);
                var qts = '#totDoc_' + data[i].hsId
                r.success(function (json) {
                    var tot = json.d;                   
                    $(qts).text(tot);
                });
            }; //end for
        }

        function loadTotTickets(data) {
            for (var i = 0; i < data.length; i++) {
                var r = $.DataAccess.hs_Tickets_getTotOpen(data[i].hsId);
                r.success(function (json) {
                    var tot = json.d;                    
                    $('#totTickets_' + data[i].hsId).text(tot);
                });
            }; //end for
        }
        /*----------------------------------------------------------*/

        /*
        Add
        -----------------------------------------------------------*/
        $('#btnCallAdd').on('click', function (e) {
            $('#Descr_Add').val('');
            $('#Indirizzo_Add').val('');
            $('#AltSLM_Add').val('');

            $('#rowList').hide();
            $('rowEdit').hide();
            $('#rowAdd').show();
            $('#rowMap').show();
        });

        $('#btnCloseAdd').on('click', function (e) {
            $('#rowMap').hide();
            $('#rowAdd').hide();
            $('#rowEdit').hide();
            $('#rowList').show();
        });

        $('#btnSearchOnMap_Add').on('click', function (e) {
            loadmap();
            resetMap();
            var address = $('#Indirizzo_Add').val().trim();
            geocode({ 'address': address });
        });

        $('#btnAdd').on('click', function (e) {            
            var req = $.DataAccess.HeatingSystem_Add(localStorage.getItem("IdImpianto"),
                                                $('#Descr_Add').val(),
                                                $('#Indirizzo_Add').val(),
                                                Latitude,
                                                Longitude,
                                                $('#AltSLM_Add').val(),
                                                localStorage.getItem("OperatorName"));
            req.success(function (json) {
                var data = json.d;
                if (data == true) {
                    loadHeatingSystem();
                    $('#rowMap').hide();
                    $('#rowAdd').hide();
                    $('#rowEdit').hide();
                    $('#rowList').show();
                }
                else {
                    toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                }
            });
        });
        /*----------------------------------------------------------*/

        /*
        Update
        -----------------------------------------------------------*/
        $('#DesconnectionType_Upd').on('focus', function (e) {
            LoadRemoteConnections();
            $("#ModalRemoteConnections").modal('show');
        });

        $('#MapDesc_Upd').on('focus', function (e) {
            LoadhsMaps();
            $("#ModalhsMaps").modal('show');
        });

        $.fn.callUpdate = function (hsId) {
            $recUpdateRead = false;
            $('#hsId_Upd').val('');
            $('#Descr_Upd').val('');
            $('#Indirizzo_Upd').val('');
            $('#AltSLM_Upd').val('');
            $('#DesconnectionType_Upd').val('');
            $('#connectionType_Upd').val(0);
            $('#MapId_Upd').val(0);
            $('#MapDesc_Upd').val('');
            $('#IwMonitoringId_Upd').val('');
            $('#IwMonitoringDes_Upd').val('');
            $('#MaintenanceMode_UpdResult').removeClass("operationOk");
            $('#MaintenanceMode_UpdResult').removeClass("operationNok");

            var req = $.DataAccess.HeatingSystem_Read(hsId);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#hsId_Upd').val(data.hsId);
                    $("#Descr_Upd").val(data.Descr);
                    $("#Indirizzo_Upd").val(data.Indirizzo);
                    $('#AltSLM_Upd').val(data.AltSLM);
                    $('#connectionType_Upd').val(data.VPNConnectionId);
                    $('#MapId_Upd').val(data.MapId);
                    loadmap();
                    if (data.VPNConnectionId > 0) {readRemoteConnection();}
                    if (data.MapId > 0) { readhsMap(); }
                    $('#IwMonitoringId_Upd').val(data.IwMonitoringId);
                    $('#IwMonitoringDes_Upd').val(data.IwMonitoringDes);
                    $('#MaintenanceMode_Upd').bootstrapSwitch('state', data.MaintenanceMode, data.MaintenanceMode);
 
                    $recUpdateRead = true;
                }
            });

            $('#rowList').hide();
            $('rowAdd').hide();
            $('#rowEdit').show();
            $('#rowMap').show();
        }

        function readRemoteConnection() {
            var req = $.DataAccess.Impianti_RemoteConnections_Read(localStorage.getItem("IdImpianto"), $('#connectionType_Upd').val());
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#DesconnectionType_Upd').val(data.Descr);
                    setlanguage();
                }
            });
        }

        function readhsMap() {
            var req = $.DataAccess.hs_Maps_Read($('#MapId_Upd').val());
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#MapDesc_Upd').val(data.MapDesc);
                    setlanguage();
                }
            });
        }

        $('#btnCloseUpd').on('click', function (e) {
            loadHeatingSystem(); //ricarico la lista comunque. protrei aver cambiato la modalità di manutenzione
            $('#rowMap').hide();
            $('#rowAdd').hide();
            $('#rowEdit').hide();
            $('#rowList').show();
        });

        $('#btnSearchOnMap_Upd').on('click', function (e) {
            loadmap();
            resetMap();
            var address = $('#Indirizzo_Upd').val().trim();
            geocode({ 'address': address });
        });

        $('#btnUpdate').on('click', function (e) {
            //console.log($('#MapId_Upd').val());
            var req = $.DataAccess.HeatingSystem_Update($('#hsId_Upd').val(),
                                                        $('#Descr_Upd').val(),
                                                        $('#Indirizzo_Upd').val(),
                                                        Latitude,
                                                        Longitude,
                                                        $('#AltSLM_Upd').val(),
                                                        $('#connectionType_Upd').val(),
                                                        $('#MapId_Upd').val(),
                                                        localStorage.getItem("OperatorName"));
            req.success(function (json) {
                var data = json.d;
                if (data == true) {
                    setIwMonitoring();
                    loadHeatingSystem();
                    $('#rowMap').hide();
                    $('#rowAdd').hide();
                    $('#rowEdit').hide();
                    $('#rowList').show();
                }
                else {
                    toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                }
            });
        });

        function setIwMonitoring() {
            var IwMonitoringId = $('#IwMonitoringId_Upd').val(),
                IwMonitoringDes = $('#IwMonitoringDes_Upd').val();
            var req = $.DataAccess.HeatingSystem_setIwMonitoring($('#hsId_Upd').val(), IwMonitoringId, IwMonitoringDes);
        }

        $('#MaintenanceMode_Upd').on('switchChange.bootstrapSwitch', function (event, state) {
            //console.log(this); // DOM element
            //console.log(event); // jQuery event
            //console.log(state); // true | false
            if ($recUpdateRead==true) {
                var req = $.DataAccess.HeatingSystem_setMaintenanceMode($('#hsId_Upd').val(), state);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        $('#MaintenanceMode_UpdResult').addClass("operationOk");
                    }
                    else {
                        $('#MaintenanceMode_UpdResult').addClass("operationNok");
                    }
                });
            }
        });

        function LoadRemoteConnections() {
            $("#RemoteConnectionsList").empty();
            var req = $.DataAccess.Impianti_RemoteConnections_List(localStorage.getItem("IdImpianto"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplRemoteConnectionsList").tmpl(data).appendTo("#RemoteConnectionsList");
                    $("#RemoteConnectionsList").niceScroll({
                        cursorcolor: "#1FB5AD",
                        cursorborder: "0px solid #fff",
                        cursorborderradius: "0px",
                        cursorwidth: "3px"
                    });
                }
            });
        }
        $.fn.selRemoteConnection = function (IdAddress, Descr) {
            $('#DesconnectionType_Upd').val(Descr);
            $('#connectionType_Upd').val(IdAddress);
            $("#ModalRemoteConnections").modal('hide');
        }

        function LoadhsMaps() {
            $("#hsMapsList").empty();
            var req = $.DataAccess.hs_Maps_List(localStorage.getItem("IdImpianto"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplhsMapsList").tmpl(data).appendTo("#hsMapsList");
                    $("#hsMapsList").niceScroll({
                        cursorcolor: "#1FB5AD",
                        cursorborder: "0px solid #fff",
                        cursorborderradius: "0px",
                        cursorwidth: "3px"
                    });
                }
            });
        }
        $.fn.selhsMap = function (MapId, MapDesc) {
            $('#MapId_Upd').val(MapId);
            $('#MapDesc_Upd').val(MapDesc);
            $("#ModalhsMaps").modal('hide');
        }
        /*----------------------------------------------------------*/

        /*
        Detail
        -----------------------------------------------------------*/
        $.fn.sel = function (hsId) {
            localStorage.setItem("hsId", hsId);
            $.module.load('Impianti/Operators/Device8Detail');
        }
        /*---------------------------------------------------------*/

        $('#btnSetAddress').on('click', function (e) {
            $('#Indirizzo_Add').val(AddressOnMap);
            $('#AltSLM_Add').val(elevation);
            $('#Indirizzo_Upd').val(AddressOnMap);
            $('#AltSLM_Upd').val(elevation)
        });

        function loadmap() {
            //google maps
            $('#googlemap').height(600);
            map = new google.maps.Map(document.getElementById('googlemap'), {
                zoom: 15,
                zoomControl: false,
                streetViewControl: false,
                center: new google.maps.LatLng(Latitude, -Longitude),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            elevator = new google.maps.ElevationService();

            geocoder = new google.maps.Geocoder();
            infowindow = new google.maps.InfoWindow({
                'size': new google.maps.Size(292, 120)
            });

            resetMap();
            var address = $('#Indirizzo_Add').val().trim();
            if (address == '') {
                address = $('#Indirizzo_Upd').val().trim();
            }
            geocode({ 'address': address });
        }


        //google maps
        //======================================================
        var map;
        var elevator;
        var elevation = 0;
        var AddressOnMap = null;
        var Latitude = 0;
        var Longitude = 0;
        var geocoder = null;
        var shadow = null;
        var clickIcon = null;
        var clickMarker = null;
        var markers = null;
        var infowindow = null;
        var btnSaveLL = '<a href="#" class="ui-button ui-button-text-icon-primary ui-widget ui-state-default ui-corner-all" title="salva" onclick="saveLL();">' +
                        '<span class="ui-button-icon-primary ui-icon ui-icon-disk"></span>' +
                        '<span class="ui-button-text">Salva</span>' +
                        '</a>';
        var MAPFILES_URL = "http://maps.gstatic.com/intl/en_us/mapfiles/";

        function geocode(request) {
            geocoder.geocode(request, searchResults);

        }
        function searchResults(results, status) {
            //console.log('searchResults : ' + results + ' status: ' + status);
            //alert('latitude : ' + results[0].geometry.location.lat() + '\nlongitude : '+ results[0].geometry.location.lng());

            var reverse = (clickMarker != null);
            if (!results) {
                console.log("google maps non ha restituito una risposta valida.");
            } else {

                if (status == google.maps.GeocoderStatus.OK) {
                    Latitude = results[0].geometry.location.lat();
                    Longitude = results[0].geometry.location.lng();

                    var route = '', street_number = '', postal_code = '', locality = '', prov = '';
                    var searchAddressComponents = results[0].address_components;
                    $.each(searchAddressComponents, function () {
                        if (this.types[0] == "route") {
                            route = this.short_name;
                            //console.log("route" + this.short_name);
                        }
                        if (this.types[0] == "street_number") {
                            //console.log("street_number" + this.short_name);
                            street_number = this.short_name;
                        }
                        if (this.types[0] == "postal_code") {
                            //console.log("postal_code" + this.short_name);
                            postal_code = this.short_name;
                        }
                        if (this.types[0] == "locality") {
                            //console.log("locality" + this.short_name);
                            locality = this.short_name;
                        }
                        if (this.types[0] == "administrative_area_level_2") {
                            //console.log("prov" + this.short_name);
                            prov = this.short_name;
                        }
                    });
                    //$('#updIndImpianto').val(route + ' ' + street_number + ' ' + postal_code + ' ' + locality);
                    var address = route + ' ' + street_number + ' ' + postal_code + ' ' + locality + ' ' + prov;

                    AddressOnMap = address;

                    var latlng = new google.maps.LatLng(Latitude, Longitude);
                    var locations = [];
                    locations.push(latlng);
                    var positionalRequest = {
                        'locations': locations
                    }
                    elevator.getElevationForLocations(positionalRequest, function (results, status) {
                        if (status == google.maps.ElevationStatus.OK) {

                            // Retrieve the first result
                            if (results[0]) {
                                elevation = parseInt(results[0].elevation);
                                showPosition(address, elevation);
                                //console.log('The elevation at this pointis ' + results[0].elevation + ' meters.');

                            } else {
                                elevation = 0;
                                console.log('No results found');
                            }
                        } else {
                            elevation = 0;
                            console.log('Elevation service failed due to: ' + status);
                        }
                    });



                } else {
                    if (!reverse) {
                        map.setCenter(new google.maps.LatLng(0.0, 0.0));
                        map.setZoom(1);
                    }
                }
            }
        }


        function getCoordinates(position) {
            Latitude = position.coords.latitude;
            Longitude = position.coords.longitude;
            var latlng = new google.maps.LatLng(Latitude, Longitude);
            geocode({ 'latLng': latlng });
            //showPosition();
        }
        function error() {
            alert("Geocoder failed");
        }

        function showPosition(address, elevation) {
            //console.log('showPosition  address: ' + address + " elevation: " + elevation);
            var latlong = new google.maps.LatLng(Latitude, Longitude);

            //var address = $('#map-address').val();
            if (Latitude != "0") {
                resetMap();

                var icon = new google.maps.MarkerImage(
                            'images/Location-Pointer.png',
                            new google.maps.Size(45, 40),
                            new google.maps.Point(0, 0),
                            new google.maps.Point(10, 34)
                            );
                //------------------------------------------//
                clickMarker = new google.maps.Marker({
                    'position': latlong,
                    'map': map,
                    'title': 'titolo',
                    'clickable': true
                });

                var html = "";
                html = '<div id="content">';
                html += '<div id="siteNotice"></div>';
                html += '<div id="bodyContent" style="height:100px;width:200px;overflow:hidden;>';
                html += '<br/><a href="#" style="text-decoration:none" >';
                html += '<i class="fa fa-home"></i>';
                html += 'current address:<br/> ';
                html += address;
                html += '<br />';
                html += 'altitude:';
                html += elevation + '&nbsp;meters';
                html += '</a>';
                //html += '<p>';
                //html += btnSaveLL;
                //html += '</p>';
                html += '</div></div>';

                var openInfoWindow = function (marker) {
                    return function () {
                        infowindow.setContent(html);
                        infowindow.open(map, marker);
                        boundsOverlay = null;
                        selected = 0;
                    }
                }
                google.maps.event.addListener(clickMarker, 'click', openInfoWindow(clickMarker));
                google.maps.event.addListener(map, 'click', function (event) {
                    geocode({ 'latLng': event.latLng });
                    //event.latLng
                    //alert('latitude:' + latlng.lat() + ' longitude:' + latlng.long());
                });

                map.panTo(clickMarker.getPosition());
                google.maps.event.addListenerOnce(map, 'idle', function () {
                    google.maps.event.trigger(clickMarker, 'click');
                });
                //------------------------------------------//          
            }

        }

        function resetMap() {
            infowindow.close();

            if (clickMarker != null) {
                clickMarker.setMap(null);
                clickMarker = null;
            }

            for (var i in markers) {
                markers[i].setMap(null);
            }

            markers = [];
            selected = null;
        }
        //======================================================

        /*
        Documents
        ----------------------------------------------------------------*/
        $.fn.CalhsDoc = function (hsId) {
            localStorage.setItem("hsId", hsId);
            $.module.load('Impianti/Operators/hs_Docs_Manage');
        }
        /*--------------------------------------------------------------*/

        /*
        Tickets
        ----------------------------------------------------------------*/
        $.fn.CalhsTickets = function (hsId) {
            localStorage.setItem("hsId", hsId);
            $.module.load('Impianti/Operators/hs_Tickets_Manage');
        }
        /*--------------------------------------------------------------*/
                
        /*
        Note
        ----------------------------------------------------------------*/
        $.fn.calNote = function (hsId) {
            localStorage.setItem("hsId", hsId);
            $.module.load('Impianti/Operators/hs_Note');
        }
        /*--------------------------------------------------------------*/


        /*
        Synoptic
        ----------------------------------------------------------------*/
        $.fn.selSynoptic = function (hsId) {
            var req = $.DataAccess.HeatingSystem_Read(hsId);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    localStorage.setItem("hsId", data.hsId);
                    localStorage.setItem("MapId", data.MapId);
                    var url = 'hs_Synoptic.html';
                    window.open(url, '_blank');
                }
            });
        }
        /*--------------------------------------------------------------*/

    }); //document ready

});

function sel(hsId) {
    $.fn.sel(hsId);
}
function callUpdate(hsId) {
    $.fn.callUpdate(hsId);
}
function selSynoptic(hsId) {
    $.fn.selSynoptic(hsId);
}

function selRemoteConnection(IdAddress, Descr) {   
    $.fn.selRemoteConnection(IdAddress, Descr);
}
function selhsMap(MapId, MapDesc) {
    $.fn.selhsMap(MapId, MapDesc);
}

function CalhsDoc(hsId) {
    $.fn.CalhsDoc(hsId);
}
function CalhsTickets(hsId) {
    $.fn.CalhsTickets(hsId);
}
function calNote(hsId) {
    $.fn.calNote(hsId);
}
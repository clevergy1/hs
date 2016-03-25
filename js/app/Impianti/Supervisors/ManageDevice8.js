/*
Impianti supervisors Manage Device8 Heating system
------------------------------------------*/

$(function () {

    $(document).ready(function () {
        window.cancelAnimationFrame(localStorage.getItem('requestAnimationFrameID'));

        $("#pageOperation").empty();
        $("#tmplpageOperation").tmpl(null).appendTo("#pageOperation");

        $('#usermenu').empty();
        $("#tmplgoback").tmpl(null).appendTo("#usermenu");

        readImpianto();
        loadHeatingSystem();

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
        List
        -----------------------------------------------------------*/
        function loadHeatingSystem() {           
            $("#ListHeatingSystem").empty();
            var r = $.DataAccess.HeatingSystem_ListEnabled(localStorage.getItem("IdImpianto"));
            r.success(function (json) {
                var data = json.d;
                if (data) {                    
                    $("#tmplHeatingSystemList").tmpl(data).appendTo("#ListHeatingSystem");                  
                    setlanguage();
                    loadTotDoc(data);
                    loadTotTickets(data);
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].MapId > 0) {                            
                            $('#bntSynoptic_' + data[i].hsId).show();
                        }
                        else {                            
                            $('#bntSynoptic_' + data[i].hsId).hide();
                        }
                    }//end for
                }
                else {
                    /*
                    non ho trovato heating system
                    molto probabilmente il codice impianto non è corretto.
                    Torno a login
                    */
                    $(location).attr('href', $.appParms.urlRoot());
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
                    $('#totDoc_' + data[i].hsId).text(tot);
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
        Update
        -----------------------------------------------------------*/
        $('#btnCloseUpd').on('click', function (e) {
            loadHeatingSystem(); //ricarico la lista comunque. protrei aver cambiato la modalità di manutenzione
            $('#rowMap').hide();
            $('#rowEdit').hide();
            $('#rowList').show();
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
            $('#Note_Upd').val('');
            $('#IwMonitoringId_Upd').val('');
            $('#IwMonitoringDes_Upd').val('');
            $('#MaintenanceMode_UpdResult').removeClass("operationOk");
            $('#MaintenanceMode_UpdResult').removeClass("operationNok");
            $('#isEnabled_UpdResult').removeClass("operationOk");
            $('#isEnabled_UpdResult').removeClass("operationNok");

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
                    $('#Note_Upd').val(data.Note);

                    $('#Latitude_Upd').val(data.Latitude);
                    $('#Longitude_Upd').val(data.Longitude);
                    Latitude = data.Latitude;
                    Longitude = data.Longitude;
                    loadmap();
                }
            });

            $('#rowList').hide();
            $('rowAdd').hide();
            $('#rowEdit').show();
            $('#rowMap').show();
        }

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
                                                        localStorage.getItem("SupervisorName"));
            req.success(function (json) {
                var data = json.d;
                if (data == true) {
                    $.DataAccess.HeatingSystem_setNote($('#hsId_Upd').val(), $('#Note_Upd').val(), localStorage.getItem("SupervisorName"))

                    loadHeatingSystem();
                    $('#rowMap').hide();
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
        Detail
        -----------------------------------------------------------*/
        $.fn.sel = function (hsId) {
            localStorage.setItem("hsId", hsId);
            $.module.load('Impianti/Supervisors/Device8Detail');
        }
        /*---------------------------------------------------------*/

        /*
        Documents
        ----------------------------------------------------------------*/
        $.fn.CalhsDoc = function (hsId) {
            localStorage.setItem("hsId", hsId);
            $.module.load('Impianti/Supervisors/hs_Docs_Manage');
        }
        /*--------------------------------------------------------------*/

        /*
        Tickets
        ----------------------------------------------------------------*/
        $.fn.CalhsTickets = function (hsId) {
            localStorage.setItem("hsId", hsId);
            $.module.load('Impianti/Supervisors/hs_Tickets_Manage');
        }
        /*--------------------------------------------------------------*/

        /*
        Note
        ----------------------------------------------------------------*/
        $.fn.calNote = function (hsId) {
            localStorage.setItem("hsId", hsId);
            $.module.load('Impianti/Supervisors/hs_Note');
        }
        /*--------------------------------------------------------------*/

        /*
        businesshour
        -------------------------------------------------------------------*/
        $.fn.businesshour = function (hsId) {
            localStorage.setItem("hsId", hsId);
            $.module.load('Impianti/Supervisors/hs_businesshour');
        }
        /*-----------------------------------------------------------------*/

        /*
        Synoptic
        ----------------------------------------------------------------*/
        //$.fn.selSynoptic = function () {
        //    var url2Call = $.appParms.urlserver() + 'hssynoptic/Index.html?IdImpianto=' + localStorage.getItem("IdImpianto");
        //    var req = $.DataAccess.HeatingSystem_getTotMap(localStorage.getItem("IdImpianto"));
        //    req.success(function (json) {
        //        var data = json.d;
        //        if (data == 0) {url2Call += '&Type=1'; }
        //        else { url2Call += '&Type=0'; }

        //        // Get the user agent string
        //        var deviceAgent = navigator.userAgent;
        //        // Set var to iOS device name or null
        //        var ios = deviceAgent.toLowerCase().match(/(iphone|ipod|ipad)/);
        //        if (ios) {
        //            $(location).attr('href', url2Call);
        //        }
        //        else {
        //            window.open(url2Call, '_blank');
        //        }
        //    });
        //}
        $.fn.selSynoptic = function (hsId) {
            var url2Call = $.appParms.urlserver() + 'hssynoptic/Index.html?IdImpianto=' + localStorage.getItem("IdImpianto")
            var req = $.DataAccess.HeatingSystem_getTotMap(localStorage.getItem("IdImpianto"));
            req.success(function (json) {
                var data = json.d;
                if (data == 0) {
                    url2Call += '&Type=1';
                    localStorage.setItem("Tipo_Mappa", 1);
                    $.module.load('synoptic/supervisors/hs_UsageMap_1');
                }
                else {
                    url2Call += '&Type=0';
                    localStorage.setItem("Tipo_Mappa", 0);
                    $.module.load('synoptic/supervisors/hs_UsageMap');
                }

                //window.open(url2Call, '_blank');
            });
        }
        /*--------------------------------------------------------------*/

        function loadmap() {
            //google maps
            $('#googlemap').height(600);
            map = new google.maps.Map(document.getElementById('googlemap'), {
                zoom: 15,
                zoomControl: false,
                streetViewControl: false,
                center: new google.maps.LatLng(Latitude, Longitude),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            elevator = new google.maps.ElevationService();

            geocoder = new google.maps.Geocoder();
            infowindow = new google.maps.InfoWindow({
                'size': new google.maps.Size(292, 120)
            });

            var address =$('#Indirizzo_Upd').val().trim();

            if (Latitude != 0 && Longitude != 0) {
                var latlng = new google.maps.LatLng(parseFloat(Latitude), parseFloat(Longitude));
                marker = new google.maps.Marker({
                    position: latlng,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                    map: map,
                    draggable: true,
                    zIndex: google.maps.Marker.MAX_ZINDEX + 1
                });

                google.maps.event.addListener(marker, 'click', function () {
                    console.log('click this.id=' + this.id + ' this.IdStall=' + this.IdStall + ' lat=' + this.getPosition().lat() + ' long=' + this.getPosition().lng());
                    infowindow.setContent(setInfowindowContent(address, Latitude, Longitude));
                    infowindow.open(map, this);
                    setlanguage();
                });
                google.maps.event.addListener(marker, 'dragstart', function (event) {
                    Latitude = this.getPosition().lat();
                    Longitude = this.getPosition().lng();
                    console.log('dragstart lat=' + Latitude + ' lng=' + Longitude + ' latlng=' + latlng + ' this.getPosition()=' + this.getPosition());
                    infowindow.setContent(setInfowindowContent(address, Latitude, Longitude));
                    infowindow.open(map, this);
                    setlanguage();
                });
                google.maps.event.addListener(marker, 'dragend', function (event) {
                    Latitude = this.getPosition().lat();
                    Longitude = this.getPosition().lng();
                    var latlng = this.getPosition();
                    console.log('dragend t lat=' + Latitude + ' lng=' + Longitude + ' latlng=' + latlng + ' this.getPosition()=' + this.getPosition());
                    infowindow.setContent(setInfowindowContent(address, Latitude, Longitude));
                    infowindow.open(map, this);
                    setlanguage();
                });
            }


            //resetMap();
            //var address = $('#Indirizzo_Add').val().trim();
            //if (address == '') {
            //    address = $('#Indirizzo_Upd').val().trim();
            //}
            //geocode({ 'address': address });
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
            console.log('geocode', request);
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

                    //AddressOnMap = address;

                    $('#Indirizzo_Add').val(address);
                    $('#Indirizzo_Upd').val(address);

                    var latlng = new google.maps.LatLng(Latitude, Longitude);
                    var locations = [];
                    locations.push(latlng);
                    var positionalRequest = {
                        'locations': locations
                    }
                    elevator.getElevationForLocations(positionalRequest, function (results, status) {
                        if (status == google.maps.ElevationStatus.OK) {
                            console.log(results);
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
                    $('#AltSLM_Add').val(elevation);
                    $('#AltSLM_Upd').val(elevation);


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
            ////console.log('showPosition  address: ' + address + " elevation: " + elevation);
            //var latlong = new google.maps.LatLng(Latitude, Longitude);

            ////var address = $('#map-address').val();
            //if (Latitude != "0") {
            //    resetMap();

            //    var icon = new google.maps.MarkerImage(
            //                'images/Location-Pointer.png',
            //                new google.maps.Size(45, 40),
            //                new google.maps.Point(0, 0),
            //                new google.maps.Point(10, 34)
            //                );
            //    //------------------------------------------//
            //    clickMarker = new google.maps.Marker({
            //        'position': latlong,
            //        'map': map,
            //        'title': 'titolo',
            //        'clickable': true
            //    });

            //    var html = "";
            //    html = '<div id="content">';
            //    html += '<div id="siteNotice"></div>';
            //    html += '<div id="bodyContent" style="height:100px;width:200px;overflow:hidden;>';
            //    html += '<br/><a href="#" style="text-decoration:none" >';
            //    html += '<i class="fa fa-home"></i>';
            //    html += 'current address:<br/> ';
            //    html += address;
            //    html += '<br />';
            //    html += 'altitude:';
            //    html += elevation + '&nbsp;meters';
            //    html += '</a>';
            //    //html += '<p>';
            //    //html += btnSaveLL;
            //    //html += '</p>';
            //    html += '</div></div>';

            //    var openInfoWindow = function (marker) {
            //        return function () {
            //            infowindow.setContent(html);
            //            infowindow.open(map, marker);
            //            boundsOverlay = null;
            //            selected = 0;
            //        }
            //    }
            //    google.maps.event.addListener(clickMarker, 'click', openInfoWindow(clickMarker));
            //    google.maps.event.addListener(map, 'click', function (event) {
            //        geocode({ 'latLng': event.latLng });
            //        //event.latLng
            //        //alert('latitude:' + latlng.lat() + ' longitude:' + latlng.long());
            //    });

            //    map.panTo(clickMarker.getPosition());
            //    google.maps.event.addListenerOnce(map, 'idle', function () {
            //        google.maps.event.trigger(clickMarker, 'click');
            //    });
            //    //------------------------------------------//          
            //}

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

        function setInfowindowContent(address, Latitude, Longitude) {
            var html = "";
            html = '<div id="content" style="display:block;white-space: nowrap;width:200px;">';
            // html += '<div id="siteNotice">' + Cod + '</div>';
            html += '<div id="info_window">';
            html += '<i class="fa fa-home"></i>';
            html += 'current address:<br/> ';
            html += address;
            html += '<br />';
            html += '<strong>Lat :</strong> ' + Math.round(Latitude * 1000000) / 1000000 + '<br />';
            html += '<strong>Long :</strong> ' + Math.round(Longitude * 1000000) / 1000000 + '<br/>';
            html += '</div>';
            html += '</div>';
            return html;
        }
        //======================================================

    }); //document ready

});
function callUpdate(hsId) {
    $.fn.callUpdate(hsId);
}
function sel(hsId) {
    $.fn.sel(hsId);
}
function selSynoptic() {
    $.fn.selSynoptic();
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
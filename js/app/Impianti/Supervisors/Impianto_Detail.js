﻿/*
Supervisor - installation detail
-----------------------------------------------------------*/
$(function () {

    $(document).ready(function () {

        ReadImpianto();
        setlanguage();

        function ReadImpianto() {
            var req = $.DataAccess.Impianti_Read(localStorage.getItem("IdImpianto"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#DesImpianto").text(data.DesImpianto);
                    $("#Indirizzo").val(data.Indirizzo);
                    $("#AltSLM").val(data.AltSLM);
                    loadmap();
                }
            });
        }

        /*
        Dettagli impianto
        -------------------------------------------------------------------------------*/

        function loadmap() {
            //google maps
            $('#googlemap').height(400);
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

            resetMap();
            var address = $('#Indirizzo').val().trim();
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
                    'clickable': false
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
                //google.maps.event.addListener(map, 'click', function (event) {
                //    geocode({ 'latLng': event.latLng });
                //    //event.latLng
                //    //alert('latitude:' + latlng.lat() + ' longitude:' + latlng.long());
                //});

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

        /*-------------------------------------------------------------------------------*/

        /*
        Contatti
        ---------------------------------------------------------------------------------*/
        $('.tableContatti').footable();
        $('.tableContatti').data('page-size', 20);
        $('.tableContatti').data('limit-navigation', 4);
        $('.tableContatti').trigger('footable_initialized');
        loadContatti();

        function loadContatti() {
            $("#ListContatti").empty();
            var r = $.DataAccess.Impianti_Contatti_List(localStorage.getItem("IdImpianto"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplListContatti").tmpl(data).appendTo("#ListContatti");
                    $('.tableContatti').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }

        $('#btnCallAddContatto').on('click', function (e) {
            $.module.load('Impianti/Supervisors/Impianti_Contatti_Add');

        });
        $.fn.selContatto = function (IdContatto) {
            localStorage.setItem("IdContatto", IdContatto);
            $.module.load('Impianti/Supervisors/Impianti_Contatti_Upd');
        }
        /*-------------------------------------------------------------------------------*/

    }); //document ready

});
function selContatto(IdContatto) {
    $.fn.selContatto(IdContatto);
}
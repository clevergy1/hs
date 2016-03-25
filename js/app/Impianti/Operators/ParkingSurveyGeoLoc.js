/*
Impianti Operators suvey geolocation
--------------------------------------*/
$(function () {

    $(document).ready(function () {
        var Latitude = 45.6982642;
        var Longitude = 9.677269799999976;
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

        var parkingmarkerimage = {
            url: 'images/parking-marker.png',
            // This marker is 20 pixels wide by 32 pixels tall.
            size: new google.maps.Size(32, 37),
            // The origin for this image is 0,0.
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at 0,32.
            anchor: new google.maps.Point(0, 37)
        };

        $("#Scontainter").draggable();
        elevator = new google.maps.ElevationService();
        geocoder = new google.maps.Geocoder();
        infowindow = new google.maps.InfoWindow();

        ReadParking();
        loadParking();
        setlanguage();

        function ReadParking() {
            var req = $.DataAccess.Parking_Read(localStorage.getItem("IdImpianto"), localStorage.getItem("IdPark"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#ParkDescr").text(data.DesPark);
                    Latitude = data.Latitude;
                    Longitude = data.Longitude;
                    setTimeout(function () { loadmap(); }, 1000);                    
                }
            });
        }

        function loadmap() {
            var h = $(window).height() - $('.header').height() - 30;
            //google maps
            $('#googlemap').height(h);
            map = new google.maps.Map(document.getElementById('googlemap'), {
                zoom: 13,
                zoomControl: false,
                streetViewControl: false,
                center: new google.maps.LatLng(Latitude, Longitude),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            bounds = new google.maps.LatLngBounds();
            google.maps.event.addListener(map, 'click', getLatLngfromclick);

            $('#Scontainter').show();
            $("#Scontainter").animate({
                left: "100px",
                top: "100px",
                opacity: 1
            }, {
                duration: 500,
                queue: false
            });
        }

        function loadParking() {
            $("#SurveyList").empty();
            var r = $.DataAccess.Parking_Survey_List(localStorage.getItem("IdImpianto"), localStorage.getItem("IdPark"), false);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplSurveyList").tmpl(data).appendTo("#SurveyList");
                    $('#SurveyList').slimscroll({
                        height: '300px',
                        wheelStep: 35
                    });
                    setlanguage();
                    
                } //if data
            });
        }

        /*
        Edit
        -----------------------------------------------*/
        $.fn.selSurvey = function (PlaceId) {
            $('#currentSurvey').text('');
            $('#SurveyPlaceId').val(0);
            $('#Latitude_Upd').val('');
            $('#Longitude_Upd').val('');
            $('#AltSLM_Upd').val('');

            var req = $.DataAccess.Parking_Survey_ReadByPlaceId(PlaceId);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#currentSurvey').text(data.IdSurvey);
                    $('#SurveyPlaceId').val(data.PlaceId);
                    $('#Latitude_Upd').val(data.Latitude);
                    $('#Longitude_Upd').val(data.Longitude);
                    $('#AltSLM_Upd').val(data.AltSLM);

                    $('#SectionList').hide();
                    $('#SectionDetail').show();

                    if ( parseFloat(data.Latitude)>0 && parseFloat(data.Longitude)>0  ){
                        var latlng = new google.maps.LatLng(parseFloat(data.Latitude), parseFloat(data.Longitude));
                        bounds.extend(latlng);
                        marker = new google.maps.Marker({
                            position: latlng,
                            map: map,
                            icon: parkingmarkerimage,
                            id: data.PlaceId,
                            content: setInfowindowContent(data.IdSurvey, data.Latitude, data.Longitude, data.AltSLM)
                        });
                        google.maps.event.addListener(marker, 'click', function () {
                            infowindow.setContent(this.content);
                            infowindow.open(map, this);
                            setlanguage();
                        });
                        map.fitBounds(bounds);
                    }
                }
            });
        }

        $('.btnCloseDetail').on('click', function (e) {
            $('#SectionDetail').hide();
            $('#SectionList').show();            
        });

        $('#bntUpd').on('click', function (e) {
            var PlaceId = $('#SurveyPlaceId').val(),
            Latitude = $('#Latitude_Upd').val(),
            Longitude = $('#Longitude_Upd').val(),
            AltSLM = $('#AltSLM_Upd').val();
            var req = $.DataAccess.Parking_Survey_setCoords(PlaceId, Latitude, Longitude, AltSLM);
            req.success(function (json) {
                var data = json.d;
                if (data == true) {
                    loadParking();
                    $('#SectionDetail').hide();
                    $('#SectionList').show();
                }
            });
        });
       
        /*---------------------------------------------*/

        /*
        map
        -----------------------------------------------*/
        function getLatLngfromclick(event) {
            var lat = event.latLng.lat();
            var lng = event.latLng.lng();
            var latlng = event.latLng;
            geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        if (marker != null) marker.setMap(null);
                        marker = new google.maps.Marker({
                            position: latlng,
                            icon: parkingmarkerimage,
                            map: map
                        });
                        $('#Latitude_Upd').val(lat);
                        $('#Longitude_Upd').val(lng);



                        // Retrieve the clicked location and push it on the array
                        var clickedLocation = new google.maps.LatLng(lat, lng);
                        var locations = [];
                        locations.push(clickedLocation);
                        var positionalRequest = {
                            'locations': locations
                        }
                        // Initiate the location request
                        elevator.getElevationForLocations(positionalRequest, function (results, status) {
                            if (status == google.maps.ElevationStatus.OK) {

                                // Retrieve the first result
                                if (results[0]) {
                                    // Open an info window indicating the elevation at the clicked position
                                    $('#AltSLM_Upd').val(Math.floor(results[0].elevation));                                    
                                } else {
                                    $('#AltSLM_Upd').val(0);
                                }
                            } else {
                                alert( "Elevation service failed due to: " + status);
                            }
                        });

                        map.setCenter(latlng);
                        infowindow.setContent(setInfowindowContent($('#currentSurvey').text(), $('#Latitude_Upd').val(), $('#Longitude_Upd').val(),  $('#AltSLM_Upd').val()));
                        infowindow.open(map, marker);   
                    }
                } else {
                    if (marker != null) marker.setMap(null);
                    marker = new google.maps.Marker({
                        position: latlng,
                        map: map
                    });
                    map.setCenter(latlng);
                    infowindow.setContent('<div id="info_window">' + 'No resolved address' + '<br/><strong>Latitude :</strong> ' + Math.round(lat * 1000000) / 1000000 + ' | <strong>Longitude :</strong> ' + Math.round(lng * 1000000) / 1000000 + '<br/><br/><span id="altitude"><button type="button" class="btn btn-primary" onclick="getElevation()">Get Altitude</button></span>'  + '</div>');
                    infowindow.open(map, marker);

                    alert("Geocoder failed due to: " + status);

                }
            });
        }

        function setInfowindowContent(IdSurvey, lat, lng, alt) {
            var html = "";
            html = '<div id="content" style="display:block;white-space: nowrap;width:200px;">';
            html += '<div id="siteNotice">' + IdSurvey + '</div>';
            html += '<div id="info_window">';
            html += '<strong>Lat :</strong> ' + Math.round(lat * 1000000) / 1000000 + '<br />';
            html += '<strong>Long :</strong> ' + Math.round(lng * 1000000) / 1000000 + '<br/>';
            html += '<strong>alt :</strong> ' + alt + '<br/>';
            html += '</div>';
            html += '</div>';
            return html;
        }
        /*---------------------------------------------*/

    }); // document ready

});
function selSurvey(PlaceId) {
    $.fn.selSurvey(PlaceId);
}
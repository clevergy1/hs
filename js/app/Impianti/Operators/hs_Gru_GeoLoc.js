$(function () {

    $(document).ready(function () {
        var map;
        var bounds;
        var $hsLatitude, $hsLongitude;
        var infowindow = new google.maps.InfoWindow();

        var markersCollection = []

        $("#Scontainter").draggable();

        Readhs();
        setlanguage();

        function Readhs() {
            var req = $.DataAccess.HeatingSystem_Read(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#hsDescr").text(data.DesImpianto + ' ' + data.Descr);
                    $hsLatitude = data.Latitude;
                    $hsLongitude = data.Longitude;
                    setTimeout(function () { loadmap(data.Latitude, data.Longitude); }, 500);
                }
            });
        }

        function loadmap(Latitude, Longitude) {
            var h = $(window).height() - $('.header').height();
            //google maps
            $('#googlemap').height(h);
            map = new google.maps.Map(document.getElementById('googlemap'), {
                zoom: 13,
                zoomControl: false,
                streetViewControl: false,
                center: new google.maps.LatLng(Latitude, Longitude),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            var latlng = new google.maps.LatLng(parseFloat(Latitude), parseFloat(Longitude));
            new google.maps.Marker({
                position: latlng,
                icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                map: map,
                draggable: false
            });
            bounds = new google.maps.LatLngBounds();

            if ($(window).width() > 600) {
                $('#Scontainter').show({ left: "100px", top: "100px", opacity: 1 });
                $("#Scontainter").animate({ left: "100px", top: "100px", opacity: 1 }, { duration: 500, queue: false });
            }
            setTimeout(function () { load(); }, 500);
        }


        function load() {
            $("#ulList").empty();
            var r = $.DataAccess.hs_Gru_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmpllList").tmpl(data).appendTo("#ulList");
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].Latitude != 0 && data[i].Longitude != 0) {
                            geoLoc(data[i].GruId, data[i].GruCod, data[i].Latitude, data[i].Longitude);
                        }
                    }//end for
                    $('#ulList').slimscroll({
                        height: '400px',
                        wheelStep: 15
                    });
                    setlanguage();
                }
            });
        }

        function geoLoc(Id, Cod, Latitude, Longitude) {
            var latlng;
            if (Latitude == 0 && Longitude == 0) {
                latlng = new google.maps.LatLng(parseFloat($hsLatitude), parseFloat($hsLongitude));
            }
            else {
                latlng = new google.maps.LatLng(parseFloat(Latitude), parseFloat(Longitude));
            }

            DeleteMarker(Id);
            marker = new google.maps.Marker({
                position: latlng,
                icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                map: map,
                draggable: true,
                zIndex: google.maps.Marker.MAX_ZINDEX + 1,
                id: Id,
                Cod: Cod
            });
            markersCollection.push(marker);

            google.maps.event.addListener(marker, 'click', function () {
                console.log('click this.id=' + this.id + ' this.IdStall=' + this.IdStall + ' lat=' + this.getPosition().lat() + ' long=' + this.getPosition().lng());
                removeActiveClass();
                $('#li_' + this.id).addClass("active");
                //infowindow.setContent(marker.content);
                infowindow.setContent(setInfowindowContent(Id, Cod, Latitude, Longitude));
                infowindow.open(map, this);
                setlanguage();
            });
            google.maps.event.addListener(marker, 'dragstart', function (event) {
                console.log('PlaceId=' + this.id);
                var lat = this.getPosition().lat();
                var lng = this.getPosition().lng();
                console.log('dragstart this.id=' + this.id + ' this.IdStall=' + this.IdStall + ' lat=' + lat + ' lng=' + lng + ' latlng=' + latlng + ' this.getPosition()=' + this.getPosition());
            });
            google.maps.event.addListener(marker, 'dragend', function (event) {
                var lat = this.getPosition().lat();
                var lng = this.getPosition().lng();
                var latlng = this.getPosition();

                console.log('dragend this.id=' + this.id + ' this.IdStall=' + this.IdStall + ' lat=' + lat + ' lng=' + lng + ' latlng=' + latlng + ' this.getPosition()=' + this.getPosition());
                $('#lat_' + this.id).text(lat);
                $('#long_' + this.id).text(lng);

                var req = $.DataAccess.hs_Gas_setGeoLocation(this.id, lat, lng);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        console.log('saved');
                        //$('#resultFor_' + this.id).addClass("operationOk");
                    }
                    else {
                        //$('#resultFor_' + this.id).addClass("operationNok");
                    }
                });
            });
        }

        function setInfowindowContent(Id, Cod, Latitude, Longitude) {
            var html = "";
            html = '<div id="content" style="display:block;white-space: nowrap;width:200px;">';
            html += '<div id="siteNotice">' + Cod + '</div>';
            html += '<div id="info_window">';
            html += '<strong>Lat :</strong> ' + Math.round(Latitude * 1000000) / 1000000 + '<br />';
            html += '<strong>Long :</strong> ' + Math.round(Longitude * 1000000) / 1000000 + '<br/>';
            html += '</div>';
            html += '</div>';
            return html;
        }

        $.fn.sel = function (Id, Cod, Latitude, Longitude) {
            console.log('$.fn.sel', Id, Cod, Latitude, Longitude);
            geoLoc(Id, Cod, Latitude, Longitude);
        }

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
            $('#ulList li').each(function (n) {
                $(this).removeClass("active");
            });
        }

        $(window).resize(function () {
            var h = $(window).height() - $('.header').height();
            $('#googlemap').height(h);
        });

    }); //document ready

});

function sel(Id, Cod, Latitude, Longitude) {
    console.log('sel', Id, Cod, Latitude, Longitude);
    $.fn.sel(Id, Cod, Latitude, Longitude);
}
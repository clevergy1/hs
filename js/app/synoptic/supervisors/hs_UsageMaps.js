/*
Impianti supervisors stall geolocation
--------------------------------------*/
$(function () {

    $(document).ready(function () {
        $("#pageOperation").empty();
        $("#tmplpageOperation").tmpl(null).appendTo("#pageOperation");

        //$("body").css("-ms-content-zooming", "none");
        //$("body").css("touch-action", "none");
        //$("html").css("-ms-content-zooming", "none");
        //$("body").css("touch-action", "none");

        $("#Scontainter").draggable();

        //$('#Scontainter').bind('touchstart click', function (e, pos) {
        //    $("#Scontainter").draggable('disable');
        //    setTimeout(function () { $("#Scontainter").draggable('enable'); }, 1000);
        //});


        $('#openticket').on('click', function () {
            $('#Ticket').show();
            $('#detail').hide();
            $('#DivErrorLog').hide();
            $('#synoptic').hide();
            $.module.load('Impianti/Supervisors/hs_Tickets_Manage');

            //var whereigo = 'supervisors/main.html';
            //$("body").addClass("full-width");
            //$.router.navigate(whereigo);
        });


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
        ReadImpianto()

        function ReadImpianto() {
            var req = $.DataAccess.Impianti_Read(localStorage.getItem("IdImpianto"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#open_system_detail").css("display" , "none");
                    $("#hsDescr").text(data.DesImpianto);
                    
                    Latitude = data.Latitude;
                    Longitude = data.Longitude;
                    setTimeout(function () { loadmap(Latitude, Longitude); }, 1000);
                }
            });

        }

        function loadmap() {
            var h = $(window).height() - $('.header').height();
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
            //Readhs();


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
           
            setTimeout(function () { Readhs(); }, 1000);
        }

        /*elenco delle installazioni*/
        function Readhs() {
            markersCollection = [];
            var req = $.DataAccess.HeatingSystem_ListEnabled(localStorage.getItem("IdImpianto"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#PlantList").empty();
                    $("#tmplPlantList").tmpl(data).appendTo("#PlantList");
                    $('#PlantList').slimscroll({
                        height: '315px',
                        wheelStep: 15
                    });


                    for (var i = 0; i < data.length; i++) {
                        //Latitude = data[i].Latitude;
                        //Longitude = data[i].Longitude;
                        var DesImpianto = data[i].DesImpianto;
                        var Descr = data[i].Descr;
                        var Indirizzo = data[i].Indirizzo;
                        var isOnline = data[i].isOnline;
                        var MaintenanceMode = data[i].MaintenanceMode;
                        var hsId = data[i].hsId;
                        var latlng = new google.maps.LatLng(parseFloat(data[i].Latitude), parseFloat(data[i].Longitude));
                        geocodefromLatLong(data[i].Latitude, data[i].Longitude, latlng, DesImpianto, Descr, Indirizzo, isOnline, MaintenanceMode, hsId);
                    }//end for

                    setlanguage();
                }
            });
        }

        $("#panel-body-ListPlants").mousedown(function (event) {
            event.stopPropagation();
        });

        $(window).resize(function () {
            var h = $(window).height() - $('.header').height();
            $('#googlemap').height(h);
        });

      
        /*
        map
        -----------------------------------------------*/
        //function getLatLngfromclick(event) {
        //    var lat = event.latLng.lat();
        //    var lng = event.latLng.lng();
        //    var latlng = event.latLng;
   
        //    geocodefromLatLong(Latitude, Longitude, latlng, DesImpianto, Descr, Indirizzo, isOnline, MaintenanceMode, hsId);
        //}

        function geocodefromLatLong(Latitude, Longitude, latlng, DesImpianto, Descr, Indirizzo, isOnline, MaintenanceMode, hsId) {
            if (isOnline) {


               DeleteMarker(hsId);
               marker = new google.maps.Marker({
                   position: latlng,
                   icon: clevergygmarkerimage_verde,
                   map: map,
                   draggable: false,
                   id: hsId
               });
               markersCollection.push(marker);

            } else {
               DeleteMarker(hsId);
               marker = new google.maps.Marker({
                   position: latlng,
                   icon: clevergygmarkerimage_rosso,
                   map: map,
                   draggable: false,
                   id: hsId
               });
               markersCollection.push(marker);


           } 

          


            //var content = setInfowindowContent(DesImpianto, Descr, Indirizzo, isOnline, MaintenanceMode, hsId);
            //se c'e un infowindow la chiudo se no vadoavanti ela creo 
            if (infowindow) infowindow.close();
            infowindow = new google.maps.InfoWindow()
           

            google.maps.event.addListener(marker, 'click', function () {
                //if (infowindow) infowindow.close();
                removeActiveClass();
                $('#li_' + this.Id).addClass("active");
                infowindow.setContent(setInfowindowContent(DesImpianto, Descr, Indirizzo, isOnline, MaintenanceMode, hsId));
                //infowindow.open(map, marker);
               
                infowindow.open(map, this);
                setlanguage();
            });
         
            bounds.extend(latlng);
            map.fitBounds(bounds);

            map.setCenter(latlng);
            infowindow.setContent(setInfowindowContent(DesImpianto, Descr, Indirizzo, isOnline, MaintenanceMode, hsId));
            infowindow.open(map, marker);
            
        }

        function setInfowindowContent(DesImpianto, Descr, Indirizzo, isOnline, MaintenanceMode, hsId) {
            var html = "";
            html = '<div id="content" style="display:block;white-space: nowrap;width:400px;">';          
            html += '<div id="edifico">' + DesImpianto + '</div>';
            html += '<a style="color:#337ab7;" href="javascript:selSynoptic(' + hsId + ');" id="impianto">' + Descr + '</a>';
            html += '<div id="info_window">';
            html += '<strong>Indirizzo:</strong> ' + Indirizzo + '<br />';
            if (isOnline == true) {
                html += '<strong>' + langResources['connected'] + '</strong>&nbsp &nbsp<i class="fa fa-thumbs-o-up"></i><br/>';
                
            } else {
                html += '<strong>' + langResources['connected'] + '</strong>&nbsp &nbsp<i class="fa fa-times-circle-o"></i><br/>';
            }
            if (MaintenanceMode == true) {   
                html += '<strong>' + langResources['maintenance'] + '</strong>&nbsp &nbsp<i class="fa fa-wrench"></i></i><br/>';
            } else {
                html += '<strong>' + langResources['maintenance'] + '</strong>&nbsp &nbsp<i class="fa fa-thumbs-o-up"><br/>';
            }
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
        $.fn.selSynoptic = function (hsId) {
            var req = $.DataAccess.HeatingSystem_Read(hsId);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    //localStorage.setItem("IdImpianto", data.IdImpianto);
                    localStorage.setItem("hsId", data.hsId);
                    localStorage.setItem("MapId", data.MapId);
                    //var url = 'hs_SynopticT.html';
                    //window.open(url, '_blank');
                    //$.module.load('Impianti/supervisors/hs_Synoptic');
                    $.module.load('synoptic/supervisors/hs_Synoptic')
                }
            });
        }
        /*--------------------------------------------------------------*/

        $.fn.selPlant = function (hsId) {
          
            initPlaceId(hsId);
        }

        function initPlaceId(hsId) {
            //$('#currentStall').text('');
            //$('#StallPlaceId').val(0);
            //$('#Latitude_Upd').val('');
            //$('#Longitude_Upd').val('');
            //$('#AltSLM_Upd').val('');
            
            var req = $.DataAccess.HeatingSystem_Read(hsId);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    
                    Latitude = data.Latitude;
                    Longitude = data.Longitude;
                    var DesImpianto = data.DesImpianto;
                    var Descr = data.Descr;
                    var Indirizzo = data.Indirizzo;
                    var isOnline = data.isOnline;
                    var MaintenanceMode = data.MaintenanceMode;
                    var hsId = data.hsId;
                    var latlng = new google.maps.LatLng(parseFloat(data.Latitude), parseFloat(data.Longitude));
                    geocodefromLatLong(Latitude, Longitude, latlng, DesImpianto, Descr, Indirizzo, isOnline, MaintenanceMode, hsId);                              

                }
            });
        }

    }); // document ready

});
function selSynoptic(hsId) {
    $.fn.selSynoptic(hsId);
}

function selPlant(hsId) {
    $.fn.selPlant(hsId);
}
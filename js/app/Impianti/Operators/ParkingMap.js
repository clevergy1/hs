/*
Impianti Operators Parking Maps
------------------------------------------*/
$(function () {
    $(document).ready(function () {
        var auto = 'auto0';

        /*
        received messages
        --------------------------------------------------------------*/
        $.fn.received_NodeIdUpd = function (NodeId) {
            var req = $.DataAccess.Parking_Stall_ReadByNodeId(NodeId);
            req.success(function (json) {
                var dataStall = json.d;
                if (dataStall) {
                    if (dataStall.Occupied == true) {
                        elaborIn(dataStall.IdStall);
                    }
                    else {
                        elaborOut(dataStall.IdStall);
                    }
                }
            });
        }
        /*-----------------------------------------------------------*/
        

        ReadParking();
       
        setlanguage();

        getMap();

        function ReadParking() {
            var req = $.DataAccess.Parking_Read(localStorage.getItem("IdImpianto"), localStorage.getItem("IdPark"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#ParkDescr").text(data.DesPark);
                }
            });
        }

        function LoadStalls() {
            var r = $.DataAccess.Parking_Stall_ListOccupied(localStorage.getItem("IdImpianto"), localStorage.getItem("IdPark"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#auto0').hide();
                    for (var i = 0; i < data.length; i++) {
                        elaborIn(data[i].IdStall);
                    }//end for
                }
            });
        }

        $('#btnClose').on('click', function (e) {
            $.module.load('Impianti/Operators/ManageParkingMap');
        });

        /*
        map masturbation
        ---------------------------------------------------------*/
        function getMap() {
            $('#svg-main').load($.appParms.urlGlobal() + 'getParkingMap.ashx?IdMap=' + localStorage.getItem("IdMap"), null, function () {
                $('#parkingmap').zoomPanTouchSVG({
                    zoomBtnContainer: '#zoomBtnContainer'
                });
                fixWebkitHeightBug();
                LoadStalls();
            });
        }

        function elaborIn(IdStall) {
            var stallo = 'stallo-' + IdStall.trim();            
           
            if (chekstallooccupato(stallo) == false) {
                var _stallo = document.getElementById(stallo);
                //console.log(_stallo);

                var _x = parseFloat(_stallo.getAttribute('x'));
                var _y = parseFloat(_stallo.getAttribute('y')) - (parseFloat(_stallo.getAttribute('height')) * 2);

                var G = document.getElementById(auto);
                var scale = G.getAttribute('scale');

                var _element = G.cloneNode(true);

                _element.id = stallo + '-occupato';
                var attrValue = "translate(" + _x + "," + _y + ")";
                attrValue += " scale(0.45)";
                //attrValue += " rotate(90,0,0)";
                _element.setAttribute('transform', attrValue);
                attrValue = "stallooccupatoclick('" + stallo + "')"
                _element.setAttribute('onclick', attrValue);

                document.getElementById("parkingmap").appendChild(_element);

                $('#' + stallo + '-occupato').show('slow');
            }
        }

        function elaborOut(IdStall) {
            var stallo = 'stallo-' + IdStall;
            if (chekstallooccupato(stallo) == true) {
                console.log('out: ' + IdStall);
                $('#' + stallo + '-occupato').hide('slow');

                setTimeout(function () {
                    var tmpsvg = document.getElementById(stallo + '-occupato');
                    var par = tmpsvg.parentNode;
                    par.removeChild(tmpsvg);
                }, 500);
            }
        }

        function chekstallooccupato(stallo) {
            var retVal = true;
            var G = document.getElementById(stallo + '-occupato');
            if (G == null) {
                retVal = false;
            }
            return retVal;
        }

        function fixWebkitHeightBug() {
            var svgW = $('#parkingmap').attr("width");
            var svgH = $('#parkingmap').attr("height")
            var curSVGW = $('#svg-main').width();
            var newSVGH = heightInRatio(svgH, svgW, curSVGW);
            $('#svg-main').height(newSVGH);
            function heightInRatio(oH, oW, nW) {
                return (oH / oW * nW);
            }
        };

        $(window).resize(function () {
            fixWebkitHeightBug();
        });
        /*-------------------------------------------------------*/

    }); //document ready
});
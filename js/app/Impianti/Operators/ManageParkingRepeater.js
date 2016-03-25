/*
Impianti Operators Manage Parking Repeaters
------------------------------------------*/
$(function () {
    $(document).ready(function () {
        var $ParkAltitude;
        ReadParking();
        loadRepeaters();

        setlanguage();

        function ReadParking() {
            var req = $.DataAccess.Parking_Read(localStorage.getItem("IdImpianto"), localStorage.getItem("IdPark"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#ParkDescr").text(data.DesPark);
                    $ParkAltitude = data.AltSLM;
                }
            });
        }

        function loadRepeaters() {
            $("#ListRepeaters").empty();
            var req = $.DataAccess.Parking_Repeater_List(false);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    //for (var i = 0; i < data.length; i++) {                        
                    //    data[i].ActiveSince = moment(data[i].ActiveSince).format('DD/MM/YYYY HH:mm');
                    //}//end for
                    $("#tmplListRepeaters").tmpl(data).appendTo("#ListRepeaters");
                    $('.tableRepeaters').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }

        /*
        Add
        ---------------------------------------------------------*/
        $('#btnCallAdd').on('click', function (e) {
            $('#List').hide();
            $('#Upd').hide();

            $('#Descr_Add').val('');
            $('#Latitude_Add').val('');
            $('#Longitude_Add').val('');
            $('#AltSLM_Add').val('');
            $('#NodeId_Add').val('');
            $('#Note_Add').val('');

            $('.required').removeClass("error");
            $('#Add').show();
        });

        $('#btnCloseAdd').on('click', function (e) {
            $('#Add').hide()
            $('#Upd').hide();
            $('#List').show();
        });

        $('#btnAdd').on('click', function (e) {
            var Descr = $('#Descr_Add').val(),
                Latitude = $('#Latitude_Add').val(),
                Longitude = $('#Longitude_Add').val(),
                AltSLM = $('#AltSLM_Add').val(),
                NodeId = $('#NodeId_Add').autoNumeric('get'),
                Note = $('#Note_Add').val();

            if (!NodeId) { NodeId = '0'; }

            if (checkAdd(Descr) == false) {
                console.log('Latitude='+Latitude + ' Longitude='+ Longitude +' AltSLM='+ AltSLM + ' Descr='+ Descr + ' NodeId='+ NodeId + ' Note='+ Note);
                var req = $.DataAccess.Parking_Repeater_Add(Latitude, Longitude, AltSLM, Descr, NodeId, Note);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        loadRepeaters();
                        $('#Add').hide()
                        $('#Upd').hide();
                        $('#List').show();
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }
            else {
                toastr["warning"](langResources['msg4novaliddata'], langResources['alert']);
            }
        });

        function checkAdd( Descr ) {
            var retVal = false;
            var error_present = false;
            if (!error_present) {
                if (Descr == '') {
                    $('#Descr_Add').addClass("error");
                    error_present = true;
                }
            }
            retVal = error_present;
            return retVal;
        }
        /*-------------------------------------------------------*/

        /*
        Update
        ---------------------------------------------------------*/
        $.fn.callUpdate = function (IdRepeater) {
            $('#List').hide();
            $('#Add').hide();

            var req = $.DataAccess.Parking_Repeater_Read(IdRepeater);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#IdRepeater_Upd').val(data.IdRepeater);
                    $('#Descr_Upd').val(data.Descr);
                    $('#Latitude_Upd').val(data.Latitude);
                    $('#Longitude_Upd').val(data.Longitude);
                    $('#AltSLM_Upd').val(data.AltSLM);
                    $('#NodeId_Upd').autoNumeric('set', data.NodeId);
                    $('#Node_Upd').val(data.Note);
                }
            });

            $('#Upd').show();
        }

        $('#btnCloseUpd').on('click', function (e) {
            $('#Add').hide()
            $('#Upd').hide();
            $('#List').show();
        });

        $('#btnUpd').on('click', function (e) {
            var IdRepeater = $('#IdRepeater_Upd').val(),
                Descr = $('#Descr_Upd').val(),
                Latitude = $('#Latitude_IdAddress_Upd').val(),
                Longitude = $('#Longitude_IdAddress_Upd').val(),
                AltSLM = $('#AltSLM_IdAddress_Upd').val(),
                NodeId = $('#NodeId_Upd').autoNumeric('get'),
                Note = $('#Note_Upd').val();
            if (!NodeId) { NodeId = '0'; }

            if (checkUpd(Descr) == false) {
                var req = $.DataAccess.Parking_Repeater_Update(IdRepeater, Latitude, Longitude, AltSLM, Descr, NodeId, Note);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        loadRepeaters();
                        $('#Add').hide()
                        $('#Upd').hide();
                        $('#List').show();
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }
            else {
                toastr["warning"](langResources['msg4novaliddata'], langResources['alert']);
            }
        });

        function checkUpd(Descr) {
            var retVal = false;
            var error_present = false;
            if (!error_present) {
                if (Descr == '') {
                    $('#Descr_Upd').addClass("error");
                    error_present = true;
                }
            }
            retVal = error_present;
            return retVal;
        }
        /*-------------------------------------------------------*/

        /*
        Repeater detail
        ----------------------------------------------------*/
        $.fn.detailRepeater = function (NodeId) {
            localStorage.setItem("NodeId", NodeId);
            $.module.load('Impianti/Operators/ParkingRepeaterDetail');
        }
        /*--------------------------------------------------*/
    });
});
function callUpdate(IdRepeater) {
    $.fn.callUpdate(IdRepeater);
}
function detailRepeater(NodeId) {
    $.fn.detailRepeater(NodeId);
}
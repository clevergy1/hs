new Date()/*
Impianti Operators Manage Parking Gateways
------------------------------------------*/
$(function () {
    $(document).ready(function () {
        var $currentFocus;

        ReadParking();
        
        function ReadParking() {
            var req = $.DataAccess.Parking_Read(localStorage.getItem("IdImpianto"), localStorage.getItem("IdPark"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#ParkDescr").text(data.DesPark);
                }
            });
        }

        $('.tableGateways').footable();
        $('.tableGateways').data('page-size', 20);
        $('.tableGateways').data('limit-navigation', 4);
        $('.tableGateways').trigger('footable_initialized');
        function LoadGateways() {
            $("#ListGateways").empty();
            var req = $.DataAccess.Parking_Gateway_List(false);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    //for (var i = 0; i < data.length; i++) {                        
                    //    data[i].ActiveSince = moment(data[i].ActiveSince).format('DD/MM/YYYY HH:mm');
                    //}//end for
                    $("#tmplListGateways").tmpl(data).appendTo("#ListGateways");
                    $('.tableGateways').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }
        LoadGateways();
        setlanguage();

        /*
        Add
        ---------------------------------------------------------*/
        $('#btnCallAdd').on('click', function (e) {
            $('#List').hide();
            $('#Upd').hide();

            $('#Descr_Add').val('');
            $('#LocationId_Add').autoNumeric('set', 0);
            $('#RemoteConnection_IdAddress_Add').val('0');
            $('#RemoteConnection_Add').val('');
            $('#injectURL_Add').val('');
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
            var LocationId = $('#LocationId_Add').autoNumeric('get'),
                Descr = $('#Descr_Add').val(),
                RemoteConnection_IdAddress = $('#RemoteConnection_IdAddress_Add').val(),
                injectURL = $('#injectURL_Add').val(),
                NodeId = $('#NodeId_Add').autoNumeric('get'),
                Note = $('#Note_Add').val();

            if (NodeId = '') { NodeId = '0'; }

            if (checkAdd(LocationId, Descr, injectURL) == false) {
                var req = $.DataAccess.Parking_Gateway_Add(LocationId, Descr,RemoteConnection_IdAddress, injectURL, NodeId, Note);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        LoadGateways();
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

        function checkAdd(LocationId, Descr, injectURL) {
            var retVal = false;
            var error_present = false;
            if (!error_present) {
                if (LocationId == '') {
                    $('#LocationId_Add').addClass("error");
                    error_present = true;
                }
            }
            if (!error_present) {
                if (Descr == '') {
                    $('#Descr_Add').addClass("error");
                    error_present = true;
                }
            }
            if (!error_present) {
                if (injectURL == '') {
                    $('#injectURL_Add').addClass("error");
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
        $.fn.callUpdate = function (IdGateway) {
            $('#List').hide();
            $('#Add').hide();

            var req = $.DataAccess.Parking_Gateway_Read(IdGateway);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#IdGateway_Upd').val(data.IdGateway);
                    $('#Descr_Upd').val(data.Descr);
                    $('#LocationId_Upd').autoNumeric('set', data.LocationId);
                    $('#RemoteConnection_IdAddress_Upd').val(data.RemoteConnection_IdAddress);
                    $('#RemoteConnection_Upd').val(data.remoteConnection);
                    $('#injectURL_Upd').val(data.injectURL);
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
            var IdGateway = $('#IdGateway_Upd').val(),
                LocationId = $('#LocationId_Upd').autoNumeric('get'),
                Descr = $('#Descr_Upd').val(),
                RemoteConnection_IdAddress = $('#RemoteConnection_IdAddress_Upd').val(),
                injectURL = $('#injectURL_Upd').val(),
                NodeId = $('#NodeId_Upd').autoNumeric('get'),
                Note = $('#Note_Upd').val();

            if (checkUpd(LocationId, Descr, injectURL) == false) {
                var req = $.DataAccess.Parking_Gateway_Update(IdGateway,
                                                              LocationId,
                                                              Descr,
                                                              RemoteConnection_IdAddress,
                                                              injectURL,
                                                              NodeId,
                                                              Note);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        LoadGateways();
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

        function checkUpd(LocationId, Descr, injectURL) {
            var retVal = false;
            var error_present = false;
            if (!error_present) {
                if (LocationId == '') {
                    $('#LocationId_Upd').addClass("error");
                    error_present = true;
                }
            }
            if (!error_present) {
                if (Descr == '') {
                    $('#Descr_Upd').addClass("error");
                    error_present = true;
                }
            }
            if (!error_present) {
                if (injectURL == '') {
                    $('#injectURL_Upd').addClass("error");
                    error_present = true;
                }
            }
            retVal = error_present;
            return retVal;
        }
        /*-------------------------------------------------------*/


        /*
        Remote Connections
        ---------------------------------------------------------*/
        $('#RemoteConnection_Add').on('focus', function (e) {
            $currentFocus = 'RemoteConnection_Add';
            LoadRemoteConnections();
            $("#ModalRemoteConnections").modal('show');
        });

        $('#RemoteConnection_Upd').on('focus', function (e) {
            $currentFocus = 'RemoteConnection_Upd';
            LoadRemoteConnections();
            $("#ModalRemoteConnections").modal('show');
        });

        function LoadRemoteConnections() {
            $('#RemoteConnectionsList').empty();
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
                    setlanguage()
                }
            });
        }

        $.fn.selRemoteConnection = function (IdAddress, Descr) {
            if ($currentFocus == 'RemoteConnection_Add') {
                $('#RemoteConnection_Add').val(Descr);
                $('#RemoteConnection_IdAddress_Add').val(IdAddress);
            }

            if ($currentFocus == 'RemoteConnection_Upd') {
                $('#RemoteConnection_Upd').val(Descr);
                $('#RemoteConnection_IdAddress_Upd').val(IdAddress);
            }

            $("#ModalRemoteConnections").modal('hide');
        }
        /*-------------------------------------------------------*/

        /*
        Stall detail
        ----------------------------------------------------*/
        $.fn.detailGateway = function (NodeId) {
            localStorage.setItem("NodeId", NodeId);
            $.module.load('Impianti/Operators/ParkingGatewayDetail');
        }
        /*--------------------------------------------------*/
    });
});
function callUpdate(IdGateway) {
    $.fn.callUpdate(IdGateway);
}
function selRemoteConnection(IdAddress,Descr) {
    $.fn.selRemoteConnection(IdAddress,Descr);
}
function detailGateway(NodeId) {
    $.fn.detailGateway(NodeId);
}
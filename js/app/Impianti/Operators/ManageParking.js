/*
Impianti Operators Manage Parking
------------------------------------------*/
$(function () {
    $(document).ready(function () {
        /*
        toastr
        -------------------------------------------------------------*/
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "positionClass": "toast-bottom-right",
            "onclick": null,
            "showDuration": "200",
            "hideDuration": "1000",
            "timeOut": "2000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
        /*-----------------------------------------------------------*/

        /*
         received messages
         --------------------------------------------------------------*/

        $.fn.received_NodeIdAdd = function (NodeId) {
            console.log("received_NodeIdAdd NodeId= " + NodeId);
            var r = $.DataAccess.Parking_Sensor_ReadByNodeId(NodeId);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    data.nodeTS = moment(data.nodeTS).format('DD/MM/YYYY HH:mm');
                    $("#tmplSensorList").tmpl(data).appendTo("#ListSensors");
                    $('table').trigger('footable_redraw');
                    $('#totSensor').text(parseInt($('#totSensor').text()) + 1);
                    setlanguage();
                }
            });
        }

        $.fn.received_NodeIdUpd=function(NodeId) {
            console.log('ManageParking received_NodeIdUpd Node: ' + NodeId);
            //

           var r = $.DataAccess.Parking_Sensor_ReadByNodeId(NodeId);
           r.success(function (json) {
                var data = json.d;
                if (data) {
                    switch (data.SensorType) {
                        case 0:
                            //unassigned sensor
                            UpdateListUnassigned(data);
                            break;
                        case 3:
                            //stall
                            var req = $.DataAccess.Parking_Stall_ReadByNodeId(NodeId);
                            req.success(function (json) {
                                var dataStall = json.d;
                                if (dataStall) {
                                    UpdateListStall(dataStall);
                                }
                            });
                            break;
                    }

                                     
                } //data
            });
        }

        $.fn.received_StakeoutAreaUpd = function (NodeId) {
            console.log("ManageParking received_StakeoutAreaUpd NodeId= " + NodeId);
            var r = $.DataAccess.Parking_Survey_ReadByNodeId(NodeId);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    UpdateListSurvey(data);
                } //data
            });
        }
        /*-----------------------------------------------------------*/


        function UpdateListUnassigned(data) {
            if (data.occ == true) {
                $('#SensorOccupied_' + data.NodeId).html('<i class="fa fa-car fa-2x"></i>');
            }
            else {
                $('#SensorOccupied_' + data.NodeId).html('<i class="fa fa-ellipsis-h"></i>');
            } //data.occ == true
            $('#nodeTS_' + data.NodeId).text(moment(data.nodeTS).format('DD/MM/YYYY HH:mm'));
            $('.LastUpdateSensor').html('');
            $('#LastUpdate_' + data.NodeId).html('<img src="images/action_success.png" alt="" style="height:15px;width:15px"/>');

            if (data.status == 0) {
                $('#SensorStatus_' + data.NodeId).html('<i class="fa fa-thumbs-o-up"></i>');
            }
            else {
                if (data.status == 1) {
                    $('#SensorStatus_' + data.NodeId).html('<img src="images/status1.png" style="height:24px;width:24px" />');
                }
                else {
                    $('#SensorStatus_' + data.NodeId).html('<img src="images/status2.png" style="height:24px;width:24px" />');
                } //data.status == 1
            } //data.status == 0
        }

        function UpdateListStall(data) {
            if (data.Occupied == true) {
                $('#StallOcc_' + data.NodeId).html('<i class="fa fa-car fa-2x"></i>');
                $('#StallDateOcc_' + data.NodeId).text(moment(data.DtOccupied).format('DD/MM/YYYY HH:mm'));
            }
            else {
                $('#StallOcc_' + data.NodeId).html('<i class="fa fa-ellipsis-h"></i>');
                $('#StallDateOcc_' + data.NodeId).text('__:__');
            } //data.occ == true

            $('.LastUpdateSensor').html('');
            $('#StallLastUpdate_' + data.NodeId).html('<img src="images/action_success.png" alt="" style="height:15px;width:15px"/>');

            if (data.NodeStatus == 0) {
                $('#StallStatus_' + data.NodeId).html('<i class="fa fa-thumbs-o-up"></i>');
            }
            else {
                if (data.NodeStatus == 1) {
                    $('#StallStatus_' + data.NodeId).html('<img src="images/status1.png" style="height:24px;width:24px" />');
                }
                else {
                    $('#StallStatus_' + data.NodeId).html('<img src="images/status2.png" style="height:24px;width:24px" />');
                } //data.status == 1
            } //data.status == 0
        }

        function UpdateListSurvey(data) {
            if (data.Occupied == true) {
                $('#SurveyOcc_' + data.NodeId).html('<i class="fa fa-car fa-2x"></i>');
                $('#SurveryDateOcc_' + data.NodeId).text(moment(data.DtOccupied).format('DD/MM/YYYY HH:mm'));
            }
            else {
                $('#SurveyOcc_' + data.NodeId).html('<i class="fa fa-ellipsis-h"></i>');
                $('#SurveryDateOcc_' + data.NodeId).text('__:__');
            } //data.occ == true

            $('.LastUpdateSensor').html('');
            $('#SurveyLastUpdate_' + data.NodeId).html('<img src="images/action_success.png" alt="" style="height:15px;width:15px"/>');

            if (data.NodeStatus == 0) {
                $('#SurveryStatus_' + data.NodeId).html('<i class="fa fa-thumbs-o-up"></i>');
            }
            else {
                if (data.NodeStatus == 1) {
                    $('#SurveryStatus_' + data.NodeId).html('<img src="images/status1.png" style="height:24px;width:24px" />');
                }
                else {
                    $('#SurveryStatus_' + data.NodeId).html('<img src="images/status2.png" style="height:24px;width:24px" />');
                } //data.status == 1
            } //data.status == 0
        }

        /*-----------------------------------------------------------*/

        ReadParking();
  
        $('.tableStalls').footable();
        $('.tableStalls').data('page-size', 5);
        $('.tableStalls').data('limit-navigation', 4);
        $('.tableStalls').trigger('footable_initialized');
        LoadStalls();

        $('.tableSurveys').footable();
        $('.tableSurveys').data('page-size', 5);
        $('.tableSurveys').data('limit-navigation', 4);
        $('.tableSurveys').trigger('footable_initialized');
        LoadSurveys();

        $('.tableSensors').footable();
        $('.tableSensors').data('page-size', 20);
        $('.tableSensors').data('limit-navigation', 4);
        $('.tableSensors').trigger('footable_initialized');
        LoadSensors();

        LoadGateway();
        LoadRepeaters();
        LoadMap();

        setlanguage();



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
            $("#ListStalls").empty();
            var r = $.DataAccess.Parking_Stall_List(localStorage.getItem("IdImpianto"), localStorage.getItem("IdPark"),false);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        data[i].DtOccupied = moment(data[i].DtOccupied).format('DD/MM/YYYY HH:mm');
                    }//end for
                    $("#tmplStallsList").tmpl(data).appendTo("#ListStalls");
                    $('table').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }

        function LoadSurveys() {
            $("#ListSurveys").empty();
            var r = $.DataAccess.Parking_Survey_List(localStorage.getItem("IdImpianto"), localStorage.getItem("IdPark"), false);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        data[i].DtOccupied = moment(data[i].DtOccupied).format('DD/MM/YYYY HH:mm');
                    }//end for
                    $("#tmplSurveysList").tmpl(data).appendTo("#ListSurveys");
                    $('table').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }

        function LoadSensors() {
            $('#totSensor').text('0');
            $("#ListSensors").empty();
            var r = $.DataAccess.Parking_Sensor_ListNotAssigned();
            r.success(function (json) {
                var data = json.d;
                
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        //data[i].nodeTS = moment(data[i].nodeTS).format('lll');
                        data[i].nodeTS = moment(data[i].nodeTS).format('DD/MM/YYYY HH:mm');
                    }//end for

                    $("#tmplSensorList").tmpl(data).appendTo("#ListSensors");
                    $('table').trigger('footable_redraw');                    
                    $('#totSensor').text(data.length);
                    setlanguage();
                }
            });
        }

        function LoadGateway() {
            $("#GatewayList").empty();
            var req = $.DataAccess.Parking_Gateway_List(false);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplGatewayList").tmpl(data).appendTo("#GatewayList");
                    $("#GatewayList").niceScroll({
                        cursorcolor: "#1FB5AD",
                        cursorborder: "0px solid #fff",
                        cursorborderradius: "0px",
                        cursorwidth: "3px"
                    });
                }
            });
        }

        function LoadRepeaters() {
            $("#RepeatersList").empty();
            var req = $.DataAccess.Parking_Repeater_List(false);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplRepeatersList").tmpl(data).appendTo("#RepeatersList");
                    $("#RepeatersList").niceScroll({
                        cursorcolor: "#1FB5AD",
                        cursorborder: "0px solid #fff",
                        cursorborderradius: "0px",
                        cursorwidth: "3px"
                    });
                }
            })
        }

        function LoadMap() {
            $("#MapList").empty();
            var req = $.DataAccess.Parking_Map_List(localStorage.getItem("IdImpianto"), localStorage.getItem("IdPark"), false);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplMapList").tmpl(data).appendTo("#MapList");
                    $("#MapList").niceScroll({
                        cursorcolor: "#1FB5AD",
                        cursorborder: "0px solid #fff",
                        cursorborderradius: "0px",
                        cursorwidth: "3px"
                    });
                }
            })
        }

        /*
        Add Stall
        ----------------------------------------------------*/
        $('#btnCallAdd').on('click', function (e) {
            $('#IdStall_Add').val('');

            $('#StalliList').hide();
            $('#SurveyList').hide();
            $('#SensorsList').hide();
            $('#StalliEdit').hide();            
            $('#grm').hide();
            $('#StalliAdd').show();
        });

        $('#btnCloseAdd').on('click', function (e) {
            $('#StalliAdd').hide();
            $('#StalliEdit').hide();
            $('#StalliList').show();
            $('#SurveyList').show();
            $('#SensorsList').show();
            $('#grm').show();
        });

        $('#btnAdd').on('click', function (e) {
            var IdStall = $('#IdStall_Add').val().trim();
            if (IdStall == '') {
                toastr["warning"](langResources['msg4novaliddata'], langResources['alert']);
            }
            else {
                var req = $.DataAccess.Parking_Stall_Add(localStorage.getItem('IdImpianto'), localStorage.getItem("IdPark"), IdStall);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        LoadStalls();
                        $('#StalliAdd').hide();
                        $('#StalliEdit').hide();
                        $('#StalliList').show();
                        $('#SurveyList').show();
                        $('#SensorsList').show();
                        $('#grm').show();
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }
        });
        /*--------------------------------------------------*/

        /*
        Update Stall
        ----------------------------------------------------*/
        $.fn.callUpdateStall = function (IdStall) {
            $('#StallPlaceId').val(0);
            $('#IdStall_Old').val(0);
            $('#IdStall_Upd').val(0);
            $('#IdSensor_Upd').val(0);
            $('#NodeId_Upd').val('');
            $('#Latitude_Upd').val('');
            $('#Longitude_Upd').val('');
            $('#AltSLM_Upd').val('');
            $('#Map_Upd').val('');
            $('#Note_Upd').val('');
            var req = $.DataAccess.Parking_Stall_Read(localStorage.getItem('IdImpianto'), localStorage.getItem("IdPark"), IdStall);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#StallPlaceId').val(data.PlaceId);
                    $('#IdStall_Old').val(data.IdStall);
                    $('#IdStall_Upd').val(data.IdStall);
                    $('#IdSensor_Upd').val(data.IdSensor);
                    $('#NodeId_Upd').val(data.NodeId);
                    $('#Latitude_Upd').val(data.Latitude);
                    $('#Longitude_Upd').val(data.Longitude);
                    $('#AltSLM_Upd').val(data.AltSLM);
                    $('#Note_Upd').val(data.Note);
                }
            });

            var req = $.DataAccess.Parking_Map_Read(localStorage.getItem('IdImpianto'), localStorage.getItem("IdPark"), $('#IdMap_Upd').val());
            req.success(function (json) {
                var data = json.d;
                if (data) { 
                    $('#Map_Upd').val(data.DesMap);
                }
            });

            $('#StalliList').hide();
            $('#SurveyList').hide();
            $('#SensorsList').hide();
            $('#grm').hide();
            $('#StalliAdd').hide();
            $('#StalliEdit').show();            
        }

        $('#btnCloseUpd').on('click', function (e) {
            $('#StalliAdd').hide();
            $('#StalliEdit').hide();
            $('#StalliList').show();
            $('#SurveyList').show();
            $('#SensorsList').show();
            $('#grm').show();
        });

        $('#bntUpd').on('click', function (e) {
            var IdStall_Old = $('#IdStall_Old').val().trim(),
                IdStall = $('#IdStall_Upd').val().trim(),
                Latitude = $('#Latitude_Upd').val().trim(),
                Longitude = $('#Longitude_Upd').val().trim(),
                AltSLM = $('#AltSLM_Upd').val().trim(),
                IdMap = 0,
                Note = $('#Note_Upd').val().trim(),
                NodeId_Upd = $('#NodeId_Upd').val();


            if (IdStall == '') {
                toastr["warning"](langResources['msg4novaliddata'], langResources['alert']);
            }
            else {
                var req = $.DataAccess.Parking_Stall_update(localStorage.getItem('IdImpianto'),
                                                            localStorage.getItem("IdPark"),
                                                            IdStall_Old,
                                                            IdStall,
                                                            NodeId_Upd,
                                                            Latitude,
                                                            Longitude,
                                                            AltSLM,
                                                            IdMap,
                                                            Note);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        LoadStalls();
                        LoadSensors();
                        $('#StalliAdd').hide();
                        $('#StalliEdit').hide();
                        $('#StalliList').show();
                        $('#SurveyList').show();
                        $('#SensorsList').show();
                        $('#grm').show();
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            } //if IdStall==''

        });

        $('#btnDeleteStall').on('click', function (e) {
            var PlaceId = $('#StallPlaceId').val();
            var req = $.DataAccess.Parking_Stall_Del(PlaceId);
            req.success(function (json) {
                var data = json.d;
                if (data == true) {
                    $('#StalliAdd').hide();
                    $('#StalliEdit').hide();
                    $('#StalliList').show();
                    $('#SurveyList').show();
                    $('#SensorsList').show();
                    $('#grm').show();
                    LoadStalls();
                }
            });

        });
        /*--------------------------------------------------*/

        /*
        Assign sensor to stall
        ----------------------------------------------------*/
        $.fn.selSensor = function (NodeId) {
            localStorage.setItem("NodeId", NodeId);
            $.module.load('Impianti/Operators/ParkingAssignSensorToStall');
        }
        /*--------------------------------------------------*/

        /*
        Sensor detail
        ----------------------------------------------------*/
        $.fn.detailSensor = function (NodeId) {
            localStorage.setItem("NodeId", NodeId);
            $.module.load('Impianti/Operators/ParkingSensorDetail');
        }
        /*--------------------------------------------------*/

        /*
        Stall detail
        ----------------------------------------------------*/
        $.fn.detailStall = function (NodeId) {
            localStorage.setItem("NodeId", NodeId);
            $.module.load('Impianti/Operators/ParkingStallDetail');
        }
        /*--------------------------------------------------*/

        /*
        Survey detail
        ----------------------------------------------------*/
        $.fn.detailSurvey = function (NodeId) {
            localStorage.setItem("NodeId", NodeId);
            $.module.load('Impianti/Operators/ParkingSurveyDetail');
        }
        /*--------------------------------------------------*/
    });
});

//function unsubscribe() {   
//    $.fn.unsubscribe();
//}
function callUpdateStall(IdStall) {
    $.fn.callUpdateStall(IdStall);
}
function selSensor(NodeId) {
    $.fn.selSensor(NodeId);
}
function detailSensor(NodeId) {
    $.fn.detailSensor(NodeId);
}
function detailStall(NodeId) {
    $.fn.detailStall(NodeId);
}
function detailSurvey(NodeId) {
    $.fn.detailSurvey(NodeId);
}

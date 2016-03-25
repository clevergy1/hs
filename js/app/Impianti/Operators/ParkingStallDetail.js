/*
Impianti Operators Parking stall detail
------------------------------------------*/
$(function () {
    $(document).ready(function () {
        /*
        signalR
        --------------------------------------------------------------*/
        $.rt.start();

        $.fn.received_NodeIdUpd = function (NodeId) {
            console.log('executing received_NodeIdUpd Node: ' + NodeId);
            ReadSensor();
        }
        /*-----------------------------------------------------------*/

        ReadParking();
        ReadSensor();
        setlanguage();

        $('#btnClose').on('click', function (e) {
            $.module.load('Impianti/Operators/ManageParking');
        });

        function ReadParking() {
            var req = $.DataAccess.Parking_Read(localStorage.getItem("IdImpianto"), localStorage.getItem("IdPark"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#ParkDescr").text(data.DesPark);
                }
            });
        }

        function ReadSensor() {
            var req = $.DataAccess.Parking_Sensor_ReadByNodeId(localStorage.getItem("NodeId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#NodeId").text(data.NodeId);                    
                    $('#voltage').text(parseFloat(data.voltage) / 1000);
                    $('#estbattlife').text(parseFloat(data.estBatteryLifeInYear).toFixed(1));
                    $("#temp").text(data.temp + ' C°');
                    $("#LastUpdate").text(moment(data.nodeTS).format('DD/MM/YYYY HH:mm'));
                    if (data.status == 0) {
                        $("#Status").attr('caption', 'sensorstatus0');
                        $("#Status").text(langResources['sensorstatus0']);
                    }
                    else {
                        if (data.status == 1) {
                            $("#Status").attr('caption', 'sensorstatus1');
                            $("#Status").text(langResources['sensorstatus1']);
                        }
                        else {
                            $("#Status").attr('caption', 'sensorstatus2');
                            $("#Status").text(langResources['sensorstatus2']);
                        } //data.status == 1
                    } //data.status == 0

                    var r = $.DataAccess.Parking_Stall_ReadByNodeId(localStorage.getItem("NodeId"));
                    r.success(function (json) {
                        var data = json.d;
                        if (data) {
                            $("#IdStall").text(data.IdStall);
                            if (data.Occupied) {
                                $("#occupied").attr('caption','yes');
                                $("#occupied").text(langResources['yes']);
                                $("#DtOccupied").text(moment(data.DtOccupied).format('DD/MM/YYYY HH:mm'));
                            }
                            else {
                                $("#occupied").attr('caption', 'no');
                                $("#occupied").text(langResources['no']);
                                $("#DtOccupied").text('');
                            } //occupied
                        }//data
                    });
                } //data
            });
        }
    });
});

/*
Impianti Operators Parking Mesh Netwotk
------------------------------------------*/
$(function () {
    $(document).ready(function () {
        var idx=-1;
        var nodes = [], sensors=[];
        var myColor, myShape, myLabel;

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

        var sys = arbor.ParticleSystem(1000, 1000, 0.5);
        sys.parameters({ gravity: true });
        sys.renderer = Renderer("#viewport");

        LoadMesh();



        //gateways[0] = sys.addNode('900033', { 'color': 'red', 'shape': 'dot', 'label': 'Gateway 1' });
        //repeaters[0] = sys.addNode('800475', { 'color': 'green', 'shape': 'dot', 'label': 'Repeater1' });
        //stalls[0] = sys.addNode('71409', { 'color': 'blue', 'shape': 'dot', 'label': 'Stallo 1' });
        //stalls[1] = sys.addNode('71302', { 'color': 'blue', 'shape': 'dot', 'label': 'Stallo 2' });
        //sys.addEdge(gateways[0], repeaters[0]);
        //sys.addEdge(gateways[0], stalls[0]);
        //sys.addEdge(gateways[0], stalls[1]);

        
        function LoadMesh() {
            var dataSensor;
            var r = $.DataAccess.Parking_Sensor_List();
            r.success(function (json) {
                dataSensor = json.d;
                if (dataSensor) {
                    for (var i = 0; i < dataSensor.length; i++) {
                        if (dataSensor[i].SensorType == 3 || dataSensor[i].SensorType == 4) {
                            myColor = 'blue';
                            myShape = 'rect'
                            myLabel =  dataSensor[i].NodeId.toString();

                            var reqStall = $.DataAccess.Parking_Stall_ReadByNodeId(dataSensor[i].NodeId);
                            reqStall.success(function (json) {
                                var data = json.d;
                                if (data) {
                                    myLabel += '\nStall:' + data.IdStall;
                                }
                                else {
                                    var reqSurvey = $.DataAccess.Parking_Survey_ReadByNodeId(dataSensor[i].NodeId);
                                    reqSurvey.success(function (json) {
                                        var data = json.d;
                                        myLabel += '\nwatch:' + data.IdSurvey;
                                    });                                    
                                }
                            });
                        }

                        if (dataSensor[i].SensorType == 1) {
                            myColor = 'green';
                            myShape = 'rect'
                            myLabel = 'Repeater\n' + dataSensor[i].NodeId;
                        }

                        if (dataSensor[i].SensorType == 2) {
                            myColor = 'red';
                            myShape = 'rect'
                            myLabel = 'Gateway\n' + dataSensor[i].NodeId;
                        }

                        sensors[i] = dataSensor[i].NodeId;
                        nodes[i] = sys.addNode(dataSensor[i].NodeId, { 'color': myColor, 'shape': myShape, 'label': myLabel });
                    }//end for

                    for (var i = 0; i < dataSensor.length; i++) {
                        if (dataSensor[i].parentID > 0) {
                            var x = jQuery.inArray(dataSensor[i].parentID, sensors);
                            sys.addEdge(nodes[i], nodes[x]);
                            //console.log(dataSensor[i].parentID + ' found at: ' + x);
                        }
                    }//end for
                }
            });
        }


        function AddStall(NodeId) {
            var r = $.DataAccess.Parking_Stall_ReadByNodeId(NodeId);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    var meshStall = sys.addNode(data.IdStall, { 'color': 'blue', 'shape': 'dot', 'label': data.IdStall });
                    readParent(data.NodeId);
                }
            });
        }

        function AddRepeater(NodeId) {
            var r = $.DataAccess.Parking_Repeater_ReadByNodeId(NodeId);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    var meshRepeater = sys.addNode(data.Descr, { 'color': 'green', 'shape': 'dot', 'label': data.Descr });
                    readParent(data.NodeId);
                }
            });
        }

        function AddGateway(NodeId) {
            var r = $.DataAccess.Parking_Gateway_ReadByNodeId(NodeId);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    var meshRepeater = sys.addNode(data.Descr, { 'color': 'red', 'shape': 'dot', 'label': data.Descr });
                    //readParent(data.NodeId);
                }
            });
        }

        function readParent(NodeId) {
            var r = $.DataAccess.Parking_Sensor_ReadByNodeId(NodeId);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    console.log('readParent: ' + NodeId + ' parent: ' + data.parentID);
                    if (data.parentID > 0) {
                        if (data.SensorType == 0) {
                            AddStall(data.NodeId);
                        }
                        if (data.SensorType == 1) {
                            AddRepeater(data.NodeId);
                        }
                        if (data.SensorType == 2) {
                            AddGateway(data.NodeId);
                        }
                    }
                }
            });
        }


        $('#viewport').mousedown(function (e) {
            var pos = $(this).offset();
            var p = { x: e.pageX - pos.left, y: e.pageY - pos.top }
            //selected = nearest = dragged = ParticleSystem.nearest(p);
            selected = sys.nearest(p);

            if (selected.node !== null) {
                console.log(selected.node);
            }
            return false;
        });

    });
});
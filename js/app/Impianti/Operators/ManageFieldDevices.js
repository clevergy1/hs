/*
Impianti Operators Manage field devices
------------------------------------------*/
$(function () {
    var $available = [];
    var $assigned = [];

    $(document).ready(function () {
        LoadAssigned();
        setlanguage();

        $('#btnCloseEdit').on('click', function (e) {
            $.module.load('Impianti/Operators/Detail');
        });
    });

    function LoadAssigned() {
        var reqAssigned = $.DataAccess.Impianti_FieldDevices_List(localStorage.getItem("IdImpianto"));
        reqAssigned.success(function (json) {
            var dataAssigned = json.d;
            $assigned = [];
            if (dataAssigned) {
                $assigned = dataAssigned;
            }                
            showAssigned();
            LoadAvailable();
        });
    }
    function showAssigned() {
        $('#assigneddevicesList').empty();
        $("#tmplassigneddevicesList").tmpl($assigned).appendTo("#assigneddevicesList");
        setlanguage();
    }

    function LoadAvailable() {
        var req = $.DataAccess.tbFieldDevices_List();
        req.success(function (json) {
            var data = json.d;
            if (data) {
                
                if ($assigned.length > 0) {                   
                    $available = [];
                    for (var i = 0; i < data.length; i++) {
                        var available = true;
                        for (var ii = 0; ii < $assigned.length; ii++) {
                            if (data[i].DevId == $assigned[ii].DevId) {
                                available = false;
                            }
                        }
                        if (available == true) {
                            $available.push(data[i]);
                        }
                    }

                }
                else {
                    $available = data;
                }

                showAvailabled();
            } //data
        });
    }
    function showAvailabled() {
        $('#availabledevicesList').empty();
        $("#tmplavailabledevicesList").tmpl($available).appendTo("#availabledevicesList");
        setlanguage();
    }

    $.fn.selectDev = function (DevId) {
        var req = $.DataAccess.Impianti_FieldDevices_Add(localStorage.getItem("IdImpianto"), DevId);
        req.success(function (json) {
            var data = json.d;
            if (data = true) {
                LoadAssigned();
                LoadAvailable();
            }
        });
    }

    $.fn.deselectDev = function (DevId) {
        var req = $.DataAccess.Impianti_FieldDevices_Del(localStorage.getItem("IdImpianto"), DevId);
        req.success(function (json) {
            var data = json.d;
            if (data = true) {
                LoadAssigned();
                LoadAvailable();
            }
        });
    }
});

function selectDev(DevId) {
    $.fn.selectDev(DevId);
}
function deselectDev(DevId) {
    $.fn.deselectDev(DevId);
}
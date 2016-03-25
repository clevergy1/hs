/*
Impianti Operators Assign sensor to stall
------------------------------------------*/
$(function () {
    $(document).ready(function () {
        ReadParking();
        ReadSensor();
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

        function ReadSensor() {
            var req = $.DataAccess.Parking_Sensor_ReadByNodeId(localStorage.getItem("NodeId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#NodeId").val(data.NodeId);
                    $("#IdStall").val(data.IdStall);
                    $('#IdSensor').val(data.IdSensor);
                }
            });
        }

        function LoadStalls() {
            $("#StallsList").empty();
            var req = $.DataAccess.Parking_Stall_ListNotAssigned(localStorage.getItem("IdImpianto"), localStorage.getItem("IdPark"), false);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplStallsList").tmpl(data).appendTo("#StallsList");
                    $("#StallsList").niceScroll({
                        cursorcolor: "#1FB5AD",
                        cursorborder: "0px solid #fff",
                        cursorborderradius: "0px",
                        cursorwidth: "3px"
                    });
                }
            });
        }

        $('#btnClose').on('click', function (e) {
            $.module.load('Impianti/Operators/ManageParking');
        });

        $('#IdStall').on('focus', function (e) {
            LoadStalls();
            $("#ModalStalls").modal('show');
        });

        $.fn.selStall = function (IdStall) {           
            $('#IdStall').val(IdStall);
            $("#ModalStalls").modal('hide');
        }

        $('#btnUpd').on('click', function (e) {
            var IdStall = $('#IdStall').val().trim(),
                IdSensor = $('#IdSensor').val().trim();

            if (checkUpd(IdStall, IdSensor) == false) {
                var req = $.DataAccess.Parking_Stall_setSensor(localStorage.getItem("IdImpianto"), localStorage.getItem("IdPark"), IdStall, IdSensor);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        $.module.load('Impianti/Operators/ManageParking');
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

        function checkUpd(IdStall, IdSensor) {
            var retVal = false;
            var error_present = false;
            if (!error_present) {
                if (IdStall == '') {
                    $('#IdStall').addClass("error");
                    error_present = true;
                }
            }
            if (!error_present) {
                if (IdSensor == '') {
                    $('#IdStall').addClass("error");
                    error_present = true;
                }
            }
            retVal = error_present;
            return retVal;
        }

    });
});
function selStall(IdStall) {
    $.fn.selStall(IdStall);
}

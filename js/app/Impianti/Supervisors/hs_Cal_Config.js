/*
Impianti Operators Config Heating System Boiler 
------------------------------------------*/
$(function () {
    $('.isNumeric').autoNumeric('init');
    $('#TempoOn').autoNumeric('set', '0');
    $('#TempoOff').autoNumeric('set', '0');

    $(document).ready(function () {
        var $elementCode;
        $("#pageOperation").empty();

        Readhs();
        requestCalDelay();
        setlanguage();

        function Readhs() {
            var req = $.DataAccess.HeatingSystem_Read(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#hsDescr").text(data.Descr);
                }
            });
        }

        function ReadCal() {
            var req = $.DataAccess.hs_Cal_Read(localStorage.getItem("IdCal"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $elementCode = data.CalCod;
                    $("#CalDescr").text(data.CalDescr);
                    $('#TempoOn').autoNumeric('set', data.TempoOn);
                    $('#TempoOff').autoNumeric('set', data.TempoOff);
                
                }
            });
        }


        /*
        parameters
        -----------------------------------------------------------------*/
        function requestCalDelay() {
            var r = $.DataAccess.hs_Cal_getDelayOnOff(localStorage.getItem("IdCal"));
            r.success(function (json) {
                ReadCal();
            });
        }

        $('#btnUpd').on('click', function () {
            var TempoOn = $('#TempoOn').autoNumeric('get'),
                TempoOff = $('#TempoOff').autoNumeric('get');
            var req1 = $.DataAccess.hs_Cal_setDelayOnOff(localStorage.getItem("IdCal"), TempoOn, TempoOff)
            req1.success(function (json) {
                var data = json.d;
                if (data == true) {
                    toastr["success"](langResources['msg4operationok'], langResources['yes']);
                }
                else {
                    toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                }
            });
        });
        /*---------------------------------------------------------------*/

    }); //document ready

});

/*
Probes 
-----------------------------------------------------------------*/
function seleAvailProbe(ProbeCod) {
    $.fnseleAvailProbe(ProbeCod);
}
function selassignedProbe(id) {
    $.selassignedProbe(id);
}
/*---------------------------------------------------------------*/



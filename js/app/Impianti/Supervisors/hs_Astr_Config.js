$(function () {
    $('.isNumeric').autoNumeric('init');
    $(document).ready(function () {
        setTimeout(function () { $("body").addClass("loading"); }, 10);

        var $elementCode;
        $("#pageOperation").empty();

        Readhs();
        requestParam();

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

        function ReadAstr() {
            var req = $.DataAccess.hs_Astr_Read(localStorage.getItem("AstrId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $elementCode = data.Cod;
                    $("#Desc").text(data.Descr);
                    $('#morningTwilight').autoNumeric('set', data.morningTwilight);
                    $('#eveningTwilight').autoNumeric('set', data.eveningTwilight);
                    $('#preSunrise').autoNumeric('set', data.preSunrise);
                    $('#postSunrise').autoNumeric('set', data.postSunrise);
                    $('#preSunset').autoNumeric('set', data.preSunset);
                    $('#postSunset').autoNumeric('set', data.postSunset);
                    $("body").removeClass("loading");
                }
            });
        }

        /*
        backup working mode
        -----------------------------------------------------------------*/
        function requestParam() {
            $('#morningTwilight').autoNumeric('set', 0);
            $('#eveningTwilight').autoNumeric('set', 0);
            $('#preSunrise').autoNumeric('set', 0);
            $('#postSunrise').autoNumeric('set', 0);
            $('#preSunset').autoNumeric('set', 0);
            $('#postSunset').autoNumeric('set', 0);
            var r = $.DataAccess.hs_Astr_getParam(localStorage.getItem("AstrId"));
            r.success(function (json) {
                ReadAstr();
            });
        }

        $('#btnUpd').on('click', function () {
            var morningTwilight = $('#morningTwilight').autoNumeric('get'),
                eveningTwilight = $('#eveningTwilight').autoNumeric('get'),
                preSunrise = $('#preSunrise').autoNumeric('get'),
                postSunrise = $('#postSunrise').autoNumeric('get'),
                preSunset = $('#preSunset').autoNumeric('get'),
                postSunset = $('#postSunset').autoNumeric('get');

            var req1 = $.DataAccess.hs_Astr_setParam(localStorage.getItem("AstrId"), preSunrise, postSunrise, preSunset, postSunset, eveningTwilight, morningTwilight)
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

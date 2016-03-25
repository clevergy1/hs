/*
Impianti Operators Master Devices
------------------------------------------*/
$(function () {
    $(document).ready(function () {
        $('#ApplicationTitle').html('&nbsp;');
        $("#pageOperation").empty();
        loadNavigationBar();
        readImpianto();
        loadFielDevices();
        
        function loadFielDevices() {
            var req = $.DataAccess.Impianti_FieldDevices_List(localStorage.getItem("IdImpianto"));
            req.success(function (json) {
                if (data) {
                    if (data.length == 1) {
                        var module = "Impianti/Supervisors/ManageDevice" + data[0].DevId.toString();
                        $.module.load(module);

                    }
                    else {
                        $("#tmplFieldDevicesList").tmpl(data).appendTo("#FieldDevicesList");
                        setlanguage();
                    }
                }
            });
        }

        function loadNavigationBar() {
            //tmplNavigationbar
            $('#usermenu').empty();
            $("#tmplNavigationbar").tmpl([{ foo: "" }]).appendTo("#usermenu");
            setlanguage();
        }

        function readImpianto() {
            var req = $.DataAccess.Impianti_Read(localStorage.getItem("IdImpianto"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#ApplicationTitle').text( data.DesImpianto);
                }
            });
        }

        $.fn.selectDevice = function (DevId) {
            var module = "Impianti/Operators/ManageDevice" + DevId.toString();
            $.module.load(module);
            //$.rt.load();
        }
    });//document ready



});

function selectDevice(DevId) {
    $.fn.selectDevice(DevId);
}
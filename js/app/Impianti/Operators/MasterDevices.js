/*
Impianti Operators Master Devices
------------------------------------------*/
$(function () {
    $(document).ready(function () {
        loadFielDevices();
    });//document ready

    function loadFielDevices() {
        var req = $.DataAccess.Impianti_FieldDevices_List(localStorage.getItem("IdImpianto"));
        req.success(function (json) {
            if (data) {
                if (data.length == 1) {
                    var url = $.appParms.urlserver() + data[0].uri;
                    $(location).attr('href', url);

                    //var module = "Impianti/Operators/ManageDevice" + data[0].DevId.toString();
                    //$.module.load(module);
                    
                }
                else {
                    $("#tmplFieldDevicesList").tmpl(data).appendTo("#FieldDevicesList");
                    setlanguage();
                }
            }
        });
    }

    $.fn.selectDevice = function (uri) {
        var url = $.appParms.urlserver() + uri;
        $(location).attr('href', url);
        ////var module = "Impianti/Operators/ManageDevice" + DevId.toString();
        ////$.module.load(module);
        //$.rt.load();
    }

});

function selectDevice(uri) {
    $.fn.selectDevice(uri);
}
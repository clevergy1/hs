
$(function () {

    $(document).ready(function () {      

        $("#pageOperation").empty();        
        $('#Id_Add').val(0);
        $('#Descr_Add').val('');

        Readhs();
        setlanguage();

        function Readhs() {
            var req = $.DataAccess.HeatingSystem_Read(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#hsDescr").text(data.DesImpianto + ' ' + data.Descr);
                }
            });
        }

        $('#btnAdd').on('click', function (e) {
            var scaId = localStorage.getItem('scaId'),
                Id = $('#Id_Add').val().trim(),
                descr = $('#Descr_Add').val().trim(),
                IsAlarm = $('#IsAlarm').bootstrapSwitch('state'),
                UserName = localStorage.getItem("OperatorName");

            if (chkAdd(scaId, Id, descr) == true) {
                var req = $.DataAccess.hs_Sca_detail_Add(scaId, Id, descr, false, IsAlarm);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        $.module.load('Impianti/Operators/Device8sca');
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }
        }); //btnAdd


        function chkAdd(scaId, Id, descr) {
            var retVal = false;
            var error_present = false;

            if (!error_present) {
                if (descr == '') {
                    error_present = true;
                    toastr["warning"](langResources['msg4descr'], langResources['alert']);
                }
            }

            if (!error_present) {
                var req = $.DataAccess.hs_Sca_detail_Read(scaId, Id);
                req.success(function (json) {
                    var data = json.d;
                    if (data) {
                        toastr["warning"](langResources['msg4codepresent'], langResources['alert']);
                    }
                });
            }

            retVal = !error_present;
            return retVal;
        } //chkAdd

    }); //documen ready

});
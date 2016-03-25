
$(function () {

    $(document).ready(function () {
        $("#pageOperation").empty();
        $('#Id_Upd').val(0);
        $('#Descr_Upd').val('');

        Readhs();
        Readsca();

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

        function Readsca() {
            var req = $.DataAccess.hs_Sca_detail_Read(localStorage.getItem("scaId"),localStorage.getItem("Id"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#Id_Upd').val(data.Cod);
                    $("#Descr_Upd").val(data.descr);
                    $("#Descr_Delete").text(data.descr);
                    $('#IsAlarm').bootstrapSwitch('state', data.isAlarm, data.isAlarm);                    
                }
            });
        }

        $('#btnUpd').on('click', function (e) {
            var scaId = localStorage.getItem('scaId'),
                Id = localStorage.getItem("Id"),
                IsAlarm = $('#IsAlarm').bootstrapSwitch('state'),
                descr = $('#Descr_Upd').val();
                

            if (chkUpd(scaId, Id, descr) == true) {
                var req = $.DataAccess.hs_Sca_detail_Update(scaId, Id, descr, false, IsAlarm);
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

        });

        function chkUpd(scaId, Id, descr) {
            var retVal = false;
            var error_present = false;

            if (!error_present) {
                if (descr == '') {
                    error_present = true;
                    toastr["warning"](langResources['msg4descr'], langResources['alert']);
                }
            }

            retVal = !error_present;
            return retVal;
        } //chkAdd

        $('#btnDelete').on('click', function (e) {
            $('body').removeClass('modal-open');
            $("#DeleteModal").modal('hide');

            setTimeout(function () {
                var req = $.DataAccess.hs_Sca_header_Del(localStorage.getItem("Id"));
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        localStorage.removeItem("Id");
                        $.module.load('Impianti/Operators/Device8sca');
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }, 300);
        });

    }); //document ready

});
/*
Impianti Operators Manage Heating System SDIN Electric power meter Update
------------------------------------------*/
$(function () {

    $(document).ready(function () {
        $("#pageOperation").empty();
        $('#Cod_Upd').val('');
        $('#sn_Upd').val('');
        $('#Descr_Upd').val('');

        Readhs();
        ReadAnz();

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

        function ReadAnz() {
            var req = $.DataAccess.W0077_Read(localStorage.getItem("W0077Id"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#Cod_Upd').val(data.Cod);
                    $("#Descr_Upd").val(data.Descr);                    
                    $("#Descr_Delete").text(data.Descr);
                }
            });
        }

        $('#btnUpd').on('click', function (e) {
            var hsId = localStorage.getItem('hsId'),
                Id = localStorage.getItem("W0077Id"),
                Cod = $('#Cod_Upd').val().trim(),
                Descr = $('#Descr_Upd').val().trim(),
                UserName = localStorage.getItem("OperatorName");

            if (chkUpd(hsId, Id, Cod, Descr) == true) {
                var req = $.DataAccess.W0077_Update(Id, Cod, Descr,  UserName);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        $.module.load('Impianti/Operators/Device8W0077');
                        loadhs_Elem(); //posta in common.js
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }

        });

        function chkUpd(hsId, Id, Cod, Descr) {
            var retVal = false;
            var error_present = false;

            if (!error_present) {
                if (Descr == '') {
                    error_present = true;
                    toastr["warning"](langResources['msg4descr'], langResources['alert']);
                }
            }

            if (!error_present) {
                var req = $.DataAccess.W0077_ReadByCod(hsId, Cod);
                req.success(function (json) {
                    var data = json.d;
                    if (data) {
                        if (data.Id != Id) {
                            error_present = true;
                            toastr["warning"](langResources['msg4codepresent'], langResources['alert']);
                        }
                    }
                });
            }

            retVal = !error_present;
            return retVal;
        } //chkAdd

        $('#btnDelete').on('click', function (e) {
            $('body').removeClass('modal-open');
            $("#DeleteModal").modal('hide');

            setTimeout(function () {
                var req = $.DataAccess.W0077_Del(localStorage.getItem("W0077Id"));
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        localStorage.removeItem("W0077Id");
                        $.module.load('Impianti/Operators/Device8W0077');
                        loadhs_Elem(); //posta in common.js
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }, 300);
        });


    }); //document ready

});


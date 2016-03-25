
$(function () {

    $(document).ready(function () {
        $("#pageOperation").empty();
        $('#Cod_Add').val('');
        $('#sn_Add').val('');
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
            var hsId = localStorage.getItem('hsId'),
                Cod = $('#Cod_Add').val().trim(),
                Descr = $('#Descr_Add').val().trim(),
                UserName = localStorage.getItem("OperatorName");

            if (chkAdd(hsId, Cod, Descr) == true) {
                var req = $.DataAccess.W0077_Add(hsId, Cod, Descr, UserName);
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
        }); //btnAdd


        function chkAdd(hsId, Cod, Descr) {
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
                        if (data.Cod == Cod) {
                            error_present = true;
                            toastr["warning"](langResources['msg4codepresent'], langResources['alert']);
                        }
                    }
                });
            }


            retVal = !error_present;
            return retVal;
        } //chkAdd
    }); //document ready

});
/*
Impianti Operators Manage Heating System Controller Update
------------------------------------------*/
$(function () {
    $(document).ready(function () {
        $("#pageOperation").empty();
        $('#Descr_Upd').val('');
        $('#NoteInterne_Upd').val('');

        Readhs();
        ReadController();
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

        function ReadController() {
            var req = $.DataAccess.hs_Controller_Read(localStorage.getItem("ControllerId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#Descr_Upd").val(data.ControllerDescr);
                    $("#NoteInterne_Upd").val(data.NoteInterne);
                }
            });
        }

        $('#btnUpd').on('click', function (e) {
            var Descr = $('#Descr_Upd').val().trim(),
                NoteInterne = $('#NoteInterne_Upd').val().trim();

            if (chkUpd(Descr) == true) {
                var req = $.DataAccess.hs_Controller_Update(localStorage.getItem('ControllerId'), Descr, NoteInterne, localStorage.getItem("OperatorName"));
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        $.module.load('Impianti/Operators/Device8Controller');
                        loadhs_Elem(); //posta in common.js
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }
        });

        function chkUpd(Descr) {
            var retVal = false;
            var error_present = false;

            if (!error_present) {
                if (Descr == '') {
                    error_present = true;
                    toastr["warning"](langResources['msg4descr'], langResources['alert']);
                }
            }
            retVal = !error_present;
            return retVal;
        } //chkAdd

    }); //document ready
});
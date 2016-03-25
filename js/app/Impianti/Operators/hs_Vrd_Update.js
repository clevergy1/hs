/*
Impianti Operators Manage Heating System servomotor Update
------------------------------------------*/
$(function () {

    $(document).ready(function () {
        $("#pageOperation").empty();
        $('#VrdCod_Upd').val('');
        $('#Descr_Upd').val('');
        $('#NoteInterne_Upd').val('');
        $('#marcamodello_Upd').val('');
        $('#installationDate_Upd').val('');

        $('.dpd1').datepicker({
            format: 'dd/mm/yyyy',
            language: localStorage.getItem("CurrentLanguage"),
            orientation: "top left"
        });

        Readhs();
        ReadVrd();
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

        function ReadVrd() {
            var req = $.DataAccess.hs_Vrd_Read(localStorage.getItem("VrdId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#VrdCod_Upd').val(data.VrdCod);
                    $("#Descr_Upd").val(data.VrdDesc);
                    $("#Descr_Delete").text(data.VrdDesc);
                    $("#NoteInterne_Upd").val(data.NoteInterne);
                    $('#marcamodello_Upd').val(data.marcamodello);
                    if (moment(data.installationDate).year() > 1900) {
                        $('#installationDate_Upd').val(moment(data.installationDate).format('DD/MM/YYYY'));
                    }
                    else {
                        $('#installationDate_Upd').val('');
                    }
                }
            });
        }

        $('#btnUpd').on('click', function (e) {
            var hsId = localStorage.getItem('hsId'),
                VrdId = localStorage.getItem("VrdId"),
                VrdCod = $('#VrdCod_Upd').val(),
                VrdDesc = $('#Descr_Upd').val(),
                NoteInterne = $('#NoteInterne_Upd').val(),
                marcamodello = $('#marcamodello_Upd').val().trim(),
                installationDate = $('#installationDate_Upd').val(),
                UserName = localStorage.getItem("OperatorName");

            if (chkUpd(hsId, VrdId, VrdCod, VrdDesc) == true) {
                var req = $.DataAccess.hs_Vrd_Update(VrdId, VrdCod, VrdDesc, NoteInterne, UserName, marcamodello, installationDate);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        $.module.load('Impianti/Operators/Device8Vrd');
                        loadhs_Elem(); //posta in common.js
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }

        });

        function chkUpd(hsId, VrdId, VrdCod, VrdDesc) {
            var retVal = false;
            var error_present = false;

            if (!error_present) {
                if (VrdDesc == '') {
                    error_present = true;
                    toastr["warning"](langResources['msg4descr'], langResources['alert']);
                }
            }

            if (!error_present) {
                var req = $.DataAccess.hs_Vrd_ReadByVrdCodSync(hsId, VrdCod);
                req.success(function (json) {
                    var data = json.d;
                    if (data) {
                        if (data.VrdId != VrdId) {
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
                var req = $.DataAccess.hs_Vrd_Del(localStorage.getItem("VrdId"));
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        localStorage.removeItem("VrdId");
                        $.module.load('Impianti/Operators/Device8Vrd');
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
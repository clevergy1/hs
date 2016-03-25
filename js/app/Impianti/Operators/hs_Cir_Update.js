/*
Impianti Operators Manage Heating System circulator Update
------------------------------------------*/
$(function () {

    $(document).ready(function () {
        $("#pageOperation").empty();
        $('#CirCod_Upd').val('');
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
        ReadCir();
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

        function ReadCir() {
            var req = $.DataAccess.hs_Cir_Read(localStorage.getItem("CirId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#CirCod_Upd').val(data.CirCod);
                    $("#Descr_Upd").val(data.CirDescr);
                    $("#Descr_Delete").text(data.CirDescr);                    
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
                CirId = localStorage.getItem("CirId"),
                CirCod = $('#CirCod_Upd').val(),
                CirDescr = $('#Descr_Upd').val(),
                NoteInterne = $('#NoteInterne_Upd').val(),
                marcamodello = $('#marcamodello_Upd').val().trim(),
                installationDate = $('#installationDate_Upd').val(),
                UserName = localStorage.getItem("OperatorName");

            if (chkUpd(hsId, CirId, CirCod, CirDescr) == true) {
                var req = $.DataAccess.hs_Cir_Update(CirId, CirCod, CirDescr, NoteInterne, UserName, marcamodello, installationDate);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        $.module.load('Impianti/Operators/Device8Cir');
                        loadhs_Elem(); //posta in common.js
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }

        });

        function chkUpd(hsId, CirId, CirCod, CirDescr) {
            var retVal = false;
            var error_present = false;

            if (!error_present) {
                if (CirDescr == '') {
                    error_present = true;
                    toastr["warning"](langResources['msg4descr'], langResources['alert']);
                }
            }

            if (!error_present) {
                var req = $.DataAccess.hs_Cir_ReadByCirCodSync(hsId, CirCod);
                req.success(function (json) {
                    var data = json.d;
                    if (data) {
                        if (data.CirId != CirId) {
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
                var req = $.DataAccess.hs_Cir_Del(localStorage.getItem("CirId"));
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        localStorage.removeItem("CirId");
                        $.module.load('Impianti/Operators/Device8Cir');
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
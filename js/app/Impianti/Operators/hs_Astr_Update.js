$(function () {

    $(document).ready(function () {
        $("#pageOperation").empty();
        $('#Cod_Upd').val('');
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
        ReadAstr();
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
                    $('#Cod_Upd').val(data.Cod);
                    $("#Descr_Upd").val(data.Descr);
                    $("#Descr_Delete").text(data.Descr);
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
                AstrId = localStorage.getItem("AstrId"),
                Cod = $('#Cod_Upd').val(),
                Descr = $('#Descr_Upd').val(),
                NoteInterne = $('#NoteInterne_Upd').val(),
                marcamodello = $('#marcamodello_Upd').val().trim(),
                installationDate = $('#installationDate_Upd').val(),
                UserName = localStorage.getItem("OperatorName");

            if (chkUpd(hsId, AstrId, Cod, Descr) == true) {
                var req = $.DataAccess.hs_Astr_Update(AstrId, Cod, Descr, marcamodello, installationDate, NoteInterne, UserName);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        $.module.load('Impianti/Operators/Device8Astr');
                        loadhs_Elem(); //posta in common.js
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }

        });

        function chkUpd(hsId, AstrId, Cod, Descr) {
            var retVal = false;
            var error_present = false;

            if (!error_present) {
                if (Descr == '') {
                    error_present = true;
                    toastr["warning"](langResources['msg4descr'], langResources['alert']);
                }
            }

            if (!error_present) {
                var req = $.DataAccess.hs_Astr_ReadByCod_Sync(hsId, Cod);
                req.success(function (json) {
                    var data = json.d;
                    if (data) {
                        if (data.Id != AstrId) {
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
                var req = $.DataAccess.hs_Cron_Del(localStorage.getItem("AstrId"));
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        localStorage.removeItem("CronId");
                        $.module.load('Impianti/Operators/Device8Astr');
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
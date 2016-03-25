/*
Impianti Supervisors address book update
------------------------------------------*/
$(function () {

    $(document).ready(function () {
        $("#pageOperation").empty();
        ReadImpianto();
        ReadContatto();
        setlanguage();

        function ReadImpianto() {
            var req = $.DataAccess.Impianti_Read(localStorage.getItem("IdImpianto"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#DesImpianto").text(data.DesImpianto);
                }
            });
        }

        function ReadContatto() {           
            $('#Descr_Upd').val('');
            $('#Indirizzo_Upd').val('');
            $('#Nome_Upd').val('');
            $('#Tel_Upd').val('');
            $('#Mobile_Upd').val('');
            $('#email_Upd').val('');

            var req = $.DataAccess.Impianti_Contatti_Read(localStorage.getItem("IdContatto"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#Descr_Upd").val(data.Descrizione);
                    $("#Descr_Delete").text(data.Descrizione);
                    $("#Indirizzo_Upd").val(data.Indirizzo);
                    $("#Nome_Upd").val(data.Nome);
                    $("#Tel_Upd").val(data.telFisso);
                    $("#Mobile_Upd").val(data.telMobile);
                    $("#email_Upd").val(data.emailaddress);
                }
            });
        }

        $('#btnUpdate').on('click', function (e) {
            var Descrizione = $('#Descr_Upd').val().trim(),
                Indirizzo = $('#Indirizzo_Upd').val().trim(),
                Nome = $('#Nome_Upd').val().trim(),
                TelFisso = $('#Tel_Upd').val().trim(),
                TelMobile = $('#Mobile_Upd').val().trim(),
                emailaddress = $('#email_Upd').val().trim();

            if (chkUpd(Descrizione, emailaddress) == true) {
                var req = $.DataAccess.Impianti_Contatti_Update(localStorage.getItem("IdContatto"), Descrizione, Indirizzo, Nome, TelFisso, TelMobile, emailaddress);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        $.module.load('Impianti/Operators/Detail');
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }
        });

        $('#btnDelete').on('click', function (e) {
            $('body').removeClass('modal-open');
            $("#DeleteModal").modal('hide');

            setTimeout(function () {
                var req = $.DataAccess.Impianti_Contatti_Del(localStorage.getItem("IdContatto"));
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        localStorage.removeItem("IdContatto");
                        $.module.load('Impianti/Operators/Detail');
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }, 300);
        });


        function chkUpd(Descrizione, emailaddress) {
            var retVal = false;
            var error_present = false;

            if (!error_present) {
                if (Descrizione == '') {
                    error_present = true;
                    toastr["warning"](langResources['msg4descr'], langResources['alert']);
                }
            }

            if (!error_present) {
                if (emailaddress != '') {
                    if (checkEmail(emailaddress) == false) {
                        error_present = true;
                        toastr["warning"](langResources['msg4notvalidemail'], langResources['alert']);
                    }
                }
            }

            retVal = !error_present;
            return retVal;
        } //chkAdd

        function checkEmail(email) {
            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!filter.test(email)) {
                return false;
            }
        }

    }); //document ready

});
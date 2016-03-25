/*
Impianti Supervisors address book add
------------------------------------------*/
$(function () {

    $(document).ready(function () {
        $("#pageOperation").empty();
        $('#Descr_Add').val('');
        $('#Indirizzo_Add').val('');
        $('#Nome_Add').val('');
        $('#Tel_Add').val('');
        $('#Mobile_Add').val('');
        $('#email_Add').val('');

        ReadImpianto();
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

        $('#btnAdd').on('click', function (e) {
            var Descrizione = $('#Descr_Add').val().trim(),
                Indirizzo = $('#Indirizzo_Add').val().trim(),
                Nome = $('#Nome_Add').val().trim(),
                TelFisso = $('#Tel_Add').val().trim(),
                TelMobile = $('#Mobile_Add').val().trim(),
                emailaddress = $('#email_Add').val().trim();

            if (chkAdd(Descrizione, emailaddress) == true) {
                var req = $.DataAccess.Impianti_Contatti_Add(localStorage.getItem("IdImpianto"), Descrizione, Indirizzo, Nome, TelFisso, TelMobile, emailaddress);
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


        function chkAdd(Descrizione, emailaddress) {
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
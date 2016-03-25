/*
Impianti Operators Manage Heating System Boiler Update
------------------------------------------*/
$(function () {

    $(document).ready(function () {
        $("#pageOperation").empty();
        $('#CalCod_Upd').val('');
        $('#Descr_Upd').val('');
        $('#NoteInterne_Upd').val('');
        $('#marcamodello').val('');
        $('#installationDate').val('');

        $('.dpd1').datepicker({
            format: 'dd/mm/yyyy',
            language: localStorage.getItem("CurrentLanguage"),
            orientation: "top left"
        });

        Readhs();
        ReadCal();

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

        function ReadCal() {
            var req = $.DataAccess.hs_Cal_Read(localStorage.getItem("IdCal"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#CalCod_Upd').val(data.CalCod);
                    $("#Descr_Upd").val(data.CalDescr);
                    $("#Descr_Delete").text(data.CalDescr);                    
                    $("#NoteInterne_Upd").val(data.NoteInterne);
                    $('#marcamodello').val(data.marcamodello);
                    if (moment(data.installationDate).year() > 1900) {
                        $('#installationDate').val(moment(data.installationDate).format('DD/MM/YYYY'));
                    }
                    else {
                        $('#installationDate').val('');
                    }

                    if (data.marcamodello.trim() == '') {
                        $("#marcamodello").removeAttr("readonly");
                        $("#installationDate").removeAttr("readonly");
                    }
                    else {
                        $("#marcamodello").attr("readonly", "true");
                        $("#installationDate").attr("readonly", "true");
                    }
                    loadReplacements();

                }
            });
        }

        $('#btnUpd').on('click', function (e) {
            var hsId = localStorage.getItem('hsId'),
                CalId = localStorage.getItem("IdCal"),
                CalCod = $('#CalCod_Upd').val(),
                CalDescr = $('#Descr_Upd').val(),
                NoteInterne = $('#NoteInterne_Upd').val(),
                marcamodello = $('#marcamodello_Upd').val().trim(),
                installationDate = $('#installationDate_Upd').val(),
                UserName = localStorage.getItem("SupervisorName");

            if (chkUpd(hsId,CalId, CalCod, CalDescr) == true) {
                var req = $.DataAccess.hs_Cal_Update(CalId, CalCod, CalDescr, NoteInterne, UserName, marcamodello, installationDate);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {                       
                        $.module.load('Impianti/supervisors/Device8Cal');
                       
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }

        });

        function chkUpd(hsId,CalId, CalCod, CalDescr) {
            var retVal = false;
            var error_present = false;

            if (!error_present) {
                if (CalDescr == '') {
                    error_present = true;
                    toastr["warning"](langResources['msg4descr'], langResources['alert']);
                }
            }

            if (!error_present) {
                var req = $.DataAccess.hs_Cal_ReadByCalCodSync(hsId, CalCod);
                req.success(function (json) {
                    var data = json.d;
                    if (data) {
                        if (data.CalId != CalId) {
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
                var req = $.DataAccess.hs_Cal_Del(localStorage.getItem("IdCal"));
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        localStorage.removeItem("IdCal");
                        $.module.load('Impianti/supervisors/Device8Cal');
                       
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }, 300);
        });


        /*
        replacements
        ---------------------------------------------------------------*/
        function loadReplacements() {
            $('#update').hide();
            $('#add').hide();
            $('#list').show();
            $("#replacementsList").empty();
            var r = $.DataAccess.hs_Cal_replacement_history_List(localStorage.getItem("IdCal"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    //$('.replacementPresent').hide();
                    $("#tmplreplacementsList").tmpl(data).appendTo("#replacementsList");
                    setlanguage();
                }
            });
        }

        /*Add replacements
          ----------------------------------------------------------------------*/
        $('#btncloseAdd').on('click', function () {
            $('#update').hide();
            $('#add').hide();
            $('#list').show();
        });

        $.fn.callAdd = function () {
            $('#marcamodello_Add').val('');
            $('#note_Add').val('');
            $('#installationDate_Add').val('');

            $('#list').hide();
            $('#update').hide();
            $('#add').show();
        }

        $('#btnAddReplacements').on('click', function () {
            var ParentId = localStorage.getItem('IdCal'),
                marcamodello = $('#marcamodello_Add').val().trim(),
                installationDate = $('#installationDate_Add').val(),
                note = $('#note_Add').val().trim(),
                userName = localStorage.getItem("SupervisorName");
            var req = $.DataAccess.hs_Cal_replacement_history_Add(ParentId, marcamodello, installationDate, note, userName);
            req.success(function (json) {
                var data = json.d;
                if (data == true) {
                    loadReplacements();
                }
                else {
                    toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                }
            });
        });
        /*--------------------------------------------------------------------*/

        /*Update replacements
        ----------------------------------------------------------------------*/
        $('#btnCloseUpd').on('click', function () {
            $('#update').hide();
            $('#add').hide();
            $('#list').show();
        });

        $.fn.CallEdit = function (Id) {
            $('#Id_Upd').val('');
            $('#marcamodello_Upd').val('');
            $('#note_Upd').val('');
            $('#installationDate_Upd').val('');

            $('#list').hide();
            $('#add').hide();
            $('#update').show();

            var req = $.DataAccess.hs_Cal_replacement_history_Read(Id);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#Id_Upd').val(data.Id);
                    $("#ReplacementsDescr_Delete").text(data.marcamodello);
                    $('#marcamodello_Upd').val(data.marcamodello);
                    if (moment(data.installationDate).year() > 1900) {
                        $('#installationDate_Upd').val(moment(data.installationDate).format('DD/MM/YYYY'));
                    }
                    else {
                        $('#installationDate_Upd').val('');
                    }
                    $('#note_Upd').val(data.note);
                }
            });
        }

        $('#btnUpdReplacements').on('click', function () {
            var Id = $('#Id_Upd').val(),
            marcamodello = $('#marcamodello_Upd').val(),
            installationDate = $('#installationDate_Upd').val(),
            note = $('#note_Upd').val(),
            userName = localStorage.getItem("SupervisorName");
            var req = $.DataAccess.hs_Cal_replacement_history_Update(Id, marcamodello, installationDate, note, userName);
            req.success(function (json) {
                var data = json.d;
                if (data == true) {
                    loadReplacements();
                }
                else {
                    toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                }
            });
        });
        /*--------------------------------------------------------------------*/

        /*Delete replacements
        ----------------------------------------------------------------------*/
        $('#btnDeleteReplacements').on('click', function () {
            var Id = $('#Id_Upd').val();
            var req = $.DataAccess.hs_Cal_replacement_history_Del(Id);
            req.success(function (json) {
                var data = json.d;
                if (data == true) {
                    loadReplacements();
                }
                else {
                    toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                }
            });
        });

        /*-------------------------------------------------------------*/



    }); //document ready

});

function seleAvailProbe(ProbeCod) {
    $.fnseleAvailProbe(ProbeCod);
}
function selassignedProbe(id) {
    $.selassignedProbe(id);
}
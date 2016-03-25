/*
Impianti Operators Manage Heating System SDIN Electric power meter Update
------------------------------------------*/
$(function () {

    $(document).ready(function () {
        $("#pageOperation").empty();
        $('#Cod_Upd').val('');
        $('#sn_Upd').val('');
        $('#Descr_Upd').val('');
        $('#marcamodello').val('');
        $('#NoteInterne_Upd').val('');
        $('#installationDate').val('');

        $('.dpd1').datepicker({
            format: 'dd/mm/yyyy',
            language: localStorage.getItem("CurrentLanguage"),
            orientation: "top left"
        });

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
            var req = $.DataAccess.cymt100_Read(localStorage.getItem("cymt100Id"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#Cod_Upd').val(data.Cod);
                    $("#Descr_Upd").val(data.Descr);                    
                    $("#Descr_Delete").text(data.Descr);
                    $("#NoteInterne_Upd").val(data.NoteInterne);
                    $('#sn_Upd').val(data.sn);
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
                Id = localStorage.getItem("cymt100Id"),
                Cod = $('#Cod_Upd').val().trim(),
                sn = $('#sn_Upd').val().trim(),
                Descr = $('#Descr_Upd').val().trim(),
                NoteInterne = $('#NoteInterne_Upd').val(),
                marcamodello = $('#marcamodello').val().trim(),
                installationDate = $('#installationDate').val(),
                UserName = localStorage.getItem("OperatorName");

            if (chkUpd(hsId, Id, Cod, sn, Descr) == true) {
                var req = $.DataAccess.cymt100_Update(Id, Cod, Descr, sn, UserName, marcamodello, installationDate, NoteInterne);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        $.module.load('Impianti/supervisors/Device8sdinAnz');
         
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }

        });

        function chkUpd(hsId, Id, Cod, sn, Descr) {
            var retVal = false;
            var error_present = false;

            if (!error_present) {
                if (Descr == '') {
                    error_present = true;
                    toastr["warning"](langResources['msg4descr'], langResources['alert']);
                }
            }

            if (!error_present) {
                var req = $.DataAccess.cymt100_ReadByCodSync(hsId, Cod);
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

            if (!error_present) {
                var req = $.DataAccess.cymt100_ReadBysn(hsId, sn);
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
                var req = $.DataAccess.cymt100_Del(localStorage.getItem("cymt100Id"));
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        localStorage.removeItem("cymt100Id");
                        $.module.load('Impianti/supervisors/Device8sdinAnz');
               
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
            var r = $.DataAccess.cymt100_replacement_history_List(localStorage.getItem("cymt100Id"));
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
            var ParentId = localStorage.getItem('cymt100Id'),
                marcamodello = $('#marcamodello_Add').val().trim(),
                installationDate = $('#installationDate_Add').val(),
                note = $('#note_Add').val().trim(),
                userName = localStorage.getItem("SupervisorName");
            var req = $.DataAccess.cymt100_replacement_history_Add(ParentId, marcamodello, installationDate, note, userName);
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

            var req = $.DataAccess.cymt100_replacement_history_Read(Id);
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

        $('#btnUpd').on('click', function () {
            var Id = $('#Id_Upd').val(),
            marcamodello = $('#marcamodello_Upd').val(),
            installationDate = $('#installationDate_Upd').val(),
            note = $('#note_Upd').val(),
            userName = localStorage.getItem("SupervisorName");
            var req = $.DataAccess.cymt100_replacement_history_Update(Id, marcamodello, installationDate, note, userName);
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
            var req = $.DataAccess.cymt100_replacement_history_Del(Id);
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
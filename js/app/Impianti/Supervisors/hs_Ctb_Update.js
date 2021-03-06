﻿

$(function () {

    $(document).ready(function () {
        $("#pageOperation").empty();
        $('#CtbCod_Upd').val('');
        $('#Descr_Upd').val('');
        $('#NoteInterne_Upd').val('');
        $('#marcamodello').val('');
        $('#installationDate').val('');

        Readhs();
        ReadCtb();
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

        function ReadCtb() {
            var req = $.DataAccess.hs_Ctb_Read(localStorage.getItem("CtbId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#CtbCod_Upd').val(data.CtbCod);
                    $("#Descr_Upd").val(data.CtbDesc);
                    $("#Descr_Delete").text(data.CtbDesc);
                    $("#NoteInterne_Upd").val(data.NoteInterne);
                    $('#marcamodello').val(data.marcamodello);
                    if (moment(data.installationDate).year() > 1900) {
                        $('#installationDate').val(moment(data.installationDate).format('DD/MM/YYYY'));
                    }
                    else {
                        $('#installationDate').val('');
                    }
                }
            });
        }

        $('#btnUpd').on('click', function (e) {
            var hsId = localStorage.getItem('hsId'),
                CtbId = localStorage.getItem("CtbId"),
                CtbCod = $('#CtbCod_Upd').val(),
                CtbDesc = $('#Descr_Upd').val(),
                NoteInterne = $('#NoteInterne_Upd').val(),
                marcamodello = $('#marcamodello').val().trim(),
                installationDate = $('#installationDate').val(),
                UserName = localStorage.getItem("SupervisorName");

            if (chkUpd(hsId, CtbId, CtbCod, CtbDesc) == true) {
                var req = $.DataAccess.hs_Ctb_Update(CtbId, CtbCod, CtbDesc, UserName, marcamodello, installationDate, NoteInterne);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        $.module.load('Impianti/supervisors/Device8Ctb');
                        
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }

        });

        function chkUpd(hsId, CtbId, CtbCod, CtbDesc) {
            var retVal = false;
            var error_present = false;

            if (!error_present) {
                if (CtbDesc == '') {
                    error_present = true;
                    toastr["warning"](langResources['msg4descr'], langResources['alert']);
                }
            }

            if (!error_present) {
                var req = $.DataAccess.hs_Ctb_ReadByCtbCodSync(hsId, CtbCod);
                req.success(function (json) {
                    var data = json.d;
                    if (data) {
                        if (data.CtbId != CtbId) {
                            error_present = true;
                            toastr["warning"](langResources['msg4codepresent'], langResources['alert']);
                        }
                    }
                });
            }

            retVal = !error_present;
            return retVal;
        } //chkAdd


        /*
        replacements
        ---------------------------------------------------------------*/
        function loadReplacements() {
            $('#update').hide();
            $('#add').hide();
            $('#list').show();
            $("#replacementsList").empty();
            var r = $.DataAccess.hs_Ctb_replacement_history_List(localStorage.getItem("CtbId"));
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
            var ParentId = localStorage.getItem('CtbId'),
                marcamodello = $('#marcamodello_Add').val().trim(),
                installationDate = $('#installationDate_Add').val(),
                note = $('#note_Add').val().trim(),
                userName = localStorage.getItem("SupervisorName");
            var req = $.DataAccess.hs_Ctb_replacement_history_Add(ParentId, marcamodello, installationDate, note, userName);
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

            var req = $.DataAccess.hs_Cirm_replacement_history_Read(Id);
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

        $('#btnUpdReplacement').on('click', function () {
            var Id = $('#Id_Upd').val(),
            marcamodello = $('#marcamodello_Upd').val(),
            installationDate = $('#installationDate_Upd').val(),
            note = $('#note_Upd').val(),
            userName = localStorage.getItem("SupervisorName");
            var req = $.DataAccess.hs_Ctb_replacement_history_Update(Id, marcamodello, installationDate, note, userName);
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
            var req = $.DataAccess.hs_Ctb_replacement_history_Del(Id);
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
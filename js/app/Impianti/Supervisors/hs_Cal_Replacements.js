﻿
$(function () {

    $(document).ready(function () {
        var $dataRepl = [];
        $('.dpd1').datepicker({
            format: 'dd/mm/yyyy',
            language: localStorage.getItem("CurrentLanguage"),
            orientation: "top left"
        });

        Readhs();
        ReadE();
        //loadReplacements();

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

        function ReadE() {
            var req = $.DataAccess.hs_Cal_Read(localStorage.getItem("ParentId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $(".Descr").text(data.CalDescr + ' (' + data.CalCod + ')' );
                                       
                    if (moment(data.installationDate).year() > 1900) {
                        $("#marcamodello").text(data.marcamodello);
                        $('#installationDate').text(moment(data.installationDate).format('DD/MM/YYYY'));
                        loadReplacements();
                    }
                    else {
                        //$('#installationDate').val('');
                        CallUpdparent();
                    }
                }
            });
        }

        function loadReplacements() {
            $('#updateParent').hide();
            $('#update').hide();
            $('#add').hide();
            $('#list').show();
            $("#replacementsList").empty();
            var r = $.DataAccess.hs_Cal_replacement_history_List(localStorage.getItem("ParentId"));
            r.success(function (json) {
                $dataRepl = json.d;
                if ($dataRepl) {
                    $("#tmplreplacementsList").tmpl($dataRepl).appendTo("#replacementsList");
                    setlanguage();
                }
            });
        }

        /*Add
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

        $('#btnAdd').on('click', function () {
            var ParentId = localStorage.getItem('ParentId'),
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

        /*Update
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

            if (Id == 0) {
                //lettura da record padre
            }
            else {
                //lettura da replacements
                var req = $.DataAccess.hs_Cal_replacement_history_Read(Id);
                req.success(function (json) {
                    var data = json.d;
                    if (data) {
                        $('#Id_Upd').val(data.Id);
                        $("#Descr_Delete").text(data.marcamodello);
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
            //Id_Upd
        }

        $('#btnUpd').on('click', function () {
            var Id=$('#Id_Upd').val(), 
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

        /*Delete
        ----------------------------------------------------------------------*/
        $('#btnDelete').on('click', function () {
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
        /*--------------------------------------------------------------------*/
        
        /*Update parent
        ----------------------------------------------------------------------*/
        function CallUpdparent() {
            $('#list').hide();
            $('#update').hide();
            $('#add').hide();

            //$('#parentRecord').hide();
            $('#marcamodello_UpdParent').val('');
            $('#installationDate_UpdParent').val('');

            $('#updateParent').show();

        }

        $('#btnCloseUpdParent').on('click', function () {
            $.module.load('Impianti/supervisors/Device8Cal');
        });

        $('#btnUpdParent').on('click', function () {            
            var marcamodello = $('#marcamodello_UpdParent').val(),
                installationDate = $('#installationDate_UpdParent').val(),
                userName = localStorage.getItem("SupervisorName");
            var req = $.DataAccess.hs_Cal_UpdateMarcamodello(localStorage.getItem("ParentId"), marcamodello, installationDate, userName);
            req.success(function (json) {
                var data = json.d;
                if (data == true) {
                    $('#parentRecord').show();
                    $("#marcamodello").text(marcamodello);
                    $('#installationDate').text(installationDate);
                    loadReplacements();
                }
                else {
                    toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                }
            });
        });
        /*--------------------------------------------------------------------*/
    }); //document ready

});
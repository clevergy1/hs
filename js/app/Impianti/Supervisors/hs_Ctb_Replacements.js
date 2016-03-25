
$(function () {

    $(document).ready(function () {

        $('.dpd1').datepicker({
            format: 'dd/mm/yyyy',
            language: localStorage.getItem("CurrentLanguage"),
            orientation: "top left"
        });

        Readhs();
        ReadE();
        loadReplacements();

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
            var req = $.DataAccess.hs_Ctb_Read(localStorage.getItem("ParentId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    //$(".Descr").text(data.CtbDesc);
                    $(".Descr").text(data.CtbDesc + ' (' + data.CtbCod + ')');

                    $("#marcamodello").text(data.marcamodello);
                    if (moment(data.installationDate).year() > 1900) {
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
            var r = $.DataAccess.hs_Ctb_replacement_history_List(localStorage.getItem("ParentId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplreplacementsList").tmpl(data).appendTo("#replacementsList");
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
                userName = localStorage.getItem("OperatorName");
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

            var req = $.DataAccess.hs_Ctb_replacement_history_Read(Id);
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
            //Id_Upd
        }

        $('#btnUpd').on('click', function () {
            var Id=$('#Id_Upd').val(), 
            marcamodello = $('#marcamodello_Upd').val(),
            installationDate = $('#installationDate_Upd').val(),
            note = $('#note_Upd').val(),
            userName = localStorage.getItem("OperatorName");
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

        /*Delete
        ----------------------------------------------------------------------*/
        $('#btnDelete').on('click', function () {
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
            $.module.load('Impianti/supervisors/Device8Ctb');
            //$('#updateParent').hide();
            //$('#update').hide();
            //$('#add').hide();
            //$('#list').show();
            //loadReplacements();
        });

        $('#btnUpdParent').on('click', function () {
            var marcamodello = $('#marcamodello_UpdParent').val(),
                installationDate = $('#installationDate_UpdParent').val(),
                userName = localStorage.getItem("SupervisorName");
            var req = $.DataAccess.hs_Ctb_UpdateMarcamodello(localStorage.getItem("ParentId"), marcamodello, installationDate, userName);
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
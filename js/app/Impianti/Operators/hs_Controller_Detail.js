/*
Impianti Operators Manage Heating System Controller Detail
------------------------------------------*/
$(function () {

    $(document).ready(function () {

        Readhs();
        ReadController();

        $('.tableDetail').footable();
        $('.tableDetail').data('page-size', 10);
        $('.tableDetail').data('limit-navigation', 4);
        $('.tableDetail').trigger('footable_initialized');
        ListDetail();

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

        function ReadController() {
            var req = $.DataAccess.hs_Controller_Read(localStorage.getItem("hsId"), localStorage.getItem("ControllerId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $(".ControllerDescr").text(data.ControllerDescr);
                }
            });
        }

        /*
        List
        ----------------------------------------------------*/
        function ListDetail() {
            $("#ListDetail").empty();
            var r = $.DataAccess.hs_ControllerDetail_List(localStorage.getItem("ControllerId"));
            r.success(function (json) {
                var data = json.d;                
                if (data) {
                    $("#tmplListDetail").tmpl(data).appendTo("#ListDetail");
                    $('.tableDetail').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }
        /*--------------------------------------------------*/

        /*
        Add
        ----------------------------------------------------*/
        $('#btnCallAdd').on('click', function (e) {
            $('#rowList').hide();
            $('#rowEdit').hide();

            $('#Descr_Add').val('');
            $('#NoteInterne_Add').val('');
            $('#qta_Add').autoNumeric('set', 0);
            $('#rowAdd').show();
        });

        $('#btnCloseAdd').on('click', function (e) {
            $('#rowAdd').hide();
            $('#rowEdit').hide();
            $('#rowList').show();            
        });

        $('#btnAdd').on('click', function (e) {
            var Descr = $('#Descr_Add').val().trim(),
                NoteInterne = $('#NoteInterne_Add').val().trim(),
                qta = $('#qta_Add').autoNumeric('get');

            if (chkAdd(Descr,qta) == true) {
                var req = $.DataAccess.hs_ControllerDetail_Add(localStorage.getItem('ControllerId'), Descr, NoteInterne, qta, localStorage.getItem("OperatorName"));
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        $('#rowAdd').hide();
                        $('#rowEdit').hide();
                        $('#rowList').show();
                        ListDetail();
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }
        }); //btnAdd

        function chkAdd(Descr,qta) {
            var retVal = false;
            var error_present = false;

            if (!error_present) {
                if (Descr == '') {
                    error_present = true;
                    toastr["warning"](langResources['msg4descr'], langResources['alert']);
                }
            }
            if (!error_present) {
                if (qta == 0) {
                    error_present = true;
                    toastr["warning"](langResources['msg4qta'], langResources['alert']);
                }
            }


            retVal = !error_present;
            return retVal;
        } //chkAdd
        /*--------------------------------------------------*/

        /*
        Update
        ----------------------------------------------------*/
        $.fn.sel = function (id) {
            $('#id').val(id);
            $('#Descr_Upd').val('');
            $("#Descr_Delete").val('');
            $('#NoteInterne_Upd').val('');
            $('#qta_Upd').autoNumeric('set', 0);

            var req = $.DataAccess.hs_ControllerDetail_Read(id);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#Descr_Upd").val(data.Descr);                    
                    $("#Descr_Delete").text(data.Descr);
                    $("#NoteInterne_Upd").val(data.NoteInterne);
                    $('#qta_Upd').autoNumeric('set', data.qta);
                    $('#rowList').hide();
                    $('#rowAdd').hide();
                    $('#rowEdit').show();
                }
            });
        }

        $('#btnCloseUpdate').on('click', function (e) {
            $('#rowAdd').hide();
            $('#rowEdit').hide();
            $('#rowList').show();
        });

        $('#btnUpdate').on('click', function (e) {
            var id = $('#id').val(),
                Descr = $('#Descr_Upd').val().trim(),
                NoteInterne = $('#NoteInterne_Upd').val().trim(),
                qta = $('#qta_Upd').autoNumeric('get');

            if (chkAdd(Descr) == true) {
                var req = $.DataAccess.hs_ControllerDetail_Update(id, Descr, NoteInterne, qta, localStorage.getItem("OperatorName"));
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        $('#rowAdd').hide();
                        $('#rowEdit').hide();
                        $('#rowList').show();
                        ListDetail();
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }
        });
        /*--------------------------------------------------*/

        /*
        Delete
        ----------------------------------------------------*/
        $('#btnDelete').on('click', function (e) {
            var req = $.DataAccess.hs_ControllerDetail_Del($('#id').val());           
            req.success(function (json) {
                var data = json.d;
                if (data == true) {
                    $('#rowAdd').hide();
                    $('#rowEdit').hide();
                    $('#rowList').show();
                    ListDetail();
                }
                else {
                    toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                }
            });

        });
        /*--------------------------------------------------*/

    }); //document ready

});

function sel(id) {
    $.fn.sel(id);
}

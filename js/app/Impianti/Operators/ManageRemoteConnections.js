/*
Impianti Operators Manage remote connections
------------------------------------------*/
$(function () {
    $(document).ready(function () {
        //remoteconnections
        //$('#ApplicationTitle').html('<span name="lbl" caption="remoteconnections">Remote connections</span>');        
        $("#pageOperation").empty();

        /*
        Tabella 
        -------------------------------------------------------------*/
        $('.tableRemoteConnections').footable();
        $('.footable').data('page-size', 20);
        $('.footable').data('limit-navigation', 4);
        $('.footable').trigger('footable_initialized');
        LoadRemoteConnections();

        function LoadRemoteConnections() {
            $('#RemoteConnectionsList').empty();
            var req = $.DataAccess.Impianti_RemoteConnections_List(localStorage.getItem("IdImpianto"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplRemoteConnectionsList").tmpl(data).appendTo("#RemoteConnectionsList");
                    setlanguage();
                }
            });
        }

        //
        $('#btnClose').on('click', function (e) {
            $.module.load('Impianti/Operators/Detail');
        });

        $('#btnCallAdd').on('click', function (e) {
            $('#Descr_Add').val('');
            $('#remoteAddress_Add').val('');
            $('#NoteInterne_Add').val('');

            $('#rowList').hide();
            $('rowEdit').hide();
            $('#rowAdd').show();
        });
        $('#btnCloseAdd').on('click', function (e) {           
            $('#rowAdd').hide();
            $('rowEdit').hide();
            $('#rowList').show();
        });
        $('#btnAdd').on('click', function (e) {
            var Descr = $('#Descr_Add').val().trim(),
                remoteAddress = $('#remoteAddress_Add').val().trim(),
                connectionType = $('#connectionType_Add').val().trim(),
                NoteInterne = $('#NoteInterne_Add').val().trim();

            if (chkAdd(Descr, remoteAddress) == true) {
                var req = $.DataAccess.Impianti_RemoteConnections_Add(localStorage.getItem('IdImpianto'), Descr, remoteAddress, connectionType, NoteInterne);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        LoadRemoteConnections();
                        $('#rowAdd').hide();
                        $('#rowEdit').hide();
                        $('#rowList').show();
                    }
                    else {
                        //alert(langResources['msg4operationfailed'], function () { },
                        //                          langResources['remoteconnections'],
                        //                           'OK');
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }
        }); //btnAdd

        $.fn.sel = function (IdAddress) {
            $('#rowList').hide();
            $('#rowAdd').hide();
            $('#rowEdit').show();

            $('#IdAddress_Upd').val(IdAddress);
            var req = $.DataAccess.Impianti_RemoteConnections_Read(localStorage.getItem("IdImpianto"), IdAddress);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#RemoteConnectionToDelete').text(data.Descr);
                    $('#Descr_Upd').val(data.Descr);
                    $('#remoteAddress_Upd').val(data.remoteAddress);
                    //$('#remotePort_Upd').autoNumeric('set', data.remotePort);
                    $('#connectionType_Upd').val(data.connectionType);
                    $('#NoteInterne_Upd').val(data.NoteInterne);
                    setlanguage();
                }
            });
        }
        $('#btnCloseEdit').on('click', function (e) {
            $('#rowAdd').hide();
            $('#rowEdit').hide();

            $('#rowList').show();
        });
        $('#btnUpdate').on('click', function (e) {
            var Descr = $('#Descr_Upd').val().trim(),
                remoteAddress = $('#remoteAddress_Upd').val().trim(),
                connectionType = $('#connectionType_Upd').val().trim(),
                NoteInterne = $('#NoteInterne_Upd').val().trim(),
                IdAddress = $('#IdAddress_Upd').val().trim();

            if (chkAdd(Descr, remoteAddress) == true) {
                var req = $.DataAccess.Impianti_RemoteConnections_Upd(localStorage.getItem('IdImpianto'), IdAddress, Descr, remoteAddress, connectionType, NoteInterne);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        LoadRemoteConnections();
                        $('#rowAdd').hide();
                        $('#rowEdit').hide();
                        $('#rowList').show();
                    }
                    else {
                        alert(langResources['msg4operationfailed'], function () { },
                                                  langResources['remoteconnections'],
                                                   'OK');
                    }
                });
            }
        });

        $('#btnDelete').on('click', function (e) {
            var req = $.DataAccess.Impianti_RemoteConnections_Del(localStorage.getItem("IdImpianto"), $('#IdAddress_Upd').val());
            req.success(function (json) {
                var data = json.d;
                if (data == true) {
                    LoadRemoteConnections();
                    $('#rowAdd').hide();
                    $('#rowEdit').hide();
                    $('#rowList').show();
                }
                else {
                    alert(langResources['msg4operationfailed'], function () { },
                                              langResources['remoteconnections'],
                                               'OK');
                }
            });
        });

        function chkAdd(Descr, remoteAddress) {
            var retVal = false;
            var error_present = false;

            if (!error_present) {
                if (Descr == '') {
                    error_present = true;
                    alert(langResources['msg4descr'], function () { },
                                           langResources['remoteconnections'],
                                           'OK');
                }
            }

            if (!error_present) {
                if (remoteAddress == '') {
                    error_present = true;
                    alert(langResources['msg4remoteaddess'], function () { },
                                           langResources['remoteconnections'],
                                           'OK');
                }
            }

            retVal = !error_present;
            return retVal;
        } //chkAdd
    }); //document ready

});

function sel(IdAddress) {
    $.fn.sel(IdAddress);
}
/*
Impianti Operators Details
------------------------------------------*/
$(function () {
    var $impiantoRead = false;

    $(document).ready(function () {
        
        $('#ApplicationTitle').html('&nbsp;');
        $("#pageOperation").empty();
        loadNavigationBar();
        readImpianto();
        loadFielDevices();
        LoadRemoteConnections();
        LoadActiveUsers();
        LoadMaps();

        $('#btnUpd').on('click', function (e) {
            $.module.load('Impianti/Operators/Update');
        });

        $('#btnCallRemoteConnectionEdit').on('click', function (e) {
            $.module.load('Impianti/Operators/ManageRemoteConnections');
        });
        $('#btnCallFieldDevicesEdit').on('click', function (e) {
            $.module.load('Impianti/Operators/ManageFieldDevices');
        });

        $('#Controllato').on('switchChange.bootstrapSwitch', function (event, state) {
            console.log('Controllato switch-change value: ' + $('#Controllato').bootstrapSwitch('state') + ' $impiantoRead: ' + $impiantoRead);
            if ($impiantoRead == true) {
                var req = $.DataAccess.Impianti_setControllato(localStorage.getItem('IdImpianto'), $('#Controllato').bootstrapSwitch('state'));
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        $('#setControllatoResult').addClass("operationOk");
                    }
                    else {
                        $('#setControllatoResult').addClass("operationNok");
                    }
                });
            }
        });
        $('#Innowatio').on('switchChange.bootstrapSwitch', function (event, state) {
            if ($impiantoRead == true) {
                var req = $.DataAccess.Impianti_setInnowatio(localStorage.getItem('IdImpianto'), $('#Innowatio').bootstrapSwitch('state'))
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        $('#SetInnowatioResult').addClass("operationOk");
                    }
                    else {
                        $('#SetInnowatioResult').addClass("operationNok");
                    }
                });
            }
        });

        function loadNavigationBar() {
            //tmplNavigationbar
            $('#usermenu').empty();
            $("#tmplNavigationbar").tmpl([{ foo: "" }]).appendTo("#usermenu");
            setlanguage();
        }

        function readImpianto() {
            var req = $.DataAccess.Impianti_Read(localStorage.getItem("IdImpianto"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#ApplicationTitle').html('<a href="javascript:$.module.load(\'Impianti/Operators/Detail\')">' + data.DesImpianto + '</a>');
                    $("#DesImpianto").text(data.DesImpianto);
                    $("#Indirizzo").text(data.Indirizzo);
                    $('#AltSLM').text(data.AltSLM);
                    $('#Controllato').bootstrapSwitch('state', data.Controllato, data.Controllato);
                    $('#Innowatio').bootstrapSwitch('state', data.Innowatio, data.Innowatio);
                    $impiantoRead = true;
                }
            });
        }

        function loadFielDevices() {
            $("#FieldDevicesList").empty();
            var req = $.DataAccess.Impianti_FieldDevices_List(localStorage.getItem("IdImpianto"));
            req.success(function (json) {
                if (data) {
                    $("#tmplFieldDevicesList").tmpl(data).appendTo("#FieldDevicesList");
                    $("#FieldDevicesList").niceScroll({
                        cursorcolor: "#1FB5AD",
                        cursorborder: "0px solid #fff",
                        cursorborderradius: "0px",
                        cursorwidth: "3px"
                    });
                }
            });
        }

        function LoadRemoteConnections() {
            $('#RemoteConnectionsList').empty();
            var req = $.DataAccess.Impianti_RemoteConnections_List(localStorage.getItem("IdImpianto"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplRemoteConnectionsList").tmpl(data).appendTo("#RemoteConnectionsList");
                    $("#RemoteConnectionsList").niceScroll({
                        cursorcolor: "#1FB5AD",
                        cursorborder: "0px solid #fff",
                        cursorborderradius: "0px",
                        cursorwidth: "3px"
                    });
                    setlanguage();
                }
            });
        }

        function LoadActiveUsers() {
            $('#activeUsersList').empty();
            var req = $.DataAccess.aspnetroles_ListActive(localStorage.getItem("IdImpianto"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplactiveUsersList").tmpl(data).appendTo("#activeUsersList");
                    $("#RemoteConnectionsList").niceScroll({
                        cursorcolor: "#1FB5AD",
                        cursorborder: "0px solid #fff",
                        cursorborderradius: "0px",
                        cursorwidth: "3px"
                    });
                    setlanguage();
                }
            });
        }

        function LoadMaps() {
            $("#MapList").empty();
            var req = $.DataAccess.hs_Maps_List(localStorage.getItem("IdImpianto"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplMapList").tmpl(data).appendTo("#MapList");
                    $("#MapList").niceScroll({
                        cursorcolor: "#1FB5AD",
                        cursorborder: "0px solid #fff",
                        cursorborderradius: "0px",
                        cursorwidth: "3px"
                    });
                }
            })
        }

        /*
        Contatti
        ---------------------------------------------------------------------------------*/
        $('.tableContatti').footable();
        $('.tableContatti').data('page-size', 20);
        $('.tableContatti').data('limit-navigation', 4);
        $('.tableContatti').trigger('footable_initialized');
        loadContatti();

        function loadContatti() {
            $("#ListContatti").empty();
            var r = $.DataAccess.Impianti_Contatti_List(localStorage.getItem("IdImpianto"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplListContatti").tmpl(data).appendTo("#ListContatti");
                    $('.tableContatti').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }

        $('#btnCallAddContatto').on('click', function (e) {
            $.module.load('Impianti/Operators/Impianti_Contatti_Add');

        });
        $.fn.selContatto = function (IdContatto) {
            localStorage.setItem("IdContatto", IdContatto);
            $.module.load('Impianti/Operators/Impianti_Contatti_Upd');
        }
        /*-------------------------------------------------------------------------------*/
        
    }); //document ready

});
function selContatto(IdContatto) {
    $.fn.selContatto(IdContatto);
}
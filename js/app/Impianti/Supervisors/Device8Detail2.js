/*
Impianti supervisors Manage Heating System
------------------------------------------*/
$(function () {

    $(document).ready(function () {
        $('.tableDoors').footable();
        $('.tableDoors').data('page-size', 300);
        $('.tableDoors').data('limit-navigation', 4);
        $('.tableDoors').trigger('footable_initialized');

        $('.tableCirculators').footable();
        $('.tableCirculators').data('page-size', 300);
        $('.tableCirculators').data('limit-navigation', 4);
        $('.tableCirculators').trigger('footable_initialized');

        $('.tableServomotors').footable();
        $('.tableServomotors').data('page-size', 300);
        $('.tableServomotors').data('limit-navigation', 4);
        $('.tableServomotors').trigger('footable_initialized');

        $('.tableCtl').footable();
        $('.tableCtl').data('page-size', 300);
        $('.tableCtl').data('limit-navigation', 4);
        $('.tableCtl').trigger('footable_initialized');

        $('.tableCtb').footable();
        $('.tableCtb').data('page-size', 300);
        $('.tableCtb').data('limit-navigation', 4);
        $('.tableCtb').trigger('footable_initialized');

        $('.tabletbs').footable();
        $('.tabletbs').data('page-size', 300);
        $('.tabletbs').data('limit-navigation', 4);
        $('.tabletbs').trigger('footable_initialized');

        $('.tablepbs').footable();
        $('.tablepbs').data('page-size', 300);
        $('.tablepbs').data('limit-navigation', 4);
        $('.tablepbs').trigger('footable_initialized');

        $('.tablepms').footable();
        $('.tablepms').data('page-size', 300);
        $('.tablepms').data('limit-navigation', 4);
        $('.tablepms').trigger('footable_initialized');

        /*
        received messages
        --------------------------------------------------------------*/
        $.fn.received_hs_Doors_setValue = function (hsId, DoorCod, currentValue) {
            if (localStorage.getItem("hsId") == hsId) {
                if (currentValue == false) {
                    $('#currentValue_' + DoorCod).html('<img src="images/closed_door.png" style="height:24px;width:24px" />');
                }
                else {
                    $('#currentValue_' + DoorCod).html('<img src="images/open_door.png" style="height:24px;width:24px" />');
                }
            }
        }
        $.fn.received_hs_Cir_setStatus = function (hsId, CirCod, isRunning, stato) {
            if (localStorage.getItem("hsId") == hsId) {
                statusChanged('#Cirstato_' + CirCod, stato);
                $('#isRunning_' + CirCod).text(isRunning);
            }
        }
        $.fn.received_hs_Vrd_setStatus = function (hsId, VrdCod, SetPoint, SetPosition, Position, stato) {
            if (localStorage.getItem("hsId") == hsId) {
                statusChanged('#Vrdstato_' + VrdCod, stato);
                $('#SetPoint_' + VrdCod).text(SetPoint);
            }
        }
        $.fn.received_hs_Ctl_setValue = function (hsId, CtlCod, stato, currentValue) {
            if (localStorage.getItem("hsId") == hsId) {
                statusChanged('#Ctlstato_' + CtlCod, stato);
                $('#currentValue_' + CtlCod).text(currentValue);
            }
        }
        $.fn.received_hs_Ctb_setValue = function (hsId, CtbCod, currentValue) {
            if (localStorage.getItem("hsId") == hsId) {
                $('#currentValue_' + CtbCod).text(currentValue);
            }
        }

        /**/
        function statusChanged(elem, stato) {
            if (stato == 0) {
                $(elem).html('<i class="fa fa-thumbs-o-up"></i>');
            }
            else {
                if (stato == 1) {
                    $(elem).html('<img src="images/status1.png" style="height:24px;width:24px" />');
                }
                else {
                    $(elem).html('<img src="images/status2.png" style="height:24px;width:24px" />');
                }
            }
        }
        /**/

        function loadNavigationBar() {
            //tmplNavigationbar
            $('#usermenu').empty();
            $("#tmplFurtherDetail").tmpl([{ foo: "" }]).appendTo("#usermenu");
            setlanguage();
        }

        /*
        Init
        -------------------------------------------------------------------------*/
        Init();
        function Init() {
            loadNavigationBar();
            Readhs();
            //setTimeout($.rt.start(), 1000);

            LoadDoors();
            loadCirculators();
            loadServomotors();
            loadCtl();
            loadCtb();
            loadtb();
            loadpb();
            loadpm();

            setlanguage();
        }
        function Readhs() {
            $("#ListPlants").empty();
            var req = $.DataAccess.HeatingSystem_Read(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#hsDescr").text(data.Descr);
                    $("#tmplListPlants").tmpl(data).appendTo("#ListPlants");
                    $('.tablePlants').trigger('footable_redraw');

                    loadProbeElem(localStorage.getItem("hsId"));
                }
            });
        }

        /*
        Doors
        -------------------------------------------------------------------------*/
        function LoadDoors() {
            $("#ListDoors").empty();
            var r = $.DataAccess.hs_Doors_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplListDoors").tmpl(data).appendTo("#ListDoors");
                    $('.tableDoors').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }
        $.fn.logDoor = function (DoorCod) {
            localStorage.setItem("DoorCod", DoorCod);
            $.module.load('Impianti/supervisors/hs_Doors_log');
        }
        /*-----------------------------------------------------------------------*/

        /*
        Circulators
        ------------------------------------------------------------------------*/
        function loadCirculators() {
            $("#CirculatorsList").empty();
            var r = $.DataAccess.hs_Cir_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplCirculatorsList").tmpl(data).appendTo("#CirculatorsList");
                    $('.tableCirculators').trigger('footable_redraw');
                    setlanguage();
                    for (var i = 0; i < data.length; i++) { loadProbeElem(data[i].CirCod) }
                }
            });
        }
        $.fn.logCir = function (CirCod) {
            localStorage.setItem("CirCod", CirCod);
            $.module.load('Impianti/supervisors/hs_Cir_log');
        }
        /*----------------------------------------------------------------------*/

        /*
        Servomotors
        ------------------------------------------------------------------------*/
        function loadServomotors() {
            $("#ServomotorsList").empty();
            var r = $.DataAccess.hs_Vrd_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplServomotors").tmpl(data).appendTo("#ServomotorsList");
                    $('.tableServomotors').trigger('footable_redraw');
                    setlanguage();

                    for (var i = 0; i < data.length; i++) { loadProbeElem(data[i].VrdCod) }
                }
            });
        }
        $.fn.logVrd = function (VrdCod) {
            localStorage.setItem("VrdCod", VrdCod);
            $.module.load('Impianti/supervisors/hs_Vrd_log');
        }
        /*----------------------------------------------------------------------*/

        /*
        Flowmeters
        ------------------------------------------------------------------------*/
        function loadCtl() {
            $("#CtlList").empty();
            var r = $.DataAccess.hs_Ctl_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplCtl").tmpl(data).appendTo("#CtlList");
                    $('.tableCtl').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }
        $.fn.logCtl = function (CtlCod) {
            localStorage.setItem("CtlCod", CtlCod);
            $.module.load('Impianti/supervisors/hs_Ctl_log');
        }
        /*----------------------------------------------------------------------*/

        /*
        Meters
        ------------------------------------------------------------------------*/
        function loadCtb() {
            $("#CtbList").empty();
            var r = $.DataAccess.hs_Ctb_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplCtb").tmpl(data).appendTo("#CtbList");
                    $('.tableCtb').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }
        $.fn.logCtb = function (CtbCod) {
            localStorage.setItem("CtbCod", CtbCod);
            $.module.load('Impianti/supervisors/hs_Ctb_log');
        }
        /*----------------------------------------------------------------------*/

        /*
        termostati di blocco
        ------------------------------------------------------------------------*/
        function loadtb() {
            $("#tbsList").empty();
            var r = $.DataAccess.hs_tb_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmpltbs").tmpl(data).appendTo("#tbsList");
                    $('.tabletbs').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }
        $.fn.logtb = function (tbCod) {
            localStorage.setItem("tbCod", tbCod);
            $.module.load('Impianti/supervisors/hs_tb_log');
        }
        /*----------------------------------------------------------------------*/

        /*
        pressostati di blocco
        ------------------------------------------------------------------------*/
        function loadpb() {
            $("#pbsList").empty();
            var r = $.DataAccess.hs_pb_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplpbs").tmpl(data).appendTo("#pbsList");
                    $('.tablepbs').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }
        $.fn.logpb = function (pbCod) {
            localStorage.setItem("pbCod", pbCod);
            $.module.load('Impianti/supervisors/hs_pb_log');
        }
        /*----------------------------------------------------------------------*/

        /*
        pressostati di minima
        ------------------------------------------------------------------------*/
        function loadpm() {
            $("#pmsList").empty();
            var r = $.DataAccess.hs_pm_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplpms").tmpl(data).appendTo("#pmsList");
                    $('.tablepms').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }
        $.fn.logpm = function (pmCod) {
            localStorage.setItem("pmCod", pmCod);
            $.module.load('Impianti/supervisors/hs_pm_log');
        }
        /*----------------------------------------------------------------------*/

    }); //document ready

});
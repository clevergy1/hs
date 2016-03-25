/*
Impianti supervisors Manage Heating System
------------------------------------------*/
$(function () {

    $(document).ready(function () {
        $('.tablePlants').footable();
        $('.tablePlants').data('page-size', 300);
        $('.tablePlants').data('limit-navigation', 4);
        $('.tablePlants').trigger('footable_initialized');

        $('.tableDoors').footable();
        $('.tableDoors').data('page-size', 300);
        $('.tableDoors').data('limit-navigation', 4);
        $('.tableDoors').trigger('footable_initialized');

        $('.tableGrus').footable();
        $('.tableGrus').data('page-size', 300);
        $('.tableGrus').data('limit-navigation', 4);
        $('.tableGrus').trigger('footable_initialized');

        $('.tableboilers').footable();
        $('.tableboilers').data('page-size', 300);
        $('.tableboilers').data('limit-navigation', 4);
        $('.tableboilers').trigger('footable_initialized');

        $('.tableCirculators').footable();
        $('.tableCirculators').data('page-size', 300);
        $('.tableCirculators').data('limit-navigation', 4);
        $('.tableCirculators').trigger('footable_initialized');

        $('.tableServomotors').footable();
        $('.tableServomotors').data('page-size', 300);
        $('.tableServomotors').data('limit-navigation', 4);
        $('.tableServomotors').trigger('footable_initialized');

        $('.tableCron').footable();
        $('.tableCron').data('page-size', 300);
        $('.tableCron').data('limit-navigation', 4);
        $('.tableCron').trigger('footable_initialized');

        $('.tableCtl').footable();
        $('.tableCtl').data('page-size', 300);
        $('.tableCtl').data('limit-navigation', 4);
        $('.tableCtl').trigger('footable_initialized');

        $('.tableCtb').footable();
        $('.tableCtb').data('page-size', 300);
        $('.tableCtb').data('limit-navigation', 4);
        $('.tableCtb').trigger('footable_initialized');

        $('.tableProbes').footable();
        $('.tableProbes').data('page-size', 300);
        $('.tableProbes').data('limit-navigation', 4);
        $('.tableProbes').trigger('footable_initialized');

        $('.tableProbeElem').footable();
        $('.tableProbeElem').data('page-size', 300);
        $('.tableProbeElem').data('limit-navigation', 4);
        $('.tableProbeElem').trigger('footable_initialized');


        /*
        received messages
        --------------------------------------------------------------*/
        $.fn.received_hs_TemperatureProbes_setValue = function (hsId, ProbeCod, currentValue) {
            if (localStorage.getItem("hsId") == hsId) {
                $('#Probe_' + ProbeCod).text(currentValue);
                $('#ProbeElem_' + ProbeCod).text(currentValue);
            }
        }
        $.fn.received_hs_cal_setStatus = function (hsId, CalCod, SetPoint, isRunning, stato) {
            if (localStorage.getItem("hsId") == hsId) {
                statusChanged('#Calstato_' + CalCod, stato);
                $('#SetPoint_' + CalCod).text(SetPoint);
                $('#isRunning_' + CalCod).text(isRunning);
            }
        }
        $.fn.received_hs_Cir_setStatus = function (hsId, CirCod, isRunning, stato) {            
            if (localStorage.getItem("hsId") == hsId) {
                statusChanged('#Cirstato_' + CirCod, stato);
                $('#isRunning_' + CirCod).text(isRunning);
            }
        }
        $.fn.received_hs_Cron_setStatus = function (hsId, CronCod, SetPoint, stato) {
            if (localStorage.getItem("hsId") == hsId) {
                statusChanged('#Cronstato_' + CronCod, stato);
                $('#SetPoint_' + CronCod).text(SetPoint);
            }
        }
        $.fn.received_hs_Vrd_setStatus = function (hsId, VrdCod, SetPoint, SetPosition, Position, stato) {
            if (localStorage.getItem("hsId") == hsId) {
                statusChanged('#Vrdstato_' + VrdCod, stato);
                $('#SetPoint_' + VrdCod).text(SetPoint);
            }
        }
        $.fn.received_hs_Ctl_setValue = function (hsId, CtlCod,stato, currentValue) {
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
        /*-----------------------------------------------------------*/

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

        Init();

        /*
        Init
        -------------------------------------------------------------------------*/
        $(window).scroll(function () {
            //check if your div is visible to user
            // CODE ONLY CHECKS VISIBILITY FROM TOP OF THE PAGE
            if ($(window).scrollTop() + $(window).height() >= $('#Cal_section').offset().top) {
                if (!$('#Cal_section').attr('loaded')) {
                    $('#Cal_section').attr('loaded', true);
                    loadBoilers();
                }
            }
            if ($(window).scrollTop() + $(window).height() >= $('#Cir_section').offset().top) {
                if (!$('#Cir_section').attr('loaded')) {
                    $('#Cir_section').attr('loaded', true);
                    loadCirculators();
                }
            }
            if ($(window).scrollTop() + $(window).height() >= $('#Vrd_section').offset().top) {
                if (!$('#Vrd_section').attr('loaded')) {
                    $('#Vrd_section').attr('loaded', true);
                    loadServomotors();
                }
            }
            if ($(window).scrollTop() + $(window).height() >= $('#Cron_section').offset().top) {
                if (!$('#Cron_section').attr('loaded')) {
                    $('#Cron_section').attr('loaded', true);
                    loadCron();
                }
            }
            if ($(window).scrollTop() + $(window).height() >= $('#Ctl_section').offset().top) {
                if (!$('#Ctl_section').attr('loaded')) {
                    $('#Ctl_section').attr('loaded', true);
                    loadCtl();
                }
            }
            if ($(window).scrollTop() + $(window).height() >= $('#Ctb_section').offset().top) {
                if (!$('#Ctb_section').attr('loaded')) {
                    $('#Ctb_section').attr('loaded', true);
                    loadCtb();
                }
            }
            if ($(window).scrollTop() + $(window).height() >= $('#temperatureprobes_section').offset().top) {
                if (!$('#temperatureprobes_section').attr('loaded')) {
                    $('#temperatureprobes_section').attr('loaded', true);
                    loadProbes();
                }
            }
            if ($(window).scrollTop() + $(window).height() >= $('#tbs_section').offset().top) {
                if (!$('#tbs_section').attr('loaded')) {
                    $('#tbs_section').attr('loaded', true);
                    loadtb();
                }
            }
            if ($(window).scrollTop() + $(window).height() >= $('#pm_section').offset().top) {
                if (!$('#pm_section').attr('loaded')) {
                    $('#pm_section').attr('loaded', true);
                    loadpm();
                }
            }
            if ($(window).scrollTop() + $(window).height() >= $('#pb_section').offset().top) {
                if (!$('#pb_section').attr('loaded')) {
                    $('#pb_section').attr('loaded', true);
                    loadpb();
                }
            }
        });

        function Init() {
            Readhs();            
            //setTimeout($.rt.start(), 1000);

            LoadDoors();
            LoadhsGrus();
           
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

        function loadProbeElem(elementCode) {
            $("#sList_" + elementCode).empty();
            var r = $.DataAccess.hs_TemperatureProbeElem_List(localStorage.getItem("hsId"), elementCode);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplProbeElem").tmpl(data).appendTo("#sList_" + elementCode);
                    $('.tableProbeElem').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }

        function loadGruElem(GruId, GruCode) {
            $("#sList_" + GruCode).empty();
            var r = $.DataAccess.hs_GruElem_List(GruId);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    console.log('loadGruElem GruId=' + GruId + ' GruCode=' + GruCode);
                    console.log(data);
                    $("#tmplGruElem").tmpl(data).appendTo("#sList_" + GruCode);
                    $('.tableGruElem').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }
        /*-----------------------------------------------------------------------*/

        /*
        Boilers
        ------------------------------------------------------------------------*/
        $('#btnCallAddBoiler').on('click', function (e) {
            $.module.load('Impianti/Operators/hs_Cal_Add');
        });

        function loadBoilers() {
            $("#boilersList").empty();
            var r = $.DataAccess.hs_Cal_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplboilersList").tmpl(data).appendTo("#boilersList");
                    $('.tableboilers').trigger('footable_redraw');
                    setlanguage();

                    for (var i = 0; i < data.length; i++) { loadProbeElem(data[i].CalCod) }
                }
            });
        }
        /*----------------------------------------------------------------------*/

        /*
        Gruppo termici
        -------------------------------------------------------------------------*/
        $('#btnAddhsGru').on('click', function (e) {
            $.module.load('Impianti/Operators/hs_Gru_Add');
        });

        function LoadhsGrus() {
            $("#hsGrusList").empty();
            var r = $.DataAccess.hs_Gru_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplhs_grusList").tmpl(data).appendTo("#hsGrusList");
                    $('.tableGrus').trigger('footable_redraw');
                    setlanguage();
                    for (var i = 0; i < data.length; i++) { loadGruElem(data[i].Id, data[i].GruCod) }
                }
            });
        }
        /*-----------------------------------------------------------------------*/

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
        $('#btnCallAddCir').on('click', function (e) {
            $.module.load('Impianti/Operators/hs_Cir_Add');
        });

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
        /*----------------------------------------------------------------------*/

        /*
        Servomotors
        ------------------------------------------------------------------------*/
        $('#btnCallAddVrd').on('click', function (e) {
            $.module.load('Impianti/Operators/hs_Vrd_Add');
        });

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
        /*----------------------------------------------------------------------*/

        /*
        Chronothermostats
        ------------------------------------------------------------------------*/
        $('#btnCallAddCron').on('click', function (e) {
            $.module.load('Impianti/Operators/hs_Cron_Add');
        });

        function loadCron() {
            $("#CronList").empty();
            var r = $.DataAccess.hs_Cron_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplCron").tmpl(data).appendTo("#CronList");
                    $('.tableCron').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }
        /*----------------------------------------------------------------------*/

        /*
        Flowmeters
        ------------------------------------------------------------------------*/
        $('#btnCallAddCtl').on('click', function (e) {
            $.module.load('Impianti/Operators/hs_Ctl_Add');
        });

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
        /*----------------------------------------------------------------------*/

        /*
        Meters
        ------------------------------------------------------------------------*/
        $('#btnCallAddCtb').on('click', function (e) {
            $.module.load('Impianti/Operators/hs_Ctb_Add');
        });

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
        /*----------------------------------------------------------------------*/

        /*
        Probes
        ------------------------------------------------------------------------*/
        $('#btnCallAddProbe').on('click', function (e) {
            $.module.load('Impianti/Operators/hs_TemperatureProbess_Add');
        });

        function loadProbes() {
            $("#ProbesList").empty();
            var r = $.DataAccess.hs_TemperatureProbes_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplProbes").tmpl(data).appendTo("#ProbesList");
                    $('.tableProbes').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }

        $.fn.logProbe = function (ProbeCod) {
            localStorage.setItem("ProbeCod", ProbeCod);
            $.module.load('Impianti/supervisors/hs_Probe_log');
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
        /*----------------------------------------------------------------------*/

    }); //document ready

});

function logDoor(DoorCod) {
    $.fn.logDoor(DoorCod);
}
function logProbe(ProbeCod) {
    $.fn.logProbe(ProbeCod);
}
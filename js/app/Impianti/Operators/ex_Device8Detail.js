/*
Impianti Operators Manage Heating System
------------------------------------------*/
$(function () {

    $(document).ready(function () {

        //tmplNavigationbar
        $('#usermenu').empty();
        $("#tmplMenuDetail").tmpl([{ foo: "" }]).appendTo("#usermenu");
        setlanguage();

        $('.tablePlants').footable();
        $('.tablePlants').data('page-size', 3);
        $('.tablePlants').data('limit-navigation', 4);
        $('.tablePlants').trigger('footable_initialized');

        $('.tableContollers').footable();
        $('.tableContollers').data('page-size', 3);
        $('.tableContollers').data('limit-navigation', 4);
        $('.tableContollers').trigger('footable_initialized');
                
        $('.tableDoors').footable();
        $('.tableDoors').data('page-size', 3);
        $('.tableDoors').data('limit-navigation', 4);
        $('.tableDoors').trigger('footable_initialized');

        $('.tableGrus').footable();
        $('.tableGrus').data('page-size', 3);
        $('.tableGrus').data('limit-navigation', 4);
        $('.tableGrus').trigger('footable_initialized');

        $('.tableboilers').footable();
        $('.tableboilers').data('page-size', 3);
        $('.tableboilers').data('limit-navigation', 4);
        $('.tableboilers').trigger('footable_initialized');

        $('.tableCirculators').footable();
        $('.tableCirculators').data('page-size', 3);
        $('.tableCirculators').data('limit-navigation', 4);
        $('.tableCirculators').trigger('footable_initialized');

        $('.tableServomotors').footable();
        $('.tableServomotors').data('page-size', 3);
        $('.tableServomotors').data('limit-navigation', 4);
        $('.tableServomotors').trigger('footable_initialized');

        $('.tableCron').footable();
        $('.tableCron').data('page-size', 3);
        $('.tableCron').data('limit-navigation', 4);
        $('.tableCron').trigger('footable_initialized');

        $('.tableCtl').footable();
        $('.tableCtl').data('page-size', 3);
        $('.tableCtl').data('limit-navigation', 4);
        $('.tableCtl').trigger('footable_initialized');

        $('.tableCtb').footable();
        $('.tableCtb').data('page-size', 3);
        $('.tableCtb').data('limit-navigation', 4);
        $('.tableCtb').trigger('footable_initialized');

        $('.tableProbes').footable();
        $('.tableProbes').data('page-size', 3);
        $('.tableProbes').data('limit-navigation', 4);
        $('.tableProbes').trigger('footable_initialized');

        $('.tableProbeElem').footable();
        $('.tableProbeElem').data('page-size', 3);
        $('.tableProbeElem').data('limit-navigation', 4);
        $('.tableProbeElem').trigger('footable_initialized');
        
        $('.tabletbs').footable();
        $('.tabletbs').data('page-size', 3);
        $('.tabletbs').data('limit-navigation', 4);
        $('.tabletbs').trigger('footable_initialized');

        $('.tablepms').footable();
        $('.tablepms').data('page-size', 3);
        $('.tablepms').data('limit-navigation', 4);
        $('.tablepms').trigger('footable_initialized');

        $('.tablepbs').footable();
        $('.tablepbs').data('page-size', 3);
        $('.tablepbs').data('limit-navigation', 4);
        $('.tablepbs').trigger('footable_initialized');
                
        $('.tableGruElem').footable();
        $('.tableGruElem').data('page-size', 3);
        $('.tableGruElem').data('limit-navigation', 4);
        $('.tableGruElem').trigger('footable_initialized');

        /*
        received messages
        --------------------------------------------------------------*/
        $.fn.received_hs_TemperatureProbes_setValue = function (hsId, ProbeCod, currentValue) {
            if (localStorage.getItem("hsId") == hsId) {
                //console.log("received_hs_TemperatureProbes_setValue " + ProbeCod + "=" + currentValue);
                $('#Probe_' + ProbeCod).text(currentValue);
                $('#ProbeElem_' + ProbeCod).text(currentValue);
            }
        }
        $.fn.received_hs_cal_setStatus = function (hsId, CalCod, SetPoint, isRunning, stato) {
            if (localStorage.getItem("hsId") == hsId) {
                //$('#Calstato_' + CalCod).text(stato);
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
        $.fn.received_hs_Cir_setManualMode = function (hsId, CirCod, ManualMode) {
            if (localStorage.getItem("hsId") == hsId) {
            }
        }
        $.fn.received_hs_Cron_setStatus = function (hsId, CronCod, SetPoint, stato) {
            if (localStorage.getItem("hsId") == hsId) {
                statusChanged('#Cronstato_' + CronCod, stato);               
                $('#SetPoint_' + CronCod).text(SetPoint);
            }
        }
        $.fn.received_hs_Vrd_setStatus = function (hsId, VrdCod, SetPoint, stato) {
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
            $.module.load('Impianti/Operators/Device8Plant');
            //Readhs();
            ////setTimeout($.rt.start(), 1000);
            //LoadDoors();
            //LoadControllers();
            //LoadhsGrus();
            //setlanguage();            
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
            $("#sList_"+elementCode).empty();
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
                    $("#tmplGruElem").tmpl(data).appendTo("#sList_" + GruCode);
                    $('.tableGruElem').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }

        $.fn.callconfighs = function (hsId) {
            $.module.load('Impianti/Operators/hs_hs_Config');
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
        $('#btnCallAddDoors').on('click', function (e) {
            $.module.load('Impianti/Operators/hs_Doors_Add');
        });

        $.fn.callUpdateDoor = function (DoorId) {
            localStorage.setItem("DoorId", DoorId);
            $.module.load('Impianti/Operators/hs_Doors_Update');
        }

        $.fn.logDoor = function (DoorCod) {
            localStorage.setItem("DoorCod", DoorCod);
            $.module.load('Impianti/Operators/hs_Doors_log');
        }
        /*-----------------------------------------------------------------------*/

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

        $.fn.callUpdateGru = function (Id) {
            localStorage.setItem("IdhsGru", Id);
            $.module.load('Impianti/Operators/hs_Gru_Update');
        }
        $.fn.callconfigGru = function (Id) {
            localStorage.setItem("IdhsGru", Id);
            $.module.load('Impianti/Operators/hs_Gru_Config');
        }
        $.fn.logGru = function (GruCod) {
            localStorage.setItem("GruCod", GruCod);
            $.module.load('Impianti/Operators/hs_Gru_log');
        }
        /*-----------------------------------------------------------------------*/

        /*
        Controller
        -------------------------------------------------------------------------*/
        function LoadControllers() {
            $("#ListControllers").empty();
            var r = $.DataAccess.hs_Controller_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplListControllers").tmpl(data).appendTo("#ListControllers");
                    $('.tableContollers').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }

        $('#btnCallAddController').on('click', function (e) {
            $.module.load('Impianti/Operators/hs_Controller_Add');            
        });

        $.fn.sel = function (ControllerId) {
            localStorage.setItem("ControllerId", ControllerId);
            $.module.load('Impianti/Operators/hs_Controller_Detail');
        }

        $.fn.callUpdateController = function (ControllerId) {
            localStorage.setItem("ControllerId", ControllerId);
            $.module.load('Impianti/Operators/hs_Controller_Update');
        }
        /*----------------------------------------------------------------------*/

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

        $.fn.callUpdateCal = function (IdCal) {
            localStorage.setItem("IdCal", IdCal);
            $.module.load('Impianti/Operators/hs_Cal_Update');
        }

        $.fn.callconfigCal = function (IdCal) {
            localStorage.setItem("IdCal", IdCal);
            $.module.load('Impianti/Operators/hs_Cal_Config');
        }

        $.fn.logCal = function (CalCod) {
            localStorage.setItem("CalCod", CalCod);
            $.module.load('Impianti/Operators/hs_Cal_log');
        }
        /*----------------------------------------------------------------------*/

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

        $.fn.callUpdateCir = function (CirId) {
            localStorage.setItem("CirId", CirId);
            $.module.load('Impianti/Operators/hs_Cir_Update');
        }

        $.fn.callconfigCir = function (CirId) {
            localStorage.setItem("CirId", CirId);
            $.module.load('Impianti/Operators/hs_Cir_Config');
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

        $.fn.callUpdateVrd = function (VrdId) {
            localStorage.setItem("VrdId", VrdId);
            $.module.load('Impianti/Operators/hs_Vrd_Update');
        }

        $.fn.callconfigVrd = function (VrdId) {
            localStorage.setItem("VrdId", VrdId);
            $.module.load('Impianti/Operators/hs_Vrd_Config');
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
                    for (var i = 0; i < data.length; i++) { loadProbeElem(data[i].CronCod) }
                }
            });
        }

        $.fn.callUpdateCron = function (CronId) {
            localStorage.setItem("CronId", CronId);
            $.module.load('Impianti/Operators/hs_Cron_Update');
        }

        $.fn.callconfigCron = function (CronId) {
            localStorage.setItem("CronId", CronId);
            $.module.load('Impianti/Operators/hs_Cron_Config');
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

        $.fn.callUpdateCtl = function (CtlId) {
            localStorage.setItem("CtlId", CtlId);
            $.module.load('Impianti/Operators/hs_Ctl_Update');
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

        $.fn.callUpdateCtb = function (CtbId) {
            localStorage.setItem("CtbId", CtbId);
            $.module.load('Impianti/Operators/hs_Ctb_Update');
        }
        /*----------------------------------------------------------------------*/

        /*
        Probes
        ------------------------------------------------------------------------*/
        $('#btnCallAddProbe').on('click', function (e) {
            $.module.load('Impianti/Operators/hs_TemperatureProbes_Add');
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

        $.fn.callUpdateProbe = function (ProbeId) {
            localStorage.setItem("ProbeId", ProbeId);
            $.module.load('Impianti/Operators/hs_TemperatureProbes_Update');
        }

        $.fn.logProbe = function (ProbeCod) {
            localStorage.setItem("ProbeCod", ProbeCod);
            $.module.load('Impianti/Operators/hs_Probe_log');
        }
        /*----------------------------------------------------------------------*/

        /*
        termostati di blocco
        ------------------------------------------------------------------------*/
        $('#btnCallAddtbs').on('click', function (e) {
            $.module.load('Impianti/Operators/hs_tb_Add');
        });

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

        $.fn.callUpdatetbs = function (tbId) {
            localStorage.setItem("tbId", tbId);
            $.module.load('Impianti/Operators/hs_tb_Update');
        }
        /*----------------------------------------------------------------------*/

        /*
        pressostati di minima
        ------------------------------------------------------------------------*/
        $('#btnCallAddpms').on('click', function (e) {
            $.module.load('Impianti/Operators/hs_pm_Add');
        });

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

        $.fn.callUpdatepms = function (Id) {
            localStorage.setItem("pmId", Id);
            $.module.load('Impianti/Operators/hs_pm_Update');
        }
        /*----------------------------------------------------------------------*/

        /*
        pressostati di blocco
        ------------------------------------------------------------------------*/
        $('#btnCallAddpbs').on('click', function (e) {
            $.module.load('Impianti/Operators/hs_pb_Add');
        });

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

        $.fn.callUpdatepbs = function (Id) {
            localStorage.setItem("pbId", Id);
            $.module.load('Impianti/Operators/hs_pb_Update');
        }
        /*----------------------------------------------------------------------*/

    }); //document ready

});
function sel(ControllerId) {
    $.fn.sel(ControllerId);
}
function callUpdateDoor(DoorId) {
    $.fn.callUpdateDoor(DoorId);
}
function logDoor(DoorCod) {
    $.fn.logDoor(DoorCod);
}

function callUpdateGru(Id) {
    $.fn.callUpdateGru(Id);
}
function callconfigGru(Id) {
    $.fn.callconfigGru(Id);
}
function logGru(GruCod) {
    $.fn.logGru(GruCod);
}

function callUpdateController(ControllerId) {
    $.fn.callUpdateController(ControllerId);
}

function selGruppo(Gruppo, DescGruppo) {
    $.fn.selGruppo(Gruppo, DescGruppo);
}
function callUpdateCal(IdCal) {
    $.fn.callUpdateCal(IdCal);
}
function logCal(CalCod) {
    $.fn.logCal(CalCod);
}
function callUpdateCir(CirId) {
    $.fn.callUpdateCir(CirId);
}
function callUpdateVrd(VrdId) {
    $.fn.callUpdateVrd(VrdId);
}
function callUpdateCron(CronId) {
    $.fn.callUpdateCron(CronId);
}
function callUpdateCtl(CtlId) {
    $.fn.callUpdateCtl(CtlId);
}
function callUpdateCtb(CtbId) {
    $.fn.callUpdateCtb(CtbId);
}
function callUpdateProbe(ProbeId) {
    $.fn.callUpdateProbe(ProbeId);
}
function logProbe(ProbeCod) {
    $.fn.logProbe(ProbeCod);
}
function callconfighs(hsId) {
    $.fn.callconfighs(hsId);
}
function callconfigCal(IdCal) {
    $.fn.callconfigCal(IdCal);
}
function callconfigVrd(VrdId) {
    $.fn.callconfigVrd(VrdId);
}
function callconfigCir(CirId) {
    $.fn.callconfigCir(CirId);
}
function callconfigCron(CronId) {
    $.fn.callconfigCron(CronId);
}
function callUpdatetbs(id) {
    $.fn.callUpdatetbs(id);
}
function callUpdatepms(id) {
    $.fn.callUpdatepms(id);
}
function callUpdatepbs(id) {
    $.fn.callUpdatepbs(id);
}
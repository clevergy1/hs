$(function () {
    "use strict";


    $(document).ready(function () {

        $.fn.userLogOut = function () {
            localStorage.removeItem('OperatorName');

            localStorage.removeItem('keyA');
            localStorage.removeItem("admin-remember");

            localStorage.removeItem('keyO');
            localStorage.removeItem("operator-remember");

            localStorage.removeItem('keyS');
            localStorage.removeItem("supervisor-remember");

            $(location).attr('href', $.appParms.urlRoot());
        }

        $.fn.supervisorSettings = function () {
            $.module.load('Impianti/Supervisors/resetPassword');
        }



    }); //document ready

});


function stringToBoolean(string) {
    switch (string.toLowerCase()) {
        case "true": case "yes": case "1": return true;
        case "false": case "no": case "0": case null: return false;
        default: return Boolean(string);
    }
}

function init() {
    //console.log("init");
    //set numeric fields properties


    /*==Slim Scroll ==*/
    if ($.fn.slimScroll) {
        $('.event-list').slimscroll({
            height: '305px',
            wheelStep: 20
        });
        $('.conversation-list').slimscroll({
            height: '360px',
            wheelStep: 35
        });
        $('.to-do-list').slimscroll({
            height: '300px',
            wheelStep: 35
        });
    }
    /*==Nice Scroll ==*/
    if ($.fn.niceScroll) {
        $(".leftside-navigation").niceScroll({
            cursorcolor: "#1FB5AD",
            cursorborder: "0px solid #fff",
            cursorborderradius: "0px",
            cursorwidth: "3px"
        });

        $(".leftside-navigation").getNiceScroll().resize();
        if ($('#sidebar').hasClass('hide-left-bar')) {
            $(".leftside-navigation").getNiceScroll().hide();
        }
        $(".leftside-navigation").getNiceScroll().show();

        $(".right-stat-bar").niceScroll({
            cursorcolor: "#1FB5AD",
            cursorborder: "0px solid #fff",
            cursorborderradius: "0px",
            cursorwidth: "3px"
        });
    }

    /*==Collapsible==*/
    $('.widget-head').click(function (e) {
        var widgetElem = $(this).children('.widget-collapse').children('i');

        $(this)
            .next('.widget-container')
            .slideToggle('slow');
        if ($(widgetElem).hasClass('ico-minus')) {
            $(widgetElem).removeClass('ico-minus');
            $(widgetElem).addClass('ico-plus');
        } else {
            $(widgetElem).removeClass('ico-plus');
            $(widgetElem).addClass('ico-minus');
        }
        e.preventDefault();
    });
    

    // tool tips

    $('.tooltips').tooltip();

    // popovers

    $('.popovers').popover();


    if (localStorage.getItem("OperatorName")) {
        $('.username').text(localStorage.getItem("OperatorName"));
    }
    if (localStorage.getItem("AdminName")) {
        $('.username').text(localStorage.getItem("AdminName"));
    }
    if (localStorage.getItem("SupervisorName")) {
        $('.username').text(localStorage.getItem("SupervisorName"));
    }
  
    /*==Sidebar Toggle==*/
    $(".leftside-navigation .sub-menu > a").click(function () {
        var o = ($(this).offset());
        var diff = 80 - o.top;
        if (diff > 0)
            $(".leftside-navigation").scrollTo("-=" + Math.abs(diff), 500);
        else
            $(".leftside-navigation").scrollTo("+=" + Math.abs(diff), 500);
    });

    $('.sidebar-toggle-box .fa-bars').click(function (e) {

        $(".leftside-navigation").niceScroll({
            cursorcolor: "#1FB5AD",
            cursorborder: "0px solid #fff",
            cursorborderradius: "0px",
            cursorwidth: "3px"
        });

        $('#sidebar').toggleClass('hide-left-bar');
        if ($('#sidebar').hasClass('hide-left-bar')) {
            $(".leftside-navigation").getNiceScroll().hide();
        }
        $(".leftside-navigation").getNiceScroll().show();
        $('#main-content').toggleClass('merge-left');
        e.stopPropagation();
        if ($('#container').hasClass('open-right-panel')) {
            $('#container').removeClass('open-right-panel')
        }
        if ($('.right-sidebar').hasClass('open-right-bar')) {
            $('.right-sidebar').removeClass('open-right-bar')
        }

        if ($('.header').hasClass('merge-header')) {
            $('.header').removeClass('merge-header')
        }
    });
    $('.toggle-right-box .fa-bars').click(function (e) {
        $('#container').toggleClass('open-right-panel');
        $('.right-sidebar').toggleClass('open-right-bar');
        $('.header').toggleClass('merge-header');

        e.stopPropagation();
    });

    $('.header,#main-content,#sidebar').click(function () {
        if ($('#container').hasClass('open-right-panel')) {
            $('#container').removeClass('open-right-panel')
        }
        if ($('.right-sidebar').hasClass('open-right-bar')) {
            $('.right-sidebar').removeClass('open-right-bar')
        }

        if ($('.header').hasClass('merge-header')) {
            $('.header').removeClass('merge-header')
        }
    });
    /*==Sidebar Toggle==*/

    //$('.panel .tools .fa').click(function () {
    //    var el = $(this).parents(".panel").children(".panel-body");
    //    if ($(this).hasClass("fa-chevron-down")) {
    //        $(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
    //        el.slideUp(200);
    //    } else {
    //        if ($(this).hasClass("fa-chevron-up")) {
    //            $(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
    //            el.slideDown(200);
    //        }
    //    }
    //});

        //$('.panel .tools .fa-times').click(function () {
        //    $(this).parents(".panel").parent().remove();
    //});




} //init

function initcollapsepanel() {
    $('.panel .tools .fa').click(function () {
        var el = $(this).parents(".panel").children(".floatThead-wrapper").children(".panel-body");
        if (el.hasClass("panel-body")) {
            if ($(this).hasClass("fa-chevron-down")) {
                $(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
                $(this).parents(".panel").children(".floatThead-wrapper").hide();
                el.slideUp(200);
            } else {
                if ($(this).hasClass("fa-chevron-up")) {
                    $(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
                    $(this).parents(".panel").children(".floatThead-wrapper").show();
                    el.slideDown(200);
                }
            }
        }
        else {

            /*----*/
            var el2 = $(this).parents(".panel").children(".panel-body");
            if (el2.hasClass("panel-body")) {
                if ($(this).hasClass("fa-chevron-down")) {
                    $(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
                    el2.slideUp(200);
                } else {
                    if ($(this).hasClass("fa-chevron-up")) {
                        $(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
                        el2.slideDown(200);
                    }
                }
            }
            /*----*/
        }
    });

    //////$('.panel .tools .fa').click(function () {
    //////    var el = $(this).parents(".panel").children(".panel-body");
    //////    if ($(this).hasClass("fa-chevron-down")) {
    //////        $(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
    //////        el.slideUp(200);
    //////    } else {
    //////        if ($(this).hasClass("fa-chevron-up")) {
    //////            $(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
    //////            el.slideDown(200);
    //////        }
    //////    }
    //////});
}


function setlanguage() {
    $("span[name='lbl']").each(function (i, elt) {
        try {
            $(elt).text(langResources[$(elt).attr("caption")]);
            if ($(elt).parent().attr('for')) {
                var xxx = $(elt).parent().attr('for');
                $('#' + xxx).attr('placeholder', $(elt).text());
                //console.log(xxx);
            }

        }
        catch (err) {
            console.log(err);
        }        
    });

    //moment.locale(localStorage.getItem("CurrentLanguage"));
}

var langResources = new Array();
function ImpostLang() {
    //moment.locale("it");
    if (!localStorage.getItem('CurrentLanguage')) {
        localStorage.setItem("CurrentLanguage", "en");
        langResources = $.languages.get()["en"];
        //moment.locale("en");
    }
    else {
        langResources = $.languages.get()[localStorage.getItem("CurrentLanguage")];
        //moment.locale(localStorage.getItem("CurrentLanguage"));
    }

    setlanguage();
}

function userLogOut() {
    $.fn.userLogOut();
}
function supervisorSettings() {
    $.fn.supervisorSettings();
}

function loadhs_Elem() {
    $('#usermenu').empty();
    var voicesMenu = [];
    voicesMenu.push({ Name: "Installation", page: "Device8Plant", tot: 1, stato: 0 });
    voicesMenu.push({ Name: "Controller", page: "Device8Controller", tot: 1, stato: 0 });

    var r = $.DataAccess.hs_Elem_Read(localStorage.getItem("hsId"));
    r.success(function (json) {
        var data = json.d;
        //console.log('loadhs_Elem', data);
        if (data) {
            voicesMenu.push({ Name: "hs_Anzs", page: "Device8Anz", tot: data.totAnz, stato: data.statoAnz });
            voicesMenu.push({ Name: "boilers", page: "Device8Cal", tot: data.totCal, stato: data.statoCal });
            voicesMenu.push({ Name: "circulators", page: "Device8Cir", tot: data.totCir, stato: data.statoCir });
            voicesMenu.push({ Name: "circulatorsM", page: "Device8Cirm", tot: data.totCirm, stato: data.statoCirm });
            voicesMenu.push({ Name: "circulatorsD", page: "Device8Cird", tot: data.totCird, stato: data.statoCird });
            voicesMenu.push({ Name: "circulatorsDM", page: "Device8Cirdm", tot: data.totCirdm, stato: data.statoCirdm });
            voicesMenu.push({ Name: "chronothermostats", page: "Device8Cron", tot: data.totCron, stato: data.statoCron });
            voicesMenu.push({ Name: "chronographs", page: "Device8Cronograph", tot: data.totCronograph, stato: data.statoCronograph });
            voicesMenu.push({ Name: "meters", page: "Device8Ctb", tot: data.totCtb, stato: data.statoCtb });
            voicesMenu.push({ Name: "flowmeters", page: "Device8Ctl", tot: data.totCtl, stato: data.statoCtl });
            voicesMenu.push({ Name: "hs_ctps", page: "Device8Ctp", tot: data.totCtp, stato: data.statoCtp });
            voicesMenu.push({ Name: "hs_ctGas", page: "Device8ctGas", tot: data.totGas, stato: data.statoGas });
            voicesMenu.push({ Name: "hs_grus", page: "Device8Gru", tot: data.totGru, stato: data.statoGru });
            voicesMenu.push({ Name: "temperatureprobes", page: "Device8TempProbe", tot: data.totTemperatureProbes, stato: data.statoTemperatureProbes });
            voicesMenu.push({ Name: "servomotors", page: "Device8Vrd", tot: data.totVrd, stato: data.statoVrd });
            voicesMenu.push({ Name: "hs_pbs", page: "Device8pb", tot: data.totpb, stato: data.statopb });
            voicesMenu.push({ Name: "hs_pms", page: "Device8pm", tot: data.totpm, stato: data.statopm });
            voicesMenu.push({ Name: "hs_tbs", page: "Device8tb", tot: data.tottb, stato: data.statotb });
            voicesMenu.push({ Name: "doors", page: "Device8Door", tot: data.totDoor, stato: data.statoDoor });           
            voicesMenu.push({ Name: "hs_sca", page: "Device8sca", tot: data.totSca, stato: data.statoSca });
            voicesMenu.push({ Name: "sdin_Anzs", page: "Device8sdinAnz", tot: data.totcymt100, stato: data.statocymt100 });
            voicesMenu.push({ Name: "cymt200s", page: "Device8sdincymt200", tot: data.totcymt200, stato: data.statocymt200 });
            voicesMenu.push({ Name: "W0077s", page: "Device8W0077", tot: data.totW0077, stato: data.statoW0077 });
            //voicesMenu.push({ Name: "ExpoSplit", page: "Device_Exposplit", tot: data.totExpoSplit, stato: data.statoExpoSplit });
            voicesMenu.push({ Name: "hs_hvacs", page: "Device8hvac", tot: data.totHvac, stato: data.statoHvac });
            voicesMenu.push({ Name: "hsLuxs", page: "Device8Lux", tot: data.totLux, stato: data.statoLux });
            //voicesMenu.push({ Name: "hsLuxMs", page: "DeviceLuxM", tot: data.totLuxM, stato: data.statoLuxM });
            voicesMenu.push({ Name: "coovs", page: "Device8Coov", tot: data.totCoov, stato: data.statoCoov });
            voicesMenu.push({ Name: "Split", page: "Device8Spl", tot: data.totSpl, stato: data.statoSpl });
            voicesMenu.push({ Name: "Evs", page: "Device8Ev", tot: data.totEv, stato: data.statoEv });
            voicesMenu.push({ Name: "Astrs", page: "Device8Astr", tot: data.totAstr, stato: data.statoAstr});

            $("#tmplMenuDetail").tmpl(voicesMenu).appendTo("#usermenu");
            setlanguage();
           
        } //data
    });
}
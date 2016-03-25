/*
 * hs_Cron_Calendar
 */

$(function () {

    $(document).ready(function () {

        var $hsIdOnLine = false;
        var $CronCod,
            $CronType=0;
        var events = [];
        var $profileDescr=[];
        var editGraphData = [],
            ProfileData = [];

        loadProfileDescr();
        Readhs();
        readCron();       
        //renderCalendar();
        //loadProfiles();
        setlanguage();

        function Readhs() {
            $("#ListPlants").empty();
            var req = $.DataAccess.HeatingSystem_Read(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#hsDescr").text(data.DesImpianto + ' ' + data.Descr);
                    $hsIdOnLine = data.isOnline;
                }
            });
        }

        function readCron() {
            var req = $.DataAccess.hs_Cron_Read(localStorage.getItem("CronId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {                   
                    $("#Descr").text(data.CronDescr);
                    $CronCod = data.CronCod;
                    $CronType = data.CronType;
                }
            });
        }

        //
        function loadProfileDescr() {
            var req = $.DataAccess.hs_Cron_Profile_Descr_List(localStorage.getItem("CronId"));
            req.success(function (json) {
                $profileDescr = json.d;
                renderCalendar();
                loadProfiles();
            });            
        }

        $('#btnCallSchedule').on('click', function () {
            $.module.load('Impianti/Operators/hs_Cron_Tasks');
        });

        $('#btnClose').on('click', function (e) {
            if ($CronType == 0) { $.module.load('Impianti/Operators/Device8Cron'); }
            else { $.module.load('Impianti/Operators/Device8Cronograph'); }
        });

        /* initialize the calendar
         ------------------------------------------------------------------------*/
        function renderCalendar() {
            $('#calendar').fullCalendar({
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month'
                },
                lang: 'it',
                aspectRatio: 1.8, //height: 500, // 
                editable: false,
                droppable: true, // this allows things to be dropped onto the calendar !!!
                drop: function (date, allDay) { // this function is called when something is dropped
                    // retrieve the dropped element's stored Event Object
                    var originalEventObject = $(this).data('eventObject');
                    // we need to copy it, so that multiple events don't have a reference to the same object
                    var copiedEventObject = $.extend({}, originalEventObject);
                    updateCalendar(date, originalEventObject, copiedEventObject);
                },
                eventSources: [
                    {
                        events: function (start, end, timezone, callback) {
                            var calendar = $('#calendar').fullCalendar('getCalendar');
                            //var fromDate = calendar.moment(start).format('LLL');
                            //var toDate = calendar.moment(end).format('LLL');
                            var fromDate = calendar.moment(start);
                            var toDate = calendar.moment(end);
                            callback(loadCalendarEvents(fromDate, toDate));
                        }
                    }
                ]
            });
        }
        /*-----------------------------------------------------------------------*/

        /*
        Calendar
        -------------------------------------------------------------------------*/
        function loadCalendarEvents(fromDate, toDate) {
            $("body").addClass("loading");
            $('#calendar').fullCalendar('removeEvents');
            events = [];
            var date = $("#calendar").fullCalendar('getDate');
            var currYear = moment(date).year();
            var currMonth = moment(date).month() + 1;

            $('#Descr_Send').text(moment(date).format('MMMM') + ' ' + currYear);

            var CronId = localStorage.getItem("CronId");
            var req = $.DataAccess.hs_Cron_Calendar_Read(CronId, currYear, currMonth);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    var RealMonthData = [],
                      DesiredMonthData = [],
                      TasksForDesired = [];
                    for (var i = 1; i < daysInMonth(currMonth, currYear) + 1 ; i++) {
                        var dd = moment([currYear, currMonth - 1, i]);
                        RealMonthData.push({ year: currYear, DayMonth: dd, DayProfile: data.RealMonthData[i - 1] });
                        DesiredMonthData.push({ year: currYear, DayMonth: dd, DayProfile: data.DesiredMonthData[i - 1] });
                        TasksForDesired.push({ year: currYear, DayMonth: dd, DayProfile: data.TasksForDesired[i - 1] });
                    } //end for                   

                    for (var i = 0; i < RealMonthData.length  ; i++) {
                        var bgColor = '';
                        /*quando il profilo desiderato è diverso da pianificato: l'evento viene colorato di rosso*/
                        if (DesiredMonthData[i].DayProfile != TasksForDesired[i].DayProfile) { bgColor = '#ff0000'; }

                        var endTask = moment(DesiredMonthData[i].DayMonth).add(1, 'days');
                        endTask = moment(endTask).subtract(1, 'minutes');
                        events.push({
                            id: i,
                            title: decodeProfile(DesiredMonthData[i].DayProfile), // 'profilo: ' + DesiredMonthData[i].DayProfile,
                            start: DesiredMonthData[i].DayMonth,
                            end: endTask,
                            ProfileNr: DesiredMonthData[i].DayProfile,
                            backgroundColor: bgColor,
                            allDay: true
                        });
                    }// end for                   
                    $('#calendar').fullCalendar('addEventSource', events);
                } //data
            });

            Calendar_businesshour(currYear, currMonth);
            $("body").removeClass("loading");

            return events;
        }

        function updateCalendar(date, originalEventObject, copiedEventObject) {
            for (var i = 0; i < events.length  ; i++) {
                if (moment(events[i].start).date() == moment(date).date()) {

                    $('#calendar').fullCalendar('removeEvents', moment(date).date() - 1);
                    // assign it the date that was reported
                    copiedEventObject.id = moment(date).date() - 1
                    copiedEventObject.start = date;
                    copiedEventObject.allDay = true;
                    
                    if (events[i].ProfileNr != originalEventObject.ProfileNr) {
                        copiedEventObject.backgroundColor = '#ff0000';
                        events[i].ProfileNr = originalEventObject.ProfileNr * -1;
                    }
                    else {
                        events[i].ProfileNr = originalEventObject.ProfileNr;
                    }
                    copiedEventObject.ProfileNr = originalEventObject.ProfileNr;                    
                    

                    var CronId = localStorage.getItem("CronId");
                    var date = $("#calendar").fullCalendar('getDate');
                    var currYear = moment(date).year();
                    var currMonth = moment(date).month() + 1;
                    var strmonthData = '';
                    for (var i = 0; i < events.length  ; i++) {
                        strmonthData += events[i].ProfileNr + ";"
                    }
                    var r = $.DataAccess.hs_Cron_Calendar_UpdateDesired(CronId, currYear, currMonth, strmonthData);
                    r.success(function (json) {
                        var data = json.d;
                        if (data == true) {
                            $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
                            console.log('copiedEventObject', copiedEventObject);
                        }
                        else {
                            toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                        }
                    });
                }
            }
        }

        function daysInMonth(month, year) {
            return new Date(year, month, 0).getDate();
        }

        function decodeProfile(DayProfile) {
            var retVal = "profilo:" + DayProfile;
            for (var i = 0; i < $profileDescr.length  ; i++) {
                if ($profileDescr[i].ProfileNr==DayProfile){
                    retVal=$profileDescr[i].descr;
                }
            }
            return retVal;
        }
        /*-----------------------------------------------------------------------*/

        /*
        hs_businesshour
        -------------------------------------------------------------------------*/
        function Calendar_businesshour(calYear, calMonth) {
            var req = $.DataAccess.hs_businesshour_ListByMonth(localStorage.getItem("hsId"), calYear, calMonth);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    for (var i = 0; i < data.length  ; i++) {
                        //console.log('businesshour date', moment(data[i].StartDate).format('YYYY-MM-DD'));
                        var d2find = moment(data[i].StartDate).format('YYYY-MM-DD');
                        var obj2find = $('.fc-day-number[data-date="' + d2find + '"]');
                        //console.log('obj2find.text()', obj2find.text());                        
                        if (data[i].isClosedTime) {
                            //<i class="fa fa-bookmark-o"></i>
                            //obj2find.text(data[i].Subject + ' ' + obj2find.text());
                            obj2find.html('<i class="fa fa-bookmark pull-left"></i> ' + obj2find.text());
                            obj2find.addClass('fc-nonbusiness');
                            obj2find.addClass('minktooltip');
                            obj2find.attr('title', data[i].Subject);
                        } //isClose
                    } //end for
                    $('.minktooltip').tooltipster();
                } //data
            });
        }

        /*-----------------------------------------------------------------------*/

        /*
        Send calendar to plc
        -------------------------------------------------------------------------*/
        $('#bntSend').on('click', function () {
            var CronId = localStorage.getItem("CronId");
            var date = $("#calendar").fullCalendar('getDate');
            var currYear = moment(date).year();
            var currMonth = moment(date).month() + 1;
            var req = $.DataAccess.hs_Cron_Calendar_Set(CronId, currYear, currMonth);
            req.success(function (json) {
                var data = json.d;
                if (data == true) {
                    //$('#calendar').fullCalendar('removeEvents');
                    $('#calendar').fullCalendar('destroy');
                    renderCalendar();
                    $("#calendar").fullCalendar("Refresh");

                    var anno = moment().year();
                    var mese = moment().month() + 1;
                    if (anno == currYear && mese == currMonth) { $.DataAccess.hs_Cron_Restart(CronId); }

                }
                else {
                    toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                }
            });
        });
        /*-----------------------------------------------------------------------*/

        /*
        profiles
        -------------------------------------------------------------------------*/
        var editGraphData = []
        ProfileData = [];
        var $plotupd;

        var options = {
            series: {
                lines: {
                    show: true
                },
                points: {
                    show: false
                }
            },
            grid: {
                hoverable: true,
                clickable: true
            },
            xaxis: {
                mode: "time",
                timeformat: "%H:%M"
            },
            selection: {
                mode: "x"
            }
        };
        function loadProfiles() {
            $currYear = $('#calendar').fullCalendar('getDate').year();
            $("#CronoProfilesList").empty();
            var r = $.DataAccess.hs_cron_Profile_List(localStorage.getItem("CronId"), $currYear);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        populateTable(data[i]);
                    }
                    initdd();
                }
            });
        }

        function getProfile(hsId, CronCod, ProfileY, ProfileNr) {
            var r = $.DataAccess.hs_cron_Profile_get(localStorage.getItem("hsId"), CronCod, ProfileY, ProfileNr);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    populateTable(data);
                }
                else {
                    toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                }
            });
        }

        function populateTable(data) {
            $("#tmplProfile").tmpl(data).appendTo("#CronoProfilesList");
            var div2plot = "#placeholder_" + data.ProfileNr;

            editGraphData = [];
            ProfileData = [];
            var d0 = new Date(2015, 1, 1),
                d1 = new Date(d0);
            for (var i = 0; i < 96; i++) {
                var temp = parseFloat(data.ProfileData[i]).toFixed(1);
                $('#' + i).text(temp);
                var date1 = new Date(d1);
                editGraphData.push([date1, temp]);
                ProfileData.push(temp);
                d1 = new Date(moment(d0).add(15, 'm'));
                d0 = new Date(d1);
            }
            var graphData = [];
            graphData.push({ data: editGraphData });
            $.plot(div2plot, graphData, options)

            //var d1 = [];
            //for (var i = 0; i < 97; i++) {
            //    d1.push([i, data.ProfileData[i]]);
            //}
            //$.plot(div2plot, [{ data: d1 }]);
        }

        function initdd() {
            $('#CronoProfilesList li.external-event').each(function () {
                var descr = $.trim($(this).find('#descr').text());
                 var eventObject = {
                    title: descr,// 'profilo: ' + this.id.replace("Profile_", ""), 
                    ProfileNr: this.id.replace("Profile_", ""),
                    descr: descr,
                    backgroundColor: '',
                    allDay: true
                };

                // store the Event Object in the DOM element so we can get to it later
                $(this).data('eventObject', eventObject);

                // make the event draggable using jQuery UI
                //$(this).draggable({
                //    zIndex: 999,
                //    revert: true,      // will cause the event to go back to its
                //    revertDuration: 0  //  original position after the drag
                //});

                $(this).draggable({
                    revert: 'invalid',
                        revertDuration: 0,
                    helper: 'clone',
                });

            });
        }

        /*-----------------------------------------------------------------------*/

    }); //document ready

});
$(function () {

    $(document).ready(function () {

        var $hsIdOnLine = false;
        var $Cod,
            $AstrId;
        var events = [];
        var $profileDescr = [];
        var editGraphData = [],
            ProfileData = [];
        var $ProfileNr;

        var $tabledata,
            $ProfileTableData;

        loadProfileDescr();
        Readhs();
        readAstr();
        loadAstr();
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

        function readAstr() {
            var req = $.DataAccess.hs_Astr_Read(localStorage.getItem("AstrId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#Descr").text(data.Descr);
                    $od = data.Cod;
                    $AstrId = data.Id;
                }
            });
        }

        function loadAstr() {
            $tabledata = [];
            var r = $.DataAccess.hs_Astr_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $tabledata = data;
                    console.log($tabledata);
                }
            });
        }

        /* crono navigation
        ------------------------------------------------------------------------------------*/
        $.fn.go2PrevElement = function () {
            var ele2Go = 0;
            var currentId = localStorage.getItem("AstrId");
            for (var i = 0; i < $tabledata.length; i++) {
                if ($tabledata[i].Id == currentId) {
                    if (i > 0) {
                        ele2Go = $tabledata[i - 1].Id;
                    }
                }
            }

            if (ele2Go == 0) {
                ele2Go = $tabledata[i - 1].Id;
            }
            localStorage.setItem("AstrId", ele2Go);
            $('#calendar').fullCalendar('destroy');
            loadProfileDescr();
            Readhs();
            readAstr();
            loadAstr();
            setlanguage();
            console.log('prev:', ele2Go);
        }
        $.fn.go2NextElement = function () {
            var ele2Go = 0;
            var currentId = localStorage.getItem("AstrId");
            for (var i = 0; i < $tabledata.length; i++) {
                if ($tabledata[i].Id == currentId) {
                    if (i < $tabledata.length) {
                        ele2Go = $tabledata[i + 1].Id;
                    }
                }
            }
            if (ele2Go == 0) {
                ele2Go = $tabledata[$tabledata.lengt].Id;
            }
            localStorage.setItem("AstrId", ele2Go);

            $('#calendar').fullCalendar('destroy');
            loadProfileDescr();
            Readhs();
            readAstr();
            loadAstr();
            setlanguage();
            console.log('next:', ele2Go);
        }
        /*----------------------------------------------------------------------------------*/

        //
        function loadProfileDescr() {
            var req = $.DataAccess.hs_Astr_Profile_Descr_List(localStorage.getItem("AstrId"));
            req.success(function (json) {
                $profileDescr = json.d;
                renderCalendar();
                loadProfiles();
            });
        }

        $('#btnCallSchedule').on('click', function () {
            $.module.load('Impianti/supervisors/hs_Astr_Tasks');
        });

        $('#btnClose').on('click', function (e) {
            $.module.load('Impianti/supervisors/Device8Astr');
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
                    console.log('originalEventObject', originalEventObject);
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
            $('#Descr_ReplaceTasks').text(moment(date).format('MMMM') + ' ' + currYear);


            var AstrId = localStorage.getItem("AstrId");
            var req = $.DataAccess.hs_Astr_Calendar_Read(AstrId, currYear, currMonth);
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
                        /*
                        quando il valore del profilo presente sul plc è diverso da quello desiderato
                        l'evento viene colorato di rosso
                        if (DesiredMonthData[i].DayProfile != TasksForDesired[i].DayProfile) { bgColor = '#ffb773'; }
                        else { if (RealMonthData[i].DayProfile != DesiredMonthData[i].DayProfile) { bgColor = '#ff0000'; } }
                        */

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
                if (moment(events[i].start).year() == moment(date).year() && moment(events[i].start).month() == moment(date).month()) {

                    console.log('moment(events[i].start).year() =' + moment(events[i].start).year());
                    console.log('moment(date).month() = ' + moment(date).month());

                    var AstrId = localStorage.getItem("AstrId");
                    //var date = $("#calendar").fullCalendar('getDate');
                    var currYear = moment(date).year();
                    var currMonth = moment(date).month() + 1;
                    var strmonthData = '';

                    console.log('date= ' + date + ' ' + moment(date).format("DD/MM/YYYY") + ' currYear=' + currYear + ' currMonth=' + currMonth);



                    $('#calendar').fullCalendar('removeEvents', moment(date).date() - 1);
                    // assign it the date that was reported
                    copiedEventObject.id = moment(date).date() - 1;
                    copiedEventObject.start = date;
                    copiedEventObject.allDay = true;

                    //var eventYear = moment(date).year();
                    //var eventMonth = moment(date).month() + 1;
                    //var eventDay = moment(date).DayMonth();

                    var check = moment(date, 'YYYY/MM/DD');
                    console.log('check', check);
                    var eventYear = check.format('YYYY');
                    var eventMonth = check.format('M');
                    var eventDay = check.format('D');


                    console.log('eventYear', eventYear, 'eventMonth', eventMonth, 'eventDay', eventDay);
                    for (var x = 0; x < events.length  ; x++) {
                        var pcheck = moment(events[x].start, 'YYYY/MM/DD');
                        var y = pcheck.format('YYYY');
                        var m = pcheck.format('M');;
                        var d = pcheck.format('D');
                        console.log('y', y, 'm', m, 'd', d);

                        if (eventYear == y && eventMonth == m && eventDay == d) {
                            console.log('profilo trovato', events[x].ProfileNr, 'profilo evento', originalEventObject.ProfileNr);
                            if (events[x].ProfileNr != originalEventObject.ProfileNr) {
                                copiedEventObject.backgroundColor = '#ff0000';
                                events[x].ProfileNr = originalEventObject.ProfileNr;
                            }
                            else {
                                events[x].ProfileNr = originalEventObject.ProfileNr;
                            }
                            copiedEventObject.ProfileNr = originalEventObject.ProfileNr;
                            break;
                        }
                    }

                    //console.log('ProfileNr= ' + events[i].ProfileNr + ' copiedEventObject.ProfileNr=' + copiedEventObject.ProfileNr);

                    //if (events[i].ProfileNr != originalEventObject.ProfileNr) {
                    //    copiedEventObject.backgroundColor = '#ff0000';
                    //    events[i].ProfileNr = originalEventObject.ProfileNr;
                    //}
                    //else {
                    //    events[i].ProfileNr = originalEventObject.ProfileNr;
                    //}
                    //copiedEventObject.ProfileNr = originalEventObject.ProfileNr;

                    //console.log('events', events);

                    for (var i = 0; i < events.length  ; i++) {
                        var y = moment(events[i].start).year();
                        var m = moment(events[i].start).month() + 1;
                        //console.log('id= ' + events[i].id + ' anno= ' + y + ' mese= ' + m + ' profilo=' + events[i].ProfileNr);

                        if (currYear == y && currMonth == m) {
                            strmonthData += events[i].ProfileNr + ";"
                        }
                        //console.log('strmonthData= ' + strmonthData);
                    }
                    var r = $.DataAccess.hs_Astr_Calendar_UpdateDesired(AstrId, currYear, currMonth, strmonthData);
                    r.success(function (json) {
                        var data = json.d;
                        if (data == true) {
                            $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
                            //console.log('copiedEventObject', copiedEventObject);
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
                if ($profileDescr[i].ProfileNr == DayProfile) {
                    retVal = $profileDescr[i].descr;
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
            $("body").addClass("loading");
            var AstrId = localStorage.getItem("AstrId");
            var date = $("#calendar").fullCalendar('getDate');
            var currYear = moment(date).year();
            var currMonth = moment(date).month() + 1;
            var req = $.DataAccess.hs_Astr_Calendar_Set(AstrId, currYear, currMonth);
            req.success(function (json) {
                var data = json.d;
                if (data == true) {
                    //$('#calendar').fullCalendar('removeEvents');
                    $('#calendar').fullCalendar('destroy');
                    renderCalendar();
                    $("#calendar").fullCalendar("Refresh");

                    var anno = moment().year();
                    var mese = moment().month() + 1;
                    if (anno == currYear && mese == currMonth) { $.DataAccess.hs_Astr_Restart(AstrId); }
                    $("body").removeClass("loading");

                }
                else {
                    toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    $("body").removeClass("loading");
                }
            });
        });
        /*-----------------------------------------------------------------------*/

        /*
        restore scheduling
        -------------------------------------------------------------------------*/
        $('#bntRestoreTask').on('click', function () {
            $("body").addClass("loading");
            var AstrId = localStorage.getItem("AstrId");
            var date = $("#calendar").fullCalendar('getDate');
            var currYear = moment(date).year();
            var currMonth = moment(date).month() + 1;
            var req = $.DataAccess.hs_Astr_Calendar_replaceDesiredWithTask(AstrId, currYear, currMonth);
            req.success(function (json) {
                var data = json.d;
                if (data == true) {
                    events = [];
                    $('#calendar').fullCalendar('removeEvents');
                    $('#calendar').fullCalendar('destroy');
                    renderCalendar();
                    $("#calendar").fullCalendar("Refresh");

                    $("body").removeClass("loading");

                    $('#calendar').fullCalendar('gotoDate', date);

                }
                else {
                    toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    $("body").removeClass("loading");
                }
            });
        });
        /*-----------------------------------------------------------------------*/

        /*
        profiles
        -------------------------------------------------------------------------*/

        /* crono navigation
        ------------------------------------------------------------------------------------*/
        $.fn.go2PrevProfile = function () {
            var ele2Go = 0;

            for (var i = 0; i < $ProfileTableData.length; i++) {
                if ($ProfileTableData[i].ProfileNr == $ProfileNr) {
                    if (i > 0) {
                        ele2Go = $ProfileTableData[i - 1].ProfileNr;
                    }
                }
            }
            if (ele2Go == 0) {
                ele2Go = $ProfileTableData[1].ProfileNr;
            }
            $.fn.CallEditProfile(ele2Go);

        }
        $.fn.go2NextProfile = function () {
            var ele2Go = 0;

            for (var i = 0; i < $ProfileTableData.length; i++) {
                if ($ProfileTableData[i].ProfileNr == $ProfileNr) {
                    if (i < $ProfileTableData.length) {
                        ele2Go = $ProfileTableData[i + 1].ProfileNr;
                    }
                }
            }
            if (ele2Go == 0) {
                ele2Go = $tabledata[$tabledata.lengt].ProfileNr;
            }
            $.fn.CallEditProfile(ele2Go);
        }
        /*----------------------------------------------------------------------------------*/


        // var editGraphData = []
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
            $ProfileTableData = [];
            $currYear = $('#calendar').fullCalendar('getDate').year();
            $("#CronoProfilesList").empty();
            var r = $.DataAccess.hs_Astr_Profile_List(localStorage.getItem("AstrId"), $currYear);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $ProfileTableData = data;
                    for (var i = 0; i < data.length; i++) {
                        populateTable(data[i]);
                    }
                    initdd();
                }
            });
        }

        function getProfile(hsId, Cod, ProfileY, ProfileNr) {
            var r = $.DataAccess.hs_Astr_Profile_get(localStorage.getItem("hsId"), Cod, ProfileY, ProfileNr);
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
            //var div2plot = "#placeholder_" + data.ProfileNr;
            //var d1 = [];
            //for (var i = 0; i < 97; i++) {
            //    d1.push([i, data.ProfileData[i]]);
            //}
            //$.plot(div2plot, [{ data: d1 }]);


            var div2plot = "#placeholder_" + data.ProfileNr;
            var d1 = [];
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
            $.plot(div2plot, graphData, options);
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

        /*
        Edit profile
        -------------------------------------------------------------------------*/
        $.fn.CallEditProfile = function (ProfileNr) {
            $ProfileNr = ProfileNr;
            $('#divMain').hide();
            $('#DivEditProfile').show();

            var date = $("#calendar").fullCalendar('getDate');
            var currYear = moment(date).year();
            var currMonth = moment(date).month() + 1;
            readProfile(localStorage.getItem("AstrId"), currYear, ProfileNr);
        }

        $('#btnCloseEditProfile').on('click', function () {
            $('#divMain').show();
            $('#DivEditProfile').hide();
            loadProfiles();
        });

        function readProfile(AstrId, ProfileY, ProfileNr) {
            console.log('readProfile', AstrId, ProfileY, ProfileNr);
            editGraphData = [];
            ProfileData = [];
            var r = $.DataAccess.hs_Astr_Profile_Read(AstrId, ProfileY, ProfileNr);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#descrProfile').val(data.descr);
                    var d0 = new Date(2015, 1, 1);
                    d1 = new Date(d0);

                    for (var i = 0; i < 96; i++) {
                        var temp = parseFloat(data.ProfileData[i]).toFixed(1);
                        $('#' + i).text(temp);
                        //var date1 = new Date(d1);
                        var date1 = new Date(moment(d1).add(1, 'h'));

                        editGraphData.push([date1, temp]);
                        ProfileData.push(temp);
                        d1 = new Date(moment(d0).add(15, 'm'));
                        d0 = new Date(d1);

                    }
                    var graphData = [];
                    graphData.push({ label: 'tset', data: editGraphData });

                    console.log('editGraphData', editGraphData);
                    $.plot("#Div1", graphData, options);
                }
            });

            //controllo se esiste un profilo dell'anno precedente
            $('#btnCopyFromPast').hide();
            var r = $.DataAccess.hs_Astr_Profile_Read(AstrId, ProfileY - 1, ProfileNr);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#btnCopyFromPast').show();
                }
            });
        }

        $('.DataProfile').on('click tap', function () {
            $('#' + this.id).text($('#Tset').val());
            ProfileData[this.id] = $('#Tset').val();
            redrawGrapph();
        });

        $('.HProfile').on('click tap', function () {
            var h = Number(this.id.replace("h_", ""));
            var idx = h * 4;
            $('#' + idx).text($('#Tset').val());
            ProfileData[idx] = $('#Tset').val();
            idx = idx + 1;
            $('#' + idx).text($('#Tset').val());
            ProfileData[idx] = $('#Tset').val();
            idx = idx + 1;
            $('#' + idx).text($('#Tset').val());
            ProfileData[idx] = $('#Tset').val();
            idx = idx + 1;
            $('#' + idx).text($('#Tset').val());
            ProfileData[idx] = $('#Tset').val();
            redrawGrapph();
        });

        function redrawGrapph() {
            editGraphData = [];
            var d0 = new Date(2015, 1, 1),
                d1 = new Date(d0);
            for (var i = 0; i < 96; i++) {
                var temp = parseFloat(ProfileData[i]).toFixed(1);
                $('#' + i).text(temp);
                //var date1 = new Date(d1);
                var date1 = new Date(moment(d1).add(1, 'h'));
                editGraphData.push([date1, temp]);
                d1 = new Date(moment(d0).add(15, 'm'));
                d0 = new Date(d1);
            }
            var graphData = [];
            graphData.push({ label: 'tset', data: editGraphData });
            $.plot("#Div1", graphData, options);
        }

        $('#btnGetProfile').on('click', function () {
            var date = $("#calendar").fullCalendar('getDate');
            var currYear = moment(date).year();

            $("body").addClass("loading");
            var r = $.DataAccess.hs_Astr_Profile_get(localStorage.getItem("hsId"), $Cod, currYear, $ProfileNr);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    readProfile(data.Id, data.ProfileY, data.ProfileNr);
                    populateTable(data);
                    $("body").removeClass("loading");
                }
                else {
                    toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    $("body").removeClass("loading");
                }
            });
        });

        $('#btnUpdProfile').on('click', function () {
            var date = $("#calendar").fullCalendar('getDate');
            var currYear = moment(date).year();
            $("body").addClass("loading");
            //console.log('CronCod=' + $CronCod + ' ProfileY=' + $ProfileY + ' ProfileNr=' + $ProfileNr);
            var strProfiledata = '';
            for (var i = 0; i < 96; i++) {
                strProfiledata += ProfileData[i] + ";"
            }
            var r = $.DataAccess.hs_Astr_Profile_set(localStorage.getItem("hsId"), $Cod, currYear, $ProfileNr, strProfiledata);
            r.success(function (json) {
                var data = json.d;
                if (data == true) {
                    $('#lastupdate').text(moment().format('HH:mm'));
                    getProfile(localStorage.getItem("hsId"), $Cod, currYear, $ProfileNr);
                    $("body").removeClass("loading");
                    toastr["success"](langResources['msg4operationok'], langResources['yes']);
                }
                else {
                    $("body").removeClass("loading");
                    toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                }
            });
        });

        /*-----------------------------------------------------------------------*/

        /*
        copy Profile
        -------------------------------------------------------*/
        $('#btnCallCopy').on('click', function () {
            $('#ModalCrono4Copy').modal('show');
            $("#Crono4CopyList").empty();
            var r = $.DataAccess.hs_Astr_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplCrono4CopyList").tmpl(data).appendTo("#Crono4CopyList");
                    setlanguage();
                }
            });
        });

        $.fn.selectCron4Copy = function (Id) {
            console.log('selectCron4Copy', Id);

            var req = $.DataAccess.hs_Astr_Read(Id);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    loadProfiles4Copy(data.Id, data.Cod);
                }
            });
        }

        function loadProfiles4Copy(Id, Cod) {
            console.log('loadProfiles4Copy', Id, Cod);

            var date = $("#calendar").fullCalendar('getDate');
            var currYear = moment(date).year();

            $('#ModalCrono4Copy').modal('hide');
            $('#ModalCronoProfiles').modal('show');
            $("#Crono4CopyList").empty();
            $("#CronoProfilesList4Copy").empty();
            if ($hsIdOnLine == true) {
                var r = $.DataAccess.hs_Astr_Profile_ReadSync(Id, currYear, 0);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable4Copy(data); }
                    else { getProfile(localStorage.getItem("hsId"), Cod, currYear, 0); }
                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(Id, currYear, 1);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable4Copy(data); }
                    else { getProfile(localStorage.getItem("hsId"), Cod, currYear, 1); }
                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(Id, currYear, 2);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable4Copy(data); }
                    else { getProfile(localStorage.getItem("hsId"), Cod, currYear, 2); }
                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(Id, currYear, 3);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable4Copy(data); }
                    else { getProfile(localStorage.getItem("hsId"), Cod, currYear, 3); }
                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(Id, currYear, 4);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable4Copy(data); }
                    else { getProfile(localStorage.getItem("hsId"), Cod, currYear, 4); }
                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(Id, currYear, 5);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable4Copy(data); }
                    else { getProfile(localStorage.getItem("hsId"), Cod, currYear, 5); }
                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(Id, currYear, 6);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable4Copy(data); }
                    else { getProfile(localStorage.getItem("hsId"), Cod, currYear, 6); }
                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(Id, currYear, 7);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable4Copy(data); }
                    else { getProfile(localStorage.getItem("hsId"), Cod, currYear, 7); }
                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(Id, currYear, 8);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable4Copy(data); }
                    else { getProfile(localStorage.getItem("hsId"), Cod, currYear, 8); }
                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(Id, currYear, 9);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable4Copy(data); }
                    else { getProfile(localStorage.getItem("hsId"), Cod, currYear, 9); }
                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(Id, currYear, 10);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable4Copy(data); }
                    else { getProfile(localStorage.getItem("hsId"), Cod, currYear, 10); }
                });
            }
        }

        function populateTable4Copy(data) {
            console.log('populateTable4Copy', data);
            $("#tmplProfile4Copy").tmpl(data).appendTo("#CronoProfilesList4Copy");

            //var div2plot = "#placeholder_" + data.ProfileNr;
            var div2plot4Copy = "#placeholder4Copy_" + data.ProfileNr;
            var d1 = [];
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
            // $.plot(div2plot, graphData, options);
            $.plot(div2plot4Copy, graphData, options);
        }

        $.fn.copyProfile = function (Id, ProfileY, ProfileNr) {
            editGraphData = [];
            ProfileData = [];
            var r = $.DataAccess.hs_Astr_Profile_Read(d, ProfileY, ProfileNr);
            r.success(function (json) {
                var data = json.d;
                if (data) {
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
                    graphData.push({ label: 'tset', data: editGraphData });
                    $.plot("#Div1", graphData, options);

                    $('#ModalCronoProfiles').modal('hide');
                }
            });

        }
        /*------------------------------------------------------*/

    }); //document ready

});
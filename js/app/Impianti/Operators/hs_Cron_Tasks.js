$(function () {

    $(document).ready(function () {
        var $hsIdOnLine = false;
        var $selectedDate = moment().format('DD/MM/YYYY'),
            $currMonth,
            $currYear,
            $CronCod,
            $CronType = 0;
        var $gotFocus;

        Readhs();
        readCron();
        TaskList();
        setlanguage();

        $('#calendar-container').datepicker({
            weekStart: 1,
            language: localStorage.getItem("CurrentLanguage"),
            todayHighlight: true
        }).on('changeDate', function (ev) {
            //$selectedDate = ev.date.valueOf();
            $selectedDate = moment(ev.date.valueOf()).format('DD/MM/YYYY');
            $currMonth = moment(ev.date.valueOf()).month() + 1;
            $currYear = moment(ev.date.valueOf()).year();
            ListCurrent();
            CronCalendarRead();
        }).on('changeMonth', function (ev) {
            $currMonth = moment(ev.date).month() + 1;
            $currYear = moment(ev.date.valueOf()).year();
            CronCalendarRead();
        }).on('changeYear', function (ev) {
            $currMonth = moment(ev.date.valueOf()).month() + 1;
            $currYear = moment(ev.date).year();
            CronCalendarRead();
        });

        $('#calendar-container').datepicker('setDate', new Date());
        CronCalendarRead();

        $('.dpd1').datepicker({
            format: 'dd/mm/yyyy',
            language: localStorage.getItem("CurrentLanguage"),
            orientation: "top left"
        });
 
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

        /*
        List
        -------------------------------------------------------------------------*/
        function TaskList() {
            //ListCurrent();
            ListAll();
        }

        function ListCurrent() {
            console.log('ListCurrent', $selectedDate);
            $("#currentTaskList").empty();
            var req = $.DataAccess.hs_Cron_Profile_Tasks_ListCurrent(localStorage.getItem("CronId"), $selectedDate);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplCron").tmpl(data).appendTo("#currentTaskList");
                    setlanguage();
                }
            });
        }

        function ListAll() {
            $("#allTaskList").empty();
            var req = $.DataAccess.hs_Cron_Profile_Tasks_List(localStorage.getItem("CronId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {  
                    $("#tmplCron").tmpl(data).appendTo("#allTaskList");
                    setlanguage();
                }
            });
        }

        $('#btnCallCalendar').on('click', function () {
            $.module.load('Impianti/Operators/hs_Cron_Calendar');
        });
        /*-----------------------------------------------------------------------*/

        /*
        Add
        -------------------------------------------------------------------------*/
        $('#btnCallAdd').on('click', function (e) {
            $('#list').hide();
            $('#edit').hide();
            $('#Subject_Add').val('');
            $('#StartDate_Add').val('');
            $('#EndDate_Add').val('');
            $('#yearsRepeatable_add').bootstrapSwitch('state', true, true);
            $('#chkMonday_add').bootstrapSwitch('state', true, true);
            $('#chkTuesday_add').bootstrapSwitch('state', true, true);
            $('#chkWednesday_add').bootstrapSwitch('state', true, true);
            $('#chkThursday_add').bootstrapSwitch('state', true, true);
            $('#chkFriday_add').bootstrapSwitch('state', true, true);
            $('#chkSaturday_add').bootstrapSwitch('state', true, true);
            $('#chkSunday_add').bootstrapSwitch('state', true, true);
            $('#add').show();

        });

        $('#btnCloseAdd').on('click', function () {
            $('#add').hide();
            $('#list').show();           
        });

        $('#btnAdd').on('click', function () {
            var CronId = localStorage.getItem("CronId"),
                ProfileNr = $('#ProfileNr_Add').val(), 
                Subject = $('#Subject_Add').val(),
                StartDate = $('#StartDate_Add').val(),
                EndDate = $('#EndDate_Add').val(),
                yearsRepeatable = $('#yearsRepeatable_add').bootstrapSwitch('state'),
                chkMonday = $('#chkMonday_add').bootstrapSwitch('state'),
                chkTuesday = $('#chkTuesday_add').bootstrapSwitch('state'),
                chkWednesday = $('#chkWednesday_add').bootstrapSwitch('state'),
                chkThursday = $('#chkThursday_add').bootstrapSwitch('state'),
                chkFriday = $('#chkFriday_add').bootstrapSwitch('state'),
                chkSaturday = $('#chkSaturday_add').bootstrapSwitch('state'),
                chkSunday = $('#chkSunday_add').bootstrapSwitch('state');
            if (checkAdd(ProfileNr, Subject, StartDate) == false) {
                var reqAdd = $.DataAccess.hs_Cron_Profile_Tasks_Add(CronId, ProfileNr, Subject, StartDate, EndDate, chkMonday, chkTuesday, chkWednesday, chkThursday, chkFriday, chkSaturday, chkSunday, yearsRepeatable);
                reqAdd.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        TaskList();
                        ListCurrent();
                        $('#add').hide();                        
                        $('#list').show();
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }
            else {
                toastr["warning"](langResources['msg4novaliddata'], langResources['alert']);
            }
        });
        
        function checkAdd(ProfileNr, Subject, StartDate) {
            var retVal = false;
            var error_present = false;
            if (!error_present) {
                if (ProfileNr == '') {
                    $('#ProfileNr_Add').addClass("error");
                    error_present = true;
                }
            }
            if (!error_present) {
                if (Subject == '') {
                    $('#Subject_Add').addClass("error");
                    error_present = true;
                }
            }
            if (!error_present) {
                if (StartDate == '') {
                    $('#StartDate_Add').addClass("error");
                    error_present = true;
                }
            }
            retVal = error_present;
            return retVal;
        }

        $('#ProfileNr_Add').on('focus', function () {
            $gotFocus = 'ProfileNr_Add';
            loadProfiles();
            $("#ModalCronoProfiles").modal('show');
        });

        $('#btnClose').on('click', function (e) {
            if ($CronType == 0) { $.module.load('Impianti/Operators/Device8Cron'); }
            else { $.module.load('Impianti/Operators/Device8Cronograph'); }
        });
        /*-----------------------------------------------------------------------*/

        /*
        copy
        -------------------------------------------------------------------------*/
        $('#btnCallCopy').on('click', function () {
            List4Copy();
            $("#ModalCopyTask").modal('show');
        });

        function List4Copy() {
            $("#CopyTaskList").empty();
            var req = $.DataAccess.hs_Cron_Profile_Tasks_ListAll();
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    var data2Copy = [];
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].CronCod != $CronCod) {
                            data2Copy.push(data[i]);
                        }
                    }//end for
                    $("#tmplCopyTask").tmpl(data2Copy).appendTo("#CopyTaskList");
                    setlanguage();
                }
            });
        }

        $.fn.selectTask2Copy = function (TaskId) {
            var reqCopy = $.DataAccess.hs_Cron_Profile_Tasks_Read(TaskId);
            reqCopy.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#Subject_Add').val(data.Subject);
                    $('#ProfileNr_Add').val(data.ProfileNr);
                    $('#StartDate_Add').val(moment(data.StartDate).format('DD/MM/YYYY HH:mm'));
                    if (moment(data.EndDate).year() > 1900) {
                        $('#EndDate_Add').val(moment(data.EndDate).format('DD/MM/YYYY HH:mm'));
                    }
                    else {
                        $('#EndDate_Add').val('');
                    }
                    $('#yearsRepeatable_add').bootstrapSwitch('state', data.yearsRepeatable, data.yearsRepeatable);
                    $('#chkMonday_add').bootstrapSwitch('state', false, false);
                    $('#chkTuesday_add').bootstrapSwitch('state', false, false);
                    $('#chkWednesday_add').bootstrapSwitch('state', false, false);
                    $('#chkThursday_add').bootstrapSwitch('state', false, false);
                    $('#chkFriday_add').bootstrapSwitch('state', false, false);
                    $('#chkSaturday_add').bootstrapSwitch('state', false, false);
                    $('#chkSunday_add').bootstrapSwitch('state', false, false);
                    var ar1 = data.RecurrencePattern.split(';');
                    $.each(ar1, function (key, line) {
                        if (line.substring(0, 5) == 'BYDAY') {
                            var BYDAY = line.replace("BYDAY=", "");
                            var arDays = BYDAY.split(',');
                            $.each(arDays, function (key, line) {
                                if (line == 'MO') { $('#chkMonday_add').bootstrapSwitch('state', true, true); }
                                if (line == 'TU') { $('#chkTuesday_add').bootstrapSwitch('state', true, true); }
                                if (line == 'WE') { $('#chkWednesday_add').bootstrapSwitch('state', true, true); }
                                if (line == 'TH') { $('#chkThursday_add').bootstrapSwitch('state', true, true); }
                                if (line == 'FR') { $('#chkFriday_add').bootstrapSwitch('state', true, true); }
                                if (line == 'SA') { $('#chkSaturday_add').bootstrapSwitch('state', true, true); }
                                if (line == 'SU') { $('#chkSunday_add').bootstrapSwitch('state', true, true); }
                            });
                        }
                    }); //ar1
                    setlanguage();
                    $("#ModalCopyTask").modal('hide');
                }
            });
        }
        /*-----------------------------------------------------------------------*/

        /*
        Edit
        -------------------------------------------------------------------------*/
        $.fn.callEdit = function (TaskId) {
            var req = $.DataAccess.hs_Cron_Profile_Tasks_Read(TaskId);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#TaskId_Upd').val(data.TaskId);
                    $('#Descr_Delete').text(data.Subject);
                    $('#Subject_Upd').val(data.Subject);
                    $('#ProfileNr_Upd').val(data.ProfileNr);
                    $('#StartDate_Upd').val(moment(data.StartDate).format('DD/MM/YYYY HH:mm'));                    
                    if (moment(data.EndDate).year() > 1900) {
                        $('#EndDate_Upd').val(moment(data.EndDate).format('DD/MM/YYYY HH:mm'));
                    }
                    else {
                        $('#EndDate_Upd').val('');
                    }
                    $('#yearsRepeatable_Upd').bootstrapSwitch('state', data.yearsRepeatable, data.yearsRepeatable);
                    $('#chkMonday_Upd').bootstrapSwitch('state', false, false);
                    $('#chkTuesday_Upd').bootstrapSwitch('state', false, false);
                    $('#chkWednesday_Upd').bootstrapSwitch('state', false, false);
                    $('#chkThursday_Upd').bootstrapSwitch('state', false, false);
                    $('#chkFriday_Upd').bootstrapSwitch('state', false, false);
                    $('#chkSaturday_Upd').bootstrapSwitch('state', false, false);
                    $('#chkSunday_Upd').bootstrapSwitch('state', false, false);
                    var ar1 = data.RecurrencePattern.split(';');
                    $.each(ar1, function (key, line) {
                        if (line.substring(0, 5) == 'BYDAY') {
                            var BYDAY = line.replace("BYDAY=", "");
                            var arDays = BYDAY.split(',');
                            $.each(arDays, function (key, line) {
                                if (line == 'MO') {$('#chkMonday_Upd').bootstrapSwitch('state', true, true); }
                                if (line == 'TU') {$('#chkTuesday_Upd').bootstrapSwitch('state', true, true);}
                                if (line == 'WE') {$('#chkWednesday_Upd').bootstrapSwitch('state', true, true);}
                                if (line == 'TH') {$('#chkThursday_Upd').bootstrapSwitch('state', true, true);}
                                if (line == 'FR') {$('#chkFriday_Upd').bootstrapSwitch('state', true, true);}
                                if (line == 'SA') {$('#chkSaturday_Upd').bootstrapSwitch('state', true, true);}
                                if (line == 'SU') {$('#chkSunday_Upd').bootstrapSwitch('state', true, true);}
                            });
                        }
                    }); //ar1
                    setlanguage();
                    $('#list').hide();
                    $('#add').hide();
                    $('#edit').show();
                }
            });
        }

        $('#btnCloseUpd').on('click', function () {
            $('#edit').hide();
            $('#list').show();
        });

        $('#btnUpd').on('click', function () {
            var TaskId = $('#TaskId_Upd').val(),
                ProfileNr = $('#ProfileNr_Upd').val(),
                Subject = $('#Subject_Upd').val(),
                StartDate = $('#StartDate_Upd').val(),
                EndDate = $('#EndDate_Upd').val(),
                yearsRepeatable = $('#yearsRepeatable_Upd').bootstrapSwitch('state'),
                chkMonday = $('#chkMonday_Upd').bootstrapSwitch('state'),
                chkTuesday = $('#chkTuesday_Upd').bootstrapSwitch('state'),
                chkWednesday = $('#chkWednesday_Upd').bootstrapSwitch('state'),
                chkThursday = $('#chkThursday_Upd').bootstrapSwitch('state'),
                chkFriday = $('#chkFriday_Upd').bootstrapSwitch('state'),
                chkSaturday = $('#chkSaturday_Upd').bootstrapSwitch('state'),
                chkSunday = $('#chkSunday_Upd').bootstrapSwitch('state');
            

            if (checkUpd(ProfileNr, Subject, StartDate) == false) {
                var req = $.DataAccess.hs_Cron_Profile_Tasks_Update(TaskId, ProfileNr, Subject, StartDate, EndDate, chkMonday, chkTuesday, chkWednesday, chkThursday, chkFriday, chkSaturday, chkSunday, yearsRepeatable);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        TaskList();
                        ListCurrent();
                        $('#edit').hide();
                        $('#list').show();
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }
            else {
                toastr["warning"](langResources['msg4novaliddata'], langResources['alert']);
            }
        });

        function checkUpd(ProfileNr, Subject, StartDate) {
            var retVal = false;
            var error_present = false;
            if (!error_present) {
                if (ProfileNr == '') {
                    $('#ProfileNr_Upd').addClass("error");
                    error_present = true;
                }
            }
            if (!error_present) {
                if (Subject == '') {
                    $('#Subject_Upd').addClass("error");
                    error_present = true;
                }
            }
            if (!error_present) {
                if (StartDate == '') {
                    $('#StartDate_Upd').addClass("error");
                    error_present = true;
                }
            }
            retVal = error_present;
            return retVal;
        }

        $('#ProfileNr_Upd').on('focus', function () {
            $gotFocus = 'ProfileNr_Upd';
            loadProfiles();
            $("#ModalCronoProfiles").modal('show');
        });
        /*-----------------------------------------------------------------------*/

        /*
        Delete
        -------------------------------------------------------------------------*/
        $('#btnDelete').on('click', function () {
            var req = $.DataAccess.hs_Cron_Profile_Tasks_Del($('#TaskId_Upd').val());
            req.success(function (json) {
                var data = json.d;
                if (data == true) {
                    TaskList();
                    $('#edit').hide();                        
                    $('#list').show();
                }
                else {
                    toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                }
            });
        });
        /*-----------------------------------------------------------------------*/

        /*
        get from remote
        -------------------------------------------------------------------------*/
        $.fn.getCalendar = function () {
            GetCalendarOnPLC();
        }

        function GetCalendarOnPLC() {
            var CronId = localStorage.getItem("CronId");
            $("#monthProfileOnPlc").empty();
            var req = $.DataAccess.hs_Cron_Calendar_get(CronId, $currYear, $currMonth);
            req.success(function (json) {
                var data = json.d;

                //console.log('GetProfileOnPLC',data);

                //if (data==true) { CronCalendarRead();  }
             });
        }
        /*-----------------------------------------------------------------------*/

        /*
        Cron Calendar
        -------------------------------------------------------------------------*/
        function CronCalendarRead() {
            $("#monthProfileOnPlc").empty();
            var CronId = localStorage.getItem("CronId");
            var req = $.DataAccess.hs_Cron_Calendar_Read(CronId, $currYear, $currMonth);
            req.success(function (json) {
                var data = json.d;
                if (data) {                   
                    var monthProfile = [];
                    for (var i = 1; i < daysInMonth($currMonth, $currYear) + 1 ; i++) {
                        var dd = moment([$currYear, $currMonth - 1, i]).format("DD/MM");
                        monthProfile.push({ DayMonth: dd, DayProfile: data.RealMonthData[i - 1] });
                    } //end for
                    try { $("#tmplmonthProfileOnPlc").tmpl(monthProfile).appendTo("#monthProfileOnPlc");}
                    catch (err) {console.log(err);}
                    setlanguage();
                }
                else {
                    try {$("#tmplGetProfile").tmpl(null).appendTo("#monthProfileOnPlc");}
                    catch (err) { console.log(err);}                    
                    setlanguage();
                }
            });
        }
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
            $("#CronoProfilesList").empty();
            var r = $.DataAccess.hs_cron_Profile_Read(localStorage.getItem("CronId"), $currYear, 0);
            r.success(function (json) {
                var data = json.d;
                if (data) { populateTable(data); }
                else { if ($hsIdOnLine == true) { getProfile(localStorage.getItem("hsId"), $CronCod, $currYear, 0); } }
            });
            var r = $.DataAccess.hs_cron_Profile_Read(localStorage.getItem("CronId"), $currYear, 1);
            r.success(function (json) {
                var data = json.d;
                if (data) { populateTable(data);}
                else { if ($hsIdOnLine == true) { getProfile(localStorage.getItem("hsId"), $CronCod, $currYear, 1); } }
            });
            var r = $.DataAccess.hs_cron_Profile_Read(localStorage.getItem("CronId"), $currYear, 2);
            r.success(function (json) {
                var data = json.d;
                if (data) { populateTable(data); }
                else { if ($hsIdOnLine == true) { getProfile(localStorage.getItem("hsId"), $CronCod, $currYear, 2); } }
            });
            var r = $.DataAccess.hs_cron_Profile_Read(localStorage.getItem("CronId"), $currYear, 3);
            r.success(function (json) {
                var data = json.d;
                if (data) { populateTable(data); }
                else { if ($hsIdOnLine == true) { getProfile(localStorage.getItem("hsId"), $CronCod, $currYear, 3); } }
            });
            var r = $.DataAccess.hs_cron_Profile_Read(localStorage.getItem("CronId"), $currYear, 4);
            r.success(function (json) {
                var data = json.d;
                if (data) { populateTable(data); }
                else { if ($hsIdOnLine == true) { getProfile(localStorage.getItem("hsId"), $CronCod, $currYear, 4); } }
            });
            var r = $.DataAccess.hs_cron_Profile_Read(localStorage.getItem("CronId"), $currYear, 5);
            r.success(function (json) {
                var data = json.d;
                if (data) { populateTable(data); }
                else { if ($hsIdOnLine == true) { getProfile(localStorage.getItem("hsId"), $CronCod, $currYear, 5); } }
            });
            var r = $.DataAccess.hs_cron_Profile_Read(localStorage.getItem("CronId"), $currYear, 6);
            r.success(function (json) {
                var data = json.d;
                if (data) { populateTable(data); }
                else { if ($hsIdOnLine == true) { getProfile(localStorage.getItem("hsId"), $CronCod, $currYear, 6); } }
            });
            var r = $.DataAccess.hs_cron_Profile_Read(localStorage.getItem("CronId"), $currYear, 7);
            r.success(function (json) {
                var data = json.d;
                if (data) { populateTable(data); }
                else { if ($hsIdOnLine == true) { getProfile(localStorage.getItem("hsId"), $CronCod, $currYear, 7); } }
            });
            var r = $.DataAccess.hs_cron_Profile_Read(localStorage.getItem("CronId"), $currYear, 8);
            r.success(function (json) {
                var data = json.d;
                if (data) { populateTable(data); }
                else { if ($hsIdOnLine == true) { getProfile(localStorage.getItem("hsId"), $CronCod, $currYear, 8); } }
            });
            var r = $.DataAccess.hs_cron_Profile_Read(localStorage.getItem("CronId"), $currYear, 9);
            r.success(function (json) {
                var data = json.d;
                if (data) { populateTable(data); }
                else { if ($hsIdOnLine == true) { getProfile(localStorage.getItem("hsId"), $CronCod, $currYear, 9); } }
            });
            var r = $.DataAccess.hs_cron_Profile_Read(localStorage.getItem("CronId"), $currYear, 10);
            r.success(function (json) {
                var data = json.d;
                if (data) { populateTable(data); }
                else { if ($hsIdOnLine == true) { getProfile(localStorage.getItem("hsId"), $CronCod, $currYear, 10); } }
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
            console.log(data);
            $("#tmplProfile").tmpl(data).appendTo("#CronoProfilesList");
            var div2plot = "#placeholder_" + data.ProfileNr;
            var d1 = [];
            for (var i = 0; i < 97; i++) {
                d1.push([i, data.ProfileData[i]]);
            }
            $.plot(div2plot, [{ data: d1 }]);           
        }

        $.fn.selProfile = function (ProfileNr) {
            $('#' + $gotFocus).val(ProfileNr);
            $("#ModalCronoProfiles").modal('hide');
        }
        /*-----------------------------------------------------------------------*/

        /*
        generic function
        -------------------------------------------------------------------------*/
        function daysInMonth(month, year) {
            return new Date(year, month, 0).getDate();
        }
        /*-----------------------------------------------------------------------*/

    }); // document ready

});
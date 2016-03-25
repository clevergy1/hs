$(function () {

    $(document).ready(function () {
        var $selectedDate = moment().format('DD/MM/YYYY'),
            $currMonth,
            $currYear,
            $CronCod;
        var $gotFocus;

        Readhs();
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
        }).on('changeMonth', function (ev) {
            $currMonth = moment(ev.date).month() + 1;
            $currYear = moment(ev.date.valueOf()).year();
        }).on('changeYear', function (ev) {
            $currMonth = moment(ev.date.valueOf()).month() + 1;
            $currYear = moment(ev.date).year();
        });

        $('#calendar-container').datepicker('setDate', new Date());
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

        /*
        List
        -------------------------------------------------------------------------*/
        function TaskList() {
            //ListCurrent();
            ListAll();
        }

        function ListCurrent() {
            $("#currentTaskList").empty();
            var req = $.DataAccess.hs_businesshour_ListCurrent(localStorage.getItem("hsId"), $selectedDate);
            req.success(function (json) {
                var data = json.d;
                console.log('num eventi', data.length);
                if (data) {
                    $("#tmplTasks").tmpl(data).appendTo("#currentTaskList");
                    setlanguage();
                }
            });
        }

        function ListAll() {
            $("#allTaskList").empty();
            var req = $.DataAccess.hs_businesshour_List(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplTasks").tmpl(data).appendTo("#allTaskList");
                    setlanguage();
                }
            });
        }
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
            $('#isClosedTime_add').bootstrapSwitch('state', true, true);
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
            var hsId = localStorage.getItem("hsId"),
                isClosedTime = $('#isClosedTime_add').bootstrapSwitch('state'),
                Subject = $('#Subject_Add').val(),
                StartDate = $('#StartDate_Add').val(),
                EndDate = $('#EndDate_Add').val(),                
                chkMonday = $('#chkMonday_add').bootstrapSwitch('state'),
                chkTuesday = $('#chkTuesday_add').bootstrapSwitch('state'),
                chkWednesday = $('#chkWednesday_add').bootstrapSwitch('state'),
                chkThursday = $('#chkThursday_add').bootstrapSwitch('state'),
                chkFriday = $('#chkFriday_add').bootstrapSwitch('state'),
                chkSaturday = $('#chkSaturday_add').bootstrapSwitch('state'),
                chkSunday = $('#chkSunday_add').bootstrapSwitch('state');
            if (checkAdd(Subject, StartDate) == false) {
                var reqAdd = $.DataAccess.hs_businesshour_Add(hsId, isClosedTime, Subject, StartDate, EndDate, chkMonday, chkTuesday, chkWednesday, chkThursday, chkFriday, chkSaturday, chkSunday);
                reqAdd.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        TaskList();
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

        function checkAdd( Subject, StartDate) {
            var retVal = false;
            var error_present = false;

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
        /*-----------------------------------------------------------------------*/

        /*
        Edit
        -------------------------------------------------------------------------*/
        $.fn.callEdit = function (Id) {
            var req = $.DataAccess.hs_businesshour_Read(Id);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#Id_Upd').val(data.Id);
                    $('#Descr_Delete').text(data.Subject);
                    $('#Subject_Upd').val(data.Subject);
                    $('#isClosedTime_Upd').bootstrapSwitch('state', data.isClosedTime, data.isClosedTime);
                    $('#StartDate_Upd').val(moment(data.StartDate).format('DD/MM/YYYY HH:mm'));
                    if (moment(data.EndDate).year() > 1900) {
                        $('#EndDate_Upd').val(moment(data.EndDate).format('DD/MM/YYYY HH:mm'));
                    }
                    else {
                        $('#EndDate_Upd').val('');
                    }
                   
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
                                if (line == 'MO') { $('#chkMonday_Upd').bootstrapSwitch('state', true, true); }
                                if (line == 'TU') { $('#chkTuesday_Upd').bootstrapSwitch('state', true, true); }
                                if (line == 'WE') { $('#chkWednesday_Upd').bootstrapSwitch('state', true, true); }
                                if (line == 'TH') { $('#chkThursday_Upd').bootstrapSwitch('state', true, true); }
                                if (line == 'FR') { $('#chkFriday_Upd').bootstrapSwitch('state', true, true); }
                                if (line == 'SA') { $('#chkSaturday_Upd').bootstrapSwitch('state', true, true); }
                                if (line == 'SU') { $('#chkSunday_Upd').bootstrapSwitch('state', true, true); }
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
            var Id = $('#Id_Upd').val(),
                isClosedTime = $('#isClosedTime_Upd').bootstrapSwitch('state'),
                Subject = $('#Subject_Upd').val(),
                StartDate = $('#StartDate_Upd').val(),
                EndDate = $('#EndDate_Upd').val(),
                chkMonday = $('#chkMonday_Upd').bootstrapSwitch('state'),
                chkTuesday = $('#chkTuesday_Upd').bootstrapSwitch('state'),
                chkWednesday = $('#chkWednesday_Upd').bootstrapSwitch('state'),
                chkThursday = $('#chkThursday_Upd').bootstrapSwitch('state'),
                chkFriday = $('#chkFriday_Upd').bootstrapSwitch('state'),
                chkSaturday = $('#chkSaturday_Upd').bootstrapSwitch('state'),
                chkSunday = $('#chkSunday_Upd').bootstrapSwitch('state');


            if (checkUpd( Subject, StartDate) == false) {
                var req = $.DataAccess.hs_businesshour_Update(Id, isClosedTime, Subject, StartDate, EndDate, chkMonday, chkTuesday, chkWednesday, chkThursday, chkFriday, chkSaturday, chkSunday);
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
            }
            else {
                toastr["warning"](langResources['msg4novaliddata'], langResources['alert']);
            }
        });

        function checkUpd( Subject, StartDate) {
            var retVal = false;
            var error_present = false;
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
        /*-----------------------------------------------------------------------*/

        /*
        Delete
        -------------------------------------------------------------------------*/
        $('#btnDelete').on('click', function () {
            var req = $.DataAccess.hs_businesshour_Del($('#Id_Upd').val());
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

    }); //document ready

});
$(function () {
    monthProfileOnPlc

    $(document).ready(function () {
        var $hsIdOnLine = false;
        var $selectedDate = moment().format('YYYY/MM/DD'),
        $currMonth,
        $currYear,
        $AstrCod,
        $AstrType = 0;
        var $gotFocus;
        var ListaAstro = [];

        var d = new Date();
        $selectedDate = moment(d.valueOf()).format('YYYY/MM/DD');
        //alert($selectedDate);
        AstrList();
        Readhs();
        readAstr();
        //TaskList();
        setlanguage();

        $('#calendar-container').datepicker({
            weekStart: 1,
            language: localStorage.getItem("CurrentLanguage"),
            todayHighlight: true
        }).on('changeDate', function (ev) {
            //$selectedDate = ev.date.valueOf();
            $selectedDate = moment(ev.date.valueOf()).format('YYYY/MM/DD');
            $currMonth = moment(ev.date.valueOf()).month() + 1;
            $currYear = moment(ev.date.valueOf()).year();
            ListCurrent();
            //AstrCalendarRead();
        }).on('changeMonth', function (ev) {
            $currMonth = moment(ev.date).month() + 1;
            $currYear = moment(ev.date.valueOf()).year();
            //AstrCalendarRead();
        }).on('changeYear', function (ev) {
            $currMonth = moment(ev.date.valueOf()).month() + 1;
            $currYear = moment(ev.date).year();
            //AstrCalendarRead();
        });

        $('#calendar-container').datepicker('setDate', new Date());
        //AstrCalendarRead();

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

        function AstrList() {
            var r = $.DataAccess.Lux_ReadByamb(localStorage.IdAmbiente);
            r.success(function (json) {
                var data = json.d;
                if (data) {

                    readAstr(data[0].Cod);
                    for (var i = 0; i < data.length; i++) {
                        var req = $.DataAccess.LuxAstr_ReadByLux(data[i].Id);
                        req.success(function (json) {
                            var data2 = json.d;
                            if (data2) {
                                console.log("Astro", data2.AstrId);
                                ListaAstro.push(data2.AstrId);


                            } else {
                                alert("qui");
                            }
                        });

                    }

                    console.log("LISTA LUX", data);
                }
            });

        }

        function readAstr(AstroCodPadre) {
            var req = $.DataAccess.Ambienti_Read( localStorage.IdAmbiente);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                     console.log("ambiente x calenadario", data)
                    $("#Descr").text(data.AstrDescr);
                    var req = $.DataAccess.hs_Astr_Read( localStorage.getItem("AstrId"));
                    req.success(function (json) {
                        var data2 = json.d;
                        if (data2) {
                            console.log("Astr x AMB", data2)
                            localStorage.setItem("AstrId", data2.Id);
                            // $("#Descr").text(data2.AstrDescr);
                            //$(".Descr").text("AMBIENTE " + localStorage.IdAmbiente); //metto il nome dell ambiente
                            $(".Descr").text("AMBIENTE: " + data.Id + "-" + data.DescrizioneAmbiente);
                            TaskList();
                            $AstrCod = data2.Cod;
                            $AstrType = data2.Type;
                        }
                    });
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
            var req = $.DataAccess.hs_Astr_Profile_Tasks_ListCurrent(localStorage.getItem("AstrId"), $selectedDate);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplAstr").tmpl(data).appendTo("#currentTaskList");
                    setlanguage();
                }
            });
        }

        function ListAll() {
            $("#allTaskList").empty();
            var req = $.DataAccess.hs_Astr_Profile_Tasks_List(localStorage.getItem("AstrId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplAstr").tmpl(data).appendTo("#allTaskList");
                    setlanguage();
                }
            });
        }

        $('#btnCallCalendar').on('click', function () {
            $.module.load('Impianti/supervisors/Device8AmbCalendar');
        });
        /*-----------------------------------------------------------------------*/

        /*
        Add
        -------------------------------------------------------------------------*/
        $('#btnCallAdd').on('click', function (e) {
            $(".Descr").text("AMBIENTE " + localStorage.IdAmbiente); //metto il nome dell ambiente
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
            var AstrId = localStorage.getItem("AstrId"),
                ProfileNr = $('#ProfileNr_Add').val(),
                Subject = $('#Subject_Add').val(),
                //StartDate = moment($('#StartDate_Upd').val()).format('YYYY/MM/DD'), // $('#StartDate_Upd').val(),
                //EndDate = moment($('#EndDate_Upd').val()).format('YYYY/MM/DD'), //$('#EndDate_Upd').val(),             
                  fromS = $('#StartDate_Add').val().split("/"), // $('#StartDate_Add').val(),
                from = $('#EndDate_Add').val().split("/"),
                yearsRepeatable = $('#yearsRepeatable_add').bootstrapSwitch('state'),
                chkMonday = $('#chkMonday_add').bootstrapSwitch('state'),
                chkTuesday = $('#chkTuesday_add').bootstrapSwitch('state'),
                chkWednesday = $('#chkWednesday_add').bootstrapSwitch('state'),
                chkThursday = $('#chkThursday_add').bootstrapSwitch('state'),
                chkFriday = $('#chkFriday_add').bootstrapSwitch('state'),
                chkSaturday = $('#chkSaturday_add').bootstrapSwitch('state'),
                chkSunday = $('#chkSunday_add').bootstrapSwitch('state');

            var EndDate = new Date(from[2], from[1] - 1, from[0]);
            EndDate = moment(EndDate);
            EndDate = EndDate.format('YYYY/MM/DD');

            var StartDate = new Date(fromS[2], fromS[1] - 1, fromS[0]);
            StartDate = moment(StartDate);
            StartDate = StartDate.format('YYYY/MM/DD');

            console.log("StartDate>>>", StartDate, "EndDate>>>>>", EndDate);


            if (checkAdd(ProfileNr, Subject, StartDate) == false) {
                var c = 0;
                for (var i = 0; i < ListaAstro.length; i++) {
                    //alert("aggiungo");
                    var reqAdd = $.DataAccess.hs_Astr_Profile_Tasks_Add(ListaAstro[i], ProfileNr, Subject, StartDate, EndDate, chkMonday, chkTuesday, chkWednesday, chkThursday, chkFriday, chkSaturday, chkSunday, yearsRepeatable);
                    reqAdd.success(function (json) {
                        var data = json.d;
                        if (data == true) {
                            console.log("c", c, "lenght", ListaAstro.length);

                            c++;
                            if (c == ListaAstro.length) {
                                TaskList();
                                ListCurrent();
                                $('#add').hide();
                                $('#list').show();
                            }
                        }
                        else {
                            toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                        }
                    });

                }//end for

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
            $("#ModalAstroProfiles").modal('show');
        });

        $('#btnClose').on('click', function (e) {
            if ($AstrType == 0) { $.module.load('mpianti/supervisors/Device8AmbDetail'); }
            else { $.module.load('impianti/supervisors/Device8AmbDetail'); }
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
            var req = $.DataAccess.hs_Astr_Profile_Tasks_ListAll();
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    var data2Copy = [];
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].AstrCod != $AstrCod) {
                            data2Copy.push(data[i]);
                        }
                    }//end for
                    $("#tmplCopyTask").tmpl(data2Copy).appendTo("#CopyTaskList");
                    setlanguage();
                }
            });
        }

        $.fn.selectTask2Copy = function (TaskId) {
            var reqCopy = $.DataAccess.hs_Astr_Profile_Tasks_Read(TaskId);
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
            var req = $.DataAccess.hs_Astr_Profile_Tasks_Read(TaskId);
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
                    $(".Descr").text("AMBIENTE " + localStorage.IdAmbiente); //metto il nome dell ambiente
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
            console.log("LISTA Astrooooo", ListaAstro);

            var TaskId = $('#TaskId_Upd').val(),
                ProfileNr = $('#ProfileNr_Upd').val(),
                Subject = $('#Subject_Upd').val(),
                //StartDate = moment($('#StartDate_Add').val()).format('YYYY/MM/DD'), // $('#StartDate_Add').val(),
                //EndDate = moment($('#EndDate_Add').val()).format('YYYY/MM/DD'), // $('#EndDate_Add').val(),
                yearsRepeatable = $('#yearsRepeatable_Upd').bootstrapSwitch('state'),
                chkMonday = $('#chkMonday_Upd').bootstrapSwitch('state'),
                chkTuesday = $('#chkTuesday_Upd').bootstrapSwitch('state'),
                chkWednesday = $('#chkWednesday_Upd').bootstrapSwitch('state'),
                chkThursday = $('#chkThursday_Upd').bootstrapSwitch('state'),
                chkFriday = $('#chkFriday_Upd').bootstrapSwitch('state'),
                chkSaturday = $('#chkSaturday_Upd').bootstrapSwitch('state'),
                chkSunday = $('#chkSunday_Upd').bootstrapSwitch('state');


            var provastart = $('#StartDate_Upd').val().substring(0, 10);
            var fromS = provastart.split("/");
            var provaend = $('#EndDate_Upd').val().substring(0, 10);
            var from = provaend.split("/");

            var EndDate = new Date(from[2], from[1] - 1, from[0]);
            EndDate = moment(EndDate);
            EndDate = EndDate.format('YYYY/MM/DD');

            var StartDate = new Date(fromS[2], fromS[1] - 1, fromS[0]);
            StartDate = moment(StartDate);
            StartDate = StartDate.format('YYYY/MM/DD');

            console.log("StartDate>>>", StartDate, "EndDate>>>>>", EndDate);


            if (checkUpd(ProfileNr, Subject, StartDate) == false) {
                var c = 0;
                for (var i = 0; i < ListaAstro.length; i++) {
                    var req = $.DataAccess.hs_Astr_Profile_Tasks_Update_Repeat(localStorage.IdAmbiente, ListaAstro[i], ProfileNr, Subject, StartDate, EndDate, chkMonday, chkTuesday, chkWednesday, chkThursday, chkFriday, chkSaturday, chkSunday, yearsRepeatable);
                    req.success(function (json) {
                        var data = json.d;
                        if (data == true) {
                            console.log("c", c, "lenght", ListaAstro.length);

                            c++;
                            if (c == ListaAstro.length) {
                                TaskList();
                                ListCurrent();
                                $('#edit').hide();
                                $('#list').show();
                            }
                        }
                        else {
                            toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                        }
                    });
                }//end for
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
            $("#ModalAstroProfiles").modal('show');
        });
        /*-----------------------------------------------------------------------*/

        /*
        Delete
        -------------------------------------------------------------------------*/
        $('#btnDelete').on('click', function () {
            var req = $.DataAccess.hs_Astr_Profile_Tasks_Del($('#TaskId_Upd').val());
            req.success(function (json) {
                var data = json.d;
                if (data == true) {
                    ListCurrent();
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
            var AstrId = localStorage.getItem("AstrId");
            $("#monthProfileOnPlc").empty();
            var req = $.DataAccess.hs_Astr_Calendar_get(AstrId, $currYear, $currMonth);
            req.success(function (json) {
                var data = json.d;

                //console.log('GetProfileOnPLC',data);

                if (data == true) {
                    AstrCalendarRead();
                }
            });
        }
        /*-----------------------------------------------------------------------*/

        /*
        Astr Calendar
        -------------------------------------------------------------------------*/
        function AstrCalendarRead() {
            $("#monthProfileOnPlc").empty();
            var AstrId = localStorage.getItem("AstrId");
            var req = $.DataAccess.hs_Astr_Calendar_Read(AstrId, $currYear, $currMonth);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    var monthProfile = [];
                    for (var i = 1; i < daysInMonth($currMonth, $currYear) + 1 ; i++) {
                        var dd = moment([$currYear, $currMonth - 1, i]).format("DD/MM");
                        monthProfile.push({ DayMonth: dd, DayProfile: data.RealMonthData[i - 1] });
                    } //end for
                    try { $("#tmplmonthProfileOnPlc").tmpl(monthProfile).appendTo("#monthProfileOnPlc"); }
                    catch (err) { console.log(err); }
                    setlanguage();
                }
                else {
                    try { $("#tmplGetProfile").tmpl(null).appendTo("#monthProfileOnPlc"); }
                    catch (err) { console.log(err); }
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
            $("#AstroProfilesList").empty();
            var r = $.DataAccess.hs_Astr_Profile_Read(localStorage.getItem("AstrId"), $currYear, 0);
            r.success(function (json) {
                var data = json.d;
                if (data) { populateTable(data); }
                else { if ($hsIdOnLine == true) { getProfile(localStorage.getItem("hsId"), $AstrCod, $currYear, 0); } }
            });
            var r = $.DataAccess.hs_Astr_Profile_Read(localStorage.getItem("AstrId"), $currYear, 1);
            r.success(function (json) {
                var data = json.d;
                if (data) { populateTable(data); }
                else { if ($hsIdOnLine == true) { getProfile(localStorage.getItem("hsId"), $AstrCod, $currYear, 1); } }
            });
            var r = $.DataAccess.hs_Astr_Profile_Read(localStorage.getItem("AstrId"), $currYear, 2);
            r.success(function (json) {
                var data = json.d;
                if (data) { populateTable(data); }
                else { if ($hsIdOnLine == true) { getProfile(localStorage.getItem("hsId"), $AstrCod, $currYear, 2); } }
            });
            var r = $.DataAccess.hs_Astr_Profile_Read(localStorage.getItem("AstrId"), $currYear, 3);
            r.success(function (json) {
                var data = json.d;
                if (data) { populateTable(data); }
                else { if ($hsIdOnLine == true) { getProfile(localStorage.getItem("hsId"), $AstrCod, $currYear, 3); } }
            });
            var r = $.DataAccess.hs_Astr_Profile_Read(localStorage.getItem("AstrId"), $currYear, 4);
            r.success(function (json) {
                var data = json.d;
                if (data) { populateTable(data); }
                else { if ($hsIdOnLine == true) { getProfile(localStorage.getItem("hsId"), $AstrCod, $currYear, 4); } }
            });
            var r = $.DataAccess.hs_Astr_Profile_Read(localStorage.getItem("AstrId"), $currYear, 5);
            r.success(function (json) {
                var data = json.d;
                if (data) { populateTable(data); }
                else { if ($hsIdOnLine == true) { getProfile(localStorage.getItem("hsId"), $AstrCod, $currYear, 5); } }
            });
            var r = $.DataAccess.hs_Astr_Profile_Read(localStorage.getItem("AstrId"), $currYear, 6);
            r.success(function (json) {
                var data = json.d;
                if (data) { populateTable(data); }
                else { if ($hsIdOnLine == true) { getProfile(localStorage.getItem("hsId"), $AstrCod, $currYear, 6); } }
            });
            var r = $.DataAccess.hs_Astr_Profile_Read(localStorage.getItem("AstrId"), $currYear, 7);
            r.success(function (json) {
                var data = json.d;
                if (data) { populateTable(data); }
                else { if ($hsIdOnLine == true) { getProfile(localStorage.getItem("hsId"), $AstrCod, $currYear, 7); } }
            });
            var r = $.DataAccess.hs_Astr_Profile_Read(localStorage.getItem("AstrId"), $currYear, 8);
            r.success(function (json) {
                var data = json.d;
                if (data) { populateTable(data); }
                else { if ($hsIdOnLine == true) { getProfile(localStorage.getItem("hsId"), $AstrCod, $currYear, 8); } }
            });
            var r = $.DataAccess.hs_Astr_Profile_Read(localStorage.getItem("AstrId"), $currYear, 9);
            r.success(function (json) {
                var data = json.d;
                if (data) { populateTable(data); }
                else { if ($hsIdOnLine == true) { getProfile(localStorage.getItem("hsId"), $AstrCod, $currYear, 9); } }
            });
            var r = $.DataAccess.hs_Astr_Profile_Read(localStorage.getItem("AstrId"), $currYear, 10);
            r.success(function (json) {
                var data = json.d;
                if (data) { populateTable(data); }
                else { if ($hsIdOnLine == true) { getProfile(localStorage.getItem("hsId"), $AstrCod, $currYear, 10); } }
            });
        }

        function getProfile(hsId, AstrCod, ProfileY, ProfileNr) {
            var r = $.DataAccess.hs_Astr_Profile_get(localStorage.getItem("hsId"), AstrCod, ProfileY, ProfileNr);
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
            $("#tmplProfile").tmpl(data).appendTo("#AstroProfilesList");
            var div2plot = "#placeholder_" + data.ProfileNr;
            var d1 = [];
            for (var i = 0; i < 97; i++) {
                d1.push([i, data.ProfileData[i]]);
            }
            $.plot(div2plot, [{ data: d1 }]);
        }

        $.fn.selProfile = function (ProfileNr) {
            $('#' + $gotFocus).val(ProfileNr);
            $("#ModalAstroProfiles").modal('hide');
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
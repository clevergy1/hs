$(function () {

    $(document).ready(function () {
        var currMonth = moment().month() + 1;
        var currYear = moment().year();
        var currDay = moment().date();
        var now = moment([currYear, currMonth - 1, currDay]).format("DD/MM");

        var $hsIdOnLine = false;
        var $CronId = 0,
            $CronCod = '',
            $ProfileY = 0,
            $ProfileNr = 0;
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

        /*--------------------------------------------*/
        Readhs();
        readCir();
        //ReadCron();


        function Readhs() {
            $("#ListPlants").empty();
            var req = $.DataAccess.HeatingSystem_Read(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#hsDescr").text(data.DesImpianto + ' ' + data.Descr);
                    $hsIdOnLine = data.isOnline;
                    Load();
                    readCurrentCirProfile();
                }
            });
        }

        function Load() {           
            var req = $.DataAccess.hs_CirdmCron_List(localStorage.getItem("CirId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    var CronId = data[0].CronId;
                    ReadCron(CronId);
                }
            });
        }

        function readCir() {
            var req = $.DataAccess.hs_Cirdm_Read(localStorage.getItem("CirId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#CirDesc').text(data.Descr);
                }
            });
        }

        function ReadCron(CronId) {
            var req = $.DataAccess.hs_Cron_Read(CronId);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $(".Descr").text(data.CronDescr);
                    $CronCod = data.CronCod;
                    loadProfiles(data.CronCod);
                }
            });
        }

        function loadProfiles(CronCod) {
            $("#CronList").empty();
            if ($hsIdOnLine == true) {
                console.log('loadProfiles', CronCod);
                var req = $.DataAccess.hs_Cron_ReadByCronCod(localStorage.getItem("hsId"), CronCod);
                req.success(function (json) {
                    var data = json.d;
                    if (data) {
                        var r = $.DataAccess.hs_cron_Profile_Read(data.CronId, currYear, 0);
                        r.success(function (json) {
                            var data = json.d;
                            if (data) { populateTable(data); }
                            else { getProfile(localStorage.getItem("hsId"), CronCod, currYear, 0); }
                        });

                        var r = $.DataAccess.hs_cron_Profile_Read(data.CronId, currYear, 1);
                        r.success(function (json) {
                            var data = json.d;
                            if (data) { populateTable(data); }
                            else { getProfile(localStorage.getItem("hsId"), CronCod, currYear, 1); }
                        });

                        var r = $.DataAccess.hs_cron_Profile_Read(data.CronId, currYear, 2);
                        r.success(function (json) {
                            var data = json.d;
                            if (data) { populateTable(data); }
                            else { getProfile(localStorage.getItem("hsId"), CronCod, currYear, 2); }
                        });

                        var r = $.DataAccess.hs_cron_Profile_Read(data.CronId, currYear, 3);
                        r.success(function (json) {
                            var data = json.d;
                            if (data) { populateTable(data); }
                            else { getProfile(localStorage.getItem("hsId"), CronCod, currYear, 3); }
                        });

                        var r = $.DataAccess.hs_cron_Profile_Read(data.CronId, currYear, 4);
                        r.success(function (json) {
                            var data = json.d;
                            if (data) { populateTable(data); }
                            else { getProfile(localStorage.getItem("hsId"), CronCod, currYear, 4); }
                        });

                        var r = $.DataAccess.hs_cron_Profile_Read(data.CronId, currYear, 5);
                        r.success(function (json) {
                            var data = json.d;
                            if (data) { populateTable(data); }
                            else { getProfile(localStorage.getItem("hsId"), CronCod, currYear, 5); }
                        });

                        var r = $.DataAccess.hs_cron_Profile_Read(data.CronId, currYear, 6);
                        r.success(function (json) {
                            var data = json.d;
                            if (data) { populateTable(data); }
                            else { getProfile(localStorage.getItem("hsId"), CronCod, currYear, 6); }
                        });

                        var r = $.DataAccess.hs_cron_Profile_Read(data.CronId, currYear, 7);
                        r.success(function (json) {
                            var data = json.d;
                            if (data) { populateTable(data); }
                            else { getProfile(localStorage.getItem("hsId"), CronCod, currYear, 7); }
                        });

                        var r = $.DataAccess.hs_cron_Profile_Read(data.CronId, currYear, 8);
                        r.success(function (json) {
                            var data = json.d;
                            if (data) { populateTable(data); }
                            else { getProfile(localStorage.getItem("hsId"), CronCod, currYear, 8); }
                        });

                        var r = $.DataAccess.hs_cron_Profile_Read(data.CronId, currYear, 9);
                        r.success(function (json) {
                            var data = json.d;
                            if (data) { populateTable(data); }
                            else { getProfile(localStorage.getItem("hsId"), CronCod, currYear, 9); }
                        });

                        var r = $.DataAccess.hs_cron_Profile_Read(data.CronId, currYear, 10);
                        r.success(function (json) {
                            var data = json.d;
                            if (data) { populateTable(data); }
                            else { getProfile(localStorage.getItem("hsId"), CronCod, currYear, 10); }
                        });
                        
                        setlanguage();
                    }
                });
            }
            else {
                toastr["warning"](langResources['msg4offline'], langResources['alert']);
            }//on line
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
            $("#tmplProfile").tmpl(data).appendTo("#CronList");

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
                var date1 = new Date(moment(d1).add(1, 'h'));
                editGraphData.push([date1, temp]);
                ProfileData.push(temp);
                d1 = new Date(moment(d0).add(15, 'm'));
                d0 = new Date(d1);
            }
            var graphData = [];
            graphData.push({ data: editGraphData });
            $.plot(div2plot, graphData, options);


            $('#tableCronList').stupidtable();
        }


        /*
        Set profile
        ---------------------------------------------------------*/
        $.fn.callSetThisProfile = function (CronId, ProfileNr, descr) {
            $CronId = CronId;
            $ProfileNr = ProfileNr;
            $('#Descr_Send').text(descr);
            $('#SendModal').modal('show');
        }

        $('#bntSend').on('click', function () {
            setTimeout(function () {
                var req = $.DataAccess.hs_cron_Profile_setProfileNow($CronId, $ProfileNr);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        $.module.load('Impianti/supervisors/Device8Cird');
                        setTimeout(function () {
                            $.DataAccess.HeatingSystem_requestLog(localStorage.getItem("hsId"));
                        }, 500);
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }, 300);
        });
        /*-------------------------------------------------------*/


        /*
        Current profile
        ------------------------------------------------------------------------*/
        function readCurrentCirProfile() {
            var CirId = localStorage.getItem("CirId");
            $("#currentProfiles").empty();
            var currMonth = moment().month() + 1;
            var currYear = moment().year();
            var currDay = moment().date();
            //console.log('mese/anno/giorni', currMonth, currYear, currDay);
            var now = moment([currYear, currMonth - 1, currDay]).format("DD/MM");
            var req = $.DataAccess.hs_CirCron_List(CirId);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        var CronId = data[i].CronId;
                        var CronCod = data[i].CronCod;
                        var r = $.DataAccess.hs_Cron_Calendar_Read(CronId, currYear, currMonth);
                        r.success(function (json) {
                            var dataCronCalendar = json.d;
                            if (dataCronCalendar) {
                                for (var i = 1; i < daysInMonth(currMonth, currYear) + 1 ; i++) {
                                    var dd = moment([currYear, currMonth - 1, i]).format("DD/MM");
                                    if (dd == now) {
                                        //console.log('data ok');
                                        var r2 = $.DataAccess.hs_cron_Profile_get(localStorage.getItem("hsId"), CronCod, currYear, dataCronCalendar.RealMonthData[i - 1]);
                                        r2.success(function (json) {
                                            var profileData = json.d;
                                            populateTableCurrent(profileData);
                                        });

                                    }
                                }
                            }
                        });
                    }
                }
            });
        }

        function populateTableCurrent(data) {
            $("#tmplCurrentProfile").tmpl(data).appendTo("#currentProfiles");

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

            $('#tableCronList').stupidtable();
        }


        /*
        generic function
        -------------------------------------------------------------------------*/
        function daysInMonth(month, year) {
            return new Date(year, month, 0).getDate();
        }
        /*-----------------------------------------------------------------------*/
        /**/
    }); //document ready

});
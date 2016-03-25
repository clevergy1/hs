/*
Admin home
---------------------------------------------------*/
$(function () {

    $(document).ready(function () {
        $('.tableJobs').footable();
        $('.tableJobs').data('page-size', 20);
        $('.tableJobs').data('limit-navigation', 4);
        $('.tableJobs').trigger('footable_initialized');

        loadUsersStat();
        loadRoleList();

        $('#usermenu').empty();
        $("#tmplNavigationbar").tmpl([{ foo: "" }]).appendTo("#usermenu");
        setlanguage();

        function loadAllUsers() {
            //$('#listUsersAll').empty();
            var req = $.DataAccess.aspnetUsers_GetUsersAll();
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    var firstoptions = "";
                    firstoptions += '<li>';
                    firstoptions += '<h5><i class="fa fa-user"></i><span name="lbl" caption="users">Users</span></h5>';
                    firstoptions += '<hr />';
                    firstoptions += '</li>';
                    $('#listUsersAll').append(firstoptions).trigger('create');
                    for (var i = 0; i < data.length; i++) {
                        var options = "";
                        //userstable
                        var tableoptions = "";
                        tableoptions += '<tr>';
                        tableoptions += '<td>' + data[i].UserName + '</td>';
                        tableoptions += '<td>' + data[i].RoleName + '</td>';
                        tableoptions += '</tr>';
                        $('#userstable').append(tableoptions).trigger('create');
                        setlanguage();
                    }
                }
            });
        }

        function loadRoleList() {
            $('#roleList').empty();
            var req = $.DataAccess.aspnetroles_List();
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    //tmplroleList
                    $("#tmplroleList").tmpl(data).appendTo("#roleList");
                    setlanguage();
                }
            });
        }

        function loadUsersStat() {
            $('#usersstatList').empty();
            var req = $.DataAccess.aspnetusersstat_Read();
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplusersstatList").tmpl(data).appendTo("#usersstatList");
                    setlanguage();
                }
            });
        }


        //charts
        //========================================================================================
        var datacpu = [],
            dataio = [],
            datarequest = [],
            totalPoints = 300;

        var cpu_perc, avg_io, batch_request;
        var previous_batch_request = 0;
        var maximum = $("#cpu-perc-chart").outerWidth() / 2 || 300;
        var updateInterval = 1000;

        var options = {
            series: { shadowSize: 0 }, // drawing is faster without shadows
            lines: { fill: true },
            grid: { borderWidth: 0 },
            yaxis: { min: 0, max: 100 },
            colors: ["#ff2424"]
        };
        var options2 = {
            series: { shadowSize: 0 }, // drawing is faster without shadows
            lines: { fill: true },
            grid: { borderWidth: 0 },
            yaxis: { min: 0, max: 10 },
            colors: ["#ff2424"]
        };

        function getdbstatdata() {
            var req = $.DataAccess.dbstats_Read();
            req.success(function (json) {
                cpu_perc = data.cpu_perc;
                avg_io = data.avg_io;
                batch_request = data.batch_request;
            });
        }

        function cpupercData() {
            if (datacpu.length) {
                datacpu = datacpu.slice(1);
            }
            while (datacpu.length < maximum) {
                datacpu.push(cpu_perc);
            }
            var res = [];
            for (var i = 0; i < datacpu.length; ++i) {
                res.push([i, datacpu[i]])
            }
            return res;
        }

        seriescpu = [{
            data: cpupercData(),
            lines: {
                fill: true
            }
        }];
        var plotcpuchart = $.plot($("#cpu-perc-chart"), seriescpu, options);

        function avgioData() {
            if (dataio.length) {
                dataio = dataio.slice(1);
            }
            while (dataio.length < maximum) {
                dataio.push(avg_io);
                //console.log(" io: " + avg_io );
            }
            var res = [];
            for (var i = 0; i < dataio.length; ++i) {
                res.push([i, dataio[i]])
            }
            return res;
        }
        seriesavgio = [{
            data: avgioData(),
            lines: {
                fill: true
            }
        }];
        var plotiochart = $.plot($("#avg-io-chart"), seriesavgio, options2);

        function batchRequestData() {
            if (previous_batch_request == 0) { previous_batch_request = batch_request }
            if (datarequest.length) {
                datarequest = datarequest.slice(1);
            }

            while (datarequest.length < maximum) {
                var current = batch_request - previous_batch_request;
                datarequest.push(current);
                previous_batch_request = batch_request;
            }


            var res = [];
            for (var i = 0; i < datarequest.length; ++i) {
                res.push([i, datarequest[i]]);
            }
            return res;
        }
        seriesbatcrequest = [{
            data: batchRequestData(),
            lines: {
                fill: true
            }
        }];
        var plotbatchrequestchart = $.plot($("#batch-request-chart"), seriesbatcrequest, options2);

        //var plotcpuchart = $.plot($("#cpu-perc-chart"), datacpu, options);
        //var plotiochart = $.plot($("#avg-io-chart"), [dataio], options);
        //var plotbatchrequestchart = $.plot($("#batch-request-chart"), [datarequest], options);

        function update() {
            getdbstatdata();
            seriescpu[0].data = cpupercData();
            plotcpuchart.setData(seriescpu);
            plotcpuchart.draw();

            seriesavgio[0].data = avgioData();
            plotiochart.setData(seriesavgio);
            plotiochart.draw();

            seriesbatcrequest[0].data = batchRequestData();
            plotbatchrequestchart.setData(seriesbatcrequest);
            plotbatchrequestchart.draw();

            setTimeout(update, updateInterval);
        }

        update();
        //========================================================================================

        // jobs
        //========================================================================================
        function getjobs() {
            $('#dbjobslist').empty();
            var req = $.DataAccess.dbActivityMonitor_List();
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmpldbjobslist").tmpl(data).appendTo("#dbjobslist");
                    $('.tableJobs').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }
        getjobs();

        $('#btnRefreshJobs').on('click', function (e) {
            var tempScrollTop = $(window).scrollTop();
            getjobs();
            setTimeout(function () {
                $(window).scrollTop(tempScrollTop);
            }, 25)
        });
        //========================================================================================
    });

});
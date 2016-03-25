$(function () {
    $(document).ready(function () {
              

        $('#datefrom').val(moment().subtract(7, 'days').format('DD/MM/YYYY'));
        $('#dateto').val(moment().format('DD/MM/YYYY'));
        $('.dpd1').datepicker({ format: 'dd/mm/yyyy' });
        $('.dpd2').datepicker({ format: 'dd/mm/yyyy' });

        $('.is4Table').show();
        $('.is4Chart').hide();

        $("<div id='tooltip'></div>").css({
            position: "absolute",
            display: "none",
            border: "1px solid #fdd",
            padding: "2px",
            "background-color": "#fee",
            opacity: 0.80
        }).appendTo("body");

        function Readhs() {
            $("#ListPlants").empty();
            var req = $.DataAccess.HeatingSystem_Read(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#hsDescr").text(data.DesImpianto + ' ' + data.Descr);
                }
            });
        }

        function ReadAnz() {
            var req = $.DataAccess.cymt200_ReadByCod(localStorage.getItem("hsId"), localStorage.getItem("cymt200Cod"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $elementCode = data.Cod;
                    $("#Descr").text(data.Descr);

                }
            });
        }


        /*
        LOG
        --------------------------------------------------------------------*/
        var $logRowNumber = 0;
        $('#btnLoad').on('click', function (e) {
            $('.is4Table').show();
            $('.is4Chart').hide();
            $('#graphContent').hide();

            $logRowNumber = 0;
            $("#logList").empty();
            $('#tableWait').show();
            $('#tableContent').hide();
            loadLog();
        });

        function loadLog() {
            var r = $.DataAccess.log_cymt200_ListPaged(localStorage.getItem("hsId"), localStorage.getItem("cymt200Cod"), $('#datefrom').val(), $('#dateto').val(), $logRowNumber);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmpllogList").tmpl(data).appendTo("#logList");
                    var o = [{ id: $logRowNumber }];
                    $("#tmplListLogLastItem").tmpl(o).appendTo("#logList");
                    $logRowNumber = $logRowNumber + 100;
                    $('#tableWait').hide();
                    $('#tableContent').show();
                }
            });
        }
        $('#panel-body-ListLog').scroll(function (e) {
            if (e) {
                e.stopPropagation();
                e.preventDefault();
            }
            if ($('#loadMore').length) {
                try {
                    //console.log("'$('#loadMore').offset().top=" + $('#loadMore').offset().top);
                    if ($(window).scrollTop() + $(window).height() >= $('#loadMore').offset().top) {
                        $('#loadMore').remove();
                        loadLog();
                    }
                }
                catch (err) {
                    console.log(err);
                }
            }
        });
        /*--------------------------------------------------------------------*/

        $.fn.call_export = function () {
            //var url = $.appParms.urlGlobal() + 'hs_log_Export.ashx?hsId=' + localStorage.getItem("hsId") + '&type=CAL&code=' + localStorage.getItem("CalCod") + '&fromDate=' + $('#datefrom').val() + '&toDate=' + $('#dateto').val();
            //window.open(url);

            var $table = $('#tableLog');
            $table.removeData(); //data is removed, previous when data existed was preventing initialization of table2excel
            $table.table2excel({
                exclude: ".noExl",
                name: localStorage.getItem("cymt200Cod")
            });

            //$("#tableLog").table2excel({
            //    exclude: ".noExl",
            //    name: localStorage.getItem("AnzCod")
            //});
        }


        /*
        Chart
        ----------------------------------------------------------------------*/
        var options = {
            series: {
                lines: {
                    show: true
                },
                points: {
                    show: true
                }
            },
            legend: {
                noColumns: 2
            },
            grid: {
                hoverable: true,
                clickable: true
            },
            xaxis: {
                mode: "time",
                timeformat: "%m/%d %H:%M"
            },
            yaxis: {
                min: 0,
                ticks: 10,
                tickDecimals: 2
            },
            selection: {
                mode: "x"
            }
        };
        var graphData = [];
        var placeholder = $("#placeholder");
        var plot;

        $.fn.call_chart = function () {
            $('.is4Table').hide();
            $('.is4Chart').show();
            $('#tableContent').hide();
            $('#graphContent').show();
            $('#placeholderContent').hide();
            //$('#graphSelect').show();
            doChart('')
        }

        $('#graph2Select').on('tap click', 'li', function () {
            $('#graphSelect').hide();
            doChart(this.id)
        });

        function doChart(chartType) {
            var gLabels = [],
                gTotalCurrent = [],
                gActivePower1 = [],
                gActivePower2 = [],
                gActivePower3 = [],
                gActiveEnergy1Consumed = [],
                gActiveEnergy2Consumed = [],
                gActiveEnergy3Consumed = [];

            $('.is4Table').hide();
            $('.is4Chart').show();
            $('#tableContent').hide();
            //$('#graphContent').show();
            $('#tableWait').show();

            gLabels = [];
            gTemperature = [];
            gHumidity = [];
            gLight = [];
            gVoltage = [];
            graphData = [];

            var r = $.DataAccess.log_cymt200_List(localStorage.getItem("hsId"), localStorage.getItem("cymt200Cod"), $('#datefrom').val(), $('#dateto').val());
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#tableWait').hide();
                    $('#placeholderContent').show();
                    for (var i = 0; i < data.length; i++) {
                        var date1 = new Date(parseInt(data[i].dtLog.replace("/Date(", "").replace(")/", ""), 10));
                        gTemperature.push([date1, data[i].Temperature]);
                        gHumidity.push([date1, data[i].Humidity]);
                        gLight.push([date1, data[i].Light]);
                        gVoltage.push([date1, data[i].Voltage]);
                    }

                    graphData.push({ label: 'gTemperature', data: gTemperature });
                    graphData.push({ label: 'Humidity', data: gHumidity });
                    //graphData.push({ label: 'Light', data: gLight });
                    //graphData.push({ label: 'Voltage', data: gVoltage });

                    ////if (chartType == 'TotalCurrent') {
                    ////    graphData.push({ label: 'TotalCurrent', data: gTotalCurrent });
                    ////}
                    ////if (chartType == 'ActivePower') {
                    ////    graphData.push({ label: 'ActivePower1', data: gActivePower1 });
                    ////    graphData.push({ label: 'ActivePower2', data: gActivePower2 });
                    ////    graphData.push({ label: 'ActivePower3', data: gActivePower3 });
                    ////}
                    ////if (chartType == 'EnergyConsumed') {
                    ////    graphData.push({ label: 'ActiveEnergy1Consumed', data: gActiveEnergy1Consumed });
                    ////    graphData.push({ label: 'ActiveEnergy2Consumed', data: gActiveEnergy2Consumed });
                    ////    graphData.push({ label: 'ActiveEnergy3Consumed', data: gActiveEnergy3Consumed });
                    ////}
                    //


                    plot = $.plot(placeholder, graphData, options);
                }
            });
        }

        placeholder.bind("plotselected", function (event, ranges) {
            //$("#selection").text(ranges.xaxis.from.toFixed(1) + " to " + ranges.xaxis.to.toFixed(1));
            var zoom = true;
            if (zoom) {
                $.each(plot.getXAxes(), function (_, axis) {
                    var opts = axis.options;
                    opts.min = ranges.xaxis.from;
                    opts.max = ranges.xaxis.to;
                });
                plot.setupGrid();
                plot.draw();
                plot.clearSelection();
            }
        });

        placeholder.bind("plothover", function (event, pos, item) {
            if (item) {
                var x = new Date(item.datapoint[0]),
                    y = item.datapoint[1].toFixed(2);

                $("#tooltip").html(item.series.label + " " + moment(x).format("DD/MM/YYYY HH:MM") + " = " + y)
                    .css({ top: item.pageY + 5, left: item.pageX + 5 })
                    .fadeIn(200);
            } else {
                $("#tooltip").hide();
            }
        });

        $.fn.clear_chart = function () {
            plot = $.plot(placeholder, graphData, options);
        }

        $.fn.call_table = function () {
            $('.is4Table').show();
            $('.is4Chart').hide();
            $('#tableContent').show();
            $('#graphContent').hide();
        }
        /*--------------------------------------------------------------------*/


        Readhs();
        ReadAnz();
        loadLog();

        


    }); //document ready
});
function call_export() { $.fn.call_export(); }
function call_chart() { $.fn.call_chart(); }
function clear_chart() { $.fn.clear_chart(); }
function call_table() { $.fn.call_table(); }
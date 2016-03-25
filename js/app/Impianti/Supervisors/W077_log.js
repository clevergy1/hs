$(function () {

    $(document).ready(function () {

        // Change the selector if needed
        var $table = $('table.scroll'),
            $bodyCells = $table.find('tbody tr:first').children(),
            colWidth;

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

        function ReadW0077() {
            var req = $.DataAccess.W0077_ReadByCod(localStorage.getItem("hsId"), localStorage.getItem("W0077Cod"));
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
        $.fn.call_export = function () {
            var $table = $('#tableLog');
            $table.removeData(); //data is removed, previous when data existed was preventing initialization of table2excel
            $table.table2excel({
                exclude: ".noExl",
                name: localStorage.getItem("W0077Cod")
            });
        }

        var $logRowNumber = 0;
        $('#btnLoad').on('click', function (e) {
            $('.is4Table').show();
            $('.is4Chart').hide();
            $('#graphContent').hide();

            $logRowNumber = 0;
            $("#logList1").empty();
            $("#logList2").empty();
            $("#logList3").empty();
            $('#tableWait').show();
            $('#tableContent').hide();
            $('#tableLog1').hide();
            $('#tableLog2').hide();
            $('#tableLog3').hide();
            loadLog();

        });

        function loadLog() {
            var r = $.DataAccess.log_W0077_ListPaged(localStorage.getItem("hsId"), localStorage.getItem("W0077Cod"), $('#datefrom').val(), $('#dateto').val(), $logRowNumber);
            r.success(function (json) {
                var data = json.d;
                if (data) {

                    switch ($('#logLevel').val()) {
                        case "0":
                            $("#tmpllogList1").tmpl(data).appendTo("#logList1");
                            var o = [{ id: $logRowNumber }];
                            $("#tmplListLogLastItem").tmpl(o).appendTo("#logList1");
                            $logRowNumber = $logRowNumber + 100;                            
                            $('#tableLog1').show();
                            break;
                        case "1":
                            $("#tmpllogList2").tmpl(data).appendTo("#logList2");
                            var o = [{ id: $logRowNumber }];
                            $("#tmplListLogLastItem").tmpl(o).appendTo("#logList2");
                            $logRowNumber = $logRowNumber + 100;
                            $('#tableLog2').show();
                            break;
                        case "2":
                            $("#tmpllogList3").tmpl(data).appendTo("#logList3");
                            var o = [{ id: $logRowNumber }];
                            $("#tmplListLogLastItem").tmpl(o).appendTo("#logList3");
                            $logRowNumber = $logRowNumber + 100;
                            $('#tableLog3').show();
                            break;
                    }
                    
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
        /*----------------------------------------------------------------------------------------*/

        Readhs();
        ReadW0077();
        loadLog();
        setlanguage();

        /*
        Chart
        -------------------------------------------------------------*/
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
            $('#graphSelect').show();
        }

        $('#graph2Select').on('tap click', 'li', function () {
            $('#graphSelect').hide();
            doChart(this.id)
        });

        function doChart(chartType) {
            var gLabels = [],
                GW_Actual_Battery_SOC = [],
                PM1_Active_Power_Total = [];

            $('.is4Table').hide();
            $('.is4Chart').show();
            $('#tableContent').hide();
            //$('#graphContent').show();
            $('#tableWait').show();

            gLabels = [];
            GW_Actual_Battery_SOC = [];
            PM1_Active_Power_Total = [];

            graphData = [];

            var r = $.DataAccess.log_W0077_List(localStorage.getItem("hsId"), localStorage.getItem("W0077Cod"), $('#datefrom').val(), $('#dateto').val());
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#tableWait').hide();
                    $('#placeholderContent').show();
                    for (var i = 0; i < data.length; i++) {
                        var date1 = new Date(parseInt(data[i].dtLog.replace("/Date(", "").replace(")/", ""), 10));
                        console.log(date1);
                        GW_Actual_Battery_SOC.push([date1, data[i].GW_Actual_Battery_SOC]);
                        PM1_Active_Power_Total.push([date1, data[i].PM1_Active_Power_Total]);
                    }
                    if (chartType == 'GW_Actual_Battery_SOC') {
                        graphData.push({ label: 'Battery %', data: GW_Actual_Battery_SOC });
                    }
                    if (chartType == 'PM1_Active_Power_Total') {
                        graphData.push({ label: 'PM1 Active Power Total', data: PM1_Active_Power_Total });
                     }
                    //

                    console.log('graphData', graphData);
                    //console.log('gTotalCurrent', gTotalCurrent);

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
        /*------------------------------------------------------------------------*/


    }); //document ready
});
function call_export() {    $.fn.call_export();}
function call_chart() { $.fn.call_chart(); }
function clear_chart() { $.fn.clear_chart(); }
function call_table() { $.fn.call_table(); }
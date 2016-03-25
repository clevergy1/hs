$(function () {
    $(document).ready(function () {

        var gLabels=[],gdataset1=[], gdataset2=[];

        $('.table').footable();
        $('.table').data('page-size', 20);
        $('.table').data('limit-navigation', 4);
        $('.table').trigger('footable_initialized');

        $('#datefrom').val(moment().subtract(7, 'days').format('DD/MM/YYYY'));
        $('#dateto').val(moment().format('DD/MM/YYYY'));
        $('.dpd1').datepicker({ format: 'dd/mm/yyyy' });
        $('.dpd2').datepicker({ format: 'dd/mm/yyyy' });

        $('#btnLoad').on('click', function (e) { loadLog(); });

        function Readhs() {
            $("#ListPlants").empty();
            var req = $.DataAccess.HeatingSystem_Read(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#hsDescr").text(data.Descr);
                }
            });
        }

        function ReadCal() {
            var req = $.DataAccess.hs_Cal_ReadByCalCod(localStorage.getItem("hsId"),localStorage.getItem("CalCod"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $elementCode = data.CalCod;
                    $("#Descr").text(data.CalDescr);
                    
                }
            });
        }

        function loadLog() {
            $("#logList").empty();
            var r = $.DataAccess.log_hs_Cal_List(localStorage.getItem("hsId"), localStorage.getItem("CalCod"), $('#datefrom').val(), $('#dateto').val());
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    gLabels = [], dataset1=[], gdataset2=[];
                    for (var i = 0; i < data.length; i++) {
                        data[i].dtLog = moment(data[i].dtLog).format('DD/MM/YYYY HH:mm');
                        gLabels.push(data[i].dtLog);
                        gdataset1.push(data[i].SetPoint);
                        gdataset2.push(data[i].isRunning);
                        $('#logDescription').text(data[i].CalCod + ' ' + data[i].CalDescr);
                    }//end for
                    $("#tmpllogList").tmpl(data).appendTo("#logList");

                    //for (var i = 0; i < data.length; i++) { loadProbeElem(data[i].CalCod) }
                }
            });
        }

        function loadProbeElem(elementCode) {
            $("#sList_" + elementCode).empty();
            var r = $.DataAccess.hs_TemperatureProbeElem_List(localStorage.getItem("hsId"), elementCode);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplProbeElem").tmpl(data).appendTo("#sList_" + elementCode);
                    $('.tableProbeElem').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }
        

        $.fn.call_export = function () {
            var url = $.appParms.urlGlobal() + 'hs_log_Export.ashx?hsId=' + localStorage.getItem("hsId") + '&type=CAL&code=' + localStorage.getItem("CalCod") + '&fromDate=' + $('#datefrom').val() + '&toDate=' + $('#dateto').val();
            window.open(url);
        }

        Readhs();
        ReadCal();
        loadLog();

        /**/
        var lineChartData = {
            labels: gLabels,
            datasets: [
				{
				    label: "Set point",
				    fillColor: "rgba(220,220,220,0.2)",
				    strokeColor: "rgba(220,220,220,1)",
				    pointColor: "rgba(220,220,220,1)",
				    pointStrokeColor: "#fff",
				    pointHighlightFill: "#fff",
				    pointHighlightStroke: "rgba(220,220,220,1)",
				    data: [10,20,30,40]
				},
				{
				    label: "% run",
				    fillColor: "rgba(151,187,205,0.2)",
				    strokeColor: "rgba(151,187,205,1)",
				    pointColor: "rgba(151,187,205,1)",
				    pointStrokeColor: "#fff",
				    pointHighlightFill: "#fff",
				    pointHighlightStroke: "rgba(151,187,205,1)",
				    data: [1,2,3,4]
				}
            ]

        }

        $.fn.call_chart = function () {
            $('#tableContent').hide();
            $('#graphContent').show();
           // lineChartData.labels = ['a', 'b', 'c', 'd'];

            lineChartData.labels = gLabels;
            lineChartData.datasets[0].data = gdataset1;
            lineChartData.datasets[1].data = gdataset2;

           // console.log(lineChartData.datasets[0].data);
            console.log(gdataset1);


            var ctx = document.getElementById("canvas").getContext("2d");
            window.myLine = new Chart(ctx).Line(lineChartData, {
                responsive: true
            });
            
        }
        /**/


    }); //document ready
});
function call_export() {
    $.fn.call_export();
}
function call_chart() { $.fn.call_chart(); }
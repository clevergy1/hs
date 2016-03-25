$(function () {
    $(document).ready(function () {
        //$('#tableLog').bootstrapTable();
        var gLabels=[],gdataset1=[], gdataset2=[];
    

        $('#datefrom').val(moment().subtract(7, 'days').format('DD/MM/YYYY'));
        $('#dateto').val(moment().format('DD/MM/YYYY'));
        $('.dpd1').datepicker({ format: 'dd/mm/yyyy' });
        $('.dpd2').datepicker({ format: 'dd/mm/yyyy' });

        $('#btnLoad').on('click', function (e) {
            $logRowNumber = 0;
            $("#logList").empty();
            loadLog();
        });

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
            var req = $.DataAccess.hs_Anz_ReadByCod(localStorage.getItem("hsId"), localStorage.getItem("AnzCod"));
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
        function loadLog() {
            var r = $.DataAccess.log_hs_Anz_ListPaged(localStorage.getItem("hsId"), localStorage.getItem("AnzCod"), $('#datefrom').val(), $('#dateto').val(), $logRowNumber);
            r.success(function (json) {    
                var data = json.d;
                if (data) {
                    //gLabels = [], dataset1=[], gdataset2=[];
                    //for (var i = 0; i < data.length; i++) {                       
                    //    //gLabels.push(data[i].dtLog);
                    //    //gdataset1.push(data[i].SetPoint);
                    //    //gdataset2.push(data[i].isRunning);
                    //    //$('#logDescription').text(data[i].Cod + ' ' + data[i].Descr);
                    //}//end for
                    $("#tmpllogList").tmpl(data).appendTo("#logList");
                    //$('#tableLog').stickyTableHeaders({ scrollableArea: $('#panel-body-ListLog')[0], "fixedOffset": 2 });
                   
                    if (data.length > 99) {
                        var o = [{ id: $logRowNumber }];
                        $("#tmplListLogLastItem").tmpl(o).appendTo("#logList");
                        $logRowNumber = $logRowNumber + 100;
                    }
                    //for (var i = 0; i < data.length; i++) { loadProbeElem(data[i].CalCod) }
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
            var $table = $('#tableLog');
            $table.removeData(); //data is removed, previous when data existed was preventing initialization of table2excel
            $table.table2excel({
                exclude: ".noExl",
                name: localStorage.getItem("AnzCod")
            });
        }

        Readhs();
        ReadAnz();
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
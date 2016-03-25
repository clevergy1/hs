$(function () {
    $(document).ready(function () {

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


        function ReadProbe() {
            var req = $.DataAccess.hs_TemperatureProbes_ReadByProbeCod(localStorage.getItem("hsId"), localStorage.getItem("ProbeCod"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#Descr').text(data.ProbeDesc);
                }
            });
        }

        function loadLog() {
            $("#logList").empty();
            var r = $.DataAccess.log_hs_TemperatureProbes_List(localStorage.getItem("hsId"), localStorage.getItem("ProbeCod"), $('#datefrom').val(), $('#dateto').val());
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        data[i].dtLog = moment(data[i].dtLog).format('DD/MM/YYYY HH:mm');
                        $('#logDescription').text(data[i].ProbeCod + ' ' + data[i].ProbeDesc);
                    }//end for
                    $("#tmpllogList").tmpl(data).appendTo("#logList");
                    //$('.table').trigger('footable_redraw');
                    //$("#logList").niceScroll({
                    //    cursorcolor: "#1FB5AD",
                    //    cursorborder: "0px solid #fff",
                    //    cursorborderradius: "0px",
                    //    cursorwidth: "3px"
                    //});
                    //$('.panel-body').slimscroll({
                    //    height: '600px',
                    //    wheelStep: 35
                    //});
                    //setlanguage();
                }
            });
        }

        $.fn.call_export = function () {
            var url = $.appParms.urlGlobal() + 'hs_log_Export.ashx?hsId=' + localStorage.getItem("hsId") + '&type=S&code='+localStorage.getItem("ProbeCod") + '&fromDate=' + $('#datefrom').val() + '&toDate='+$('#dateto').val();
            window.open(url);
        }

        Readhs();
        ReadProbe();
        loadLog();
    }); //document ready
});
function call_export() {
    $.fn.call_export();
}
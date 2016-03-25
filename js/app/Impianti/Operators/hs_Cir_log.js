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

        function loadLog() {
            $("#logList").empty();
            var r = $.DataAccess.log_hs_Cir_List(localStorage.getItem("hsId"), localStorage.getItem("CirCod"), $('#datefrom').val(), $('#dateto').val());
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        data[i].dtLog = moment(data[i].dtLog).format('DD/MM/YYYY HH:mm');
                        $('#logDescription').text(data[i].CalCir + ' ' + data[i].CirDescr);
                    }//end for
                    $("#tmpllogList").tmpl(data).appendTo("#logList");
                }
            });
        }

        $.fn.call_export = function () {
            var url = $.appParms.urlGlobal() + 'hs_log_Export.ashx?hsId=' + localStorage.getItem("hsId") + '&type=CIR&code=' + localStorage.getItem("CirCod") + '&fromDate=' + $('#datefrom').val() + '&toDate=' + $('#dateto').val();
            window.open(url);
        }

        Readhs();
        loadLog();
    }); //document ready
});
function call_export() {
    $.fn.call_export();
}
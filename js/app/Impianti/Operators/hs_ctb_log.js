$(function () {
    $(document).ready(function () {


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
            var r = $.DataAccess.log_hs_Ctb_List(localStorage.getItem("hsId"), localStorage.getItem("CtbCod"), $('#datefrom').val(), $('#dateto').val());
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmpllogList").tmpl(data).appendTo("#logList");
                }
            });
        }

        $.fn.call_export = function () {

        }

        Readhs();
        loadLog();
    }); //document ready
});
function call_export() {
    $.fn.call_export();
}
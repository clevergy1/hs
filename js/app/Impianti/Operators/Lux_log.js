
$(function () {
    $(document).ready(function () {
        $('#datefrom').val(moment().subtract(7, 'days').format('DD/MM/YYYY'));
        $('#dateto').val(moment().format('DD/MM/YYYY'));
        $('.dpd1').datepicker({ format: 'dd/mm/yyyy' });
        $('.dpd2').datepicker({ format: 'dd/mm/yyyy' });

        function Readhs() {
            var req = $.DataAccess.HeatingSystem_Read(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#hsDescr").text(data.DesImpianto + ' ' + data.Descr);
                }
            });
        }

        function ReadElement() {
            var req = $.DataAccess.Lux_ReadByCod(localStorage.getItem("hsId"), localStorage.getItem("Cod"));
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
                name: localStorage.getItem("Cod")
            });
        }

        var $logRowNumber = 0;
        $('#btnLoad').on('click', function (e) {

            $logRowNumber = 0;
            $("#logList").empty();

            loadLog();

        });

        function loadLog() {
            var r = $.DataAccess.log_Lux_ListPaged(localStorage.getItem("hsId"), localStorage.getItem("Cod"), $('#datefrom').val(), $('#dateto').val(), $logRowNumber);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmpllogList").tmpl(data).appendTo("#logList");
                    var o = [{ id: $logRowNumber }];
                    $("#tmplListLogLastItem").tmpl(o).appendTo("#logList");
                    $logRowNumber = $logRowNumber + 100;
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
        ReadElement();
        loadLog();
        setlanguage();

    }); // document ready
});
function call_export() { $.fn.call_export(); }


$(function () {
    $(document).ready(function () {

        $('.table').footable();
        $('.table').data('page-size', 20);
        $('.table').data('limit-navigation', 4);
        $('.table').trigger('footable_initialized');

        //$('#datefrom').daterangepicker({
        //    startDate: moment().subtract('days', 29),
        //    endDate: moment()
        //    },
        //    function (start, end) {
        //        $('#datefrom').val(start.format("DD/MM/YYYY"));
        //        $('#dateto').val(end.format("DD/MM/YYYY"));
        //    }
        //);

        //$('#reservation').daterangepicker(null, function (start, end, label) {
        //    console.log(start.toISOString(), end.toISOString(), label);
        //});

        //var checkin = $('.dpd1').datepicker({
        //    onRender: function (date) {               
        //        return date.valueOf() < now.valueOf() ? 'disabled' : '';
        //    }
        //}).on('changeDate', function (ev) {
        //    if (ev.date.valueOf() > checkout.date.valueOf()) {
        //        var newDate = new Date(ev.date);
        //        newDate.setDate(newDate.getDate() + 1);
        //        checkout.setValue(newDate);
        //        console.log('ev.date=' + ev.date + ' newDate=' + newDate);
        //    }
        //    checkin.hide();
        //    $('.dpd2')[0].focus();
        //}).data('datepicker');
        //var checkout = $('.dpd2').datepicker({
        //    onRender: function (date) {
        //        return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
        //    }
        //}).on('changeDate', function (ev) {
        //    checkout.hide();
        //}).data('datepicker');


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

        function readDoor() {
            var req = $.DataAccess.hs_Doors_ReadByDoorCod(localStorage.getItem("hsId"), localStorage.getItem("DoorCod"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#Descr').text(data.DoorDesc);
                }
            });
        }

        function loadLog() {
            $("#logList").empty();
            var r = $.DataAccess.log_hs_Doors_List(localStorage.getItem("hsId"), localStorage.getItem("DoorCod"),$('#datefrom').val(),$('#dateto').val());
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        data[i].dtLog = moment(data[i].dtLog).format('DD/MM/YYYY HH:mm');
                        $('#logDescription').text(data[i].DoorCod + ' ' + data[i].DoorDesc);
                    }//end for
                    $("#tmpllogList").tmpl(data).appendTo("#logList");
                    //$('.table').trigger('footable_redraw');
                    $("#logList").niceScroll({
                        cursorcolor: "#1FB5AD",
                        cursorborder: "0px solid #fff",
                        cursorborderradius: "0px",
                        cursorwidth: "3px"
                    });
                    setlanguage();
                }
            });
        }

        Readhs();
        readDoor();
        loadLog();
    }); //document ready
});
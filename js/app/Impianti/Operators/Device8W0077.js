$(function () {

    $(document).ready(function () {

        /*
        signalR
        ----------------------------------------------*/
        $.fn.received_hs_W0077_setStatus = function (hsId, Cod, stato) {
            //console.log("received_hs_Anz_setStatus");
            if (localStorage.getItem("hsId") == hsId) {
                statusChanged('#stato_' + Cod, stato);
            }
        }
        $.fn.received_W0077_changed = function (hsId, Cod) {
            console.log("received_W0077_changed cod= " + Cod);
            if (localStorage.getItem("hsId") == hsId) {
                readw0077(Cod);
            }
        }
        /**/
        function statusChanged(elem, stato) {
            if (stato == 0) {
                $(elem).html('<i class="fa fa-thumbs-o-up"></i>');
            }
            else {
                if (stato == 1) {
                    $(elem).html('<img src="images/status1.png" style="height:24px;width:24px" />');
                }
                else {
                    $(elem).html('<img src="images/status2.png" style="height:24px;width:24px" />');
                }
            }
        }
        /**/
        /*--------------------------------------------*/

        var $table_W0077_data;
        var $tablehs_args = null;


        Readhs();
        loadw0077();
        setlanguage();

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

        /*
        Gruppi fotovoltaico/batt.
        ------------------------------------------------------------------------*/
        function loadw0077() {
            $("#ListW0077").empty();
            var r = $.DataAccess.W0077_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                $table_W0077_data = json.d;
                if ($table_W0077_data) {
                    $("#tmplW0077").tmpl($table_W0077_data).appendTo("#ListW0077");
                    setlanguage();
                }
            });
        }

        function readw0077(Cod) {
            var r = $.DataAccess.W0077_ReadByCod(localStorage.getItem("hsId"), Cod);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#lastReceived_' + data.Cod).text(moment(data.lastReceived).format("DD/MM/YYYY HH:mm"));

                    $('.LastUpdate').html('');
                    $('#LastUpdate_' + data.Cod).html('<img src="images/action_success.png" alt="" style="height:15px;width:15px"/>');

                    for (var i = 0; i < $table_W0077_data.length; i++) {
                        if ($table_W0077_data[i].Cod == Cod) {
                             $table_W0077_data[i] = data;
                             if (!$('#divDetail').is(':visible')) {
                                 $("#divDetail").empty();
                                 $("#tmplDetail").tmpl($table_W0077_data[i]).appendTo("#divDetail");
                            }
                        }
                    }
                }
            });
        }
        /*--------------------------------------------------------------------------*/

        /*
        Detail
        -----------------------------------------------------------------------------*/
        $.fn.callShowDetail = function (Id) {
            for (var i = 0; i < $table_W0077_data.length; i++) {
                if ($table_W0077_data[i].Id == Id) {
                    $("#divDetail").empty();
                    $("#tmplDetail").tmpl($table_W0077_data[i]).appendTo("#divDetail");
                    $('#divDetail').show();
                    $('#divList').hide();
                }
            }
        }
        $.fn.closeDetail = function () {
            $('#divDetail').hide();
            $('#divList').show();
        }
        /*---------------------------------------------------------------------------*/

        /*Add 
        ------------------------------------------------------------------------*/
        $.fn.callAdd = function () {
            $.module.load('Impianti/Operators/W0077_Add');
        }
        /*----------------------------------------------------------------------*/

        /* Update 
        ------------------------------------------------------------------------*/
        $.fn.callUpd = function (Id) {
            localStorage.setItem("W0077Id", Id);
            $.module.load('Impianti/Operators/W0077_Update');
        }
        /*----------------------------------------------------------------------*/

    }); //document ready

});

function callAdd() { $.fn.callAdd(); }
function callUpd(Id) { $.fn.callUpd(Id); }
function callShowDetail(Id) { $.fn.callShowDetail(Id); }
function closeDetail() { $.fn.closeDetail(); }
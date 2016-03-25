$(function () {

    $(document).ready(function () {

        /*
        signalR
        ----------------------------------------------*/
        $.fn.received_hs_cymt100_setStatus = function (hsId, Cod, stato) {
            //console.log("received_hs_Anz_setStatus");
            if (localStorage.getItem("hsId") == hsId) {
                statusChanged('#Anzstato_' + Cod, stato);
            }
        }
        $.fn.received_cymt100_changed = function (hsId, Cod) {
            console.log("Device8Anz received_cymt100_changed");
            if (localStorage.getItem("hsId") == hsId) {
                readAnzcymt100(Cod);
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

        var $table_Anzcymt100_data;
        var $tablehs_args = null;


        Readhs();
        loadAnzcymt100();
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

        /*
        Analizzatori di rete
        ------------------------------------------------------------------------*/
        function loadAnzcymt100() {
            $("#AnzListcymt100").empty();
            var r = $.DataAccess.cymt100_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                $table_Anzcymt100_data = json.d;
                if ($table_Anzcymt100_data) {
                    $("#tmplAnzcymt100").tmpl($table_Anzcymt100_data).appendTo("#AnzListcymt100");
                    setlanguage();
                }
            });
        }

        function readAnzcymt100(Cod) {
            var r = $.DataAccess.cymt100_ReadByCod(localStorage.getItem("hsId"), Cod);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#lastReceived_' + data.Cod).text(moment(data.lastReceived).format("DD/MM/YYYY HH:mm"));

                    $('.LastUpdate').html('');
                    $('#LastUpdate_' + data.Cod).html('<img src="images/action_success.png" alt="" style="height:15px;width:15px"/>');

                    for (var i = 0; i < $table_Anzcymt100_data.length; i++) {
                        if ($table_Anzcymt100_data[i].Cod == Cod) {
                            //console.log('$tablehs_Anz_data[i]', $tablehs_Anz_data[i]);
                            //console.log('data', data);
                            $table_Anzcymt100_data[i] = data;
                            if (!$('#divDetailcymt100').is(':visible')) {
                                $("#divDetailcymt100").empty();
                                $("#tmplAnzDetailcymt100").tmpl($table_Anzcymt100_data[i]).appendTo("#divDetailcymt100");
                            }
                        }
                    }
                }
            });
        }

        $.fn.logAnzcymt100 = function (Cod) {
            localStorage.setItem("AnzCod", Cod);
            $.module.load('Impianti/supervisors/cymt100_log');
        }

        $.fn.callShowDetailcymt100 = function (Id) {
            for (var i = 0; i < $table_Anzcymt100_data.length; i++) {
                if ($table_Anzcymt100_data[i].Id == Id) {
                    $("#divDetailcymt100").empty();
                    $("#tmplAnzDetailcymt100").tmpl($table_Anzcymt100_data[i]).appendTo("#divDetailcymt100");
                    $('#divDetailcymt100').show();
                    $('#divListcymt100').hide();
                }
            }
        }
        $.fn.closeAnzDetailcymt100 = function () {
            $('#divDetailcymt100').hide();
            $('#divListcymt100').show();
        }
        /*----------------------------------------------------------------------*/

        /*Add 
        ------------------------------------------------------------------------*/
        $.fn.callAddcymt100 = function () {
            $.module.load('Impianti/Operators/cymt100_Add');
        }
        /*----------------------------------------------------------------------*/

        /* Update 
        ------------------------------------------------------------------------*/
        $.fn.callUpdcymt100 = function (Id) {
            localStorage.setItem("cymt100Id", Id);
            $.module.load('Impianti/Operators/cymt100_Update');
        }
        /*----------------------------------------------------------------------*/

        /* Replacements
        ------------------------------------------------------------------------*/
        $.fn.callReplacementscymt100 = function (Id) {
            localStorage.setItem("ParentId", Id);
            $.module.load('Impianti/Operators/cymt100_Replacements');
        }
        /*----------------------------------------------------------------------*/

    }); //document ready

});

function callAddcymt100() { $.fn.callAddcymt100(); }
function callUpdcymt100(Id) { $.fn.callUpdcymt100(Id); }
function callShowDetailcymt100(Id) { $.fn.callShowDetailcymt100(Id); }
function closeAnzDetailcymt100() { $.fn.closeAnzDetailcymt100(); }
function logAnzcymt100(Cod) { $.fn.logAnzcymt100(Cod); }
$(function () {

    $(document).ready(function () {

        /*
        signalR
        ----------------------------------------------*/
        $.fn.received_hs_cymt200_setStatus = function (hsId, Cod, stato) {
            //console.log("received_hs_Anz_setStatus");
            if (localStorage.getItem("hsId") == hsId) {
                statusChanged('#stato_' + Cod, stato);
            }
        }
        $.fn.received_cymt200_changed = function (hsId, Cod) {
            console.log("received_cymt200_changed cod= " + Cod);
            if (localStorage.getItem("hsId") == hsId) {
                readAnzcymt200(Cod);
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

        var $table_cymt200_data;
        var $tablehs_args = null;


        Readhs();
        loadAnzcymt200();
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
        function loadAnzcymt200() {
            $("#Listcymt200").empty();
            var r = $.DataAccess.cymt200_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                $table_cymt200_data = json.d;
                if ($table_cymt200_data) {
                    $("#tmplcymt200").tmpl($table_cymt200_data).appendTo("#Listcymt200");
                    setlanguage();
                }
            });
        }

        function readAnzcymt200(Cod) {
            var r = $.DataAccess.cymt200_ReadByCod(localStorage.getItem("hsId"), Cod);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#lastReceived_' + data.Cod).text(moment(data.lastReceived).format("DD/MM/YYYY HH:mm"));

                    $('.LastUpdate').html('');
                    $('#LastUpdate_' + data.Cod).html('<img src="images/action_success.png" alt="" style="height:15px;width:15px"/>');

                    for (var i = 0; i < $table_cymt200_data.length; i++) {
                        if ($table_cymt200_data[i].Cod == Cod) {
                            //console.log('$tablehs_Anz_data[i]', $tablehs_Anz_data[i]);
                            //console.log('data', data);
                            $table_cymt200_data[i] = data;
                            if (!$('#divDetailcymt200').is(':visible')) {
                                $("#divDetailcymt200").empty();
                                $("#tmplDetailcymt200").tmpl($table_cymt200_data[i]).appendTo("#divDetailcymt200");
                            }
                        }
                    }
                }
            });
        }

        $.fn.logAnzcymt200 = function (Cod) {
            localStorage.setItem("AnzCod", Cod);
            $.module.load('Impianti/Operators/cymt200_log');
        }

        $.fn.callShowDetailcymt200 = function (Id) {
            for (var i = 0; i < $table_cymt200_data.length; i++) {
                if ($table_cymt200_data[i].Id == Id) {
                    $("#divDetailcymt200").empty();
                    $("#tmplDetailcymt200").tmpl($table_cymt200_data[i]).appendTo("#divDetailcymt200");
                    $('#divDetailcymt200').show();
                    $('#divListcymt200').hide();
                }
            }
        }
        $.fn.closeAnzDetailcymt200 = function () {
            $('#divDetailcymt200').hide();
            $('#divListcymt200').show();
        }
        /*----------------------------------------------------------------------*/

        /*Add 
        ------------------------------------------------------------------------*/
        $.fn.callAddcymt200 = function () {
            $.module.load('Impianti/Operators/cymt200_Add');
        }
        /*----------------------------------------------------------------------*/

        /* Update 
        ------------------------------------------------------------------------*/
        $.fn.callUpdcymt200 = function (Id) {
            localStorage.setItem("cymt200Id", Id);
            $.module.load('Impianti/Operators/cymt200_Update');
        }
        /*----------------------------------------------------------------------*/
                
        /* Replacements
        ------------------------------------------------------------------------*/
        $.fn.callReplacements = function (Id) {
            localStorage.setItem("ParentId", Id);
            $.module.load('Impianti/Operators/cymt200_Replacements');
        }
        /*----------------------------------------------------------------------*/

        /*
        Error codes
        ------------------------------------------------------------------------*/
        var $errorRowNumber0;
        $.fn.callErrorLog = function (Cod) {            
            $errorRowNumber = 0;
            $('#Cod').text(Cod);
            $("#ListErrorLog").empty();
            loadErrorLog();
            $('#Errors').show();
        }
        $('#closeErrors').on('click', function () {
            $('#Errors').hide();
        });

        function loadErrorLog() {
            var req = $.DataAccess.hs_ErrorLog_ListByElement(localStorage.getItem("hsId"), $('#Cod').text(), $errorRowNumber);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplListErrorLog").tmpl(data).appendTo("#ListErrorLog");
                    if (data.length > 99) {
                        var o = [{ id: $errorRowNumber }];
                        $("#tmplListErrorLogLastItem").tmpl(o).appendTo("#ListErrorLog");
                        $errorRowNumber = $errorRowNumber + 100;
                    }
                }
            });
        }

        $('#panel-body-ListErrorLog').scroll(function (e) {
            if (e) {
                e.stopPropagation();
                e.preventDefault();
            }
            if ($('#loadMore').length) {
                try {
                    //console.log("'$('#loadMore').offset().top=" + $('#loadMore').offset().top);
                    if ($(window).scrollTop() + $(window).height() >= $('#loadMore').offset().top) {
                        $('#loadMore').remove();
                        loadErrorLog();
                    }
                }
                catch (err) {
                    console.log(err);
                }
            }
        });
        /*----------------------------------------------------------------------*/

    }); //document ready

});

function callAddcymt200() { $.fn.callAddcymt200(); }
function callUpdcymt200(Id) { $.fn.callUpdcymt200(Id); }
function callShowDetailcymt200(Id) { $.fn.callShowDetailcymt200(Id); }
function closeAnzDetailcymt200() { $.fn.closeAnzDetailcymt200(); }
function logAnzcymt200(Cod) { $.fn.logAnzcymt200(Cod); }
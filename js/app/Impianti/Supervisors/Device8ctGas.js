$(function () {
    $(document).ready(function () {
        /*
        signalR
        ----------------------------------------------*/
        $.fn.received_hs_Gas_setStatus = function (hsId, Cod, stato) {
            //console.log("received_hs_Anz_setStatus");
            if (localStorage.getItem("hsId") == hsId) {
                statusChanged('#Ctlstato_' + Cod, stato);
                $('#btnrequestLog').show();
            }
        }
        $.fn.received_hs_Gas_setValue = function (hsId, Cod, currentValue) {
            if (localStorage.getItem("hsId") == hsId) {
                $('#btnrequestLog').show();
                $('#currentValue_'+Cod).text(Number(currentValue).toLocaleString());
            }
        }
        $.fn.received_hs_Gas_setValueDigital = function (hsId,
                                                        Cod,
                                                        CorrectedGasCounter,
                                                        MeasuredGasCounter,
                                                        Pressure,
                                                        Temperature,
                                                        ConversionCostant,
                                                        CorrectedVolInErrCond,
                                                        CorrectedVolDay,
                                                        CorrectedVolMonth,
                                                        MeasuredVolDay,
                                                        MeasuredFlow,
                                                        CorrectedFlow,
                                                        BatteryCapacity) {

            if (localStorage.getItem("hsId") == hsId) {
                $('#btnrequestLog').show();
                $('#MeasuredGasCounter_' + Cod).text(Number(MeasuredGasCounter).toLocaleString());
                $('#CorrectedGasCounter_' + Cod).text(Number(CorrectedGasCounter).toLocaleString());
                $('#Pressure_' + Cod).text(Number(Pressure).toLocaleString());
                $('#Temperature_' + Cod).text(Number(Temperature).toLocaleString());
                $('#ConversionCostant_' + Cod).text(Number(ConversionCostant).toLocaleString());
                $('#CorrectedVolInErrCond_' + Cod).text(Number(CorrectedVolInErrCond).toLocaleString());
                $('#CorrectedVolDay_' + Cod).text(Number(CorrectedVolDay).toLocaleString());
                $('#CorrectedVolMonth_' + Cod).text(Number(CorrectedVolMonth).toLocaleString());
                $('#MeasuredVolDay_' + Cod).text(Number(MeasuredVolDay).toLocaleString());
                $('#MeasuredFlow_' + Cod).text(Number(MeasuredFlow).toLocaleString());
                $('#CorrectedFlow_' + Cod).text(Number(CorrectedFlow).toLocaleString());
                $('#BatteryCapacity_' + Cod).text(Number(BatteryCapacity).toLocaleString());
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

        //se sono in san felice desenzano faccio vedere il tasto per andare al config del gas meter
        if (localStorage.IdImpianto == "6ab1b182-133e-40a6-bf4c-3b72453c9f60") {
            $('.ConfGasValue').show();
        } else {
            $('.ConfGasValue').hide();
        }


        var $table_data;

        $('.table').footable();
        $('.table').data('page-size', 30);
        $('.table').data('limit-navigation', 4);
        $('.table').trigger('footable_initialized');

        Readhs();
        loadCtGas();
        setlanguage();

        function Readhs() {
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

        $('#btnCallAdd').on('click', function (e) {
            $.module.load('Impianti/supervisors/hs_Gas_Add');
        });

        $('#btnrequestLog').on('click', function () {
            //setTimeout(function () { $.rt.start(); }, 1000);
            console.log('btnrequestLog');
            $.DataAccess.HeatingSystem_requestLog(localStorage.getItem("hsId"));
            loadCtGas();
            //$('#btnrequestLog').hide();
        });

        function loadCtGas() {
            $("#head").empty();
            $("#List").empty();
            var r = $.DataAccess.hs_Gas_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                $table_data = json.d;
                if (data) {                    
                    $("#tmplHead").tmpl($table_data[0]).appendTo("#head");
                    $("#tmpl").tmpl($table_data).appendTo("#List");
                    //$('.table').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }

        $.fn.callUpdate = function (Id) {
            localStorage.setItem("GasId", Id);
            $.module.load('Impianti/supervisors/hs_Gas_Update');
        }

        $.fn.callShowDetail = function (Id) {
            for (var i = 0; i < $table_data.length; i++) {
                if ($table_data[i].Id == Id) {
                    $("#divDetail").empty();
                    $("#tmplDetail").tmpl($table_data[i]).appendTo("#divDetail");
                    $('#divDetail').show();
                    $('#divList').hide();
                }
            }
        }
        $.fn.closeDetail = function () {
            $('#divDetail').hide();
            $('#divList').show();
        }

        /*
        Error codes
        ------------------------------------------------------------------------*/
        var $errorRowNumber0;
        $.fn.callErrorLog = function (Cod) {
            console.log('callErrorLog',Cod);
            $errorRowNumber = 0
            $('#Cod').text(Cod);
            $("#ListErrorLog").empty();
            loadErrorLog();
        }
        $('#closeErrors').on('click', function () {
            $('#Errors').hide();
            //$('#list').show();
        });

        function loadErrorLog() {
            console.log('loadErrorLog');
            $('#Errors').show();
            var req = $.DataAccess.hs_ErrorLog_ListByElement(localStorage.getItem("hsId"), $('#Cod').text(), $errorRowNumber);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    //for (var i = 0; i < data.length; i++) {
                    //    data[i].LogDate = moment(data[i].LogDate).format('DD/MM/YYYY HH:mm');
                    //}//end for
                    $("#tmplListErrorLog").tmpl(data).appendTo("#ListErrorLog");
                    var o = [{ id: $errorRowNumber }];
                    $("#tmplListErrorLogLastItem").tmpl(o).appendTo("#ListErrorLog");
                    $('.tableErrorLog').trigger('footable_redraw');
                    //$('#Errors').show();
                    //$('#list').hide();

                    $errorRowNumber = $errorRowNumber + 100;
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
        
        /* Replacements
        ------------------------------------------------------------------------*/
        $.fn.callReplacements = function (Id) {
            localStorage.setItem("ParentId", Id);
            $.module.load('Impianti/supervisors/hs_Gas_Replacements');
        }
        /* Chiamo la pagina di configurazione delle elemento
        /*----------------------------------------------------------------------*/
            
        $.fn.callconfigGas = function (IdGas) {
            localStorage.setItem("IdGas", IdGas);
            $.module.load('Impianti/Supervisors/hs_Gas_Config');
        }



    }); //document ready
});
function callShowDetail(Id) { $.fn.callShowDetail(Id); }
function closeDetail() { $.fn.closeDetail(); }
//function callErrorLog(Cod) {$.fn.callErrorLog(Cod);}

function callconfigGas(IdGas) {
    $.fn.callconfigGas(IdGas);
}


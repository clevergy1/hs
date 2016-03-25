$(function () {

    $(document).ready(function () {
        /*
        fixed header table
        ---------------------------------------------------------------*/
        $('#mainTable').floatThead({
            scrollContainer: function ($table) {
                return $table.closest('.tableContainer');
            }
        });    
        /*-------------------------------------------------------------*/
        //if (localStorage.getItem("hsId") == 3) {
        //    $('.tipo1').css("display", "none");

        //} else {
        //    $('.tipo1').css("display", "block");
        //}

        $('#hsalarmThresholdResult').removeClass("operationOk");
        $('#hsalarmThresholdResult').removeClass("operationNok");
        $('#hsantifreezeResult').removeClass("operationOk");
        $('#hsantifreezeResult').removeClass("operationNok");
        $('#hsCIRULATORSparametersResult').removeClass("operationOk");
        $('#hsCIRULATORSparametersResult').removeClass("operationNok");
        $('#hsCascadeBoilersparameterResult').removeClass("operationOk");
        $('#hsCascadeBoilersparameterResult').removeClass("operationNok");

        $('.isNumeric').autoNumeric('init');

        $('#Allarmi_TempoAvvioCal').autoNumeric('set', '0');
        $('#Allarmi_SogliaTemp').autoNumeric('set', '0');
        $('#Allarmi_kScambiatore').autoNumeric('set', '0');
        $('#Antigelo_Soglia_start').autoNumeric('set', '0');
        $('#Antigelo_Soglia_stop').autoNumeric('set', '0');
        $('#Antigelo_Enabled').bootstrapSwitch('state', false, false);
        $('#Cir_VelMin').autoNumeric('set', '0');
        $('#Cir_VelMax').autoNumeric('set', '0');
        $('#Cir_TempMin').autoNumeric('set', '0');
        $('#Cir_TempMax').autoNumeric('set', '0');
        $('#Cascata_Temp_Errore').autoNumeric('set', '0');
        $('#Cascata_Tempo_Off_Cal2').autoNumeric('set', '0');
        $('#Cascata_Tempo_Errore').autoNumeric('set', '0');

        var CirData = [];
        var EvData = [];

        setTimeout(function () { $("body").addClass("loading"); }, 10);
                
        Readhs();
        requestCirDelay();
        requestEvDelay();
        requestParam();        
        setlanguage();

        function Readhs() {           
            var req = $.DataAccess.HeatingSystem_Read(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#hsDescr").text(data.DesImpianto + ' ' + data.Descr);
                }
            });

            var req = $.DataAccess.HeatingSystem_Param_Disabled_Read(localStorage.getItem("hsId"), 'hsalarmThreshold');
            req.success(function (json) {
                console.log('hsalarmThreshold', json);
                var data = json.d;
                if (data) {
                    $('.hsalarmThreshold').css("display", "none");
                }
            });
            var req = $.DataAccess.HeatingSystem_Param_Disabled_Read(localStorage.getItem("hsId"), 'hsantifreeze');
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $('.hsantifreeze').css("display", "none");
                }
            });
            var req = $.DataAccess.HeatingSystem_Param_Disabled_Read(localStorage.getItem("hsId"), 'hsCascadeBoilersparameter');
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $('.hsCascadeBoilersparameter').css("display", "none");
                }
            });            
            var req = $.DataAccess.HeatingSystem_Param_Disabled_Read(localStorage.getItem("hsId"), 'hsCIRULATORSparameters');
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $('.hsCIRULATORSparameters').css("display", "none");
                }
            });
        }

        function requestParam() {            
            var req = $.DataAccess.HeatingSystem_Param_Get_ALARM_threshold(localStorage.getItem("hsId"));
            req.success(function (json) {
                var r2 = $.DataAccess.HeatingSystem_Param_Get_antifreeze(localStorage.getItem("hsId"));
                r2.success(function (json) {
                    var r3 = $.DataAccess.HeatingSystem_Param_Get_Circulators_parameters(localStorage.getItem("hsId"));
                    r3.success(function (json) {
                        var r4 = $.DataAccess.HeatingSystem_Param_Get_Cascade_Boilers_parameter(localStorage.getItem("hsId"));
                        r4.success(function (json) {
                            ReadE();
                        })
                    });
                });
            });
        }

        function ReadE() {
            var req = $.DataAccess.HeatingSystem_Param_Read(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    //console.log('ReadE', data);
                    $('#Allarmi_TempoAvvioCal').autoNumeric('set', data.Allarmi_TempoAvvioCal);
                    $('#Allarmi_SogliaTemp').autoNumeric('set', data.Allarmi_SogliaTemp);
                    $('#Allarmi_kScambiatore').autoNumeric('set', data.Allarmi_kScambiatore);
                    $('#Antigelo_Soglia_start').autoNumeric('set', data.Antigelo_Soglia_start);
                    $('#Antigelo_Soglia_stop').autoNumeric('set', data.Antigelo_Soglia_stop);
                    $('#Antigelo_Enabled').bootstrapSwitch('state', data.Antigelo_Enabled, data.Antigelo_Enabled);
                    $('#Cir_VelMin').autoNumeric('set', data.Cir_VelMin);
                    $('#Cir_VelMax').autoNumeric('set', data.Cir_VelMax);
                    $('#Cir_TempMin').autoNumeric('set', data.Cir_TempMin);
                    $('#Cir_TempMax').autoNumeric('set', data.Cir_TempMax);
                    $('#Cascata_Temp_Errore').autoNumeric('set', data.Cascata_Temp_Errore);
                    $('#Cascata_Tempo_Off_Cal2').autoNumeric('set', data.Cascata_Tempo_Off_Cal2);
                    $('#Cascata_Tempo_Errore').autoNumeric('set', data.Cascata_Tempo_Errore);
                    $("body").removeClass("loading");
                }
                else {
                    $('.hsalarmThreshold').css("display", "none");
                    $('.hsantifreeze').css("display", "none");
                    $('.hsCascadeBoilersparameter').css("display", "none");
                    $('.hsCIRULATORSparameters').css("display", "none");
                    $('.hsCIRULATORSparameters').css("display", "none");
                    $("body").removeClass("loading");
                }
            });
        }

        $('#btnUpdhsalarmThreshold').on('click', function () {
            var Allarmi_TempoAvvioCal = $('#Allarmi_TempoAvvioCal').autoNumeric('get'),
                Allarmi_SogliaTemp = $('#Allarmi_SogliaTemp').autoNumeric('get'),
                Allarmi_kScambiatore = $('#Allarmi_kScambiatore').autoNumeric('get');
            var req1 = $.DataAccess.HeatingSystem_Param_Set_ALARM_threshold(localStorage.getItem("hsId"), Allarmi_TempoAvvioCal, Allarmi_SogliaTemp, Allarmi_kScambiatore);
            req1.success(function (json) {
                var data = json.d;
                if (data == true) {
                    $('#hsalarmThresholdResult').addClass("operationOk");
                }
                else {
                    $('#hsalarmThresholdResult').addClass("operationNok");
                }
            });
        });

        $('#btnUpdhsantifreeze').on('click', function () {
            var Antigelo_Soglia_start = $('#Antigelo_Soglia_start').autoNumeric('get'),
                Antigelo_Soglia_stop = $('#Antigelo_Soglia_stop').autoNumeric('get'),
                Antigelo_Enabled = $('#Antigelo_Enabled').bootstrapSwitch('state');
            var req1 = $.DataAccess.HeatingSystem_Param_Set_antifreeze(localStorage.getItem("hsId"), Antigelo_Soglia_start, Antigelo_Soglia_stop, Antigelo_Enabled);
            req1.success(function (json) {
                var data = json.d;
                if (data == true) {
                    $('#hsantifreezeResult').addClass("operationOk");
                }
                else {
                    $('#hsantifreezeResult').addClass("operationNok");
                }
            });
        });

        $('#btnUpdhsCIRULATORSparameters').on('click', function () {
            var Cir_VelMin = $('#Cir_VelMin').autoNumeric('get'),
                Cir_VelMax = $('#Cir_VelMax').autoNumeric('get'),
                Cir_TempMin = $('#Cir_TempMin').autoNumeric('get'),
                Cir_TempMax = $('#Cir_TempMax').autoNumeric('get');
            var req1 = $.DataAccess.HeatingSystem_Param_Set_Circulators_parameters(localStorage.getItem("hsId"), Cir_VelMin, Cir_VelMax, Cir_TempMin, Cir_TempMax);
            req1.success(function (json) {
                var data = json.d;
                if (data == true) {
                    $('#hsCIRULATORSparametersResult').addClass("operationOk");
                }
                else {
                    $('#hsCIRULATORSparametersResult').addClass("operationNok");
                }
            });
        });

        $('#btnUpdhsCascadeBoilersparameter').on('click', function () {
            var Cascata_Temp_Errore = $('#Cascata_Temp_Errore').autoNumeric('get'),
                Cascata_Tempo_Off_Cal2 = $('#Cascata_Tempo_Off_Cal2').autoNumeric('get'),
                Cascata_Tempo_Errore = $('#Cascata_Tempo_Errore').autoNumeric('get');
            var req1 = $.DataAccess.HeatingSystem_Param_Set_Cascade_Boilers_parameter(localStorage.getItem("hsId"), Cascata_Temp_Errore, Cascata_Tempo_Off_Cal2, Cascata_Tempo_Errore);
            req1.success(function (json) {
                var data = json.d;
                if (data == true) {
                    $('#hsCascadeBoilersparameterResult').addClass("operationOk");
                }
                else {
                    $('#hsCascadeBoilersparameterResult').addClass("operationNok");
                }
            });
        });

        /*
        circulators delay
        -----------------------------------------------------------------------*/
        function requestCirDelay() {
            var r = $.DataAccess.hs_Cir_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        $.DataAccess.hs_Cir_getDelayOnOff(data[i].CirId);
                    }
                }

                var r1 = $.DataAccess.hs_Cird_List(localStorage.getItem("hsId"));
                r1.success(function (json) {
                    var data = json.d;
                    if (data) {
                        for (var i = 0; i < data.length; i++) {
                            $.DataAccess.hs_Cird_getDelayOnOff(data[i].Id);
                        }
                    }

                    var r2 = $.DataAccess.hs_Cirm_List(localStorage.getItem("hsId"));
                    r2.success(function (json) {
                        var data = json.d;
                        if (data) {
                            for (var i = 0; i < data.length; i++) {
                                $.DataAccess.hs_Cirm_getDelayOnOff(data[i].Id);
                            }
                        }

                        var r2 = $.DataAccess.hs_Cirdm_List(localStorage.getItem("hsId"));
                        r2.success(function (json) {
                            var data = json.d;
                            if (data) {
                                for (var i = 0; i < data.length; i++) {
                                    $.DataAccess.hs_Cirdm_getDelayOnOff(data[i].Id);
                                }
                            }

                            loadCir()
                        });

                    });

                });

            });

        }

        function loadCir() {            
            CirData = [];
            var r = $.DataAccess.hs_Cir_List(localStorage.getItem("hsId"));
            r.success(function (json) {               
                var data = json.d;
                if (data) {                    
                    for (var i = 0; i < data.length; i++) {
                        CirData.push({
                            "Id": data[i].CirId,
                            "Cod": data[i].CirCod,
                            "Descr": data[i].CirDescr,
                            "TempoOn": data[i].TempoOn,
                            "TempoOff": data[i].TempoOff
                        })
                    }
                    console.log(CirData);
                    //$("#tmplCirculatorsList").tmpl(CirData).appendTo("#CirList");
                    //setlanguage();
                    //$('.isNumeric').autoNumeric('init');
                    //for (var i = 0; i < CirData.length; i++) {
                    //    $('#CirTempoOn_' + CirData[i].Cod).autoNumeric('init');
                    //    $('#CirTempoOff_' + CirData[i].Cod).autoNumeric('init');
                    //    $('#CirTempoOn_' + CirData[i].Cod).autoNumeric('set',CirData[i].TempoOn);
                    //    $('#CirTempoOff_' + CirData[i].Cod).autoNumeric('set',CirData[i].TempoOff);                        
                    //}
                }
                setTimeout(function () { loadCirD(data); }, 200);
            });
        }

        function loadCirD() {
            var r = $.DataAccess.hs_Cird_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        CirData.push({
                            "Id": data[i].Id,
                            "Cod": data[i].Cod,
                            "Descr": data[i].Descr,
                            "TempoOn": data[i].TempoOn,
                            "TempoOff": data[i].TempoOff
                        })
                    }
                    console.log(CirData);
                    //$("#tmplCirculatorsList").tmpl(CirData).appendTo("#CirList");
                    //setlanguage();  
                    //for (var i = 0; i < CirData.length; i++) {
                    //    $('#CirTempoOn_' + CirData[i].Cod).autoNumeric('init');
                    //    $('#CirTempoOff_' + CirData[i].Cod).autoNumeric('init');
                    //    $('#CirTempoOn_' + CirData[i].Cod).autoNumeric('set', CirData[i].TempoOn);
                    //    $('#CirTempoOff_' + CirData[i].Cod).autoNumeric('set', CirData[i].TempoOff);
                    //}
                }
                setTimeout(function () { loadCirM(data); }, 200);
            });
        }

        function loadCirM() {
            var r = $.DataAccess.hs_Cirm_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        CirData.push({
                            "Id": data[i].Id,
                            "Cod": data[i].Cod,
                            "Descr": data[i].Descr,
                            "TempoOn": data[i].TempoOn,
                            "TempoOff": data[i].TempoOff
                        })
                    }
                    console.log(CirData);
                    //$("#tmplCirculatorsList").tmpl(CirData).appendTo("#CirList");
                    //setlanguage();
                    //$('.isNumeric').autoNumeric('init');
                    //for (var i = 0; i < CirData.length; i++) {
                    //    $('#CirTempoOn_' + CirData[i].Cod).autoNumeric('init');
                    //    $('#CirTempoOff_' + CirData[i].Cod).autoNumeric('init');
                    //    $('#CirTempoOn_' + CirData[i].Cod).autoNumeric('set', CirData[i].TempoOn);
                    //    $('#CirTempoOff_' + CirData[i].Cod).autoNumeric('set', CirData[i].TempoOff);
                    //}
                }
                setTimeout(function () { loadCirDM(data); }, 200);
            });
        }

        function loadCirDM() {
            var r = $.DataAccess.hs_Cirdm_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        CirData.push({
                            "Id": data[i].Id,
                            "Cod": data[i].Cod,
                            "Descr": data[i].Descr,
                            "TempoOn": data[i].TempoOn,
                            "TempoOff": data[i].TempoOff
                        })
                    }
                    console.log(CirData);
                }

                //
                $("#CirList").empty();
                $("#tmplCirculatorsList").tmpl(CirData).appendTo("#CirList");
                setlanguage();

                for (var i = 0; i < CirData.length; i++) {     
                    $('#DelayOnOffResult_' + CirData[i].Cod).removeClass("operationOk");
                    $('#DelayOnOffResult_' + CirData[i].Cod).removeClass("operationNok");

                    $('#CirTempoOn_' + CirData[i].Cod).autoNumeric('init');
                    $('#CirTempoOff_' + CirData[i].Cod).autoNumeric('init');
                    $('#CirTempoOn_' + CirData[i].Cod).autoNumeric('set', CirData[i].TempoOn);
                    $('#CirTempoOff_' + CirData[i].Cod).autoNumeric('set', CirData[i].TempoOff);
                }

                if (CirData.length <= 0) {
                    $('.hsCIRULATORSDelay').css("display", "none");
                }
                //
            });
        }

        $.fn.TempoOnChange = function (Cod)   { 

            //console.log('TempoOnChange ', Cod, $('#TempoOn_' + Cod.trim()).val());
        }

        $.fn.TempoOffChange = function (Cod) {
           
            //var val = $('#TempoOff_' + Cod.trim()).val();
            //console.log('TempoOffChange ', Cod, val);
        }

        $.fn.updateCir = function (Cod) {           

            if (Cod.indexOf("CIRDM") >= 0) {
                setDelayCirdm(Cod);
            }
            else if (Cod.indexOf("CIRM") >= 0) {
                setDelayCirm(Cod);
            }
            else if (Cod.indexOf("CIRD") >= 0) {
                setDelayCird(Cod);
            }
            else if (Cod.indexOf("CIR") >= 0) {
                setDelayCir(Cod);
            }

        }

        function setDelayCir(Cod) {
            //console.log('TempoOn ', Cod, $('#CirTempoOn_' + Cod.trim()).autoNumeric('get'));
            //console.log('TempoOff ', Cod, $('#CirTempoOff_' + Cod.trim()).autoNumeric('get'));
            var req = $.DataAccess.hs_Cir_ReadByCirCod(localStorage.getItem("hsId"), Cod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    var TempoOn = $('#CirTempoOn_' + Cod.trim()).autoNumeric('get'),
                        TempoOff = $('#CirTempoOff_' + Cod.trim()).autoNumeric('get');
                    var req1 = $.DataAccess.hs_Cir_setDelayOnOff(data.CirId, TempoOn, TempoOff)
                    req1.success(function (json) {
                        var data = json.d;
                        if (data == true) {
                            $('#DelayOnOffResult_' + Cod).addClass("operationOk");
                        }
                        else {
                            $('#DelayOnOffResult_' + Cod).addClass("operationNok");
                        }
                    });
                }
            });
        }
        function setDelayCirm(Cod) {
            //console.log('TempoOn ', Cod, $('#CirTempoOn_' + Cod.trim()).autoNumeric('get'));
            //console.log('TempoOff ', Cod, $('#CirTempoOff_' + Cod.trim()).autoNumeric('get'));
            var req = $.DataAccess.hs_Cirm_ReadByCod(localStorage.getItem("hsId"), Cod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    var TempoOn=$('#CirTempoOn_' + Cod.trim()).autoNumeric('get'), 
                        TempoOff= $('#CirTempoOff_' + Cod.trim()).autoNumeric('get');
                    var req1 = $.DataAccess.hs_Cirm_setDelayOnOff(data.Id, TempoOn, TempoOff)
                    req1.success(function (json) {
                        var data = json.d;
                        if (data == true) {
                            $('#DelayOnOffResult_' + Cod).addClass("operationOk");
                        }
                        else {
                            $('#DelayOnOffResult_' + Cod).addClass("operationNok");
                        }
                    });
                }
            });
        }
        function setDelayCird(Cod) {
            var req = $.DataAccess.hs_Cird_ReadByCod(localStorage.getItem("hsId"), Cod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    var TempoOn = $('#CirTempoOn_' + Cod.trim()).autoNumeric('get'),
                        TempoOff = $('#CirTempoOff_' + Cod.trim()).autoNumeric('get');
                    var req1 = $.DataAccess.hs_Cird_setDelayOnOff(data.Id, TempoOn, TempoOff)
                    req1.success(function (json) {
                        var data = json.d;
                        if (data == true) {
                            $('#DelayOnOffResult_' + Cod).addClass("operationOk");
                        }
                        else {
                            $('#DelayOnOffResult_' + Cod).addClass("operationNok");
                        }
                    });
                }
            });
        }
        function setDelayCirdm(Cod) {
            var req = $.DataAccess.hs_Cirdm_ReadByCod(localStorage.getItem("hsId"), Cod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    var TempoOn = $('#CirTempoOn_' + Cod.trim()).autoNumeric('get'),
                        TempoOff = $('#CirTempoOff_' + Cod.trim()).autoNumeric('get');
                    var req1 = $.DataAccess.hs_Cirdm_setDelayOnOff(data.Id, TempoOn, TempoOff)
                    req1.success(function (json) {
                        var data = json.d;
                        if (data == true) {
                            $('#DelayOnOffResult_' + Cod).addClass("operationOk");
                        }
                        else {
                            $('#DelayOnOffResult_' + Cod).addClass("operationNok");
                        }
                    });
                }
            });
        }

        /*
        EV delay
        -----------------------------------------------------------------------*/
        function requestEvDelay() {
            var r = $.DataAccess.hs_Ev_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        $.DataAccess.hs_Ev_getDelayOnOff(data[i].Id);
                    }
                }
                loadEv();
            });

        }
        function loadEv() {
            EvData = [];
            var r = $.DataAccess.hs_Ev_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        EvData.push({
                            "Id": data[i].Id,
                            "Cod": data[i].Cod,
                            "Descr": data[i].Descr,
                            "TempoOn": data[i].TempoOn,
                            "TempoOff": data[i].TempoOff
                        })
                    }
                    console.log(EvData);
                    $("#EvList").empty();
                    $("#tmplEvList").tmpl(EvData).appendTo("#EvList");
                    setlanguage();
                    //inizializzo i campi
                    for (var i = 0; i < EvData.length; i++) {
                        $('#DelayOnOffResult_' + EvData[i].Cod).removeClass("operationOk");
                        $('#DelayOnOffResult_' + EvData[i].Cod).removeClass("operationNok");

                        $('#EvTempoOn_' + EvData[i].Cod).autoNumeric('init');
                        $('#EvTempoOff_' + EvData[i].Cod).autoNumeric('init');
                        $('#EvTempoOn_' + EvData[i].Cod).autoNumeric('set', EvData[i].TempoOn);
                        $('#EvTempoOff_' + EvData[i].Cod).autoNumeric('set', EvData[i].TempoOff);
                    }
                }
                else {
                    $('.hsEvDelay').css("display", "none");
                }
            });
        }
        $.fn.updateEv = function (Cod) {
            var req = $.DataAccess.hs_Ev_ReadByCod(localStorage.getItem("hsId"), Cod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    var TempoOn = $('#EvTempoOn_' + Cod.trim()).autoNumeric('get'),
                        TempoOff = $('#EvTempoOff_' + Cod.trim()).autoNumeric('get');
                    var req1 = $.DataAccess.hs_Ev_setDelayOnOff(data.Id, TempoOn, TempoOff)
                    req1.success(function (json) {
                        var data = json.d;
                        if (data == true) {
                            $('#DelayOnOffResult_' + Cod).addClass("operationOk");
                        }
                        else {
                            $('#DelayOnOffResult_' + Cod).addClass("operationNok");
                        }
                    });
                }
            });
                
        }
    }); //document ready

});
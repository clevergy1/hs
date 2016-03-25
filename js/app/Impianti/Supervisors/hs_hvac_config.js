$(function () {

    $(document).ready(function () {
        $('.isNumeric').autoNumeric('init');
        
        $('#SetPointCold').autoNumeric('set', '0');
        $('#SetPointHot').autoNumeric('set', '0');
        $('#ppmMin').autoNumeric('set', '0');
        $('#ppmMax').autoNumeric('set', '0');
        $('#ppmMax').autoNumeric('set', '0');
        $('#OpenShutterMin').autoNumeric('set', '0');
        $('#freeCoolingMin').autoNumeric('set', '0');
        $('#freeCoolingMax').autoNumeric('set', '0');
        $('#tExt').autoNumeric('set', '0');
        $('#freeColingMode').html('&nbsp;');


        $('#SFBmsDayEnSP').bootstrapSwitch('state', false, false);
        $('#SFBmsDayEnSPDZ').bootstrapSwitch('state', false, false);
        $('#SFBmsNightEnSP').bootstrapSwitch('state', false, false);
        $('#SFBmsNightEnSPDZ').bootstrapSwitch('state', false, false);

        Readhs();
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
        }

        function requestParam() {
            var req = $.DataAccess.hs_hvac_requestParam(localStorage.getItem("hvacId"));
            req.success(function (json) {
                var data = json.d;
                if (data == true) {

                    var r2 = $.DataAccess.hs_hvac_requestSupplyFan(localStorage.getItem("hvacId"));
                    r2.success(function (json) {
                        ReadE();
                    });
                    
                }
                else {
                    toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                }
            });
        }

        function ReadE() {
            var req = $.DataAccess.hs_hvac_Read(localStorage.getItem("hvacId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    console.log('ReadE', data);
                    $(".Descr").text(data.Descr + ' (' + data.Cod + ')');
                    $('#DeltaSetPointCold').autoNumeric('set', data.DeltaSetPointCold);
                    $('#DeltaSetPointHot').autoNumeric('set', data.DeltaSetPointHeat);

                    $('#SetPointCold').autoNumeric('set', data.SetPointCold);
                    $('#SetPointHot').autoNumeric('set', data.SetPointHeat);

                    $('#SetPoint').autoNumeric('set', data.SetPoint);


                    $('#ppmMin').autoNumeric('set', data.ppmMin);
                    $('#ppmMax').autoNumeric('set', data.ppmMax);
                    $('#ppmMax').autoNumeric('set', data.ppmMax);
                    $('#OpenShutterMin').autoNumeric('set', data.OpenShutterMin);
                    $('#freeCoolingMin').autoNumeric('set', data.freeCoolingMin);
                    $('#freeCoolingMax').autoNumeric('set', data.freeCoolingMax);
                    $('#tExt').autoNumeric('set', data.tExt);
                   
                    $('#SFBmsDayEnSP').bootstrapSwitch('state', data.SFBmsDayEnSP, data.SFBmsDayEnSP);
                    $('#SFBmsDayEnSPDZ').bootstrapSwitch('state', data.SFBmsDayEnSPDZ, data.SFBmsDayEnSPDZ);
                    $('#SFBmsNightEnSP').bootstrapSwitch('state', data.SFBmsNightEnSP, data.SFBmsNightEnSP);
                    $('#SFBmsNightEnSPDZ').bootstrapSwitch('state', data.SFBmsNightEnSPDZ, data.SFBmsNightEnSPDZ);

                    if (freeColingMode == 1) {
                        $('#freeColingMode').html('<i class="fa fa-thumbs-o-up"></i>');
                    }
                    else {
                        $('#freeColingMode').html('<i class="fa fa-thumbs-o-down"></i>');
                    }
                }
            });
        }

        $('#btnUpd').on('click', function (e) {
            var DeltaSetPointCold = $('#DeltaSetPointCold').autoNumeric('get'),
                DeltaSetPointHot = $('#DeltaSetPointHot').autoNumeric('get');

            var req1 = $.DataAccess.hs_hvac_setSetPoinColdHeat(localStorage.getItem("hvacId"), DeltaSetPointCold, DeltaSetPointHot);
            req1.success(function (json) {
                var data = json.d;
                if (data == true) {
                    var ppmMin = $('#ppmMin').autoNumeric('get'),
                    ppmMax = $('#ppmMax').autoNumeric('get'),
                    OpenShutterMin = $('#OpenShutterMin').autoNumeric('get');
                    var req2 = $.DataAccess.hs_hvac_setPpmMinOpen(localStorage.getItem("hvacId"), ppmMin, ppmMax, OpenShutterMin);
                    req2.success(function (json) {
                        var data = json.d;
                        if (data == true) {
                            var freeCoolingMin = $('#freeCoolingMin').autoNumeric('get'),
                                freeCoolingMax = $('#freeCoolingMax').autoNumeric('get');
                            var req3 = $.DataAccess.hs_hvac_setFreeCooling(localStorage.getItem("hvacId"), freeCoolingMin, freeCoolingMax);
                            req3.success(function (json) {
                                var data = json.d;
                                if (data == true) {

                                    var SFBmsDayEnSP = $('#SFBmsDayEnSP').bootstrapSwitch('state');
                                    var SFBmsDayEnSPDZ = $('#SFBmsDayEnSPDZ').bootstrapSwitch('state');
                                    var SFBmsNightEnSP = $('#SFBmsNightEnSP').bootstrapSwitch('state');
                                    var SFBmsNightEnSPDZ = $('#SFBmsNightEnSPDZ').bootstrapSwitch('state');

                                    var req4 = $.DataAccess.hs_hvac_setSsupplyFan(localStorage.getItem("hvacId"), SFBmsDayEnSP, SFBmsDayEnSPDZ, SFBmsNightEnSP, SFBmsNightEnSPDZ)
                                    req4.success(function (json) {
                                        var data = json.d;
                                        if (data == true) {
                                            toastr["success"](langResources['msg4operationok'], "success");
                                        }
                                        else{  { toastr["warning"](langResources['msg4operationfailed'], langResources['alert']); } }
                                    });
                                    
                                }
                                else { toastr["warning"](langResources['msg4operationfailed'], langResources['alert']); }
                            });
                        }
                        else { toastr["warning"](langResources['msg4operationfailed'], langResources['alert']); }
                    });
                }
                else { toastr["warning"](langResources['msg4operationfailed'], langResources['alert']); }
            });
        });
    });

});
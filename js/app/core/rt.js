(function ($) {

    $.rt = (function (my) {
        var signalRscript, signalRHub, aliveVal;
        var urlHub, clientsHub;
        var $hubState;
        var stateConversion = { 0: 'connecting', 1: 'connected', 2: 'reconnecting', 4: 'disconnected' };

        my.load = function () {
           // console.log('rt.load');
            signalRHub = document.createElement('script');
            signalRHub.type = 'text/javascript';
            signalRHub.async = false;
            signalRHub.src = $.appParms.urlHub();
            (document.getElementsByTagName('body')[0]).appendChild(signalRHub);
        };

        my.start = function () {
            console.log('rt.start');
            //========================================================
            urlHub = $.appParms.urlHub();           
            $.connection.hub.url = urlHub;
            $.connection.hub.logging = false; //  true;
            clientsHub = $.connection.clientsHub;

            //console.log('clientsHub', clientsHub);
            
            /*
            HeatingSytem receive messages
            ------------------------------------------------------------------------------*/
            clientsHub.client.received_log = function (hsId) {
                console.log('clientsHub.client.received_log');
                //try {
                //    $.fn.received_log(hsId);
                //}
                //catch (err) {
                //    ;
                //}
            }


            clientsHub.client.received_HeatingSystem_setStatus = function (hsId, stato) {
                try {
                    $.fn.received_HeatingSystem_setStatus(hsId, stato);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_hs_Anz_setStatus = function (hsId, Cod, stato) {
                try {
                    $.fn.received_hs_Anz_setStatus(hsId, Cod, stato);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_hs_Anz_changed = function (hsId, Cod) {
                try {
                    //console.log('$.rt received_hs_Anz_changed hsId='+hsId+' Cod='+Cod);
                    $.fn.received_hs_Anz_changed(hsId, Cod);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_hs_TemperatureProbes_setValue = function (hsId, ProbeCod, currentValue) {                
                try {
                    $.fn.received_hs_TemperatureProbes_setValue(hsId, ProbeCod, currentValue);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_hs_cal_setStatus = function (hsId, CalCod) {
                console.log('clientsHub.client.received_hs_cal_setStatus');
                try {
                    $.fn.received_hs_cal_setStatus(hsId, CalCod);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_hs_Gru_setStatus = function (hsId, GruCod) {
                try {
                    $.fn.received_hs_Gru_setStatus(hsId, GruCod);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_hs_Cir_setStatus = function (hsId, CirCod, isRunning, stato, forcedRun, forcedStop) {
                try {
                    $.fn.received_hs_Cir_setStatus(hsId, CirCod, isRunning, stato, forcedRun, forcedStop);
                }
                catch (err) {
                    ;
                }           
            }
            clientsHub.client.received_hs_Cir_setManualMode = function (hsId, CirCod, ManualMode) {
                try {
                    $.fn.received_hs_Cir_setManualMode(hsId, CirCod, ManualMode);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_hs_Cird_setStatus = function (hsId, Cod, isRunning, stato) {
                try {
                    $.fn.received_hs_Cird_setStatus(hsId, Cod, isRunning, stato);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_hs_Cird_setValue = function (hsId, Cod) {
                try {
                    $.fn.received_hs_Cird_setValue(hsId, Cod);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_hs_Cirm_setStatus = function (hsId, Cod, isRunning, stato) {
                try {
                    $.fn.received_hs_Cirm_setStatus(hsId, Cod, isRunning, stato);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_hs_Cirm_setValue = function (hsId, Cod) {
                try {
                    $.fn.received_hs_Cirm_setValue(hsId, Cod);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_hs_Cirm_setManualMode = function (hsId, Cod, ManualMode) {
                try {
                    $.fn.received_hs_Cirm_setManualMode(hsId, Cod, ManualMode);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_hs_Cirdm_setStatus = function (hsId, Cod, isRunning, stato) {
                try {
                    $.fn.received_hs_Cirdm_setStatus(hsId, Cod, isRunning, stato);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_hs_Cirdm_setValue = function (hsId, Cod) {
                try {
                    $.fn.received_hs_Cirdm_setValue(hsId, Cod);
                }
                catch (err) {
                    ;
                }
            }

            clientsHub.client.received_hs_Cron_setStatus = function (hsId, CronCod, SetPoint, stato) {
                try {
                    $.fn.received_hs_Cron_setStatus(hsId, CronCod, SetPoint, stato);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_hs_Vrd_setStatus = function (hsId, VrdCod, SetPoint, SetPosition, Position, stato) {
                try {
                    $.fn.received_hs_Vrd_setStatus(hsId, VrdCod, SetPoint, SetPosition, Position, stato);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_hs_Ctl_setValue = function (hsId, CtlCod,stato, currentValue) {
                try {
                    $.fn.received_hs_Ctl_setValue(hsId, CtlCod,stato, currentValue);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_hs_Ctb_setValue = function (hsId, CtbCod, Tsend, Tret, Flowrate, Power, EnergyCounter, stato) {
                try {
                    $.fn.received_hs_Ctb_setValue(hsId, CtbCod, Tsend, Tret, Flowrate, Power, EnergyCounter, stato);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_hs_Ctp_setValue = function (hsId, Cod, stato, VolumeCounter, FlowRate) {
                try {
                    $.fn.received_hs_Ctp_setValue(hsId, Cod, stato, VolumeCounter, FlowRate);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_hs_Doors_setValue = function (hsId, DoorCod, currentValue) {
                try {
                    $.fn.received_hs_Doors_setValue(hsId, DoorCod, currentValue);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_hs_Gas_setStatus = function (hsId, Cod, stato) {
                try {
                    $.fn.received_hs_Gas_setStatus(hsId, Cod, stato);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_hs_Gas_setValue = function (hsId, Cod, currentValue) {
                try {
                    $.fn.received_hs_Gas_setValue(hsId, Cod, currentValue);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_hs_Gas_setValueDigital = function (hsId,
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
                try {
                    $.fn.received_hs_Gas_setValueDigital(hsId, 
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
                                                        BatteryCapacity);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_hs_pb_setValue = function (hsId, Cod, currentValue) {
                try {
                    $.fn.received_hs_pb_setValue(hsId, Cod, currentValue);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_hs_pm_setValue = function (hsId, Cod, currentValue) {
                try {
                    $.fn.received_hs_pm_setValue(hsId, Cod, currentValue);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_hs_tb_setValue = function (hsId, Cod, currentValue) {
                try {
                    $.fn.received_hs_tb_setValue(hsId, Cod, currentValue);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_hs_sca_changed = function (hsId, scaId, Id, currentValue) {
                try {
                    $.fn.received_hs_sca_changed(hsId, scaId, Id, currentValue);
                }
                catch (err) {
                    ;
                }         
            }
            clientsHub.client.received_cymt100_changed = function (hsId, Cod) {
                try {
                    $.fn.received_cymt100_changed(hsId, Cod);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_hs_cymt100_setStatus = function (hsId, Cod, stato) {
                try {
                    $.fn.received_hs_cymt100_setStatus(hsId, Cod, stato);
                }
                catch (err) {
                    ;
                }
            }

            clientsHub.client.received_cymt200_changed = function (hsId, Cod) {
                try {
                    $.fn.received_cymt200_changed(hsId, Cod);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_hs_cymt200_setStatus = function (hsId, Cod, stato) {
                try {
                    $.fn.received_hs_cymt200_setStatus(hsId, Cod, stato);
                }
                catch (err) {
                    ;
                }
            }

            clientsHub.client.received_W0077_changed = function (hsId, Cod) {
                try {
                    $.fn.received_W0077_changed(hsId, Cod);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_hs_W0077_setStatus = function (hsId, Cod, stato) {
                try {
                    $.fn.received_hs_W0077_setStatus(hsId, Cod, stato);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_Expo_Split_changed = function (hsId, Cod) {
                try {
                    $.fn.received_Expo_Split_changed(hsId, Cod);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_hs_hvac_Add = function (hsId, Cod) {
                try {
                    $.fn.received_hs_hvac_Add(hsId, Cod);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_hs_hvac_changed = function (hsId, Cod) {
                try {
                    $.fn.received_hs_hvac_changed(hsId, Cod);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_hs_hvac_setStatus = function (hsId, Cod, stato) {
                try {
                    $.fn.received_hs_hvac_setStatus(hsId, Cod, stato);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_hs_Coov_setValue = function (hsId, Cod, currentValue) {
                try {
                    $.fn.received_hs_Coov_setValue(hsId, Cod, currentValue);
                }
                catch (err) {
                    ;
                }
            }

            clientsHub.client.received_hs_spl_setValue = function (hsId, Cod) {
                try {
                    $.fn.received_hs_spl_setValue(hsId, Cod);
                }
                catch (err) {
                    ;
                }
            }

            clientsHub.client.received_Lux_changed = function (hsId, Cod) {
                try {
                    console.log('clientsHub.client.received_Lux_changed');
                    $.fn.received_Lux_changed(hsId, Cod);
                }
                catch (err) {
                    ;
                }
            }

            clientsHub.client.received_hs_Astr_changed = function (hsId, Cod) {
                try {
                    console.log('clientsHub.client.received_hs_Astr_changed');
                    $.fn.received_hs_Astr_changed(hsId, Cod);
                }
                catch (err) {
                    ;
                }
            }
            /*----------------------------------------------------------------------------*/

            /*connection manager*/
            $.connection.hub.stateChanged(connectionStateChanged);            
            $.connection.hub.start()
            .done(function () {
                console.log('Now connected, connection ID=' + $.connection.hub.id + ' IdImpianto=' + localStorage.getItem('IdImpianto'));
                clientsHub.server.subscribe(localStorage.getItem('IdImpianto'));
            })
            .fail(function () {
                console.log('Could not Connect!');
                toastr["warning"](langResources['serverlost'], langResources['alert']);
            });

            function connectionStateChanged(state) {
                console.log('SignalR state changed from: ' + stateConversion[state.oldState] + ' to: ' + stateConversion[state.newState]);

                $hubState = state.newState;

                if (stateConversion[state.newState] == 'connected') { connectionStatus(true); }
                if (stateConversion[state.newState] == 'disconnected') { connectionStatus(false); }
                if (stateConversion[state.newState] == 'reconnecting') { connectionStatus(false); }

                if (stateConversion[state.newState] == 'disconnected' && stateConversion[state.oldState] == 'connected') {
                    ;
                }
                if (stateConversion[state.newState] == 'connected' && stateConversion[state.oldState] == 'disconnected') {
                    ;
                }
            } //connectionStateChanged

            function connectionStatus(status) {
                var data = [{ status: status }];
                console.log('connectionStatus= ' + status);
                $('#navbar-signalR').empty();
                try {
                    $("#tmplnavbar-signalR").tmpl(data).appendTo("#navbar-signalR");
                }
                catch (err) {
                    // console.log(err);
                }
            }

            $.fn.unsubscribe = function () {
                try {
                    clientsHub.server.unsubscribe(localStorage.getItem('IdImpianto'));
                }
                catch (err) {
                    //console.log(err);
                }
                $.connection.hub.stop();
                console.log('connection stop');
            }

            /*send messages*/


            //========================================================
        }; // start

        my.stop = function () {
            try {
                //unsubscribe();
                clientsHub.server.unsubscribe(localStorage.getItem('IdImpianto'));
                $.connection.hub.stop();
                console.log('connection stop');
            }
            catch (err) {
                console.log(err);
            }
        };

        return my;
    })({});

})(jQuery);
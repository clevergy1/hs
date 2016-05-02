
$(function () {

    $(document).ready(function () {
        $('#usermenu').empty();
        var voicesMenu = [];
        voicesMenu.push({ Name: "Installation", page: "Device8Plant", tot: 1, stato: 0 });
       
        var r = $.DataAccess.hs_Elem_Read(localStorage.getItem("hsId"));
        r.success(function (json) {
            var data = json.d;
            if (data) {
                if (data.totAnz > 0) {
                    voicesMenu.push({ Name: "hs_Anzs", page: "Device8Anz", tot: data.totAnz, stato: data.statoAnz });
                }
                if (data.totGru > 0) {
                    voicesMenu.push({ Name: "hs_grus", page: "Device8Gru", tot: data.totGru, stato: data.statoGru });
                }
                if (data.totCal > 0) {
                    voicesMenu.push({ Name: "boilers", page: "Device8Cal", tot: data.totCal, stato: data.statoCal });
                }
                if (data.totCir > 0) {
                    voicesMenu.push({ Name: "circulators", page: "Device8Cir", tot: data.totCir, stato: data.statoCir });
                }
                if (data.totCirm > 0) {
                    voicesMenu.push({ Name: "circulatorsM", page: "Device8Cirm", tot: data.totCirm, stato: data.statoCirm });
                }
                if (data.totCird > 0) {
                    voicesMenu.push({ Name: "circulatorsD", page: "Device8Cird", tot: data.totCird, stato: data.statoCird });
                }
                if (data.totCirdm > 0) {
                    voicesMenu.push({ Name: "circulatorsDM", page: "Device8Cirdm", tot: data.totCirdm, stato: data.statoCirdm });
                }
                if (data.totVrd > 0) {
                    voicesMenu.push({ Name: "servomotors", page: "Device8Vrd", tot: data.totVrd, stato: data.statoVrd });
                }
                if (data.totGas > 0) {
                    voicesMenu.push({ Name: "hs_ctGas", page: "Device8ctGas", tot: data.totGas, stato: data.statoGas });
                }
                if (data.totCtp > 0) {
                    voicesMenu.push({ Name: "hs_ctps", page: "Device8Ctp", tot: data.totCtp, stato: data.statoCtp });
                }
                if (data.totCron > 0) {
                    voicesMenu.push({ Name: "chronothermostats", page: "Device8Cron", tot: data.totCron, stato: data.statoCron });
                }
                if (data.totCronograph > 0) {
                    voicesMenu.push({ Name: "chronographs", page: "Device8Cronograph", tot: data.totCronograph, stato: data.statoCronograph });
                }
                if (data.totCtl > 0) {
                    voicesMenu.push({ Name: "flowmeters", page: "Device8Ctl", tot: data.totCtl, stato: data.statoCtl });
                }
                if (data.totCtb > 0) {
                    voicesMenu.push({ Name: "meters", page: "Device8Ctb", tot: data.totCtb, stato: data.statoCtb });
                }
                if (data.totTemperatureProbes > 0) {
                    voicesMenu.push({ Name: "temperatureprobes", page: "Device8TempProbe", tot: data.totTemperatureProbes, stato: data.statoTemperatureProbes });
                }
                if (data.tottb > 0) {
                    voicesMenu.push({ Name: "hs_tbs", page: "Device8tb", tot: data.tottb, stato: data.statotb });
                }
                if (data.totpm > 0) {
                    voicesMenu.push({ Name: "hs_pms", page: "Device8pm", tot: data.totpm, stato: data.statopm });
                }
                if (data.totpb > 0) {
                    voicesMenu.push({ Name: "hs_pbs", page: "Device8pb", tot: data.totpb, stato: data.statopb });
                }
                if (data.totDoor > 0) {
                    voicesMenu.push({ Name: "doors", page: "Device8Door", tot: data.totDoor, stato: data.statoDoor });
                }
                if (data.totSca > 0) {
                    voicesMenu.push({ Name: "hs_sca", page: "Device8sca", tot: data.totSca, stato: data.statoSca });
                }
                if (data.totcymt100 > 0) {
                    voicesMenu.push({ Name: "sdin_Anzs", page: "Device8sdinAnz", tot: data.totcymt100, stato: data.statocymt100 });
                }
                if (data.totcymt200 > 0) {
                    voicesMenu.push({ Name: "cymt200s", page: "Device8sdincymt200", tot: data.totcymt200, stato: data.statocymt200 });
                }
                if (data.totW0077 > 0) {
                    voicesMenu.push({ Name: "W0077s", page: "Device8W0077", tot: data.totW0077, stato: data.statoW0077 });
                }
                if (data.totExpoSplit > 0) {
                    voicesMenu.push({ Name: "ExpoSplit", page: "Device_Exposplit", tot: data.totExpoSplit, stato: data.statoExpoSplit });
                }
                if (data.totHvac > 0) {
                    voicesMenu.push({ Name: "hs_hvacs", page: "Device8hvac", tot: data.totHvac, stato: data.statoHvac });
                }
                if (data.totLux > 0) {
                    voicesMenu.push({ Name: "hsLuxs", page: "Device8Lux", tot: data.totLux, stato: data.statoLux });
                }
                if (data.totCoov > 0) {
                    voicesMenu.push({ Name: "coovs", page: "Device8Coov", tot: data.totCoov, stato: data.statoCoov });
                }
                if (data.totSpl > 0) {
                    voicesMenu.push({ Name: "Split", page: "Device8Spl", tot: data.totSpl, stato: data.statoSpl });
                }
                if (data.totEv > 0) {
                    voicesMenu.push({ Name: "Evs", page: "Device8Ev", tot: data.totEv, stato: data.statoEv });
                }
                if (data.totAstr > 0) {
                    voicesMenu.push({ Name: "Astrs", page: "Device8Astr", tot: data.totAstr, stato: data.statoAstr });
                }
                if (data.totAmb > 0) {
                    voicesMenu.push({ Name: "Amb", page: "Device8Amb", tot: data.totAmb, stato: data.statoAmb });
                }


               
                $("#tmplMenuDetail").tmpl(voicesMenu).appendTo("#usermenu");
                setlanguage();
                $.module.load('Impianti/supervisors/Device8Plant');
            } //data
        });

        //console.log(voicesMenu);        
        //$("#tmplMenuDetail").tmpl([{ foo: "" }]).appendTo("#usermenu");


        //setlanguage();

        //$.module.load('Impianti/supervisors/Device8Plant');
    });

});
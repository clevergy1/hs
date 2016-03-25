/*
Impianti Operators Config Heating System Servomotor 
------------------------------------------*/
$(function () {

    $(document).ready(function () {
        var $elementCode;
        $("#pageOperation").empty();

        Readhs();
        //ReadCir();
        requestParam();

        setlanguage();

        function Readhs() {
            var req = $.DataAccess.HeatingSystem_Read(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {                   
                    $("#hsDescr").text(data.Descr);
                }
            });
        }
        
        function ReadCir() {
            var req = $.DataAccess.hs_Cird_Read(localStorage.getItem("CirId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $elementCode = data.Cod;                    
                    $("#Desc").text(data.Descr);
                    $('#backupWorkingMode').val(data.backupWorkingMode);                    
                    $('#DesbackupWorkingMode').val(data.backupWorkingMode);

                    //var mode0 = langResources['cirDworkingmode0'];
                    //console.log('mode0', mode0);
                    //var mode = '';

                    switch (data.backupWorkingMode) {
                        case 0:
                            $('#DesbackupWorkingMode').val(langResources['cirDworkingmode0']);
                            break;                            
                        case 1:
                            $('#DesbackupWorkingMode').val(langResources['cirDworkingmode1']);
                            break;
                        case 2:
                            $('#DesbackupWorkingMode').val(langResources['cirDworkingmode2']);
                            break;
                        case 3:
                            $('#DesbackupWorkingMode').val(langResources['cirDworkingmode3']);
                            break;
                    }
                    loadAssignedProbes();
                    loadAssignedCronos();
                }
            });
        }

        /*
        Probes 
        -----------------------------------------------------------------*/
        function loadAssignedProbes() {
            $("#assignedList").empty();
            var req = $.DataAccess.hs_TemperatureProbeElem_List(localStorage.getItem("hsId"), $elementCode);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplassignedList").tmpl(data).appendTo("#assignedList");
                    $("#assignedList").niceScroll({
                        cursorcolor: "#1FB5AD",
                        cursorborder: "0px solid #fff",
                        cursorborderradius: "0px",
                        cursorwidth: "3px"
                    });
                    loadAvailableProbes();
                }
                else {
                    loadAvailableProbes();
                }

            });
        }

        function loadAvailableProbes() {
            $("#availableList").empty();
            var req = $.DataAccess.hs_TemperatureProbes_List(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplavailableList").tmpl(data).appendTo("#availableList");
                    $("#availableList").niceScroll({
                        cursorcolor: "#1FB5AD",
                        cursorborder: "0px solid #fff",
                        cursorborderradius: "0px",
                        cursorwidth: "3px"
                    });

                    $("#assignedList li").each(function () {
                        var assigned = $(this).text().trim();
                        $("#availableList li").each(function () {
                            if ($(this).text().search(new RegExp(assigned, "i")) < 0) {
                                //console.log('trovato : ' + assigned);
                                //$(this).fadeOut();
                            } else {
                                //$(this).show();
                                $(this).fadeOut();
                            }
                        });
                    });

                }
            });
        }

        $.fn.seleAvailProbe = function (ProbeCod) {
            var req = $.DataAccess.hs_TemperatureProbeElem_Add(localStorage.getItem("hsId"), $elementCode, ProbeCod);
            req.success(function (json) {
                loadAssignedProbes();
                //loadAvailableProbes();
            });
        }

        $.fn.selassignedProbe = function (id) {
            var req = $.DataAccess.hs_TemperatureProbeElem_Del(id);
            req.success(function (json) {
                loadAssignedProbes();
                //loadAvailableProbes();
            });
        }
        /*---------------------------------------------------------------*/


        /*
        Cronos 
        -----------------------------------------------------------------*/
        function loadAssignedCronos() {
            $("#CronosassignedList").empty();
            var req = $.DataAccess.hs_CirdCron_List(localStorage.getItem("CirId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplCronosassignedList").tmpl(data).appendTo("#CronosassignedList");
                    $("#CronosassignedList").niceScroll({
                        cursorcolor: "#1FB5AD",
                        cursorborder: "0px solid #fff",
                        cursorborderradius: "0px",
                        cursorwidth: "3px"
                    });
                    loadAvailableCronos();
                }
                else {
                    loadAvailableCronos();
                }
            });
        }

        function loadAvailableCronos() {
            $("#CronosavailableList").empty();
            var req = $.DataAccess.hs_Cron_ListAll(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplCronosavailableList").tmpl(data).appendTo("#CronosavailableList");
                    $("#CronosavailableList").niceScroll({
                        cursorcolor: "#1FB5AD",
                        cursorborder: "0px solid #fff",
                        cursorborderradius: "0px",
                        cursorwidth: "3px"
                    });

                    $("#CronosassignedList li").each(function () {
                        var assigned = $(this).text().trim();
                        $("#CronosavailableList li").each(function () {
                            if ($(this).text().search(new RegExp(assigned, "i")) < 0) {
                                //console.log('trovato : ' + assigned);
                                //$(this).fadeOut();
                            } else {
                                //$(this).show();
                                $(this).fadeOut();
                            }
                        });
                    });

                }
            });
        }

        $.fn.seleAvailCrono = function (Id) {
            var req = $.DataAccess.hs_CirdCron_Add(localStorage.getItem("CirId"), Id, localStorage.getItem("OperatorName"));
            req.success(function (json) {
                loadAssignedCronos();
                //loadAvailableProbes();
            });
        }

        $.fn.selassignedCrono = function (Id) {
            var req = $.DataAccess.hs_CirdCron_Del(Id);
            req.success(function (json) {
                loadAssignedCronos();
                //loadAvailableProbes();
            });
        }
        /*---------------------------------------------------------------*/

        /*
        backup working mode
        -----------------------------------------------------------------*/
        function requestParam() {
            var r = $.DataAccess.hs_Cird_getBackupWorkingMode(localStorage.getItem("CirId"));
            r.success(function (json) {
                ReadCir();
            });
        }

        $('#DesbackupWorkingMode').on('focus', function (e) {
            Load_ul_backupWorkingMode();
            $("#ModalbackupWorkingMode").modal('show');
        });

        function Load_ul_backupWorkingMode() {
            $('#backupWorkingModeList').empty();
            var data = [];
            data.push({
                Id: 0,
                Descr: langResources['cirDworkingmode0']
            });
            data.push({
                Id: 1,
                Descr: langResources['cirDworkingmode1']
            });
            data.push({
                Id: 2,
                Descr: langResources['cirDworkingmode2']
            });
            data.push({
                Id: 3,
                Descr: langResources['cirDworkingmode3']
            });
            $("#tmplbackupWorkingModeList").tmpl(data).appendTo("#backupWorkingModeList");
        }

        $.fn.selbackupWorkingMode = function (Id, Descr) {
            $('#DesbackupWorkingMode').val(Descr);
            $('#backupWorkingMode').val(Id);
            $("#ModalbackupWorkingMode").modal('hide');
        }

        $('#btnUpd').on('click', function () {
            var backupWorkingMode = $('#backupWorkingMode').val();
            var req1 = $.DataAccess.hs_Cird_setBackupWorkingMode(localStorage.getItem("CirId"), backupWorkingMode)
            req1.success(function (json) {
                var data = json.d;
                if (data == true) {
                    toastr["success"](langResources['msg4operationok'], langResources['yes']);
                }
                else {
                    toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                }
            });
        });
        /*---------------------------------------------------------------*/

    }); //document ready

});

function seleAvailProbe(ProbeCod) {
    $.fn.seleAvailProbe(ProbeCod);
}
function selassignedProbe(id) {
    $.fn.selassignedProbe(id);
}
function seleAvailCrono(Id) { $.fn.seleAvailCrono(Id); }
function selassignedCrono(Id) { $.fn.selassignedCrono(Id);}
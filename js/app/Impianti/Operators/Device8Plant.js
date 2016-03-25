
$(function () {
    $(document).ready(function () {
        var $recUpdateRead = false;
        $('#SetMaintenanceModeResult').removeClass("operationOk");
        $('#SetMaintenanceModeResult').removeClass("operationNok");

        setTimeout(function () { $.rt.start(); }, 3000);

        $('.tablePlants').footable();
        $('.tablePlants').data('page-size', 3);
        $('.tablePlants').data('limit-navigation', 4);
        $('.tablePlants').trigger('footable_initialized');

        $('.tableErrorLog').footable();
        $('.tableErrorLog').data('page-size', 3000);
        $('.tableErrorLog').data('limit-navigation', 4);
        $('.tableErrorLog').trigger('footable_initialized');

        Readhs();
        setlanguage();

        function Readhs() {
            //$("#ListPlants").empty();
            var req = $.DataAccess.HeatingSystem_Read(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#hsDescr").text(data.DesImpianto + ' ' + data.Descr);                    
                    //$("#tmplListPlants").tmpl(data).appendTo("#ListPlants");                    
                    //$('.tablePlants').trigger('footable_redraw');

                    $('#hsId').html('<span class="label label-primary">' + data.hsId + '</span>');
                    if (data.stato == 0) {
                        $('#stato').html('<i class="fa fa-thumbs-o-up"></i>');
                    }
                    else if(data.stato==1){
                        $('#stato').html('<img src="images/status1.png" style="height:24px;width:24px" />');
                    }
                    else {
                        $('#stato').html('<img src="images/status2.png" style="height:24px;width:24px" />');
                    }
                    $('#Descr').text(data.Descr);
                    if (data.isOnline) {
                        $('#isOnline').html('<i class="fa fa-thumbs-o-up"></i>');
                    }
                    else {
                        $('#isOnline').html('<i class="fa fa-thumbs-o-down"></i>');
                    }

                    if (data.stato > 0) {
                        $('#btnResetSystemStatus').show();
                    }
                    else {
                        $('#btnResetSystemStatus').hide();
                    }

                    $('#Note').val(data.Note);

                    loadProbeElem(localStorage.getItem("hsId"));
                    loadTotDoc(data);
                    loadTotTickets(data);

                    $('#MaintenanceMode').bootstrapSwitch('state', data.MaintenanceMode, data.MaintenanceMode);
                    $recUpdateRead = true;
                }
            });
        }

        function loadProbeElem(elementCode) {
            $("#sList_" + elementCode).empty();
            var r = $.DataAccess.hs_TemperatureProbeElem_List(localStorage.getItem("hsId"), elementCode);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    console.log('loadProbeElem ' + elementCode, data);
                    $("#tmplProbeElem").tmpl(data).appendTo("#sList");
                    //$('.tableProbeElem').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }

        function loadTotDoc(data) {
            var r = $.DataAccess.hs_DocsgetTot(data.hsId);
            var qts = '#totDoc';
            r.success(function (json) {
                var tot = json.d;
                $(qts).text(tot);
            });
        }

        function loadTotTickets(data) {
            var r = $.DataAccess.hs_Tickets_getTotOpen(data.hsId);
            r.success(function (json) {
                var tot = json.d;
                $('#totTicket').text(tot);
            });
        }
        /*----------------------------------------------------------------------*/


        /*
        Maintenance Mode        
        -----------------------------------------------------------------------------------*/

        $('#MaintenanceMode').on('switchChange.bootstrapSwitch', function (event, state) {
            console.log('MaintenanceMode', $recUpdateRead);
            if ($recUpdateRead == true) {
                var req = $.DataAccess.HeatingSystem_setMaintenanceMode(localStorage.getItem("hsId"), state);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        $('#SetMaintenanceModeResult').addClass("operationOk");
                    }
                    else {
                        $('#SetMaintenanceModeResult').addClass("operationNok");
                    }
                });
            }
        });
        /*---------------------------------------------------------------------------------*/

        $.fn.callconfighs = function (hsId) {
            $.module.load('Impianti/Operators/hs_hs_Config');
        }

        $('#btnResetSystemStatus').on('click', function () {           
            var req = $.DataAccess.HeatingSystem_resetSystemStatus(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data == true) {
                    toastr["success"](langResources['msg4operationok'], langResources['yes'])
                    Readhs();
                }
                else { toastr["warning"](langResources['msg4operationfailed'], langResources['alert']); }
            });
        });

        /*
        ErrorLog
        --------------------------------------------------------------------*/
        var $logRowNumber = 0;
        $('#btnCloseDivErrorLog').on('click', function () {
            $('#DivErrorLog').hide();
        });

        $('#btnShowErrorLog').on('click', function () {
            $('#DivErrorLog').show();
            $logRowNumber = 0;
            $("#ListErrorLog").empty();
            loadErrorLog();
        });

        function loadErrorLog() {
            var r = $.DataAccess.hs_ErrorLog_ListAll(localStorage.getItem("hsId"), $logRowNumber);
            r.success(function (json) {             
                var data = json.d;
                if (data) {
                    $("#tmplListErrorLog").tmpl(data).appendTo("#ListErrorLog");
                    if (data.length == 100) {
                        var o = [{ id: $logRowNumber }];
                        $("#tmplListLogLastItem").tmpl(o).appendTo("#ListErrorLog");
                        $logRowNumber = $logRowNumber + 100;
                    }
                }
            });
        }

        $('.panel-body-ListLog').scroll(function (e) {           
            if (e) {
                e.stopPropagation();
                e.preventDefault();
            }
            if ($('#loadMore').length) {
                try {
                    //console.log("$(window).scrollTop() + $(window).height()="+$(window).scrollTop() + $(window).height()+  " '$('#loadMore').offset().top=" + $('#loadMore').offset().top);
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

        $.fn.loadMore = function () {
            $('#loadMore').remove();
            loadErrorLog();
        }
        /*----------------------------------------------------------------------*/

        /*
        Documents
        ----------------------------------------------------------------*/
        $.fn.CalhsDoc = function () {
            $.module.load('Impianti/Operators/hs_Docs_Manage');
        }
        /*--------------------------------------------------------------*/

        /*
        Tickets
        ----------------------------------------------------------------*/
        $.fn.CalhsTickets = function () {
            $.module.load('Impianti/Operators/hs_Tickets_Manage');
        }
        /*--------------------------------------------------------------*/

    }); //document ready
});

function callconfighs(hsId) {
    $.fn.callconfighs(hsId);
}
function loadMore() { $.fn.loadMore(); }

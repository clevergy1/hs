
$(function () {

    $(document).ready(function () {

        /*
        signalR
        ----------------------------------------------*/
        $.fn.received_hs_Cron_setStatus = function (hsId, CronCod, SetPoint, stato) {
            if (localStorage.getItem("hsId") == hsId) {
                $('#btnrequestLog').show();
                statusChanged('#Cronstato_' + Cod, stato);
                if (SetPoint > 0) {
                    $('#isOn_' + CirCod).text('true');
                }
                else {
                    $('#isOn_' + CirCod).text('false');
                }                
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

        /*
        fixed header table
        ---------------------------------------------------------------*/
        $('#mainTable').floatThead({
            scrollContainer: function ($table) {
                return $table.closest('.panel-body');
            }
        });
        /*-------------------------------------------------------------*/

        Readhs();
        loadCron();
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
        Chronographs
        ------------------------------------------------------------------------*/


        function loadCron() {
            $("#CronList").empty();
            var r = $.DataAccess.hs_Cron_ListOnOff(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplCron").tmpl(data).appendTo("#CronList");                    
                    setlanguage();                    
                }
            });
        }

        $('#btnrequestLog').on('click', function () {
            //setTimeout(function () { $.rt.start(); }, 1000);
            console.log('btnrequestLog');
            $.DataAccess.HeatingSystem_requestLog(localStorage.getItem("hsId"));
            $('#btnrequestLog').hide();
        });


        $.fn.callEditCron = function (CronId) {
            localStorage.setItem("CronId", CronId);           
            $.module.load('Impianti/Supervisors/hs_Cronograph_Edit');
        }

        $.fn.CallCronschedule = function (CronId) {
            localStorage.setItem("CronId", CronId);
            localStorage.setItem("CronOnOff", 1);
            $.module.load('Impianti/Supervisors/hs_Cron_Tasks');
        }
        /*----------------------------------------------------------------------*/

        /* Replacements
        ------------------------------------------------------------------------*/
        $.fn.callReplacements = function (Id) {
            localStorage.setItem("ParentId", Id);
            //se sono in un cronografo io lo devo sapere perchè la funzione per i cronotermostati e i cronografi è la stessa.
            localStorage.setItem("PCRONGraph", "yes");
            $.module.load('Impianti/Supervisors/hs_Cron_Replacements');
        }
        /*----------------------------------------------------------------------*/

        /*
        Error codes
        ------------------------------------------------------------------------*/
        var $errorRowNumber0;
        $.fn.callErrorLog = function (Cod) {
            $errorRowNumber = 0
            $('#Cod').text(Cod);
            $("#ListErrorLog").empty();
            loadErrorLog();
        }
        $('#closeErrors').on('click', function () {
            $('#Errors').hide();
            $('#list').show();
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
                    $('#Errors').show();
                    $('#list').hide();
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

    }); // document ready

});
function callconfigCron(CronId) {
    $.fn.callconfigCron(CronId);
}
function callUpdateCron(CronId) {
    $.fn.callUpdateCron(CronId);
}
function callErrorLog(Cod) { $.fn.callErrorLog(Cod); }
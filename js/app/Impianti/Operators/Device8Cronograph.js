
$(function () {

    $(document).ready(function () {

        /*
        signalR
        ----------------------------------------------*/
        $.fn.received_hs_Cron_setStatus = function (hsId, CronCod, SetPoint, stato) {
            if (localStorage.getItem("hsId") == hsId) {
                statusChanged('#Cronstato_' + Cod, stato);
                $('#SetPoint_' + CirCod).text(SetPoint);
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
        $('#btnCallAddCron').on('click', function (e) {
            $.module.load('Impianti/Operators/hs_Cronograph_Add');
        });

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

        $.fn.callUpdateCron = function (CronId) {
            localStorage.setItem("CronId", CronId);
            $.module.load('Impianti/Operators/hs_Cronograph_Update');
        }

        $.fn.callconfigCron = function (CronId) {
            localStorage.setItem("CronId", CronId);
            $.module.load('Impianti/Operators/hs_Cron_Config');
        }

        $.fn.callEditCron = function (CronId) {
            localStorage.setItem("CronId", CronId);
            $.module.load('Impianti/Operators/hs_Cron_Edit');
        }

        $.fn.CallCronschedule = function (CronId) {
            localStorage.setItem("CronId", CronId);
            $.module.load('Impianti/Operators/hs_Cron_Tasks');
        }
        /*----------------------------------------------------------------------*/

        /* Replacements
        ------------------------------------------------------------------------*/
        $.fn.callReplacements = function (Id) {
            localStorage.setItem("ParentId", Id);
            $.module.load('Impianti/Operators/hs_Cron_Replacements');
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
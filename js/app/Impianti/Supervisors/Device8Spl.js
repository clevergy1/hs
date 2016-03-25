
$(function () {

    $(document).ready(function () {
        /*
        signalR
        ----------------------------------------------*/
        $.fn.received_hs_spl_setValue = function (hsId, Cod) {
            if (localStorage.getItem("hsId") == hsId) {
                $('#btnrequestLog').show();
                var r = $.DataAccess.hs_spl_ReadByCod(hsId, Cod);
                r.success(function (json) {
                    var data = json.d;
                    if (data) {
                        statusChanged('#stato_' + Cod, data.stato);
                        $('#isRunning_' + Cod).text(data.isRunning);
                    }
                });
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

        Readhs();
        loadspl();
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

        function loadSplCron(SplId, SplCod) {
            $("#SplCronList_" + SplCod).empty();
            var r = $.DataAccess.hs_SplCron_List(SplId);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplSplCron").tmpl(data).appendTo("#SplCronList_" + SplCod);
                    setlanguage();
                }
            });
        }


        /*
        Split
        ------------------------------------------------------------------------*/
        $('#btnCallAdd').on('click', function (e) {
            $.module.load('Impianti/Operators/hs_Spl_Add');
        });

        $('#btnrequestLog').on('click', function () {
            $.DataAccess.HeatingSystem_requestLog(localStorage.getItem("hsId"));
            $('#btnrequestLog').hide();
        });

        function loadspl() {
            $("#SplList").empty();
            var r = $.DataAccess.hs_spl_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplSplList").tmpl(data).appendTo("#SplList");
                    setlanguage();
                    setTimeout(function () { loadOthers(data); }, 200);
                }
            });
        }

        function loadOthers(data) {
            for (var i = 0; i < data.length; i++) {
                loadProbeElem(data[i].Cod);
                loadSplCron(data[i].Id, data[i].Cod);
            }
        }

        $.fn.callUpdate = function (Id) {
            localStorage.setItem("SplId", Id);
            $.module.load('Impianti/supervisors/hs_Spl_Update');
        }

        $.fn.callconfig = function (Id) {
            localStorage.setItem("SplId", Id);
            $.module.load('Impianti/supervisors/hs_Spl_Config');
        }

        $.fn.log = function (Cod) {
            localStorage.setItem("SplCod", Cod);
            $.module.load('Impianti/supervisors/hs_Spl_log');
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

        /* Replacements
        ------------------------------------------------------------------------*/
        $.fn.callReplacements = function (Id) {
            localStorage.setItem("ParentId", Id);
            $.module.load('Impianti/supervisors/hs_Spl_Replacements');
        }
        /*----------------------------------------------------------------------*/


    }); //document ready

});

function callUpdate(Id) {
    $.fn.callUpdate(Id);
}
function callconfig(Id) {
    $.fn.callconfig(Id);
}
function log(Cod) {
    $.fn.log(Cod);
}
function CallShowErrorLog(Cod) { $.fn.callErrorLog(Cod); }
function callErrorLog(Cod) {    $.fn.callErrorLog(Cod);}
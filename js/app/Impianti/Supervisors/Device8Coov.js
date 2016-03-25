$(function () {
    $(document).ready(function () {
        /*
        signalR
        ----------------------------------------------*/
        $.fn.received_hs_Coov_setValue = function (hsId, Cod, currentValue) {
            if (localStorage.getItem("hsId") == hsId) {
                $('#btnrequestLog').show();
                $('#currentValue_' + Cod).text(Number(currentValue).toLocaleString());
            }
        }
        /*--------------------------------------------*/

        /*
        fixed header table
        ---------------------------------------------------------------*/
        $('#mainTable').floatThead({
            scrollContainer: function ($table) {
                return $table.closest('.panel-body');
            }
        });
        $('#tableErrors').floatThead({
            scrollContainer: function ($table) {
                return $table.closest('.panel-body');
            }
        });
        /*-------------------------------------------------------------*/

        Readhs();
        loadProbes();
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
        Coov
        ------------------------------------------------------------------------*/
        $('#btnCallAdd').on('click', function (e) {
            $.module.load('Impianti/Operators/hs_Coov_Add');
        });

        $('#btnrequestLog').on('click', function () {
            //setTimeout(function () { $.rt.start(); }, 1000);
            console.log('btnrequestLog');
            $.DataAccess.HeatingSystem_requestLog(localStorage.getItem("hsId"));
            $('#btnrequestLog').hide();
        });

        function loadProbes() {
            $("#CoovList").empty();
            var r = $.DataAccess.hs_Coov_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplCoovs").tmpl(data).appendTo("#CoovList");
                    setlanguage();
                }
            });
        }

        //$.fn.callUpdate = function (Id) {
        //    localStorage.setItem("CoovId", Id);
        //    $.module.load('Impianti/Supervisors/hs_Coov_Update');
        //}

        //$.fn.calllog = function (Cod) {
        //    localStorage.setItem("Cod", Cod);
        //    $.module.load('Impianti/Supervisors/hs_Coov_log');
        //}
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
            $('#Errors').show();
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
                    $('#tableErrors').floatThead({
                        scrollContainer: function ($table) {
                            return $table.closest('.panel-body');
                        }
                    });
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
            $.module.load('Impianti/Supervisors/hs_Coov_Replacements');
        }
        /*----------------------------------------------------------------------*/



    }); //document ready
});

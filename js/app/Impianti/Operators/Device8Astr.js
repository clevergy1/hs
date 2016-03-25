$(function () {

    $(document).ready(function () {

        /*
        signalR
        ----------------------------------------------*/
        $.fn.received_hs_Astr_changed = function (hsId, Cod) {
            if (localStorage.getItem("hsId") == hsId) {
                statusChanged('#stato_' + Cod, stato);
                
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
        loadAstr();
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
        Astronomical clocks
        ------------------------------------------------------------------------*/
        $('#btnCallAdd').on('click', function (e) {
            $.module.load('Impianti/Operators/hs_Astr_Add');
        });

        function ReadByCod(hsId, Cod) {
            var req = $.DataAccess.hs_Astr_ReadByCod(hsId, Cod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    statusChanged('#stato_' + data.Cod, data.stato);
                    $('#SetPoint_' + data.Cod).text(Number(data.SetPoint).toLocaleString());
                    $('#WorkingMode_' + data.Cod).text(Number(data.WorkingMode).toLocaleString());
                    $('#LastReceived_' + data.Cod).text(moment(LastReceived).format('DD/MM/YYYY HH:mm'));
                    $('#AstrSunRise_' + data.Cod).text(moment(lrSunRise).format('HH:mm'));
                    $('#AstrSunSet_' + data.Cod).text(moment(lrSunSet).format('HH:mm'));
                }
            });
        }

        function loadAstr() {
            $("#AstrList").empty();
            var r = $.DataAccess.hs_Astr_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplAstr").tmpl(data).appendTo("#AstrList");
                    setlanguage();
                }
            });
        }

        $.fn.callUpdate = function (Id) {
            localStorage.setItem("AstrId", Id);
            $.module.load('Impianti/Operators/hs_Astr_Update');
        }

        $.fn.callconfig = function (Id) {
            localStorage.setItem("AstrId", Id);
            $.module.load('Impianti/Operators/hs_Astr_Config');
        }

        $.fn.callEdit = function (Id) {
            localStorage.setItem("AstrId", Id);
            $.module.load('Impianti/Operators/hs_Astr_Edit');
        }

        $.fn.callschedule = function (Id) {
            localStorage.setItem("AstrId", Id);
            $.module.load('Impianti/Operators/hs_Astr_Tasks');
        }
        /*----------------------------------------------------------------------*/

        /* Replacements
        ------------------------------------------------------------------------*/
        $.fn.callReplacements = function (Id) {
            localStorage.setItem("ParentId", Id);
            $.module.load('Impianti/Operators/hs_Astr_Replacements');
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
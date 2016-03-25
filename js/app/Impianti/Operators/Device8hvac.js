$(function () {

    $(document).ready(function () {

        /*
        signalR
        ----------------------------------------------*/
        $.fn.received_hs_hvac_setStatus = function (hsId, Cod, stato) {
            //console.log("received_hs_Anz_setStatus");
            if (localStorage.getItem("hsId") == hsId) {
                statusChanged('#stato_' + Cod, stato);
            }
        }
        $.fn.received_hs_hvac_changed = function (hsId, Cod) {
            console.log("Device8hvac received_hs_hvac_changed");
            if (localStorage.getItem("hsId") == hsId) {
                readhvac(Cod);
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
        //$('#tableErrors').floatThead({
        //    scrollContainer: function ($table) {
        //        return $table.closest('.panel-body');
        //    }
        //});        
        /*-------------------------------------------------------------*/

        var $table_data;

        Readhs();
        loadhvac();
        setlanguage()

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
        hvac
        ------------------------------------------------------------------------*/
        function loadhvac() {
            $("#Listhvac").empty();
            var r = $.DataAccess.hs_hvac_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                $table_data = json.d;
                if ($table_data) {
                    $("#tmplListhvac").tmpl($table_data).appendTo("#Listhvac");
                    setlanguage();
                }
            });
        }

        function readhvac(Cod) {
            var r = $.DataAccess.hs_hvac_ReadByCod(localStorage.getItem("hsId"), Cod);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#LastReceived_' + data.Cod).text(moment(data.LastReceived).format("DD/MM/YYYY HH:mm"));

                    $('.LastUpdate').html('');
                    $('#LastUpdate_' + data.Cod).html('<img src="images/action_success.png" alt="" style="height:15px;width:15px"/>');

                    for (var i = 0; i < $table_data.length; i++) {
                        if ($table_data[i].Cod == Cod) {
                            //console.log('$tablehs_Anz_data[i]', $tablehs_Anz_data[i]);
                            //console.log('data', data);
                            $table_data[i] = data;
                            if (!$('#divDetailhvac').is(':visible')) {
                                $("#divDetailhvac").empty();
                                $("#tmplDetail").tmpl($table_data[i]).appendTo("#divDetailhvac");
                            }
                        }
                    }
                }
            });
        }

        $.fn.callShowDetail = function (Id) {
            for (var i = 0; i < $table_data.length; i++) {
                if ($table_data[i].Id == Id) {
                    $("#divDetailhvac").empty();
                    $("#tmplDetail").tmpl($table_data[i]).appendTo("#divDetailhvac");
                    loadCoovElem($table_data[i].Cod);
                    $('#divDetailhvac').show();
                    $('#divListhvac').hide();
                }
            }
        }
        $.fn.closeDetail = function () {
            $('#divDetailhvac').hide();
            $('#divListhvac').show();
        }

        $.fn.callLog = function (Cod) {
            localStorage.setItem("Cod", Cod);
            $.module.load('Impianti/Operators/hs_hvac_log');
        }

        $.fn.callAdd = function () { $.module.load('Impianti/Operators/hs_hvac_Add'); }

        $.fn.callUpd = function (Id) {
            localStorage.setItem("hvacId", Id);
            $.module.load('Impianti/Operators/hs_hvac_Update');
        }

        $.fn.callReplacements = function (Id) {
            localStorage.setItem("ParentId", Id);
            $.module.load('Impianti/Operators/hs_hvac_Replacements');
        }

        $.fn.callconfig = function (Id) {
            localStorage.setItem("Id", Id);
            $.module.load('Impianti/Operators/hs_hvac_Config');
        }
        /*----------------------------------------------------------------------*/

        /*
        CoovElem
        ------------------------------------------------------------------------*/
        function loadCoovElem(elementCode) {
           // $("#CoovElem").empty();
            var r = $.DataAccess.hs_CoovElem_List(localStorage.getItem("hsId"), elementCode);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplCoovElem").tmpl(data).appendTo("#tablebodydetail");
                    setlanguage();
                }
            });
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
            $('#Errors').show();
        }
        $('#closeErrors').on('click', function () {
            $('#Errors').hide();
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

    }); //document ready

});

function callUpd(Id) { $.fn.callUpd(Id); }
function callShowDetail(Id) { $.fn.callShowDetail(Id); }
function closeDetail() { $.fn.closeDetail(); }
function callLog(Cod) { $.fn.callLog(Cod); }
function callErrorLog(Cod) { $.fn.callErrorLog(Cod); }
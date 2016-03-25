
$(function () {

    $(document).ready(function () {

        /*
        signalR
        ----------------------------------------------*/
        $.fn.received_hs_Ctp_setValue = function (hsId, Cod, stato, VolumeCounter, FlowRate) {
            console.log('received_hs_Ctp_setValue');
            if (localStorage.getItem("hsId") == hsId) {
                $('#btnrequestLog').show();
                statusChanged('#Ctpstato_$' + Cod, stato);
                $('#Flowrate_' + Cod).text(Number(Flowrate).toLocaleString());
                $('#VolumeCounter_' + Cod).text(Number(VolumeCounter).toLocaleString());
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
        loadCtp();
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

        /*
        Add
        ------------------------------------------------------------------------*/
        $('#btnCallAdd').on('click', function (e) {
            $.module.load('Impianti/supervisors/hs_Ctp_Add');
        });

        $('#btnrequestLog').on('click', function () {
            //setTimeout(function () { $.rt.start(); }, 1000);
            console.log('btnrequestLog');
            $.DataAccess.HeatingSystem_requestLog(localStorage.getItem("hsId"));
            $('#btnrequestLog').hide();
        });

        function loadCtp() {
            $("#CtpList").empty();
            var r = $.DataAccess.hs_Ctp_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplCtp").tmpl(data).appendTo("#CtpList");
                    $('.tableCtp').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }

        $.fn.callUpdate = function (Id) {
            localStorage.setItem("CtpId", Id);
            $.module.load('Impianti/supervisors/hs_Ctp_Update');
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
            console.log('loadErrorLog');
            var req = $.DataAccess.hs_ErrorLog_ListByElement(localStorage.getItem("hsId"), $('#Cod').text(), $errorRowNumber);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    //for (var i = 0; i < data.length; i++) {
                    //    data[i].LogDate = moment(data[i].LogDate).format('DD/MM/YYYY HH:mm');
                    //}//end for
                    $("#tmplListErrorLog").tmpl(data).appendTo("#ListErrorLog");
                    var o = [{ id: $errorRowNumber }];
                    $("#tmplListErrorLogLastItem").tmpl(o).appendTo("#ListErrorLog");
                    $('.tableErrorLog').trigger('footable_redraw');
                    $('#Errors').show();
                    $('#list').hide();

                    $errorRowNumber = $errorRowNumber + 100;
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
            $.module.load('Impianti/supervisors/hs_Ctp_Replacements');
        }
        /*----------------------------------------------------------------------*/

    }); //document ready

});

function callUpdate(Id) { $.fn.callUpdate(Id);}
function callErrorLog(Cod) { $.fn.callErrorLog(Cod); }
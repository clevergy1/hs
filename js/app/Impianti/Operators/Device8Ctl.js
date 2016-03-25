
$(function () {

    $(document).ready(function () {
        $('.tableCtl').footable();
        $('.tableCtl').data('page-size', 3);
        $('.tableCtl').data('limit-navigation', 4);
        $('.tableCtl').trigger('footable_initialized');

        /*
        signalR
        ----------------------------------------------*/
        $.fn.received_hs_Ctl_setValue = function (hsId, CtlCod, stato, currentValue) {
            if (localStorage.getItem("hsId") == hsId) {
                statusChanged('#Ctlstato_' + CtlCod, stato);
                $('#currentValue_' + CtlCod).text(currentValue);
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
        loadCtl();
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
        Flowmeters
        ------------------------------------------------------------------------*/
        $('#btnCallAddCtl').on('click', function (e) {
            $.module.load('Impianti/Operators/hs_Ctl_Add');
        });

        function loadCtl() {
            $("#CtlList").empty();
            var r = $.DataAccess.hs_Ctl_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplCtl").tmpl(data).appendTo("#CtlList");
                    $('.tableCtl').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }

        $.fn.callUpdateCtl = function (CtlId) {
            localStorage.setItem("CtlId", CtlId);
            $.module.load('Impianti/Operators/hs_Ctl_Update');
        }
        /*----------------------------------------------------------------------*/


        /* Replacements
        ------------------------------------------------------------------------*/
        $.fn.callReplacements = function (Id) {
            localStorage.setItem("ParentId", Id);
            $.module.load('Impianti/Operators/hs_Ctl_Replacements');
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

    }); //document ready

});

function callUpdateCtl(CtlId) { $.fn.callUpdateCtl(CtlId); }
function callErrorLog(Cod) { $.fn.callErrorLog(Cod); }


$(function () {

    $(document).ready(function () {

        /*
        signalR
        ----------------------------------------------*/
        $.fn.received_hs_Vrd_setStatus = function (hsId, VrdCod, SetPoint, SetPosition, Position, stato) {
            if (localStorage.getItem("hsId") == hsId) {
                statusChanged('#Vrdstato' + VrdCod, stato);
                $('#SetPoint_' + VrdCod).text(SetPoint);
                $('#SetPosition_' + VrdCod).text(SetPosition);
                $('#Position_' + VrdCod).text(Position);
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
        loadServomotors();
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
                    setlanguage();
                }
            });
        }


        /*
        Servomotors
        ------------------------------------------------------------------------*/
        $('#btnCallAddVrd').on('click', function (e) {
            $.module.load('Impianti/Operators/hs_Vrd_Add');
        });

        function loadServomotors() {
            $("#ServomotorsList").empty();
            var r = $.DataAccess.hs_Vrd_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {                                       
                    $("#tmplServomotors").tmpl(data).appendTo("#ServomotorsList");
                    $('.tableServomotors').trigger('footable_redraw');
                    setlanguage();

                    for (var i = 0; i < data.length; i++) { loadProbeElem(data[i].VrdCod) }
                }
            });
        }

        $.fn.callUpdateVrd = function (VrdId) {
            localStorage.setItem("VrdId", VrdId);
            $.module.load('Impianti/Operators/hs_Vrd_Update');
        }

        $.fn.callconfigVrd = function (VrdId) {
            localStorage.setItem("VrdId", VrdId);
            $.module.load('Impianti/Operators/hs_Vrd_Config');
        }
        /*----------------------------------------------------------------------*/

        /* Replacements
        ------------------------------------------------------------------------*/
        $.fn.callReplacements = function (Id) {
            localStorage.setItem("ParentId", Id);
            $.module.load('Impianti/Operators/hs_Vrd_Replacements');
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

    }); //document ready

});

function callconfigVrd(VrdId) {    $.fn.callconfigVrd(VrdId);}
function callUpdateVrd(VrdId) {    $.fn.callUpdateVrd(VrdId);}
function CallShowErrorLog(CirCod) { $.fn.callErrorLog(CirCod); }
function callErrorLog(Cod) { $.fn.callErrorLog(Cod); }

$(function () {

    $(document).ready(function () {
       /*
        signalR
        ----------------------------------------------*/
        $.fn.received_hs_Anz_setStatus = function (hsId, Cod, stato) {
            if (localStorage.getItem("hsId") == hsId) {
                statusChanged('#Anzstato_' + Cod, stato);               
            }
        }
        $.fn.received_hs_Anz_changed = function (hsId, Cod) {
            console.log("Device8Anz received_hs_Anz_changed");
            if (localStorage.getItem("hsId") == hsId) {
                readAnz(Cod);
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

        var $tablehs_Anz_data;
        var $tablehs_args=null;


        Readhs();
        loadAnz();
        setlanguage();

        function Readhs() {
            $("#ListPlants").empty();
            var req = $.DataAccess.HeatingSystem_Read(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {                 
                    $("#hsDescr").text(data.DesImpianto + ' '+ data.Descr);
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
        Analizzatori di rete
        ------------------------------------------------------------------------*/
        $('#btnCallAdd').on('click', function (e) {
            $.module.load('Impianti/Operators/hs_Anz_Add');
        });

        function loadAnz() {
            $("#AnzList").empty();
            var r = $.DataAccess.hs_Anz_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                $tablehs_Anz_data = json.d;
                if ($tablehs_Anz_data) {                   
                    $("#tmplAnz").tmpl($tablehs_Anz_data).appendTo("#AnzList");
                    setlanguage();    
                }
            });
        }

        function readAnz(Cod) {
            var r = $.DataAccess.hs_Anz_ReadByCod(localStorage.getItem("hsId"), Cod);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    for (var i = 0; i < $tablehs_Anz_data.length; i++) {
                        if ($tablehs_Anz_data[i].Cod == Cod) {
                            //console.log('$tablehs_Anz_data[i]', $tablehs_Anz_data[i]);
                            //console.log('data', data);
                            $tablehs_Anz_data[i] = data;
                            if (!$('#divDetail').is(':visible')) {
                                $("#divDetail").empty();
                                $("#tmplAnzDetail").tmpl($tablehs_Anz_data[i]).appendTo("#divDetail");
                            }
                        }
                    }
                }
            });
        }

        $.fn.rowCmdSelect = function (Id, Cod, Des) {
            $('.Descr').text(Des);
            $("#ulRowCmd").empty();
            var data = [{ "Id": Id, "Cod": Cod }];
            console.log(data);
            $("#tmpRowCmd").tmpl(data).appendTo("#ulRowCmd");
            setlanguage();
            $('#RowCmdModal').modal('show');
        }
        function close_rowModal() {
            $('body').removeClass('modal-open');
            $('.modal-backdrop').removeClass('modal-backdrop');
            $('#RowCmdModal').modal('hide');
        }

        $.fn.callUpdate = function (Id) {
            close_rowModal();
            localStorage.setItem("IdAnz", Id);
            $.module.load('Impianti/Operators/hs_Anz_Update');
        }

        $.fn.logAnz = function (Cod) {
            close_rowModal();
            localStorage.setItem("AnzCod", Cod);
            $.module.load('Impianti/Operators/hs_Anz_log');
        }

        $.fn.callShowDetail = function (Id) {
            close_rowModal();;
            for (var i = 0; i < $tablehs_Anz_data.length; i++) {
                if ($tablehs_Anz_data[i].Id == Id) {
                    $("#divDetail").empty();
                    $("#tmplAnzDetail").tmpl($tablehs_Anz_data[i]).appendTo("#divDetail");
                    $('#divDetail').show();
                    $('#divList').hide();
                }
            }
        }
        $.fn.closeAnzDetail = function () {
            $('#divDetail').hide();
            $('#divList').show();
        }
        /*----------------------------------------------------------------------*/


        /* Replacements
        ------------------------------------------------------------------------*/
        $.fn.callReplacements = function (Id) {
            close_rowModal();
            localStorage.setItem("ParentId", Id);
            $.module.load('Impianti/Operators/hs_Anz_Replacements');
        }
        /*----------------------------------------------------------------------*/

        /*
        Error codes
        ------------------------------------------------------------------------*/
        var $errorRowNumber0;
        $.fn.callErrorLog = function (Cod) {
            close_rowModal();
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

function callUpdate(Id) {
    $.fn.callUpdate(Id);
}
function callShowDetail(Id) { $.fn.callShowDetail(Id); }
function closeAnzDetail() { $.fn.closeAnzDetail(); }
function logAnz(Cod) {
    $.fn.logAnz(Cod);
}
function callErrorLog(Cod) { $.fn.callErrorLog(Cod);}
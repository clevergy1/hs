
$(function () {

    $(document).ready(function () {
        /*
        signalR
        ----------------------------------------------*/
        $.fn.received_hs_sca_changed = function (hsId, scaId, Id, currentValue) {
            var onoff = '';
            if (currentValue == true) {
                onoff = 'ON';
            }
            else {
                onoff = 'OFF';
            }
            $('#currentValue_' + scaId + '_' + id).text(onoff);
        }
        /*--------------------------------------------*/

        var $table_data;
        var $currentId = 0;

        $('.table').footable();
        $('.table').data('page-size', 50);
        $('.table').data('limit-navigation', 4);
        $('.table').trigger('footable_initialized');

        Readhs();
        loadsca();
        setlanguage();

        function Readhs() {
            var req = $.DataAccess.HeatingSystem_Read(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#hsDescr").text(data.DesImpianto + ' ' + data.Descr);
                }
            });
        }

        function loadsca() {
            $("#head").empty();
            $("#List").empty();
            var r = $.DataAccess.hs_Sca_header_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                $table_data = json.d;
                if ($table_data) {
                    $("#tmplHead").tmpl($table_data[0]).appendTo("#head");
                    $("#tmpl").tmpl($table_data).appendTo("#List");
                    //$('.table').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }

        $('#btnCallAdd').on('click', function (e) {
            $.module.load('Impianti/Operators/hs_sca_Add');
        });

        $.fn.callUpdate = function (Id) {
            localStorage.setItem("scaId", Id);
            $.module.load('Impianti/Operators/hs_sca_Update');
        }

        $.fn.callShowDetail = function (scaId) {
            localStorage.setItem("scaId", scaId);
            $('#detailList').empty();
            var r = $.DataAccess.hs_Sca_detail_List(scaId);
            r.success(function (json) {
                var data = json.d;
                if (data) {                    
                    $("#tmplDetail").tmpl(data).appendTo("#detailList");
                    //$('.table').trigger('footable_redraw');
                    setlanguage();
                }
            });

            $('#divDetail').show();
            $('#divList').hide();
        }
        $.fn.closeDetail = function () {
            $('#divDetail').hide();
            $('#divList').show();
        }

        $('#btnAddDetail').on('click', function (e) {            
            $.module.load('Impianti/Operators/hs_sca_detail_add');
        });

        $.fn.updateDetail = function (Id) {
            localStorage.setItem("Id", Id);
            $.module.load('Impianti/Operators/hs_sca_detail_update');
        }


        $.fn.callEditHeader = function (Id) {
            localStorage.setItem("scaId", Id);
            $.module.load('Impianti/Operators/hs_sca_update');
        }

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
            $('#divList').show();
        });

        function loadErrorLog() {
            $('#Errors').show();

            var req = $.DataAccess.hs_ErrorLog_ListByElement(localStorage.getItem("hsId"), $('#Cod').text(), $errorRowNumber);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    console.log(data);
                    $("#tmplListErrorLog").tmpl(data).appendTo("#ListErrorLog");
                    if (data.length > 99) {
                        var o = [{ id: $errorRowNumber }];
                        $("#tmplListErrorLogLastItem").tmpl(o).appendTo("#ListErrorLog");
                        $errorRowNumber = $errorRowNumber + 100;
                    }
  
                }
                else { console.log('no data');}
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
            $.module.load('Impianti/Operators/hs_Sca_Replacements');
        }
        /*----------------------------------------------------------------------*/


    }); //document ready

});
function callShowDetail(scaId) { $.fn.callShowDetail(scaId); }
function closeDetail() { $.fn.closeDetail(); }
function updateDetail(Id) { $.fn.updateDetail(Id); }
function callEditHeader(Id) { $.fn.callEditHeader(Id); }
function callErrorLog(Cod) { $.fn.callErrorLog(Cod); }

$(function () {

    $(document).ready(function () { }); //document ready

    Readhs();
    loadEvs();
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
    Elettrovalvole
    ---------------------------------------------------------------------------*/
    function loadEvs() {
        $("#EvsList").empty();
        var r = $.DataAccess.hs_Ev_List(localStorage.getItem("hsId"));
        r.success(function (json) {
            var data = json.d;
            if (data) {
                console.log(data);
                $("#tmplEvsList").tmpl(data).appendTo("#EvsList");
                setlanguage();
            }
        });
    }

  

    $.fn.callUpdate = function (Id) {
        localStorage.setItem("EvId", Id);
        $.module.load('Impianti/Supervisors/hs_Ev_Update');
    }

    /*-------------------------------------------------------------------------*/

    $.fn.execCmd = function (EvId, runCmd) {
        if (runCmd) {
            var req = $.DataAccess.hs_Ev_ForceStop(EvId);
            req.success(function (json) {
                var data = json.d;
                console.log('ForceStop', data);
                if (data == true) {
                    toastr["success"](langResources['msg4operationok'], "success");
                }
            });
        }
        else {
            var req = $.DataAccess.hs_Ev_ForceRun(EvId);
            req.success(function (json) {
                var data = json.d;
                console.log('ForceRun', data);
                if (data == true) {
                    toastr["success"](langResources['msg4operationok'], "success");
                }
            });
        }
    }
    $.fn.ReleaseForce = function (EvId) {
        var req = $.DataAccess.hs_Ev_ReleaseForce(EvId);
        req.success(function (json) {
            var data = json.d;
            console.log('ReleaseForce', data);
            if (data == true) {
                toastr["success"](langResources['msg4operationok'], "success");
            }
        });
    }

    /*
    Error codes
    ------------------------------------------------------------------------*/
    var $errorRowNumber0;
    $.fn.callErrorLog = function (Cod) {
        console.log('callErrorLog');
        $errorRowNumber = 0
        $('#Cod').text(Cod);
        $("#ListErrorLog").empty();
        $('#Errors').show();
        loadErrorLog();
    }
    $('#closeErrors').on('click', function () {
        $('#Errors').hide();
    });

    function loadErrorLog() {
        var req = $.DataAccess.hs_ErrorLog_ListByElement(localStorage.getItem("hsId"), $('#Cod').text(), $errorRowNumber);
        req.success(function (json) {
            var data = json.d;
            if (data) {
                $('#tableErrors').floatThead({
                    scrollContainer: function ($table) {
                        return $table.closest('.panel-body');
                    }
                });
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

});
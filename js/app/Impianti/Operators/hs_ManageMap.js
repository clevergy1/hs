/*
Impianti operators manage Heating system maps 
------------------------------------------*/
$(function () {

    $(document).ready(function () {
        $('.tableMaps').footable();
        $('.tableMaps').data('page-size', 20);
        $('.tableMaps').data('limit-navigation', 4);
        $('.tableMaps').trigger('footable_initialized');

        ReadImpianto();
        loadMaps();

        function ReadImpianto() {
            var req = $.DataAccess.Impianti_Read(localStorage.getItem("IdImpianto"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#DesImpianto").text(data.DesImpianto);
                }
            });
        }

        function loadMaps() {
            $("#ListMaps").empty();
            var r = $.DataAccess.hs_Maps_List(localStorage.getItem("IdImpianto"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplListMaps").tmpl(data).appendTo("#ListMaps");
                    $('.tableMaps').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }

        $.fn.callShowMap = function (MapId) {
            var url = 'hs_Synoptic.html';
            window.open(url, '_blank');
            localStorage.setItem("MapId", MapId);
        }

        /*-------------------------------------------------------*/

        /*
        Add
        ---------------------------------------------------------*/
        $('#btnCallAdd').on('click', function (e) {
            $('#List').hide();
            $('#Upd').hide();

            $('#MapDesc_Add').val('');

            $('.required').removeClass("error");
            $('#Add').show();

        });

        $('#fileuploadADD').bind('fileuploadsubmit', function (e, data) {
            data.formData = {
                Descr: $('#MapDesc_Add').val().trim(),
                IdImpianto: localStorage.getItem("IdImpianto"),
                MapId: 0,
                UserName: localStorage.getItem("OperatorName")
            };
        });


        $('#fileuploadADD').fileupload({
            url: $.appParms.urlGlobal() + 'UphsMaps.ashx',
            dataType: 'json',
            acceptFileTypes: /(\.|\/)(svg)$/i,
            maxFileSize: 5000000, // 5 MB
            done: function (e, data) {
                $.each(data.result.files, function (index, file) {
                    $('<p/>').text(file.name).appendTo('#files');
                });
            },
            progressall: function (e, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10);
                $('#progress .progress-bar').css(
                    'width',
                    progress + '%'
                );
            },
            success: function (json) {
                loadMaps();
                $('#Add').hide()
                $('#Upd').hide();
                $('#List').show();
            }
        }).prop('disabled', !$.support.fileInput)
            .parent().addClass($.support.fileInput ? undefined : 'disabled');

        $('#btnCloseAdd').on('click', function (e) {
            $('#Add').hide()
            $('#Upd').hide();
            $('#List').show();
        });

        $('#btnAdd').on('click', function (e) {
            //var Descr = $('#Descr_Add').val();
            //if (checkAdd(Descr) == false) {
            //    var req = $.DataAccess.Parking_Map_add(localStorage.getItem("IdImpianto"), localStorage.getItem("IdPark"), Descr);
            //    req.success(function (json) {
            //        var data = json.d;
            //        if (data == true) {
            //            loadMaps();
            //            $('#Add').hide()
            //            $('#Upd').hide();
            //            $('#List').show();
            //        }
            //        else {
            //            toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
            //        }
            //    });
            //}
            //else {
            //    toastr["warning"](langResources['msg4novaliddata'], langResources['alert']);
            //}
        });

        function checkAdd(Descr) {
            var retVal = false;
            var error_present = false;
            if (!error_present) {
                if (Descr == '') {
                    $('#MapDesc_Add').addClass("error");
                    error_present = true;
                }
            }
            retVal = error_present;
            return retVal;
        }
        /*-------------------------------------------------------*/

        /*
        Update
        ---------------------------------------------------------*/
        $.fn.callUpdate = function (MapId) {
            $('#List').hide();
            $('#Upd').hide();
            $('#Upd').show();
            $('#MapDesc_Upd').val('');
            $('#MapId_Upd').val(MapId);
            var r = $.DataAccess.hs_Maps_Read(MapId);
            r.success(function (json) {
                var data = json.d;
                if (data) {                    
                    $('#MapDesc_Upd').val(data.MapDesc);
                    $('#Descr_Delete').text(data.MapDesc);
                    //loadSynoptic(MapId);
                }
            });
        }

        $('#fileuploadUPD').bind('fileuploadsubmit', function (e, data) {
            data.formData = {
                Descr: $('#MapDesc_Upd').val().trim(),
                IdImpianto: localStorage.getItem("IdImpianto"),
                MapId: $('#MapId_Upd').val(),
                UserName: localStorage.getItem("OperatorName")
            };
        });


        $('#fileuploadUPD').fileupload({
            url: $.appParms.urlGlobal() + 'UphsMaps.ashx',
            dataType: 'json',
            acceptFileTypes: /(\.|\/)(svg)$/i,
            maxFileSize: 5000000, // 5 MB
            done: function (e, data) {
                $.each(data.result.files, function (index, file) {
                    //$('<p/>').text(file.name).appendTo('#files');
                });
            },
            progressall: function (e, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10);
                $('#progress .progress-bar').css(
                    'width',
                    progress + '%'
                );
            },
            success: function (json) {
                loadMaps();
                $('#Add').hide()
                $('#Upd').hide();
                $('#List').show();
            }
        }).prop('disabled', !$.support.fileInput)
         .parent().addClass($.support.fileInput ? undefined : 'disabled');

        $('#btnCloseUpd').on('click', function (e) {            
            $('#Add').hide()
            $('#Upd').hide();
            $('#List').show();
            $('#svg-main').html('');
        });

        $('#btnUpd').on('click', function (e) {
            var MapId = $('#MapId_Upd').val(),
                Descr = $('#MapDesc_Upd').val();

            if (checkUpd(Descr) == false) {
                var req = $.DataAccess.hs_Maps_Update(MapId, Descr, localStorage.getItem("OperatorName"));
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        loadMaps();
                        $('#Add').hide()
                        $('#Upd').hide();
                        $('#List').show();
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }
            else {
                toastr["warning"](langResources['msg4novaliddata'], langResources['alert']);
            }
        });

        function checkUpd(Descr) {
            var retVal = false;
            var error_present = false;
            if (!error_present) {
                if (Descr == '') {
                    $('#MapDesc_Upd').addClass("error");
                    error_present = true;
                }
            }
            retVal = error_present;
            return retVal;
        }

        function fixWebkitHeightBug() {
            var svgW = $('#svg2').attr("width");
            var svgH = $('#svg2').attr("height")
            var curSVGW = $('#svg-main').width();
            var newSVGH = heightInRatio(svgH, svgW, curSVGW);
            $('#svg-main').height(newSVGH);
            function heightInRatio(oH, oW, nW) {
                return (oH / oW * nW);
            }
        };

        $(window).resize(function () {
            fixWebkitHeightBug();
        });

        function loadSynoptic(MapId) {
            var map2load = $.appParms.urlGlobal()+'gethsMap.ashx?MapId=' + MapId;
            $('#svg-main').load(map2load, null, function () {
                $('#svg2').zoomPanTouchSVG({zoomBtnContainer: '#zoomBtnContainer'});
                fixWebkitHeightBug();
            });
        }
        /*-------------------------------------------------------*/

        /*
        Delete
        ----------------------------------------------------*/
        $('#btnDelete').on('click', function (e) {
            var MapId = $('#MapId_Upd').val();
            var req = $.DataAccess.hs_Maps_Del(MapId);
            req.success(function (json) {
                var data = json.d;
                if (data == true) {
                    loadMaps();
                    $('#Add').hide()
                    $('#Upd').hide();
                    $('#List').show();
                }
                else {
                    toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                }
            });

        });
        /*--------------------------------------------------*/

    }); //document ready

});

function callUpdate(MapId) {
    $.fn.callUpdate(MapId);
}
function callShowMap(MapId) {
    $.fn.callShowMap(MapId);
}
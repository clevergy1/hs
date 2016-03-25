/*
Impianti Operators Manage Parking Maps
------------------------------------------*/
$(function () {
    $(document).ready(function () {
       
        function ReadParking() {
            var req = $.DataAccess.Parking_Read(localStorage.getItem("IdImpianto"), localStorage.getItem("IdPark"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#ParkDescr").text(data.DesPark);
                }
            });
        }

        $('.tableMaps').footable();
        $('.tableMaps').data('page-size', 20);
        $('.tableMaps').data('limit-navigation', 4);
        $('.tableMaps').trigger('footable_initialized');
        function loadMaps() {
            $("#ListMaps").empty();
            var req = $.DataAccess.Parking_Map_List(localStorage.getItem("IdImpianto"), localStorage.getItem("IdPark"),false);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplListMaps").tmpl(data).appendTo("#ListMaps");
                    $('.tableMaps').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }

        ReadParking();
        loadMaps();        
        setlanguage();

        $('#btnClose').on('click', function (e) {
            $.module.load('Impianti/Operators/ManageParking');
        });

        /*
        Add
        ---------------------------------------------------------*/
        $('#btnCallAdd').on('click', function (e) {
            $('#List').hide();
            $('#Upd').hide();

            $('#Descr_Add').val('');

            $('.required').removeClass("error");
            $('#Add').show();
        });

        $('#btnCloseAdd').on('click', function (e) {
            $('#Add').hide()
            $('#Upd').hide();
            $('#List').show();
        });

        $('#btnAdd').on('click', function (e) {
            var Descr = $('#Descr_Add').val();         

            if (checkAdd( Descr ) == false) {
                var req = $.DataAccess.Parking_Map_add(localStorage.getItem("IdImpianto"), localStorage.getItem("IdPark"), Descr);
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

        function checkAdd( Descr) {
            var retVal = false;
            var error_present = false;
            if (!error_present) {
                if (Descr == '') {
                    $('#Descr_Add').addClass("error");
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
        $.fn.callUpdate = function (IdMap) {            
            $('#List').hide();
            $('#Add').hide();

            var req = $.DataAccess.Parking_Map_Read(localStorage.getItem("IdImpianto"), localStorage.getItem("IdPark"), IdMap);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#IdMap_Upd').val(data.IdMap);
                    $('#Descr_Upd').val(data.DesMap);                   

                    $('#fileupload').fileupload({
                        url: $.appParms.urlGlobal() + 'upParkingMap.ashx',
                        formData: { IdMap_Upd: $('#IdMap_Upd').val() },
                        dataType: 'json',
                        acceptFileTypes: /(\.|\/)(pdf)$/i,
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
                            var data = json.files;
                            if (data) {
                                if (data == true) {
                                    getMap();
                                }
                            }
                        }
                    }).prop('disabled', !$.support.fileInput)
                        .parent().addClass($.support.fileInput ? undefined : 'disabled');
                }
            });

            $('#Upd').show();
        }

        $('#btnCloseUpd').on('click', function (e) {
            $('#Add').hide()
            $('#Upd').hide();
            $('#List').show();
        });

        $('#btnUpd').on('click', function (e) {
            var IdMap = $('#IdMap_Upd').val(),
                Descr = $('#Descr_Upd').val();

            if (checkUpd( Descr) == false) {
                var req = $.DataAccess.Parking_Map_Update(localStorage.getItem("IdImpianto"), localStorage.getItem("IdPark"), IdMap, Descr);
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

        function checkUpd( Descr) {
            var retVal = false;
            var error_present = false;
            if (!error_present) {
                if (Descr == '') {
                    $('#Descr_Upd').addClass("error");
                    error_present = true;
                }
            }
            retVal = error_present;
            return retVal;
        }
        /*-------------------------------------------------------*/

        /*
        map masturbation
        ---------------------------------------------------------*/
        function getMap() {
            $('#svg-main').load($.appParms.urlGlobal() + 'getParkingMap.ashx?IdMap=' + $('#IdMap_Upd').val(), null, function () {
                fixWebkitHeightBug();
            });
        }

        $.fn.selMap = function (IdMap) {
            localStorage.setItem("IdMap", IdMap);
            $.module.load('Impianti/Operators/ParkingMap');
        }

        function fixWebkitHeightBug() {
            var svgW = $('#parkingmap').attr("width");
            var svgH = $('#parkingmap').attr("height")
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
        /*-------------------------------------------------------*/
    });
});
function callUpdate(IdMap) {
    $.fn.callUpdate(IdMap);
}
function selMap(IdMap) {
    $.fn.selMap(IdMap);
}
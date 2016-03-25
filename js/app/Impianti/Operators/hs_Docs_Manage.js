/*
Impianti operators manage Heating system document 
------------------------------------------*/
$(function () {

    $(document).ready(function () {
        /*
        Init
        ----------------------------------------------------------------*/
        $('.tableDocuments').footable();
        $('.tableDocuments').data('page-size', 20);
        $('.tableDocuments').data('limit-navigation', 4);
        $('.tableDocuments').trigger('footable_initialized');

        Readhs();
        loadDocuments();

        function Readhs() {
            var req = $.DataAccess.HeatingSystem_Read(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#hsDescr").text(data.Descr);
                }
            });
        }               

        function loadDocuments() {
            $("#ListDocuments").empty();
            var r = $.DataAccess.hs_Docs_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {                    
                    $("#tmplListDocuments").tmpl(data).appendTo("#ListDocuments");                   
                    setlanguage();
                }
            });
        }
        /*-------------------------------------------------------*/

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

        $('#fileuploadADD').bind('fileuploadsubmit', function (e, data) {
            data.formData = {
                Descr: $('#Descr_Add').val().trim(),
                hsId: localStorage.getItem("hsId"),
                IdDoc: 0,
                UserName: localStorage.getItem("OperatorName")
            };
        });


        $('#fileuploadADD').fileupload({
            url: $.appParms.urlGlobal() + 'UphsDocs.ashx',
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
                loadDocuments();
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
        $.fn.callUpdate = function (IdDoc) {
            $('#List').hide();
            $('#Upd').hide();
            $('#Upd').show();
            $('#Descr_Upd').val('');
            $('#IdDoc_Upd').val(IdDoc);
            var r = $.DataAccess.hs_Docs_Read(IdDoc);
            r.success(function (json) {
                var data = json.d;
                if (data) {                    
                    $('#Descr_Upd').val(data.DocName);
                    $('#Descr_Delete').text(data.DocName);
                }
            });
        }

        $('#fileuploadUPD').bind('fileuploadsubmit', function (e, data) {
            data.formData = {
                Descr: $('#Descr_Upd').val().trim(),
                hsId: localStorage.getItem("hsId"),
                IdDoc: $('#IdDoc_Upd').val(),
                UserName: localStorage.getItem("OperatorName")
            };
        });


        $('#fileuploadUPD').fileupload({
            url: $.appParms.urlGlobal() + 'UphsDocs.ashx',
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
                loadDocuments();
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
        });

        $('#btnUpd').on('click', function (e) {
            var IdDoc = $('#IdDoc_Upd').val(),
                Descr = $('#Descr_Upd').val();

            if (checkUpd(Descr) == false) {
                var req = $.DataAccess.hs_Docs_Update(IdDoc, Descr, localStorage.getItem("OperatorName"));
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        loadDocuments();
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
                    $('#Descr_Upd').addClass("error");
                    error_present = true;
                }
            }
            retVal = error_present;
            return retVal;
        }

        /*-------------------------------------------------------*/

        /*
        Delete
        ----------------------------------------------------*/
        $('#btnDelete').on('click', function (e) {
            var IdDoc = $('#IdDoc_Upd').val();
            var req = $.DataAccess.hs_Docs_Del(IdDoc);
            req.success(function (json) {
                var data = json.d;
                if (data == true) {
                    loadDocuments();
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

    });

});

function callUpdate(IdDoc) {
    $.fn.callUpdate(IdDoc);
}
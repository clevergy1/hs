
$(function () {

    $(document).ready(function () {
        loadhsElem();
             
       setlanguage();

        /*
        List
        ------------------------------------------------------------------------*/
        $('#selElement').on('focus', function () {
            $('#selElementModal').modal('show');
        });

        $('#elements2Select').on('tap click', 'li', function () {
            $('#selElement').val(this.id);
            loadErrorCodes(this.id);
            var listItem = $('#' + this.id)            
            var descr = $(listItem).find('[name=lbl]').text();
            $('#DescrSelectedElement').val(descr);
            $('#selElementModal').modal('hide');
        });

        function loadErrorCodes(elementCode) {
            $("#ListErrors").empty();
            var r = $.DataAccess.hs_ErrorCodes_List(elementCode);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplList").tmpl(data).appendTo("#ListErrors");
                    $('.tableErrorCodes').trigger('footable_redraw');
                    setlanguage();                   
                }
            });
            $('#btnCallAdd').show();
        }

        /*
        Add
        ------------------------------------------------------------------------*/
        $('#btnCloseAdd').on('click', function () {
            $('#Add').hide();
            $('#List').show();
        });

        $('#btnCallAdd').on('click', function () {
            $('#List').hide();
            $('#DivUpdate').hide();

            $('#DescrSelectedElement_Add').val($('#DescrSelectedElement').val());
            $('#elementCode_Add').val($('#selElement').val());
            $('#errorCode_Add').val('');
            $('#errorLevel_Add').val('');
            $('#DescrIT_Add').val('');
            $('#DescrEN_Add').val('');
            $('.required').removeClass("error");
            $('#Add').show();
        })

        $('#btnAdd').on('click', function () {            
            var elementCode = $('#elementCode_Add').val(),
                errorCode=$('#errorCode_Add').val(),
                errorLevel=$('#errorLevel_Add').val(),
                DescIT=$('#DescrIT_Add').val(),
                DescEN = $('#DescrEN_Add').val();
                      

            var r = $.DataAccess.hs_ErrorCodes_Read(elementCode, errorCode);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    toastr["warning"](langResources['msg4codepresent'], langResources['alert']);
                }
                else {
                    if (chkAdd() == false) {
                        var req = $.DataAccess.hs_ErrorCodes_Add(elementCode, errorCode, errorLevel, DescIT, DescEN);
                        req.success(function (json) {
                            var data = json.d;
                            if (data == true) {
                                loadErrorCodes($('#selElement').val());
                                $('#Add').hide();
                                $('#DivUpdate').hide();
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
                }
            });
        });

        function chkAdd() {
            var elementCode = $('#elementCode_Add').val(),
                errorCode = $('#errorCode_Add').val(),
                errorLevel = $('#errorLevel_Add').val(),
                DescIT = $('#DescrIT_Add').val(),
                DescEN = $('#DescrEN_Add').val();
            
            var retVal = false;
            var error_present = false;
            if (!error_present) {
                if (elementCode == '') {
                    $('#elementCode_Add').addClass("error");
                    error_present = true;
                }
            }
            if (!error_present) {
                if (errorCode == '') {
                    $('#errorCode_Add').addClass("error");
                    error_present = true;
                }
            }
            if (!error_present) {
                if (errorLevel == '') {
                    $('#errorLevel_Add').addClass("error");
                    error_present = true;
                }
            }
            if (!error_present) {
                if (DescIT == '') {
                    $('#DescrIT_Add').addClass("error");
                    error_present = true;
                    console.log('DescIT');
                }
            }
            if (!error_present) {
                if (DescEN == '') {
                    $('#DescrEN_Add').addClass("error");
                    error_present = true;
                }
            }
            retVal = error_present;
            return retVal;
        }

        /*
        Update
        ------------------------------------------------------------------------*/
        $('#btnCloseUpd').on('click', function () {
            $('#DivUpdate').hide();
            $('#List').show();
        });

        $.fncallUpdate = function (elementCode, errorCode) {
            $('#List').hide();
            $('#Add').hide();

            $('#DescrSelectedElement_Upd').val($('#DescrSelectedElement').val());
            $('#elementCode_Upd').val($('#selElement').val());
            $('#errorCode_Upd').val('');
            $('#errorLevel_Upd').val('');
            $('#DescrIT_Upd').val('');
            $('#DescrEN_Upd').val('');
            $('.required').removeClass("error");
            $('#DivUpdate').show();

            var r = $.DataAccess.hs_ErrorCodes_Read(elementCode, errorCode);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                   
                    $('#errorCode_Upd').val(data.errorCode);
                    $('#errorLevel_Upd').val(data.errorLevel);
                    $('#DescrIT_Upd').val(data.DescIT);
                    $('#DescrEN_Upd').val(data.DescEN);                    
                }
            });
        }

        $('#btnUpdate').on('click', function () {
            var elementCode = $('#elementCode_Upd').val(),
                errorCode = $('#errorCode_Upd').val(),
                errorLevel = $('#errorLevel_Upd').val(),
                DescIT = $('#DescrIT_Upd').val(),
                DescEN = $('#DescrEN_Upd').val();

            if (chkUpdate() == false) {
                var req = $.DataAccess.hs_ErrorCodes_Update(elementCode, errorCode, errorLevel, DescIT, DescEN);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        loadErrorCodes($('#selElement').val());
                        $('#Add').hide();
                        $('#DivUpdate').hide();
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

        function chkUpdate() {
            var elementCode = $('#elementCode_Upd').val(),
                errorCode = $('#errorCode_Upd').val(),
                errorLevel = $('#errorLevel_Upd').val(),
                DescIT = $('#DescrIT_Upd').val(),
                DescEN = $('#DescrEN_Upd').val();

            var retVal = false;
            var error_present = false;
            if (!error_present) {
                if (elementCode == '') {
                    $('#elementCode_Upd').addClass("error");
                    error_present = true;
                }
            }
            if (!error_present) {
                if (errorCode == '') {
                    $('#errorCode_Upd').addClass("error");
                    error_present = true;
                }
            }
            if (!error_present) {
                if (errorLevel == '') {
                    $('#errorLevel_Upd').addClass("error");
                    error_present = true;
                }
            }
            if (!error_present) {
                if (DescIT == '') {
                    $('#DescrIT_Upd').addClass("error");
                    error_present = true;
                    console.log('DescIT');
                }
            }
            if (!error_present) {
                if (DescEN == '') {
                    $('#DescrEN_Upd').addClass("error");
                    error_present = true;
                }
            }
            retVal = error_present;
            return retVal;
        }


        /**/
        function loadhsElem() {
            $("#elements2Select").empty();
            var r = $.DataAccess.tbhsElem_List();
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplElem").tmpl(data).appendTo("#elements2Select");
                    setlanguage();
                }
            });
        }

    }); //device ready

});

function callUpdate(elementCode, errorCode) {
    $.fncallUpdate(elementCode, errorCode);
}
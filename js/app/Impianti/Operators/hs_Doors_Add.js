/*
Impianti Operators Manage Heating System Doors Add
------------------------------------------*/
$(function () {

    $(document).ready(function () {
        $("#pageOperation").empty();
        $('#DoorCod_Add').val('');
        $('#Descr_Add').val('');
        $('#NoteInterne_Add').val('');
        $('#marcamodello_Add').val('');
        $('#installationDate_Add').val('');

        $('.dpd1').datepicker({
            format: 'dd/mm/yyyy',
            language: localStorage.getItem("CurrentLanguage"),
            orientation: "top left"
        });

        Readhs();
        setlanguage();

        function Readhs() {
            var req = $.DataAccess.HeatingSystem_Read(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#hsDescr").text(data.Descr);
                }
            });
        }

        $('#btnAdd').on('click', function (e) {
            var hsId = localStorage.getItem('hsId'),
                DoorCod = $('#DoorCod_Add').val().trim(),
                DoorDesc = $('#Descr_Add').val().trim(),
                marcamodello = $('#marcamodello_Add').val().trim(),
                installationDate = $('#installationDate_Add').val(),
                UserName = localStorage.getItem("OperatorName");

            if (chkAdd(hsId, DoorCod, DoorDesc) == true) {
                var req = $.DataAccess.hs_Doors_Add(hsId, DoorCod, DoorDesc, UserName, marcamodello, installationDate);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        $.module.load('Impianti/Operators/Device8Door');
                        loadhs_Elem(); //posta in common.js
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }
        }); //btnAdd


        function chkAdd(hsId, DoorCod, DoorDesc) {
            var retVal = false;
            var error_present = false;

            if (!error_present) {
                if (DoorDesc == '') {
                    error_present = true;
                    toastr["warning"](langResources['msg4descr'], langResources['alert']);
                }
            }

            if (!error_present) {
                var req = $.DataAccess.hs_Doors_ReadByDoorCodSync(hsId, DoorCod);
                req.success(function (json) {
                    var data = json.d;
                    if (data) {
                        if (data.DoorId > 0) {
                            error_present = true;
                            toastr["warning"](langResources['msg4codepresent'], langResources['alert']);
                        }
                    }
                });
            }

            retVal = !error_present;
            return retVal;
        } //chkAdd
    }); //document ready

});
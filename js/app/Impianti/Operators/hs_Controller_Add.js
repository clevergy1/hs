/*
Impianti Operators Manage Heating System Controller Add
------------------------------------------*/
$(function () {

    $(document).ready(function () {
        $("#pageOperation").empty();
        $('#Descr_Add').val('');
        $('#NoteInterne_Add').val('');

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
            var Descr = $('#Descr_Add').val().trim(),
                NoteInterne = $('#NoteInterne_Add').val().trim();

            if (chkAdd(Descr) == true) {
                var req = $.DataAccess.hs_Controller_Add(localStorage.getItem('hsId'), Descr, NoteInterne, localStorage.getItem("OperatorName"));
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        $.module.load('Impianti/Operators/Device8Controller');
                        loadhs_Elem(); //posta in common.js
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }
        }); //btnAdd


        function chkAdd(Descr) {
            var retVal = false;
            var error_present = false;

            if (!error_present) {
                if (Descr == '') {
                    error_present = true;
                    toastr["warning"](langResources['msg4descr'], langResources['alert']);
                }
            }
            retVal = !error_present;
            return retVal;
        } //chkAdd


    }); //document ready

});
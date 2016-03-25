/*
Impianti Operators Manage Heating System Note Add
------------------------------------------*/
$(function () {

    $(document).ready(function () {
        $("#pageOperation").empty();
        $('#CalCod_Add').val('');
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
                    $("#Note").text(data.Note);
                }
            });
        }

        $('#btnAdd').on('click', function (e) {
            var hsId = localStorage.getItem('hsId'),
                Note = $('#Note').val(),
                UserName = localStorage.getItem("OperatorName");

            var req = $.DataAccess.HeatingSystem_setNote(hsId, Note, UserName);
            req.success(function (json) {
                var data = json.d;
                if (data == true) {
                    $.module.load('Impianti/Operators/ManageDevice8');
                }
                else {
                    toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                }
            });
        }); //btnAdd

    }); //document ready

});
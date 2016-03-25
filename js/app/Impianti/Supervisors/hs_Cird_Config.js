
$(function () {

    $(document).ready(function () {
        var $elementCode;
        $("#pageOperation").empty();

        Readhs();
        //ReadCir();
        requestParam();

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
        
        function ReadCir() {
            var req = $.DataAccess.hs_Cird_Read(localStorage.getItem("CirId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $elementCode = data.Cod;                    
                    $("#Desc").text(data.Descr);
                    $('#backupWorkingMode').val(data.backupWorkingMode);                    
                    $('#DesbackupWorkingMode').val(data.backupWorkingMode);

                    //var mode0 = langResources['cirDworkingmode0'];
                    //console.log('mode0', mode0);
                    //var mode = '';

                    switch (data.backupWorkingMode) {
                        case 0:
                            $('#DesbackupWorkingMode').val(langResources['cirDworkingmode0']);
                            break;                            
                        case 1:
                            $('#DesbackupWorkingMode').val(langResources['cirDworkingmode1']);
                            break;
                        case 2:
                            $('#DesbackupWorkingMode').val(langResources['cirDworkingmode2']);
                            break;
                        case 3:
                            $('#DesbackupWorkingMode').val(langResources['cirDworkingmode3']);
                            break;
                    }
                }
            });
        }

        /*
        backup working mode
        -----------------------------------------------------------------*/
        function requestParam() {
            var r = $.DataAccess.hs_Cird_getBackupWorkingMode(localStorage.getItem("CirId"));
            r.success(function (json) {
                ReadCir();
            });
        }

        $('#DesbackupWorkingMode').on('focus', function (e) {
            Load_ul_backupWorkingMode();
            $("#ModalbackupWorkingMode").modal('show');
        });

        function Load_ul_backupWorkingMode() {
            $('#backupWorkingModeList').empty();
            var data = [];
            data.push({
                Id: 0,
                Descr: langResources['cirDworkingmode0']
            });
            data.push({
                Id: 1,
                Descr: langResources['cirDworkingmode1']
            });
            data.push({
                Id: 2,
                Descr: langResources['cirDworkingmode2']
            });
            data.push({
                Id: 3,
                Descr: langResources['cirDworkingmode3']
            });
            $("#tmplbackupWorkingModeList").tmpl(data).appendTo("#backupWorkingModeList");
        }

        $.fn.selbackupWorkingMode = function (Id, Descr) {
            $('#DesbackupWorkingMode').val(Descr);
            $('#backupWorkingMode').val(Id);
            $("#ModalbackupWorkingMode").modal('hide');
        }

        $('#btnUpd').on('click', function () {
            var backupWorkingMode = $('#backupWorkingMode').val();
            var req1 = $.DataAccess.hs_Cird_setBackupWorkingMode(localStorage.getItem("CirId"), backupWorkingMode)
            req1.success(function (json) {
                var data = json.d;
                if (data == true) {
                    toastr["success"](langResources['msg4operationok'], langResources['yes']);
                }
                else {
                    toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                }
            });
        });
        /*---------------------------------------------------------------*/

    }); //document ready

});

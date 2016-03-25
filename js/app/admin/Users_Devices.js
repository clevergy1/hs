/*
Admin Manage Users - User devices
-----------------------------------------------------------*/
$(function () {

    $(document).ready(function () {
       
        var UserId;
        var assignedDevices = [];

        $('.tableImpianti').footable();
        $('.tableImpianti').data('page-size', 20);
        $('.tableImpianti').data('limit-navigation', 4);
        $('.tableImpianti').trigger('footable_initialized');

        $('.tableUserImpianti').footable();
        $('.tableUserImpianti').data('page-size', 20);
        $('.tableUserImpianti').data('limit-navigation', 4);
        $('.tableUserImpianti').trigger('footable_initialized');

        $('.tableavailabedevices').footable();
        $('.tableavailabedevices').data('page-size', 20);
        $('.tableavailabedevices').data('limit-navigation', 4);
        $('.tableavailabedevices').trigger('footable_initialized');

        $('.tableassigneddevices').footable();
        $('.tableassigneddevices').data('page-size', 20);
        $('.tableassigneddevices').data('limit-navigation', 4);
        $('.tableassigneddevices').trigger('footable_initialized');

        var admin_currentUserName = '',
            admin_IdImpianto='';
        readDetail();
        setlanguage();
        //loadassignedDevices();
        //loadavailDevices();

        /* Impianto*/
        $('#ImpiantoSelected').on('focus', function (e) {
            loadImpianti('');
            $("#SelectImpiantoModal").modal('show');
        });
        $.fn.selImpianto = function (IdImpianto, DesImpianto) {
            admin_IdImpianto= IdImpianto;
            $('#ImpiantoSelected').val(DesImpianto);

            var r = $.DataAccess.Impianti_Users_Read(IdImpianto, UserId);
            r.success(function (json) {
                var r = json.d;
                if (r) {
                    console.log('lettura andata a buon fine');
                    loadassignedDevices();
                }
                else {
                    var req = $.DataAccess.Impianti_Users_Add(IdImpianto, UserId, false);
                    req.success(function (json) {
                        var data = json.d;
                        if (data == true) {
                            loadUserImpianti();
                            loadassignedDevices();
                        }
                        else {
                            toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                        }
                    });
                }
            });
            $("#SelectImpiantoModal").modal('hide');
        }
        
        function loadImpianti(searchString) {
            $("#ImpiantiList").empty();
            var r = $.DataAccess.Impianti_List(searchString);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplImpiantiList").tmpl(data).appendTo("#ImpiantiList");
                    $('.tableImpianti').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }
        /*--------------------------------------------------------------------------*/

        function readDetail() {
            admin_currentUserName = localStorage.getItem('UserName2Manage');
            var req = $.DataAccess.aspnetusers_GetUserByUserName(admin_currentUserName);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    UserId = data.UserId;
                    $('#userdetailUserName').text(data.UserName);
                    $('#userdetailComment').text(data.Comment);

                    loadUserImpianti();
                } //data
            });
        }

        function loadUserImpianti() {
            $("#UserImpiantiList").empty();
            var r = $.DataAccess.Impianti_Users_List(UserId);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmpltableUserImpianti").tmpl(data).appendTo("#UserImpiantiList");
                    $('.tableImpianti').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }

        function loadavailDevices() {
            $("#availabedevicesList").empty();
            var req = $.DataAccess.Impianti_FieldDevices_List(admin_IdImpianto);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    var avdev = [];
                    for (var i = 0; i < data.length; i++) {

                        console.log('loadavailDevices');
                        console.log(assignedDevices)

                        var devFound = false;
                        if (assignedDevices) {                            
                            for (var y = 0; y < assignedDevices.length; y++) {
                                if (assignedDevices[y].DevId == data[i].DevId) {
                                    devFound = true;
                                }
                            }
                        }


                        if (devFound == false) {
                            avdev.push({
                                'DevId': data[i].DevId,
                                'devDes': data[i].devDes
                            })
                        }
                        
                    }


                    $("#tmplavailabedevicesList").tmpl(avdev).appendTo("#availabedevicesList");
                    $('.tableavailabedevices').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }

        function loadassignedDevices() {
            $("#assigneddevicesList").empty();
            var req = $.DataAccess.Impianti_UserDevices_List(admin_IdImpianto, UserId);
            req.success(function (json) {
                assignedDevices = json.d;
                if (assignedDevices) {
                    $("#tmplassigneddevicesList").tmpl(assignedDevices).appendTo("#assigneddevicesList");
                    $('.tableassigneddevices').trigger('footable_redraw');
                    setlanguage();
                }

                loadavailDevices();
            });
        }

        /* add a device*/
        $.fn.selDev = function (DevId) {
            var req = $.DataAccess.Impianti_UserDevices_Add(admin_IdImpianto, UserId, DevId);
            req.success(function (json) {
                var data = json.d;
                if (data == true) {                    
                    loadassignedDevices();                  
                }
                else {
                    toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                }
            });
        }
        /*----------------------------------------------------------*/

        /* remove device */
        $.fnremoveDev = function (id) {
            var req = $.DataAccess.Impianti_UserDevices_Del(id);
            req.success(function (json) {
                var data = json.d;
                if (data == true) {
                    loadassignedDevices();                    
                }
                else {
                    toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                }
            });
        }

        /*-----------------------------------------------------------*/

        /*remove Impianto user*/
        $.fn.RemoveImpiantoUser = function (IdImpianto) {
            var req = $.DataAccess.Impianti_Users_Del(IdImpianto, UserId);
            req.success(function (json) {
                var data = json.d;
                if (data == true) {
                    loadassignedDevices();
                    loadUserImpianti();
                }
                else {
                    toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                }
            });
        }
        /*-----------------------------------------------------------*/

    }); //document ready

});
function selImpianto(IdImpianto, DesImpianto) {
    $.fn.selImpianto(IdImpianto, DesImpianto);
}
function RemoveImpiantoUser(IdImpianto) {
    $.fn.RemoveImpiantoUser(IdImpianto);
}
function selDev(DevId) {
    $.fn.selDev(DevId);
}
function removeDev(id) {
    $.fnremoveDev(id);
}
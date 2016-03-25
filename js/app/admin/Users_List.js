/*
Admin Manage Users - Users List
-----------------------------------------------------------*/
$(function () {

    $(document).ready(function () {
        var $ImpiantoSelect='';
        
        $('.tableUsers').footable();
        $('.tableUsers').data('page-size', 20);
        $('.tableUsers').data('limit-navigation', 4);
        $('.tableUsers').trigger('footable_initialized');

        $('.tableRoles').footable();
        $('.tableRoles').data('page-size', 20);
        $('.tableRoles').data('limit-navigation', 4);
        $('.tableRoles').trigger('footable_initialized');

        /*
        Init
        ----------------------------------------------------*/
        setlanguage();
        if (localStorage.getItem('CurrentRole')) {          
            loadUsers(localStorage.getItem('CurrentRole'));
            $('#roleSelected').val(localStorage.getItem('CurrentRole'));
        }
        /*--------------------------------------------------*/
   
        $('#roleSelected').on('focus', function (e) {
            loadRoles();
            $("#SelectRoleModal").modal('show');
        });
        
        function loadRoles() {
            $('#RolesList').empty();
            
            var req = $.DataAccess.aspnetroles_List();
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplRolesList").tmpl(data).appendTo("#RolesList");
                    $('.tableRoles').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }

        $.fn.selRole = function (roleName) {
            localStorage.setItem("CurrentRole", roleName);
            $('#roleSelected').val(roleName);
            loadUsers(roleName);
            $("#SelectRoleModal").modal('hide');
        }
        
        function loadUsers(roleName,searchString, IdImpianto) {
            $("#manageUsersList").empty();
            var r = $.DataAccess.aspnetusers_GetUsersByRoleName(roleName, searchString, IdImpianto);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplmanageUsersList").tmpl(data).appendTo("#manageUsersList");
                    $('.tableUsers').trigger('footable_redraw');
                    setlanguage();
                    if (roleName == 'Supervisors' || roleName == 'Maintainers') {
                        $('.userDevices').show();
                    }
                    else {
                        $('.userDevices').hide();
                    }
                }
            });
        }

        /*
        searchString
        --------------------------------------------------*/
        $('#searchString').on('keyup', function (e) {
            var filter = $(this).val();
            if (filter.length > 2) {
                loadUsers(localStorage.getItem("CurrentRole"), filter,'');
            }
            if (filter.length == 0) {
                loadUsers(localStorage.getItem("CurrentRole"), filter, '');
            }
        });
        
        $('#btnClearsearchString').on('click', function (e) {
            $('#searchString').val('');
            loadUsers(localStorage.getItem("CurrentRole"), '', '');
        });
        /*------------------------------------------------*/

        /* Impianto*/
        $('#searchImpianto').on('focus', function (e) {
            loadImpianti('');
            $("#SelectImpiantoModal").modal('show');
        });
        $.fn.selImpianto = function (IdImpianto, DesImpianto) {
            $ImpiantoSelect = IdImpianto;
            $('#searchImpianto').val(DesImpianto);

            loadUsers(localStorage.getItem("CurrentRole"), $('#searchString').val(), $ImpiantoSelect);
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

        $('#btnClearsearchImpianto').on('click', function (e) {            
            $ImpiantoSelect = '';
            $('#searchImpianto').val('');
            loadUsers(localStorage.getItem("CurrentRole"), $('#searchString').val(), '');
        });
        /*--------------------------------------------------------------------------*/

        $('#bntCallAddUser').on('click', function (e) {
            $.module.load('admin/Users_Add');
        });

        $.fn.updUser = function (UserName) {
            localStorage.setItem("UserName2Manage", UserName);
            $.module.load('admin/Users_Detail');
        }

        /*
        User Devices
        -------------------------------------------------*/
        $.fn.dev4user = function (UserName) {            
            localStorage.setItem("UserName2Manage", UserName);
            $.module.load('admin/Users_Devices.html');
        }
        /*-----------------------------------------------*/

    }); //document ready

});

function selRole(roleName) {
    $.fn.selRole(roleName);
}
function upduser(UserName) {
    $.fn.updUser(UserName);
}
function dev4user(UserName) {
    $.fn.dev4user(UserName);
}
function selImpianto(IdImpianto, DesImpianto) {
    $.fn.selImpianto(IdImpianto, DesImpianto);
}
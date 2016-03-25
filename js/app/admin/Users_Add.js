/*
Admin Manage Users - User Add
-----------------------------------------------------------*/
$(function () {
    $(document).ready(function () {
        $('.tableRoles').footable();
        $('.tableRoles').data('page-size', 20);
        $('.tableRoles').data('limit-navigation', 4);
        $('.tableRoles').trigger('footable_initialized');

        setlanguage();

        function checkEmail(email) {
            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!filter.test(email)) {
                return false;
            }
        }

        $('#SelRoleAdd').on('focus', function (e) {
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
            $('#SelRoleAdd').val(roleName);           
            $("#SelectRoleModal").modal('hide');
        }

        $('#bntAddUser').on('click', function (e) {
            var UserName = $('#UserName_Add').val().trim(),
                Password = $('#Password_Add').val().trim(),
                Password1 = $('#Password1_Add').val().trim(),
                UserEmail = $('#UserEmail_Add').val().trim(),
                UserComment = $('#UserComment_Add').val().trim(),
                UserRole = $('#SelRoleAdd').val();

            if (chkAdd(UserName, Password, Password1, UserEmail, UserComment, UserRole) == true) {
                var req = $.DataAccess.aspnetusers_AddUser(UserName, Password, UserRole, UserComment, UserEmail);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        $.module.load('admin/Users_List');
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

        function chkAdd(UserName, Password, Password1, UserEmail, UserComment, UserRole) {
            $('.mandatory').removeClass("error");
            var retVal = false;
            var error_present = false;

            if (!error_present) {
                if (UserName == '') {
                    error_present = true;
                    $('#UserName_Add').addClass("error");
                }
            }

            if (!error_present) {
                if (Password == '') {
                    error_present = true;
                    $('#Password_Add').addClass("error");
                }
            }

            if (!error_present) {
                if (Password != Password1) {
                    error_present = true;
                    $('#Password1_Add').addClass("error");
                }
            }

            if (!error_present) {
                if (checkEmail(UserEmail) == false) {
                    error_present = true;
                    $('#UserEmail_Add').addClass("error");
                }
            }

            if (!error_present) {
                if (UserRole == '') {
                    error_present = true;
                    $('#SelRoleAdd').addClass("error");
                }
            }

            retVal = !error_present;
            return retVal;
        }

    }); //document ready
});
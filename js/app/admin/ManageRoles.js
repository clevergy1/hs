/*
Amin manage roles
----------------------------------------------------------*/
$(function () {
    $(document).ready(function () {
        $currentRoleName = '';
        $currentRoleId = '';

        loadRoles();

        function loadRoles() {
            $('#roleList').empty();
            var req = $.DataAccess.aspnetroles_List();
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplroleList").tmpl(data).appendTo("#roleList");
                    setlanguage();
                }
            });
        }

        //Edit
        //========================================================//
        $.fn.updrole = function (RoleId, RoleName, countUser) {
            $currentRoleId = RoleId;
            $currentRoleName = RoleName;
            $('#RoleName_Edit').val($currentRoleName);
            $('#RoleNameToDelete').text($currentRoleName);

            $('#rowroleList').hide();

            if (countUser > 0) {
                $('#btnCallDeleteRole').hide();
            }
            else {
                $('#btnCallDeleteRole').show();
            }

            $('#rowroleedit').show();
        }

        $('.wcloserowroleedit').on('click', function (e) {
            $('#rowroleedit').hide();
            $('#rowroleList').show();
        });

        $('#bntEditRole').on('click', function (e) {
            var error_present = false;
            RoleName = $('#RoleName_Edit').val().trim();
            if (!error_present) {
                if (RoleName == '') {
                    error_present = true;
                    alert("Role name is empty", function () { },
                                           "Edit role",
                                           'OK');
                }
            }

            if (!error_present) {
                var req = $.DataAccess.aspnetroles_Update($currentRoleId, RoleName);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        $currentRoleName = RoleName;
                        $('#rowroleedit').hide();
                        loadRoles();
                        $('#rowroleList').show();
                    }
                    else {
                        alert("Operation failed!",
                            function () { },
                            "Edit role",
                            'OK');
                    }
                });
            }
        });
        //========================================================//

        //Add
        //========================================================//
        $('#btnCallAddRole').on('click', function (e) {
            $('#rowroleList').hide();
            $('#RoleName_Add').val('');
            $('#rowroleadd').show();
        });

        $('.wcloserowroleadd').on('click', function (e) {
            $('#rowroleadd').hide();
            $('#rowroleList').show();
        });

        $('#btnAddRole').on('click', function (e) {
            var error_present = false;
            RoleName = $('#RoleName_Add').val().trim();

            if (!error_present) {
                if (RoleName == '') {
                    error_present = true;
                    alert("Role name is empty", function () { },
                                           "Add role",
                                           'OK');
                }
            }

            if (!error_present) {
                var req = $.DataAccess.aspnetroles_Add(RoleName);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        $currentRoleName = RoleName;
                        $('#rowroleadd').hide();
                        loadRoles();
                        $('#rowroleList').show();
                    }
                    else {
                        alert("Operation failed!",
                            function () { },
                            "Add role",
                            'OK');
                    }
                });
            }
        });
        //========================================================//

        //del
        //========================================================//
        $('#btnDeleteRole').on('click', function (e) {
            RoleName = $('#RoleNameToDelete').text();
            var req = $.DataAccess.aspnetroles_Del(RoleName);
            req.success(function (json) {
                var data = json.d;
                if (data == true) {
                    $currentRoleName = '';
                    $('#rowroleedit').hide();
                    loadRoles();
                    $('#rowroleList').show();
                }
                else {
                    alert("Operation failed!",
                        function () { },
                        "Add role",
                        'OK');
                }
            });
        });
        //========================================================//

    });
});
function updrole(RoleId, RoleName, countUser) {
    $.fn.updrole(RoleId, RoleName, countUser);
}
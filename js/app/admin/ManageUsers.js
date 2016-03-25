/*
Admin Manage Users
-----------------------------------------------------------*/
$(function () {
    $(document).ready(function () {
        var admin_currentUserName = '';
        var userDetailLoaded = false;
        var $currentRole = '';
        var $currentUserP = '';


        var opt = {
            'date': {
                preset: 'date',
                dateOrder: 'd Dmmyy'
            },
            'datetime': {
                preset: 'datetime',
                minDate: new Date(2012, 3, 10, 9, 22),
                maxDate: new Date(2099, 12, 31, 23, 59),
                stepMinute: 15
            },
            'time': {
                preset: 'time',
                stepMinute: 15
            },
            'select': {
                preset: 'select'
            },
            'select-opt': {
                preset: 'select',
                group: true,
                width: 50
            }
        }
        $('#selRole').scroller('destroy');
        $('#selRole').mobiscroll().select({
            theme: 'ios7', //'ios7'
            display: 'bottom',
            mode: 'scroller',
            inputClass: 'i-txt',
            headerText: 'roles',
            label: '',
            width: 200
        });
        $('#SelRoleAdd').scroller('destroy');
        $('#SelRoleAdd').mobiscroll().select({
            theme: 'ios7', //'ios7'
            display: 'bottom',
            mode: 'scroller',
            inputClass: 'i-txt',
            headerText: 'roles',
            label: '',
            width: 200
        });

        $('.tableUsers').footable();
        $('.tableUsers').data('page-size', 20);
        $('.tableUsers').data('limit-navigation', 4);
        $('.tableUsers').trigger('footable_initialized');

        loadRoles();
        setlanguage();

        function formatDate(strDate) {
            var date = new Date(parseInt(strDate.substr(6)));
            var formattedIT = ("0" + date.getDate()).slice(-2) + "/" +
                  ("0" + (date.getMonth() + 1)).slice(-2) + "/" +
                  date.getFullYear() + " " +
                  ("0" + date.getHours()).slice(-2) + ":" +
                  ("0" + date.getMinutes()).slice(-2);
            return formattedIT;
        }

        function checkEmail(email) {
            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!filter.test(email)) {
                return false;
            }
        }

        function loadRoles() {
            $('#selRole').empty();
            $('#SelRoleAdd').empty();
            //var firstoptions = "";
            //firstoptions += '<option value="">select a role</options>';
            //$('#selRole').append(firstoptions);

            var req = $.DataAccess.aspnetroles_List();
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplRoleOption").tmpl(data).appendTo("#selRole");
                    $("#tmplRoleOption").tmpl(data).appendTo("#SelRoleAdd");

                    //for (var i = 0; i < data.length; i++) {
                    //    //------------------------------------------------------------                       
                    //    var options = "";
                    //    options += '<option value="' + data[i].RoleName + '">' + data[i].RoleName + '</option>';
                    //    $('#selRole').append(options);
                    //    $('#SelRoleAdd').append(options);
                    //    //------------------------------------------------------------
                    //} //end for
                }
            });
        }

        $('#selRole').on('change', function () {
            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;
            $currentRole = valueSelected;
            loadUsers($currentRole);
            $('#roleSelected').text($currentRole);
            $('#selRole_dummy').val($currentRole);
        });

        function loadUsers(roleName) {
            $("#manageUsersList").empty();
            var r = $.DataAccess.aspnetusers_GetUsersByRoleName(roleName);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplmanageUsersList").tmpl(data).appendTo("#manageUsersList");
                    $('table').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }

        $.fn.updUser = function (UserName) {
            userDetailLoaded = false;
            admin_currentUserName = UserName;
            $('#rowuserList').hide();

            var req = $.DataAccess.aspnetusers_GetUserByUserName(UserName);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#UserNameToDelete').text(data.UserName);
                    $('#userdetailUserName').text(data.UserName);
                    $('#userdetailEmail').text(data.Email);
                    $currentUserP = data.Password;
                    $('#userdetailComment').text(data.Comment);
                    $('#userdetailCreateDate').text(formatDate(data.CreateDate));
                    $('#userdetailLastLogin').text(formatDate(data.LastLoginDate));

                    $('#userUpdEmailAdmin').val(data.Email);
                    $('#userUpdCommentAdmin').val(data.Comment);
                    if (data.IsLockedOut == true) {
                        $('#userdetailIsLockedOut').val('on');
                        $('#userdetailIsLockedOut').prop('checked', true);
                        $('#userdetailIsLockedOut').bootstrapSwitch('setState', true);
                    }
                    else {
                        $('#userdetailIsLockedOut').val('off');
                        $('#userdetailIsLockedOut').prop('checked', false);
                        $('#userdetailIsLockedOut').bootstrapSwitch('setState', false);
                    }

                    if (data.IsApproved == true) {
                        $('#userdetailIsApproved').val('on');
                        $('#userdetailIsApproved').prop('checked', true);
                        $('#userdetailIsApproved').bootstrapSwitch('setState', true);
                    }
                    else {
                        $('#userdetailIsApproved').val('off');
                        $('#userdetailIsApproved').prop('checked', false);
                        $('#userdetailIsApproved').bootstrapSwitch('setState', false);
                    }
                    userDetailLoaded = true;
                } //data
            });
            $('#userdetailIsLockedOutresult').removeClass("operationOk");
            $('#userdetailIsLockedOutresult').removeClass("operationNok");
            $('#userdetailIsApprovedresult').removeClass("operationOk");
            $('#userdetailIsApprovedresult').removeClass("operationNok");
            $('#rowuserDetail').show();
        }

        //userdetailIsLockedOut change monitor
        $('#userdetailIsLockedOut').on('switchChange.bootstrapSwitch', function (event, state) {

            if (userDetailLoaded == true) {
                if (state.value == true) {
                    lockUser();
                }
                else {
                    unlockUser();
                }
            }
        });
        function lockUser() {
            var req = $.DataAccess.aspnetusers_lockUser(admin_currentUserName);
            req.success(function (json) {
                var data = json.d;
                if (data == true) {
                    //d="userdetailIsLockedOutresult" class=" operationOk "
                    $('#userdetailIsLockedOutresult').addClass("operationOk");
                }
                else {
                    $('#userdetailIsLockedOutresult').addClass("operationNok");
                }
            });
        }
        function unlockUser() {
            var req = $.DataAccess.aspnetusers_UnlockUser(admin_currentUserName);
            req.success(function (json) {
                var data = json.d;
                if (data == true) {
                    //d="userdetailIsLockedOutresult" class=" operationOk "
                    $('#userdetailIsLockedOutresult').addClass("operationOk");
                }
                else {
                    $('#userdetailIsLockedOutresult').addClass("operationNok");
                }
            });
        }

        //userdetailIsApproved  change monitor
        $('#userdetailIsApproved').on('switchChange.bootstrapSwitch', function (event, state) {

            if (userDetailLoaded == true) {
                if (state == true) {
                    approveUser();
                }
                else {
                    disapproveUser();
                }

            }
        });
        function approveUser() {
            var req = $.DataAccess.aspnetusers_approveUser(admin_currentUserName);
            req.success(function (json) {
                var data = json.d;
                if (data == true) {

                    $('#userdetailIsApprovedresult').addClass("operationOk");
                }
                else {
                    $('#userdetailIsApprovedresult').addClass("operationNok");
                }
            });
        }
        function disapproveUser() {
            var req = $.DataAccess.aspnetusers_disapproveUser(admin_currentUserName);
            req.success(function (json) {
                var data = json.d;
                if (data == true) {

                    $('#userdetailIsApprovedresult').addClass("operationOk");
                }
                else {
                    $('#userdetailIsApprovedresult').addClass("operationNok");
                }
            });
        }

        $('.wcloserowuserDetail').on('click', function (e) {
            loadUsers($currentRole);
            $('#rowuserList').show();
            $('#rowuserDetail').hide();
            $('#rowadduser').hide();
        });

        // Add User
        //==============================================================
        $('#btnCallAddUser').on('click', function (e) {
            $('#rowuserList').hide();
            $('#rowuserDetail').hide();

            $('#UserName_Add').val('');
            $('#Password_Add').val('');
            $('#Password1_Add').val('');
            $('#UserEmail_Add').val('');
            $('#UserComment_Add').val('');
            $('#SelRoleAdd_dummy').val('');
            $('#rowadduser').show();
        });

        $('.wcloserowadduser').on('click', function (e) {
            loadUsers($currentRole);
            $('#rowadduser').hide();
            $('#rowuserDetail').hide();
            $('#rowuserList').show();
        });

        $('#SelRoleAdd').on('change', function () {
            var optionSelected = $("option:selected", this);
            $('#SelRoleAdd_dummy').val(this.value);
        });

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
                        $currentRole = UserRole;
                        loadUsers($currentRole);
                        $('#roleSelected').text($currentRole);
                        $('#selRole_dummy').val($currentRole);
                        $('#rowuserList').show();
                        $('#rowadduser').hide();
                    }
                    else {
                        alert("Operation failed", function () { },
                                                   "Add user",
                                                   'OK');
                    }
                });
            }
        });

        function chkAdd(UserName, Password, Password1, UserEmail, UserComment, UserRole) {
            var retVal = false;
            var error_present = false;

            if (!error_present) {
                if (UserName == '') {
                    error_present = true;
                    alert("User name is empty", function () { },
                                           "Add user",
                                           'OK');
                }
            }

            if (!error_present) {
                if (Password == '') {
                    error_present = true;
                    alert("Password is empty", function () { },
                                           "Add user",
                                           'OK');
                }
            }

            if (!error_present) {
                if (Password != Password1) {
                    error_present = true;
                    alert("Passwords do not match", function () { },
                                           "Add user",
                                           'OK');
                }
            }

            if (!error_present) {
                if (checkEmail(UserEmail) == false) {
                    error_present = true;
                    alert("Insert a valid email address", function () { },
                                           "Add user",
                                           'OK');
                }
            }

            if (!error_present) {
                if (UserRole == '') {
                    error_present = true;
                    alert("Select a role for the user", function () { },
                                           "Add user",
                                           'OK');
                }
            }

            retVal = !error_present;
            return retVal;
        }
        //==============================================================

        //delete user
        //==============================================================
        $('#btnDeleteUser').on('click', function (e) {
            var req = $.DataAccess.aspnetusers_removeUser(admin_currentUserName);
            req.success(function (json) {
                var data = json.d;
                if (data == true) {
                    $('#rowuserDetail').hide();
                    loadUsers($currentRole);
                    $('#rowuserList').show();
                }
                else {
                    alert("Operation failed!",
                        function () { },
                        "Delete user",
                        'OK');
                }
            });
        });
        //==============================================================

        //update user
        //==============================================================
        $('#btnCallUpdateUser').on('click', function (e) {
            $('#rowuserDetail').hide();
            $('#rowupdateuser').show();
        });

        $('.wcloserowupdateuser').on('click', function (e) {
            $('#rowupdateuser').hide();
            $('#rowuserDetail').show();
        });

        $('#btnUpdateUser').on('click', function (e) {
            UserEmail = $('#userUpdEmailAdmin').val().trim(),
            UserComment = $('#userUpdCommentAdmin').val().trim();

            var error_present = false;

            if (!error_present) {
                if (checkEmail(UserEmail) == false) {
                    error_present = true;
                    alert("Insert a valid email address", function () { },
                                           "Add user",
                                           'OK');
                }
            }

            if (!error_present) {
                var req = $.DataAccess.aspnetusers_UpdUser(admin_currentUserName, UserComment, UserEmail);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        $('#rowupdateuser').hide();
                        loadUsers($currentRole);
                        $('#rowuserList').show();
                    }
                    else {
                        alert("Operation failed!",
                            function () { },
                            "Update user",
                            'OK');
                    }
                });
            }

        });
        //==============================================================

        //reset user password
        //==============================================================
        $('#btnCallResetUserPassword').on('click', function (e) {
            $('#rowuserDetail').hide();
            $('#resetNewPassword').val('');
            $('#resetNewPassword2').val('');
            $('#rowresetpassword').show();
        });

        $('.wcloserowresetpassword').on('click', function (e) {
            $('#rowuserDetail').show();
            $('#rowresetpassword').hide();
        });

        $('#btnResetPassword').on('click', function (e) {
            var error_present = false;

            Password = $('#resetNewPassword').val().trim(),
            Password1 = $('#resetNewPassword2').val().trim();

            if (!error_present) {
                if (Password == '') {
                    error_present = true;
                    alert("Password is empty", function () { },
                                           "Add user",
                                           'OK');
                }
            }

            if (!error_present) {
                if (Password != Password1) {
                    error_present = true;
                    alert("Passwords do not match", function () { },
                                           "Add user",
                                           'OK');
                }
            }

            if (!error_present) {
                var req = $.DataAccess.aspnetusers_changeUserPass(admin_currentUserName, $currentUserP, Password);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        $currentUserP = Password;
                        $('#rowuserDetail').show();
                        $('#rowresetpassword').hide();
                    }
                    else {
                        alert("Operation failed!",
                            function () { },
                            "Reset user password",
                            'OK');
                    }
                });
            }
        });
        //==============================================================
    });
});
function upduser(UserName) {
    $.fn.updUser(UserName);
}
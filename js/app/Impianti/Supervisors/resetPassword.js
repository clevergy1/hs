/*
Supervisor - reset password
-----------------------------------------------------------*/
$(function () {

    $(document).ready(function () {
        setlanguage();

        $('#btnResetPassword').on('click', function (e) {
            var error_present = false;

            var OldPassword=$('#oldPassword').val().trim(),
                Password = $('#resetNewPassword').val().trim(),
                Password1 = $('#resetNewPassword2').val().trim();

            if (!error_present) {
                if (OldPassword == '') {
                    error_present = true;
                    toastr["warning"](langResources['msg4emptypassword'], langResources['alert']);
                }
            }

            if (!error_present) {
                if (Password == '') {
                    error_present = true;
                    toastr["warning"](langResources['msg4emptypassword'], langResources['alert']);
                }
            }

            if (!error_present) {
                if (Password != Password1) {
                    error_present = true;
                    toastr["warning"](langResources['msg4unmatchpasswords'], langResources['alert']);
                }
            }

            if (!error_present) {
                var req = $.DataAccess.aspnetusers_changeUserPass(localStorage.getItem("SupervisorName"), OldPassword, Password);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        $.module.load('Impianti/Supervisors/List');
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }
        });

    });

});
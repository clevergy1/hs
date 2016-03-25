/*
Admin Manage Users - User update
-----------------------------------------------------------*/
$(function () {

    $(document).ready(function () {
        $('.tableImpianti').footable();
        $('.tableImpianti').data('page-size', 20);
        $('.tableImpianti').data('limit-navigation', 4);
        $('.tableImpianti').trigger('footable_initialized');


        var admin_currentUserName = '',
            oldIdImpianto='';

        readDetail();

        function readDetail() {
            admin_currentUserName = localStorage.getItem('UserName2Manage');
            var req = $.DataAccess.aspnetusers_GetUserByUserName(admin_currentUserName);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#UserId').val(data.UserId);
                    $('#userUpdEmailAdmin').val(data.Email);
                    $('#userUpdCommentAdmin').val(data.Comment);
                    $('#DesImpianto').val(data.DesImpianto);
                } //data
            });
        }



        //update user
        //==============================================================

        $('#btnUpdateUser').on('click', function (e) {
            UserEmail = $('#userUpdEmailAdmin').val().trim(),
            UserComment = $('#userUpdCommentAdmin').val().trim();

            var error_present = false;

            if (!error_present) {
                if (checkEmail(UserEmail) == false) {
                    error_present = true;
                    toastr["warning"](langResources['msg4notvalidemail'], langResources['alert']);
                }
            }

            if (!error_present) {
                var req = $.DataAccess.aspnetusers_UpdUser(admin_currentUserName, UserComment, UserEmail);
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
        });


        function checkEmail(email) {
            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!filter.test(email)) {
                return false;
            }
        }
        //==============================================================


    }); //document ready

});

function selImpianto(IdImpianto,DesImpianto) {
    $.fn.selImpianto(IdImpianto,DesImpianto);
}
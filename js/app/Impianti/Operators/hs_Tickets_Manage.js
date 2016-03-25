/*
Impianti Operators Manage Heating system tickets
------------------------------------------*/
$(function () {

    $(document).ready(function () {
        $("#pageOperation").empty();

        $('.dpd1').datepicker({
            format: 'dd/mm/yyyy',
            lang: 'it',
            language: localStorage.getItem("CurrentLanguage"),
            orientation: "top left"
        });

        Readhs();
        /*
        Tabella tabletickets
        -------------------------------------------------------------*/
        //$('.tabletickets').footable();
        //$('.tabletickets').data('page-size', 20);
        //$('.tabletickets').data('limit-navigation', 4);
        //$('.tabletickets').trigger('footable_initialized');

        var $Status = 1;

        if ($Status == 1) {
            loadTickets(localStorage.getItem("hsId"), 1, '');
            loadRequester();
            loadExecutor();
        }


        /*
        Ricerca e filtri
        ---------------------------------------------------------------*/

        $('#btnSearch').on('click', function (e) {
            filtro();
        });
        function filtro() {

            $Status = $('#TicketStatusSelected').val().trim();
            loadTickets(localStorage.getItem("hsId"), $Status, '');
            $('#TicketTitle_Upd').removeAttr('readonly');
            $('#Requester_Upd').removeAttr('readonly');
            $('#emailRequester_Upd').removeAttr('readonly');
            $('#DateRequest_Upd').removeAttr('readonly');
            $('#Description_Upd').removeAttr('readonly');
            $('#Executor_Upd').removeAttr('readonly');
            $('#emailExecutor_Upd').removeAttr('readonly');
            $('#DateExecution_Upd').removeAttr('readonly');
            $('#ExecutorComment_Upd').removeAttr('readonly');
            $('#TicketStatus_Upd').removeAttr('readonly');
            $('#DateExecution_Upd').css('display', 'block');
            //loadRequester();
            //loadExecutor();

        }

        function Readhs() {
            var req = $.DataAccess.HeatingSystem_Read(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#hsDescr").text(data.Descr);
                }
            });
        }



        /*SETTAGGIO RICHIEDENTI MAIL E DATEPICKER*/
        /*---------------------------------------------------------------*/
        function loadRequester() {

            var req = $.DataAccess.hs_Tickets_Requesters_List(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $(".tmplreq_sel").tmpl(data).appendTo(".req_sel");
                }
            });
        }

        function loadExecutor() {

            var req = $.DataAccess.hs_Tickets_Executors_List(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $(".tmplexe_sel").tmpl(data).appendTo(".exe_sel");
                }
            });
        }

        $('.req_sel').on('change', function () {
            $('#emailRequester_Upd').val('');
            var id_req = $('option:selected', this).attr('data-id');
            var req = $.DataAccess.hs_Tickets_Requesters_Read(id_req);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    //alert(data.emailaddress);
                    $('.mail_req').val(data.emailaddress);
                }
            });
        });

        $('.exe_sel').on('change', function () {
            $('#emailExecutor_Upd').val('');
            //alert($('option:selected', this).attr('data-id'));
            var id_exe = $('option:selected', this).attr('data-id');
            var req = $.DataAccess.hs_Tickets_Executors_Read(id_exe);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $('.mail_exe').val(data.emailaddress);
                }
            });
        });




        /*---------------------------------------------------------------*/

        /*
        List
        ------------------------------------------------------------*/
        function loadTickets(hsId, TicketStatus, searchString) {
            $("#Listickets").empty();
            var r = $.DataAccess.hs_Tickets_List(hsId, TicketStatus, searchString);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    console.log(data);

                    for (var i = 0; i < data.length; i++) {
                        data[i].DateExecution = moment(data[i].DateExecution).format('DD/MM/YYYY HH:mm');
                        data[i].DateRequest = moment(data[i].DateRequest).format('DD/MM/YYYY HH:mm');
                    }//end for

                    $("#tmplListickets").tmpl(data).appendTo("#Listickets");
                    $('.tabletickets').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }
        /*----------------------------------------------------------*/

        /*
        Add
        ------------------------------------------------------------*/
        $('#btnCloseAdd').on('click', function (e) {
            $('#UpdTicket').hide();
            $('#AddTicket').hide();
            $('#ListTicket').show();
            $('#SearchTicket').show();
        });

        $('#btnCallAdd').on('click', function (e) {
            $('#ListTicket').hide();
            $('#UpdTicket').hide();
            $('#SearchTicket').hide();



            $('#TicketTitle_Add').val('');
            $('#Requester_Add').val('');
            $('#emailRequester_Add').val('');
            // $('#DateRequest_Add').val('');
            $('#Description_Add').val('');
            $('#Executor_Add').val('');
            $('#emailExecutor_Add').val('');


            $('.required').removeClass("error");
            $('#AddTicket').show();
        });

        $('#btnAdd').on('click', function (e) {
            var TicketType = 0;


            var hsId = localStorage.getItem("hsId"),
                TicketTitle = $('#TicketTitle_Add').val().trim(),
                Requester = $('#Requester_Add').val().trim(),
                emailRequester = $('#emailRequester_Add').val().trim(),
                Description = $('#Description_Add').val().trim(),
                Executor = $('#Executor_Add').val().trim(),
                emailExecutor = $('#emailExecutor_Add').val().trim(),
                UserName = localStorage.getItem("SupervisorName");

            //var DateRequest = $('#DateRequest_Upd').val().trim();


            if (chkAdd(TicketTitle, Requester, emailRequester, Description, Executor, emailExecutor) == true) {
                var req = $.DataAccess.hs_Tickets_Add(hsId, TicketTitle, Requester, emailRequester, Description, Executor, emailExecutor, UserName, TicketType);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        console.log("riuscita");
                        $('#UpdTicket').hide();
                        $('#AddTicket').hide();
                        $('#ListTicket').show();
                        loadTickets(localStorage.getItem("hsId"), 1, '');

                    }
                    else {
                        console.log("fallita");
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }
            else {
                toastr["warning"](langResources['msg4novaliddata'], langResources['alert']);

            }
        });

        function chkAdd(TicketTitle, Requester, emailRequester, Description, Executor, emailExecutor) {
            var retVal = false;
            var error_present = false;
            if (!error_present) {
                if (TicketTitle == '') {
                    $('#TicketTitle_Add').addClass("error");
                    error_present = true;
                }
            }
            if (!error_present) {
                if (Requester == '') {
                    $('#Requester_Add').addClass("error");
                    error_present = true;
                }
            }
            if (!error_present) {
                if (emailRequester == '') {
                    $('#emailRequester_Add').addClass("error");
                    error_present = true;
                }
            }
            if (!error_present) {
                if (Description == '') {
                    $('#Description_Add').addClass("error");
                    error_present = true;
                }
            }
            if (!error_present) {
                if (Executor == '') {
                    $('#Executor_Add').addClass("error");
                    error_present = true;
                }
            }
            if (!error_present) {
                if (emailExecutor == '') {
                    $('#emailExecutor_Add').addClass("error");
                    error_present = true;
                }
            }
            retVal = !error_present;
            console.log('chkadd= ' + retVal);
            return retVal;
        }
        /*----------------------------------------------------------*/

        /*
        Update
        ------------------------------------------------------------*/
        $('#btnCloseUpd').on('click', function (e) {
            $('#UpdTicket').hide();
            $('#AddTicket').hide();
            $('#ListTicket').show();
            $('#SearchTicket').show();
        });

        $.fn.callUpdate = function (TicketId) {
            $('#ListTicket').hide();
            $('#AddTicket').hide();
            $('#SearchTicket').hide();



            $('#TicketId_Upd').val(0);
            $('#TicketTitle_Upd').val('');
            $('#Requester_Upd').val('');
            $('#emailRequester_Upd').val('');
            $('#DateRequest_Upd').val('');
            $('#Description_Upd').val('');
            $('#Executor_Upd').val('');
            $('#emailExecutor_Upd').val('');
            $('#DateExecution_Upd').val('');
            $('#ExecutorComment_Upd').val('');
            $('#TicketStatus_Upd').val('');

            $('.required').removeClass("error");

            var req = $.DataAccess.hs_Tickets_Read(TicketId);
            req.success(function (json) {
                var data = json.d;
                if (data) {


                    data.DateExecution = moment(data.DateExecution).format('DD/MM/YYYY HH:mm');
                    data.DateRequest = moment(data.DateRequest).format('DD/MM/YYYY HH:mm');

                    if (data.DateExecution == "01/01/1900 00:00") {
                        data.DateExecution = "";

                    }


                    if (data.TicketStatus == 1) {
                        $('#TicketTitle_Upd').attr('readonly', true);
                        $('#Requester_Upd').attr('readonly', true);
                        $('#emailRequester_Upd').attr('readonly', true);
                        $('#DateRequest_Upd').attr('readonly', true);
                        $('#DateExecution_Upd').css('display', 'none');
                        //$('#Executor_Upd').attr('readonly', true);
                        //$('#emailExecutor_Upd').attr('readonly', true);
                        //$("#TicketStatus_Upd option[value='1']").remove();
                    }


                    if (data.TicketStatus > 1) {
                        $('#TicketTitle_Upd').attr('readonly', true);
                        $('#Requester_Upd').attr('readonly', true);
                        $('#emailRequester_Upd').attr('readonly', true);
                        $('#DateRequest_Upd').attr('readonly', true);

                        $('#Executor_Upd').attr('readonly', true);
                        $('#emailExecutor_Upd').attr('readonly', true);
                        $("#TicketStatus_Upd option[value='1']").remove();
                    }

                    if (data.TicketStatus >= 5) {

                        $('#TicketTitle_Upd').attr('readonly', true);
                        $('#Requester_Upd').attr('readonly', true);
                        $('#emailRequester_Upd').attr('readonly', true);
                        $('#DateRequest_Upd').attr('readonly', true);
                        $('#Description_Upd').attr('readonly', true);
                        $('#Executor_Upd').attr('readonly', true);
                        $('#emailExecutor_Upd').attr('readonly', true);
                        $('#DateExecution_Upd').attr('readonly', true);
                        $('#ExecutorComment_Upd').attr('readonly', true);
                        $('#TicketStatus_Upd').attr('readonly', true);
                        $('#DateExecution_Upd').css('display', 'block');

                    }

                    if (data.TicketType == 1) {


                        $('#TicketTitle_Upd').attr('readonly', true);
                        $('#Requester_Upd').attr('readonly', true);
                        $('#emailRequester_Upd').attr('readonly', true);
                        $('#DateRequest_Upd').attr('readonly', true);
                        $('#Description_Upd').attr('readonly', true);
                        //$('#Executor_Upd').val(data.Executor);
                        //$('#emailExecutor_Upd').val(data.emailExecutor);
                        //$('#DateExecution_Upd').val(data.DateExecution);
                        //$('#ExecutorComment_Upd').val(data.ExecutorComment);
                        //$('#TicketStatus_Upd').val(data.TicketStatus);

                    }

                    $('#TicketId_Upd').val(data.TicketId);
                    $('#TicketTitle_Upd').val(data.TicketTitle);
                    $('#Requester_Upd').val(data.Requester);
                    $('#emailRequester_Upd').val(data.emailRequester);
                    $('#DateRequest_Upd').val(data.DateRequest);
                    $('#Description_Upd').val(data.Description);
                    $('#Executor_Upd').val(data.Executor);
                    $('#emailExecutor_Upd').val(data.emailExecutor);
                    $('#DateExecution_Upd').val(data.DateExecution);
                    $('#ExecutorComment_Upd').val(data.ExecutorComment);
                    $('#TicketStatus_Upd').val(data.TicketStatus);
                }
            });

            $('#UpdTicket').show();

        }

        $('#btnUpd').on('click', function (e) {
            var TicketId = $('#TicketId_Upd').val().trim(),
                 TicketTitle = $('#TicketTitle_Upd').val().trim(),
                 Requester = $('#Requester_Upd').val().trim(),
                 emailRequester = $('#emailRequester_Upd').val().trim(),
                 Description = $('#Description_Upd').val().trim(),
                 Executor = $('#Executor_Upd').val().trim(),
                 emailExecutor = $('#emailExecutor_Upd').val().trim(),
                 UserName = localStorage.getItem("OperatorName");

            var TicketStatus = $('#TicketStatus_Upd').val().trim();
            //var DateRequest = $('#DateRequest_Upd').val().trim();
            var DateExecution = $('#DateExecution_Upd').val().trim();
            var ExecutorComment = $('#ExecutorComment_Upd').val().trim();

            if (chkupd(TicketTitle, Requester, emailRequester, Description, Executor, emailExecutor) == true) {
                var req = $.DataAccess.hs_Tickets_Update(TicketId, TicketTitle, Requester, emailRequester, Description, Executor, emailExecutor, UserName);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        console.log("TicketId" + TicketId + "-----DateExecution" + DateExecution + "-----ExecutorComment" + ExecutorComment + "-----TicketStatus" + TicketStatus);
                        var req2 = $.DataAccess.hs_Tickets_ChangeStatus(TicketId, DateExecution, ExecutorComment, TicketStatus);
                        req.success(function (json) {
                            var data2 = json.d;
                            if (data2 == true) {
                                $('#UpdTicket').hide();
                                $('#AddTicket').hide();
                                $('#ListTicket').show();
                                $('#SearchTicket').show();
                                $('#TicketStatusSelected').val(TicketStatus)
                                loadTickets(localStorage.getItem("hsId"), TicketStatus, '');
                            }
                            else {
                                toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                            }
                        });
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

        function chkupd(TicketTitle, Requester, emailRequester, Description, Executor, emailExecutor) {
            var retVal = false;
            var error_present = false;
            if (!error_present) {
                if (TicketTitle == '') {
                    $('#TicketTitle_Upd').addClass("error");
                    error_present = true;
                }
            }
            if (!error_present) {
                if (Requester == '') {
                    $('#Requester_Upd').addClass("error");
                    error_present = true;
                }
            }
            if (!error_present) {
                if (emailRequester == '') {
                    $('#emailRequester_Upd').addClass("error");
                    error_present = true;
                }
            }
            if (!error_present) {
                if (Description == '') {
                    $('#Description_Upd').addClass("error");
                    error_present = true;
                }
            }
            if (!error_present) {
                if (Executor == '') {
                    $('#Executor_Upd').addClass("error");
                    error_present = true;
                }
            }
            if (!error_present) {
                if (emailExecutor == '') {
                    $('#emailExecutor_Upd').addClass("error");
                    error_present = true;
                }
            }
            retVal = !error_present;
            console.log('chkupd= ' + retVal);
            return retVal;
        }
        /*----------------------------------------------------------*/


        /*
        Delete
        -----------------------------------------------------------*/
        $('#btnDelete').on('click', function (e) {
            $('body').removeClass('modal-open');
            $("#DeleteModal").modal('hide');
            //var TicketStatus = $('#TicketStatus_Upd').val().trim();
            setTimeout(function () {
                var req = $.DataAccess.hs_Tickets_Del($('#TicketId_Upd').val());
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        $('#UpdTicket').hide();
                        $('#AddTicket').hide();
                        $('#ListTicket').show();
                        $('#SearchTicket').show();
                        //$('#TicketStatusSelected').val(TicketStatus)
                        loadTickets(localStorage.getItem("hsId"), $('#TicketStatusSelected').val(), '');
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }, 300);
        });
        /*----------------------------------------------------------*/

        /*TICKET PEOPLE--------------------------------------------*/

        $('#manage_people').on('click', function (e) {
            $.module.load('Impianti/operators/hs_Tickets_people');
        });

    });//document ready

});

function callUpdate(TicketId) {
    $.fn.callUpdate(TicketId);
}
$(function () {
    var langResources = new Array();
    //global functions
    //===========================================
    $(".make-switch input").bootstrapSwitch();

    $(document).ready(function () {
        $('#Admin-login').hide();
        $('#Operator-login').hide();
        $('#Supervisor-login').hide();

        clearStorage();

        if (!localStorage.getItem('CurrentLanguage')) {
            localStorage.setItem("CurrentLanguage", "en");
            langResources = $.languages.get()["en"];
        }
        else {
            langResources = $.languages.get()[localStorage.getItem("CurrentLanguage")];
        }

        setlanguage();
    });

    function clearStorage() {
        var CurrentLanguage='';
        if (localStorage.getItem('CurrentLanguage')) {
            CurrentLanguage = localStorage.getItem('CurrentLanguage');
        }

        localStorage.removeItem('keyA');
        localStorage.removeItem("admin-remember");

        localStorage.removeItem('keyO');
        localStorage.removeItem("operator-remember");

        localStorage.removeItem('keyS');
        localStorage.removeItem("supervisor-remember");

        localStorage.clear();

        if (CurrentLanguage != '') {
            localStorage.setItem('CurrentLanguage', CurrentLanguage);
        }
    }

    //lang
    //==========================================
    //langEn
    $('#langEn').on('click', function (e) {
        localStorage.setItem("CurrentLanguage", "en");
        //langResources = getLanguageResources()["en"];
        langResources = $.languages.get()["en"];
        setlanguage();
    });

    //langIt
    $('#langIt').on('click', function (e) {
        window.localStorage.setItem("CurrentLanguage", "it");
        //langResources = getLanguageResources()["it"];
        langResources = $.languages.get()["it"];
        setlanguage();
    });
    function setlanguage() {
        $("span[name='lbl']").each(function (i, elt) {
            try {
                $(elt).text(langResources[$(elt).attr("caption")]);
                if ($(elt).parent().attr('for')) {
                    var xxx = $(elt).parent().attr('for');
                    $('#' + xxx).attr('placeholder', $(elt).text());
                    //console.log(xxx);
                }

            }
            catch (err) {
                console.log(err);
            }
        });
    }
    //==========================================

   

    //administrator login
    //===========================================
    $('#btnAdmin').bind('click', function (e) {
        clearStorage();
        $('#Admin-login').show();
        $('#Operator-login').hide();
        $('#Supervisor-login').hide();
    });

    $('#adminlogin').bind('click', function (e) {
        AdminLogin(e);
    });

    function AdminLogin(e) {
        e.preventDefault();
        e.stopPropagation();
        var username = $('#admin-login-username').val().trim(),
            password = $('#admin-login-password').val().trim();

        if (username === "" || password === "") {
            alert("Both fields are required!",
                                            function () { },
                                            "Login failed",
                                            'OK');
        } else {

            var req = $.DataAccess.logA(username, password);
            req.success(function (json) {
                var data = json.d;
                if (data != '') {
                    localStorage.setItem("AdminName", username);
                    localStorage.setItem("keyA", data);
                    if ($('#admin-index-remember').bootstrapSwitch('state') == true) {
                        localStorage.setItem("admin-remember", true);
                    }
                    $('#admin-login-username').val('');
                    $('#admin-login-password').val('');
                    $.router.navigate('admin/main.html');

                }
                else {
                    alert("Invalid user or password",
                                                    function () { },
                                                    "Login failed",
                                                    'OK');
                }
            });
        }
    }
    //===========================================


    //operator login
    //===========================================
    $('#btnOperator').bind('click', function (e) {
        clearStorage();
        $('#Admin-login').hide();
        $('#Operator-login').show();
        $('#Supervisor-login').hide();
    });

    $('#operatorlogin').bind('click', function (e) {
        OperatorLogin(e);
    });

    function OperatorLogin(e) {
        e.preventDefault();
        e.stopPropagation();
        var username = $('#operator-login-username').val().trim(),
            password = $('#operator-login-password').val().trim();

        if (username === "" || password === "") {
            alert("Both fields are required!",
                                            function () { },
                                            "Login failed",
                                            'OK');
        } else {
            var req = $.DataAccess.logO(username, password);
            req.success(function (json) {
                var data = json.d;
                if (data != '') {
                    localStorage.setItem("OperatorName", username);
                    localStorage.setItem("keyO", data);
                    if ($('#operator-index-remember').bootstrapSwitch('state') == true) {
                        localStorage.setItem("operator-remember", true);
                    }

                    $('#operator-login-username').val('');
                    $('#operator-login-password').val('');                    
                    $.router.navigate('operators/main.html');

                }
                else {
                    alert("Invalid user or password",
                                                    function () { },
                                                    "Login failed",
                                                    'OK');
                }
            });

        }
    }
    //===========================================

    //Supervisor login
    //===========================================
    $('#btnSupervisor').bind('click', function (e) {
        clearStorage();
        $('#Admin-login').hide();
        $('#Operator-login').hide();
        $('#Supervisor-login').show();
    });

    $('#supervisorlogin').bind('click', function (e) {
        SupervisorLogin(e);
    });

    function SupervisorLogin(e) {
        e.preventDefault();
        e.stopPropagation();
        var username = $('#supervisor-login-username').val().trim(),
            password = $('#supervisor-login-password').val().trim();

        if (username === "" || password === "") {
            alert("Both fields are required!",
                                            function () { },
                                            "Login failed",
                                            'OK');
        } else {
            var req = $.DataAccess.logS(username, password);
            req.success(function (json) {
                var data = json.d;
                if (data != '') {
                    localStorage.setItem("SupervisorName", username);
                    localStorage.setItem("keyS", data);
                    if ($('#supervisor-index-remember').bootstrapSwitch('state') == true) {
                        localStorage.setItem("supervisor-remember", true);
                    }

                    $('#supervisor-login-username').val('');
                    $('#supervisor-login-password').val('');
                    $.router.navigate('supervisors/main.html');

                }
                else {
                    alert("Invalid user or password",
                                                    function () { },
                                                    "Login failed",
                                                    'OK');
                }
            });

        }
    }
    //===========================================
});

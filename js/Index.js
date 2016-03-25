$(function () {

    $(document).ready(function () {

        //if ($.QueryString["IdImpianto"]) { console.log('IdImpianto', $.QueryString["IdImpianto"]); } else { console.log('ciccia IdImpianto'); }
        //if ($.QueryString["SupervisorName"]) { console.log('SupervisorName', $.QueryString["SupervisorName"]); } else { console.log('ciccia SupervisorName'); }
        //if ($.QueryString["CurrentLanguage"]) { console.log('CurrentLanguage', $.QueryString["CurrentLanguage"]); } else { console.log('ciccia CurrentLanguage'); }
        //if ($.QueryString["keyS"]) { console.log('keys', $.QueryString["keyS"]); } else { console.log('ciccia keys'); }

        $.rt.load();
        if ($.QueryString["IdImpianto"]) {
            localStorage.clear();
            localStorage.setItem("IdImpianto", $.QueryString["IdImpianto"]);
            localStorage.setItem("baseUrl", $.QueryString["baseUrl"]);
            localStorage.setItem("parentUrl", $.QueryString["parentUrl"]);
            if ($.QueryString["keyO"]) {
                localStorage.setItem("keyO", $.QueryString["keyO"]);
                if ($.QueryString["OperatorName"]) {
                    localStorage.setItem("OperatorName", $.QueryString["OperatorName"]);
                }
                //else {
                //    var r = $.DataAccess.aspnetusers_getUserO($.QueryString["keyO"]);
                //    r.success(function (json) {
                //        var data = json.d;
                //        if (data != '') {
                //            localStorage.setItem("OperatorName", data);
                //        }
                //        else {
                //            localStorage.removeItem("keyO");
                //        }
                //    });
                //}
            }

            if ($.QueryString["keyS"]) {
                localStorage.setItem("keyS", $.QueryString["keyS"]);
                if ($.QueryString["SupervisorName"]) {
                    localStorage.setItem("SupervisorName", $.QueryString["SupervisorName"]);
                }
                //else {
                //    var r = $.DataAccess.aspnetusers_getUserS($.QueryString["keyS"]);
                //    r.success(function (json) {
                //        var data = json.d;
                //        if (data != '') {
                //            localStorage.setItem("SupervisorName", data);
                //        }
                //        else {
                //            localStorage.removeItem("keyS");
                //        }
                //    });

                //}
            }
            localStorage.setItem("CurrentLanguage", $.QueryString["CurrentLanguage"]);
            $(location).attr('href', 'Index.html');
        }

        var whereigo = '';
        if (localStorage.getItem('keyO')) {
            var r = $.DataAccess.aspnetusers_getUserS(localStorage.getItem('keyO'));
            r.success(function (json) {
                var data = json.d;
                if (data != '') {
                    localStorage.setItem("OperatorName", data);
                }
            });
            whereigo = 'Operators/main.html';
        }
        if (localStorage.getItem('keyS')) {
            var r = $.DataAccess.aspnetusers_getUserS(localStorage.getItem('keyS'));
            r.success(function (json) {
                var data = json.d;
                if (data != '') {
                    localStorage.setItem("SupervisorName", data);
                }
             });
            whereigo = 'supervisors/main.html';
        }

        console.log('whereigo='+ whereigo);
        if (whereigo == '') {
            var url = $.appParms.urlRoot();
            $(location).attr('href', url);
        }
        else {
            $.router.navigate(whereigo);
        }

    });

});
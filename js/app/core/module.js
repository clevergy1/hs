(function ($) {
    $.module = (function (my) {
        var $init = false;
        var js;
        var $currentModule = '';

        my.load = function (module) { 
            //console.log("module=" + module);
            if (module != $currentModule) {
                $currentModule = module;

                //if (js) {
                //    try {
                //        (document.getElementsByTagName('body')[0]).removeChild(js);
                //    }
                //    catch (err) {
                //        console.log(err);
                //    }
                //}

                $('.modal').remove();
                ////$.rt.unload();

                var module2load = '';
                if (module.search('.htm') > 0) {
                    module2load = module;
                }
                else {
                    module2load = module + '.html';
                }
                d = new Date();

                $("body").addClass("loading");

                $("#module").load('modules/' + module2load + "?d=" + d.getTime(), function (response, status, xhr) {
                    if (status == "success") {
                        //js = document.createElement('script');
                        //js.type = 'text/javascript';
                        //js.async = false;
                        //js.src = 'js/app/' + module + '.js';
                        //(document.getElementsByTagName('body')[0]).appendChild(js);
                        if (!$init) {
                            $init = true;
                            init();
                        }
                        initcollapsepanel();
                        $('.isNumeric').autoNumeric('init');
                        $(".make-switch input").bootstrapSwitch();
                        ////$.rt.load();
                    }


                    if (status == "error") {
                        $("#module").load('modules/404.html');
                    }

                    $("body").removeClass("loading");
                });
            }
        };
        
        return my;
    })({});

    })(jQuery);
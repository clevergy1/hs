(function ($) {
    $.router = (function (my) {

        my.navigate = function (module) {
            var hashPos = module.indexOf('#');
            if (hashPos > 0) {
                var hash = module.substr(hashPos);
                window.location.hash = hash;
            }
            d = new Date();
            $("body").load('routes/' + module + "?d=" + d.getTime(), function (response, status, xhr) {
                if (status == "success") {
                    $(this).trigger('create');                    
                }
                if (status == "error") {
                    $("body").load('modules/404.html');
                    //var msg = "Sorry but there was an error: ";
                    //alert(msg + xhr.status + " " + xhr.statusText);
                }
                $("body").append('<div class="plizwait"></div>');
            });
        };

        return my;
    })({});
})(jQuery)
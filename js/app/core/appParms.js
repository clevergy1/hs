(function ($) {

    $.appParms = (function (my) {
        var _urlRoot = 'http://clevergylab.clevergy.it/cyrcs/';
        var _urlserver = 'http://clevergylab.clevergy.it/';
        var _urlGlobal = 'http://clevergylab.clevergy.it/cyassrv/';
        var _urlBase = "http://clevergylab.clevergy.it/cyassrv/s1.svc/";
        var _urlHub = 'http://clevergylab.clevergy.it/cyassrv/signalr/hubs/';
        var _rdp = "http://clevergylab.clevergy.it/cyassrv/rdp.ashx";

        //var _urlRoot = 'http://clevergylab2.clevergy.it/cyrcs/';
        //var _urlserver = 'http://clevergylab2.clevergy.it/';
        //var _urlGlobal = 'http://clevergylab2.clevergy.it/cyassrv/';
        //var _urlBase = "http://clevergylab2.clevergy.it/cyassrv/s1.svc/";
        //var _urlHub = 'http://clevergylab2.clevergy.it/cyassrv/signalr/hubs/';
        //var _rdp = "http://clevergylab2.clevergy.it/cyassrv/rdp.ashx";

        //var _urlRoot = 'http://pc-maf.clevergy.it/cyrcs/';
        //var _urlserver = 'http://pc-maf.clevergy.it/';
        //var _urlGlobal = 'http://pc-maf.clevergy.it/cyassrv/';
        //var _urlBase = "http://pc-maf.clevergy.it/cyassrv/s1.svc/";
        //var _urlHub = 'http://pc-maf.clevergy.it/cyassrv/signalr/hubs/';
        //var _rdp = "http://pc-maf.clevergy.it/cyassrv/rdp.ashx";

        //var _urlRoot = 'http://localhost:51680/cyrcs/';
        //var _urlserver = 'http://localhost:51680/';
        //var _urlGlobal = 'http://localhost:51680/';
        //var _urlBase = "http://localhost:51680/s1.svc/";
        //var _urlHub = 'http://localhost:51680/signalr/hubs/';
        //var _rdp = "http://localhost:51680/rdp.ashx";
        
        
     
               
        var _key = '7061737323313233';
        var _iv = '7061737323313233';

        my.urlRoot = function () {
            return _urlRoot;
        };
        my.urlserver = function () {
            return _urlserver;
        };
        my.urlBase = function () {
            return _urlBase;
        };
        my.urlHub = function () {
            return _urlHub;
        };
        my.urlGlobal = function () {
            return _urlGlobal;
        }
        my.rdp = function () {
            return _rdp;
        };
        my.key = function () {
            return _key;
        };
        my.iv = function () {
            return _iv;
        };
        my.getTime = function () {
            return new Date().getTime();
        };
        return my;
    })({});

})(jQuery)

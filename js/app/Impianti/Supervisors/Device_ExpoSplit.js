
$(function () {

    $(document).ready(function () {

        /*
        signalR
        ----------------------------------------------*/
        $.fn.received_Expo_Split_setStatus = function (hsId, Cod, stato) {
            if (localStorage.getItem("hsId") == hsId) {
                statusChanged('#stato_' + Cod, stato);
                
            }
        }
        $.fn.received_Expo_Split_changed = function (hsId, Cod) {
            //console.log("received_Expo_Split_changed cod= " + Cod);
            if (localStorage.getItem("hsId") == hsId) {
                ReadExpo_Split(Cod);
            }
        }
        /**/
        function statusChanged(elem, stato) {
            if (stato == 0) {
                $(elem).html('<i class="fa fa-thumbs-o-up"></i>');
            }
            else {
                if (stato == 1) {
                    $(elem).html('<img src="images/status1.png" style="height:24px;width:24px" />');
                }
                else {
                    $(elem).html('<img src="images/status2.png" style="height:24px;width:24px" />');
                }
            }
        }
        /**/

        $.fn.received_cymt200_changed = function (hsId, Cod) {
            if ((localStorage.getItem("hsId") == hsId) && Cod == 'SA06') {
                //console.log("received_cymt200_changed cod= " + Cod);
                readAnzcymt200(Cod);
            }
        }
        /*--------------------------------------------*/

        Readhs();
        ReadExpo_Split();        
        setlanguage();

        function Readhs() {
            $("#ListPlants").empty();
            var req = $.DataAccess.HeatingSystem_Read(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#hsDescr").text(data.DesImpianto + ' ' + data.Descr);
                }
            });
        }
        
        function ReadExpo_Split() {
            $("#ExpoSplit").empty();
            $("#ExpoSplit").children().remove();
            var r = $.DataAccess.Expo_Split_Read(1);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#ExpoSplit").empty();
                    $("#ExpoSplit").children().remove();
                    $("#tmplExpoSplit").tmpl(data).appendTo("#ExpoSplit");                    
                    setlanguage();
                    readAnzcymt200('SA06');
                    if (data.IsOff == true) { $('.Only4On').hide(); } else { $('.Only4On').show(); }
                }
            });
        }

        function readAnzcymt200(Cod) {
            var r = $.DataAccess.cymt200_ReadByCod(localStorage.getItem("hsId"), Cod);
            r.success(function (json) {
                var data = json.d;
                if (data) {                    
                    $('#CurrentTemp_1' ).text(Number(data.Temperature).toLocaleString());
                }
            });
        }

        /*
        Split Commands
        ----------------------------------------------------*/
        $.fn.setOff = function (IsOn) {
            var r = $.DataAccess.Expo_Split_setOFF(1);
            r.success(function (json) {
                var data = json.d;
                if (data == true) { ReadExpo_Split();}
            });
        }

        $.fn.setTemp = function (TargetTemp) {
            var r = $.DataAccess.Expo_Split_setTemp(1, TargetTemp);
            r.success(function (json) {
                var data = json.d;
                if (data == true) { ReadExpo_Split(); }
            });
        }

        $.fn.setMode = function (OperationalMode) {
            var r = $.DataAccess.Expo_Split_setMode(1, OperationalMode);
            r.success(function (json) {
                var data = json.d;
                if (data == true) { ReadExpo_Split(); }
            });
        }

        $.fn.setFan = function (FanSpeed) {
            var r = $.DataAccess.Expo_Split_setFan(1, FanSpeed);
            r.success(function (json) {
                var data = json.d;
                if (data == true) { ReadExpo_Split(); }
            });
        }

        $.fn.setSwingMode = function (SwingMode) {
            var r = $.DataAccess.Expo_Split_setSwingMode(1, SwingMode);
            r.success(function (json) {
                var data = json.d;
                if (data == true) { ReadExpo_Split(); }
            });
        }
        /*--------------------------------------------------*/


        /*
        Error codes
        ------------------------------------------------------------------------*/
        var $errorRowNumber0;
        $.fn.callErrorLog = function (Cod) {
            $errorRowNumber = 0
            //$('#Cod').text(Cod);
            $("#ListErrorLog").empty();
            loadErrorLog();
            $('#Errors').show();
        }
        $('#closeErrors').on('click', function () {
            $('#Errors').hide();
        });

        function loadErrorLog() {
            var req = $.DataAccess.hs_ErrorLog_ListByElement(localStorage.getItem("hsId"), 'EXPO_SPLIT', $errorRowNumber);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplListErrorLog").tmpl(data).appendTo("#ListErrorLog");
                    if (data.length > 99) {
                        var o = [{ id: $errorRowNumber }];
                        $("#tmplListErrorLogLastItem").tmpl(o).appendTo("#ListErrorLog");
                        $errorRowNumber = $errorRowNumber + 100;
                    }
                }
            });
        }

        $('#panel-body-ListErrorLog').scroll(function (e) {
            if (e) {
                e.stopPropagation();
                e.preventDefault();
            }
            if ($('#loadMore').length) {
                try {
                    //console.log("'$('#loadMore').offset().top=" + $('#loadMore').offset().top);
                    if ($(window).scrollTop() + $(window).height() >= $('#loadMore').offset().top) {
                        $('#loadMore').remove();
                        loadErrorLog();
                    }
                }
                catch (err) {
                    console.log(err);
                }
            }

        });
        /*----------------------------------------------------------------------*/
    }); //document ready

});
function CallShowErrorLog(Cod) { $.fn.callErrorLog(Cod); }
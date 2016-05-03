/*
Pagina dettaglio dei lux dall ambiente in cui si trovano
------------------------------------------*/
$(function () {

    $(document).ready(function () {
        $.rt.stop();

        //$('#usermenu').empty();
        //$('#ApplicationTitle').html('<span name="lbl" caption="currentInstallations">Current installations</span>');
        //$("#pageOperation").empty();
        //$("#tmplpageOperation").tmpl(null).appendTo("#pageOperation");

        //is online è la vpn o meglio se il plc comunica ogni 5 minuti.
        //in enable è manutenzione si o no





        /*
        Tabella impianti
        -------------------------------------------------------------*/

        //loadHs();
        loadlux();


        $('#btnCallAdd').on('click', function () {
            $.module.load('Impianti/Operators/Add');
        });

        $('#btnClose').on('click', function (e) {
            //pulisco il localstorage?
            $.module.load('impianti/supervisors/Device8AmbDetail');
        });


        function loadHs() {
            //console.log("loadImpianti");
            $("#ambiente_list").empty();
            var r = $.DataAccess.Ambienti_Read(localStorage.hsId, localStorage.IdAmbiente);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    console.log("AMBIENTE", data);

                    $("#tmplImpiantiList").tmpl(data).appendTo("#ambiente_list");

                    setlanguage();
                }
            });
        }

        function loadlux() {
            //console.log("loadImpianti");
            $("#lux_list").empty();
            var r = $.DataAccess.Lux_Read(localStorage.LuxId);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    console.log("LUX", data);
                    $("#tmplLuxList").tmpl(data).appendTo("#lux_list");

                    if (data.CurrentMode == 0 || data.CurrentMode == 1) {

                        $("#manuale").addClass("opacita");
                        $("#automatico").addClass("opacita_mezza");
                        $("#schedulato").addClass("opacita_mezza");

                    } else if (data.CurrentMode == 2) {
                        $("#manuale").addClass("opacita_mezza");
                        $("#automatico").addClass("opacita_mezza");
                        $("#schedulato").addClass("opacita");




                    } else if (data.CurrentMode == 3) {
                        $("#manuale").addClass("opacita_mezza");
                        $("#schedulato").addClass("opacita_mezza");
                        $("#automatico").addClass("opacita");
                    }



                    setlanguage();
                }
            });
        }

        /*FUNZIONI SULl'OVER DEI MODI E SUL CLICK*/

        /*  $('#lux').on('click', '#manuale', function () {
              $(this).toggleClass("backgLux");
          });
          $('#lux').on('click','#automatico', function () {
              $(this).toggleClass("backgLux");
          });
          $('#lux').on('click','#schedulato', function () {
              $(this).toggleClass("backgLux");
          });*/



        $('#lux').on('mouseenter mouseleave', '#manuale', function () {
            if ($(this).hasClass("opacita")) {
                console.log("Lux in manuale");
            } else {
                $(this).toggleClass("opacita_mezza");
            }
        });
        $('#lux').on('mouseenter mouseleave', '#automatico', function () {
            if ($(this).hasClass("opacita")) {
                console.log("Lux in automatico");
            } else {
                $(this).toggleClass("opacita_mezza");
            }
        });
        $('#lux').on('mouseenter mouseleave', '#schedulato', function () {
            if ($(this).hasClass("opacita")) {
                console.log("Lux in schedulato");
            } else {
                $(this).toggleClass("opacita_mezza");
            }
        });



        /*
        CONTROLLI DEI LUX ACCESI SPENTI E RESTORE WORKING MODE*/

        $.fn.RestoreWorkingMode = function (Id) {
            var req = $.DataAccess.Lux_cmd_RestoreWorkingMode(Id);
            req.success(function (json) {
                var data = json.d;
                if (data == true) {
                    toastr["success"](langResources['msg4operationok'], "success");
                    loadlux();
                }
            });
        }

        $.fn.execCmd = function (Id, LightON) {
            var req = $.DataAccess.Lux_Read(Id);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    if (data.LightON) {
                        console.log('la luce risulta accesa. Spengo');
                        LightOff(Id);
                    }
                    else {
                        console.log('la luce risulta spenta. Accendo');
                        LightOn(Id);
                    }
                }
            });
        }

        function LightOn(Id) {
            var req = $.DataAccess.Lux_cmd_LightOn(Id);
            req.success(function (json) {
                var data = json.d;
                loadlux();
                if (data == true) {
                    $('#cmdLightStatus_' + Id).text('SPEGNI LUCE');
                    ReadLux(Id);
                    //loadLuxs();
                    toastr["success"](langResources['msg4operationok'], "success");
                }
            });
        }

        function LightOff(Id) {
            var req = $.DataAccess.Lux_cmd_LightOff(Id);
            req.success(function (json) {
                var data = json.d;
                console.log('LightOff', data);
                loadlux();
                if (data == true) {
                    // $('#cmdLightStatus_' + Id).text(langResources['hsLuxOff']);
                    $('#cmdLightStatus_' + Id).text('ACCENDI LUCE');
                    ReadLux(Id);
                    //loadLuxs();
                    toastr["success"](langResources['msg4operationok'], "success");
                }
            });
        }
        /**---------------------------------------------------------------*/

        /*
     seleziono il dimming del lux
     -------------------------------------------------------*/
        $('#lux_list').on('click', ".btnCallDimming", function () {
            $('#ModalLuxDimming').modal('show');
            $("#tableLux").empty();
            var r = $.DataAccess.LuxDimmer_List();
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmpldimmer").tmpl(data).appendTo("#tableLux");
                    setlanguage();
                }
            });
        });

        $.fn.select4Copy = function (value) {
            console.log('select4Copy', value);
            $('#PercDim').html(value + " %");




            $('#ModalLuxDimming').modal('hide');
        }

        /*-------------------------------------------------------*/

        $.fn.callAmbTask = function () {

            $.module.load('Impianti/AmbTask');

        }


    }); //document ready




});

function callEditAmb(Id) {
    $.fn.callEditAmb(Id);
}
function callAmbTask() {
    $.fn.callAmbTask();
}



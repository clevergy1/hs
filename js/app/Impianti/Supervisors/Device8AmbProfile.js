$(function () {

    $(document).ready(function () {
        $('#updateDescriptionResult').removeClass("operationOk");
        $('#updateDescriptionResult').removeClass("operationNok");
     
        $(".make-switch input").bootstrapSwitch();
        $('#Tset').val("100");
        $('.make-switch input').on('switchChange.bootstrapSwitch', function (event, state) {
            console.log(this); // DOM element
            console.log(event); // jQuery event
            console.log(state); // true | false
            if (state == true) {
                //alert("true");
                $('#Tset').val("100");
            } else if (state == false) {
                //alert("false");
                $('#Tset').val("0");
            }
        });

        var $hsIdOnLine = false;
        var $AstrId = 0,
            $AstrType = 0,
            $AstrCod = '',
            $ProfileY = 0,
            $ProfileNr = 0;
        var editGraphData = [],
        ProfileData = [];
        var $plotupd;

        var options = {
            series: {
                lines: {
                    show: true
                },
                points: {
                    show: false
                }
            },
            grid: {
                hoverable: true,
                clickable: true
            },
            xaxis: {
                mode: "time",
                timeformat: "%H:%M"
            },
            selection: {
                mode: "x"
            }
        };

        var d = new Date();
        var currentYear = d.getFullYear();
        //$('#selProfileY').append($('<option>', {value: currentYear,text: currentYear}),
        //$('<option>', {value: currentYear + 1, text: currentYear + 1 }));
        //$('#selProfileY').change(function () {
        //    loadProfiles($AstrCod);
        //});
        $('#selProfileY').val(currentYear);

        Readhs();
        //ReadAstr();
       

        function Readhs() {
            $("#ListPlants").empty();
            var req = $.DataAccess.HeatingSystem_Read(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#hsDescr").text(data.DesImpianto + ' ' + data.Descr);
                    $hsIdOnLine = data.isOnline;
                    loadlux();

                }
            });
        }


        function loadlux() {
            //console.log("loadImpianti");
            $("#lux_list").empty();
            var r = $.DataAccess.Lux_ReadByamb(localStorage.IdAmbiente);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    console.log("LISTA LUX", data);
                    var req = $.DataAccess.LuxAstr_ReadByLux(data[0].Id);
                    req.success(function (json) {
                        var data2 = json.d;
                        if (data2) {
                            console.log("LISTA Astr", data2);

                            ReadAstr(data2.AstrId);
                        } else {
                            //alert("qui");
                        }
                    });
                    //setlanguage();
                }
            });
        }

        function ReadAstr(AstrId) {
            var req = $.DataAccess.hs_Astr_Read(AstrId);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    console.log("Astr SINGOLO", data);
                    //$(".Descr").text(data.AstrDescr);
                    //$(".Descr").text("AMBIENTE " + localStorage.IdAmbiente); //metto il nome dell ambiente
                    $AstrCod = data.Cod;
                    $AstrType = data.AstrType;
                    loadProfiles(data.Id, data.Cod);
                    //setAstr(localStorage.hsId, localStorage.IdAmbiente, $AstrCod);
                }
            });
        }

        function loadProfiles(AstrId, AstrCod) {
            $("#AstrList").empty();
            $("#AstroProfilesList").empty();
            if ($hsIdOnLine == true) {
                var r = $.DataAccess.hs_Astr_Profile_ReadSync(AstrId, $('#selProfileY').val(), 0);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable(data); }
                    else {
                        //getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 0);
                        setTimeout(getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 0, localStorage.IdAmbiente), 500);
                    }
                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(AstrId, $('#selProfileY').val(), 1);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable(data); }
                    else {
                        //getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 1);
                        setTimeout(getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 1, localStorage.IdAmbiente), 600);
                    }
                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(AstrId, $('#selProfileY').val(), 2);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable(data); }
                    else {
                        //getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 2);
                        setTimeout(getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 2, localStorage.IdAmbiente), 700);
                    }
                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(AstrId, $('#selProfileY').val(), 3);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable(data); }
                    else {
                        //getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 3);
                        setTimeout(getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 3, localStorage.IdAmbiente), 800);
                    }
                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(AstrId, $('#selProfileY').val(), 4);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable(data); }
                    else {
                        //getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 4);
                        setTimeout(getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 4, localStorage.IdAmbiente), 900);
                    }
                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(AstrId, $('#selProfileY').val(), 5);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable(data); }
                    else {
                        //getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 5);
                        setTimeout(getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 5, localStorage.IdAmbiente), 1000);
                    }
                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(AstrId, $('#selProfileY').val(), 6);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable(data); }
                    else {
                        //getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 6);
                        setTimeout(getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 6, localStorage.IdAmbiente), 1100);
                    }
                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(AstrId, $('#selProfileY').val(), 7);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable(data); }
                    else {
                        //getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 7);
                        setTimeout(getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 7, localStorage.IdAmbiente), 1200);
                    }
                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(AstrId, $('#selProfileY').val(), 8);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable(data); }
                    else {
                        //getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 8);
                        setTimeout(getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 8, localStorage.IdAmbiente), 1300);
                    }
                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(AstrId, $('#selProfileY').val(), 9);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable(data); }
                    else {
                        //getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 9);
                        setTimeout(getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 9, localStorage.IdAmbiente), 1400);
                    }
                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(AstrId, $('#selProfileY').val(), 10);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable(data); }
                    else {
                        //getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 10);
                        setTimeout(getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 10, localStorage.IdAmbiente), 1500);
                    }
                });
            }
        }



        function getProfile(hsId, AstrCod, ProfileY, ProfileNr, IdAmbiente) {
            var r = $.DataAccess.hs_Astr_Profile_get_multiple(localStorage.getItem("hsId"), AstrCod, ProfileY, ProfileNr, IdAmbiente);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    populateTable(data);
                }
                else {
                    toastr["warning"](langResources['msg4operationfailed'] + " hs_Astr_Profile_get " + AstrCod, langResources['alert']);
                }
            });
        }

        function populateTable(data) {
            $("#tmplProfile").tmpl(data).appendTo("#AstrList");
            $("#tmplProfile4Copy").tmpl(data).appendTo("#AstroProfilesList");

            var div2plot = "#placeholder_" + data.ProfileNr;
            var div2plot4Copy = "#placeholder4Copy_" + data.ProfileNr;
            var d1 = [];
            editGraphData = [];
            ProfileData = [];
            var d0 = new Date(2015, 1, 1),
                d1 = new Date(d0);
            for (var i = 0; i < 96; i++) {
                var temp = parseFloat(data.ProfileData[i]).toFixed(1);
                $('#' + i).text(temp);
                //var date1 = new Date(d1);
                var date1 = new Date(moment(d1).add(1, 'h'));
                editGraphData.push([date1, temp]);
                ProfileData.push(temp);
                d1 = new Date(moment(d0).add(15, 'm'));
                d0 = new Date(d1);
            }
            var graphData = [];
            graphData.push({ data: editGraphData });
            $.plot(div2plot, graphData, options);
            $.plot(div2plot4Copy, graphData, options);

            //for (var i = 0; i < 97; i++) {
            //    d1.push([i, data.ProfileData[i]]);
            //}
            //$.plot(div2plot, [{ data: d1 }], options);           
            $('#tableAstrList').stupidtable();
        }

        function setAstr(hsId, IdAmbiente, AstrCod) {
            var r = $.DataAccess.Ambienti_SetAstr(hsId, IdAmbiente, AstrCod);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    console.log("SETTATO Astr ALL AMBIENTE");
                }
                else {
                    // toastr["warning"](langResources['msg4operationfailed'] + " setAstr", langResources['alert']);
                }
            });
        }




        $('#btnClose').on('click', function (e) {
            //if ($AstrType == 0) { $.module.load('Impianti/Supervisors/Device8Astr'); }
            //else { $.module.load('Impianti/Supervisors/Device8Astrograph'); }
            $.module.load('Impianti/ambienti_Detail');
        });

        /*
        profile description
        --------------------------------------------------------*/
        $('#btnUpdDescr').on('click', function () {
            var descr = $('#descr').val();
            var r = $.DataAccess.hs_Astr_Profile_Descr_Update(localStorage.getItem("AstrId"), $ProfileNr, descr);
            r.success(function (json) {
                var data = json.d;
                if (data == true) {
                    $('#updateDescriptionResult').addClass("operationOk");
                }
                else {
                    $('#updateDescriptionResult').addClass("operationNok");
                    toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                }
            });
        });
        /*------------------------------------------------------*/

        /*
        edit profile
        --------------------------------------------------------*/
        $.fn.callEdit = function (AstrId, ProfileY, ProfileNr) {
            $('#updateDescriptionResult').removeClass("operationOk");
            $('#updateDescriptionResult').removeClass("operationNok");
            $('#DivList').hide();
            $('#DivEdit').show();
            $AstrId = AstrId;
            $ProfileY = ProfileY;
            $ProfileNr = ProfileNr;
            readProfile(AstrId, ProfileY, ProfileNr);
        }

        function readProfile(AstrId, ProfileY, ProfileNr) {
            editGraphData = [];
            ProfileData = [];
            var r = $.DataAccess.hs_Astr_Profile_Read(AstrId, ProfileY, ProfileNr);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#descr').val(data.descr);
                    var d0 = new Date(2015, 1, 1);
                    d1 = new Date(d0);

                    for (var i = 0; i < 96; i++) {
                        var temp = parseFloat(data.ProfileData[i]).toFixed(1);
                        $('#' + i).text(temp);
                        //var date1 = new Date(d1);
                        var date1 = new Date(moment(d1).add(1, 'h'));

                        editGraphData.push([date1, temp]);
                        ProfileData.push(temp);
                        d1 = new Date(moment(d0).add(15, 'm'));
                        d0 = new Date(d1);

                    }
                    var graphData = [];
                    graphData.push({ label: 'tset', data: editGraphData });

                    //console.log('editGraphData', editGraphData);
                    $.plot("#Div1", graphData, options);
                }
            });

            //controllo se esiste un profilo dell'anno precedente
            $('#btnCopyFromPast').hide();
            var r = $.DataAccess.hs_Astr_Profile_Read(AstrId, ProfileY - 1, ProfileNr);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#btnCopyFromPast').show();
                }
            });
        }

        $('#btnCloseEdit').on('click', function () {
            $('#DivEdit').hide();
            $('#DivList').show();
            ReadAstr();
        });

        $('.DataProfile').on('click tap', function () {
            $('#' + this.id).text($('#Tset').val());
            ProfileData[this.id] = $('#Tset').val();
            redrawGrapph();
        });

        $('.HProfile').on('click tap', function () {
            var h = Number(this.id.replace("h_", ""));
            var idx = h * 4;
            $('#' + idx).text($('#Tset').val());
            ProfileData[idx] = $('#Tset').val();
            idx = idx + 1;
            $('#' + idx).text($('#Tset').val());
            ProfileData[idx] = $('#Tset').val();
            idx = idx + 1;
            $('#' + idx).text($('#Tset').val());
            ProfileData[idx] = $('#Tset').val();
            idx = idx + 1;
            $('#' + idx).text($('#Tset').val());
            ProfileData[idx] = $('#Tset').val();
            redrawGrapph();
        });

        function redrawGrapph() {
            editGraphData = [];
            var d0 = new Date(2015, 1, 1),
                d1 = new Date(d0);
            for (var i = 0; i < 96; i++) {
                var temp = parseFloat(ProfileData[i]).toFixed(1);
                $('#' + i).text(temp);
                //var date1 = new Date(d1);
                var date1 = new Date(moment(d1).add(1, 'h'));
                editGraphData.push([date1, temp]);
                d1 = new Date(moment(d0).add(15, 'm'));
                d0 = new Date(d1);
            }
            var graphData = [];
            graphData.push({ label: 'tset', data: editGraphData });
            $.plot("#Div1", graphData, options);
        }

        $('#btnGetProfile').on('click', function () {
            $("body").addClass("loading");
            var r = $.DataAccess.hs_Astr_Profile_get(localStorage.getItem("hsId"), $AstrCod, $ProfileY, $ProfileNr);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    readProfile(data.AstrId, data.ProfileY, data.ProfileNr);
                    populateTable(data);
                    $("body").removeClass("loading");
                }
                else {
                    toastr["warning"](langResources['msg4operationfailed'] + " hs_Astr_Profile_get", langResources['alert']);
                    $("body").removeClass("loading");
                }
            });
        });

        $('#btnUpd').on('click', function () {
            $("body").addClass("loading");
            //console.log('AstrCod=' + $AstrCod + ' ProfileY=' + $ProfileY + ' ProfileNr=' + $ProfileNr);
            var strProfiledata = '';
            for (var i = 0; i < 96; i++) {
                strProfiledata += ProfileData[i] + ";"
            }
            var r = $.DataAccess.hs_Astr_Profile_setMultiple(localStorage.getItem("hsId"), $AstrCod, $ProfileY, $ProfileNr, strProfiledata, localStorage.IdAmbiente);
            r.success(function (json) {
                var data = json.d;
                if (data == true) {

                    //readProfile($AstrId, $ProfileY, $ProfileNr);
                    //$('#DivEdit').hide();
                    //$('#DivList').show();
                    //loadProfiles($AstrCod);
                    $('#lastupdate').text(moment().format('HH:mm'));
                    getProfile(localStorage.getItem("hsId"), $AstrCod, $ProfileY, $ProfileNr, localStorage.IdAmbiente);
                    $("body").removeClass("loading");
                    toastr["success"](langResources['msg4operationok'], langResources['yes']);
                }
                else {
                    $("body").removeClass("loading");
                    toastr["warning"](langResources['msg4operationfailed'] + " hs_Astr_Profile_set", langResources['alert']);
                }
            });
        });

        $('#btnCopyFromPast').on('click', function () {
            var r = $.DataAccess.hs_Astr_Profile_Read($AstrId, $ProfileY - 1, $ProfileNr);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    editGraphData = [];
                    ProfileData = [];
                    $('#descr').val(data.descr);
                    var d0 = new Date(2015, 1, 1),
                        d1 = new Date(d0);
                    for (var i = 0; i < 96; i++) {
                        var temp = parseFloat(data.ProfileData[i]).toFixed(1);
                        $('#' + i).text(temp);
                        //var date1 = new Date(d1);
                        var date1 = new Date(moment(d1).add(1, 'h'));
                        editGraphData.push([date1, temp]);
                        ProfileData.push(temp);
                        d1 = new Date(moment(d0).add(15, 'm'));
                        d0 = new Date(d1);
                    }
                    var graphData = [];
                    graphData.push({ label: 'tset', data: editGraphData });
                    $.plot("#Div1", graphData, options);
                }
            });
        });
        /*------------------------------------------------------*/

        /*
        copy Profile
        -------------------------------------------------------*/
        $('#btnCallCopy').on('click', function () {
            $('#ModalAstro4Copy').modal('show');
            $("#Astro4CopyList").empty();
            var r = $.DataAccess.hs_Astr_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplAstro4CopyList").tmpl(data).appendTo("#Astro4CopyList");
                    setlanguage();
                }
            });
        });

        $.fn.selectAstr4Copy = function (AstrId) {
            console.log('selectAstr4Copy', AstrId);

            var req = $.DataAccess.hs_Astr_Read(AstrId);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    loadProfiles4Copy(data.AstrId, data.AstrCod);
                }
            });
        }

        function loadProfiles4Copy(AstrId, AstrCod) {
            console.log('loadProfiles4Copy', AstrId, AstrCod);
            $('#ModalAstro4Copy').modal('hide');
            $('#ModalAstroProfiles').modal('show');
            $("#Astro4CopyList").empty();
            $("#AstroProfilesList").empty();
            if ($hsIdOnLine == true) {
                var r = $.DataAccess.hs_Astr_Profile_ReadSync(AstrId, $('#selProfileY').val(), 0);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable4Copy(data); }
                        //else { getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 0); }
                    else { getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 0); }
                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(AstrId, $('#selProfileY').val(), 1);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable4Copy(data); }
                        //else { getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 1); }
                    else { getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 1); }
                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(AstrId, $('#selProfileY').val(), 2);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable4Copy(data); }
                        //else { getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 2); }
                    else { getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 2); }
                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(AstrId, $('#selProfileY').val(), 3);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable4Copy(data); }
                        //else { getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 3); }
                    else { getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 3); }
                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(AstrId, $('#selProfileY').val(), 4);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable4Copy(data); }
                        //else { getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 4); }
                    else { getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 4); }
                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(AstrId, $('#selProfileY').val(), 5);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable4Copy(data); }
                        //else { getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 5); }
                    else { getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 5); }
                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(AstrId, $('#selProfileY').val(), 6);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable4Copy(data); }
                        //else { getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 6); }
                    else { getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 6); }
                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(AstrId, $('#selProfileY').val(), 7);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable4Copy(data); }
                        //else { getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 7); }
                    else { getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 7); }
                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(AstrId, $('#selProfileY').val(), 8);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable4Copy(data); }
                        //else { getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 8); }
                    else { getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 8); }

                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(AstrId, $('#selProfileY').val(), 9);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable4Copy(data); }
                        //else { getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 9); }
                    else { getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 9); }
                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(AstrId, $('#selProfileY').val(), 10);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable4Copy(data); }
                        //else { getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 10); }
                    else { getProfile(localStorage.getItem("hsId"), AstrCod, $('#selProfileY').val(), 10); }
                });
            }
        }

        function populateTable4Copy(data) {
            console.log('populateTable4Copy', data);
            $("#tmplProfile4Copy").tmpl(data).appendTo("#AstroProfilesList");

            var div2plot = "#placeholder_" + data.ProfileNr;
            var div2plot4Copy = "#placeholder4Copy_" + data.ProfileNr;
            var d1 = [];
            editGraphData = [];
            ProfileData = [];
            var d0 = new Date(2015, 1, 1),
                d1 = new Date(d0);
            for (var i = 0; i < 96; i++) {
                var temp = parseFloat(data.ProfileData[i]).toFixed(1);
                $('#' + i).text(temp);
                var date1 = new Date(d1);
                editGraphData.push([date1, temp]);
                ProfileData.push(temp);
                d1 = new Date(moment(d0).add(15, 'm'));
                d0 = new Date(d1);
            }
            var graphData = [];
            graphData.push({ data: editGraphData });
            $.plot(div2plot, graphData, options);
            $.plot(div2plot4Copy, graphData, options);
        }

        $.fn.copyProfile = function (AstrId, ProfileY, ProfileNr) {
            editGraphData = [];
            ProfileData = [];
            var r = $.DataAccess.hs_Astr_Profile_Read(AstrId, ProfileY, ProfileNr);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    var d0 = new Date(2015, 1, 1),
                        d1 = new Date(d0);
                    for (var i = 0; i < 96; i++) {
                        var temp = parseFloat(data.ProfileData[i]).toFixed(1);
                        $('#' + i).text(temp);
                        var date1 = new Date(d1);
                        editGraphData.push([date1, temp]);
                        ProfileData.push(temp);
                        d1 = new Date(moment(d0).add(15, 'm'));
                        d0 = new Date(d1);
                    }
                    var graphData = [];
                    graphData.push({ label: 'tset', data: editGraphData });
                    $.plot("#Div1", graphData, options);

                    $('#ModalAstroProfiles').modal('hide');
                }
            });

        }
        /*------------------------------------------------------*/
    }); //document ready

});


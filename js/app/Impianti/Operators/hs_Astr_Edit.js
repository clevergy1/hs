$(function () {

    $(document).ready(function () {
        $('#updateDescriptionResult').removeClass("operationOk");
        $('#updateDescriptionResult').removeClass("operationNok");

        var $hsIdOnLine = false;
        var $AstrId = 0,
            $Cod = '',
            $ProfileY = 0,
            $ProfileNr = 0;
        var editGraphData = []
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
        $('#selProfileY').append($('<option>', {
            value: currentYear,
            text: currentYear
        }),
        $('<option>', {
            value: currentYear + 1,
            text: currentYear + 1
        }));

        $('#selProfileY').change(function () {
            loadProfiles($Cod);
        });

        Readhs();
        //ReadCron();


        function Readhs() {
            $("#ListPlants").empty();
            var req = $.DataAccess.HeatingSystem_Read(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#hsDescr").text(data.DesImpianto + ' ' + data.Descr);
                    $hsIdOnLine = data.isOnline;
                    ReadAstr();
                }
            });
        }

        function ReadAstr() {
            var req = $.DataAccess.hs_Astr_Read(localStorage.getItem("AstrId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $(".Descr").text(data.Descr);
                    $Cod = data.Cod;                    
                    loadProfiles(data.Id, data.Cod);
                }
            });
        }

        function loadProfiles(Id, Cod) {
            $("#CronList").empty();
            $("#CronoProfilesList").empty();
            if ($hsIdOnLine == true) {
                var r = $.DataAccess.hs_Astr_Profile_ReadSync(Id, $('#selProfileY').val(), 0);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable(data); }
                    else { getProfile(localStorage.getItem("hsId"), Cod, $('#selProfileY').val(), 0); }
                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(Id, $('#selProfileY').val(), 1);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable(data); }
                    else { getProfile(localStorage.getItem("hsId"), Cod, $('#selProfileY').val(), 1); }
                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(Id, $('#selProfileY').val(), 2);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable(data); }
                    else { getProfile(localStorage.getItem("hsId"), Cod, $('#selProfileY').val(), 2); }
                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(Id, $('#selProfileY').val(), 3);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable(data); }
                    else { getProfile(localStorage.getItem("hsId"), Cod, $('#selProfileY').val(), 3); }
                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(Id, $('#selProfileY').val(), 4);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable(data); }
                    else { getProfile(localStorage.getItem("hsId"), Cod, $('#selProfileY').val(), 4); }
                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(Id, $('#selProfileY').val(), 5);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable(data); }
                    else { getProfile(localStorage.getItem("hsId"), Cod, $('#selProfileY').val(), 5); }
                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(Id, $('#selProfileY').val(), 6);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable(data); }
                    else { getProfile(localStorage.getItem("hsId"), Cod, $('#selProfileY').val(), 6); }
                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(Id, $('#selProfileY').val(), 7);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable(data); }
                    else { getProfile(localStorage.getItem("hsId"), Cod, $('#selProfileY').val(), 7); }
                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(Id, $('#selProfileY').val(), 8);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable(data); }
                    else { getProfile(localStorage.getItem("hsId"), Cod, $('#selProfileY').val(), 8); }
                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(Id, $('#selProfileY').val(), 9);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable(data); }
                    else { getProfile(localStorage.getItem("hsId"), Cod, $('#selProfileY').val(), 9); }
                });

                var r = $.DataAccess.hs_Astr_Profile_ReadSync(Id, $('#selProfileY').val(), 10);
                r.success(function (json) {
                    var data = json.d;
                    if (data) { populateTable(data); }
                    else { getProfile(localStorage.getItem("hsId"), Cod, $('#selProfileY').val(), 10); }
                });
            }
        }


        function getProfile(hsId, Cod, ProfileY, ProfileNr) {
            var r = $.DataAccess.hs_Astr_Profile_get(localStorage.getItem("hsId"), Cod, ProfileY, ProfileNr);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    populateTable(data);
                }
                else {
                    toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                }
            });
        }

        function populateTable(data) {
            $("#tmplProfile").tmpl(data).appendTo("#CronList");

            var div2plot = "#placeholder_" + data.ProfileNr;
            var d0 = new Date(2015, 1, 1),
                d1 = new Date(d0);
            editGraphData = [];
            ProfileData = [];
            for (var i = 0; i < 96; i++) {
                var temp = parseFloat(data.ProfileData[i]).toFixed(1);
                $('#' + i).text(temp);
                // var date1 = new Date(d1);
                var date1 = new Date(moment(d1).add(1, 'h'));
                editGraphData.push([date1, temp]);
                ProfileData.push(temp);
                d1 = new Date(moment(d0).add(15, 'm'));
                d0 = new Date(d1);
            }
            var graphData = [];
            graphData.push({ data: editGraphData });
            $.plot(div2plot, graphData, options);

            //var d1 = [];
            //for (var i = 0; i < 97; i++) {
            //    d1.push([i, data.ProfileData[i]]);
            //}
            //$.plot(div2plot, [{ data: d1 }]);
            //$('#tableCronList').stupidtable();
        }

        $('#btnClose').on('click', function (e) {
            $.module.load('Impianti/Operators/Device8Astr');
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
                var date1 = new Date(d1);
                editGraphData.push([date1, temp]);
                d1 = new Date(moment(d0).add(15, 'm'));
                d0 = new Date(d1);
            }
            var graphData = [];
            graphData.push({ label: 'tset', data: editGraphData });
            $.plot("#Div1", graphData, options);
        }

        $('#btnGetProfile').on('click', function () {
            var r = $.DataAccess.hs_Astr_Profile_get(localStorage.getItem("hsId"), Cod, ProfileY, ProfileNr);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    readProfile(data.AstrId, ProfileY, ProfileNr);
                    populateTable(data);
                }
                else {
                    toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                }
            });
        });

        $('#btnUpd').on('click', function () {
                        var strProfiledata = '';
            for (var i = 0; i < 96; i++) {
                strProfiledata += ProfileData[i] + ";"
            }
            var r = $.DataAccess.hs_Astr_Profile_set(localStorage.getItem("hsId"), $Cod, $ProfileY, $ProfileNr, strProfiledata);
            r.success(function (json) {
                var data = json.d;
                if (data == true) {
                    $('#lastupdate').text(moment().format('HH:mm'));
                    getProfile(localStorage.getItem("hsId"), $Cod, $ProfileY, $ProfileNr);
                    toastr["success"](langResources['msg4operationok'], langResources['yes']);
                }
                else {
                    toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
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
                        var date1 = new Date(d1);
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

    }); //document ready

});
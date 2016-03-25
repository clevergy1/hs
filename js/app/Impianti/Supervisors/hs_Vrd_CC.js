
$(function () {
    var $data4Edit = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
    $('.isNumeric').autoNumeric('init'); 

    $(document).ready(function () {
        Readhs();
        readVrd();
        listCal_cc();
        setlanguage();


        function Readhs() {          
            var req = $.DataAccess.HeatingSystem_Read(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#hsDescr").text(data.DesImpianto + ' ' + data.Descr);
                }
            });
        }

        function readVrd() {
            var req = $.DataAccess.hs_Vrd_Read(localStorage.getItem("VrdId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#VrdDescr").text(data.VrdDesc);
                    $(".VrdDescr").text(data.VrdDesc);
                    readCurrentCC(data.VrdCod);
                }
            });
        }

        function readCurrentCC(VrdCod) {
            var req = $.DataAccess.hs_Vrd_currentCC_Get(localStorage.getItem("hsId"), VrdCod);
            req.success(function (json) {
                var data = json.d;
                if (data) {                    
                    $('#currentCC_Tamb1').text(Number(data.Tamb1).toLocaleString());
                    $('#currentCC_Tamb2').text(Number(data.Tamb2).toLocaleString());
                    $('#currentCC_Tamb3').text(Number(data.Tamb3).toLocaleString());
                    $('#currentCC_Tamb4').text(Number(data.Tamb4).toLocaleString());
                    $('#currentCC_Tamb5').text(Number(data.Tamb5).toLocaleString());
                    $('#currentCC_Tset1').text(Number(data.Tset1).toLocaleString());
                    $('#currentCC_Tset2').text(Number(data.Tset2).toLocaleString());
                    $('#currentCC_Tset3').text(Number(data.Tset3).toLocaleString());
                    $('#currentCC_Tset4').text(Number(data.Tset4).toLocaleString());
                    $('#currentCC_Tset5').text(Number(data.Tset5).toLocaleString());

                    /*
                    Chart
                    -----------------------------------------------------*/
                    //s1 = [[-30, 65], [-5, 65], [20, 30], [30, 30], [50, 30]];
                    s1 = [[data.Tamb1, data.Tset1], [data.Tamb2, data.Tset2], [data.Tamb3, data.Tset3], [data.Tamb4, data.Tset4], [data.Tamb5, data.Tset5]];
                        
                    $.jqplot.config.enablePlugins = false;
                    plot1 = $.jqplot('current_chart_div', [s1], {
                        title: 'Curva climatica',
                        renderer: $.jqplot.DateAxisRenderer,
                        axes: {
                            xaxis: {
                                tickOptions: { formatString: '%.0f&deg;C' },
                                labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                                label: 'T.ext.'
                            },
                            yaxis: {
                                label: 'T.set.',
                                labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                                tickOptions: { formatString: '%.0f&deg;C' }
                            }
                        }
                    });

                    $.jqplot.config.enablePlugins = true;
                    /*---------------------------------------------------*/

                }
            });
        }

        function listCal_cc() {
            $("#ccList").empty();
            var r = $.DataAccess.hs_Vrd_CC_List(localStorage.getItem("VrdId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplccList").tmpl(data).appendTo("#ccList");                    
                    setlanguage();
                }
            });
        }

        /*
        Add
        -----------------------------------------------------*/
        $('#bntCloseAdd').on('click', function (e) {
            $('#DivEdit').hide();
            $('#DivAdd').hide();
            $('#DivList').show();
        });

        $('#btnCallAdd').on('click', function (e) {
            $('#DivList').hide();
            $('#descr_Add').val('');            
            $('#Tamb1_Add').autoNumeric('set', -30);
            $('#Tamb2_Add').autoNumeric('set', 0);
            $('#Tamb3_Add').autoNumeric('set', 10);
            $('#Tamb4_Add').autoNumeric('set', 20);
            $('#Tamb5_Add').autoNumeric('set', 30);

            $('#Tset1_Add').autoNumeric('set', 60);
            $('#Tset2_Add').autoNumeric('set', 40);
            $('#Tset3_Add').autoNumeric('set', 30);
            $('#Tset4_Add').autoNumeric('set', 20);
            $('#Tset5_Add').autoNumeric('set', 10);
            $('#DivAdd').show();

            var Tamb1 = Number($('#Tamb1_Add').autoNumeric('get')),
                Tset1 = Number($('#Tset1_Add').autoNumeric('get')),
                Tamb2 = Number($('#Tamb2_Add').autoNumeric('get')),
                Tset2 = Number($('#Tset2_Add').autoNumeric('get')),
                Tamb3 = Number($('#Tamb3_Add').autoNumeric('get')),
                Tset3 = Number($('#Tset3_Add').autoNumeric('get')),
                Tamb4 = Number($('#Tamb4_Add').autoNumeric('get')),
                Tset4 = Number($('#Tset4_Add').autoNumeric('get')),
                Tamb5 = Number($('#Tamb5_Add').autoNumeric('get')),
                Tset5 = Number($('#Tset5_Add').autoNumeric('get'));
            prepareChart4Add(Tamb1, Tset1, Tamb2, Tset2, Tamb3, Tset3, Tamb4, Tset4, Tamb5, Tset5);
        });

        $('#btnAdd').on('click', function (e) {
            var descr = $('#descr_Add').val().trim(),
                Tamb1 = $('#Tamb1_Add').autoNumeric('get'),
                Tset1 = $('#Tset1_Add').autoNumeric('get'),
                Tamb2 = $('#Tamb2_Add').autoNumeric('get'),
                Tset2 = $('#Tset2_Add').autoNumeric('get'),
                Tamb3 = $('#Tamb3_Add').autoNumeric('get'),
                Tset3 = $('#Tset3_Add').autoNumeric('get'),
                Tamb4 = $('#Tamb4_Add').autoNumeric('get'),
                Tset4 = $('#Tset4_Add').autoNumeric('get'),
                Tamb5 = $('#Tamb5_Add').autoNumeric('get'),
                Tset5 = $('#Tset5_Add').autoNumeric('get');
            if (descr == '') {
                toastr["warning"](langResources['msg4descr'], langResources['alert']);
            }
            else {
                var req = $.DataAccess.hs_Vrd_CC_Add(localStorage.getItem("VrdId"), descr, Tamb1, Tset1, Tamb2, Tset2, Tamb3, Tset3, Tamb4, Tset4, Tamb5, Tset5);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        $('#DivEdit').hide();
                        $('#DivAdd').hide();
                        $('#DivList').show();
                        listCal_cc();
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }
        });

        function prepareChart4Add(Tamb1, Tset1, Tamb2, Tset2, Tamb3, Tset3, Tamb4, Tset4, Tamb5, Tset5) {
            console.log('prepareChart4Edit', Tamb1, Tset1, Tamb2, Tset2, Tamb3, Tset3, Tamb4, Tset4, Tamb5, Tset5);
            $('#add_chart_div').empty();
            var s2 = [[Tamb1, Tset1], [Tamb2, Tset2], [Tamb3, Tset3], [Tamb4, Tset4], [Tamb5, Tset5]];
            $data4Edit = [[Tamb1, Tset1], [Tamb2, Tset2], [Tamb3, Tset3], [Tamb4, Tset4], [Tamb5, Tset5]];

            $.jqplot.config.enablePlugins = true;

            //var inti = new Array();
            //inti.push([0, 0, 0, 0, 0]);
            //var plotedit = $.jqplot('edit_chart_div', inti, null);
            //plotedit.destroy();

            plotadd = $.jqplot('add_chart_div', [$data4Edit], {
                title: 'Curva climatica',
                renderer: $.jqplot.DateAxisRenderer,
                axes: {
                    xaxis: {
                        tickOptions: { formatString: '%.0f&deg;C' },
                        labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                        label: 'T.ext.'
                    },
                    yaxis: {
                        label: 'T.set.',
                        labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                        tickOptions: { formatString: '%.0f&deg;C' }
                    }
                }
            });
        }

        $('#add_chart_div').bind('jqplotDragStop', function (seriesIndex, pointIndex, pixelposition, data) {
            var d = plotadd.series[0].data;
            var t1 = d[0];
            var t2 = d[1];
            var t3 = d[2];
            var t4 = d[3];
            var t5 = d[4];

            //console.log('t.amb1=' + t1[0] + ' t.set1=' + t1[1]); //data for the series is here
            $('#Tamb1_Add').autoNumeric('set', t1[0].toFixed(0));
            $('#Tset1_Add').autoNumeric('set', t1[1].toFixed(0));
            $('#Tamb2_Add').autoNumeric('set', t2[0].toFixed(0));
            $('#Tset2_Add').autoNumeric('set', t2[1].toFixed(0));
            $('#Tamb3_Add').autoNumeric('set', t3[0].toFixed(0));
            $('#Tset3_Add').autoNumeric('set', t3[1].toFixed(0));
            $('#Tamb4_Add').autoNumeric('set', t4[0].toFixed(0));
            $('#Tset4_Add').autoNumeric('set', t4[1].toFixed(0));
            $('#Tamb5_Add').autoNumeric('set', t5[0].toFixed(0));
            $('#Tset5_Add').autoNumeric('set', t5[1].toFixed(0));
        });

        $('#Tamb1_Add').keyup(function () { chart4AddReplot(); });
        $('#Tamb2_Add').keyup(function () { chart4AddReplot(); });
        $('#Tamb3_Add').keyup(function () { chart4AddReplot(); });
        $('#Tamb4_Add').keyup(function () { chart4AddReplot(); });
        $('#Tamb5_Add').keyup(function () { chart4AddReplot(); });
        $('#Tset1_Add').keyup(function () { chart4AddReplot(); });
        $('#Tset2_Add').keyup(function () { chart4AddReplot(); });
        $('#Tset3_Add').keyup(function () { chart4AddReplot(); });
        $('#Tset4_Add').keyup(function () { chart4AddReplot(); });
        $('#Tset5_Add').keyup(function () { chart4AddReplot(); });

        function chart4AddReplot() {
            var Tamb1 = Number($('#Tamb1_Add').autoNumeric('get')),
                Tset1 = Number($('#Tset1_Add').autoNumeric('get')),
                Tamb2 = Number($('#Tamb2_Add').autoNumeric('get')),
                Tset2 = Number($('#Tset2_Add').autoNumeric('get')),
                Tamb3 = Number($('#Tamb3_Add').autoNumeric('get')),
                Tset3 = Number($('#Tset3_Add').autoNumeric('get')),
                Tamb4 = Number($('#Tamb4_Add').autoNumeric('get')),
                Tset4 = Number($('#Tset4_Add').autoNumeric('get')),
                Tamb5 = Number($('#Tamb5_Add').autoNumeric('get')),
                Tset5 = Number($('#Tset5_Add').autoNumeric('get'));

            prepareChart4Add(Tamb1, Tset1, Tamb2, Tset2, Tamb3, Tset3, Tamb4, Tset4, Tamb5, Tset5);
            // $data4Edit = [[Tamb1, Tset1], [Tamb2, Tset2], [Tamb3, Tset3], [Tamb4, Tset4], [Tamb5, Tset5]];
            // console.log('$data4Edit', $data4Edit);
            // plotedit.replot({ resetAxes: true });

        }

        /*---------------------------------------------------*/

        /*
        Edit
        -----------------------------------------------------*/
        $('#bntCloseEdit').on('click', function (e) {
            $('#DivEdit').hide();
            $('#DivAdd').hide();
            $('#DivList').show();
        });

        $.fn.callEdit = function (ccId) {
            var req = $.DataAccess.hs_Vrd_CC_Read(ccId);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#DivAdd').hide();
                    $('#DivList').hide();

                    $('#ccId_Upd').val(ccId);
                    $('#descr_Upd').val(data.descr);
                    $('#Descr_Delete').text(data.descr);
                    $('#Descr_Send').text(data.descr);
                    $('#Tamb1_Upd').autoNumeric('set', data.Tamb1);
                    $('#Tamb2_Upd').autoNumeric('set', data.Tamb2);
                    $('#Tamb3_Upd').autoNumeric('set', data.Tamb3);
                    $('#Tamb4_Upd').autoNumeric('set', data.Tamb4);
                    $('#Tamb5_Upd').autoNumeric('set', data.Tamb5);
                    $('#Tset1_Upd').autoNumeric('set', data.Tset1);
                    $('#Tset2_Upd').autoNumeric('set', data.Tset2);
                    $('#Tset3_Upd').autoNumeric('set', data.Tset3);
                    $('#Tset4_Upd').autoNumeric('set', data.Tset4);
                    $('#Tset5_Upd').autoNumeric('set', data.Tset5);
                    $('#DivEdit').show();

                    prepareChart4Edit(data.Tamb1, data.Tset1, data.Tamb2, data.Tset2, data.Tamb3, data.Tset3, data.Tamb4, data.Tset4, data.Tamb5, data.Tset5);
                    
                }
                else {
                    toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                }
            });
        }

        $('#btnUpdate').on('click', function (e) {
            var ccId = $('#ccId_Upd').val(),
                descr = $('#descr_Upd').val().trim(),
                Tamb1 = $('#Tamb1_Upd').autoNumeric('get'),
                Tset1 = $('#Tset1_Upd').autoNumeric('get'),
                Tamb2 = $('#Tamb2_Upd').autoNumeric('get'),
                Tset2 = $('#Tset2_Upd').autoNumeric('get'),
                Tamb3 = $('#Tamb3_Upd').autoNumeric('get'),
                Tset3 = $('#Tset3_Upd').autoNumeric('get'),
                Tamb4 = $('#Tamb4_Upd').autoNumeric('get'),
                Tset4 = $('#Tset4_Upd').autoNumeric('get'),
                Tamb5 = $('#Tamb5_Upd').autoNumeric('get'),
                Tset5 = $('#Tset5_Upd').autoNumeric('get');
            if (descr == '') {
                toastr["warning"](langResources['msg4descr'], langResources['alert']);
            }
            else {
                var req = $.DataAccess.hs_Vrd_CC_Update(ccId, descr, Tamb1, Tset1, Tamb2, Tset2, Tamb3, Tset3, Tamb4, Tset4, Tamb5, Tset5);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        $('#DivEdit').hide();
                        $('#DivAdd').hide();
                        $('#DivList').show();
                        listCal_cc();
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }
        });
        /*---------------------------------------------------*/

        /*
        Delete
        -----------------------------------------------------*/
        $('#btnDelete').on('click', function (e) {
            var ccId = $('#ccId_Upd').val();
            var req = $.DataAccess.hs_Vrd_CC_Del(ccId);
            req.success(function (json) {
                var data = json.d;
                if (data == true) {
                    $('#DivEdit').hide();
                    $('#DivAdd').hide();
                    $('#DivList').show();
                    listCal_cc();
                }
                else {
                    toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                }
            });
        });
        /*---------------------------------------------------*/

        /*
        Send
        -----------------------------------------------------*/
        $.fn.callSend = function (ccId, descr) {          
            $('#ccId_Upd').val(ccId);
            $('#Descr_Send').text(descr);
            $('#SendModal').modal('show');
        }


        $('#bntSend').on('click', function (e) {

            var req = $.DataAccess.hs_Vrd_currentCC_set(localStorage.getItem("VrdId"), $('#ccId_Upd').val());
            req.success(function (json) {
                var data = json.d;
                if (data == true) {
                    toastr["success"](langResources['msg4operationok'], "success");
                    //leggo di nuovo  per forzare lettura climatica corrente
                    readVrd();
                }
                else {
                    toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                }
            });

            //var req = $.DataAccess.hs_Cal_CC_Read($('#ccId_Upd').val());
            //req.success(function (json) {
            //    var data = json.d;
            //    if (data) {
            //        alert('invio');
            //    }
            //    else {
            //        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
            //    }
            //});
        });
        /*---------------------------------------------------*/


        /*
        chart update
        ----------------------------------------------------*/
        function prepareChart4Edit(Tamb1, Tset1, Tamb2, Tset2, Tamb3, Tset3, Tamb4, Tset4, Tamb5, Tset5) {
            console.log('prepareChart4Edit', Tamb1, Tset1, Tamb2, Tset2, Tamb3, Tset3, Tamb4, Tset4, Tamb5, Tset5);
            $('#edit_chart_div').empty();
            var s2 = [[Tamb1, Tset1], [Tamb2, Tset2], [Tamb3, Tset3], [Tamb4, Tset4], [Tamb5, Tset5]];
            $data4Edit = [[Tamb1, Tset1], [Tamb2, Tset2], [Tamb3, Tset3], [Tamb4, Tset4], [Tamb5, Tset5]];

            $.jqplot.config.enablePlugins = true;

            //var inti = new Array();
            //inti.push([0, 0, 0, 0, 0]);
            //var plotedit = $.jqplot('edit_chart_div', inti, null);
            //plotedit.destroy();
          
            plotedit = $.jqplot('edit_chart_div', [$data4Edit], {
                title: 'Curva climatica',
                renderer: $.jqplot.DateAxisRenderer,
                axes: {
                    xaxis: {
                        tickOptions: { formatString: '%.0f&deg;C' },
                        labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                        label: 'T.ext.'
                    },
                    yaxis: {
                        label: 'T.set.',
                        labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                        tickOptions: { formatString: '%.0f&deg;C' }
                    }
                }
           });
        }
       
        $('#edit_chart_div').bind('jqplotDragStop', function (seriesIndex, pointIndex, pixelposition, data) {
            var d = plotedit.series[0].data;
            var t1 = d[0];
            var t2 = d[1];
            var t3 = d[2];
            var t4 = d[3];
            var t5 = d[4];

            //console.log('t.amb1=' + t1[0] + ' t.set1=' + t1[1]); //data for the series is here
            $('#Tamb1_Upd').autoNumeric('set', t1[0].toFixed(0));
            $('#Tset1_Upd').autoNumeric('set', t1[1].toFixed(0));
            $('#Tamb2_Upd').autoNumeric('set', t2[0].toFixed(0));
            $('#Tset2_Upd').autoNumeric('set', t2[1].toFixed(0));
            $('#Tamb3_Upd').autoNumeric('set', t3[0].toFixed(0));
            $('#Tset3_Upd').autoNumeric('set', t3[1].toFixed(0));
            $('#Tamb4_Upd').autoNumeric('set', t4[0].toFixed(0));
            $('#Tset4_Upd').autoNumeric('set', t4[1].toFixed(0));
            $('#Tamb5_Upd').autoNumeric('set', t5[0].toFixed(0));
            $('#Tset5_Upd').autoNumeric('set', t5[1].toFixed(0));
        });

        $('#Tamb1_Upd').keyup(function () { chart4EditReplot(); });
        $('#Tamb2_Upd').keyup(function () { chart4EditReplot(); });
        $('#Tamb3_Upd').keyup(function () { chart4EditReplot(); });
        $('#Tamb4_Upd').keyup(function () { chart4EditReplot(); });
        $('#Tamb5_Upd').keyup(function () { chart4EditReplot(); });
        $('#Tset1_Upd').keyup(function () { chart4EditReplot(); });
        $('#Tset2_Upd').keyup(function () { chart4EditReplot(); });
        $('#Tset3_Upd').keyup(function () { chart4EditReplot(); });
        $('#Tset4_Upd').keyup(function () { chart4EditReplot(); });
        $('#Tset5_Upd').keyup(function () { chart4EditReplot(); });

        function chart4EditReplot() {
            var Tamb1 = Number($('#Tamb1_Upd').autoNumeric('get')),
                Tset1 = Number($('#Tset1_Upd').autoNumeric('get')),
                Tamb2 = Number($('#Tamb2_Upd').autoNumeric('get')),
                Tset2 = Number($('#Tset2_Upd').autoNumeric('get')),
                Tamb3 = Number($('#Tamb3_Upd').autoNumeric('get')),
                Tset3 = Number($('#Tset3_Upd').autoNumeric('get')),
                Tamb4 = Number($('#Tamb4_Upd').autoNumeric('get')),
                Tset4 = Number($('#Tset4_Upd').autoNumeric('get')),
                Tamb5 = Number($('#Tamb5_Upd').autoNumeric('get')),
                Tset5 = Number($('#Tset5_Upd').autoNumeric('get'));
           
           prepareChart4Edit(Tamb1, Tset1, Tamb2, Tset2, Tamb3, Tset3, Tamb4, Tset4, Tamb5, Tset5);
           // $data4Edit = [[Tamb1, Tset1], [Tamb2, Tset2], [Tamb3, Tset3], [Tamb4, Tset4], [Tamb5, Tset5]];
           // console.log('$data4Edit', $data4Edit);
           // plotedit.replot({ resetAxes: true });

        }
        /*---------------------------------------------------*/
    }); //document ready

});

function callEdit(ccId) { $.fn.callEdit(ccId); }
function callSend(ccId, descr) { $.fn.callSend(ccId, descr); }

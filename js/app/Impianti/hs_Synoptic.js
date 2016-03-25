
$(function () {
    //$.rt.load();
    //setTimeout(function () {
    //    $.rt.start();
    //}, 3000);

    $(document).ready(function () {
        /*
        Colors
        ------------------------------------------------------*/
        $verde = '#008000';
        $giallo = '#ffc800'; //'#ffd655';
        $rosso = '#aa0000';
        /*----------------------------------------------------*/
        var runningObj = [],
            elements=[];

        /*
        received messages
        --------------------------------------------------------------*/
        $.fn.received_hs_TemperatureProbes_setValue = function (hsId, ProbeCod, currentValue) {
            if (localStorage.getItem("hsId") == hsId) {
                var txtobjName = 'txt_' + ProbeCod + '_STATUS';
                var txtobj = document.getElementById(txtobjName);
                if (txtobj) { txtobj.textContent = currentValue + 'C°' }
            }
        }
        $.fn.received_hs_cal_setStatus = function (hsId, CalCod, SetPoint, isRunning, stato) {
            if (localStorage.getItem("hsId") == hsId) {
                var txtobjName = 'txt_' + CalCod + '_STATUS';
                var txtobj = document.getElementById(txtobjName);
                if (txtobj) {
                    txtobj.textContent = SetPoint + ' C°';
                }
                var objName = CalCod + '_STATUS';
                var obj = document.getElementById(objName);
                if (obj) {
                    if (stato == 0) {
                        obj.style.fill = $verde;
                    }
                    else if (stato == 1) {
                        obj.style.fill = $giallo;
                    }
                    else if (stato == 2) {
                        obj.style.fill = $rosso;
                    }
                    else if (stato == 3) {
                        obj.style.fill = $rosso;
                    }                    
                }
                for (var i = 0; i < runningObj.length; i++) {
                    if (runningObj[i] == CalCod) {
                        runningObj[i].run = isRunning;
                    }
                }
            }
        }
        $.fn.received_hs_Cir_setStatus = function (hsId, CirCod, isRunning, stato) {
            if (localStorage.getItem("hsId") == hsId) {
                //var txtobjName = 'txt_' + CirCod + '_STATUS';
                //var txtobj = document.getElementById(txtobjName);
                //if (txtobj) {
                //    if (stato == 0) {
                //        txtobj.textContent = isRunning;
                //    }
                //    else if (stato == 1) {
                //        txtobj.textContent = 'WARNING';
                //    }
                //    else if (stato == 2) {
                //        txtobj.textContent = 'ALARM';
                //    }
                //    else if (stato == 3) {
                //        txtobj.textContent = 'STOP';
                //    }
                //}
                var objName =CirCod + '_STATUS';
                var obj = document.getElementById(objName);
                if (obj) {
                    if (stato == 0) {
                        obj.style.fill = $verde;
                    }
                    else if (stato == 1) {
                        obj.style.fill = $giallo;
                    }
                    else if (stato == 2) {
                        obj.style.fill = $rosso;
                    }
                    else if (stato == 3) {
                        obj.style.fill = $rosso;
                    }
                }
                for (var i = 0; i < runningObj.length; i++) {
                    if (runningObj[i] == CirCod) {
                        runningObj[i].run = isRunning;
                    }
                }
            }
        }
        $.fn.received_hs_Cir_setManualMode = function (hsId, CirCod, ManualMode) {
            if (localStorage.getItem("hsId") == hsId) {
                var txtobjName = 'txt_' + CirCod + '_STATUS';
                var txtobj = document.getElementById(txtobjName);
                if (txtobj) {
                    if (ManualMode == true) {
                        txtobj.textContent = "MANUALE";
                    }
                    else  {
                        txtobj.textContent = 'AUTO';
                    }
                }
            }
        }
        $.fn.received_hs_Vrd_setStatus = function (hsId, VrdCod, SetPoint, SetPosition, Position, stato) {
            if (localStorage.getItem("hsId") == hsId) {
                var txtobjName = 'txt_' + VrdCod + '_STATUS';
                var txtobj = document.getElementById(txtobjName);
                if (txtobj) {
                    txtobj.textContent = SetPoint + ' C°';
                }
                var objName = VrdCod + '_STATUS';
                var obj = document.getElementById(objName);
                if (obj) {
                    if (stato == 0) {
                        obj.style.fill = $verde;
                    }
                    else if (stato == 1) {
                        obj.style.fill = $giallo;
                    }
                    else if (stato == 2) {
                        obj.style.fill = $rosso;
                    }
                    else if (stato == 3) {
                        obj.style.fill = $rosso;
                    }
                }

                for (var i = 0; i < runningObj.length; i++) {
                    if (runningObj[i] == VrdCod) {
                        runningObj[i].run = Position;
                    }
                }
            }
        }
        $.fn.received_hs_Ctl_setValue = function (hsId, CtlCod, stato, currentValue) {
            if (localStorage.getItem("hsId") == hsId) {
                var txtobjName = 'txt_' + CtlCod + '_STATUS';
                var txtobj = document.getElementById(txtobjName);
                if (txtobj) { txtobj.textContent = currentValue + 'L' }
                var objName = CtlCod + '_STATUS';
                var obj = document.getElementById(objName);
                if (obj) {
                    if (stato == 0) {
                        obj.style.fill = $verde;
                    }
                    else if (stato == 1) {
                        obj.style.fill = $giallo;
                    }
                    else if (stato == 2) {
                        obj.style.fill = $rosso;
                    }
                    else if (stato == 3) {
                        obj.style.fill = $rosso;
                    }
                }
            }
        }
        $.fn.received_hs_Ctb_setValue = function (hsId, CtbCod, currentValue) {
            if (localStorage.getItem("hsId") == hsId) {
                var txtobjName = 'txt_' + CtbCod + '_STATUS';
                var txtobj = document.getElementById(txtobjName);
                if (txtobj) { txtobj.textContent = currentValue }
                var objName = CtbCod + '_STATUS';
                var obj = document.getElementById(objName);
                if (obj) {
                    if (stato == 0) {
                        obj.style.fill = $verde;
                    }
                    else if (stato == 1) {
                        obj.style.fill = $giallo;
                    }
                    else if (stato == 2) {
                        obj.style.fill = $rosso;
                    }
                    else if (stato == 3) {
                        obj.style.fill = $rosso;
                    }
                }
            }
        }
        $.fn.received_hs_Doors_setValue = function (hsId, DoorCod, currentValue) {
            if (localStorage.getItem("hsId") == hsId) {
                var txtobjName = 'txt_' + DoorCod + '_STATUS';
                var txtobj = document.getElementById(txtobjName);
                if (txtobj) {
                    if (currentValue == false) {
                        txtobj.textContent = 'Chiusa';
                    }
                    else {
                        txtobj.textContent = 'Aperta';
                    }
                }
            }
        }
        /*-----------------------------------------------------------*/

        //init();


        $("body").addClass("loading");
        function fixWebkitHeightBug() {
            var svgW = $('#svg2').attr("width");
            var svgH = $('#svg2').attr("height")
            var curSVGW =parseInt( $('#svg-main').width());
            var curSVGH = parseInt($(window).height()) - parseInt($('header').height())- 100;
            //var newSVGH = heightInRatio(svgH, svgW, curSVGW);
            //$('#svg-main').height(newSVGH);
            //console.log('newSVGH', newSVGH);
            function heightInRatio(oH, oW, nW) {
                return (oH / oW * nW);
            }
        };

        $(window).resize(function () {
            fixWebkitHeightBug();
        });

        function loadSynoptic(MapId) {
            var map2load = $.appParms.urlGlobal() + 'gethsMap.ashx?MapId=' + MapId;
            $('#svg-main').load(map2load, null, function () {
                               
                var svg = document.getElementById('svg2');
                svg.setAttribute("width", "100%");
                svg.setAttribute("height", "100%");

                var texts = svg.getElementsByTagName("text");
                for (var i = 0; i < texts.length; i++) {
                    texts[i].setAttribute("font-family", "Arial");
                    //var fontfamily = texts[i].getAttribute("font-family");
                    //console.log(fontfamily);
                }

                $('#svg2').zoomPanTouchSVG({ zoomBtnContainer: '#zoomBtnContainer' });
                //$('#svg2').zoomPanTouchSVG().zoom('in');
                fixWebkitHeightBug();
                $("body").removeClass("loading");
                elaborContent();


                ///*
                //Multitouch events
                //-----------------------------------------------------------------------*/
                //var scale = 1,
                //    gestureArea = document.getElementById('svg-main'),
                //    scaleElement = document.getElementById('svg2'),
                //    resetTimeout;

                //interact(gestureArea).gesturable({
                //    onstart: function (event) {
                //        clearTimeout(resetTimeout);
                //        //scaleElement.classList.remove('reset');
                //    },
                //    onmove: function (event) {
                //        curViewBoxArr = svg.getAttribute('viewBox');
                //        //console.log(svg.getAttribute('viewBox'));
                //        scale = scale * (1 + event.ds);
                //        scaleElement.style.webkitTransform = scaleElement.style.transform = 'scale(' + scale + ')';
                //        svg.setAttribute('viewBox', curViewBoxArr);
                //    },
                //    onend: function (event) {
                //        //resetTimeout = setTimeout(reset, 1000);
                //        scaleElement.classList.add('reset');
                //    }
                //});

                //function reset() {
                //    console.log('reset call');
                //}

                //// prevent browser's native drag on the image
                //gestureArea.addEventListener('dragstart', function (event) {
                //    console.log('dragstart');
                //    event.preventDefault();
                //});
                //gestureArea.addEventListener('dragend', function (event) {
                //    console.log('dragend');
                //    event.preventDefault();
                //});

               
                ////var x = 0,
                ////    y = 0,
                ////    // vendor prefixes (prefices?)
                ////    transformProp = 'transform' in gestureArea.style ?
                ////                'transform' : 'webkitTransform' in gestureArea.style ?
                ////                    'webkitTransform' : 'mozTransform' in gestureArea.style ?
                ////                        'mozTransform' : 'oTransform' in gestureArea.style ?
                ////                            'oTransform': 'msTransform';

                ////// make an Interactable of the document body element
                ////interact(gestureArea)
                ////    // make a draggable of the Interactable
                ////    .draggable({
                ////        // on(drag)move
                ////        // could also have done interact(document.body).draggable(true).ondragmove = function...
                ////        onmove: function (event) {
                ////            x += event.dx;
                ////            y += event.dy;                                                        
                ////            //gestureArea.style[transformProp] = 'translate(' + x + 'px, ' + y + 'px)';
                ////        }
                ////    })
                ////    // you should really add listeners like this if you want to add multiple listeners
                ////    .on('dragend', function (event) {
                ////        console.log('dragged a distance of ' + 
                ////            Math.sqrt(event.dx*event.dx + event.dy*event.dy) + 
                ////            ' pixels to ' + event.pageX + ', ' + event.pageY);
                ////    })
 
                /*--------------------------------------------------------------------------*/



            });
        }

        function readMap(MapId) {
            var r = $.DataAccess.hs_Maps_Read(MapId);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#MapDesc').text(data.MapDesc);
                }
            });
        }

        function Readhs() {          
            var req = $.DataAccess.HeatingSystem_Read(localStorage.getItem("hsId"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#hsDescr").text(data.DesImpianto + ' ' + data.Descr);
                }
            });
        }

        function ReadImpianto() {
            var req = $.DataAccess.Impianti_Read(localStorage.getItem("IdImpianto"));
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#DesImpianto").text(data.DesImpianto);
                }
            });
        }

        function loadProbeElem(elementCode) {
            //console.log('loadProbeElem elementCode: ' + elementCode);
            $("#ProbeElem_" + elementCode).empty();
            var r = $.DataAccess.hs_TemperatureProbeElem_List(localStorage.getItem("hsId"), elementCode);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplProbeElem").tmpl(data).appendTo("#ProbeElem_" + elementCode);                   
                    setlanguage();
                }
            });
        }

        Readhs();
        readMap(localStorage.getItem("MapId"));
        loadSynoptic(localStorage.getItem("MapId"));

        /*
        work on map
        ------------------------------------------------------*/
        function elaborContent() {
            LoadDoors();            

            loadBoilers();
            loadCirculators();

            loadServomotors();
            //loadCron();

            loadCtl();
            loadCtb();

            loadProbes();
            loadtb();

            loadpm();
            loadpb();

            //$.rt.load();
            //setTimeout(function () {
            //    $.rt.start();
            //}, 3000);


 

            

            //$.rt.start();

            //setTimeout(function () {
            //    var requestAnimationFrameID = requestAnimationFrame(doAnim);
            //}, 3000);
        }
        /*----------------------------------------------------*/

        /*
        Doors
        -------------------------------------------------------------------------*/
        function LoadDoors() {
            $("#ListDoors").empty();
            var r = $.DataAccess.hs_Doors_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                       
                        $('#' + data[i].DoorCod).on('touchstart click', function (event) {
                            doorDetail(this.id);
                        });
                        $('#' + data[i].DoorCod+'_1_').on('touchstart click', function (event) {
                            doorDetail(this.id.replace("_1_",""));
                        });
   
                        var txtobjName = 'txt_' + data[i].DoorCod + '_STATUS';
                        var txtobj = document.getElementById(txtobjName);
                        if (txtobj) {
                            if (data[i].currentValue == false) {
                                txtobj.textContent = 'Chiusa';
                            }
                            else {
                                txtobj.textContent = 'Aperta';
                            }
                        }
                        txtobjName = 'txt_' + data[i].DoorCod + '_STATUS' + '_1_';
                        txtobj = document.getElementById(txtobjName);
                        if (txtobj) {
                            if (data[i].currentValue == false) {
                                txtobj.textContent = 'Chiusa';
                            }
                            else {
                                txtobj.textContent = 'Aperta';
                            }
                        }

                        elements.push({
                            'code': data[i].DoorCod,
                            'type': 'DOORS'
                        });

                    } //end for
                }
            });
        }

        function doorDetail(DoorCod) {           
            $("#usermenu").empty();
            var hsId = localStorage.getItem("hsId");
            var req = $.DataAccess.hs_Doors_ReadByDoorCod(hsId, DoorCod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplDoorsDetail").tmpl(data).appendTo("#usermenu");                    
                    setlanguage();
                }
            });
        }
        /*-----------------------------------------------------------------------*/

        /*
        Gruppo termici
        -------------------------------------------------------------------------*/
        function LoadhsGrus() {
            $("#hsGrusList").empty();
            var r = $.DataAccess.hs_Gru_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        $('#' + data[i].GruCod).on('touchstart click', function (event) {
                            gruDetail(this.id);
                        });
                        $('#' + data[i].GruCod + '_1_').on('touchstart click', function (event) {
                            gruDetail(this.id.replace("_1_", ""));
                        });

                        var txtobjName = 'txt_' + data[i].GruCod + '_STATUS';
                        var txtobj = document.getElementById(txtobjName);
                        if (txtobj) {
                            txtobj.textContent = data[i].isRunning + '%';
                        }
                        txtobjName = 'txt_' + data[i].GruCod + '_STATUS' + '_1_';
                        txtobj = document.getElementById(txtobjName);
                        if (txtobj) {
                            txtobj.textContent = data[i].isRunning + '%';
                        }


                        var objName = data[i].CalCod + '_STATUS';
                        var obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }
                        objName = data[i].CalCod + '_STATUS' + '_1_';
                        obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }

                        var isRunName = data[i].GruCod + '_RUN';
                        var isRun = document.getElementById(isRunName);
                        if (isRun) {
                            runningObj.push({
                                'id': isRunName,
                                'transform': isRun.getAttribute("transform"),
                                'run': data[i].isRunning
                            });
                            isRun.currentTheta = 0;
                        }
                        isRunName = data[i].GruCod + '_RUN' + '_1_';
                        isRun = document.getElementById(isRunName);
                        if (isRun) {
                            runningObj.push({
                                'id': isRunName,
                                'transform': isRun.getAttribute("transform"),
                                'run': data[i].isRunning
                            });
                            isRun.currentTheta = 0;
                        }

                        elements.push({
                            'code': data[i].GruCod,
                            'type': 'CAL'
                        });

                    } //end for
                }
            });
        }

        function gruDetail(gruCod) { }
        /*-----------------------------------------------------------------------*/

        /*
        Boilers
        ------------------------------------------------------------------------*/
        function loadBoilers() {
            $("#boilersList").empty();
            var r = $.DataAccess.hs_Cal_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    for (var i = 0; i < data.length; i++) {

                        $('#' + data[i].CalCod).on('touchstart click', function (event) {
                            calDetail(this.id);
                        });
                        $('#' + data[i].CalCod + '_1_').on('touchstart click', function (event) {
                            calDetail(this.id.replace("_1_", ""));
                        });

                        var txtobjName = 'txt_' + data[i].CalCod + '_STATUS';
                        var txtobj = document.getElementById(txtobjName);
                        if (txtobj) {
                            txtobj.textContent = data[i].isRunning + '%';
                        }
                        txtobjName = 'txt_' + data[i].CalCod + '_STATUS' + '_1_';
                        txtobj = document.getElementById(txtobjName);
                        if (txtobj) {
                            txtobj.textContent = data[i].isRunning + '%';
                        }


                        var objName = data[i].CalCod + '_STATUS';
                        var obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }
                        objName = data[i].CalCod + '_STATUS' + '_1_';
                        obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }

                        var isRunName = data[i].CalCod + '_RUN';
                        var isRun = document.getElementById(isRunName);
                        if (isRun) {
                            runningObj.push({
                                'id': isRunName,
                                'transform': isRun.getAttribute("transform"),
                                'run': data[i].isRunning
                            });
                            isRun.currentTheta = 0;
                        }
                        isRunName = data[i].CalCod + '_RUN' + '_1_';
                        isRun = document.getElementById(isRunName);
                        if (isRun) {
                            runningObj.push({
                                'id': isRunName,
                                'transform': isRun.getAttribute("transform"),
                                'run': data[i].isRunning
                            });
                            isRun.currentTheta = 0;
                        }

                        elements.push({
                            'code': data[i].CalCod,
                            'type': 'CAL'
                        });
                                              

                    } //end for
                }
            });
        }

        function calDetail(CalCod) {
            $("#usermenu").empty();
            var hsId = localStorage.getItem("hsId");
            var req = $.DataAccess.hs_Cal_ReadByCalCod(hsId, CalCod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplCalDetail").tmpl(data).appendTo("#usermenu");
                    loadProbeElem(CalCod);
                    setlanguage();
                }
            });
        }
        /*----------------------------------------------------------------------*/

        /*
        Circulators
        ------------------------------------------------------------------------*/
        function loadCirculators() {           
            var r = $.DataAccess.hs_Cir_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                   
                    for (var i = 0; i < data.length; i++) {
                       
                        $('#' + data[i].CirCod).on('touchstart click', function (event) {
                            cirDetail(this.id);
                        });
                        $('#' + data[i].CirCod + '_1_').on('touchstart click', function (event) {
                            cirDetail(this.id.replace("_1_", ""));
                        });


                        var txtobjName = 'txt_' + data[i].CirCod + '_STATUS';
                        var txtobj = document.getElementById(txtobjName);
                        if (txtobj) {
                            //console.log(txtobj);
                            if (data[i].ManualMode == true) {
                                txtobj.textContent = "MANUALE";
                            }
                            else  {
                                txtobj.textContent = 'AUTO';
                            }                   
                        }
                        txtobjName = 'txt_' + data[i].CirCod + '_STATUS' + '_1_';
                        txtobj = document.getElementById(txtobjName);
                        if (txtobj) {
                            //console.log(txtobj);
                            if (data[i].ManualMode == true) {
                                txtobj.textContent = "MANUALE";
                            }
                            else {
                                txtobj.textContent = 'AUTO';
                            }
                        }

                        var objName = data[i].CirCod + '_STATUS';
                        var obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }
                        objName = data[i].CirCod + '_STATUS' + '_1_';
                        obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }
                        
                        var isRunName = data[i].CirCod + '_RUN';
                        var isRun = document.getElementById(isRunName);
                        if (isRun) {
                            runningObj.push({
                                'id': isRunName,
                                'transform': isRun.getAttribute("transform"),
                                'run': data[i].isRunning
                            });
                            isRun.currentTheta = 0;                                               
                        }
                        isRunName = data[i].CirCod + '_RUN' + '_1_';
                        isRun = document.getElementById(isRunName);
                        if (isRun) {
                            runningObj.push({
                                'id': isRunName,
                                'transform': isRun.getAttribute("transform"),
                                'run': data[i].isRunning
                            });
                            isRun.currentTheta = 0;
                        }

                        elements.push({
                            'code': data[i].CirCod,
                            'type': 'CIR'
                        });

                    } //end for

                   
                }
            });
        }

        function cirDetail(CirCod) {
            $("#usermenu").empty();
            var hsId = localStorage.getItem("hsId");
            var req = $.DataAccess.hs_Cir_ReadByCirCod(hsId, CirCod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplCirDetail").tmpl(data).appendTo("#usermenu");
                    loadProbeElem(CirCod);
                    setlanguage();
                }
            });
        }
        /*----------------------------------------------------------------------*/

        /*
        Servomotors
        ------------------------------------------------------------------------*/
        function loadServomotors() {
            $("#ServomotorsList").empty();
            var r = $.DataAccess.hs_Vrd_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    for (var i = 0; i < data.length; i++) {

                        $('#' + data[i].VrdCod).on('touchstart click', function (event) {
                            vrdDetail(this.id);
                        });
                        $('#' + data[i].VrdCod + '_1_').on('touchstart click', function (event) {
                            vrdDetail(this.id.replace("_1_", ""));
                        });

                        var txtobjName = 'txt_' + data[i].VrdCod + '_STATUS';
                        var txtobj = document.getElementById(txtobjName);
                        if (txtobj) { txtobj.textContent = data[i].Position + '%'; }
                        txtobjName = 'txt_' + data[i].VrdCod + '_STATUS' + '_1_';
                        txtobj = document.getElementById(txtobjName);
                        if (txtobj) { txtobj.textContent = data[i].Position + '%'; }


                        var objName = data[i].VrdCod + '_STATUS';
                        var obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }
                        objName = data[i].VrdCod + '_STATUS' + '_1_';
                        obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }

                        var isRunName = data[i].VrdCod + '_RUN';
                        var isRun = document.getElementById(isRunName);
                        if (isRun) {
                            runningObj.push({
                                'id': isRunName,
                                'transform': isRun.getAttribute("transform"),
                                'run': data[i].Position
                            });
                            isRun.currentTheta = 0;
                        }
                        isRunName = data[i].VrdCod + '_RUN' + '_1_';
                        isRun = document.getElementById(isRunName);
                        if (isRun) {
                            runningObj.push({
                                'id': isRunName,
                                'transform': isRun.getAttribute("transform"),
                                'run': data[i].Position
                            });
                            isRun.currentTheta = 0;
                        }

                        elements.push({
                            'code': data[i].VrdCod,
                            'type': 'VRD'
                        });

                    } //end for
                }

                var requestAnimationFrameID = requestAnimationFrame(doAnim);
            });
        }

        function vrdDetail(VrdCod) {
            $("#usermenu").empty();
            var hsId = localStorage.getItem("hsId");
            var req = $.DataAccess.hs_Vrd_ReadByVrdCod(hsId, VrdCod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplVrdDetail").tmpl(data).appendTo("#usermenu");
                    setlanguage();
                }
            });
        }
        /*----------------------------------------------------------------------*/

        /*
        Probes
        ------------------------------------------------------------------------*/
        function loadProbes() {
            $("#ProbesList").empty();
            var r = $.DataAccess.hs_TemperatureProbes_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    for (var i = 0; i < data.length; i++) {

                        $('#' + data[i].ProbeCod).on('touchstart click', function (event) {
                            TemperatureProbeDetail(this.id);
                        });
                        $('#' + data[i].ProbeCod + '_1_').on('touchstart click', function (event) {
                            TemperatureProbeDetail(this.id.replace("_1_", ""));
                        });

                        var txtobjName = 'txt_' + data[i].ProbeCod + '_STATUS';
                        var txtobj = document.getElementById(txtobjName);
                        if (txtobj) { txtobj.textContent = data[i].currentValue + '°C' }
                        txtobjName = 'txt_' + data[i].ProbeCod + '_STATUS' + '_1_';
                        txtobj = document.getElementById(txtobjName);
                        if (txtobj) { txtobj.textContent = data[i].currentValue + '°C' }

                        var objName = data[i].ProbeCod + '_STATUS';
                        var obj = document.getElementById(objName);
                        if (obj) { obj.style.fill = $verde; }
                        objName = data[i].ProbeCod + '_STATUS' + '_1_';
                        obj = document.getElementById(objName);
                        if (obj) { obj.style.fill = $verde; }

                        elements.push({
                            'code': data[i].ProbeCod,
                            'type': 'S'
                        });
                    } //end for
                }
            });
        }

        function TemperatureProbeDetail(probeCod) {
            $("#usermenu").empty();
            var hsId = localStorage.getItem("hsId");
            var req = $.DataAccess.hs_TemperatureProbes_ReadByProbeCod(hsId, probeCod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplProbeDetail").tmpl(data).appendTo("#usermenu");
                    setlanguage();
                }
            });
        }
        /*----------------------------------------------------------------------*/

        /*
        Flowmeters
        ------------------------------------------------------------------------*/
        function loadCtl() {
            $("#CtlList").empty();
            var r = $.DataAccess.hs_Ctl_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    for (var i = 0; i < data.length; i++) {

                        $('#' + data[i].CtlCod).on('touchstart click', function (event) {
                            ctlDetail(this.id);
                        });
                        $('#' + data[i].CtlCod + '_1_').on('touchstart click', function (event) {
                            ctlDetail(this.id.replace("_1_", ""));
                        });

                        var txtobjName = 'txt_' + data[i].CtlCod + '_STATUS';
                        var txtobj = document.getElementById(txtobjName);
                        if (txtobj) { txtobj.textContent = data[i].currentValue + 'L' }
                        txtobjName = 'txt_' + data[i].CtlCod + '_STATUS' + '_1_';
                        txtobj = document.getElementById(txtobjName);
                        if (txtobj) { txtobj.textContent = data[i].currentValue + 'L' }

                        var objName = data[i].CtlCod + '_STATUS';
                        var obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }
                        objName = data[i].CtlCod + '_STATUS' + '_STATUS';
                        obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }

                        elements.push({
                            'code': data[i].CtlCod,
                            'type': 'CTL'
                        });
                    } //end for
                }
            });
        }

        function ctlDetail(CtlCod) {
            $("#usermenu").empty();
            var hsId = localStorage.getItem("hsId");
            var req = $.DataAccess.hs_Ctl_ReadByCtlCod(hsId, CtlCod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplCtlDetail").tmpl(data).appendTo("#usermenu");
                    setlanguage();
                }
            });
        }
        /*----------------------------------------------------------------------*/

        /*
        Meters
        ------------------------------------------------------------------------*/
        function loadCtb() {
            $("#CtbList").empty();
            var r = $.DataAccess.hs_Ctb_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        $('#' + data[i].CtbCod).on('touchstart click', function (event) {
                            ctbDetail(this.id);
                        });
                        $('#' + data[i].CtbCod + '_1_').on('touchstart click', function (event) {
                            ctbDetail(this.id.replace("_1_", ""));
                        });


                        var txtobjName = 'txt_' + data[i].CtbCod + '_STATUS';
                        var txtobj = document.getElementById(txtobjName);
                        if (txtobj) { txtobj.textContent = data[i].currentValue }
                        txtobjName = 'txt_' + data[i].CtbCod + '_STATUS' + '_1_';
                        txtobj = document.getElementById(txtobjName);
                        if (txtobj) { txtobj.textContent = data[i].currentValue }


                        var objName = data[i].CtbCod + '_STATUS';
                        var obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }
                        var objName = data[i].CtbCod + '_STATUS' + '_1_';
                        var obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].stato == 0) {
                                obj.style.fill = $verde;
                            }
                            else if (data[i].stato == 1) {
                                obj.style.fill = $giallo;
                            }
                            else if (data[i].stato == 2) {
                                obj.style.fill = $rosso;
                            }
                            else if (data[i].stato == 3) {
                                obj.style.fill = $rosso;
                            }
                        }

                        elements.push({
                            'code': data[i].CtbCod,
                            'type': 'CTB'
                        });

                    } //end for
                }
            });
        }

        function ctbDetail(CtbCod) {
            $("#usermenu").empty();
            var hsId = localStorage.getItem("hsId");
            var req = $.DataAccess.hs_Ctb_ReadByCtbCod(hsId, CtbCod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplCtbDetail").tmpl(data).appendTo("#usermenu");
                    setlanguage();
                }
            });
        }
        /*----------------------------------------------------------------------*/

        /*
        termostati di blocco
        ------------------------------------------------------------------------*/
        function loadtb() {
            $("#tbsList").empty();
            var r = $.DataAccess.hs_tb_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    for (var i = 0; i < data.length; i++) {

                        $('#' + data[i].Cod).on('touchstart click', function (event) {
                            tbDetail(this.id);
                        });
                        $('#' + data[i].Cod + '_1_').on('touchstart click', function (event) {
                            tbDetail(this.id.replace("_1_", ""));
                        });

                        var txtobjName = 'txt_' + data[i].Cod + '_STATUS';
                        var txtobj = document.getElementById(txtobjName);
                        if (txtobj) { txtobj.textContent = data[i].currentValue }
                        txtobjName = 'txt_' + data[i].Cod + '_STATUS' + '_1_';
                        txtobj = document.getElementById(txtobjName);
                        if (txtobj) { txtobj.textContent = data[i].currentValue }

                        var objName = data[i].Cod + '_STATUS';
                        var obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].currentValue == false) {
                                obj.style.fill = $verde;
                            }
                            else {
                                obj.style.fill = $rosso;
                            }
                        }
                        objName = data[i].Cod + '_STATUS' + '_1_';
                        obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].currentValue == false) {
                                obj.style.fill = $verde;
                            }
                            else {
                                obj.style.fill = $rosso;
                            }
                        }

                        elements.push({
                            'code': data[i].Cod,
                            'type': 'TB'
                        });

                    } //end for
                }
            });
        }

        function tbDetail(Cod) {
            $("#usermenu").empty();
            var hsId = localStorage.getItem("hsId");
            var req = $.DataAccess.hs_tb_ReadByCod(hsId, Cod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmpltbDetail").tmpl(data).appendTo("#usermenu");
                    setlanguage();
                }
            });
        }
        /*----------------------------------------------------------------------*/

        /*
        pressostati di minima
        ------------------------------------------------------------------------*/
        function loadpm() {
            $("#pmsList").empty();
            var r = $.DataAccess.hs_pm_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    for (var i = 0; i < data.length; i++) {

                        $('#' + data[i].Cod).on('touchstart click', function (event) {
                            pmDetail(this.id);
                        });
                        $('#' + data[i].Cod + '_1_').on('touchstart click', function (event) {
                            pmDetail(this.id.replace("_1_", ""));
                        });

                        var txtobjName = 'txt_' + data[i].Cod + '_STATUS';
                        var txtobj = document.getElementById(txtobjName);
                        if (txtobj) { txtobj.textContent = data[i].currentValue }
                        txtobjName = 'txt_' + data[i].Cod + '_STATUS' + '_1_';
                        txtobj = document.getElementById(txtobjName);
                        if (txtobj) { txtobj.textContent = data[i].currentValue }

                        var objName = data[i].Cod + '_STATUS';
                        var obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].currentValue == false) {
                                obj.style.fill = $verde;
                            }
                            else {
                                obj.style.fill = $rosso;
                            }
                        }
                        objName = data[i].Cod + '_STATUS' + '_1_';
                        obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].currentValue == false) {
                                obj.style.fill = $verde;
                            }
                            else {
                                obj.style.fill = $rosso;
                            }
                        }

                        elements.push({
                            'code': data[i].Cod,
                            'type': 'PM'
                        });

                    } //end for
                }
            });
        }

        function pmDetail(Cod) {
            $("#usermenu").empty();
            var hsId = localStorage.getItem("hsId");
            var req = $.DataAccess.hs_pm_ReadByCod(hsId, Cod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplpmDetail").tmpl(data).appendTo("#usermenu");
                    setlanguage();
                }
            });
        }
        /*----------------------------------------------------------------------*/

        /*
        pressostati di blocco
        ------------------------------------------------------------------------*/
        function loadpb() {
            $("#pbsList").empty();
            var r = $.DataAccess.hs_pb_List(localStorage.getItem("hsId"));
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    for (var i = 0; i < data.length; i++) {

                        $('#' + data[i].Cod).on('touchstart click', function (event) {
                            pbDetail(this.id);
                        });
                        $('#' + data[i].Cod + '_1_').on('touchstart click', function (event) {
                            pbDetail(this.id.replace("_1_", ""));
                        });

                        var txtobjName = 'txt_' + data[i].Cod + '_STATUS';
                        var txtobj = document.getElementById(txtobjName);
                        if (txtobj) { txtobj.textContent = data[i].currentValue }
                        txtobjName = 'txt_' + data[i].Cod + '_STATUS' + '_1_';
                        txtobj = document.getElementById(txtobjName);
                        if (txtobj) { txtobj.textContent = data[i].currentValue }


                        var objName = data[i].Cod + '_STATUS';
                        var obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].currentValue == false) {
                                obj.style.fill = $verde;
                            }
                            else {
                                obj.style.fill = $rosso;
                            }
                        }
                        objName = data[i].Cod + '_STATUS' + '_1_';
                        obj = document.getElementById(objName);
                        if (obj) {
                            if (data[i].currentValue == false) {
                                obj.style.fill = $verde;
                            }
                            else {
                                obj.style.fill = $rosso;
                            }
                        }

                        elements.push({
                            'code': data[i].Cod,
                            'type': 'PB'
                        });

                    } //end for
                }
            });
        }

        function pbDetail(Cod) {
            $("#usermenu").empty();
            var hsId = localStorage.getItem("hsId");
            var req = $.DataAccess.hs_pb_ReadByCod(hsId, Cod);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplpbDetail").tmpl(data).appendTo("#usermenu");
                    setlanguage();
                }
            });
        }
        /*----------------------------------------------------------------------*/
        
        /*
        animazioni
        ------------------------------------------------------------------------*/
        function doAnim() {
            for (var i = 0; i < runningObj.length; i++) {
                var thetaDelta = parseFloat(runningObj[i].run / 10);
                var obj = document.getElementById(runningObj[i].id);
                if (obj) {
                    //console.log('doAnim', obj);
                    //obj.setAttribute("transform", runningObj[i].transform + " rotate(" + obj.currentTheta + "," + obj.getAttribute('cx') + "," + obj.getAttribute('cy') + ")");
                    obj.setAttribute("transform", " rotate(" + obj.currentTheta + "," + obj.getAttribute('cx') + "," + obj.getAttribute('cy') + ")");
                    obj.currentTheta += thetaDelta;
                    if (obj.currentTheta > 360) { obj.currentTheta = 0 };                   
                }
            }
            requestAnimationFrameID = requestAnimationFrame(doAnim);
        }
        /*----------------------------------------------------------------------*/
        
        /*
        azioni
        ------------------------------------------------------------------------*/
        $.fn.obj_click = function (ele, code) {
            console.log('obj_click. ' + ele + ' ' + code);
            switch (ele) {
                case "DOOR":
                    doorDetail(ele + code);
                    break;
                case "CRON":                    
                    break;
                case "GRU":
                    break;
                case "CAL":
                    calDetail(ele + code);
                    break;
                case "CIR":
                    cirDetail(ele + code);
                    break;
                case "VRD":
                    vrdDetail(ele + code);
                    break;
                case "CTL":
                    ctlDetail(ele + code);
                    break;
                case "CTB":
                    ctbDetail(ele + code);
                    break;
                case "PB":
                    pbDetail(ele + code);
                    break;
                case "PM":
                    pmDetail(ele + code);
                    break;
                case "TB":
                    tbDetail(ele + code);
                    break;
                case "S":
                    TemperatureProbeDetail(ele + code);
                    break;
            }
        }

        function manage(ele,code) {
            alert('ele=' + ele + ' code=' + code);
        }
        /*----------------------------------------------------------------------*/

        /////*
        ////debug
        ////------------------------------------------------------*/
        ////$('#btnLoad').on('click', function (e) {
        ////    $("body").addClass("loading");
        ////    loadSynoptic(localStorage.getItem("MapId"));
        ////    $('#btnLoad').hide();
        ////});
        /////*----------------------------------------------------*/

    });

});

function obj_click(ele, code) {
    //$.fn.obj_click(ele, code);
}


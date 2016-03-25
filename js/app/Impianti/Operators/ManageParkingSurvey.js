/*
Impianti Operators Add survey
------------------------------------------*/
$(function () {
    $(document).ready(function () {
        /*
        toastr
        -------------------------------------------------------------*/
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "positionClass": "toast-bottom-right",
            "onclick": null,
            "showDuration": "200",
            "hideDuration": "1000",
            "timeOut": "2000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
        /*-----------------------------------------------------------*/

        $('.tableSurveys').footable();
        $('.tableSurveys').data('page-size', 5);
        $('.tableSurveys').data('limit-navigation', 4);
        $('.tableSurveys').trigger('footable_initialized');
        LoadSurveys();
        function LoadSurveys() {
            $("#ListSurveys").empty();
            var r = $.DataAccess.Parking_Survey_List(localStorage.getItem("IdImpianto"), localStorage.getItem("IdPark"), false);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        data[i].DtOccupied = moment(data[i].DtOccupied).format('DD/MM/YYYY HH:mm');
                    }//end for
                    $("#tmplSurveysList").tmpl(data).appendTo("#ListSurveys");
                    $('table').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }

        /*
        Add
        ----------------------------------------------------------------*/
        $('#btnCallAddSurvey').on('click', function (e) {
            $('#PanelUpd').hide();
            $('#IdSurvey_Add').val('');
            $('#PanelAdd').show();
        });

        $('#btnAdd').on('click', function (e) {
            var IdSurvey = $('#IdSurvey_Add').val().trim();
            if (IdSurvey == '') {
                toastr["warning"](langResources['msg4novaliddata'], langResources['alert']);
            }
            else {
                var req = $.DataAccess.Parking_Survey_Add(localStorage.getItem('IdImpianto'), localStorage.getItem("IdPark"), IdSurvey);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        LoadSurveys();
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }
        });
        /*--------------------------------------------------------------*/

        /*
        Edit
        ----------------------------------------------------------------*/
        $.fn.callUpdateSurvey = function (PlaceId) {
            $('#PanelAdd').hide()
            
            $('#IdSurvey_Upd').val(0);
            $('#NodeId_Upd').val('');
            $('#Latitude_Upd').val('');
            $('#Longitude_Upd').val('');
            $('#AltSLM_Upd').val('');
            $('#Note_Upd').val('');

            var req = $.DataAccess.Parking_Survey_ReadByPlaceId(PlaceId);
            req.success(function (json) {
                var data = json.d;
                if (data) {
                    $('#PlaceId').val(data.PlaceId);
                    $('#IdSurvey_Upd').val(data.IdSurvey);
                    $('#NodeId_Upd').val(data.NodeId);
                    $('#Latitude_Upd').val(data.Latitude);
                    $('#Longitude_Upd').val(data.Longitude);
                    $('#AltSLM_Upd').val(data.AltSLM);
                    $('#Note_Upd').val(data.Note);
                }
            });

            $('#PanelUpd').show();
        }

        $('#btnUpd').on('click', function (e) {
            var PlaceId = $('#PlaceId').val().trim(),
                IdSurvey = $('#IdSurvey_Upd').val().trim(),
                NodeId = $('#NodeId_Upd').val(),
                Latitude = $('#Latitude_Upd').val().trim(),
                Longitude = $('#Longitude_Upd').val().trim(),
                AltSLM = $('#AltSLM_Upd').val().trim(),
                Note = $('#Note_Upd').val().trim();    

            if (IdSurvey == '') {
                toastr["warning"](langResources['msg4novaliddata'], langResources['alert']);
            }
            else {
                var req = $.DataAccess.Parking_Survey_update(PlaceId, IdSurvey, NodeId, Latitude, Longitude, AltSLM, Note);
                req.success(function (json) {
                    var data = json.d;
                    if (data == true) {
                        LoadSurveys();
                        $('#PanelUpd').hide();
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            } //if IdSurvey==''
        });
        /*--------------------------------------------------------------*/

    });//document ready
});

function callUpdateSurvey(PlaceId) {
    $.fn.callUpdateSurvey(PlaceId);
}
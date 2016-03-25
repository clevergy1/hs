$(function () {

    $(document).ready(function () {
        var ga = document.createElement("script"); 
        ga.type = 'text/javascript';
        ga.src = 'js/app/core/DataAccess.js';
        ga.id = 'DataAccess';
        document.body.appendChild(ga);
        $('#DataAccess').remove();
    });


});
$(function () {
    $(document).ready(function () {
        ImpostLang();
        //langEn
        $('.langEn').on('click', function (e) {
            localStorage.setItem("CurrentLanguage", "en");
            //langResources = getLanguageResources()["en"];
            langResources = $.languages.get()["en"];
            setlanguage();
            $('.table').trigger('footable_redraw');
            //moment.locale("en");
        });

        //langIt
        $('.langIt').on('click', function (e) {
            localStorage.setItem("CurrentLanguage", "it");
            //langResources = getLanguageResources()["it"];
            langResources = $.languages.get()["it"];           
            setlanguage();
            $('.table').trigger('footable_redraw');
            //moment.locale("it");
        });
    });
});
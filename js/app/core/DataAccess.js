(function ($) {
    $.DataAccess = (function (my) {
        //Roles
        //========================================================================================
        my.aspnetroles_Add = function (RoleName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'aspnetroles_Add',
                data: {RoleName:RoleName, DateCtrl: new Date().getTime() },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.aspnetroles_Del = function (RoleName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'aspnetroles_Del',
                data: { RoleName: RoleName, DateCtrl: new Date().getTime() },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.aspnetroles_List = function () {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'aspnetroles_List',
                data: { DateCtrl: new Date().getTime() },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.aspnetroles_ListActive = function (IdImpianto) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'aspnetroles_ListActive',
                data: {
                    IdImpianto:IdImpianto,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.aspnetroles_Update = function (RoleId,RoleName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'aspnetroles_Update',
                data: { RoleId: RoleId, RoleName:RoleName, DateCtrl: new Date().getTime() },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //Users Operations
        //========================================================================================
        my.aspnetUsers_GetUsersAll = function () {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'aspnetUsers_GetUsersAll',
                data: { DateCtrl: new Date().getTime() },
                type: 'GET',
                beforeSend: function () {},
                complete: function () {},
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.aspnetusers_GetActiveUsersByRoleName = function (RoleName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'aspnetusers_GetActiveUsersByRoleName',
                data: { RoleName: RoleName, DateCtrl: new Date().getTime() },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.aspnetusers_GetUsersByRoleName = function (RoleName, searchString, IdImpianto) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'aspnetusers_GetUsersByRoleName',
                data: {
                    RoleName: RoleName,
                    searchString: searchString,
                    IdImpianto:IdImpianto,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.aspnetusers_GetUserByUserName = function (username) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'aspnetusers_GetUserByUserName',
                data: { UserName: username, DateCtrl: new Date().getTime() },
                type: 'GET',
                beforeSend: function () { },
                complete: function () {},
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.aspnetusers_GetTotActiveUsersByRoleName = function (RoleName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'aspnetusers_GetTotActiveUsersByRoleName',
                data: {
                    RoleName: RoleName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.aspnetusers_approveUser = function (username) {
            var urlBase = $.appParms.urlBase();
            var m_key = $.appParms.key()
            var m_iv = $.appParms.iv();
            var key = CryptoJS.enc.Utf8.parse(m_key);
            var iv = CryptoJS.enc.Utf8.parse(m_iv);
            var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(username + ';'), key,
                {
                    keySize: 128 / 8,
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                });
            var tosend = encrypted.toString();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'aspnetusers_approveUser',
                data: { a: tosend },
                type: 'GET',
                beforeSend: function () {  },
                complete: function () {},
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.aspnetusers_disapproveUser = function (username) {
            var urlBase = $.appParms.urlBase();
            var m_key = $.appParms.key()
            var m_iv = $.appParms.iv();
            var key = CryptoJS.enc.Utf8.parse(m_key);
            var iv = CryptoJS.enc.Utf8.parse(m_iv);
            var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(username + ';'), key,
                {
                    keySize: 128 / 8,
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                });
            var tosend = encrypted.toString();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'aspnetusers_disapproveUser',
                data: { a: tosend },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.aspnetusers_lockUser = function (username) {
            var urlBase = $.appParms.urlBase();
            var m_key = $.appParms.key()
            var m_iv = $.appParms.iv();
            var key = CryptoJS.enc.Utf8.parse(m_key);
            var iv = CryptoJS.enc.Utf8.parse(m_iv);
            var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(username + ';'), key,
                {
                    keySize: 128 / 8,
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                });
            var tosend = encrypted.toString();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'aspnetusers_lockUser',
                data: { a: tosend },
                type: 'GET',
                beforeSend: function () {  },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.aspnetusers_UnlockUser = function (username) {
            var urlBase = $.appParms.urlBase();
            var m_key = $.appParms.key()
            var m_iv = $.appParms.iv();
            var key = CryptoJS.enc.Utf8.parse(m_key);
            var iv = CryptoJS.enc.Utf8.parse(m_iv);
            var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(username + ';'), key,
                {
                    keySize: 128 / 8,
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                });
            var tosend = encrypted.toString();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'aspnetusers_UnlockUser',
                data: { a: tosend },
                type: 'GET',
                beforeSend: function () {  },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.aspnetusers_removeUser = function (username) {
            var urlBase = $.appParms.urlBase();
            var m_key = $.appParms.key()
            var m_iv = $.appParms.iv();
            var key = CryptoJS.enc.Utf8.parse(m_key);
            var iv = CryptoJS.enc.Utf8.parse(m_iv);
            var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(username + ';'), key,
                {
                    keySize: 128 / 8,
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                });
            var tosend = encrypted.toString();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'aspnetusers_removeUser',
                data: { a: tosend },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.aspnetusers_changeUserPass = function (username, password, newpassword) {
            var urlBase = $.appParms.urlBase();
            var m_key = $.appParms.key()
            var m_iv = $.appParms.iv();
            var key = CryptoJS.enc.Utf8.parse(m_key);
            var iv = CryptoJS.enc.Utf8.parse(m_iv);
            var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(username + ';' + password + ';' + newpassword + ';'), key,
                {
                    keySize: 128 / 8,
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                });
            var tosend = encrypted.toString();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'aspnetusers_changeUserPass',
                data: { a: tosend },
                type: 'GET',
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.aspnetusers_AddUser = function (UserName, Password, UserRole, UserComment, UserEmail) {
            var urlBase = $.appParms.urlBase();
            var m_key = $.appParms.key()
            var m_iv = $.appParms.iv();
            var key = CryptoJS.enc.Utf8.parse(m_key);
            var iv = CryptoJS.enc.Utf8.parse(m_iv);
            var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(UserName + ';' + Password + ';' + UserRole + ';' + UserComment + ';' + UserEmail + ';'), key,
            {
                keySize: 128 / 8,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            var tosend = encrypted.toString();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'aspnetusers_AddUser',
                data: { a: tosend },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.aspnetusers_UpdUser = function (UserName, UserComment, UserEmail) {
            var urlBase = $.appParms.urlBase();
            var m_key = $.appParms.key()
            var m_iv = $.appParms.iv();
            var key = CryptoJS.enc.Utf8.parse(m_key);
            var iv = CryptoJS.enc.Utf8.parse(m_iv);
            var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(UserName + ';' + UserComment + ';' + UserEmail + ';'), key,
            {
                keySize: 128 / 8,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            var tosend = encrypted.toString();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'aspnetusers_UpdUser',
                data: { a: tosend },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        }
        my.aspnetusers_userok = function (UserId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'aspnetusers_userok',
                data: { UserId: UserId, DateCtrl: new Date().getTime() },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.aspnetusers_getUserO = function (UserId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'aspnetusers_getUserO',
                data: { UserId: UserId, DateCtrl: new Date().getTime() },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.aspnetusers_getUserS = function (UserId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'aspnetusers_getUserS',
                data: { UserId: UserId, DateCtrl: new Date().getTime() },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.logA = function (username, password) {
            var m_key = $.appParms.key()
            var m_iv = $.appParms.iv();
            var key = CryptoJS.enc.Utf8.parse(m_key);
            var iv = CryptoJS.enc.Utf8.parse(m_iv);
            var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(username + ';' + password + ';' + new Date().getTime() + ';'), key,
                {
                    keySize: 128 / 8,
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                });

            var tosend = encrypted.toString();
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'logA',
                data: { a: tosend },
                type: 'GET',
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.logO = function (username, password) {
            var m_key = $.appParms.key()
            var m_iv = $.appParms.iv();
            var key = CryptoJS.enc.Utf8.parse(m_key);
            var iv = CryptoJS.enc.Utf8.parse(m_iv);
            var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(username + ';' + password + ';' + new Date().getTime() + ';'), key,
                {
                    keySize: 128 / 8,
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                });

            var tosend = encrypted.toString();
            var urlBase = $.appParms.urlBase(); // $.appParms.urlGlobal();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'logO',
                data: { a: tosend },
                type: 'get',
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.logS = function (username, password) {
            var m_key = $.appParms.key()
            var m_iv = $.appParms.iv();
            var key = CryptoJS.enc.Utf8.parse(m_key);
            var iv = CryptoJS.enc.Utf8.parse(m_iv);
            var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(username + ';' + password + ';' + new Date().getTime() + ';'), key,
                {
                    keySize: 128 / 8,
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                });

            var tosend = encrypted.toString();
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'logS',
                data: { a: tosend },
                type: 'GET',
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        // usersstat
        //========================================================================================
        my.aspnetusersstat_Read = function () {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'aspnetusersstat_Read',
                data: { DateCtrl: new Date().getTime() },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                success: function (json) {
                    data = json.d;
                },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax 
        }
        //========================================================================================

        //dbstats
        //========================================================================================
        my.dbstats_Read = function () {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'dbstats_Read',
                data: { DateCtrl: new Date().getTime() },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                success: function (json) {
                    data = json.d;
                },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax 
        }
        //========================================================================================

        //dbActivityMonitor
        //========================================================================================
        my.dbActivityMonitor_List = function () {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'dbActivityMonitor_List',
                data: { DateCtrl: new Date().getTime() },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                success: function (json) {
                    data = json.d;
                },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax 
        }
        //========================================================================================

        //Impianti
        //========================================================================================
        my.Impianti_Add = function (DesImpianto, Indirizzo, Latitude, Longitude, AltSLM, Controllato, Innowatio) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Impianti_Add',
                data: {
                    DesImpianto: DesImpianto,
                    Indirizzo: Indirizzo,
                    Latitude: Latitude,
                    Longitude: Longitude,
                    AltSLM: AltSLM,
                    Controllato: Controllato,
                    Innowatio: Innowatio,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Impianti_Read = function (IdImpianto) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Impianti_Read',
                data: { IdImpianto: IdImpianto, DateCtrl: new Date().getTime() },
                type: 'GET',
                beforeSend: function () { },
                complete: function () {  },
                success: function (json) {
                    data = json.d;
                },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax                 
        };
        my.Impianti_List = function (searchString) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Impianti_List',
                data: {
                    searchString:searchString,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () {  },
                complete: function () {  },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Impianti_ListByUser = function (UserId,searchString) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Impianti_ListByUser',
                data: {
                    UserId:UserId,
                    searchString: searchString,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Impianti_ListPaged = function (id, searchString) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Impianti_ListPaged',
                data: {id:id, searchString:searchString, DateCtrl: new Date().getTime() },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Impianti_setControllato = function (IdImpianto, Controllato) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Impianti_setControllato',
                data: { IdImpianto: IdImpianto, Controllato: Controllato,  DateCtrl: new Date().getTime() },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Impianti_setInnowatio = function (IdImpianto, Innowatio) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Impianti_setInnowatio',
                data: { IdImpianto: IdImpianto, Innowatio: Innowatio, DateCtrl: new Date().getTime() },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Impianti_UpdAddress = function (IdImpianto, Indirizzo, LatLong) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Impianti_UpdAddress',
                data: { IdImpianto: IdImpianto, Indirizzo: Indirizzo, LatLong: LatLong, DateCtrl: new Date().getTime() },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () {  },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Impianti_Upd = function (IdImpianto, DesImpianto, Indirizzo, Latitude, Longitude, AltSLM, Controllato, Innowatio) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Impianti_Upd',
                data: {
                    IdImpianto: IdImpianto,
                    DesImpianto: DesImpianto,
                    Indirizzo: Indirizzo,
                    Latitude: Latitude,
                    Longitude: Longitude,
                    AltSLM: AltSLM,
                    Controllato: Controllato,
                    Innowatio: Innowatio,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //Impianti_contatti
        //========================================================================================
        my.Impianti_Contatti_Add = function (IdImpianto, Descrizione, Indirizzo, Nome, TelFisso, TelMobile, emailaddress) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Impianti_Contatti_Add',
                data: {
                    IdImpianto: IdImpianto,
                    Descrizione: Descrizione,
                    Indirizzo: Indirizzo,
                    Nome: Nome,
                    TelFisso: TelFisso,
                    TelMobile: TelMobile,
                    emailaddress: emailaddress,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Impianti_Contatti_Del = function (IdContatto) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Impianti_Contatti_Del',
                data: {
                    IdContatto: IdContatto,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Impianti_Contatti_List = function (IdImpianto) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Impianti_Contatti_List',
                data: {
                    IdImpianto: IdImpianto,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Impianti_Contatti_Read = function (IdContatto) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Impianti_Contatti_Read',
                data: {
                    IdContatto: IdContatto,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Impianti_Contatti_Update = function (IdContatto, Descrizione, Indirizzo, Nome, TelFisso, TelMobile, emailaddress) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Impianti_Contatti_Update',
                data: {
                    IdContatto: IdContatto,
                    Descrizione: Descrizione,
                    Indirizzo: Indirizzo,
                    Nome: Nome,
                    TelFisso: TelFisso,
                    TelMobile: TelMobile,
                    emailaddress: emailaddress,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //FieldDevices
        //========================================================================================
        my.Impianti_FieldDevices_List = function (IdImpianto) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Impianti_FieldDevices_List',
                data: { IdImpianto: IdImpianto, DateCtrl: new Date().getTime() },
                type: 'GET',
                beforeSend: function () { },
                complete: function () {  },
                success: function (json) {
                    data = json.d;
                },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax   
        };
        my.Impianti_FieldDevices_Add = function (IdImpianto, DevId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Impianti_FieldDevices_Add',
                data: {
                    IdImpianto: IdImpianto,
                    DevId:DevId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                success: function (json) {
                    data = json.d;
                },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax   
        };
        my.Impianti_FieldDevices_Del = function (IdImpianto, DevId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Impianti_FieldDevices_Del',
                data: {
                    IdImpianto: IdImpianto,
                    DevId: DevId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                success: function (json) {
                    data = json.d;
                },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax   
        };
        //========================================================================================

        //Impianti users
        //========================================================================================
        my.Impianti_Users_Add = function (IdImpianto, UserId, IdMaster) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Impianti_Users_Add',
                data: {
                    IdImpianto: IdImpianto,
                    UserId: UserId,
                    IdMaster: IdMaster,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Impianti_Users_Del = function (IdImpianto, UserId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Impianti_Users_Del',
                data: {
                    IdImpianto: IdImpianto,
                    UserId: UserId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Impianti_Users_List = function (UserId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Impianti_Users_List',
                data: {
                    UserId: UserId,                    
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Impianti_Users_Read = function (IdImpianto, UserId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Impianti_Users_Read',
                data: {
                    IdImpianto: IdImpianto,
                    UserId: UserId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Impianti_Users_Upd = function (IdImpianto, UserId, IsMaster) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Impianti_Users_Upd',
                data: {
                    IdImpianto: IdImpianto,
                    UserId: UserId,
                    IsMaster: IsMaster,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //Impianti UserDevices
        //========================================================================================
        my.Impianti_UserDevices_Add = function (IdImpianto, UserId, DevId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Impianti_UserDevices_Add',
                data: {
                    IdImpianto: IdImpianto,
                    UserId: UserId,
                    DevId: DevId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Impianti_UserDevices_Del = function (id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Impianti_UserDevices_Del',
                data: {
                    id: id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Impianti_UserDevices_List = function (IdImpianto, UserId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Impianti_UserDevices_List',
                data: {
                    IdImpianto: IdImpianto,
                    UserId: UserId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Impianti_UserDevices_Read = function (id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Impianti_UserDevices_Read',
                data: {
                    id: id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //Impianti Remote connections
        //========================================================================================
        my.Impianti_RemoteConnections_Add = function (IdImpianto, Descr, remoteaddress, connectionType, NoteInterne) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Impianti_RemoteConnections_Add',
                data: {
                    IdImpianto: IdImpianto,
                    Descr: Descr,
                    remoteaddress: remoteaddress,
                    connectionType: connectionType,
                    NoteInterne:NoteInterne,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Impianti_RemoteConnections_Del = function (IdImpianto, IdAddress) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Impianti_RemoteConnections_Del',
                data: {
                    IdImpianto: IdImpianto,
                    IdAddress: IdAddress,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Impianti_RemoteConnections_List = function (IdImpianto) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Impianti_RemoteConnections_List',
                data: {
                    IdImpianto: IdImpianto,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Impianti_RemoteConnections_Read = function (IdImpianto, IdAddress) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Impianti_RemoteConnections_Read',
                data: {
                    IdImpianto: IdImpianto,
                    IdAddress: IdAddress,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Impianti_RemoteConnections_Upd = function (IdImpianto, IdAddress, Descr, remoteaddress, connectionType, NoteInterne) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Impianti_RemoteConnections_Upd',
                data: {
                    IdImpianto: IdImpianto,
                    IdAddress: IdAddress,
                    Descr: Descr,
                    remoteaddress: remoteaddress,
                    connectionType: connectionType,
                    NoteInterne:NoteInterne,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //Ambienti
        //========================================================================================
        my.Ambienti_List = function (IdImpianto, OwnerId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Ambienti_List',
                data: { IdImpianto: IdImpianto,OwnerId:OwnerId, DateCtrl: new Date().getTime() },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                success: function (json) {
                    data = json.d;
                },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax   
        };
        //========================================================================================

        //BodiesLamps
        //========================================================================================
        my.BodiesLamps_ListAll = function (IdImpianto, searchstring) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'BodiesLamps_ListAll',
                data: { IdImpianto: IdImpianto, searchstring: searchstring, DateCtrl: new Date().getTime() },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                success: function (json) {
                    data = json.d;
                },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax   
        };
        my.BodiesLamps_ListAllIP1 = function (IdImpianto, searchstring) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'BodiesLamps_ListAllIP1',
                data: { IdImpianto: IdImpianto, searchstring: searchstring, DateCtrl: new Date().getTime() },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                success: function (json) {
                    data = json.d;
                },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax   
        };
        my.BodiesLamps_ListAllIP2 = function (IdImpianto, searchstring) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'BodiesLamps_ListAllIP2',
                data: { IdImpianto: IdImpianto, searchstring: searchstring, DateCtrl: new Date().getTime() },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                success: function (json) {
                    data = json.d;
                },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax   
        };
        my.BodiesLamp_GetLamp = function (IdImpianto, IdScheda) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'BodiesLamp_GetLamp',
                data: {
                    IdImpianto: IdImpianto,
                    IdScheda: IdScheda,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                success: function (json) {
                    data = json.d;
                },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax   
        };
        //========================================================================================

        //tbFieldDevices
        //========================================================================================
        my.tbFieldDevices_List = function () {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'tbFieldDevices_List',
                data: {  DateCtrl: new Date().getTime() },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                success: function (json) {
                    data = json.d;
                },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax   
        };
        //========================================================================================

        //HeatingSystem
        //========================================================================================
        my.HeatingSystem_Add = function (IdImpianto, Descr, Indirizzo, Latitude, Longitude, AltSLM, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'HeatingSystem_Add',
                data: {
                    IdImpianto: IdImpianto,
                    Descr: Descr,
                    Indirizzo: Indirizzo,
                    Latitude: Latitude,
                    Longitude: Longitude,
                    AltSLM: AltSLM,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.HeatingSystem_Del = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'HeatingSystem_Del',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.HeatingSystem_getTotMap = function (IdImpianto) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'HeatingSystem_getTotMap',
                data: {
                    IdImpianto: IdImpianto,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.HeatingSystem_List = function (IdImpianto) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'HeatingSystem_List',
                data: {
                    IdImpianto: IdImpianto,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.HeatingSystem_ListEnabled = function (IdImpianto) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'HeatingSystem_ListEnabled',
                data: {
                    IdImpianto: IdImpianto,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.HeatingSystem_Read = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'HeatingSystem_Read',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.HeatingSystem_setNote = function (hsId, Note, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'HeatingSystem_setNote',
                data: {
                    hsId: hsId,
                    Note: Note,
                    UserName:UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.HeatingSystem_Update = function (hsId, Descr, Indirizzo, Latitude, Longitude, AltSLM, VPNConnectionId,MapId, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'HeatingSystem_Update',
                data: {
                    hsId: hsId,
                    Descr: Descr,
                    Indirizzo: Indirizzo,
                    Latitude: Latitude,
                    Longitude: Longitude,
                    AltSLM: AltSLM,
                    VPNConnectionId: VPNConnectionId,
                    MapId: MapId,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.HeatingSystem_setMaintenanceMode = function (hsId, MaintenanceMode) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'HeatingSystem_setMaintenanceMode',
                data: {
                    hsId: hsId,
                    MaintenanceMode: MaintenanceMode,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.HeatingSystem_setIwMonitoring = function (hsId, IwMonitoringId, IwMonitoringDes) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'HeatingSystem_setIwMonitoring',
                data: {
                    hsId: hsId,
                    IwMonitoringId: IwMonitoringId,
                    IwMonitoringDes: IwMonitoringDes,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.HeatingSystem_setIsEnabled = function (hsId, isEnabled) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'HeatingSystem_setIsEnabled',
                data: {
                    hsId: hsId,
                    isEnabled: isEnabled,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.HeatingSystem_resetSystemStatus = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'HeatingSystem_resetSystemStatus',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.HeatingSystem_requestLog = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'HeatingSystem_requestLog',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //HeatingSystem_Param
        //========================================================================================
        my.HeatingSystem_Param_Read = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'HeatingSystem_Param_Read',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.HeatingSystem_Param_Get_ALARM_threshold = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'HeatingSystem_Param_Get_ALARM_threshold',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.HeatingSystem_Param_Set_ALARM_threshold = function (hsId, Allarmi_TempoAvvioCal, Allarmi_SogliaTemp, Allarmi_kScambiatore) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'HeatingSystem_Param_Set_ALARM_threshold',
                data: {
                    hsId: hsId,
                    Allarmi_TempoAvvioCal: Allarmi_TempoAvvioCal, 
                    Allarmi_SogliaTemp: Allarmi_SogliaTemp, 
                    Allarmi_kScambiatore: Allarmi_kScambiatore,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.HeatingSystem_Param_Get_antifreeze = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'HeatingSystem_Param_Get_antifreeze',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.HeatingSystem_Param_Set_antifreeze = function (hsId, Antigelo_Soglia_start, Antigelo_Soglia_stop, Antigelo_Enabled) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'HeatingSystem_Param_Set_antifreeze',
                data: {
                    hsId: hsId,
                    Antigelo_Soglia_start: Antigelo_Soglia_start, 
                    Antigelo_Soglia_stop: Antigelo_Soglia_stop, 
                    Antigelo_Enabled: Antigelo_Enabled,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.HeatingSystem_Param_Get_Circulators_parameters = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'HeatingSystem_Param_Get_Circulators_parameters',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.HeatingSystem_Param_Set_Circulators_parameters = function (hsId, Cir_VelMin, Cir_VelMax, Cir_TempMin, Cir_TempMax) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'HeatingSystem_Param_Set_Circulators_parameters',
                data: {
                    hsId: hsId,
                    Cir_VelMin: Cir_VelMin,
                    Cir_VelMax: Cir_VelMax,
                    Cir_TempMin: Cir_TempMin,
                    Cir_TempMax: Cir_TempMax,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.HeatingSystem_Param_Get_Cascade_Boilers_parameter = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'HeatingSystem_Param_Get_Cascade_Boilers_parameter',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.HeatingSystem_Param_Set_Cascade_Boilers_parameter = function (hsId, Cascata_Temp_Errore, Cascata_Tempo_Off_Cal2, Cascata_Tempo_Errore) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'HeatingSystem_Param_Set_Cascade_Boilers_parameter',
                data: {
                    hsId: hsId,
                    Cascata_Temp_Errore: Cascata_Temp_Errore, 
                    Cascata_Tempo_Off_Cal2: Cascata_Tempo_Off_Cal2,
                    Cascata_Tempo_Errore: Cascata_Tempo_Errore,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //HeatingSystem_Param_Disabled
        //========================================================================================
        my.HeatingSystem_Param_Disabled_Add = function (hsId, ConfigType) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'HeatingSystem_Param_Disabled_Add',
                data: {
                    hsId: hsId,
                    ConfigType: ConfigType,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.HeatingSystem_Param_Disabled_Del = function (hsId, ConfigType) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'HeatingSystem_Param_Disabled_Del',
                data: {
                    hsId: hsId,
                    ConfigType: ConfigType,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.HeatingSystem_Param_Disabled_List = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'HeatingSystem_Param_Disabled_List',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.HeatingSystem_Param_Disabled_Read = function (hsId, ConfigType) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'HeatingSystem_Param_Disabled_Read',
                data: {
                    hsId: hsId,
                    ConfigType: ConfigType,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //hs_businesshour
        //========================================================================================
        my.hs_businesshour_Add = function (hsId, isClosedTime, Subject, StartDate, EndDate, chkMonday, chkTuesday, chkWednesday, chkThursday, chkFriday, chkSaturday, chkSunday) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_businesshour_Add',
                data: {
                    hsId: hsId,
                    isClosedTime: isClosedTime,
                    Subject: Subject,
                    StartDate: StartDate,
                    EndDate: EndDate,
                    chkMonday: chkMonday,
                    chkTuesday: chkTuesday,
                    chkWednesday: chkWednesday,
                    chkThursday: chkThursday,
                    chkFriday: chkFriday,
                    chkSaturday: chkSaturday,
                    chkSunday: chkSunday,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_businesshour_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_businesshour_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_businesshour_List = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_businesshour_List',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_businesshour_ListByMonth = function (hsId, calYear, calMonth) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_businesshour_ListByMonth',
                data: {
                    hsId: hsId,
                    calYear: calYear,
                    calMonth: calMonth,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_businesshour_ListCurrent = function (hsId, selDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_businesshour_ListCurrent',
                data: {
                    hsId: hsId,
                    selDate: selDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_businesshour_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_businesshour_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_businesshour_Update = function (Id, isClosedTime, Subject, StartDate, EndDate, chkMonday, chkTuesday, chkWednesday, chkThursday, chkFriday, chkSaturday, chkSunday) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_businesshour_Update',
                data: {
                    Id: Id,
                    isClosedTime: isClosedTime,
                    Subject: Subject,
                    StartDate: StartDate,
                    EndDate: EndDate,
                    chkMonday: chkMonday,
                    chkTuesday: chkTuesday,
                    chkWednesday: chkWednesday,
                    chkThursday: chkThursday,
                    chkFriday: chkFriday,
                    chkSaturday: chkSaturday,
                    chkSunday: chkSunday,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //hs_ErroCodes
        //========================================================================================
        my.hs_ErrorCodes_Add = function (elementCode, errorCode, errorLevel, DescIT, DescEN) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_ErrorCodes_Add',
                data: {
                    elementCode: elementCode,
                    errorCode: errorCode,
                    errorLevel: errorLevel,
                    DescIT: DescIT,
                    DescEN: DescEN,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_ErrorCodes_Del = function (elementCode, errorCode) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_ErrorCodes_Del',
                data: {
                    elementCode: elementCode,
                    errorCode: errorCode,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_ErrorCodes_List = function (elementCode) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_ErrorCodes_List',
                data: {
                    elementCode: elementCode,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_ErrorCodes_Read = function (elementCode, errorCode) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_ErrorCodes_Read',
                data: {
                    elementCode: elementCode,
                    errorCode: errorCode,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_ErrorCodes_Update = function (elementCode, errorCode, errorLevel, DescIT, DescEN) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_ErrorCodes_Update',
                data: {
                    elementCode: elementCode,
                    errorCode: errorCode,
                    errorLevel: errorLevel,
                    DescIT: DescIT,
                    DescEN: DescEN,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //hs_Elem
        //========================================================================================
        my.hs_Elem_Read = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Elem_Read',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //tbhsElem
        my.tbhsElem_List = function () {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'tbhsElem_List',
                data: {
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //hs_Docs
        //========================================================================================
        my.hs_Docs_Add = function (hsId, DocName, ContentType, DocSize, BinaryData, Creator) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Docs_Add',
                data: {
                    hsId: hsId,
                    DocName: DocName,
                    ContentType: ContentType,
                    DocSize: DocSize,
                    BinaryData: BinaryData,
                    Creator: Creator,                    
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Docs_Del = function (IdDoc) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Docs_Del',
                data: {
                    IdDoc: IdDoc,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Docs_List = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Docs_List',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Docs_Read = function (IdDoc) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Docs_Read',
                data: {
                    IdDoc: IdDoc,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_DocsgetTot = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_DocsgetTot',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Docs_getBinaryData = function (IdDoc) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Docs_getBinaryData',
                data: {
                    IdDoc: IdDoc,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Docs_setBinaryData = function (IdDoc, BinaryData, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Docs_getBinaryData',
                data: {
                    IdDoc: IdDoc,
                    BinaryData: BinaryData,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Docs_Update = function (IdDoc, DocName, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Docs_Update',
                data: {
                    IdDoc: IdDoc,
                    DocName: DocName,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //hs_Maps
        //========================================================================================
        my.hs_Maps_Add = function (IdImpianto, MapDesc, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Maps_Add',
                data: {
                    IdImpianto: IdImpianto,
                    MapDesc: MapDesc,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Maps_Del = function (MapId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Maps_Del',
                data: {
                    MapId: MapId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Maps_getMap = function (MapId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Maps_getMap',
                data: {
                    MapId: MapId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Maps_List = function (IdImpianto) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Maps_List',
                data: {
                    IdImpianto: IdImpianto,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Maps_Read = function (MapId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Maps_Read',
                data: {
                    MapId: MapId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Maps_setMap = function (MapId, MapData, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Maps_setMap',
                data: {
                    MapId: MapId,
                    MapData: MapData,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Maps_Update = function (MapId, MapDesc, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Maps_Update',
                data: {
                    MapId: MapId,
                    MapDesc: MapDesc,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //hs_Tickets
        //========================================================================================
        my.hs_Tickets_Add = function (hsId, TicketTitle, Requester, emailRequester, Description, Executor, emailExecutor, UserName, TicketType) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Tickets_Add',
                data: {
                    hsId: hsId,
                    TicketTitle: TicketTitle,
                    Requester: Requester,
                    emailRequester: emailRequester,
                    Description: Description,
                    Executor: Executor,
                    emailExecutor: emailExecutor,
                    UserName: UserName,
                    TicketType: TicketType,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Tickets_Del = function (TicketId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Tickets_Del',
                data: {
                    TicketId: TicketId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Tickets_getTotOpen = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Tickets_getTotOpen',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Tickets_List = function (hsId, TicketStatus, searchString) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Tickets_List',
                data: {
                    hsId: hsId,
                    TicketStatus: TicketStatus,
                    searchString:searchString,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Tickets_ListPaged = function (hsId, TicketStatus, searchString, RowNumber) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Tickets_ListPaged',
                data: {
                    hsId: hsId,
                    TicketStatus: TicketStatus,
                    searchString: searchString,
                    RowNumber:RowNumber,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Tickets_Read = function (TicketId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Tickets_Read',
                data: {
                    TicketId: TicketId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Tickets_Update = function (TicketId, TicketTitle, Requester, emailRequester, Description, Executor, emailExecutor, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Tickets_Update',
                data: {
                    TicketId: TicketId,
                    TicketTitle: TicketTitle,
                    Requester: Requester,
                    emailRequester: emailRequester,
                    Description: Description,
                    Executor: Executor,
                    emailExecutor: emailExecutor,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Tickets_ChangeStatus = function (TicketId, DateExecution, ExecutorComment, TicketStatus) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Tickets_ChangeStatus',
                data: {
                    TicketId: TicketId,
                    DateExecution: DateExecution,
                    ExecutorComment: ExecutorComment,
                    TicketStatus: TicketStatus,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_Tickets_Requesters
        //========================================================================================
        my.hs_Tickets_Requesters_Add = function (hsId, IdContatto) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Tickets_Requesters_Add',
                data: {
                    hsId: hsId,
                    IdContatto: IdContatto,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Tickets_Requesters_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Tickets_Requesters_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Tickets_Requesters_List = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Tickets_Requesters_List',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Tickets_Requesters_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Tickets_Requesters_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //hs_Tickets_Executors
        //========================================================================================
        my.hs_Tickets_Executors_Add = function (hsId, IdContatto) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Tickets_Executors_Add',
                data: {
                    hsId: hsId,
                    IdContatto: IdContatto,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Tickets_Executors_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Tickets_Executors_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Tickets_Executors_List = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Tickets_Executors_List',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Tickets_Executors_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Tickets_Executors_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //hs_controller
        //========================================================================================
        my.hs_Controller_Add = function (hsId, ControllerDescr, NoteInterne, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Controller_Add',
                data: {
                    hsId: hsId,
                    ControllerDescr: ControllerDescr,
                    NoteInterne: NoteInterne,
                    UserName:UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Controller_Del = function (ControllerId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Controller_Del',
                data: {
                    ControllerId: ControllerId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Controller_List = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Controller_List',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Controller_Read = function (ControllerId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Controller_Read',
                data: {                   
                    ControllerId: ControllerId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Controller_Update = function (ControllerId, ControllerDescr, NoteInterne, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Controller_Update',
                data: {                   
                    ControllerId: ControllerId,
                    ControllerDescr: ControllerDescr,
                    NoteInterne: NoteInterne,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //hs_controllerDetail
        //========================================================================================
        my.hs_ControllerDetail_Add = function (ControllerId, Descr, NoteInterne, qta, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_ControllerDetail_Add',
                data: {
                    ControllerId: ControllerId,
                    Descr: Descr,
                    NoteInterne: NoteInterne,
                    qta: qta,
                    UserName:UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_ControllerDetail_Del = function (id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_ControllerDetail_Del',
                data: {
                    id: id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_ControllerDetail_List = function (ControllerId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_ControllerDetail_List',
                data: {
                    ControllerId: ControllerId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_ControllerDetail_Read = function (id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_ControllerDetail_Read',
                data: {
                    id: id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_ControllerDetail_Update = function (id, Descr, NoteInterne, qta, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_ControllerDetail_Update',
                data: {
                    id: id,
                    Descr: Descr,
                    NoteInterne: NoteInterne,
                    qta: qta,
                    UserName:UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //hs_Anz (Analizzatori di rete)
        //========================================================================================
        my.hs_Anz_Add = function (hsId, Cod, Descr, UserName, marcamodello, installationDate, NoteInterne) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Anz_Add',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    Descr: Descr,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    NoteInterne: NoteInterne,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: true,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Anz_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Anz_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: true,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Anz_List = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Anz_List',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Anz_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Anz_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Anz_ReadByCod = function (hsId, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Anz_ReadByCod',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Anz_ReadByCodSync = function (hsId, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Anz_ReadByCod',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Anz_Update = function (Id, Cod, Descr, UserName, marcamodello, installationDate, NoteInterne) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Anz_Update',
                data: {
                    Id: Id,
                    Cod: Cod,
                    Descr: Descr,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    NoteInterne: NoteInterne,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Anz_UpdateMarcamodello = function (Id, marcamodello, installationDate, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Anz_UpdateMarcamodello',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Anz_setGeoLocation = function (Id, Latitude, Longitude) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Anz_setGeoLocation',
                data: {
                    Id: Id,
                    Latitude: Latitude,
                    Longitude: Longitude,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_Anz_replacement_history (analizzatori di rete SDIN)
        //========================================================================================
        my.hs_Anz_replacement_history_Add = function (ParentId, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Anz_replacement_history_Add',
                data: {
                    ParentId: ParentId,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Anz_replacement_history_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Anz_replacement_history_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Anz_replacement_history_List = function (ParentId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Anz_replacement_history_List',
                data: {
                    ParentId: ParentId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Anz_replacement_history_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Anz_replacement_history_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Anz_replacement_history_Update = function (Id, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Anz_replacement_history_Update',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //hs_Cal (Caldaie)
        //========================================================================================
        my.hs_Cal_Add = function (hsId, CalCod, CalDescr, NoteInterne, UserName, marcamodello, installationDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cal_Add',
                data: {
                    hsId: hsId,
                    CalCod: CalCod,
                    CalDescr: CalDescr,
                    NoteInterne: NoteInterne,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cal_Del = function (CalId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cal_Del',
                data: {
                    CalId: CalId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cal_List = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cal_List',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cal_Read = function (CalId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cal_Read',
                data: {
                    CalId: CalId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cal_ReadByCalCod = function (hsId, CalCod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cal_ReadByCalCod',
                data: {
                    hsId: hsId,
                    CalCod: CalCod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cal_ReadByCalCodSync = function (hsId, CalCod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cal_ReadByCalCod',
                data: {
                    hsId: hsId,
                    CalCod: CalCod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cal_Update = function (CalId, CalCod, CalDescr, NoteInterne, UserName, marcamodello, installationDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cal_Update',
                data: {
                    CalId: CalId,
                    CalCod: CalCod,
                    CalDescr: CalDescr,
                    NoteInterne: NoteInterne,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cal_UpdateMarcamodello = function (Id, marcamodello, installationDate, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cal_UpdateMarcamodello',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cal_setGeoLocation = function (CalId, Latitude, Longitude) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cal_setGeoLocation',
                data: {
                    CalId: CalId,
                    Latitude: Latitude,
                    Longitude: Longitude,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cal_getDelayOnOff = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cal_getDelayOnOff',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cal_setDelayOnOff = function (Id, TempoOn, TempoOff) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cal_setDelayOnOff',
                data: {
                    Id: Id,
                    TempoOn: TempoOn,
                    TempoOff: TempoOff,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cal_tryRearm = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cal_tryRearm',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_Cal_replacement_history 
        //========================================================================================
        my.hs_Cal_replacement_history_Add = function (ParentId, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cal_replacement_history_Add',
                data: {
                    ParentId: ParentId,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cal_replacement_history_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cal_replacement_history_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cal_replacement_history_List = function (ParentId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cal_replacement_history_List',
                data: {
                    ParentId: ParentId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cal_replacement_history_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cal_replacement_history_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cal_replacement_history_Update = function (Id, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cal_replacement_history_Update',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        
        //========================================================================================
        //hs_cal_currentCC (caldaia curva climatica corrente)
        my.hs_cal_currentCC_Get = function (hsId, CalCod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cal_currentCC_Get',
                data: {
                    hsId: hsId,
                    CalCod: CalCod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_cal_currentCC_set = function (CalId, ccId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cal_currentCC_set',
                data: {
                    CalId: CalId,
                    ccId: ccId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //hs_Cal_CC (curve climatiche Caldaie)
        //========================================================================================
        my.hs_Cal_CC_Add = function (CalId, descr, Tamb1, Tset1, Tamb2, Tset2, Tamb3, Tset3, Tamb4, Tset4, Tamb5, Tset5) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cal_CC_Add',
                data: {
                    CalId: CalId,
                    descr: descr,
                    Tamb1: Tamb1,
                    Tset1: Tset1,
                    Tamb2: Tamb2,
                    Tset2: Tset2,
                    Tamb3: Tamb3,
                    Tset3: Tset3,
                    Tamb4: Tamb4,
                    Tset4: Tset4,
                    Tamb5: Tamb5,
                    Tset5: Tset5,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cal_CC_Del = function (ccId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cal_CC_Del',
                data: {
                    ccId: ccId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cal_CC_List = function (CalId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cal_CC_List',
                data: {
                    CalId: CalId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cal_CC_Read = function (ccId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cal_CC_Read',
                data: {
                    ccId: ccId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cal_CC_Update = function (ccId, descr, Tamb1, Tset1, Tamb2, Tset2, Tamb3, Tset3, Tamb4, Tset4, Tamb5, Tset5) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cal_CC_Update',
                data: {
                    ccId: ccId,
                    descr: descr,
                    Tamb1: Tamb1,
                    Tset1: Tset1,
                    Tamb2: Tamb2,
                    Tset2: Tset2,
                    Tamb3: Tamb3,
                    Tset3: Tset3,
                    Tamb4: Tamb4,
                    Tset4: Tset4,
                    Tamb5: Tamb5,
                    Tset5: Tset5,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //hs_CalCron
        //========================================================================================
        my.hs_CalCron_Add = function (Calid, CronId, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_CalCron_Add',
                data: {
                    Calid: Calid,
                    CronId: CronId,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_CalCron_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_CalCron_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_CalCron_List = function (Calid) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_CalCron_List',
                data: {
                    Calid: Calid,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_CalCron_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_CalCron_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //hs_Gru (gruppi termici)
        //========================================================================================
        my.hs_Gru_Add = function (hsId, GruCod, GruDescr, NoteInterne, UserName, marcamodello, installationDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Gru_Add',
                data: {
                    hsId: hsId,
                    GruCod: GruCod,
                    GruDescr: GruDescr,
                    NoteInterne: NoteInterne,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate:installationDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Gru_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Gru_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Gru_List = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Gru_List',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Gru_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Gru_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Gru_ReadByGruCod = function (hsId, GruCod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Gru_ReadByGruCod',
                data: {
                    hsId: hsId,
                    GruCod: GruCod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Gru_ReadByGruCodSync = function (hsId, GruCod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Gru_ReadByGruCod',
                data: {
                    hsId: hsId,
                    GruCod: GruCod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };        
        my.hs_Gru_Update = function (Id, GruCod, GruDescr, NoteInterne, UserName, marcamodello, installationDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Gru_Update',
                data: {
                    Id: Id,
                    GruCod: GruCod,
                    GruDescr: GruDescr,
                    NoteInterne: NoteInterne,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Gru_UpdateMarcamodello = function (Id, marcamodello, installationDate, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Gru_UpdateMarcamodello',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Gru_setGeoLocation = function (Id, Latitude, Longitude) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Gru_setGeoLocation',
                data: {
                    Id: Id,
                    Latitude: Latitude,
                    Longitude: Longitude,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_Gru_replacement_history 
        //========================================================================================
        my.hs_Gru_replacement_history_Add = function (ParentId, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Gru_replacement_history_Add',
                data: {
                    ParentId: ParentId,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Gru_replacement_history_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Gru_replacement_history_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Gru_replacement_history_List = function (ParentId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Gru_replacement_history_List',
                data: {
                    ParentId: ParentId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Gru_replacement_history_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Gru_replacement_history_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Gru_replacement_history_Update = function (Id, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Gru_replacement_history_Update',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_GruElem (elementi gruppi termici)
        //========================================================================================
        my.hs_GruElem_Add = function (hsGruId, elementId, elementType, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_GruElem_Add',
                data: {
                    hsGruId: hsGruId,
                    elementId: elementId,
                    elementType: elementType,                    
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_GruElem_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_GruElem_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_GruElem_List = function (hsGruId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_GruElem_List',
                data: {
                    hsGruId: hsGruId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_GruElem_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_GruElem_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_GruElem_ReadByGruelementCode = function (hsGruId, elementCode) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_GruElem_ReadByGruelementCode',
                data: {
                    hsGruId: hsGruId,
                    elementCode: elementCode,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_GruElem_ReadByGruelementCodeSync = function (hsGruId, elementCode) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_GruElem_ReadByGruelementCode',
                data: {
                    hsGruId: hsGruId,
                    elementCode: elementCode,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_GruElem_Update = function (Id, elementCode, elementType, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_GruElem_Update',
                data: {
                    Id: Id,
                    elementCode: elementCode,
                    elementType: elementType,                    
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_Gru_CC (curve climatiche gruppi terminic)
        //========================================================================================
        my.hs_Gru_CC_Add = function (GruId, descr, Tamb1, Tset1, Tamb2, Tset2, Tamb3, Tset3, Tamb4, Tset4, Tamb5, Tset5) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Gru_CC_Add',
                data: {
                    GruId: GruId,
                    descr: descr,
                    Tamb1: Tamb1,
                    Tset1: Tset1,
                    Tamb2: Tamb2,
                    Tset2: Tset2,
                    Tamb3: Tamb3,
                    Tset3: Tset3,
                    Tamb4: Tamb4,
                    Tset4: Tset4,
                    Tamb5: Tamb5,
                    Tset5: Tset5,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Gru_CC_Del = function (ccId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Gru_CC_Del',
                data: {
                    ccId: ccId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Gru_CC_List = function (GruId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Gru_CC_List',
                data: {
                    GruId: GruId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Gru_CC_Read = function (ccId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Gru_CC_Read',
                data: {
                    ccId: ccId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Gru_CC_Update = function (ccId, descr, Tamb1, Tset1, Tamb2, Tset2, Tamb3, Tset3, Tamb4, Tset4, Tamb5, Tset5) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Gru_CC_Update',
                data: {
                    ccId: ccId,
                    descr: descr,
                    Tamb1: Tamb1,
                    Tset1: Tset1,
                    Tamb2: Tamb2,
                    Tset2: Tset2,
                    Tamb3: Tamb3,
                    Tset3: Tset3,
                    Tamb4: Tamb4,
                    Tset4: Tset4,
                    Tamb5: Tamb5,
                    Tset5: Tset5,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_Gru_currentCC (gruppo termico curva climatica corrente)
        my.hs_Gru_currentCC_Get = function (hsId, GruCod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Gru_currentCC_Get',
                data: {
                    hsId: hsId,
                    GruCod: GruCod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Gru_currentCC_set = function (GruId, ccId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Gru_currentCC_set',
                data: {
                    GruId: GruId,
                    ccId: ccId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //hs_Cir (circolatori)
        //========================================================================================
        my.hs_Cir_Add = function (hsId, CirCod, CirDescr, NoteInterne, UserName, marcamodello, installationDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cir_Add',
                data: {
                    hsId: hsId,
                    CirCod: CirCod,
                    CirDescr: CirDescr,
                    NoteInterne: NoteInterne,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cir_Del = function (CirId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cir_Del',
                data: {
                    CirId: CirId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cir_List = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cir_List',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cir_Read = function (CirId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cir_Read',
                data: {
                    CirId: CirId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cir_ReadByCirCod = function (hsId, CirCod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cir_ReadByCirCod',
                data: {
                    hsId: hsId,
                    CirCod: CirCod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cir_ReadByCirCodSync = function (hsId, CirCod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cir_ReadByCirCod',
                data: {
                    hsId: hsId,
                    CirCod: CirCod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cir_Update = function (CirId, CirCod, CirDescr, NoteInterne, UserName, marcamodello, installationDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cir_Update',
                data: {
                    CirId: CirId,
                    CirCod: CirCod,
                    CirDescr: CirDescr,
                    NoteInterne: NoteInterne,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cir_UpdateMarcamodello = function (Id, marcamodello, installationDate, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cir_UpdateMarcamodello',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cir_setGeoLocation = function (CirId, Latitude, Longitude) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cir_setGeoLocation',
                data: {
                    CirId: CirId,
                    Latitude: Latitude,
                    Longitude: Longitude,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cir_ForceRun = function (CirId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cir_ForceRun',
                data: {
                    CirId: CirId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cir_ForceStop = function (CirId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cir_ForceStop',
                data: {
                    CirId: CirId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cir_ReleaseForce = function (CirId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cir_ReleaseForce',
                data: {
                    CirId: CirId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cir_getDelayOnOff = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cir_getDelayOnOff',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cir_setDelayOnOff = function (Id, TempoOn, TempoOff) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cir_setDelayOnOff',
                data: {
                    Id: Id,
                    TempoOn: TempoOn,
                    TempoOff: TempoOff,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_Cir_replacement_history 
        //========================================================================================
        my.hs_Cir_replacement_history_Add = function (ParentId, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cir_replacement_history_Add',
                data: {
                    ParentId: ParentId,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cir_replacement_history_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cir_replacement_history_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cir_replacement_history_List = function (ParentId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cir_replacement_history_List',
                data: {
                    ParentId: ParentId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cir_replacement_history_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cir_replacement_history_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cir_replacement_history_Update = function (Id, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cir_replacement_history_Update',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_CirCron
        //========================================================================================
        my.hs_CirCron_Add = function (Cirid, CronId, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_CirCron_Add',
                data: {
                    Cirid: Cirid,
                    CronId: CronId,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_CirCron_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_CirCron_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_CirCron_List = function (Cirid) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_CirCron_List',
                data: {
                    Cirid: Cirid,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_CirCron_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_CirCron_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //hs_CirD (circolatori gemellari)
        //========================================================================================
        my.hs_Cird_Add = function (hsId, Cod, Descr, UserName, marcamodello, installationDate, NoteInterne) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cird_Add',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    Descr: Descr,                    
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    NoteInterne: NoteInterne,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cird_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cird_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cird_List = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cird_List',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cird_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cird_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cird_ReadByCod = function (hsId, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cird_ReadByCod',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cird_ReadByCodSync = function (hsId, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cird_ReadByCod',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cird_Update = function (Id, Cod, Descr, UserName, marcamodello, installationDate, NoteInterne) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cird_Update',
                data: {
                    Id: Id,
                    Cod: Cod,
                    Descr: Descr,                    
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    NoteInterne: NoteInterne,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cird_UpdateMarcamodello = function (Id, marcamodello, installationDate, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cird_UpdateMarcamodello',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cird_setGeoLocation = function (Id, Latitude, Longitude) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cird_setGeoLocation',
                data: {
                    Id: Id,
                    Latitude: Latitude,
                    Longitude: Longitude,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cird_ForceRun = function (CirId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cird_ForceRun',
                data: {
                    CirId: CirId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cird_ForceStop = function (CirId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cird_ForceStop',
                data: {
                    CirId: CirId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cird_ReleaseForce = function (CirId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cird_ReleaseForce',
                data: {
                    CirId: CirId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cird_getDelayOnOff = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cird_getDelayOnOff',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cird_setDelayOnOff = function (Id, TempoOn, TempoOff) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cird_setDelayOnOff',
                data: {
                    Id: Id,
                    TempoOn: TempoOn,
                    TempoOff: TempoOff,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cird_getBackupWorkingMode = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cird_getBackupWorkingMode',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cird_setBackupWorkingMode = function (Id, backupWorkingMode) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cird_setBackupWorkingMode',
                data: {
                    Id: Id,
                    backupWorkingMode: backupWorkingMode,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_Cird_replacement_history 
        //========================================================================================
        my.hs_Cird_replacement_history_Add = function (ParentId, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cird_replacement_history_Add',
                data: {
                    ParentId: ParentId,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cird_replacement_history_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cird_replacement_history_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cird_replacement_history_List = function (ParentId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cird_replacement_history_List',
                data: {
                    ParentId: ParentId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cird_replacement_history_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cird_replacement_history_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cird_replacement_history_Update = function (Id, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cird_replacement_history_Update',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_CirdCron
        //========================================================================================
        my.hs_CirdCron_Add = function (Cirid, CronId, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_CirdCron_Add',
                data: {
                    Cirid: Cirid,
                    CronId: CronId,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_CirdCron_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_CirdCron_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_CirdCron_List = function (Cirid) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_CirdCron_List',
                data: {
                    Cirid: Cirid,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_CirdCron_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_CirdCron_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //hs_cirm (circolatori Modbus)
        //========================================================================================
        my.hs_Cirm_Add = function (hsId, Cod, Descr, UserName, marcamodello, installationDate, NoteInterne) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cirm_Add',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    Descr: Descr,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    NoteInterne: NoteInterne,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cirm_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cirm_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cirm_List = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cirm_List',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cirm_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cirm_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cirm_ReadByCod = function (hsId, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cirm_ReadByCod',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cirm_ReadByCodSync = function (hsId, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cirm_ReadByCod',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cirm_Update = function (Id, Cod, Descr, UserName, marcamodello, installationDate, NoteInterne) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cirm_Update',
                data: {
                    Id: Id,
                    Cod: Cod,
                    Descr: Descr,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    NoteInterne: NoteInterne,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cirm_UpdateMarcamodello = function (Id, marcamodello, installationDate, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cirm_UpdateMarcamodello',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cirm_setGeoLocation = function (Id, Latitude, Longitude) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cirm_setGeoLocation',
                data: {
                    Id: Id,
                    Latitude: Latitude,
                    Longitude: Longitude,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cirm_ForceRun = function (CirId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cirm_ForceRun',
                data: {
                    CirId: CirId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cirm_ForceStop = function (CirId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cirm_ForceStop',
                data: {
                    CirId: CirId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cirm_ReleaseForce = function (CirId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cirm_ReleaseForce',
                data: {
                    CirId: CirId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cirm_getDelayOnOff = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cirm_getDelayOnOff',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cirm_setDelayOnOff = function (Id, TempoOn, TempoOff) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cirm_setDelayOnOff',
                data: {
                    Id: Id,
                    TempoOn: TempoOn,
                    TempoOff: TempoOff,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_cirm_replacement_history 
        //========================================================================================
        my.hs_Cirm_replacement_history_Add = function (ParentId, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cirm_replacement_history_Add',
                data: {
                    ParentId: ParentId,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cirm_replacement_history_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cirm_replacement_history_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cirm_replacement_history_List = function (ParentId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cirm_replacement_history_List',
                data: {
                    ParentId: ParentId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cirm_replacement_history_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cirm_replacement_history_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cirm_replacement_history_Update = function (Id, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cirm_replacement_history_Update',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_cirmCron
        //========================================================================================
        my.hs_CirmCron_Add = function (Cirid, CronId, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cirmCron_Add',
                data: {
                    Cirid: Cirid,
                    CronId: CronId,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_CirmCron_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cirmCron_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_CirmCron_List = function (Cirid) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cirmCron_List',
                data: {
                    Cirid: Cirid,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_CirmCron_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cirmCron_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //hs_cirdm (circolatori gemellari Modbus)
        //========================================================================================
        my.hs_Cirdm_Add = function (hsId, Cod, Descr, UserName, marcamodello, installationDate, NoteInterne) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cirdm_Add',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    Descr: Descr,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    NoteInterne: NoteInterne,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cirdm_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cirdm_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cirdm_List = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cirdm_List',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cirdm_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cirdm_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cirdm_ReadByCod = function (hsId, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cirdm_ReadByCod',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cirdm_ReadByCodSync = function (hsId, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cirdm_ReadByCod',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cirdm_Update = function (Id, Cod, Descr, UserName, marcamodello, installationDate, NoteInterne) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cirdm_Update',
                data: {
                    Id: Id,
                    Cod: Cod,
                    Descr: Descr,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    NoteInterne: NoteInterne,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cirdm_UpdateMarcamodello = function (Id, marcamodello, installationDate, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cirdm_UpdateMarcamodello',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cirdm_setGeoLocation = function (Id, Latitude, Longitude) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cirdm_setGeoLocation',
                data: {
                    Id: Id,
                    Latitude: Latitude,
                    Longitude: Longitude,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cirdm_ForceRun = function (CirId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cirdm_ForceRun',
                data: {
                    CirId: CirId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cirdm_ForceStop = function (CirId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cirdm_ForceStop',
                data: {
                    CirId: CirId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cirdm_ReleaseForce = function (CirId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cirdm_ReleaseForce',
                data: {
                    CirId: CirId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cirdm_getDelayOnOff = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cirdm_getDelayOnOff',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cirdm_setDelayOnOff = function (Id, TempoOn, TempoOff) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cirdm_setDelayOnOff',
                data: {
                    Id: Id,
                    TempoOn: TempoOn,
                    TempoOff: TempoOff,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_cirdm_replacement_history 
        //========================================================================================
        my.hs_Cirdm_replacement_history_Add = function (ParentId, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cirdm_replacement_history_Add',
                data: {
                    ParentId: ParentId,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cirdm_replacement_history_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cirdm_replacement_history_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cirm_replacement_history_List = function (ParentId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cirm_replacement_history_List',
                data: {
                    ParentId: ParentId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cirdm_replacement_history_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cirdm_replacement_history_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cirdm_replacement_history_Update = function (Id, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cirdm_replacement_history_Update',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_cirmCron
        //========================================================================================
        my.hs_CirdmCron_Add = function (Cirid, CronId, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cirdmCron_Add',
                data: {
                    Cirid: Cirid,
                    CronId: CronId,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_CirdmCron_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cirdmCron_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_CirdmCron_List = function (Cirid) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cirdmCron_List',
                data: {
                    Cirid: Cirid,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_CirdmCron_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cirdmCron_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //hs_Cron (cronotermostati)
        //========================================================================================
        my.hs_Cron_Add = function (hsId, CronCod, CronDescr, NoteInterne, UserName, marcamodello, installationDate, CronType) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cron_Add',
                data: {
                    hsId: hsId,
                    CronCod: CronCod,
                    CronDescr: CronDescr,
                    NoteInterne: NoteInterne,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    CronType:CronType,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cron_Del = function (CronId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cron_Del',
                data: {
                    CronId: CronId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cron_List = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cron_List',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cron_ListOnOff = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cron_ListOnOff',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cron_ListAll = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cron_ListAll',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cron_Read = function (CronId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cron_Read',
                data: {
                    CronId: CronId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cron_ReadByCronCod = function (hsId, CronCod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cron_ReadByCronCod',
                data: {
                    hsId: hsId,
                    CronCod: CronCod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cron_ReadByCronCodSync = function (hsId, CronCod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cron_ReadByCronCod',
                data: {
                    hsId: hsId,
                    CronCod: CronCod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cron_Update = function (CronId, CronCod, CronDescr, NoteInterne, UserName, marcamodello, installationDate, CronType) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cron_Update',
                data: {
                    CronId: CronId,
                    CronCod: CronCod,
                    CronDescr: CronDescr,
                    NoteInterne: NoteInterne,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    CronType:CronType,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cron_UpdateMarcamodello = function (Id, marcamodello, installationDate, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cron_UpdateMarcamodello',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cron_setGeoLocation = function (CronId, Latitude, Longitude) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cron_setGeoLocation',
                data: {
                    CronId: CronId,
                    Latitude: Latitude,
                    Longitude: Longitude,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cron_Restart = function (CronId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cron_Restart',
                data: {
                    CronId: CronId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_Cron_replacement_history 
        //========================================================================================
        my.hs_Cron_replacement_history_Add = function (ParentId, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cron_replacement_history_Add',
                data: {
                    ParentId: ParentId,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cron_replacement_history_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cron_replacement_history_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cron_replacement_history_List = function (ParentId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cron_replacement_history_List',
                data: {
                    ParentId: ParentId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cron_replacement_history_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cron_replacement_history_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cron_replacement_history_Update = function (Id, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cron_replacement_history_Update',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //hs_cron_Profile (cronotermostati profili correnti)
        my.hs_cron_Profile_get = function (hsId, CronCod, ProfileYear, ProfileNr) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cron_Profile_get',
                data: {
                    hsId: hsId,
                    CronCod: CronCod,
                    ProfileYear: ProfileYear,
                    ProfileNr: ProfileNr,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_cron_Profile_List = function (CronId, ProfileY) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cron_Profile_List',
                data: {
                    CronId: CronId,
                    ProfileY: ProfileY,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_cron_Profile_Read = function (CronId, ProfileY, ProfileNr) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cron_Profile_Read',
                data: {
                    CronId: CronId,
                    ProfileYear: ProfileY,
                    ProfileNr: ProfileNr,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_cron_Profile_ReadSync = function (CronId, ProfileY, ProfileNr) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cron_Profile_Read',
                data: {
                    CronId: CronId,
                    ProfileYear: ProfileY,
                    ProfileNr: ProfileNr,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_cron_Profile_set = function (hsId, CronCod, ProfileYear, ProfileNr, strProfiledata) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cron_Profile_set',
                data: {
                    hsId: hsId,
                    CronCod: CronCod,
                    ProfileYear: ProfileYear,
                    ProfileNr: ProfileNr,
                    strProfiledata: strProfiledata,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_cron_Profile_setProfileNow = function (CronId, ProfileNr) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_cron_Profile_setProfileNow',
                data: {
                    CronId: CronId,
                    ProfileNr: ProfileNr,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_Cron_Profile_Descr (descrizione dei profili)
        my.hs_Cron_Profile_Descr_Update = function (CronId, ProfileNr, descr) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cron_Profile_Descr_Update',
                data: {
                    CronId: CronId,                   
                    ProfileNr: ProfileNr,
                    descr:descr,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cron_Profile_Descr_List = function (CronId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cron_Profile_Descr_List',
                data: {
                    CronId: CronId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_Cron_Profile_Tasks 
        my.hs_Cron_Profile_Tasks_Add = function (CronId, ProfileNr, Subject, StartDate, EndDate, chkMonday, chkTuesday, chkWednesday, chkThursday, chkFriday, chkSaturday, chkSunday, yearsRepeatable) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cron_Profile_Tasks_Add',
                data: {
                    CronId: CronId,
                    ProfileNr: ProfileNr,
                    Subject: Subject,
                    StartDate: StartDate,
                    EndDate: EndDate,
                    chkMonday: chkMonday,
                    chkTuesday: chkTuesday,
                    chkWednesday: chkWednesday,
                    chkThursday: chkThursday,
                    chkFriday: chkFriday,
                    chkSaturday: chkSaturday,
                    chkSunday: chkSunday,
                    yearsRepeatable: yearsRepeatable,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cron_Profile_Tasks_Del = function (TaskId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cron_Profile_Tasks_Del',
                data: {
                    TaskId: TaskId,                
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cron_Profile_Tasks_List = function (CronId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cron_Profile_Tasks_List',
                data: {
                    CronId: CronId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cron_Profile_Tasks_ListByMonth = function (CronId, calYear, calMonth) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cron_Profile_Tasks_ListByMonth',
                data: {
                    CronId: CronId,
                    calYear: calYear,
                    calMonth: calMonth,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cron_Profile_Tasks_ListByDates = function (CronId, startDate, endDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cron_Profile_Tasks_ListByDates',
                data: {
                    CronId: CronId,
                    startDate: startDate,
                    endDate: endDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cron_Profile_Tasks_ListAll = function () {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cron_Profile_Tasks_ListAll',
                data: {
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cron_Profile_Tasks_ListCurrent = function (CronId, selDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cron_Profile_Tasks_ListCurrent',
                data: {
                    CronId: CronId,
                    selDate:selDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cron_Profile_Tasks_Read = function (TaskId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cron_Profile_Tasks_Read',
                data: {
                    TaskId: TaskId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cron_Profile_Tasks_Update = function (TaskId, ProfileNr, Subject, StartDate, EndDate, chkMonday, chkTuesday, chkWednesday, chkThursday, chkFriday, chkSaturday, chkSunday, yearsRepeatable) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cron_Profile_Tasks_Update',
                data: {
                    TaskId: TaskId,
                    ProfileNr: ProfileNr,
                    Subject: Subject,
                    StartDate: StartDate,
                    EndDate: EndDate,
                    chkMonday: chkMonday,
                    chkTuesday: chkTuesday,
                    chkWednesday: chkWednesday,
                    chkThursday: chkThursday,
                    chkFriday: chkFriday,
                    chkSaturday: chkSaturday,
                    chkSunday: chkSunday,
                    yearsRepeatable:yearsRepeatable,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_Cron_Calendar
        my.hs_Cron_Calendar_Add = function (CronId, Calyear, Calmonth, strmonthData) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cron_Profile_Tasks_Add',
                data: {
                    CronId: CronId,
                    Calyear: Calyear,
                    Calmonth: Calmonth,
                    strmonthData: strmonthData,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cron_Calendar_Read = function (CronId, Calyear, Calmonth) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cron_Calendar_Read',
                data: {
                    CronId: CronId,
                    Calyear: Calyear,
                    Calmonth: Calmonth,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cron_CalendarReadFromDB = function (CronId, Calyear, Calmonth) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cron_CalendarReadFromDB',
                data: {
                    CronId: CronId,
                    Calyear: Calyear,
                    Calmonth: Calmonth,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cron_Calendar_replaceDesiredWithTask = function (CronId, Calyear, Calmonth) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cron_Calendar_replaceDesiredWithTask',
                data: {
                    CronId: CronId,
                    Calyear: Calyear,
                    Calmonth: Calmonth,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cron_Calendar_UpdateDesired = function (CronId, Calyear, Calmonth, strmonthData) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cron_Calendar_UpdateDesired',
                data: {
                    CronId: CronId,
                    Calyear: Calyear,
                    Calmonth: Calmonth,
                    strmonthData: strmonthData,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cron_Calendar_get = function (CronId, Calyear, Calmonth) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cron_Calendar_get',
                data: {
                    CronId: CronId,
                    Calyear: Calyear,
                    Calmonth: Calmonth,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Cron_Calendar_Set = function (CronId, Calyear, Calmonth) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Cron_Calendar_Set',
                data: {
                    CronId: CronId,
                    Calyear: Calyear,
                    Calmonth: Calmonth,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //hs_Vrd (servomotori)
        //========================================================================================
        my.hs_Vrd_Add = function (hsId, VrdCod, VrdDesc, NoteInterne, UserName, marcamodello, installationDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Vrd_Add',
                data: {
                    hsId: hsId,
                    VrdCod: VrdCod,
                    VrdDesc: VrdDesc,
                    NoteInterne: NoteInterne,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Vrd_Del = function (VrdId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Vrd_Del',
                data: {
                    VrdId: VrdId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Vrd_List = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Vrd_List',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Vrd_Read = function (VrdId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Vrd_Read',
                data: {
                    VrdId: VrdId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Vrd_ReadByVrdCod = function (hsId, VrdCod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Vrd_ReadByVrdCod',
                data: {
                    hsId: hsId,
                    VrdCod: VrdCod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Vrd_ReadByVrdCodSync = function (hsId, VrdCod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Vrd_ReadByVrdCod',
                data: {
                    hsId: hsId,
                    VrdCod: VrdCod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Vrd_Update = function (VrdId, VrdCod, VrdDesc, NoteInterne, UserName, marcamodello, installationDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Vrd_Update',
                data: {
                    VrdId: VrdId,
                    VrdCod: VrdCod,
                    VrdDesc: VrdDesc,
                    NoteInterne: NoteInterne,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Vrd_UpdateMarcamodello = function (Id, marcamodello, installationDate, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Vrd_UpdateMarcamodello',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Vrd_setGeoLocation = function (VrdId, Latitude, Longitude) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Vrd_setGeoLocation',
                data: {
                    VrdId: VrdId,
                    Latitude: Latitude,
                    Longitude: Longitude,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_Vrd_replacement_history 
        //========================================================================================
        my.hs_Vrd_replacement_history_Add = function (ParentId, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Vrd_replacement_history_Add',
                data: {
                    ParentId: ParentId,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Vrd_replacement_history_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Vrd_replacement_history_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Vrd_replacement_history_List = function (ParentId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Vrd_replacement_history_List',
                data: {
                    ParentId: ParentId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Vrd_replacement_history_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Vrd_replacement_history_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Vrd_replacement_history_Update = function (Id, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Vrd_replacement_history_Update',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_Vrd_currentCC (servomotore curva climatica corrente)
        my.hs_Vrd_currentCC_Get = function (hsId, VrdCod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Vrd_currentCC_Get',
                data: {
                    hsId: hsId,
                    VrdCod: VrdCod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Vrd_currentCC_set = function (VrdId, ccId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Vrd_currentCC_set',
                data: {
                    VrdId: VrdId,
                    ccId: ccId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_Vrd_CC (curve climatiche servomotore)
        //========================================================================================
        my.hs_Vrd_CC_Add = function (VrdId, descr, Tamb1, Tset1, Tamb2, Tset2, Tamb3, Tset3, Tamb4, Tset4, Tamb5, Tset5) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Vrd_CC_Add',
                data: {
                    VrdId: VrdId,
                    descr: descr,
                    Tamb1: Tamb1,
                    Tset1: Tset1,
                    Tamb2: Tamb2,
                    Tset2: Tset2,
                    Tamb3: Tamb3,
                    Tset3: Tset3,
                    Tamb4: Tamb4,
                    Tset4: Tset4,
                    Tamb5: Tamb5,
                    Tset5: Tset5,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Vrd_CC_Del = function (ccId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Vrd_CC_Del',
                data: {
                    ccId: ccId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Vrd_CC_List = function (VrdId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Vrd_CC_List',
                data: {
                    VrdId: VrdId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Vrd_CC_Read = function (ccId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Vrd_CC_Read',
                data: {
                    ccId: ccId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Vrd_CC_Update = function (ccId, descr, Tamb1, Tset1, Tamb2, Tset2, Tamb3, Tset3, Tamb4, Tset4, Tamb5, Tset5) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Vrd_CC_Update',
                data: {
                    ccId: ccId,
                    descr: descr,
                    Tamb1: Tamb1,
                    Tset1: Tset1,
                    Tamb2: Tamb2,
                    Tset2: Tset2,
                    Tamb3: Tamb3,
                    Tset3: Tset3,
                    Tamb4: Tamb4,
                    Tset4: Tset4,
                    Tamb5: Tamb5,
                    Tset5: Tset5,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //hs_Ctb (contabilizzatori)
        //========================================================================================
        my.hs_Ctb_Add = function (hsId, CtbCod, CtbDesc, UserName, marcamodello, installationDate, NoteInterne) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctb_Add',
                data: {
                    hsId: hsId,
                    CtbCod: CtbCod,
                    CtbDesc: CtbDesc,                    
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    NoteInterne:NoteInterne,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ctb_Del = function (CtbId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctb_Del',
                data: {
                    CtbId: CtbId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ctb_List = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctb_List',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ctb_Read = function (CtbId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctb_Read',
                data: {
                    CtbId: CtbId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ctb_ReadByCtbCod = function (hsId, CtbCod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctb_ReadByCtbCod',
                data: {
                    hsId: hsId,
                    CtbCod: CtbCod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ctb_ReadByCtbCodSync = function (hsId, CtbCod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctb_ReadByCtbCod',
                data: {
                    hsId: hsId,
                    CtbCod: CtbCod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ctb_Update = function (CtbId, CtbCod, CtbDesc, UserName, marcamodello, installationDate, NoteInterne) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctb_Update',
                data: {
                    CtbId: CtbId,
                    CtbCod: CtbCod,
                    CtbDesc: CtbDesc,                    
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    NoteInterne:NoteInterne,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ctb_UpdateMarcamodello = function (Id, marcamodello, installationDate, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctb_UpdateMarcamodello',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_CtbsetGeoLocation = function (CtbId, Latitude, Longitude) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_CtbsetGeoLocation',
                data: {
                    CtbId: CtbId,
                    Latitude: Latitude,
                    Longitude: Longitude,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_Ctb_replacement_history 
        //========================================================================================
        my.hs_Ctb_replacement_history_Add = function (ParentId, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctb_replacement_history_Add',
                data: {
                    ParentId: ParentId,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ctb_replacement_history_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctb_replacement_history_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ctb_replacement_history_List = function (ParentId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctb_replacement_history_List',
                data: {
                    ParentId: ParentId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ctb_replacement_history_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctb_replacement_history_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ctb_replacement_history_Update = function (Id, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctb_replacement_history_Update',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //hs_Ctl (contalitri)
        //========================================================================================
        my.hs_Ctl_Add = function (hsId, CtlCod, CtlDesc, UserName, marcamodello, installationDate, LxMin) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctl_Add',
                data: {
                    hsId: hsId,
                    CtlCod: CtlCod,
                    CtlDesc: CtlDesc,                    
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    LxMin: LxMin,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ctl_Del = function (CtlId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctl_Del',
                data: {
                    CtlId: CtlId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ctl_List = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctl_List',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',                
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ctl_Read = function (CtlId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctl_Read',
                data: {
                    CtlId: CtlId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ctl_ReadByCtlCod = function (hsId, CtlCod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctl_ReadByCtlCod',
                data: {
                    hsId: hsId,
                    CtlCod: CtlCod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ctl_ReadByCtlCodSync = function (hsId, CtlCod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctl_ReadByCtlCod',
                data: {
                    hsId: hsId,
                    CtlCod: CtlCod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ctl_Update = function (CtlId, CtlCod, CtlDesc, UserName, marcamodello, installationDate, LxMin) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctl_Update',
                data: {
                    CtlId: CtlId,
                    CtlCod: CtlCod,
                    CtlDesc: CtlDesc,                    
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    LxMin: LxMin,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ctl_UpdateMarcamodello = function (Id, marcamodello, installationDate, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctl_UpdateMarcamodello',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ctl_setGeoLocation = function (CtlId, Latitude, Longitude) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctl_setGeoLocation',
                data: {
                    CtlId: CtlId,
                    Latitude: Latitude,
                    Longitude: Longitude,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_Ctl_replacement_history 
        //========================================================================================
        my.hs_Ctl_replacement_history_Add = function (ParentId, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctl_replacement_history_Add',
                data: {
                    ParentId: ParentId,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ctl_replacement_history_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctl_replacement_history_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ctl_replacement_history_List = function (ParentId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctl_replacement_history_List',
                data: {
                    ParentId: ParentId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ctl_replacement_history_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctl_replacement_history_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ctl_replacement_history_Update = function (Id, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctl_replacement_history_Update',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ctl_sendLxHH = function (CtlId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctl_sendLxHH',
                data: {
                    CtlId: CtlId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //hs_TemperatureProbess (Sonde)
        //========================================================================================
        my.hs_TemperatureProbes_Add = function (hsId, ProbeCod, ProbeDesc, UserName, marcamodello, installationDate, NoteInterne) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_TemperatureProbes_Add',
                data: {
                    hsId: hsId,
                    ProbeCod: ProbeCod,
                    ProbeDesc: ProbeDesc,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    NoteInterne: NoteInterne,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_TemperatureProbes_Del = function (ProbeId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_TemperatureProbes_Del',
                data: {
                    ProbeId: ProbeId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_TemperatureProbes_List = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_TemperatureProbes_List',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',                
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_TemperatureProbes_Read = function (ProbeId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_TemperatureProbes_Read',
                data: {
                    ProbeId: ProbeId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_TemperatureProbes_ReadByProbeCod = function (hsId, ProbeCod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_TemperatureProbes_ReadByProbeCod',
                data: {
                    hsId: hsId,
                    ProbeCod: ProbeCod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_TemperatureProbes_ReadByProbeCodSync = function (hsId, ProbeCod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_TemperatureProbes_ReadByProbeCod',
                data: {
                    hsId: hsId,
                    ProbeCod: ProbeCod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_TemperatureProbes_Update = function (ProbeId, ProbeCod, ProbeDesc, UserName, marcamodello, installationDate, NoteInterne) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_TemperatureProbes_Update',
                data: {
                    ProbeId: ProbeId,
                    ProbeCod: ProbeCod,
                    ProbeDesc: ProbeDesc,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    NoteInterne: NoteInterne,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_TemperatureProbes_UpdateMarcamodello = function (Id, marcamodello, installationDate, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_TemperatureProbes_UpdateMarcamodello',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_TemperatureProbes_setGeoLocation = function (ProbeId, Latitude, Longitude) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_TemperatureProbes_setGeoLocation',
                data: {
                    ProbeId: ProbeId,
                    Latitude: Latitude,
                    Longitude: Longitude,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_TemperatureProbes_replacement_history 
        //========================================================================================
        my.hs_TemperatureProbes_replacement_history_Add = function (ParentId, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_TemperatureProbes_replacement_history_Add',
                data: {
                    ParentId: ParentId,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_TemperatureProbes_replacement_history_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_TemperatureProbes_replacement_history_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_TemperatureProbes_replacement_history_List = function (ParentId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_TemperatureProbes_replacement_history_List',
                data: {
                    ParentId: ParentId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_TemperatureProbes_replacement_history_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_TemperatureProbes_replacement_history_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_TemperatureProbes_replacement_history_Update = function (Id, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_TemperatureProbes_replacement_history_Update',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        
        //hs_TemperatureProbesElem (Sonde x elemento)
        //========================================================================================
        my.hs_TemperatureProbeElem_Add = function (hsId, elementCode, ProbeCod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_TemperatureProbeElem_Add',
                data: {
                    hsId: hsId,
                    elementCode: elementCode,
                    ProbeCod: ProbeCod,                    
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_TemperatureProbeElem_Del = function (id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_TemperatureProbeElem_Del',
                data: {
                    id: id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_TemperatureProbeElem_List = function (hsId, elementCode) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_TemperatureProbeElem_List',
                data: {
                    hsId: hsId,
                    elementCode: elementCode,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',                
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_TemperatureProbeElem_Read = function (id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_TemperatureProbeElem_Read',
                data: {
                    id: id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //hs_Doors (porte di accesso ai locali)
        //========================================================================================
        my.hs_Doors_Add = function (hsId, DoorCod, DoorDesc, UserName, marcamodello, installationDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Doors_Add',
                data: {
                    hsId: hsId,
                    DoorCod: DoorCod,
                    DoorDesc: DoorDesc,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Doors_Del = function (DoorId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Doors_Del',
                data: {
                    DoorId: DoorId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Doors_List = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Doors_List',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',                
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Doors_Read = function (DoorId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Doors_Read',
                data: {
                    DoorId: DoorId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Doors_ReadByDoorCod = function (hsId, DoorCod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Doors_ReadByDoorCod',
                data: {
                    hsId: hsId,
                    DoorCod: DoorCod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Doors_ReadByDoorCodSync = function (hsId, DoorCod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Doors_ReadByDoorCod',
                data: {
                    hsId: hsId,
                    DoorCod: DoorCod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Doors_Update = function (DoorId, DoorCod, DoorDesc, UserName, marcamodello, installationDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Doors_Update',
                data: {
                    DoorId: DoorId,
                    DoorCod: DoorCod,
                    DoorDesc: DoorDesc,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Doors_UpdateMarcamodello = function (Id, marcamodello, installationDate, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Doors_UpdateMarcamodello',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Doors_setGeoLocation = function (DoorId, Latitude, Longitude) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Doors_setGeoLocation',
                data: {
                    DoorId: DoorId,
                    Latitude: Latitude,
                    Longitude: Longitude,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_Doors_replacement_history 
        //========================================================================================
        my.hs_Doors_replacement_history_Add = function (ParentId, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Doors_replacement_history_Add',
                data: {
                    ParentId: ParentId,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Doors_replacement_history_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Doors_replacement_history_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Doors_replacement_history_List = function (ParentId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Doors_replacement_history_List',
                data: {
                    ParentId: ParentId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Doors_replacement_history_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Doors_replacement_history_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Doors_replacement_history_Update = function (Id, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Doors_replacement_history_Update',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        
        //hs_pb (pressostato di blocco)
        //========================================================================================
        my.hs_pb_Add = function (hsId, Cod, Descr, UserName, marcamodello, installationDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_pb_Add',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    Descr: Descr,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_pb_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_pb_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_pb_List = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_pb_List',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',                
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_pb_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_pb_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_pb_ReadByCod = function (hsId, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_pb_ReadByCod',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_pb_ReadByCodSync = function (hsId, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_pb_ReadByCod',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_pb_Update = function (Id, Cod, Descr, UserName, marcamodello, installationDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_pb_Update',
                data: {
                    Id: Id,
                    Cod: Cod,
                    Descr: Descr,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_pb_UpdateMarcamodello = function (Id, marcamodello, installationDate, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_pb_UpdateMarcamodello',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_pb_setGeoLocation = function (Id, Latitude, Longitude) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_pb_setGeoLocation',
                data: {
                    Id: Id,
                    Latitude: Latitude,
                    Longitude: Longitude,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_pb_replacement_history 
        //========================================================================================
        my.hs_pb_replacement_history_Add = function (ParentId, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_pb_replacement_history_Add',
                data: {
                    ParentId: ParentId,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_pb_replacement_history_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_pb_replacement_history_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_pb_replacement_history_List = function (ParentId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_pb_replacement_history_List',
                data: {
                    ParentId: ParentId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_pb_replacement_history_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_pb_replacement_history_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_pb_replacement_history_Update = function (Id, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_pb_replacement_history_Update',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //hs_pm (pressostato di minima)
        //========================================================================================
        my.hs_pm_Add = function (hsId, Cod, Descr, UserName, marcamodello, installationDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_pm_Add',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    Descr: Descr,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_pm_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_pm_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_pm_List = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_pm_List',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',                
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_pm_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_pm_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_pm_ReadByCod = function (hsId, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_pm_ReadByCod',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_pm_ReadByCodSync = function (hsId, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_pm_ReadByCod',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_pm_Update = function (Id, Cod, Descr, UserName, marcamodello, installationDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_pm_Update',
                data: {
                    Id: Id,
                    Cod: Cod,
                    Descr: Descr,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_pm_UpdateMarcamodello = function (Id, marcamodello, installationDate, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_pm_UpdateMarcamodello',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_pm_setGeoLocation = function (Id, Latitude, Longitude) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_pm_setGeoLocation',
                data: {
                    Id: Id,
                    Latitude: Latitude,
                    Longitude: Longitude,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_pm_replacement_history 
        //========================================================================================
        my.hs_pm_replacement_history_Add = function (ParentId, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_pm_replacement_history_Add',
                data: {
                    ParentId: ParentId,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_pm_replacement_history_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_pm_replacement_history_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_pm_replacement_history_List = function (ParentId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_pm_replacement_history_List',
                data: {
                    ParentId: ParentId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_pm_replacement_history_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_pm_replacement_history_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_pm_replacement_history_Update = function (Id, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_pm_replacement_history_Update',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //hs_tb (termostato di blocco)
        //========================================================================================
        my.hs_tb_Add = function (hsId, Cod, Descr, UserName, marcamodello, installationDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_tb_Add',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    Descr: Descr,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_tb_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_tb_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_tb_List = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_tb_List',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',                
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_tb_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_tb_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_tb_ReadByCod = function (hsId, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_tb_ReadByCod',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_tb_ReadByCodSync = function (hsId, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_tb_ReadByCod',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_tb_Update = function (Id, Cod, Descr, UserName, marcamodello, installationDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_tb_Update',
                data: {
                    Id: Id,
                    Cod: Cod,
                    Descr: Descr,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_tb_UpdateMarcamodello = function (Id, marcamodello, installationDate, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_tb_UpdateMarcamodello',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_tb_setGeoLocation = function (Id, Latitude, Longitude) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_tb_setGeoLocation',
                data: {
                    Id: Id,
                    Latitude: Latitude,
                    Longitude: Longitude,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_tb_replacement_history 
        //========================================================================================
        my.hs_tb_replacement_history_Add = function (ParentId, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_tb_replacement_history_Add',
                data: {
                    ParentId: ParentId,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_tb_replacement_history_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_tb_replacement_history_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_tb_replacement_history_List = function (ParentId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_tb_replacement_history_List',
                data: {
                    ParentId: ParentId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_tb_replacement_history_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_tb_replacement_history_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_tb_replacement_history_Update = function (Id, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_tb_replacement_history_Update',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //hs_Gas (contatori di GAS)
        //========================================================================================
        my.hs_Gas_Add = function (hsId, Cod, Descr, UserName, GasType, marcamodello, installationDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Gas_Add',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    Descr: Descr,
                    UserName: UserName,
                    GasType: GasType,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Gas_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Gas_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Gas_List = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Gas_List',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Gas_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Gas_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Gas_ReadByCod = function (hsId, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Gas_ReadByCod',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Gas_ReadByCodSync = function (hsId, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Gas_ReadByCod',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Gas_Update = function (Id, Cod, Descr, UserName, GasType, marcamodello, installationDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Gas_Update',
                data: {
                    Id: Id,
                    Cod: Cod,
                    Descr: Descr,
                    UserName: UserName,
                    GasType: GasType,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Gas_UpdateMarcamodello = function (Id, marcamodello, installationDate, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Gas_UpdateMarcamodello',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Gas_setGeoLocation = function (Id, Latitude, Longitude) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Gas_setGeoLocation',
                data: {
                    Id: Id,
                    Latitude: Latitude,
                    Longitude: Longitude,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_Gas_replacement_history 
        //========================================================================================
        my.hs_Gas_replacement_history_Add = function (ParentId, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Gas_replacement_history_Add',
                data: {
                    ParentId: ParentId,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Gas_replacement_history_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Gas_replacement_history_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Gas_replacement_history_List = function (ParentId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Gas_replacement_history_List',
                data: {
                    ParentId: ParentId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Gas_replacement_history_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Gas_replacement_history_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Gas_replacement_history_Update = function (Id, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Gas_replacement_history_Update',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //hs_ctp (contatori di portata)
        //========================================================================================
        my.hs_Ctp_Add = function (hsId, Cod, Descr, UserName, marcamodello, installationDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctp_Add',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    Descr: Descr,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate:installationDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ctp_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctp_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ctp_List = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctp_List',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ctp_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctp_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ctp_ReadByCod = function (hsId, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctp_ReadByCod',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ctp_ReadByCodSync = function (hsId, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctp_ReadByCod',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ctp_Update = function (Id, Cod, Descr, UserName, marcamodello, installationDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctp_Update',
                data: {
                    Id: Id,
                    Cod: Cod,
                    Descr: Descr,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ctp_UpdateMarcamodello = function (Id, marcamodello, installationDate, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctp_UpdateMarcamodello',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ctp_setGeoLocation = function (Id, Latitude, Longitude) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctp_setGeoLocation',
                data: {
                    Id: Id,
                    Latitude: Latitude,
                    Longitude: Longitude,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_Ctp_replacement_history 
        //========================================================================================
        my.hs_Ctp_replacement_history_Add = function (ParentId, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctp_replacement_history_Add',
                data: {
                    ParentId: ParentId,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ctp_replacement_history_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctp_replacement_history_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ctp_replacement_history_List = function (ParentId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctp_replacement_history_List',
                data: {
                    ParentId: ParentId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ctp_replacement_history_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctp_replacement_history_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ctp_replacement_history_Update = function (Id, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ctp_replacement_history_Update',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //hs_Sca_header (stato/comandi/allarmi)
        //========================================================================================
        my.hs_Sca_header_Add = function (hsId, Cod, Descr, UserName, marcamodello, installationDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Sca_header_Add',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    Descr: Descr,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Sca_header_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Sca_header_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Sca_header_List = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Sca_header_List',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Sca_header_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Sca_header_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Sca_header_ReadByCod = function (hsId, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Sca_header_ReadByCod',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Sca_header_ReadByCodSync = function (hsId, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Sca_header_ReadByCod',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Sca_header_Update = function (Id, Cod, Descr, UserName, marcamodello, installationDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Sca_header_Update',
                data: {
                    Id: Id,
                    Cod: Cod,
                    Descr: Descr,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Sca_header_UpdateMarcamodello = function (Id, marcamodello, installationDate, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Sca_header_UpdateMarcamodello',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Sca_header_setGeoLocation = function (Id, Latitude, Longitude) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Sca_header_setGeoLocation',
                data: {
                    Id: Id,
                    Latitude: Latitude,
                    Longitude: Longitude,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_Sca_detail (stato/comandi/allarmi)
        //========================================================================================
        my.hs_Sca_detail_Add = function (scaId, Id, descr, isIO, isAlarm) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Sca_detail_Add',
                data: {
                    scaId: scaId,
                    Id: Id,
                    descr: descr,
                    isIO: isIO,
                    isAlarm: isAlarm,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Sca_detail_Del = function (scaId, Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Sca_detail_Del',
                data: {
                    scaId: scaId,
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Sca_detail_List = function (scaId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Sca_detail_List',
                data: {
                    scaId: scaId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Sca_detail_Read = function (scaId, Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Sca_detail_Read',
                data: {
                    scaId:scaId,
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Sca_detail_Update = function (scaId, Id, descr, isIO, isAlarm) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Sca_detail_Update',
                data: {
                    scaId: scaId,
                    Id: Id,
                    descr: descr,
                    isIO: isIO,
                    isAlarm: isAlarm,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_Sca_replacement_history 
        //========================================================================================
        my.hs_Sca_replacement_history_Add = function (ParentId, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Sca_replacement_history_Add',
                data: {
                    ParentId: ParentId,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Sca_replacement_history_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Sca_replacement_history_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Sca_replacement_history_List = function (ParentId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Sca_replacement_history_List',
                data: {
                    ParentId: ParentId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Sca_replacement_history_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Sca_replacement_history_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Sca_replacement_history_Update = function (Id, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Sca_replacement_history_Update',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        
        //cymt100 (analizzatori di rete SDIN)
        //========================================================================================
        my.cymt100_Add = function (hsId, Cod, Descr, sn, UserName, marcamodello, installationDate, NoteInterne) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'cymt100_Add',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    Descr: Descr,
                    sn:sn,
                    UserName: UserName,
                    marcamodello: marcamodello, 
                    installationDate: installationDate,
                    NoteInterne: NoteInterne,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.cymt100_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'cymt100_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.cymt100_List = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'cymt100_List',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.cymt100_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'cymt100_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.cymt100_ReadByCod = function (hsId, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'cymt100_ReadByCod',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.cymt100_ReadByCodSync = function (hsId, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'cymt100_ReadByCod',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.cymt100_ReadBysn = function (hsId, sn) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'cymt100_ReadBysn',
                data: {
                    hsId: hsId,
                    sn: sn,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.cymt100_Update = function (Id, Cod, Descr, sn, UserName, marcamodello, installationDate, NoteInterne) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'cymt100_Update',
                data: {
                    Id: Id,
                    Cod: Cod,
                    Descr: Descr,
                    sn: sn,
                    UserName: UserName,
                    marcamodello:marcamodello, 
                    installationDate: installationDate,
                    NoteInterne: NoteInterne,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.cymt100_UpdateMarcamodello = function (Id, marcamodello, installationDate, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'cymt100_UpdateMarcamodello',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.cymt100_setGeoLocation = function (Id, Latitude, Longitude) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'cymt100_setGeoLocation',
                data: {
                    Id: Id,
                    Latitude: Latitude,
                    Longitude: Longitude,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //cymt100_replacement_history (analizzatori di rete SDIN)
        //========================================================================================
        my.cymt100_replacement_history_Add = function (ParentId, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'cymt100_replacement_history_Add',
                data: {
                    ParentId: ParentId,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.cymt100_replacement_history_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'cymt100_replacement_history_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.cymt100_replacement_history_List = function (ParentId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'cymt100_replacement_history_List',
                data: {
                    ParentId: ParentId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.cymt100_replacement_history_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'cymt100_replacement_history_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.cymt100_replacement_history_Update = function (Id, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'cymt100_replacement_history_Update',
                data: {
                    Id:Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //cymt200 (sensori ambientali SDIN tem.hum,light)
        //========================================================================================
        my.cymt200_Add = function (hsId, Cod, Descr, sn, UserName, marcamodello, installationDate, NoteInterne) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'cymt200_Add',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    Descr: Descr,
                    sn: sn,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    NoteInterne: NoteInterne,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.cymt200_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'cymt200_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.cymt200_List = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'cymt200_List',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.cymt200_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'cymt200_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.cymt200_ReadByCod = function (hsId, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'cymt200_ReadByCod',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.cymt200_ReadByCodSync = function (hsId, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'cymt200_ReadByCod',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.cymt200_ReadBysn = function (hsId, sn) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'cymt200_ReadBysn',
                data: {
                    hsId: hsId,
                    sn: sn,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.cymt200_Update = function (Id, Cod, Descr, sn, UserName, marcamodello, installationDate, NoteInterne) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'cymt200_Update',
                data: {
                    Id: Id,
                    Cod: Cod,
                    Descr: Descr,
                    sn: sn,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    NoteInterne:NoteInterne,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.cymt200_UpdateMarcamodello = function (Id, marcamodello, installationDate, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'cymt200_UpdateMarcamodello',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.cymt200_setGeoLocation = function (Id, Latitude, Longitude) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'cymt200_setGeoLocation',
                data: {
                    Id: Id,
                    Latitude: Latitude,
                    Longitude: Longitude,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //cymt200_replacement_history (analizzatori di rete SDIN)
        //========================================================================================
        my.cymt200_replacement_history_Add = function (ParentId, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'cymt200_replacement_history_Add',
                data: {
                    ParentId: ParentId,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.cymt200_replacement_history_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'cymt200_replacement_history_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.cymt200_replacement_history_List = function (ParentId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'cymt200_replacement_history_List',
                data: {
                    ParentId: ParentId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.cymt200_replacement_history_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'cymt200_replacement_history_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.cymt200_replacement_history_Update = function (Id, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'cymt200_replacement_history_Update',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //cymt200Elem (sens. ambientali x elemento)
        //========================================================================================
        my.cymt200Elem_Add = function (hsId, elementCode, ZTHLCod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'cymt200Elem_Add',
                data: {
                    hsId: hsId,
                    elementCode: elementCode,
                    ZTHLCod: ZTHLCod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.cymt200Elem_Del = function (id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'cymt200Elem_Del',
                data: {
                    id: id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.cymt200Elem_List = function (hsId, elementCode) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'cymt200Elem_List',
                data: {
                    hsId: hsId,
                    elementCode: elementCode,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.cymt200Elem_Read = function (id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'cymt200Elem_Read',
                data: {
                    id: id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================


        //W0077 (EXPO gruppo generazione fotovoltaico batterie)
        //========================================================================================
        my.W0077_Add = function (hsId, Cod, Descr,  UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'W0077_Add',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    Descr: Descr,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.W0077_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'W0077_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.W0077_List = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'W0077_List',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.W0077_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'W0077_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.W0077_ReadByCod = function (hsId, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'W0077_ReadByCod',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.W0077_ReadByCodSync = function (hsId, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'W0077_ReadByCod',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.W0077_Update = function (Id, Cod, Descr,  UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'W0077_Update',
                data: {
                    Id: Id,
                    Cod: Cod,
                    Descr: Descr,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //Expo_Split (EXPO split innowatio)
        //========================================================================================
        my.Expo_Split_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Expo_Split_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Expo_Split_ReadByCod = function (hsId, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Expo_Split_ReadByCod',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Expo_Split_setOFF = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Expo_Split_setOFF',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Expo_Split_setTemp = function (Id, TargetTemp) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Expo_Split_setTemp',
                data: {
                    Id: Id,
                    TargetTemp: TargetTemp,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Expo_Split_setFan = function (Id, FanSpeed) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Expo_Split_setFan',
                data: {
                    Id: Id,
                    FanSpeed: FanSpeed,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Expo_Split_setMode = function (Id, OperationalMode) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Expo_Split_setMode',
                data: {
                    Id: Id,
                    OperationalMode: OperationalMode,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Expo_Split_setSwingMode = function (Id, SwingMode) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Expo_Split_setSwingMode',
                data: {
                    Id: Id,
                    SwingMode: SwingMode,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        
        //hs_hvac 
        //========================================================================================
        my.hs_hvac_Add = function (hsId, Cod, Descr, UserName, marcamodello, installationDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_hvac_Add',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    Descr: Descr,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_hvac_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_hvac_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_hvac_List = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_hvac_List',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_hvac_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_hvac_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_hvac_ReadByCod = function (hsId, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_hvac_ReadByCod',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_hvac_ReadByCodSync = function (hsId, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_hvac_ReadByCod',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_hvac_Update = function (Id, Cod, Descr, UserName, marcamodello, installationDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_hvac_Update',
                data: {
                    Id: Id,
                    Cod: Cod,
                    Descr: Descr,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_hvac_UpdateMarcamodello = function (Id, marcamodello, installationDate, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_hvac_UpdateMarcamodello',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_hvac_setGeoLocation = function (Id, Latitude, Longitude) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_hvac_setGeoLocation',
                data: {
                    Id: Id,
                    Latitude: Latitude,
                    Longitude: Longitude,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_hvac_requestParam = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_hvac_requestParam',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_hvac_requestSupplyFan = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_hvac_requestSupplyFan',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_hvac_setSetPoinColdHeat = function (id, setPointCold, setPointHeat) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_hvac_setSetPoinColdHeat',
                data: {
                    id: id,
                    setPointCold: setPointCold,
                    setPointHeat: setPointHeat,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_hvac_setPpmMinOpen = function (Id, ppmMin, ppmMax, OpenShutterMin) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_hvac_setPpmMinOpen',
                data: {
                    Id: Id,
                    ppmMin: ppmMin,
                    ppmMax: ppmMax,
                    OpenShutterMin: OpenShutterMin,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_hvac_setFreeCooling = function (Id, freeCoolingMin, freeCoolingMax) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_hvac_setFreeCooling',
                data: {
                    Id: Id,
                    freeCoolingMin: freeCoolingMin,
                    freeCoolingMax: freeCoolingMax,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_hvac_replacement_history
        //========================================================================================
        my.hs_hvac_replacement_history_Add = function (ParentId, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_hvac_replacement_history_Add',
                data: {
                    ParentId: ParentId,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_hvac_replacement_history_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_hvac_replacement_history_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_hvac_replacement_history_List = function (ParentId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_hvac_replacement_history_List',
                data: {
                    ParentId: ParentId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_hvac_replacement_history_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_hvac_replacement_history_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_hvac_replacement_history_Update = function (Id, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_hvac_replacement_history_Update',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_hvac_setSsupplyFan = function (Id, SFBmsDayEnSP, SFBmsDayEnSPDZ, SFBmsNightEnSP, SFBmsNightEnSPDZ) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_hvac_setSsupplyFan',
                data: {
                    Id: Id,
                    SFBmsDayEnSP: SFBmsDayEnSP,
                    SFBmsDayEnSPDZ: SFBmsDayEnSPDZ,
                    SFBmsNightEnSP: SFBmsNightEnSP,
                    SFBmsNightEnSPDZ: SFBmsNightEnSPDZ,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_hvacCron
        //========================================================================================
        my.hs_hvacCron_Add = function (hvacId, CronId, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_hvacCron_Add',
                data: {
                    hvacId: hvacId,
                    CronId: CronId,      
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_hvacCron_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_hvacCron_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_hvacCron_List = function (hvacId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_hvacCron_List',
                data: {
                    hvacId: hvacId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_hvacCron_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_hvacCron_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //LUX
        //========================================================================================
        my.Lux_Add = function (hsId, Cod, Descr, UserName, marcamodello, installationDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Lux_Add',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    Descr: Descr,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Lux_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Lux_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Lux_List = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Lux_List',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Lux_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Lux_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Lux_ReadByCod = function (hsId, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Lux_ReadByCod',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Lux_ReadByCod_Sync = function (hsId, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Lux_ReadByCod',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Lux_Update = function (Id, Cod, Descr, UserName, marcamodello, installationDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Lux_Update',
                data: {
                    Id: Id,
                    Cod: Cod,
                    Descr: Descr,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Lux_UpdateMarcamodello = function (Id, marcamodello, installationDate, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Lux_UpdateMarcamodello',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Lux_cmd_LightOn = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Lux_cmd_LightOn',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Lux_cmd_LightOff = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Lux_cmd_LightOff',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Lux_cmd_RestoreWorkingMode = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Lux_cmd_RestoreWorkingMode',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //Lux_replacement_history
        //========================================================================================
        my.Lux_replacement_history_Add = function (ParentId, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Lux_replacement_history_Add',
                data: {
                    ParentId: ParentId,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Lux_replacement_history_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Lux_replacement_history_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Lux_replacement_history_List = function (ParentId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Lux_replacement_history_List',
                data: {
                    ParentId: ParentId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Lux_replacement_history_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Lux_replacement_history_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.Lux_replacement_history_Update = function (Id, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'Lux_replacement_history_Update',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //log_Lux
        //========================================================================================
        my.log_Lux_List = function (hsId, Cod, fromDate, toDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_Lux_List',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    fromDate: fromDate,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.log_Lux_ListPaged = function (hsId, Cod, fromDate, toDate, rowNumber) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_Lux_ListPaged',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    fromDate: fromDate,
                    toDate: toDate,
                    rowNumber: rowNumber,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //LuxCron
        //========================================================================================
        my.LuxCron_Add = function (LuxId, CronId, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'LuxCron_Add',
                data: {
                    LuxId: LuxId,
                    CronId: CronId,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.LuxCron_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'LuxCron_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.LuxCron_List = function (LuxId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'LuxCron_List',
                data: {
                    LuxId: LuxId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.LuxCron_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'LuxCron_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //LuxAstr
        //========================================================================================
        my.LuxAstr_Add = function (LuxId, AstrId, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'LuxAstr_Add',
                data: {
                    LuxId: LuxId,
                    AstrId: AstrId,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.LuxAstr_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'LuxAstr_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.LuxAstr_List = function (LuxId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'LuxAstr_List',
                data: {
                    LuxId: LuxId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.LuxCron_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'LuxCron_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //COOV
        //========================================================================================
        my.hs_Coov_Add = function (hsId, Cod, Descr, UserName, marcamodello, installationDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Coov_Add',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    Descr: Descr,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Coov_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Coov_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Coov_List = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Coov_List',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Coov_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Coov_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Coov_ReadByCod = function (hsId, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Coov_ReadByCod',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Coov_ReadByCod_Sync = function (hsId, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Coov_ReadByCod',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Coov_Update = function (Id, Cod, Descr, UserName, marcamodello, installationDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Coov_Update',
                data: {
                    Id: Id,
                    Cod: Cod,
                    Descr: Descr,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Coov_UpdateMarcamodello = function (Id, marcamodello, installationDate, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Coov_UpdateMarcamodello',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //COOV_replacement_history
        //========================================================================================
        my.hs_coov_replacement_history_Add = function (ParentId, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_coov_replacement_history_Add',
                data: {
                    ParentId: ParentId,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_coov_replacement_history_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_coov_replacement_history_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_coov_replacement_history_List = function (ParentId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_coov_replacement_history_List',
                data: {
                    ParentId: ParentId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_coov_replacement_history_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_coov_replacement_history_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_coov_replacement_history_Update = function (Id, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_coov_replacement_history_Update',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //log_hs_coov
        //========================================================================================
        my.log_hs_coov_List = function (hsId, Cod, fromDate, toDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_coov_List',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    fromDate: fromDate,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.log_hs_coov_ListPaged = function (hsId, Cod, fromDate, toDate, rowNumber) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_coov_ListPaged',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    fromDate: fromDate,
                    toDate: toDate,
                    rowNumber: rowNumber,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_CoovElem (Sensori co2 x elemento)
        //========================================================================================
        my.hs_CoovElem_Add = function (hsId, elementCode, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_CoovElem_Add',
                data: {
                    hsId: hsId,
                    elementCode: elementCode,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_CoovElem_Del = function (id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_CoovElem_Del',
                data: {
                    id: id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_CoovElem_List = function (hsId, elementCode) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_CoovElem_List',
                data: {
                    hsId: hsId,
                    elementCode: elementCode,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_CoovElem_Read = function (id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_CoovElem_Read',
                data: {
                    id: id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        
        //HS_SPL
        //========================================================================================
        my.hs_spl_Add = function (hsId, Cod, Descr, NoteInterne, UserName, marcamodello, installationDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_spl_Add',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    Descr: Descr,
                    NoteInterne: NoteInterne,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_spl_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_spl_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_spl_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_spl_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_spl_ReadByCod = function (hsId, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_spl_ReadByCod',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_spl_ReadByCod_Sync = function (hsId, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_spl_ReadByCod',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_spl_List = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_spl_List',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_spl_Update = function (Id, Cod, Descr, NoteInterne, UserName, marcamodello, installationDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_spl_Update',
                data: {
                    Id: Id,
                    Cod: Cod,
                    Descr: Descr,
                    NoteInterne: NoteInterne,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_spl_UpdateMarcamodello = function (Id, marcamodello, installationDate, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_spl_UpdateMarcamodello',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //HS_SPL_replacement_history
        //========================================================================================
        my.hs_spl_replacement_history_Add = function (ParentId, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_spl_replacement_history_Add',
                data: {
                    ParentId: ParentId,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_spl_replacement_history_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_spl_replacement_history_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_spl_replacement_history_List = function (ParentId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_spl_replacement_history_List',
                data: {
                    ParentId: ParentId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_spl_replacement_history_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_spl_replacement_history_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_spl_replacement_history_Update = function (Id, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_spl_replacement_history_Update',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_SplCron
        //========================================================================================
        my.hs_SplCron_Add = function (SplId, CronId, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_SplCron_Add',
                data: {
                    SplId: SplId,
                    CronId: CronId,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_SplCron_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_SplCron_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_SplCron_List = function (SplId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_SplCron_List',
                data: {
                    SplId: SplId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_SplCron_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_SplCron_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //hs_Ev
        //========================================================================================
        my.hs_Ev_Add = function (hsId, Cod, Descr, NoteInterne, UserName, marcamodello, installationDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ev_Add',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    Descr: Descr,
                    NoteInterne: NoteInterne,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ev_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ev_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ev_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ev_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ev_ReadByCod = function (hsId, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ev_ReadByCod',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ev_ReadByCod_Sync = function (hsId, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ev_ReadByCod',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ev_List = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ev_List',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ev_Update = function (Id, Cod, Descr, NoteInterne, UserName, marcamodello, installationDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ev_Update',
                data: {
                    Id: Id,
                    Cod: Cod,
                    Descr: Descr,
                    NoteInterne: NoteInterne,
                    UserName: UserName,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ev_UpdateMarcamodello = function (Id, marcamodello, installationDate, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ev_UpdateMarcamodello',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax

        };
        my.hs_Ev_ForceRun = function (EvId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ev_ForceRun',
                data: {
                    EvId: EvId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ev_ForceStop = function (EvId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ev_ForceStop',
                data: {
                    EvId: EvId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ev_ReleaseForce = function (EvId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ev_ReleaseForce',
                data: {
                    EvId: EvId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ev_getDelayOnOff = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ev_getDelayOnOff',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ev_setDelayOnOff = function (Id, TempoOn, TempoOff) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ev_setDelayOnOff',
                data: {
                    Id: Id,
                    TempoOn: TempoOn,
                    TempoOff: TempoOff,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };

        //========================================================================================
        //hs_Ev_replacement_history
        //========================================================================================
        my.hs_Ev_replacement_history_Add = function (ParentId, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ev_replacement_history_Add',
                data: {
                    ParentId: ParentId,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ev_replacement_history_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ev_replacement_history_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ev_replacement_history_List = function (ParentId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ev_replacement_history_List',
                data: {
                    ParentId: ParentId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ev_replacement_history_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ev_replacement_history_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Ev_replacement_history_Update = function (Id, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Ev_replacement_history_Update',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //log_hs_Ev
        //========================================================================================
        my.log_hs_Ev_List = function (hsId, Cod, fromDate, toDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_Ev_List',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    fromDate: fromDate,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.log_hs_Ev_ListPaged = function (hsId, Cod, fromDate, toDate, rowNumber) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_Ev_ListPaged',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    fromDate: fromDate,
                    toDate: toDate,
                    rowNumber: rowNumber,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        // Astronomical clocks
        //========================================================================================
        my.hs_Astr_Add = function (hsId, Cod, Descr, marcamodello, installationDate, NoteInterne, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Astr_Add',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    Descr: Descr,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    NoteInterne:NoteInterne,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Astr_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Astr_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Astr_List = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Astr_List',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Astr_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Astr_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Astr_ReadByCod = function (hsId, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Astr_ReadByCod',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Astr_ReadByCod_Sync = function (hsId, Cod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Astr_ReadByCod',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Astr_Update = function (Id, Cod, Descr, marcamodello, installationDate, NoteInterne, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Astr_Update',
                data: {
                    Id: Id,
                    Cod: Cod,
                    Descr: Descr,                    
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    NoteInterne:NoteInterne,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Astr_UpdateMarcamodello = function (Id, marcamodello, installationDate, UserName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Astr_UpdateMarcamodello',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    UserName: UserName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Astr_getParam = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Astr_getParam',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Astr_setParam = function (Id, preSunrise, postSunrise, preSunset, postSunset, eveningTwilight, morningTwilight) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Astr_setParam',
                data: {
                    Id: Id,
                    preSunrise: preSunrise,
                    postSunrise: postSunrise,
                    preSunset: preSunset,
                    postSunset: postSunset,
                    eveningTwilight: eveningTwilight,
                    morningTwilight: morningTwilight,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_Astr_replacement_history
        //========================================================================================
        my.hs_Astr_replacement_history_Add = function (ParentId, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Astr_replacement_history_Add',
                data: {
                    ParentId: ParentId,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Astr_replacement_history_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Astr_replacement_history_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Astr_replacement_history_List = function (ParentId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Astr_replacement_history_List',
                data: {
                    ParentId: ParentId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Astr_replacement_history_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Astr_replacement_history_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Astr_replacement_history_Update = function (Id, marcamodello, installationDate, note, userName) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Astr_replacement_history_Update',
                data: {
                    Id: Id,
                    marcamodello: marcamodello,
                    installationDate: installationDate,
                    note: note,
                    userName: userName,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_Astr_Profile ( profili correnti)
        //========================================================================================
        my.hs_Astr_Profile_get = function (hsId, Cod, ProfileYear, ProfileNr) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Astr_Profile_get',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    ProfileYear: ProfileYear,
                    ProfileNr: ProfileNr,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Astr_Profile_List = function (AstrId, ProfileY) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Astr_Profile_List',
                data: {
                    AstrId: AstrId,
                    ProfileY: ProfileY,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Astr_Profile_Read = function (AstrId, ProfileY, ProfileNr) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Astr_Profile_Read',
                data: {
                    AstrId: AstrId,
                    ProfileYear: ProfileY,
                    ProfileNr: ProfileNr,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Astr_Profile_ReadSync = function (AstrId, ProfileY, ProfileNr) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Astr_Profile_Read',
                data: {
                    AstrId: AstrId,
                    ProfileYear: ProfileY,
                    ProfileNr: ProfileNr,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Astr_Profile_set = function (hsId, Cod, ProfileYear, ProfileNr, strProfiledata) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Astr_Profile_set',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    ProfileYear: ProfileYear,
                    ProfileNr: ProfileNr,
                    strProfiledata: strProfiledata,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Astr_Profile_setProfileNow = function (AstrId, ProfileNr) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Astr_Profile_setProfileNow',
                data: {
                    AstrId: AstrId,
                    ProfileNr: ProfileNr,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================        
        //hs_Astr_Profile_Descr (descrizione dei profili)
        //========================================================================================
        my.hs_Astr_Profile_Descr_Update = function (AstrId, ProfileNr, descr) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Astr_Profile_Descr_Update',
                data: {
                    AstrId: AstrId,
                    ProfileNr: ProfileNr,
                    descr: descr,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Astr_Profile_Descr_List = function (AstrId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Astr_Profile_Descr_List',
                data: {
                    AstrId: AstrId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_Astr_Profile_Tasks_Add
        //========================================================================================
        my.hs_Astr_Profile_Tasks_Add = function (AstrId, ProfileNr, Subject, StartDate, EndDate, chkMonday, chkTuesday, chkWednesday, chkThursday, chkFriday, chkSaturday, chkSunday, yearsRepeatable) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Astr_Profile_Tasks_Add',
                data: {
                    AstrId: AstrId,
                    ProfileNr: ProfileNr,
                    Subject: Subject,
                    StartDate: StartDate,
                    EndDate: EndDate,
                    chkMonday: chkMonday,
                    chkTuesday: chkTuesday,
                    chkWednesday: chkWednesday,
                    chkThursday: chkThursday,
                    chkFriday: chkFriday,
                    chkSaturday: chkSaturday,
                    chkSunday: chkSunday,
                    yearsRepeatable: yearsRepeatable,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Astr_Profile_Tasks_Del = function (TaskId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Astr_Profile_Tasks_Del',
                data: {
                    TaskId: TaskId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Astr_Profile_Tasks_List = function (AstrId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Astr_Profile_Tasks_List',
                data: {
                    AstrId: AstrId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Astr_Profile_Tasks_ListByMonth = function (AstrId, calYear, calMonth) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Astr_Profile_Tasks_ListByMonth',
                data: {
                    CronId: CronId,
                    calYear: calYear,
                    calMonth: calMonth,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Astr_Profile_Tasks_ListByDates = function (AstrId, startDate, endDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Astr_Profile_Tasks_ListByDates',
                data: {
                    CronId: CronId,
                    startDate: startDate,
                    endDate: endDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Astr_Profile_Tasks_ListAll = function () {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Astr_Profile_Tasks_ListAll',
                data: {
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Astr_Profile_Tasks_ListCurrent = function (AstrId, selDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Astr_Profile_Tasks_ListCurrent',
                data: {
                    AstrId: AstrId,
                    selDate: selDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Astr_Profile_Tasks_Read = function (TaskId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Astr_Profile_Tasks_Read',
                data: {
                    TaskId: TaskId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Astr_Profile_Tasks_Update = function (TaskId, ProfileNr, Subject, StartDate, EndDate, chkMonday, chkTuesday, chkWednesday, chkThursday, chkFriday, chkSaturday, chkSunday, yearsRepeatable) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Astr_Profile_Tasks_Update',
                data: {
                    TaskId: TaskId,
                    ProfileNr: ProfileNr,
                    Subject: Subject,
                    StartDate: StartDate,
                    EndDate: EndDate,
                    chkMonday: chkMonday,
                    chkTuesday: chkTuesday,
                    chkWednesday: chkWednesday,
                    chkThursday: chkThursday,
                    chkFriday: chkFriday,
                    chkSaturday: chkSaturday,
                    chkSunday: chkSunday,
                    yearsRepeatable: yearsRepeatable,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        //hs_Cron_Calendar
        my.hs_Astr_Calendar_Add = function (AstrId, Calyear, Calmonth, strmonthData) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Astr_Calendar_Add',
                data: {
                    AstrId: AstrId,
                    Calyear: Calyear,
                    Calmonth: Calmonth,
                    strmonthData: strmonthData,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Astr_Calendar_Read = function (AstrId, Calyear, Calmonth) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Astr_Calendar_Read',
                data: {
                    AstrId: AstrId,
                    Calyear: Calyear,
                    Calmonth: Calmonth,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Astr_CalendarReadFromDB = function (AstrId, Calyear, Calmonth) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Astr_CalendarReadFromDB',
                data: {
                    AstrId: AstrId,
                    Calyear: Calyear,
                    Calmonth: Calmonth,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Astr_Calendar_replaceDesiredWithTask = function (AstrId, Calyear, Calmonth) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Astr_Calendar_replaceDesiredWithTask',
                data: {
                    AstrId: AstrId,
                    Calyear: Calyear,
                    Calmonth: Calmonth,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Astr_Calendar_UpdateDesired = function (AstrId, Calyear, Calmonth, strmonthData) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Astr_Calendar_UpdateDesired',
                data: {
                    AstrId: AstrId,
                    Calyear: Calyear,
                    Calmonth: Calmonth,
                    strmonthData: strmonthData,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Astr_Calendar_get = function (AstrId, Calyear, Calmonth) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Astr_Calendar_get',
                data: {
                    AstrId: AstrId,
                    Calyear: Calyear,
                    Calmonth: Calmonth,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_Astr_Calendar_Set = function (AstrId, Calyear, Calmonth) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_Astr_Calendar_Set',
                data: {
                    AstrId: AstrId,
                    Calyear: Calyear,
                    Calmonth: Calmonth,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //hs_ErrorLog
        //========================================================================================
        my.hs_ErrorLog_List = function (hsId,  fromDate, toDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_ErrorLog_List',
                data: {
                    hsId: hsId,  
                    fromDate: fromDate,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_ErrorLog_ListAll = function (hsId, rowNumber) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_ErrorLog_ListAll',
                data: {
                    hsId: hsId,
                    rowNumber: rowNumber,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_ErrorLog_ListByElement = function (hsId, hselement, rowNumber) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_ErrorLog_ListByElement',
                data: {
                    hsId: hsId,
                    hselement: hselement,
                    rowNumber: rowNumber,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //hs_UserAlert
        //========================================================================================
        my.hs_UserAlert_Add = function (hsId, IdContatto) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_UserAlert_Add',
                data: {
                    hsId: hsId,
                    IdContatto: IdContatto,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_UserAlert_Del = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_UserAlert_Del',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_UserAlert_List = function (hsId) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_UserAlert_List',
                data: {
                    hsId: hsId,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.hs_UserAlert_Read = function (Id) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_UserAlert_Read',
                data: {
                    Id: Id,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //log_hs_Anz
        //========================================================================================
        my.log_hs_Anz_List = function (hsId, Cod, fromDate, toDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_Anz_List',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    fromDate: fromDate,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.log_hs_Anz_ListAll = function (hsId, fromDate, toDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_Anz_ListAll',
                data: {
                    hsId: hsId,
                    fromDate: fromDate,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.log_hs_Anz_ListPaged = function (hsId, Cod, fromDate, toDate, rowNumber) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_Anz_ListPaged',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    fromDate: fromDate,
                    toDate: toDate,
                    rowNumber: rowNumber,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //log_hs_Gru
        //========================================================================================
        my.log_hs_Gru_List = function (hsId, GruCod, fromDate, toDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_Gru_List',
                data: {
                    hsId: hsId,
                    GruCod: GruCod,
                    fromDate: fromDate,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.log_hs_Gru_ListAll = function (hsId,  fromDate, toDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_Gru_ListAll',
                data: {
                    hsId: hsId,
                    fromDate: fromDate,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.log_hs_Gru_ListPaged = function (hsId, GruCod, fromDate, toDate, rowNumber) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_Gru_ListPaged',
                data: {
                    hsId: hsId,
                    GruCod: GruCod,
                    fromDate: fromDate,
                    toDate: toDate,
                    rowNumber: rowNumber,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        }
        //========================================================================================

        //log_hs_Cal
        //========================================================================================
        my.log_hs_Cal_List = function (hsId, CalCod, fromDate, toDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_Cal_List',
                data: {
                    hsId: hsId,
                    CalCod: CalCod,
                    fromDate: fromDate,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.log_hs_Cal_ListAll = function (hsId, fromDate, toDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_Cal_ListAll',
                data: {
                    hsId: hsId,
                    fromDate: fromDate,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.log_hs_Cal_ListPaged = function (hsId, CalCod, fromDate, toDate, rowNumber) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_Cal_ListPaged',
                data: {
                    hsId: hsId,
                    CalCod: CalCod,
                    fromDate: fromDate,
                    toDate: toDate,
                    rowNumber: rowNumber,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //log_hs_Cir
        //========================================================================================
        my.log_hs_Cir_List = function (hsId, CirCod, fromDate, toDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_Cir_List',
                data: {
                    hsId: hsId,
                    CirCod: CirCod,
                    fromDate: fromDate,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.log_hs_Cir_ListAll = function (hsId,  fromDate, toDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_Cir_ListAll',
                data: {
                    hsId: hsId,
                    CirCod: CirCod,
                    fromDate: fromDate,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.log_hs_Cir_ListPaged = function (hsId, CirCod, fromDate, toDate, rowNumber) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_Cir_ListPaged',
                data: {
                    hsId: hsId,
                    CirCod: CirCod,
                    fromDate: fromDate,
                    toDate: toDate,
                    rowNumber: rowNumber,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //log_hs_Cron
        //========================================================================================
        my.log_hs_Cron_List = function (hsId, CronCod, fromDate, toDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_Cron_List',
                data: {
                    hsId: hsId,
                    CronCod: CronCod,
                    fromDate: fromDate,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.log_hs_Cron_ListAll = function (hsId, fromDate, toDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_Cron_ListAll',
                data: {
                    hsId: hsId,
                    fromDate: fromDate,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.log_hs_Cron_ListPaged = function (hsId, CronCod, fromDate, toDate, rowNumber) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_Cron_ListPaged',
                data: {
                    hsId: hsId,
                    CronCod: CronCod,
                    fromDate: fromDate,
                    toDate: toDate,
                    rowNumber: rowNumber,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //log_hs_Ctb
        //========================================================================================
        my.log_hs_Ctb_List = function (hsId, CtbCod, fromDate, toDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_Ctb_List',
                data: {
                    hsId: hsId,
                    CtbCod: CtbCod,
                    fromDate: fromDate,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.log_hs_Ctb_ListAll = function (hsId,  fromDate, toDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_Ctb_ListAll',
                data: {
                    hsId: hsId,
                    fromDate: fromDate,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.log_hs_Ctb_ListPaged = function (hsId, Cod, fromDate, toDate, rowNumber) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_Ctb_ListPaged',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    fromDate: fromDate,
                    toDate: toDate,
                    rowNumber: rowNumber,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //log_hs_Ctl
        //========================================================================================
        my.log_hs_Ctl_List = function (hsId, CtlCod, fromDate, toDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_Ctl_List',
                data: {
                    hsId: hsId,
                    CtlCod: CtlCod,
                    fromDate: fromDate,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.log_hs_Ctl_ListAll = function (hsId,  fromDate, toDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_Ctl_ListAll',
                data: {
                    hsId: hsId,
                    fromDate: fromDate,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.log_hs_Ctl_ListPaged = function (hsId, CtlCod, fromDate, toDate, rowNumber) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_Ctl_ListPaged',
                data: {
                    hsId: hsId,
                    CtlCod: CtlCod,
                    fromDate: fromDate,
                    toDate: toDate,
                    rowNumber: rowNumber,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        
        //log_hs_Ctp (contatori di portata)
        //========================================================================================
        my.log_hs_Ctp_List = function (hsId, Cod, fromDate, toDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_Ctp_List',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    fromDate: fromDate,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.log_hs_Ctp_ListAll = function (hsId, fromDate, toDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_Ctp_ListAll',
                data: {
                    hsId: hsId,
                    fromDate: fromDate,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.log_hs_Ctp_ListPaged = function (hsId, Cod, fromDate, toDate, rowNumber) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_Ctp_ListPaged',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    fromDate: fromDate,
                    toDate: toDate,
                    rowNumber: rowNumber,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //log_hs_Doors
        //========================================================================================
        my.log_hs_Doors_List = function (hsId, DoorCod, fromDate, toDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_Doors_List',
                data: {
                    hsId: hsId,
                    DoorCod: DoorCod,
                    fromDate: fromDate,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.log_hs_Doors_ListAll = function (hsId,  fromDate, toDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_Doors_ListAll',
                data: {
                    hsId: hsId,
                    fromDate: fromDate,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.log_hs_Doors_ListPaged = function (hsId, DoorCod, fromDate, toDate, rowNumber) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_Doors_ListPaged',
                data: {
                    hsId: hsId,
                    DoorCod: DoorCod,
                    fromDate: fromDate,
                    rowNumber: rowNumber,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //log_hs_Gas
        //========================================================================================
        my.log_hs_Gas_List = function (hsId, Cod, fromDate, toDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_Gas_List',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    fromDate: fromDate,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.log_hs_Gas_ListAll = function (hsId, fromDate, toDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_Gas_ListAll',
                data: {
                    hsId: hsId,
                    fromDate: fromDate,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.log_hs_GasListPaged = function (hsId, Cod, fromDate, toDate, rowNumber) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_GasListPaged',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    fromDate: fromDate,
                    rowNumber: rowNumber,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //log_hs_pb
        //========================================================================================
        my.log_hs_pb_List = function (hsId, Cod, fromDate, toDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_pb_List',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    fromDate: fromDate,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.log_hs_pb_ListAll = function (hsId, fromDate, toDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_pb_ListAll',
                data: {
                    hsId: hsId,
                    fromDate: fromDate,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.log_hs_pb_ListPaged = function (hsId, Cod, fromDate, toDate, rowNumber) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_pb_ListPaged',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    fromDate: fromDate,
                    rowNumber: rowNumber,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //log_hs_pm
        //========================================================================================
        my.log_hs_pm_List = function (hsId, Cod, fromDate, toDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_pm_List',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    fromDate: fromDate,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.log_hs_pm_ListPaged = function (hsId, Cod, fromDate, toDate, rowNumber) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_pm_ListPaged',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    fromDate: fromDate,
                    rowNumber: rowNumber,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //log_hs_Sca
        //========================================================================================
        my.log_hs_Sca_List = function (hsId, Cod, fromDate, toDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_Sca_List',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    fromDate: fromDate,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.log_hs_Sca_ListPaged = function (hsId, Cod, fromDate, toDate, rowNumber) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_Sca_ListPaged',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    fromDate: fromDate,
                    rowNumber: rowNumber,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //log_hs_tb
        //========================================================================================
        my.log_hs_tb_List = function (hsId, Cod, fromDate, toDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_tb_List',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    fromDate: fromDate,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.log_hs_tb_ListAll = function (hsId,  fromDate, toDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_tb_ListAll',
                data: {
                    hsId: hsId,
                    fromDate: fromDate,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.log_hs_tb_ListPaged = function (hsId, Cod, fromDate, toDate, rowNumber) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_tb_ListPaged',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    fromDate: fromDate,
                    rowNumber: rowNumber,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //log_hs_TemperatureProbes
        //========================================================================================
        my.log_hs_TemperatureProbes_List = function (hsId, ProbeCod, fromDate, toDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_TemperatureProbes_List',
                data: {
                    hsId: hsId,
                    ProbeCod: ProbeCod,
                    fromDate: fromDate,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.log_hs_TemperatureProbes_ListAll = function (hsId, fromDate, toDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_TemperatureProbes_ListAll',
                data: {
                    hsId: hsId,
                    fromDate: fromDate,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.log_hs_TemperatureProbes_ListPaged = function (hsId, ProbeCod, fromDate, toDate, rowNumber) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_TemperatureProbes_ListPaged',
                data: {
                    hsId: hsId,
                    ProbeCod: ProbeCod,
                    fromDate: fromDate,
                    rowNumber: rowNumber,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //log_hs_Vrd
        //========================================================================================
        my.log_hs_Vrd_List = function (hsId, VrdCod, fromDate, toDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_Vrd_List',
                data: {
                    hsId: hsId,
                    VrdCod: VrdCod,
                    fromDate: fromDate,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.log_hs_Vrd_ListAll = function (hsId, fromDate, toDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_Vrd_ListAll',
                data: {
                    hsId: hsId,
                    fromDate: fromDate,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.log_hs_Vrd_ListPaged = function (hsId, ProbeCod, fromDate, toDate, rowNumber) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_Vrd_ListPaged',
                data: {
                    hsId: hsId,
                    ProbeCod: ProbeCod,
                    fromDate: fromDate,
                    rowNumber: rowNumber,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //log_cymt100
        //========================================================================================
        my.log_cymt100_List = function (hsId, Cod, fromDate, toDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_cymt100_List',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    fromDate: fromDate,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.log_cymt100_ListPaged = function (hsId, Cod, fromDate, toDate, rowNumber) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_cymt100_ListPaged',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    fromDate: fromDate,
                    toDate: toDate,
                    rowNumber:rowNumber,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //log_cymt200
        //========================================================================================
        my.log_cymt200_List = function (hsId, Cod, fromDate, toDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_cymt200_List',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    fromDate: fromDate,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.log_cymt200_ListPaged = function (hsId, Cod, fromDate, toDate, rowNumber) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_cymt200_ListPaged',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    fromDate: fromDate,
                    toDate: toDate,
                    rowNumber: rowNumber,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================
        
        //log_W0077
        //========================================================================================
        my.log_W0077_List = function (hsId, Cod, fromDate, toDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_W0077_List',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    fromDate: fromDate,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.log_W0077_ListPaged = function (hsId, Cod, fromDate, toDate, rowNumber) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_W0077_ListPaged',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    fromDate: fromDate,
                    toDate: toDate,
                    rowNumber: rowNumber,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //log_hs_hvac
        //========================================================================================
        my.log_hs_hvac_List = function (hsId, Cod, fromDate, toDate) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_hvac_List',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    fromDate: fromDate,
                    toDate: toDate,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.log_hs_hvac_ListPaged = function (hsId, Cod, fromDate, toDate, rowNumber) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'log_hs_hvac_ListPaged',
                data: {
                    hsId: hsId,
                    Cod: Cod,
                    fromDate: fromDate,
                    toDate: toDate,
                    rowNumber: rowNumber,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //test dsm
        //========================================================================================
        my.hs_dsm_getClimatic = function (hsId, CalCod) {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'hs_dsm_getClimatic',
                data: {
                    hsId: hsId,
                    CalCod: CalCod,
                    DateCtrl: new Date().getTime()
                },
                type: 'GET',
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        function noConnection() {
            toastr.options = {
                "closeButton": true,
                "debug": false,
                "positionClass": "toast-top-full-width",
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
            toastr["error"](langResources['msg4noconnection'], langResources['alert']);
        }

        return my;
    })({});
})(jQuery)
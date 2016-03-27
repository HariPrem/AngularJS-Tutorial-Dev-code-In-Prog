eventApp.service("EventLogic", function () {
    JSRequest.EnsureSetup();
    hostweburl = decodeURIComponent(JSRequest.QueryString["SPHostUrl"]);
    appweburl = decodeURIComponent(JSRequest.QueryString["SPAppWebUrl"]);
    this.getCaseInformation = function ($scope,CaseName) {
        //alert(CaseName);
        var deferred = $.Deferred();
        var requestingURL = appweburl + "/_api/SP.AppContextSite(@target)/web/lists/GetByTitle('Case')/items?$filter=Case_x0020_Name eq '"+CaseName+"'&@target='" + hostweburl + "'";
        var executor = new SP.RequestExecutor(appweburl);
        executor.executeAsync({
            url: requestingURL,
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
            success: function (JSONDataObject) {
                //alert('Executing');
                deferred.resolve(JSON.parse(JSONDataObject.body));
                
            },
            error: function (JSONDataObject) {
                
                alert('Failed to Query Case list');
                deferred.reject(JSONDataObject);

            }

        });
        return deferred;
    };

    this.getCaseAttorney = function (attorneyID) {
        var deferred = $.Deferred();
        var executor = new SP.RequestExecutor(appweburl);
        executor.executeAsync({
            url: appweburl + "/_api/SP.AppContextSite(@target)/web/getuserbyID('" + attorneyID + "')?@target='" + hostweburl + "'",
            method: 'GET',
            headers:{"Accept":"application/json; odata=verbose"},
            success: function (data) {
                deferred.resolve(JSON.parse(data.body).d.Title)
                
            },
            error: function (data) {
                alert('error occurred');
                deferred.reject(JSON.stringify(data));
            }
        });
        return deferred;
        
    };


    this.getAllCase = function () {
        var deferred = $.Deferred();
        var restUrlValue = appweburl + "/_api/SP.AppcontextSite(@target)/web/lists/getByTitle('Case')/items?@target='" + hostweburl + "'";
        var executor =new SP.RequestExecutor(appweburl);
        executor.executeAsync({
            url: restUrlValue,
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
            success: function (data) {
                deferred.resolve(JSON.parse(data.body));
            },
            error: function (data) {
                alert('Error occurred');
                deferred.reject(JSON.parse(data));
            }
        });
        return deferred;
    };

    this.getAssociatedHoldNotice = function ($scope,CAID) {
        var deferred = $.Deferred();
        var requestingURL = appweburl + "/_api/SP.AppContextSite(@target)/web/lists/GetByTitle('HoldNotice')/items?$filter=CA_x0020_IDId eq '" + CAID + "'&@target='" + hostweburl + "'";
        var executor = new SP.RequestExecutor(appweburl);
        executor.executeAsync({
            url: requestingURL,
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
            success: function (JSONDataObject) {
                //alert('Executing');
                deferred.resolve(JSON.parse(JSONDataObject.body));

            },
            error: function (JSONDataObject) {

                alert('Failed to Query Case list');
                deferred.reject(JSONDataObject);

            }

        });
        return deferred;
    }
    
    
});



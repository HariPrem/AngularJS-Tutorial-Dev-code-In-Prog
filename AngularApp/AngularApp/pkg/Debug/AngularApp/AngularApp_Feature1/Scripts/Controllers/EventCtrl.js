eventApp.controller("EventCtrl", ["$scope", "EventLogic", function ($scope, EventLogic) {
    JSRequest.EnsureSetup();
    hostweburl = decodeURIComponent(JSRequest.QueryString["SPHostUrl"]);
    appweburl = decodeURIComponent(JSRequest.QueryString["SPAppWebUrl"]);
    $scope.CaseInfo = [];
    $scope.ControlDisabled = true;
    $scope.SpacingCSS = { 'width': '50%', 'color': 'blue' };
    $scope.SpacingCSS_Div = { 'width': '50%', 'color': 'blue', 'float': 'left' };
    $scope.appWebUrl = hostweburl;
    //$scope.displayHold = true;
    SP.SOD.executeOrDelayUntilScriptLoaded(PopulateCase, "sp.js");
    function PopulateCase() {
        $scope.AllCases = [];
        $scope.pullDetails = function () {
            $scope.dispHold = false;
            $scope.HoldNotice = [];
            //alert('Function link');
            //alert($scope.CaseName);
            CaseInformation($scope.CaseName);
        }
        $.when(EventLogic.getAllCase($scope))
            .done(function (data) {
                //alert(JSON.stringify(data));
                angular.forEach(data.d.results, function (item) {
                    //alert(JSON.stringify(item));
                $scope.AllCases.push({
                    CaseName: item.Case_x0020_Name,
                    CaseID: item.CaseID
                });
                });
                $scope.$apply();
            })
            .fail(function (data) {
                alert('Error occurred');
            });
    }
    function CaseInformation(CaseName) {
        //alert(CaseName);
        $.when(EventLogic.getCaseInformation($scope,CaseName))
            .done(function (jsonObject) {
                $scope.CaseInfo = [];
                angular.forEach(jsonObject.d.results, function (item) {
                    var attorney;
                     $.when(EventLogic.getCaseAttorney(item.Case_x0020_AttorneyId))
                        .done(function (jsonOjectValue)
                        {
                            attorney = jsonOjectValue;
                            $scope.CaseInfo.push({
                                CaseName: item.Case_x0020_Name,
                                CaseDescription: item.Case_x0020_Description,
                                CaseID: item.CaseID,
                                CaseIdVal:item.ID,
                                CaseAttorney: attorney
                            });
                             $scope.$apply();
                        })
                        .fail(function (jsonObjectValue)
                        {alert('Error Occurred') });
                 });

            })
            .fail(function (jsonObject) {
                alert(JSON.stringify(jsonObject));
        });

    }

    $scope.getHoldDetails = function() {
        if ($scope.dispHold) {
            var CaseID = $scope.CaseInfo[0].CaseIdVal;
            $scope.HoldNotice = [];
            $.when(EventLogic.getAssociatedHoldNotice($scope, CaseID))
                .done(function (data) {
                    angular.forEach(data.d.results, function (item) {
                        $scope.HoldNotice.push({
                            HoldID: item.HN_x0020_ID,
                            HoldItemID: item.ID
                        });
                    });
                    $scope.$apply();
                })
            .fail(function (data) {
            })
        }
        else {
            $scope.HoldNotice = [];
        }
    }
}]);
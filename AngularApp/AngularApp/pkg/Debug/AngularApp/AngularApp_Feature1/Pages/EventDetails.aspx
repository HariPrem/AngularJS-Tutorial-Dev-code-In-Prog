<%@ Page language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.7.1.min.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.RequestExecutor.js" ></script>
    <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js">
</script>
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-route.js"></script>

    <!-- Add your CSS styles to the following file -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />
    <!--<link rel="Stylesheet" type="text/css" href="../Content/bootstrap.min.css" />-->



    <!-- Add your JavaScript to the following file -->
    <script type="text/javascript" src="../Scripts/App.js"></script>
    <!--<script type="text/javascript" src="../Scripts/LibraryFiles/Angular/angular.min.js"></script>-->
    <script type="text/javascript" src="../Scripts/LibraryFiles/bootstrap.min.js"></script>
    <script type="text/javascript" src="../Scripts/LibraryFiles/underscore-1.4.4.min.js"></script>
    <!--<script type="text/javascript" src="../Scripts/LibraryFiles/Angular/angular-route.min.js"></script>-->
    <%--<script type="text/javascript" src="../Scripts/LibraryFiles/Angular/angular-resource.min.js"></script>--%>
    <script type="text/javascript" src="../Scripts/LibraryFiles/Angular/angular-sanitize.min.js"></script>
    <script type="text/javascript" src="../Scripts/Controllers/EventCtrl.js"></script>
    <script type="text/javascript" src="../Scripts/Services/EventLogic.js"></script>

</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ID="Content1" ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Case & Hold Notice Details Page
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ID="Content2" ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <div class="Container" ng-app="EventApp" >
         <div ng-controller="EventCtrl">
             <select id="CaseName" style="width:auto" ng-model="CaseName" ng-change="pullDetails()">
                 <option value="Select">Please Select</option>
                 <option ng-repeat="case in AllCases" value="{{case.CaseName}}">{{case.CaseName}}</option>
             </select>
             <input type="button" value="Show Details" ng-click="pullDetails()"/>
             
             <div id="Case Information" ng-repeat="Case in CaseInfo">
                 <div style="width:100%">
                 <label style="float:left; width:40%;">Case ID  </label>
                 <input type="text" value="{{Case.CaseID}}" ng-disabled="ControlDisabled" style="width:50%;color:blue;"></input>
                     </div>
                 <div style="width:100%">
                     <label style="float:left; width:40%;">Case Name  </label>
                     <input type="text" value="{{Case.CaseName | uppercase}}" ng-disabled="ControlDisabled" style="width:50%;color:blue;"></input>
                 
                     </div>
                 <div style="width:100%">
                     <label style="float:left; width:40%;">Case Description  </label>
                 <div ng-bind-html="Case.CaseDescription" ng-style="SpacingCSS_Div"></div>

                         </div>
                 <div>
                     <label style="float:left; width:40%;">Case Attorney : </label>
                 <input type="text" value="{{Case.CaseAttorney}}" ng-disabled="ControlDisabled" ng-style="SpacingCSS_Div"></input>
                     </div>
             </div>
<div style="width:100%;float:left;">
    <input type="checkbox" id="displayHold" ng-model="dispHold" ng-checked="resetSelection" ng-change="getHoldDetails()" />
    <label>Display associated Hold Notice ID's</label>
</div>
             
             <div ng-repeat="notice in HoldNotice" style="width:100%;float:left;">
                 <div style="width:100%;float:left;">Associated Hold Notice</div>
                 <a ng-href="{{appWebUrl}}/Lists/HoldNotice/DispForm.aspx?ID={{notice.HoldItemID}}" target="_blank">{{notice.HoldID}}</a></div>
         </div>
    </div>
</asp:Content>

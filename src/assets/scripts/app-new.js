/* global FastClick, smoothScroll */
angular.module('transItApp', ['ngSanitize', 'ngTouch', 'ngAnimate', 'ngRoute', 'kendo.directives', 'ngScrollbar']);

//########################### ROUTING ##################################
angular.module('transItApp').config(['$routeProvider', function ($routeProvider) {

    $routeProvider


    //.when("/", { templateUrl: 'www/app/transIT/home.html', controller: 'homeController' })
    //.when("/home", { templateUrl: 'www/app/transIT/home.html', controller: 'homeController' })      
    //.otherwise({ redirectTo: '/home' });
}]);

angular.module('transItApp').directive('dirtyonchange', function () {
    return {
        require: '^form',
        restrict: 'A',
        link: function (scope, element, attr, ngFormController) {
            element.on('change', function (event) {
                ngFormController.$setDirty();
            });
        }
    };
})


$(function () {
    window.setTimeout(function () {
        //Jquery code here
    });
});

//function showMessagePopUp(msgcontent) {
//    //debugger;
//    document.getElementById('divpopupMessagecontent').innerHTML = msgcontent;
//    $('#divpopupMessageControl').modal('show');
//}
function showMessagePopUpOpenItem(msgcontent) {
    //debugger;
    document.getElementById('divpopupMessagecontentopenitem').innerHTML = msgcontent;
    $('#divpopupMessageControlopenitem').modal('show');
}
angular.module('transItApp').controller('clHomeController', ['$rootScope', '$scope', '$location', '$timeout',
    function ($rootScope, $scope, $location, $timeout) {

        // Required for routing
        $rootScope.Route = "client";
        $rootScope.page = "home";

    }])
angular.module('transItApp').config(['$routeProvider', function ($routeProvider) {

    $routeProvider

	    .when("/client", { templateUrl: 'www/app/client/home.html', controller: 'clHomeController' })
        .when("/client/dashboard", { templateUrl: 'www/app/client/dashboard/dashboard.html', controller: 'clDashboardController' })
        .when("/client/wave-progress", { templateUrl: 'www/app/client/wave-progress/wave.html', controller: 'clWaveController' })
        .when("/client/activityupdate", { templateUrl: 'www/app/client/activityupdate/activityupdate.html', controller: 'clActivityUpdateController' })
        .when("/client/raid", { templateUrl: 'www/app/client/raid/raid.html', controller: 'clRaidController' })
        .when("/client/raid-risk", { templateUrl: 'www/app/client/raid/details/risk.html', controller: 'clRaidController' })
        .when("/client/raid-issue", { templateUrl: 'www/app/client/raid/details/issue.html', controller: 'clRaidController' })
        .when("/client/raid-action", { templateUrl: 'www/app/client/raid/details/action.html', controller: 'clRaidController' })
        .when("/client/project-contacts", { templateUrl: 'www/app/client/project-contacts/projectContact.html', controller: 'clProjectContactController' })
        .when("/client/support", { templateUrl: 'www/app/client/support/support.html', controller: 'clSupportController' })

        .when("/icons", { templateUrl: 'www/app/client/icons.html', controller: 'clHomeController' })
}]);
angular.module('transItApp').controller('baseController', ['$http', '$compile', '$rootScope', '$scope', '$location', '$timeout', '$document', '$filter',
  function ($http, $compile, $rootScope, $scope, $location, $timeout, $document, $filter) {

      $rootScope.$on('scrollbar.scroll', function () {
          setTimeout(function () {
              $("*").each(function () {

                  var dropdownlist = $(this).data("kendoDropDownList");
                  if (dropdownlist) {
                      dropdownlist.close();
                  }
                  var multiSelect = $(this).data("kendoMultiSelect");
                  if (multiSelect) {
                      multiSelect.close();
                  }
                  var datepicker = $(this).data("kendoDatePicker");
                  if (datepicker) {
                      datepicker.close();
                  }
              });
          });
      });

      $('.tabs').find('li a').click(function () {
          $('#imgMpp').show();
          $('#imgMppDiv').show();
          $rootScope.rowPerSize = 10;
          var upload = $("#upload_file").data("kendoUpload");
          if (upload != undefined) {
              upload.clearAllFiles();
              $(".k-upload-status.k-upload-status-total").find("span").remove();
          }
      });

      $scope.$back = function () {
          window.history.back();
      };
      $scope.OpportunityId = $('#hidOppId').val();
      $scope.DealName = $('#hidDealName').val();
      $scope.PageName = $('#hidPageName').val();
      $scope.clientname = $('#hidClientName').val();
      $rootScope.redirectType = $('#redirectType').val();
      $rootScope.isLogOut = false;
      //$scope.DTTReport = $('#hidDTTReport').val();
      //$scope.KTTReport = $('#hidKTTReport').val();
      //$scope.AssessmentTTTReport = $('#hidAssessmentTTTReport').val();
      //$scope.AssessmentDTT = $('#hidAssessmentDTT').val();
      //$scope.RecruitmentReport = $('#RecruitmentReport').val();

      setTimeout(function () {
          var div = document.getElementById('imgMppDiv');
          div.style.visibility = "hidden";
          div.style.display = "none";
          var div1 = document.getElementById('imgMpp');
          div1.style.visibility = "hidden";
          div1.style.display = "none";
      }, 5000);

      $scope.RedirectToProjectStaffing = function () {
          window.location.href = '/ProjectSetup/CoreTeam/ActualStaffing?DealId=' + $('#hidDealId').val();
      }
      $scope.RedirecTExecutionDash = function () {

          window.location.href = '/WaveExecution/ExecutiveSnapShot/ExecutiveSnapShot?DealId=' + $('#hidDealId').val();
      }
      $scope.RedirectWaveDetails = function () {
          if ($('#FirstWaveProcessId').val() != null)
              window.location.href = '/waveExecution/SubWaveHome/SubWaveHome/?SubWaveId=' + $('#FirstWaveProcessId').val();
      }
      $scope.RedirectEP = function () {
          if ($('#FirstWaveProcessId').val() != null) {

              window.location.href = '/waveExecution/waveExecution/enablePeople?SubWaveId=' + $('#FirstWaveProcessId').val() + "&workstreamId=" + $('#FirstEPWorkstreamId').val();
          }
      }
      var NAFlag = false;
      $scope.RedirectNA = function (name) {
          NAFlag = true;
          window.location.href = '/waveExecution/waveExecution//WorkStreamNotApplicable?wsname=' + name;
      }
      $scope.RedirectTTT = function () {
          if ($('#FirstWaveProcessId').val() != null)
              window.location.href = '/waveExecution/waveExecution/TransferKnowledge?SubWaveId=' + $('#FirstWaveProcessId').val() + "&workstreamId=" + $('#FirstTTTWorkstreamId').val();
      }
      $scope.RedirectDTT = function () {
          if ($('#FirstWaveProcessId').val() != null)
              window.location.href = '/waveExecution/waveExecution/DeliveryTeamTraining?SubWaveId=' + $('#FirstWaveProcessId').val() + "&workstreamId=" + $('#FirstDTTWorkstreamId').val();
      }
      $scope.RedirectTWE = function () {
          if ($('#FirstWaveProcessId').val() != null)
              window.location.href = '/waveExecution/waveExecution/ImplementTechnology?SubWaveId=' + $('#FirstWaveProcessId').val() + "&workstreamId=" + $('#FirstTWEWorkstreamId').val();
      }
      $scope.RedirectBE = function () {
          if ($('#FirstBPOWaveProcessId').val() != null)
              window.location.href = '/WaveExecution/BusinessExcellence/BusinessExcellence?subwaveId=' + $('#FirstBPOWaveProcessId').val() + "&pagename=BE";
      }
      $scope.RedirectSR = function () {
          if ($('#FirstWaveProcessId').val() != null)
              window.location.href = '/waveExecution/waveExecution/DeliveryOperation?SubWaveId=' + $('#FirstWaveProcessId').val() + "&workstreamId=" + $('#FirstSRWorkstreamId').val();
      }
      $scope.RedirectEPActivity = function () {
          window.location.href = '/waveExecution/waveExecution/enablePeople?SubWaveId=' + $('#FirstWaveProcessId').val() + "&workstreamId=" + $('#FirstEPWorkstreamId').val() + "pagename=0";
      }
      $scope.RedirectSDO = function () {
          window.location.href = '/waveExecution/waveExecution/enablePeople?SubWaveId=' + $('#FirstWaveProcessId').val() + "&workstreamId=" + $('#FirstEPWorkstreamId').val() + "&pagename=1";
      }
      $scope.RedirectTravelTracker = function () {
          window.location.href = '/waveExecution/waveExecution/enablePeople?SubWaveId=' + $('#FirstWaveProcessId').val() + "&workstreamId=" + $('#FirstEPWorkstreamId').val() + "&pagename=2";
      }
      $scope.RedirectTTTActivity = function () {
          window.location.href = '/waveExecution/waveExecution/TransferKnowledge?SubWaveId=' + $('#FirstWaveProcessId').val() + "&workstreamId=" + $('#FirstTTTWorkstreamId').val() + "&pagename=0";
      }
      $scope.RedirectTTTTracker = function () {
          window.location.href = '/waveExecution/waveExecution/TransferKnowledge?SubWaveId=' + $('#FirstWaveProcessId').val() + "&workstreamId=" + $('#FirstTTTWorkstreamId').val() + "&pagename=1";
      }
      $scope.RedirectDTPTTTTracker = function () {
          window.location.href = '/waveExecution/waveExecution/TransferKnowledge?SubWaveId=' + $('#FirstWaveProcessId').val() + "&workstreamId=" + $('#FirstTTTWorkstreamId').val() + "&pagename=2";
      }
      $scope.RedirectTTTAssessment = function () {
          window.location.href = '/waveExecution/waveExecution/TransferKnowledge?SubWaveId=' + $('#FirstWaveProcessId').val() + "&workstreamId=" + $('#FirstTTTWorkstreamId').val() + "&pagename=3";
      }
      $scope.RedirectTTTApproval = function () {
          window.location.href = '/waveExecution/waveExecution/TransferKnowledge?SubWaveId=' + $('#FirstWaveProcessId').val() + "&workstreamId=" + $('#FirstTTTWorkstreamId').val() + "&pagename=4";
      }
      $scope.RedirectDTTActivity = function () {
          window.location.href = '/waveExecution/waveExecution/DeliveryTeamTraining?SubWaveId=' + $('#FirstWaveProcessId').val() + "&workstreamId=" + $('#FirstDTTWorkstreamId').val() + "&pagename=0";
      }
      $scope.RedirectDTTTracker = function () {
          window.location.href = '/waveExecution/waveExecution/DeliveryTeamTraining?SubWaveId=' + $('#FirstWaveProcessId').val() + "&workstreamId=" + $('#FirstDTTWorkstreamId').val() + "&pagename=1";
      }
      $scope.RedirectDTPDTTTracker = function () {
          window.location.href = '/waveExecution/waveExecution/DeliveryTeamTraining?SubWaveId=' + $('#FirstWaveProcessId').val() + "&workstreamId=" + $('#FirstDTTWorkstreamId').val() + "&pagename=2";
      }
      $scope.RedirectDTTAssessment = function () {
          window.location.href = '/waveExecution/waveExecution/DeliveryTeamTraining?SubWaveId=' + $('#FirstWaveProcessId').val() + "&workstreamId=" + $('#FirstDTTWorkstreamId').val() + "&pagename=3";
      }
      $scope.RedirectDTTApproval = function () {
          window.location.href = '/waveExecution/waveExecution/DeliveryTeamTraining?SubWaveId=' + $('#FirstWaveProcessId').val() + "&workstreamId=" + $('#FirstDTTWorkstreamId').val() + "&pagename=4";
      }
      $scope.RedirectSRActivity = function () {
          window.location.href = '/waveExecution/waveExecution/DeliveryOperation?SubWaveId=' + $('#FirstWaveProcessId').val() + "&workstreamId=" + $('#FirstSRWorkstreamId').val() + "&pagename=0";
      }
      $scope.RedirectBPSSRTAssess = function () {
          window.location.href = '/waveExecution/waveExecution/DeliveryOperation?SubWaveId=' + $('#FirstWaveProcessId').val() + "&workstreamId=" + $('#FirstSRWorkstreamId').val() + "&pagename=1";
      }
      $scope.RedirectIOSRTAssess = function () {
          window.location.href = '/waveExecution/waveExecution/DeliveryOperation?SubWaveId=' + $('#FirstWaveProcessId').val() + "&workstreamId=" + $('#FirstSRWorkstreamId').val() + "&pagename=1";
      }
      $scope.RedirectSRTApproval = function () {
          window.location.href = '/waveExecution/waveExecution/DeliveryOperation?SubWaveId=' + $('#FirstWaveProcessId').val() + "&workstreamId=" + $('#FirstSRWorkstreamId').val() + "&pagename=2";
      }
      $scope.RedirectSRAT = function () {
          window.location.href = '/waveExecution/waveExecution/DeliveryOperation?SubWaveId=' + $('#FirstBPOWaveProcessId').val() + "&workstreamId=" + $('#FirstSRWorkstreamId').val() + "&pagename=3";
      }
      $scope.RedirectTWEActivity = function () {
          window.location.href = '/waveExecution/waveExecution/ImplementTechnology?SubWaveId=' + $('#FirstWaveProcessId').val() + "&workstreamId=" + $('#FirstTWEWorkstreamId').val() + "&pagename=0";
      }
      $scope.RedirectTWETracker = function () {
          window.location.href = '/waveExecution/waveExecution/ImplementTechnology?SubWaveId=' + $('#FirstWaveProcessId').val() + "&workstreamId=" + $('#FirstTWEWorkstreamId').val() + "&pagename=1";
      }
      $scope.RedirectTWEAccessTracker = function () {
          window.location.href = '/waveExecution/waveExecution/ImplementTechnology?SubWaveId=' + $('#FirstWaveProcessId').val() + "&workstreamId=" + $('#FirstTWEWorkstreamId').val() + "&pagename=2";
      }
      $scope.ReturntoDmatHome = function () {
          window.location.href = '/DMAT/Project/DMATHome/';
      }
      $scope.RedirectPMOmeeting = function () {
          window.location.href = '/PMO/MinutesOfMeetingDetails/Meeting#/' + $('#hidDealId').val();
      };
      $scope.RedirectProjectlogs = function () {
          window.location.href = '/PMO/PMOLogs/PMO#/' + $('#hidDealId').val();
      }
      $scope.RedirectContractualmang = function () {
          window.location.href = '/PMO/ContractualManagement/Index#/' + $('#hidDealId').val();
      };
      $scope.RedirectFinanceMang = function () {
          window.location.href = '/ProjectExecution/BudgetTracker/BudgetTracker#/' + $('#hidDealId').val();
      };
      $scope.redirectToWorkstream = function (url) {
          window.location.href = url;
      };
      $scope.RedirecttrackerDays = function () {
          $scope.RedirectWaveReport('Handover');
          //if ($('#FirstWaveProcessId').val() != null)
          //    window.location.href = "/HandoverToOperation/OpenItem/OpenItems?" + "subwaveId=" + $('#FirstWaveProcessId').val();
      };
      //FeedBack Start
      $scope.openFeedback = function () {
          $rootScope.isLogOut = false;
          openFeedback();
      };

      function openFeedback() {
          $.ajax({
              url: '/CommonComponent/CommonComponent/IsFeedBackAvailable',
              traditional: true,
              type: 'POST',
              datatype: 'json',
              async: false,
              cache: false,
              success: function (data) {
                  if (data == "False" || $rootScope.isLogOut == false) {
                      $scope.wndFeedBack = angular.element("#feedbackForm").kendoWindow({
                          title: false,
                          modal: true,
                          visible: false,
                          resizable: false,
                          width: 780
                      }).data("kendoWindow").center();

                      $scope.wndFeedBack.open();

                      angular.element('.dismiss').on('click', function () {
                          if ($rootScope.isCloseButton == true) {
                              //$rootScope.isCloseButton = false;
                              $("#ErrorText").text("");
                              $("#feedbacktext").val("");
                              $scope.wndFeedBack.close();
                              if ($rootScope.isLogOut == true) {
                                  sessionStorage.BookmarkList = '';
                                  window.location.href = '/CommonComponent/CommonComponent/LogOut';
                              }
                          }
                          else {
                              if ($rootScope.feedbackValue == '') {
                                  $rootScope.isValidText = true;
                                  $scope.$apply();
                              } else if (angular.element('#feedbacktext').val() == '' && $rootScope.feedbackValue <= 3) {
                                  $rootScope.isValidText = true;
                                  $scope.$apply();
                              } else {
                                  $rootScope.feedbackLikeList = [];
                                  $rootScope.feedbackHateList = [];
                                  $rootScope.feedbackValue = '';
                                  $rootScope.feedBackText = '';
                                  $rootScope.isValidText = false;
                                  angular.forEach($rootScope.feedBacks, function (option) {
                                      option.like = false;
                                      option.hate = false;
                                  });
                                  $("#ErrorText").text("");
                                  $("#feedbacktext").val("");
                                  $scope.wndFeedBack.close();
                                  $('#feedBackModal').appendTo("body").modal('show');
                              }
                          }

                          //if ($rootScope.isLogOut == true) {
                          //    sessionStorage.BookmarkList = '';
                          //    window.location.href = '/CommonComponent/CommonComponent/LogOut';
                          //}
                      })
                  }
                  else {
                      if ($rootScope.isLogOut == true) {
                          sessionStorage.BookmarkList = '';
                          window.location.href = '/CommonComponent/CommonComponent/LogOut';
                      }
                  }
              }
          });

      }
      //FeedBack End
      $scope.RedirectRecruitmentReport = function () {
          $.ajax({
              url: '/CommonComponent/CommonComponent/IsReportDataAvailable',
              data: { 'reportName': "Recruitment" },
              traditional: true,
              type: 'POST',
              datatype: 'json',
              async: false,
              cache: false,
              success: function (data) {
                  if (data == "True") {
                      var url = $('#RecruitmentReport').val();
                      url = url.replace(/%26/g, "&");
                      window.open(url + '(' + $('#hidDealId').val() + ')');
                  }
                  else {
                      showMessagePopUpBM("There is no data in wave workstream setup");
                  }
              }
          });

      };
      $scope.RedirectTTTProgressReport = function () {
          $.ajax({
              url: '/CommonComponent/CommonComponent/IsReportDataAvailable',
              data: { 'reportName': "TTTProgress" },
              traditional: true,
              type: 'POST',
              datatype: 'json',
              async: false,
              cache: false,
              success: function (data) {
                  if (data == "True") {
                      var url = $('#hidKTTReport').val();
                      url = url.replace(/%26/g, "&");
                      window.open(url + '(' + $('#hidDealId').val() + ')');
                  }
                  else {
                      showMessagePopUpBM("There is no data in TTT Tracker across all active waves (or) TTT applicable is set to No in Wave Workstream Setup across all waves");
                  }
              }
          });

      };
      $scope.RedirectDTTProgressReport = function (count) {
          $.ajax({
              url: '/CommonComponent/CommonComponent/IsReportDataAvailable',
              data: { 'reportName': "DTTProgress" },
              traditional: true,
              type: 'POST',
              datatype: 'json',
              async: false,
              cache: false,
              success: function (data) {
                  if (data == "True") {
                      var url = $('#hidDTTReport').val();
                      url = url.replace(/%26/g, "&");
                      window.open(url + '(' + $('#hidDealId').val() + ')');
                  }
                  else {
                      showMessagePopUpBM("There is no data in DTT Tracker across all active waves (or) DTT applicable is set to No in Wave Workstream Setup across all waves");
                  }
              }
          });


      };
      $scope.RedirectTTTProficiencyReport = function () {
          $.ajax({
              url: '/CommonComponent/CommonComponent/IsReportDataAvailable',
              data: { 'reportName': "TTTProficiency" },
              traditional: true,
              type: 'POST',
              datatype: 'json',
              async: false,
              cache: false,
              success: function (data) {
                  if (data == "True") {
                      var url = $('#hidAssessmentTTTReport').val();
                      url = url.replace(/%26/g, "&");
                      window.open(url + '(' + $('#hidDealId').val() + ')');
                  }
                  else {
                      showMessagePopUpBM("There is no data in TTT Assessment Tracker across all active waves (or) TTT applicable is set to No in Wave Workstream Setup across all waves");
                  }
              }
          });


      };
      $scope.RedirectDTTProficiencyReport = function () {
          $.ajax({
              url: '/CommonComponent/CommonComponent/IsReportDataAvailable',
              data: { 'reportName': "DTTProficiency" },
              traditional: true,
              type: 'POST',
              datatype: 'json',
              async: false,
              cache: false,
              success: function (data) {
                  if (data == "True") {
                      var url = $('#hidAssessmentDTT').val();
                      url = url.replace(/%26/g, "&");
                      window.open(url + '(' + $('#hidDealId').val() + ')');
                  }
                  else {
                      showMessagePopUpBM("There is no data in DTT Assessment Tracker across all active waves (or) DTT applicable is set to No in Wave Workstream Setup across all waves");
                  }
              }
          });

      };

      //$scope.RedirectRecruitmentReport = function () {
      //    window.open('https://bi7.ciostage.accenture.com/QvAJAXZfc/opendocNoToolbar.htm?document=transit_reports%5Ctransit_recruitmentstatusreport.qvw&lang=en-US&host=QVS%40Cluster&select=LB10,' + $('#hidDealId').val());
      //};
      //$scope.RedirectTTTProgressReport = function () {
      //    window.open('https://bi7.ciostage.accenture.com/QvAJAXZfc/opendocNoToolbar.htm?document=transit_reports%5Ctransit_kttdttreports.qvw&lang=en-US&host=QVS%40Cluster&select=LB07,' + $('#hidDealId').val());
      //};
      //$scope.RedirectDTTProgressReport = function () {
      //    window.open('https://bi7.ciostage.accenture.com/QvAJAXZfc/opendocNoToolbar.htm?document=transit_reports%5Ctransit_dttreports.qvw&lang=en-US&host=QVS%40Cluster&select=LB07,' + $('#hidDealId').val());
      //};
      //$scope.RedirectTTTProficiencyReport = function () {
      //    window.open('https://bi7.ciostage.accenture.com/QvAJAXZfc/opendocNoToolbar.htm?document=transit_reports%5Ctransit_assesmenttracker.qvw&lang=en-US&host=QVS%40Cluster&select=LB08,' + $('#hidDealId').val());
      //};
      //$scope.RedirectDTTProficiencyReport = function () {
      //    window.open('https://bi7.ciostage.accenture.com/QvAJAXZfc/opendocNoToolbar.htm?document=transit_reports%5Ctransit_assesmenttracker_dtt.qvw&lang=en-US&host=QVS%40Cluster&select=LB08,' + $('#hidDealId').val());
      //};


      $scope.RedirectSolutionWorkbookInformation = function () {
          $.ajax({
              url: '/CommonComponent/CommonComponent/IsReportDataAvailable',
              data: { 'reportName': "SolutionWorkbook" },
              traditional: true,
              type: 'POST',
              datatype: 'json',
              async: false,
              cache: false,
              success: function (data) {
                  if (data == "True") {
                      var url = $('#hidSolutionWorkbookInformation').val();
                      url = url.replace(/%26/g, "&");
                      window.open(url + '(' + $('#hidDealId').val() + ')');
                  }
                  else {
                      showMessagePopUpBM("There is no data in wave workstream setup");
                  }
              }
          });

      }
      $scope.RedirectProjectScorecard = function () {
          $.ajax({
              url: '/CommonComponent/CommonComponent/IsReportDataAvailable',
              data: { 'reportName': "ProjectScorecard" },
              traditional: true,
              type: 'POST',
              datatype: 'json',
              async: false,
              cache: false,
              success: function (data) {
                  if (data == "True") {
                      var url = $('#hidProjectScorecard').val();
                      url = url.replace(/%26/g, "&");
                      window.open(url + '(' + $('#hidDealId').val() + ')');
                  }
                  else {
                      showMessagePopUpBM("There is no data in wave workstream setup.");
                  }
              }
          });

      }
      $scope.RedirectTWEAccessStatusReport = function () {
          $.ajax({
              url: '/CommonComponent/CommonComponent/IsReportDataAvailable',
              data: { 'reportName': "TWEAccess" },
              traditional: true,
              type: 'POST',
              datatype: 'json',
              async: false,
              cache: false,
              success: function (data) {
                  if (data == "True") {
                      var url = $('#hidTWEAccessStatusReport').val();
                      url = url.replace(/%26/g, "&");
                      window.open(url + '(' + $('#hidDealId').val() + ')');
                  }
                  else {
                      showMessagePopUpBM("There is no data (resource names, tools/applications/devices) in TWE Access Tracker across all active waves (or) TWE applicable is set to No in Wave Workstream Setup across all waves");
                  }
              }
          });

      }
      $scope.RedirectRAIDReport = function () {
          $.ajax({
              url: '/CommonComponent/CommonComponent/IsReportDataAvailable',
              data: { 'reportName': "RAID" },
              traditional: true,
              type: 'POST',
              datatype: 'json',
              async: false,
              cache: false,
              success: function (data) {
                  if (data == "True") {
                      var url = $('#hidRAIDReport').val();
                      url = url.replace(/%26/g, "&");
                      window.open(url + '(' + $('#hidDealId').val() + ')');
                  }
                  else {
                      showMessagePopUpBM("There is no data in Risks, Issues, Actions in Project logs for this deal.");
                  }
              }
          });

      }

      $scope.RedirectSRTBPOIOReport = function () {
          $.ajax({
              url: '/CommonComponent/CommonComponent/IsReportDataAvailable',
              data: { 'reportName': "SRT" },
              traditional: true,
              type: 'POST',
              datatype: 'json',
              async: false,
              cache: false,
              success: function (data) {
                  if (data == "True") {
                      var url = $('#hidSRTReport').val();
                      url = url.replace(/%26/g, "&");
                      window.open(url + '(' + $('#hidDealId').val() + ')');
                  }
                  else {
                      showMessagePopUpBM("There is no data in SRT for this deal.");
                  }
              }
          });

      }

      $scope.RedirectManagementReport = function () {
          $.ajax({
              url: '/CommonComponent/CommonComponent/IsReportDataAvailable',
              data: { 'reportName': "ManagementReport" },
              traditional: true,
              type: 'POST',
              datatype: 'json',
              async: false,
              cache: false,
              success: function (data) {
                  if (data == "True") {
                      var url = $('#hidManagementReport').val();
                      url = url.replace(/%26/g, "&");
                      window.open(url);
                  } else if (data == "-1") {
                      showMessagePopUpBM("You do not have access to view this report.");
                  }
                  else {
                      showMessagePopUpBM("There is no deal available.");
                  }
              }
          });

      }

      $scope.RedirectWaveReport = function (redirectType) {
          debugger;
          $rootScope.redirectType = redirectType;
          $("#redirectType").val(redirectType);
          $http.get("/Dashboard/Dashboard/SubWaveOptionView/").then(function (response) {
              var html = $('#WaveDetailsModal_Div').html(response.data);
              $compile(html)($scope);
          });
          setTimeout(function () {
              var s = document.getElementById("namepgR");
              if (s != null)
                  s.value = redirectType;
              $('#WaveDetailsModal').appendTo("body").modal('show');
          }, 1000);
      }

      $scope.RedirectStabilizationSummary = function () {
          debugger
          window.location.href = '/WaveExecution/Stabilization/Stabilization';
      }

      $scope.GoToReport = function (s) {
          // debugger;
          var s = s.trim();
          if (s != "" || s != null) {
              var index = s.indexOf("(");
              if (index > 0) {
                  s = s.substring(0, index);
              }
          }
          var sId = 0;
          $.ajax({
              url: '/WaveSetup/Home/GetSubWaveId',
              data: { 'subwaveName': s },
              traditional: true,
              type: 'POST',
              datatype: 'json',
              async: false,
              cache: false,
              success: function (data) {
                  sId = data;
                  $rootScope.waveId = data;
              }
          });
          var p = $rootScope.redirectType;//document.getElementById("namepgR");
          console.log(p);
          if (p == undefined || p == null || p.value == "" || p.value == null) {
              $('#WaveDetailsModal').appendTo("body").modal('hide');
          }
          if (p == "Report")
              window.location.href = "/ProjectExecution/WaveReport/WaveReport?" + "SubWaveId=" + sId;
          if (p == "Handover") {
              //window.location.href = "/HandOverToOperation/HandOverOperations/Handover?" + "subwaveName=" + s;
              window.location.href = "/HandoverToOperation/OpenItem/OpenItems?" + "subwaveId=" + $rootScope.waveId;
          }
          if (p == "WaveSetup") {
              window.location.href = "/WaveSetup/Home/Home?" + "subwaveName=" + s;
          }
          if (p == "Stabilization") {
              window.location.href = "/WaveExecution/BusinessExcellence/BusinessExcellence?" + "subwaveId=" + sId + "&pagename=" + "BE";
          }
          if (p == "SRAT") {
              window.location.href = '/waveExecution/waveExecution/DeliveryOperation?SubWaveId=' + sId + "&pagename=3";
          }
          if (p == "SubWaveExeDashboard") {
              window.location.href = "/waveExecution/SubWaveHome/SubWaveHome/?" + "SubWaveId=" + sId;
          }

      }

      $rootScope.openStablizationStream = function () {
          var wnd = angular.element("#stabilization_selector").kendoWindow({
              title: false,
              modal: true,
              visible: false,
              resizable: false,
              width: 430
          }).data("kendoWindow").center();
          wnd.open();
          $('.dismiss, .workstream-list li a').on('click', function () {
              wnd.close();
          });
      };

      $rootScope.openCheckPoint = function () {
          var wnd = angular.element("#checkpoint_selector").kendoWindow({
              title: false,
              modal: true,
              visible: false,
              resizable: false,
              width: 430
          }).data("kendoWindow").center();
          wnd.open();
          $('.dismiss, .workstream-list li a').on('click', function () {
              wnd.close();
          });
      };

      $rootScope.isMegaMenuOpened = false;
      $(".header-nav").on('shown.bs.dropdown', function (event) {
          $rootScope.isMegaMenuOpened = true;
          $scope.$apply();
      });

      $(".header-nav").on('hidden.bs.dropdown', function (event) {
          $rootScope.isMegaMenuOpened = false;
          $scope.$broadcast('rebuildLinksPop');
          $scope.$apply();
      });

      //Page Navigation
      $rootScope.goto = function (pageUrl) {
          $location.path(pageUrl);
      };
      // On dropdown open
      $(document).on('shown.bs.dropdown', function (event) {
          var dropdown = $(event.target);
          // Set aria-expanded to true
          dropdown.find('.dropdown-menu').attr('aria-expanded', true);
      });

      // On dropdown close
      $(document).on('hidden.bs.dropdown', function (event) {
          var dropdown = $(event.target);
          // Set aria-expanded to false
          dropdown.find('.dropdown-menu').attr('aria-expanded', false);
      });

      $rootScope.$on('$viewContentLoaded', function () { });
      $rootScope.searchIni = function () {
          $rootScope.showSearch = true;
      };
      $rootScope.closeSearch = function () {
          $rootScope.showSearch = false;
      };
      $rootScope.notifications = [{
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'
      }, {
          content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,'
      }]
      $('[rel="popover"].notification').popover({
          container: 'body',
          html: true,
          trigger: 'click',
          placement: 'bottom',
          title: 'Notifications <a href class="close"><span class="acn-cross"></span></a>',
          template: '<div class="popover notification" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
          content: function () {
              var clone = $($(this).data('popover-content')).clone(true).removeClass('hide');
              return clone;
          }
      }).on('shown.bs.popover', function () {
          var $popup = $(this);
          $('#backdrop').toggleClass('modal-backdrop in');
          $('.popover').find('.close').click(function (e) {
              $popup.popover('toggle');
              e.preventDefault();
          });
      }).on('hide.bs.popover', function () {
          $('#backdrop').removeClass('modal-backdrop in');
      });
      //$('body').on('click', function (e) {
      //    $('[rel="popover"]').each(function () {
      //        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
      //            $(this).popover('hide');
      //        }
      //    });
      //});

      $scope.print = function () {
          window.print();
      }
      $('.dropdown-menu').on("click.bs.dropdown", function (e) {
          if ((!$(event.target).hasClass('acn-cross')) && (!$(event.target).hasClass('close'))) {
              e.stopPropagation();
              //e.preventDefault();
          }
      });

      angular.element('.header-nav').on("shown.bs.dropdown", function (e) {
          angular.element('.transIT-inner ul.header-nav > li').removeAttr('style');
          angular.element('.transIT-inner ul.header-nav > li.open').siblings().css({
              'font-weight': 'normal',
              'background': 'transparent'
          });
      });
      angular.element('.header-nav').on("hide.bs.dropdown", function (e) {
          angular.element('.transIT-inner ul.header-nav > li').removeAttr('style');
      });
      $scope.redirectToLogout = function () {
          $rootScope.isLogOut = true;
          openFeedback();
          //sessionStorage.BookmarkList = '';
          //window.location.href = '/CommonComponent/CommonComponent/LogOut';
      };
      $scope.redirectToUrl = function (page) {
          switch (page) {
              case 'deal-info':
                  window.location.href = '/ProjectSetup/Deal/Index/#/?id=1';
                  break
              case 'mec':
                  window.location.href = '/ProjectSetup/ProjectSetup/MECPage/#/?id=4';
                  break
              case 'transition-plan':
                  window.location.href = '/ProjectSetup/ProjectSetup/ProjectSetup/#/?id=2';
                  break
              case 'proj-staffing':
                  window.location.href = '/ProjectSetup/Staffing/Staffing/#/?id=3';
                  break
              case 'proj-artifacts':
                  window.location.href = '/ProjectSetup/RisksandAssumptions/UploadDocuments/#/?id=7';
                  break
              case 'proj-plan':
                  window.location.href = '/ProjectSetup/DetailedPlan/Index/#/';
                  break
              case 'proj-User':
                  window.location.href = '/ProjectSetup/ProjUserAccess/ProjUserAccess#/';
                  break
              case 'deal-execution':
                  window.location.href = '/ProjectExecution/DealExecution/DealExecution#/';
                  break
              case 'project-plan':
                  window.location.href = '/projectexecution/projectplan/projectplan';
                  break
              case 'exe-proj-staffing':
                  window.location.href = '/ProjectSetup/CoreTeam/ActualStaffing?DealId=' + $('#hidDealId').val();
                  break
              case 'governance-dashboard':
                  window.location.href = '/StageGate/StageGate/Dashboard';
                  break
              case 'stagegate-setup':
                  window.location.href = '/StageGate/StageGate/StageGateSetup';
                  break
              case 'spa':
                  window.location.href = '/SolutionPyramidAnalysis/SolutionPyramidAnalysis/SolutionPyramidAnalysis';
                  break
              case 'GNG':
                  window.location.href = '/PMO/GoNoGo/Dashboard';
                  break
              case 'change-management':
                  window.location.href = '/PMO/ChangeLog/Change#/';
                  break
              case 'pct-kit':
                  window.location.href = '/ControlFramework/ControlFramework/ControlFramework';
                  break
              case 'wave-details':
                  $scope.RedirectWaveDetails();
                  break
              case 'enable-people':
                  if ($('#EPApplicable').val() == "value")
                      $scope.RedirectEP();
                  else
                      $scope.RedirectNA('Enable People');
                  break
              case 'train-the-trainer':
                  if ($('#TTTApplicable').val() == "value")
                      $scope.RedirectTTT();
                  else
                      $scope.RedirectNA('Train the Trainer');
                  break
              case 'del-team-training':
                  if ($('#DTTApplicable').val() == "value")
                      $scope.RedirectDTT();
                  else
                      $scope.RedirectNA('Delivery Team Training');
                  break
              case 'service-readiness':
                  if ($('#SRApplicable').val() == "value")
                      $scope.RedirectSR();
                  else
                      $scope.RedirectNA('Service Readiness');
                  break
              case 'tech-work-environment':
                  if ($('#TWEApplicable').val() == "value")
                      $scope.RedirectTWE();
                  else
                      $scope.RedirectNA('Tech And Work Environment');
                  break
              case 'psr':
                  if ($('#DealSGDEX').val() == "BPO")
                      showMessagePopUpBM("This module is not applicable for this deal");
                  else {
                      if ($('#PSRValue').val() == "Eligible")
                          window.open($('#PSRValueLink').val());
                      else
                          showMessagePopUpBM("Kindly configure PSR in the Deal Information page");
                  }
                  break
              case 'dex':
                  if ($('#DealSGDEX').val() == "BPO")
                      showMessagePopUpBM("This module is not applicable for this deal");
                  else {
                      if ($('#DEXValue').val() == "Eligible")
                          window.location.href = "/WaveExecution/DeliveryExcellence/DeliveryExcellence";
                      else
                          showMessagePopUpBM("Kindly configure DEX in the Deal Information page");
                  }
                  break
              case 'biz-excellence':
                  if ($('#bmSG').val() == "BPO")
                      $scope.RedirectBE()
                  else
                      showMessagePopUpBM("This module is not applicable for this deal");
                  break
              case 'project-log':
                  $scope.RedirectProjectlogs();
                  break
              case 'fin-management':
                  $scope.RedirectFinanceMang();
                  break
              case 'tracking-days':
                  $scope.RedirectWaveReport('Handover');
                  break
              case 'stabilization-summary':
                  $scope.RedirectStabilizationSummary();
                  break
              case 'meetings':
                  $scope.RedirectPMOmeeting();
                  break
              case 'governance':
                  window.location.href = '/StageGate/StageGate/Dashboard';
                  break
              case 'srat':
                  if ($('#bmSG').val() == "BPO")
                      $scope.RedirectSRAT();
                  else
                      showMessagePopUpBM("This module is not applicable for this deal");
                  break
              default:

          }
      }
      if (sessionStorage.BookmarkList == null || sessionStorage.BookmarkList == '') {
          $.ajax({
              url: '/CommonComponent/CommonComponent/GetBookmark',
              traditional: true,
              type: 'POST',
              datatype: 'json',
              async: false,
              cache: false,
              success: function (data) {
                  sessionStorage.BookmarkList = JSON.stringify(data);
              }
          });
      }

      // if (!$rootScope.docks) {
      $rootScope.docks = [];
      var bm = JSON.parse(sessionStorage.BookmarkList);
      for (var i = 0; i < bm.length; i++) {
          $rootScope.docks.push({
              'module': bm[i].Module,
              'page': bm[i].Page,
              'pageName': bm[i].PageName
          });
      }
      // }

      $rootScope.bookmark = function (module, page, pageName) {
          $('#imgBookMarkDiv').show();
          $('#imgBookMark').show();
          var results = $filter('filter')($rootScope.docks, {
              'pageName': pageName
          }, true);
          if (results.length > 0) {
              for (var i = $scope.docks.length - 1; i >= 0; i--) {
                  if ($scope.docks[i].pageName == pageName) {
                      $scope.docks.splice(i, 1);
                      var bmList = [{ 'IsActive': 'N', 'Module': module, 'Page': page, 'PageName': pageName }]
                      var bmListString = JSON.stringify(bmList)
                      $.ajax({
                          url: '/CommonComponent/CommonComponent/SaveBookmark',
                          data: { bookmark: bmListString },
                          traditional: true,
                          type: 'POST',
                          datatype: 'json',
                          async: true,
                          cache: false,
                          success: function (data) {
                              $('#imgBookMarkDiv').hide();
                              $('#imgBookMark').hide();
                          },
                          error: function (e) {
                              $('#imgBookMarkDiv').hide();
                              $('#imgBookMark').hide();
                          }
                      });
                      $timeout(function () {
                          navigationResize();
                      });
                  }
              }
          } else {
              $rootScope.docks.push({
                  'module': module,
                  'page': page,
                  'pageName': pageName
              });
              var bmList = [{ 'IsActive': 'Y', 'Module': module, 'Page': page, 'PageName': pageName }]
              var bmListString = JSON.stringify(bmList)
              $.ajax({
                  url: '/CommonComponent/CommonComponent/SaveBookmark',
                  data: { bookmark: bmListString },
                  traditional: true,
                  type: 'POST',
                  datatype: 'json',
                  async: true,
                  cache: false,
                  success: function (data) {
                      $('#imgBookMarkDiv').hide();
                      $('#imgBookMark').hide();
                  },
                  error: function (e) {
                      $('#imgBookMarkDiv').hide();
                      $('#imgBookMark').hide();
                  }
              });
              $timeout(function () {
                  navigationResize();
              });
          }
          var bmObj = [];
          for (var i = 0; i < $scope.docks.length; i++) {
              bmObj.push({
                  'Module': $scope.docks[i].module,
                  'Page': $scope.docks[i].page,
                  'PageName': $scope.docks[i].pageName
              });

          }
          sessionStorage.BookmarkList = JSON.stringify(bmObj);

      };

      $rootScope.inDock = function (page) {
          var IsAdded = false;
          angular.forEach($rootScope.docks, function (value, key) {
              if (value.pageName == page) {
                  IsAdded = true;
              }
          });
          return IsAdded;
      };
      $rootScope.removeLinks = []
      $scope.removeBookMark = function (item, e) {
          var results = $filter('filter')($rootScope.removeLinks, {
              'pageName': item.pageName
          }, true);
          if (results.length > 0) {
              for (var i = $scope.removeLinks.length - 1; i >= 0; i--) {
                  if ($scope.removeLinks[i].pageName == item.pageName) {
                      $scope.removeLinks.splice(i, 1);
                      $(e.target).parent().addClass('docked');
                  }
              }
          } else {
              $rootScope.removeLinks.push({
                  'module': item.module,
                  'page': item.page,
                  'pageName': item.pageName
              });
              $(e.target).parent().removeClass('docked');
          }
      };

      $scope.saveManageLinks = function () {
          for (var i = $scope.removeLinks.length - 1; i >= 0; i--) {
              $rootScope.bookmark($scope.removeLinks[i].module, $scope.removeLinks[i].page, $scope.removeLinks[i].pageName);
          }
          $rootScope.removeLinks = [];
      };

      $scope.manageDock = function () {
          var wnd = angular.element("#manageDock").kendoWindow({
              title: false,
              modal: true,
              visible: false,
              resizable: false,
              width: 430
          }).data("kendoWindow").center();
          wnd.open();
          $('.dismiss').on('click', function () {
              wnd.close();
          })
          $scope.$broadcast('rebuild');
      };
      $scope.closeManageWindow = function () {
          $rootScope.removeLinks = [];
          $('.manage-links li a').addClass('docked');
      }

      function navigationResize() {
          $('#nav li.more').before($('#overflow > li'));

          var $navItemMore = $('#nav > li.more'),
            $navItems = $('#nav > li:not(.more)'),
            navItemMoreWidth = navItemWidth = $navItemMore.width(),
            windowWidth = $('#bookmarkedItem').width(),
            navItemMoreLeft, offset, navOverflowWidth;

          $navItems.each(function () {
              navItemWidth += $(this).width();
          });

          $navItems.length ? $navItemMore.show() : $navItemMore.hide();

          while (navItemWidth > windowWidth) {
              navItemWidth -= $navItems.last().width();
              $navItems.last().prependTo('#overflow');
              $navItems.splice(-1, 1);
          }
          $scope.$broadcast('rebuildLinksPop');
      }
      $timeout(function () {
          navigationResize();
      });
      window.onresize = navigationResize;

      //Grid Expand
      $rootScope.isExpandGrid = false;
      $scope.epandGrid = function (myId) {
          $rootScope.isExpandGrid = !$rootScope.isExpandGrid;
          $rootScope.isMegaMenuOpened = !$rootScope.isMegaMenuOpened;
          $scope.$apply();
      }
      $(document).keyup(function (e) {
          if (e.keyCode == 27) { // escape key maps to keycode `27`
              $rootScope.isExpandGrid = false;
              $rootScope.isMegaMenuOpened = false;
              $scope.$apply();
          }
      });

      //$scope.expandEditableGrid = function (myId) {

      //    $rootScope.isExpandGrid = !$rootScope.isExpandGrid;

      //    if ($rootScope.isExpandGrid)
      //        $(myId).data("kendoGrid").hideColumn(0);
      //    else
      //        $(myId).data("kendoGrid").showColumn(0);
      //}

      //$(document).keyup(function (e) {
      //    if (e.keyCode == 27) { // escape key maps to keycode `27`
      //        {
      //            $rootScope.isExpandGrid = false;
      //            $scope.$apply();
      //            if ($(".k-grid").data("kendoGrid").columns[0].hidden) {
      //                $(".k-grid").data("kendoGrid").showColumn(0);
      //            }
      //        }

      //    }
      //});


      $rootScope.columnCounts = function (gridId) {
          var grid = $(gridId).data("kendoGrid");
          var visibleColumns = [];
          var commandColumns = [];
          var hiddenColumns = [];
          var totalColumn = grid.columns;
          var childColumns = [];

          for (var i = 0; i < totalColumn.length; i++) {
              if (totalColumn[i].hidden != true) {
                  if (totalColumn[i].columns) {
                      for (var x = 0; x < totalColumn[i].columns.length; x++) {
                          childColumns.push(totalColumn[i].columns[x]);
                          if (!totalColumn[i].columns[x].hidden) {
                              visibleColumns.push(totalColumn[i].columns[x].field);
                              if (!totalColumn[i].columns[x].field || (totalColumn[i].columns[x].menu == false)) {
                                  commandColumns.push(totalColumn[i].columns[x])
                              }
                          }
                      }
                  }
                  visibleColumns.push(totalColumn[i].field);
                  if (!totalColumn[i].field || (totalColumn[i].menu == false)) {
                      commandColumns.push(totalColumn[i])
                  }
              } else { if (totalColumn[i].menu == false) hiddenColumns.push(totalColumn[i]); }
          }
          $('.colCount').text((visibleColumns.length - commandColumns.length) + '/' + (((totalColumn.length + childColumns.length) - commandColumns.length) - hiddenColumns.length));
      };
      function enableCheckbox() {
          this.element.find(".k-columns-item :checkbox").prop("disabled", false);
      }
      $rootScope.gridMenu = function (gridId) {
          //debugger;
          var grid = $(gridId).data("kendoGrid");
          var gridName = gridId.replace("#", "");
          $rootScope.columnCounts(gridId);
          $("#columnMenuButton").kendoColumnMenu({
              filterable: false,
              sortable: false,
              dataSource: $(gridId).data("kendoGrid").dataSource,
              columns: true,
              owner: grid,
              init: function (e) {
                  var menu = e.container.find(".k-menu").data("kendoMenu");
                  var popup = e.container.data().kendoPopup;
                  var grid = $(gridId).data("kendoGrid");
                  var handler = $.proxy(enableCheckbox, menu);
                  menu.bind("open", handler).bind("select", handler);
                  // menu.append("<li id='SaveGridState' class='k-item'>Save Grid State</li>");
                  menu.bind("select", function (e) {
                      $rootScope.columnCounts(gridId)
                      //if (e.item.id === "SaveGridState") {
                      //   e.preventDefault();
                      localStorage.setItem("kendo-grid-" + gridName, kendo.stringify(grid.getOptions()));
                      //   menu.close();
                      //   popup.close();
                      //}
                  });
              }

          });
      };
      $rootScope.gridMenuTTT = function (gridId, phase) {
          var grid = $(gridId).data("kendoGrid");
          var gridName = gridId.replace("#", "");
          $rootScope.columnCounts(gridId);
          $("#columnMenuButton").kendoColumnMenu({
              filterable: false,
              sortable: false,
              dataSource: $(gridId).data("kendoGrid").dataSource,
              columns: true,
              owner: grid,
              init: function (e) {
                  var menu = e.container.find(".k-menu").data("kendoMenu");
                  var popup = e.container.data().kendoPopup;
                  var grid = $(gridId).data("kendoGrid");
                  var mylist = e.container.find(".k-columns-item>ul");
                  if (phase == "Offshore") {
                      mylist.children().each(function (e) {
                          var span = $(this).find("span");
                          var text = span[0].lastChild.nodeValue;
                          if (text == "TTT Location*")
                              span[0].lastChild.nodeValue = "DTT Location*";
                          if (text == "Number of TTT resources(*)")
                              span[0].lastChild.nodeValue = "Training Recipients(*)";
                      });
                  }
                  // menu.append("<li id='SaveGridState' class='k-item'>Save Grid State</li>");
                  menu.bind("select", function (e) {
                      $rootScope.columnCounts(gridId)
                      //if (e.item.id === "SaveGridState") {
                      //   e.preventDefault();
                      localStorage.setItem("kendo-grid-" + gridName, kendo.stringify(grid.getOptions()));
                      //   menu.close();
                      //   popup.close();
                      //}
                  });
              }
          });
      };
      $rootScope.rowPerSize = 10;

      $rootScope.itemPage = function (num, grid) {
          $rootScope.rowPerSize = num;
          var grid = $(grid).data("kendoGrid");
          grid.dataSource.pageSize(num);
          grid.refresh();
      };

      $rootScope.isRowSize = function (no) {
          return $rootScope.rowPerSize === no;
      };

      $rootScope.wavewrkstrmrowPerSize = 5;

      $rootScope.itemPagewrkstm = function (num, grid) {
          $rootScope.wavewrkstrmrowPerSize = num;
          var grid = $(grid).data("kendoGrid");
          grid.dataSource.pageSize(num);
          grid.refresh();
      };

      $rootScope.isRowSizewrkstm = function (no) {
          return $rootScope.wavewrkstrmrowPerSize === no;
      };

      //For wave selection popup
      $rootScope.openWaves = function () {
          var wnd = angular.element("#wave_selector").kendoWindow({
              title: false,
              modal: true,
              visible: false,
              resizable: false,
              minWidth: 1000
          }).data("kendoWindow").center();
          wnd.wrapper.addClass("wave-window");
          wnd.open();
          $('.wave-carousel').carousel({ interval: false, wrap: false });
          $('.wave-list li a').on('click', function (e) {
              $rootScope.selectedWave = e.target.innerText;
              $scope.$apply();
              wnd.close();
          })
          $('.dismiss').on('click', function () {
              wnd.close();
          });
      };
      $rootScope.GetWaves = function () {
          var wnd = angular.element("#Sub_wave_selector").kendoWindow({
              title: false,
              modal: true,
              visible: false,
              resizable: false,
              minWidth: 1000
          }).data("kendoWindow").center();
          wnd.wrapper.addClass("wave-window");
          wnd.open();
          $('.wave-carousel').carousel({
              interval: false,
              wrap: false
          });
          $('.wave-list li a').on('click', function (e) {
              $rootScope.selectedWave = e.target.innerText;
              $scope.$apply();
              wnd.close();
          })
          $('.dismiss').on('click', function () {
              wnd.close();
          });
      };

      $rootScope.GetWavesgng = function () {
          var wnd = angular.element("#Sub_wave_selector_gng").kendoWindow({
              title: false,
              modal: true,
              visible: false,
              resizable: false,
              minWidth: 1000
          }).data("kendoWindow").center();
          wnd.wrapper.addClass("wave-window");
          wnd.open();
          $('.wave-carousel').carousel({
              interval: false,
              wrap: false
          });
          $('.wave-list li a').on('click', function (e) {
              $rootScope.selectedWave = e.target.innerText;
              $scope.$apply();
              wnd.close();
          })
          $('.dismiss').on('click', function () {
              wnd.close();
          });
      };

      //For workstream selection popup
      $rootScope.openWorkStream = function () {
          var waveExecutionMenuItems;
          $.ajax({
              url: '/WaveSetup/Home/GetWaveExecutionMenuItems?id=' + $rootScope.waveId,
              traditional: true,
              type: 'POST',
              datatype: 'json',
              async: false,
              contentType: 'application/json; charset=utf-8',
              success: function (data) {
                  waveExecutionMenuItems = data;
                  $rootScope.WaveExecutionMenuItems = data;
              }
          });
          var wnd = angular.element("#workstream_selector").kendoWindow({
              title: false,
              modal: true,
              visible: false,
              resizable: false,
              width: 430
          }).data("kendoWindow").center();
          wnd.open();
          $('.dismiss, .workstream-list li a').on('click', function () {
              wnd.close();
          });
      };
      if (!$rootScope.selectedWave) {
          var value = $('#SubWaveName').val();
          var NA = $('#NAFlag').val();
          if (value == null || value == '' || NA == "NAFlag")
              value = $('#FirstWaveName').val();
          $rootScope.selectedWave = value;
          waveSelected = value;

          if (waveSelected != undefined && waveSelected.length > 20) {
              waveSelected = waveSelected.substring(0, 20) + "...";
              $rootScope.clippedwave = waveSelected;
          } else {
              $rootScope.clippedwave = waveSelected;
          }
          var id = $('#SubWaveId').val();
          if (id == null || id == '')
              id = $('#FirstWaveProcessId').val();
          $rootScope.waveId = id;
      }

      $rootScope.RedirectToWaveDetails = function (wave) {
          //$rootScope.selectedWave = wave.name;
          $rootScope.waveId = wave.id;
          waveSelected = wave.name;
          if (waveSelected != undefined && waveSelected.length > 20) {
              waveSelected = waveSelected.substring(0, 20) + "...";
              $rootScope.clippedwave = waveSelected;
              window.location.href = "/waveExecution/SubWaveHome/SubWaveHome/?SubWaveId=" + wave.id;
          } else {
              $rootScope.clippedwave = waveSelected;
              window.location.href = "/waveExecution/SubWaveHome/SubWaveHome/?SubWaveId=" + wave.id;
          }

      };

      $rootScope.RedirectToGNGWaves = function (wave) {
          $rootScope.waveId = wave.id;
          waveSelected = wave.name;
          if (waveSelected != undefined && waveSelected.length > 20) {
              waveSelected = waveSelected.substring(0, 20) + "...";
              $rootScope.clippedwave = waveSelected;
              window.location.href = "/PMO/GoNoGo/Wavedetails?waveid=" + wave.id;
          } else {
              $rootScope.clippedwave = waveSelected;
              window.location.href = "/PMO/GoNoGo/Wavedetails?waveid=" + wave.id;
          }

      };


      //Notification implementation

      var dealId = $('#hidDealId').val();
      var notifications = [];
      var notificationcount = 0;
      console.log(dealId);
      if (dealId != null && dealId != undefined && dealId > 0) {

          $.ajax({
              url: '/ClientView/Notification/GetNotificationforMandatoryDealInfo',
              traditional: true,
              async: false,
              cache: false,
              contentType: 'json',
              success: function (data) {
                  if (data == true) {
                      notifications.push({ notes: "Yet to save mandatory information in Deal Information-> Plan" });
                      notificationcount = notificationcount + 1;
                  }

              }
          });
          $.ajax({
              url: '/ClientView/Notification/GetWaveWorkstreamNotification',
              traditional: true,
              async: false,
              cache: false,
              contentType: 'json',
              success: function (data) {
                  $.each(data, function (i, item) {
                      notifications.push(item);
                  });
                  notificationcount = notificationcount + data.length;
              }
          });
      } else {

          $.ajax({
              url: '/ClientView/Notification/GetNotifications',
              traditional: true,
              async: false,
              cache: false,
              contentType: 'json',
              success: function (data) {
                  $.each(data, function (i, item) {
                      if (item.IsFeedbackAvailable == true) {
                          $('#isfeedbackAvailable').val(true);
                      }
                      notifications.push(item);
                  });
                  notificationcount = notificationcount + data.length;
              }
          });
      }

      if (notificationcount > 0) {
          $rootScope.notifications = notifications;
          console.log(notifications);
          $("#badgeid").text(notificationcount);
      } else {
          $("#Notification").text("No updates available currently");
          $("#badgeid").text(0);
      }
  }

]);
var sessionTimeoutWarning = 25;
var sessionTimeout = 30;
var sTimeout = parseInt(sessionTimeoutWarning) * 60 * 1000;
var sTimeoutRedirect = parseInt(sessionTimeout) * 60 * 1000;

var warningTimeout = setTimeout('SessionWarning()', sTimeout);
var redirectTimeout = setTimeout('RedirectToHome()', sTimeoutRedirect);

function SessionWarning() {
    var message = "Your session is about to expire in " + (parseInt(sessionTimeout) - parseInt(sessionTimeoutWarning)) + " minutes. Please click OK to keep your session alive";
    var pop = localStorage.getItem("popup");
    if (pop == "openitem") {
        showMessagePopUpOpenItem(message);
        //localStorage.setItem("popup", "");
        $("#btnMessageOKopenitem").click(function () {
            window.clearTimeout(warningTimeout);
            window.clearTimeout(redirectTimeout);
            warningTimeout = setTimeout('SessionWarning()', sTimeout);
            redirectTimeout = setTimeout('RedirectToHome()', sTimeoutRedirect);
            $.ajax({
                url: '/CommonComponent/CommonComponent/KeepSessionAlive',
                async: true,
                cache: false,
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                }
            });
        });
    }
    else {
        showMessagePopUp(message);

        $("#btnMessageOK").click(function () {
            window.clearTimeout(warningTimeout);
            window.clearTimeout(redirectTimeout);
            warningTimeout = setTimeout('SessionWarning()', sTimeout);
            redirectTimeout = setTimeout('RedirectToHome()', sTimeoutRedirect);
            $.ajax({
                url: '/CommonComponent/CommonComponent/KeepSessionAlive',
                async: true,
                cache: false,
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                }
            });
        });
    }

}

function RedirectToHome() {
    var message = "Your session has expired due to inactivity, redirecting you to home screen.";
    var pop = localStorage.getItem("popup");
    if (pop == "openitem") {
        localStorage.setItem("popup", "");
        showMessagePopUpOpenItem(message);
        $("#divpopupMessageControlopenitem").on('hidden.bs.modal', function (e) {
            window.location.href = "/";
        });
    }
    else {
        showMessagePopUp(message);

        $("#divpopupMessageCtl").on('hidden.bs.modal', function (e) {
            window.location.href = "/";
        });
    }

    //$("#btnMessageOK .close").click(function () {
    //    window.location.href = "/";
    //});
    //$(".close").click(function () {
    //    window.location.href = "/";
    //});
}
function formatNewLineString(stringValue) {
    stringValue = stringValue.replace(/\n\r?/g, '<br />');
    stringValue = stringValue.replace(/["']/g, '');
    return stringValue.replace(/\t\r?/g, '&emsp;');
}
function showMessagePopUp(msgcontent) {
    //debugger;
    document.getElementById('divpopupMessage').innerHTML = msgcontent;
    $('#divpopupMessageCtl').modal('show');
}
function showMessagePopUpBM(msgcontent) {
    //debugger;
    document.getElementById('divpopupMessage').innerHTML = msgcontent;
    $('#divpopupMessageCtl').modal('show');
}


angular.module('transItApp').controller('homeController', ['$rootScope', '$scope', '$location', '$timeout',
    function ($rootScope, $scope, $location, $timeout) {

        // Required for routing
        $rootScope.Route = "dashboard";
        $rootScope.page = "home";

    }])
.controller('adminController', ['$rootScope', '$scope', '$location', '$timeout',
    function ($rootScope, $scope, $location, $timeout) {

        // Required for routing
        $rootScope.Route = "admin";
        $rootScope.page = "home";
        $scope.searchItem = function () {
            $scope.showSearch = true;
            $timeout(function () {
                $rootScope.goto('/admin-search');
            }, 500)
        };
        //Search result Tabs
        $rootScope.filterTab = 1;
        $scope.setFilterTab = function (newTab) {
            $rootScope.filterTab = newTab;
            $rootScope.filterItem = '';
            if (newTab == 2) {
                $rootScope.filterItem = '2B';
            }
            else if (newTab == 3) {
                $rootScope.filterItem = '3B';
            }
            else {
                $rootScope.filterItem = '';
            }
        };
        $scope.isSetFilter = function (tabNum) {
            return $rootScope.filterTab === tabNum;
        };
        $scope.searchResults = [
            {
                stage: '2B',
                deal: '3295382 RBS ABN Transfer New',
                mec: '22',
                approval: '0',
                offering: 'BPO:Emerging - Cross Industry',
                date: '28 July, 2017',
                status: 'Completed'
            },
            {
                stage: '3B',
                deal: '3295382 RBS ABN Transfer New',
                mec: '22',
                approval: '0',
                offering: 'BPO:Emerging - Cross Industry',
                date: '28 July, 2017',
                status: 'Completed'
            },
            {
                stage: '2B',
                deal: '3295382 RBS ABN Transfer New',
                mec: '22',
                approval: '0',
                offering: 'BPO:Emerging - Cross Industry',
                date: '28 July, 2017',
                status: 'Completed'
            },
            {
                stage: '3B',
                deal: '3295382 RBS ABN Transfer New',
                mec: '22',
                approval: '0',
                offering: 'BPO:Emerging - Cross Industry',
                date: '28 July, 2017',
                status: 'Completed'
            },
            {
                stage: '2B',
                deal: '3295382 RBS ABN Transfer New',
                mec: '22',
                approval: '0',
                offering: 'BPO:Emerging - Cross Industry',
                date: '28 July, 2017',
                status: 'Completed'
            }
        ];

    }]).controller('exeHeaderController', ['$rootScope', '$scope', '$location', '$timeout', '$filter',
    function ($rootScope, $scope, $location, $timeout, $filter) {
        $scope.waves = [
        { name: 'Wave 1A-BPS-F' }, { name: 'Sample Wave1' }, { name: 'Sample Wave2' }, { name: 'Sample Wave3' }, { name: 'Wave 2A-BPS-F' }, { name: 'Sample Wave4' },
        { name: 'Sample Wave5' }, { name: 'Sample Wave6' }, { name: 'Sample Wave7' }, { name: 'Sample Wave8' }, { name: 'Sample Wave9' }, { name: 'Sample Wave' },
        { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' },
        { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' },
        { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' },
        { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' },
        { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' },
        { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' },
        { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' },
        { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' },
        { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' },
        { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' },
        { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' }, { name: 'Sample Wave' },
        { name: 'Sample Wave' }, { name: 'Sample Wave' }
        ];
        $scope.carouselItems = _groupItems($scope.waves, 40, 'name');
        for (var x = 0; x < $scope.carouselItems.length; x++) {

            $scope['grpupedItems_' + x] = _groupItems($scope.carouselItems[x], 10, 'name');
        }
        $scope.getGroupItem = function (index) {
            return $scope['grpupedItems_' + index];
        }

        function _groupItems(items, size, sort) {
            var grouped = [],
                index = 0;

            if (angular.isDefined(sort)) {
                $filter('orderBy')(items, sort);
            }

            for (var i = 0; i < items.length; i++) {
                if (angular.isUndefined(grouped[index])) {
                    grouped[index] = [];
                }

                grouped[index].push(items[i]);

                if ((i + 1) % size === 0) {
                    index++;
                }
            }

            return grouped;
        }
        $rootScope.navigateTransition = function (tab) {
            $scope.goto('/transition-plan');
            $timeout(function () {
                $rootScope.transitionTab = tab;
            }, 100);
        };
        $rootScope.navigateTrainer = function (tab) {
            $scope.goto('/train-the-trainer');
            $timeout(function () {
                $rootScope.trainTheTrainerTab = tab;
            }, 100);
        };
    }])
.controller('SubWaveSelectionController', ['$rootScope', '$scope', '$location', '$timeout',
    function ($rootScope, $scope, $location, $timeout) {
        var p = $("#redirectType").val();
        $.ajax({
            url: '/WaveSetup/Home/GetWaveAndSubWaveDetails?flag=' + p,
            traditional: true,
            type: 'POST',
            datatype: 'json',
            async: false,
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                $scope.wavesnumber = data;

            }
        });
    }]);
angular.module('transItApp')
.directive('flipCard', function () {
    return {
        restrict: 'AE',
        link: function (scope, $elm) {
            $elm.on('click', function () {
                $(this).parents('.cards').toggleClass('applyflip');
            });
        }

    }
})
.directive("scroll", function ($window) {
    return function (scope, element, attrs) {
        angular.element($window).bind("scroll", function () {
            if (this.pageYOffset >= 200) {
                scope.boolChangeClass = true;
            } else {
                scope.boolChangeClass = false;
            }
            scope.$apply();
        });
    };
})
.directive('slideSearch', function () {
    return {
        restrict: 'AE',
        link: function (scope, $elm, rootScope) {
            $elm.on('click keydown keypress', function () {
                if (($elm[0].className == "go-btn" || event.which === 13) && event.which != 9) {
                    $('#adminHome, .main-nav').slideUp(1000, function () {
                        scope.$root.page = 'search';
                        scope.$apply();
                        $('#searchResults .navbar-inverse').addClass('navbar-fixed-top');
                    });
                    $('#searchResults').slideDown(500);
                }
            });
        }

    }
})
.directive('closeSearch', function () {
    return {
        restrict: 'AE',
        link: function (scope, $elm) {
            $elm.on('click', function () {
                $('#searchResults .navbar-inverse').removeClass('navbar-fixed-top');
                scope.$root.page = 'home';
                scope.searchVal = '';
                scope.$apply();
                $('#adminHome, .main-nav').slideDown(1000);
                $('#searchResults').slideUp(1000);
            });
        }

    }
})
.directive("showTooltipOnTextOverflow", ["$timeout", function ($timeout) {
    return {
        restrict: 'A',
        scope: {
            title: "@overtitle"
        },
        link: function (scope, element, attrs) {
            $timeout(function () {
                var el = element[0];
                console.log(scope.title);
                scope.$watch(function () {
                    return el.scrollWidth;
                }, function () {
                    var el = element[0];
                    if (el.offsetWidth < el.scrollWidth) {
                        angular.element(el).tooltip({
                            title: scope.title,
                            placement: "right"
                        });
                    } else {
                        //console.log('ellipsis is NOT active for element', element);
                    }
                });
            })
        }
    };
}]);
angular.module('transItApp').config(['$routeProvider', function ($routeProvider) {

    //$routeProvider

    //  .when("/admin", { templateUrl: 'www/app/transIT/admin-home.html', controller: 'adminController' })
    //  .when("/deal-info", { templateUrl: 'www/app/transIT/plan/deal-info/deal-info.html', controller: 'dealInfoController' })
    //  .when("/mec", { templateUrl: 'www/app/transIT/plan/mec-checklist/mec.html', controller: 'mecController' })
    //  .when("/proj-staffing", { templateUrl: 'www/app/transIT/plan/project-staffing/proj-staffing.html', controller: 'projStaffingController' })
    //  .when("/proj-artifacts", { templateUrl: 'www/app/transIT/plan/project-artifacts/proj-artifacts.html', controller: 'projArtifactsController' })
    //  .when("/proj-plan", { templateUrl: 'www/app/transIT/plan/project-plan/proj-plan.html', controller: 'projPlanController' })
    //  .when("/execution", { templateUrl: 'www/app/transIT/execution/execution.html', controller: 'executionController' })
    //  .when("/transition-plan", { templateUrl: 'www/app/transIT/plan/transition-plan/transition-plan.html', controller: 'transtionPlanController' })
    //  .when("/wave-details", { templateUrl: 'www/app/transIT/execution/wave-details/wave-details.html', controller: 'waveDetailsController' })
    //  .when("/train-the-trainer", { templateUrl: 'www/app/transIT/execution/train-the-trainer/train-the-trainer.html', controller: 'trainTheTrainerController' })
    //  .when("/enable-people", { templateUrl: 'www/app/transIT/execution/enable-people/enable-people.html', controller: 'enablePeopleController' })
    //  .when("/tech-work-environment", { templateUrl: 'www/app/transIT/execution/tech-work-environment/tech-work-environment.html', controller: 'techWorkEnvController' })
    //  .when("/pct-kit", { templateUrl: 'www/app/transIT/pmo/pct-kit/pct-kit.html', controller: 'pctKitController' })
    //  .when("/service-readiness", { templateUrl: 'www/app/transIT/execution/service-readiness/service-readiness.html', controller: 'serviceReadinessController' })
    //  .when("/meetings", { templateUrl: 'www/app/transIT/pmo/meeting/meeting.html', controller: 'meetingController' })
}]);
angular.module('transItApp').controller('clActivityUpdateController', ['$rootScope', '$scope', '$location', '$timeout',
    function ($rootScope, $scope, $location, $timeout) {

        // Required for routing
        $rootScope.Route = "client";
        $rootScope.page = "activityupdate";

        var OverdueActivityData = [{
            slno: '1',
            end_date: '18/09/2017',
            workstream: 'Implement Financial Management',
            level: 'Project',
            activity: 'Close WBSE',
            completion: '80%',
        }, {
            slno: '2',
            end_date: '13/10/2017',
            workstream: 'Implement Financial Management',
            level: 'Project',
            activity: 'TD13 - Staff background checks',
            completion: '50%',
        }, {
            slno: '3',
            end_date: '11/12/2017',
            workstream: 'Implement Financial Management',
            level: 'Project',
            activity: 'TD13 - Staff background checks',
            completion: '50%',
        }, {
            slno: '4',
            end_date: '18/05/2017',
            workstream: 'Implement Financial Management',
            level: 'Project',
            activity: 'TD13 - Staff background checks',
            completion: '50%',
        }, {
            slno: '5',
            end_date: '12/10/2017',
            workstream: 'Implement Management',
            level: 'Project',
            activity: 'TD13 - Staff background checks',
            completion: '50%',
        }, {
            slno: '6',
            end_date: '16/10/2018',
            workstream: 'Financial Management',
            level: 'Project',
            activity: 'TD13 - Staff background checks',
            completion: '50%',
        }

        ]

        $scope.OverdueActivityOptions = {
            dataSource: OverdueActivityData,
            sortable: true,
            columns: [{
                field: "slno",
                title: "#",
                width: 80
            }, {
                field: "end_date",
                title: "End Date"
            }, {
                field: "workstream",
                title: "Workstream"
            }, {
                field: "level",
                title: "Level"
            }, {
                field: "activity",
                title: "Activity"
            }, {
                field: "completion",
                title: "% Completion"
            }
            ]
        };

    }])
angular.module('transItApp').controller('clDashboardController', ['$rootScope', '$scope', '$location', '$timeout',
    function ($rootScope, $scope, $location, $timeout) {

        // Required for routing
        $rootScope.Route = "client";
        $rootScope.page = "dashboard";

        var serviceRoot = "https://demos.telerik.com/kendo-ui/service";
        var tasksDataSource = new kendo.data.GanttDataSource({
            batch: false,
            transport: {
                read: {
                    url: serviceRoot + "/GanttTasks",
                    dataType: "jsonp"
                },
                update: {
                    url: serviceRoot + "/GanttTasks/Update",
                    dataType: "jsonp"
                },
                destroy: {
                    url: serviceRoot + "/GanttTasks/Destroy",
                    dataType: "jsonp"
                },
                create: {
                    url: serviceRoot + "/GanttTasks/Create",
                    dataType: "jsonp"
                },
                parameterMap: function (options, operation) {
                    if (operation !== "read") {
                        return { models: kendo.stringify(options.models || [options]) };
                    }
                }
            },
            schema: {
                model: {
                    id: "id",
                    fields: {
                        id: { from: "ID", type: "number" },
                        orderId: { from: "OrderID", type: "number", validation: { required: true } },
                        parentId: { from: "ParentID", type: "number", defaultValue: null, validation: { required: true } },
                        start: { from: "Start", type: "date" },
                        end: { from: "End", type: "date" },
                        title: { from: "Title", defaultValue: "", type: "string" },
                        percentComplete: { from: "PercentComplete", type: "number" },
                        summary: { from: "Summary", type: "boolean" },
                        expanded: { from: "Expanded", type: "boolean", defaultValue: true }
                    }
                }
            }
        });

        var dependenciesDataSource = new kendo.data.GanttDependencyDataSource({
            transport: {
                read: {
                    url: serviceRoot + "/GanttDependencies",
                    dataType: "jsonp"
                },
                update: {
                    url: serviceRoot + "/GanttDependencies/Update",
                    dataType: "jsonp"
                },
                destroy: {
                    url: serviceRoot + "/GanttDependencies/Destroy",
                    dataType: "jsonp"
                },
                create: {
                    url: serviceRoot + "/GanttDependencies/Create",
                    dataType: "jsonp"
                },
                parameterMap: function (options, operation) {
                    if (operation !== "read" && options.models) {
                        return { models: kendo.stringify(options.models) };
                    }
                }
            },
            schema: {
                model: {
                    id: "id",
                    fields: {
                        id: { from: "ID", type: "number" },
                        predecessorId: { from: "PredecessorID", type: "number" },
                        successorId: { from: "SuccessorID", type: "number" },
                        type: { from: "Type", type: "number" }
                    }
                }
            }
        });

        $scope.ganttOptions = {
            dataSource: tasksDataSource,
            dependencies: dependenciesDataSource,
            views: [
                "day",
                { type: "week", selected: true },
                "month"
            ],
            columns: [
                { field: "title", title: "Title", editable: true },
                { field: "start", title: "Start Time", format: "{0:MM/dd/yyyy}", width: 100 },
                { field: "end", title: "End", format: "{0:MM/dd/yyyy}", width: 100 }
            ],
            height: 400,
            editable: false,
            showWorkHours: false,
            showWorkDays: false,
            resizable: true,
        };
        $scope.epandGantt = function () {
            $timeout(function () {
                var gantt = $('#ganttChart').data("kendoGantt");
                gantt.resize();
            }, 800)

        }
    }])
angular.module('transItApp').controller('clProjectContactController', ['$rootScope', '$scope', '$location', '$timeout',
    function ($rootScope, $scope, $location, $timeout) {

        // Required for routing
        $rootScope.Route = "client";
        $rootScope.page = "contacts";

        var contactsData = [{
            slno: '1',
            name: 'King Carter',
            role: 'Location Lead',
            email: 'king.carter@accenture.com'
        }, {
            slno: '2',
            name: 'King Carter',
            role: 'Service Delivery Lead',
            email: 'king.carter@accenture.com'
        }, {
            slno: '3',
            name: 'King Carter',
            role: 'Delivery Team Lead',
            email: 'king.carter@accenture.com'
        }, {
            slno: '4',
            name: 'King Carter',
            role: 'SPOA',
            email: 'king.carter@accenture.com'
        }, {
            slno: '5',
            name: 'King Carter',
            role: 'Transition Lead',
            email: 'king.carter@accenture.com'
        }
        ]

        $scope.contactsOptions = {
            dataSource: contactsData,
            sortable: true,
            noRecords: true,
            messages: { noRecords: "No data available" },
            columns: [{
                field: "slno",
                title: "#",
                width: 60
            }, {
                field: "name",
                title: "Name"
            }, {
                field: "role",
                title: "Role"
            }, {
                field: "email",
                title: "Email Id"
            }
            ]
        };

    }])
angular.module('transItApp').controller('clSupportController', ['$rootScope', '$scope', '$location', '$timeout',
    function ($rootScope, $scope, $location, $timeout) {

        // Required for routing
        $rootScope.Route = "client";
        $rootScope.page = "support";


    }])
angular.module('transItApp').controller('clRaidController', ['$rootScope', '$scope', '$location', '$timeout',
    function ($rootScope, $scope, $location, $timeout) {

        // Required for routing
        $rootScope.Route = "client";
        $rootScope.page = "raid";

        var riskData = [{
            riskRef: '1234',
            source: 'acn',
            date_raised: '01/01/2018',
            risk_age: '15',
            raised_by: 'abc.xyz',
            project_phase: 'xxx',
            wave: '2',
            workstream: 'A',
            region: 'xxx',
            title: 'xxxx',
            description: 'xxx xxx',
            probability: '3',
            impact: '10',
            mitigation_action: 'xxx',
            due_date: '31/01/2018',
            actual_close_date: '30/01/2018',
            primary_owner: 'abc.xyz',
            secondary_owner: 'abc.xyz',
            status: 'active'
        }, {
            riskRef: '1234',
            source: 'acn',
            date_raised: '01/01/2018',
            risk_age: '15',
            raised_by: 'abc.xyz',
            project_phase: 'xxx',
            wave: '2',
            workstream: 'A',
            region: 'xxx',
            title: 'xxxx',
            description: 'xxx xxx',
            probability: '3',
            impact: '10',
            mitigation_action: 'xxx',
            due_date: '31/01/2018',
            actual_close_date: '30/01/2018',
            primary_owner: 'abc.xyz',
            secondary_owner: 'abc.xyz',
            status: 'active'
        },
        {
            riskRef: '1234',
            source: 'acn',
            date_raised: '01/01/2018',
            risk_age: '15',
            raised_by: 'abc.xyz',
            project_phase: 'xxx',
            wave: '2',
            workstream: 'A',
            region: 'xxx',
            title: 'xxxx',
            description: 'xxx xxx',
            probability: '3',
            impact: '10',
            mitigation_action: 'xxx',
            due_date: '31/01/2018',
            actual_close_date: '30/01/2018',
            primary_owner: 'abc.xyz',
            secondary_owner: 'abc.xyz',
            status: 'active'
        }]

        $scope.riskOptions = {
            dataSource: riskData,
            sortable: true,
            columns: [
                    { field: "riskRef", title: "Risk Ref#", width: 80 },
                    { field: "source", title: "Source", width: 120 },
                    { field: "date_raised", title: "Date Raised", width: 120 },
                    { field: "risk_age", title: "Risk Age (days)", width: 120 },
                    { field: "raised_by", title: "Raised By (Person)", width: 150 },
                    { field: "project_phase", title: "Projcet Phase", width: 120 },
                    { field: "wave", title: "Wave", width: 80 },
                    { field: "workstream", title: "Category/ Workstream", width: 120 },
                    { field: "region", title: "Tower/ Region", width: 120 },
                    { field: "title", title: "Title", width: 150 },
                    { field: "description", title: "Description", width: 150 },
                    { field: "probability", title: "Risk Probability", width: 120 },
                    { field: "impact", title: "Risk Impact", width: 120 },
                    { field: "mitigation_action", title: "Mitigation Actions", width: 120 },
                    { field: "due_date", title: "Risk Due Date", width: 120 },
                    { field: "actual_close_date", title: "Actual Close Date", width: 130 },
                    { field: "primary_owner", title: "Primary Owner", width: 150 },
                    { field: "secondary_owner", title: "Secondary Owner (ACN if external risk)", width: 200 },
                    { field: "status", title: "Status", width: 100 }

            ]
        };

        $scope.issueOptions = {
            dataSource: riskData,
            sortable: true,
            columns: [
                    { field: "riskRef", title: "Issue Ref#", width: 80 },
                    { field: "source", title: "Source", width: 120 },
                    { field: "date_raised", title: "Date Raised", width: 120 },
                    { field: "risk_age", title: "Issue Age (days)", width: 120 },
                    { field: "raised_by", title: "Raised By (Person)", width: 150 },
                    { field: "project_phase", title: "Projcet Phase", width: 120 },
                    { field: "wave", title: "Wave", width: 80 },
                    { field: "workstream", title: "Category/ Workstream", width: 120 },
                    { field: "region", title: "Tower/ Region", width: 120 },
                    { field: "title", title: "Title", width: 150 },
                    { field: "description", title: "Description", width: 150 },
                    { field: "probability", title: "Issue Severity", width: 120 },
                    { field: "impact", title: "Issue Impact", width: 120 },
                    { field: "mitigation_action", title: "Mitigation & issue closure notes", width: 180 },
                    { field: "due_date", title: "Issue Due Date", width: 120 },
                    { field: "actual_close_date", title: "Actual Close Date", width: 130 },
                    { field: "primary_owner", title: "Primary Owner", width: 150 },
                    { field: "secondary_owner", title: "Secondary Owner (ACN if external issue)", width: 210 },
                    { field: "status", title: "Status", width: 100 }

            ]
        };

        $scope.actionOptions = {
            dataSource: riskData,
            sortable: true,
            columns: [
                    { field: "riskRef", title: "Action Ref#", width: 80 },
                    { field: "source", title: "Source", width: 120 },
                    { field: "date_raised", title: "Date Raised", width: 120 },
                    { field: "risk_age", title: "Actions Age (days)", width: 120 },
                    { field: "raised_by", title: "Raised By (Person)", width: 150 },
                    { field: "project_phase", title: "Projcet Phase", width: 120 },
                    { field: "wave", title: "Wave", width: 80 },
                    { field: "workstream", title: "Category/ Workstream", width: 120 },
                    { field: "region", title: "Tower/ Region", width: 120 },
                    { field: "title", title: "Title", width: 150 },
                    { field: "description", title: "Description", width: 150 },
                    { field: "due_date", title: "Actions Due Date", width: 120 },
                    { field: "actual_close_date", title: "Actual Close Date", width: 130 },
                    { field: "primary_owner", title: "Primary Owner", width: 150 },
                    { field: "secondary_owner", title: "Secondary Owner (ACN if external actions)", width: 210 },
                    { field: "status", title: "Status", width: 100 }

            ]
        };

    }])
angular.module('transItApp').controller('clWaveController', ['$rootScope', '$scope', '$location', '$timeout',
    function ($rootScope, $scope, $location, $timeout) {

        // Required for routing
        $rootScope.Route = "client";
        $rootScope.page = "wave-progress";

        var waveProgressData = [{
            wave: '1A',
            service_grp: 'BPS',
            process: 'Marketing',
            planned_goLive: '18/09/2017',
            actual_goLive: '18/09/2017',
            wave_status: 'Go Live',
            overall_status: 'behindTrack',
            enabel_ppl: 'atRisk',
            knowledge_transfer: 'onTrack',
            implement_tech: 'onTrack',
            implement_del_operation: 'onTrack'
        }, {
            wave: '1A',
            service_grp: 'BPS',
            process: 'Marketing',
            planned_goLive: '18/09/2017',
            actual_goLive: '18/09/2017',
            wave_status: 'Go Live',
            overall_status: 'behindTrack',
            enabel_ppl: 'atRisk',
            knowledge_transfer: 'onTrack',
            implement_tech: 'onTrack',
            implement_del_operation: 'onTrack'
        }]

        $scope.waveProgressOptions = {
            dataSource: waveProgressData,
            sortable: true,
            scrollable: true,
            autoBind: true,
            columns: [{
                field: "wave",
                title: "Wave"
            }, {
                field: "service_grp",
                title: "Service Group"
            }, {
                field: "process",
                title: "Process"
            }, {
                field: "planned_goLive",
                title: "Planned Go Live"
            }, {
                field: "actual_goLive",
                title: "Actual Go Live"
            }, {
                field: "wave_status",
                title: "Wave Status"
            }, {
                field: "overall_status",
                title: "Overall Status",
                template: '<span class="rag-status #=overall_status#"></span>',
                sortable: false
            }, {
                field: "enabel_ppl",
                title: "Enable People",
                template: '<span class="rag-status #=enabel_ppl#"></span>',
                sortable: false
            }, {
                field: "knowledge_transfer",
                title: "Knowledge Transfer",
                template: '<span class="rag-status #=knowledge_transfer#"></span>',
                sortable: false
            }, {
                field: "implement_tech",
                title: "Implement Technology",
                template: '<span class="rag-status #=implement_tech#"></span>',
                sortable: false
            }, {
                field: "implement_del_operation",
                title: "Implement Delviery Operations",
                template: '<span class="rag-status #=implement_del_operation#"></span>',
                sortable: false
            }
            ]
        };

    }])

angular.module('transItApp').controller('executionController', ['$rootScope', '$scope', '$location', '$timeout',
    function ($rootScope, $scope, $location, $timeout) {

        // Required for routing
        $rootScope.Route = "transIT";
        $rootScope.mainPage = "execution";
        $rootScope.page = "execution";

        var waveProgressData = [{
            wave: '1A',
            service_grp: 'BPS',
            process: 'Marketing',
            baseFTE: '1.00',
            bufferFTE: '1.00',
            totalFTE: '1.00',
            planned_goLive: '18/09/2017',
            actual_goLive: '18/09/2017',
            wave_status: 'Go Live',
            overall_status: { value: '70%', status: 'behindTrack' },
            enabel_ppl: { value: '70%', status: 'atRisk' },
            train_the_trainer: { value: '70%', status: 'onTrack' },
            implement_tech: { value: '70%', status: 'onTrack' },
            delivery_team_trainer: { value: '70%', status: 'onTrack' }
        }, {
            wave: '1A',
            service_grp: 'BPS',
            process: 'Marketing',
            baseFTE: '1.00',
            bufferFTE: '1.00',
            totalFTE: '1.00',
            planned_goLive: '18/09/2017',
            actual_goLive: '18/09/2017',
            wave_status: 'Go Live',
            overall_status: { value: '70%', status: 'behindTrack' },
            enabel_ppl: { value: '70%', status: 'atRisk' },
            train_the_trainer: { value: '70%', status: 'onTrack' },
            delivery_team_trainer: { value: '70%', status: 'onTrack' }
        }]

        $scope.waveProgressOptions = {
            dataSource: waveProgressData,
            sortable: true,
            scrollable: true,
            autoBind: true,
            columns: [{
                field: "wave",
                title: "Wave"
            }, {
                field: "service_grp",
                title: "Service Group"
            }, {
                field: "process",
                title: "Process"
            }, {
                field: "baseFTE",
                title: "Base FTE"
            }, {
                field: "bufferFTE",
                title: "Buffer FTE"
            }, {
                field: "totalFTE",
                title: "Total FTE"
            }, {
                field: "planned_goLive",
                title: "Planned Go Live"
            }, {
                field: "actual_goLive",
                title: "Actual Go Live"
            }, {
                field: "wave_status",
                title: "Wave Status"
            }, {
                field: "overall_status",
                title: "Overall Status",
                attributes: { "class": "status-with-value" },
                template: '<span class="status-value">#=overall_status.value#</span><span class="rag-status #=overall_status.status#"></span>',
                sortable: false
            }, {
                field: "enabel_ppl",
                title: "Enable People",
                attributes: { "class": "status-with-value" },
                template: '<span class="status-value">#=enabel_ppl.value#</span><span class="rag-status #=enabel_ppl.status#"></span>',
                sortable: false
            }, {
                field: "train_the_trainer",
                title: "Train The Trainer",
                attributes: { "class": "status-with-value" },
                template: '<span class="status-value">#=train_the_trainer.value#</span><span class="rag-status #=train_the_trainer.status#"></span>',
                sortable: false
            }, {
                field: "delivery_team_trainer",
                title: "Delivery Team Trainer",
                attributes: { "class": "status-with-value" },
                template: '<span class="status-value">#=delivery_team_trainer.value#</span><span class="rag-status #=delivery_team_trainer.status#"></span>',
                sortable: false
            }
            ]
        };

        var waveSratStatusData = [{
            wave: '1A',
            overall_ragStatus: 'behindTrack',
            t90: 'In Progress',
            t60: 'In Progress',
            t30: 'In Progress',
            t5: 'In Progress'
        }, {
            wave: '1A',
            overall_ragStatus: 'atRisk',
            t90: '...',
            t60: 'Not Initiated',
            t30: 'Not Initiated',
            t5: 'Not Initiated'
        }, {
            wave: '1A',
            overall_ragStatus: 'onTrack',
            t90: 'In Progress',
            t60: 'In Progress',
            t30: 'In Progress',
            t5: 'In Progress'
        }]

        $scope.waveSratStatusOptions = {
            dataSource: waveSratStatusData,
            sortable: true,
            scrollable: true,
            autoBind: true,
            columns: [{
                field: "wave",
                title: "Wave"
            }, {
                field: "overall_ragStatus",
                title: "Overall Rag Status",
                template: '<span class="rag-status #=overall_ragStatus#"></span>',
                sortable: false
            }, {
                field: "t90",
                title: "T-90"
            }, {
                field: "t60",
                title: "T-60"
            }, {
                field: "t30",
                title: "T-30"
            }, {
                field: "t5",
                title: "T-7"
            }
            ]
        };

        var waveAssessmentStatusData = [{
            subWave: '1A',
            goLive: 'In Progress',
            day7: 'In Progress',
            day30: 'In Progress',
            day60: 'In Progress',
            day90: 'In Progress'
        }, {
            subWave: '1A',
            goLive: '...',
            day7: '...',
            day30: '...',
            day60: 'Not Initiated',
            day90: '...'
        }, {
            subWave: '1A',
            goLive: 'Not Initiated',
            day7: 'Not Initiated',
            day30: 'Not Initiated',
            day60: 'Not Initiated',
            day90: 'Not Initiated'
        }]

        $scope.waveAssessmentStatusOptions = {
            dataSource: waveAssessmentStatusData,
            sortable: true,
            scrollable: true,
            autoBind: true,
            columns: [{
                field: "subWave",
                title: "Sub Wave"
            }, {
                field: "goLive",
                title: "Go Live"
            }, {
                field: "day7",
                title: "Day-7"
            }, {
                field: "day30",
                title: "Day-30"
            }, {
                field: "day60",
                title: "Day-60"
            }, {
                field: "day90",
                title: "Day-90"
            }
            ]
        };

        var projectPlanStatusData = [{
            bpo: { bpoName: 'ODE Variance', date: '6/22/2017 4:16:00 PM' },
            value: '2,100.00',
        }, {
            bpo: { bpoName: 'Actuals', date: '6/22/2017 4:16:00 PM' },
            value: '1,000.00',
        }, {
            bpo: { bpoName: 'Forecast', date: '6/22/2017 4:16:00 PM' },
            value: '1,300.00',
        }, {
            bpo: { bpoName: 'EAC', date: '6/22/2017 4:16:00 PM' },
            value: '2,300.00',
        }, {
            bpo: { bpoName: 'ODE', date: '6/22/2017 4:16:00 PM' },
            value: '4,300.00',
        }]

        $scope.projectPlanStatusOptions = {
            dataSource: projectPlanStatusData,
            sortable: false,
            autoBind: true,
            scrollable: false,
            columns: [{
                field: "bpo",
                title: "BPO",
                template: '#=bpo.bpoName#<br/>BPO Updated on #=bpo.date#',
                sortable: false

            }, {
                field: "value",
                attributes: { "class": "text-right" },
                title: " "
            }
            ]
        };


        $scope.catTab = "";
        $scope.setCatTab = function (tab) {
            $scope.catTab = tab;
        }

        $scope.isSetCat = function (tab) {
            return $scope.catTab === tab;
        };


        var overAllProjectActivityData = [{
            endDate: '01/31/2017',
            workstream: 'Implement Operations Management',
            level: 'Project',
            activity: 'Complete Job Descriptions (JD)',
            completion: '85.00%'
        }, {
            endDate: '01/31/2017',
            workstream: 'Implement Operations Management',
            level: 'Project',
            activity: 'Complete Abacus Recruitment Request ',
            completion: '89.00%'
        }, {
            endDate: '01/31/2017',
            workstream: 'Implement Operations Management',
            level: 'Project',
            activity: 'Develop Onboarding / Roll-off Procedures',
            completion: '90.00%'
        }]

        $scope.overAllProjectActivityOptions = {
            dataSource: overAllProjectActivityData,
            sortable: true,
            scrollable: true,
            autoBind: true,
            columns: [{
                field: "endDate",
                title: "END DATE"
            }, {
                field: "workstream",
                title: "WORKSTREAM",
            }, {
                field: "level",
                title: "LEVEL"
            }, {
                field: "activity",
                title: "ACTIVITY",
                attributes: { "class": "maroonText" }
            }, {
                field: "completion",
                title: "%COMPLETION"
            }
            ]
        };
    }]);

angular.module('transItApp').controller('serviceReadinessController', ['$rootScope', '$scope', '$location', '$timeout',
  function ($rootScope, $scope, $location, $timeout) {

      // Required for routing
      $rootScope.Route = "transIT";
      $rootScope.mainPage = "execution";
      $rootScope.page = "service-readiness";

      $scope.sratVersionData = 'SRAT - Oct\'17';

      $scope.status = 'IN_PROGRESS';
      $scope.completed = 'NO';
      $scope.location = 'AAPAC Client Location'

      //service readiness Details Page Tabs
      $rootScope.sratTrackerTab = 4;

      $scope.setSrtRediness = function (newTab) {
          $rootScope.sratTrackerTab = newTab;
      };
      $scope.isSetSrtReadiness = function (tabNum) {
          return $rootScope.sratTrackerTab === tabNum;
      };

      //T - tabs
      $scope.catTab = "";
      $scope.setCatTab = function (tab) {
          $scope.catTab = tab;
      }

      $scope.isSetCat = function (tab) {
          return $scope.catTab === tab;
      };

      $scope.ragStatusColors = [
        "#0000FF", "#6FA502", "#FF0000", "#FFFF00", "#808080"
      ];

      $scope.ragStatusColor = "#6FA502";

      $scope.setRagStatusColor = function (color) {
          $scope.ragStatusColor = color;
      }

      $scope.ragStatusColorsFirstRow = [
        "#0000FF", "#6FA502", "#FF0000", "#FFFF00", "#808080"
      ];

      $scope.ragStatusColorFirstRow = "#6FA502";

      $scope.setRagStatusColorFirstRow = function (color) {
          $scope.ragStatusColorFirstRow = color;
      }

      var categoryData = [
        {
            category: 'Manage Mobilization Program'
        }, {
            category: 'Establish Business Operations'
        }, {
            category: 'Implement Delivery Capability'
        }, {
            category: 'Journey Management'
        }
      ];
      $scope.peopleComments = "people comments";
      $scope.commercialComments = "commercial comments";
      $scope.processComments = "process comments";
      $scope.sratComments = "srat comments";
      $scope.technologyComments = "technology comments";

      var categoryDetailData = [
        {
            category: '',
            questions: 'The sourcing strategy has been developed and agreed with all stakeholders',
            criticalForGoLive: '',
            ragStatus: '',
            comments: 'Technology transition team staffed'
        }, {
            category: '',
            questions: 'The sourcing strategy has been developed and agreed with all stakeholders',
            criticalForGoLive: '',
            ragStatus: '',
            comments: 'Technology transition team staffed'
        }, {
            category: '',
            questions: 'The sourcing strategy has been developed and agreed with all stakeholders',
            criticalForGoLive: '',
            ragStatus: '',
            comments: 'Technology transition team staffed'
        }, {
            category: '',
            questions: 'The sourcing strategy has been developed and agreed with all stakeholders',
            criticalForGoLive: '',
            ragStatus: '',
            comments: 'Technology transition team staffed'
        }, {
            category: '',
            questions: 'The sourcing strategy has been developed and agreed with all stakeholders',
            criticalForGoLive: '',
            ragStatus: '',
            comments: 'Technology transition team staffed'
        }
      ];

      $scope.categoryOptions = {
          dataSource: categoryData,
          dataBound: function () {
              $(".k-hierarchy-cell").hide();
              $(".k-hierarchy-col").hide();
          },
          change: function (e) {
              var selectedRows = this.select();
              $scope.selectedRowCount = selectedRows.length;
          },
          detailExpand: function (e) {
              var grid = e.sender;
              var rows = grid.element.find(".k-master-row").not(e.masterRow);
              rows.each(function (e) {
                  grid.collapseRow(this);
              });
              e.masterRow.addClass('expand');
              angular.element('.k-detail-row .k-detail-cell').css('max-width', angular.element('#categoryGrid').width());
          },
          detailCollapse: function (e) {
              e.masterRow.removeClass('expand');
          },
          columns: [{
              field: "category",
              title: "CATEGORY",
              width: 1000,
              template: '<div>#:category# <a href class="expand-collapse" ng-click="expandRow($event)" aria-label="expand/collapse row"><span class="transIcon-accordian_dropdown"></span></a></div>'
          }]
      };
      $scope.expandRow = function (args) {
          args.preventDefault();
          var row = $(args.target).parents("tr").first();
          var icon = row.find(".k-hierarchy-cell>a.k-icon");
          icon.click();
      };
      $scope.innerCategoryData = [
        'Process', 'Others'
      ];
      $scope.criticalGoLiveData = [
        'Yes', 'No'
      ];
      $scope.ragStatusData = [
        'Not Applicable', 'Applicable'
      ]
      $scope.detailCategoryOptions = {
          dataSource: categoryDetailData,
          dataBound: function () {
              $(".k-hierarchy-cell").hide();
              $(".k-hierarchy-col").hide();
          },
          columns: [{
              field: "category",
              title: "CATEGORY",
              width: 200,
              template: "<select kendo-drop-down-list k-data-source='innerCategoryData' k-ng-model='\"#:category#\"'></select>"
          }, {
              field: "questions",
              title: "QUESTIONS",
          }, {
              field: "criticalForGoLive",
              title: "CRITICAL FOR GO LIVE",
              width: 200,
              template: "<select kendo-drop-down-list k-data-source='criticalGoLiveData' k-ng-model='\"#:criticalForGoLive#\"'></select>"

          }, {
              field: "ragStatus",
              title: "RAG Status",
              width: 200,
              template: "<select kendo-drop-down-list k-data-source='ragStatusData' k-ng-model='\"#:ragStatus#\"'></select>"
          }, {
              field: "comments",
              title: "COMMENTS",
          }]
      }
  }
]);
angular.module('transItApp').controller('enablePeopleController', ['$rootScope', '$scope', '$location', '$timeout',
  function ($rootScope, $scope, $location, $timeout) {

      // Required for routing
      $rootScope.Route = "transIT";
      $rootScope.mainPage = "execution";
      $rootScope.page = "enable-people";


      //wave Details Page Tabs
      $rootScope.enablePeopleTab = 2;

      $scope.setEnablePeople = function (newTab) {
          $rootScope.enablePeopleTab = newTab;
      };
      $scope.isSetEnablePeople = function (tabNum) {
          return $rootScope.enablePeopleTab === tabNum;
      };

      $scope.ragStatusColors = [
        "#0000FF", "#6FA502", "#FF0000", "#FFFF00", "#808080"
      ];

      $scope.ragStatusColor = "#6FA502";

      $scope.setRagStatusColor = function (color) {
          $scope.ragStatusColor = color;
      }

      var sdoStaffingData = [{
          slno: '1',
          skill_category: 'Voice',
          location: 'Austin',
          planned_level: 'Accenture Leadership',
          sll_domain: '',
          sr_number: '',
          fulfillment_date: '04/05/2018',
          planned_ordering_date: '11/05/2017',
          enterprise_id: 'vaidheki.srinivasan',
          actual_level: 'Accenture Leadership',
          employee_id: '11003016',
          revised_ordering_date: '11/01/2017',
          cid_number: '',
          client_specific_role: ''
      }, {
          slno: '2',
          skill_category: 'Voice',
          location: 'Austin',
          planned_level: 'Accenture Leadership',
          sll_domain: '',
          sr_number: '',
          fulfillment_date: '04/05/2018',
          planned_ordering_date: '11/05/2017',
          enterprise_id: 'vaidheki.srinivasan',
          actual_level: 'Accenture Leadership',
          employee_id: '11003016',
          revised_ordering_date: '11/01/2017',
          cid_number: '',
          client_specific_role: ''
      }, {
          slno: '3',
          skill_category: 'Voice',
          location: 'Austin',
          planned_level: 'Accenture Leadership',
          sll_domain: '',
          sr_number: '',
          fulfillment_date: '04/05/2018',
          planned_ordering_date: '11/05/2017',
          enterprise_id: 'vaidheki.srinivasan',
          actual_level: 'Accenture Leadership',
          employee_id: '11003016',
          revised_ordering_date: '11/01/2017',
          cid_number: '',
          client_specific_role: ''
      }];

      $scope.sdoStaffingOptions = {
          dataSource: {
              data: sdoStaffingData,
              schema: { model: { id: "slno" } }
          },
          sortable: true,
          noRecords: true,
          scrollable: true,
          messages: { noRecords: "No data available" },
          editable: {
              mode: "popup",
              template: kendo.template($("#sdoStaffing_editor").html())
          },
          edit: function (e) {
              $scope.$broadcast('rebuildedit');
          },
          dataBound: function (e) {
              $timeout(function () {
                  if (!$("#toolBar").hasClass('k-toolbar')) {
                      var toolbar = $("#toolBar").kendoToolBar().getKendoToolBar();
                      toolbar.add({
                          id: "ColumnMenu",
                          template: "<div id='columnMenuButton' class='a-gridstate-button k-state-default' title='Configure visible columns and save the grid state'><div class='colCount'></div></div>",
                          overflow: "never"
                      });
                      $rootScope.gridMenu("#sdoStaffingGrid")
                      $("#toolBar .k-header-column-menu").height($('.k-grid-header').height());
                  }
              });
              $scope.$broadcast('rebuildedit');
          },
          columns: [
                { locked: true, command: [{ name: "edit", click: function (e) { e.preventDefault(); }, text: { edit: "", update: "Save" } }], width: "50px" },
                { field: "slno", title: "#", width: 50, menu: false },
                { field: "skill_category", title: "Skill Category", width: 150 },
                { field: "location", title: "Location", width: 150 },
                { field: "planned_level", title: "Planned Level", width: 200 },
                { field: "sll_domain", title: "SLL/Domain", width: 100 },
                { field: "sr_number", title: "SR #", width: 100 },
                { field: "fulfillment_date", title: "Fulfillment Date", width: 150, type: "date", format: "{0:MM/dd/yyyy}", attributes: { "class": "text-right" } },
                { field: "planned_ordering_date", title: "Planned Ordering Date", width: 120, type: "date", format: "{0:MM/dd/yyyy}", attributes: { "class": "text-right" } },
                { field: "enterprise_id", title: "Enterpirse ID", width: 150 },
                { field: "actual_level", title: "Actual Level", width: 130 },
                { field: "employee_id", title: "Employee ID", width: 130 },
                { field: "revised_ordering_date", title: "Revised Ordering Date", width: 100, type: "date", format: "{0:MM/dd/yyyy}", attributes: { "class": "text-right" } },
                { field: "cid_number", title: "CID #", width: 150 },
                { field: "client_specific_role", title: "Client Specific Role", width: 100 },
                { command: [{ name: "customMenu", text: '' }], title: "", width: 45, menu: false }
          ]
      };
      $scope.addActivity = function () {
          var grid = $("#sdoStaffingGrid").data("kendoGrid");
          grid.addRow();
      };

      $timeout(function () {
          var grid = $("#sdoStaffingGrid").data("kendoGrid");
          var options = localStorage.getItem("kendo-grid-sdoStaffingGrid");
          if (options) {
              grid && grid.setOptions(JSON.parse(options));
          }

      });


  }
]);
angular.module('transItApp').controller('techWorkEnvController', ['$rootScope', '$scope', '$location', '$timeout',
  function ($rootScope, $scope, $location, $timeout) {

      // Required for routing
      $rootScope.Route = "transIT";
      $rootScope.mainPage = "execution";
      $rootScope.page = "tech-work-environment";


      //wave Details Page Tabs
      $rootScope.techab = 3;

      $scope.setTechTab = function (newTab) {
          $rootScope.techab = newTab;
      };
      $scope.isSetTechTab = function (tabNum) {
          return $rootScope.techab === tabNum;
      };

      $scope.ragStatusColors = [
        "#0000FF", "#6FA502", "#FF0000", "#FFFF00", "#808080"
      ];

      $scope.ragStatusColor = "#6FA502";

      var tweAccessData = [{
          slno: '1',
          resources_name: 'abc xyz',
          client_domain: 'xyz',
          client_email: 'abc.xyz@hlk.com',
          acn_navigator: '',
          global_hub: '',
          acn_knowledge: '',
          sys_access_manager: '',
          robotic_process: '',
          ocr: '',
          acn_control: '',
          stnd_dashboards: '',
          tool: 'Yes'
      }, {
          slno: '2',
          resources_name: 'abc xyz',
          client_domain: 'xyz',
          client_email: 'abc.xyz@hlk.com',
          acn_navigator: '',
          global_hub: '',
          acn_knowledge: '',
          sys_access_manager: '',
          robotic_process: '',
          ocr: '',
          acn_control: '',
          stnd_dashboards: '',
          tool: 'No'
      }, {
          slno: '3',
          resources_name: 'abc xyz',
          client_domain: 'xyz',
          client_email: 'abc.xyz@hlk.com',
          acn_navigator: '',
          global_hub: '',
          acn_knowledge: '',
          sys_access_manager: '',
          robotic_process: '',
          ocr: '',
          acn_control: '',
          stnd_dashboards: '',
          tool: 'Na'
      }, {
          slno: '4',
          resources_name: 'abc xyz',
          client_domain: 'xyz',
          client_email: 'abc.xyz@hlk.com',
          acn_navigator: '',
          global_hub: '',
          acn_knowledge: '',
          sys_access_manager: '',
          robotic_process: '',
          ocr: '',
          acn_control: '',
          stnd_dashboards: '',
          tool: 'Yes'
      }];

      $scope.tweAccessGridOptions = {
          dataSource: {
              data: tweAccessData,
              schema: {
                  model: {
                      id: "slno"
                  }
              }
          },
          sortable: true,
          noRecords: true,
          scrollable: true,
          messages: {
              noRecords: "No data available"
          },
          editable: {
              mode: "popup",
              template: kendo.template($("#update_tweAccessTracker").html())
          },
          dataBound: function (e) {
              $timeout(function () {
                  if (!$("#toolBar").hasClass('k-toolbar')) {
                      var toolbar = $("#toolBar").kendoToolBar().getKendoToolBar();
                      toolbar.add({
                          id: "ColumnMenu",
                          template: "<div id='columnMenuButton' class='a-gridstate-button k-state-default' title='Configure visible columns and save the grid state'><div class='colCount'></div></div>",
                          overflow: "never"
                      });
                      $rootScope.gridMenu("#tweAccessGrid")
                      $("#toolBar .k-header-column-menu").height($('.k-grid-header').height());
                  }
              });
          },
          columns: [{
              locked: true,
              command: [{
                  name: "edit",
                  click: function (e) {
                      e.preventDefault();
                  },
                  text: {
                      edit: "",
                      update: "Save"
                  }
              }],
              width: 50
          },
            {
                field: "slno",
                title: "#",
                width: 50,
                menu: false
            },
            {
                field: "resources_name",
                title: "Resource Names",
                width: 160
            },
            {
                field: "client_domain",
                title: "Client Domain ID",
                width: 195
            },
            {
                field: "client_email",
                title: "Client Email ID",
                width: 275
            },
            {
                field: "tool",
                title: "Tool",
                template: '<div class="checklist-status">#if (tool=="No") {# <span class="icon pending-icon"></span>No#} else if(tool=="Yes") {#<span class="icon approved-icon"></span>Yes#} else if(tool=="Na"){#<span class="icon rejected-icon"></span>NA#} else {# #}#</div>',
                width: 120
            },
            {
                field: "acn_navigator",
                title: "Accenture Operations Navigator (AON)",
                width: 300
            },
            {
                field: "global_hub",
                title: "Global Productivity Hub (GPH)",
                width: 250
            },
            {
                field: "acn_knowledge",
                title: "Accenture Knowledge Navigator (AKN)",
                width: 250
            },
            {
                field: "sys_access_manager",
                title: "System Access Manager (SAM)",
                width: 250
            },
            {
                field: "robotic_process",
                title: "Robotic Process Automation (RPA)",
                width: 250
            },
            {
                field: "ocr",
                title: "OCR",
                width: 250
            },
            {
                field: "acn_control",
                title: "Accenture Control Framework (ACF)",
                width: 250
            },
            {
                field: "stnd_dashboards",
                title: "Standard Dashboards",
                width: 250
            },
            { command: [{ name: "customMenu", text: '' }], title: "", width: 40, menu: false }
          ]
      };
      $timeout(function () {
          var grid = $("#tweAccessGrid").data("kendoGrid");
          var options = localStorage.getItem("kendo-grid-tweAccessGrid");
          if (options) {
              grid && grid.setOptions(JSON.parse(options));
          }

      });
  }
]);
angular.module('transItApp').controller('waveDetailsController', ['$rootScope', '$scope', '$location', '$timeout',
  function ($rootScope, $scope, $location, $timeout) {

      // Required for routing
      $rootScope.Route = "transIT";
      $rootScope.mainPage = "execution";
      $rootScope.page = "wave-details";


      //wave Details Page Tabs
      $rootScope.waveDetailsTab = 1;

      $scope.setWaveDetails = function (newTab) {
          $rootScope.waveDetailsTab = newTab;
      };
      $scope.isSetWaveDetails = function (tabNum) {
          return $rootScope.waveDetailsTab === tabNum;
      };

      $scope.ragStatusColors = [
        "#0000FF", "#6FA502", "#FF0000", "#FFFF00", "#808080"
      ];

      $scope.ragStatusColor = "#6FA502";

      $scope.setRagStatusColor = function (color) {
          $scope.ragStatusColor = color;
      }

      var waveDetailsData = [{
          live_date: '12/14/2017',
          service_grp: '12/27/2017',
          wave_completion: '64',
          wave_status: 'Gone live',
          active: 'Yes',
          planned: '1.00',
          actual: '1.00',
          rag: '#6FA502'
      }];

      $scope.waveDetailsOptions = {
          dataSource: waveDetailsData,
          scrollable: false,
          sortable: true,
          pageable: false,
          columns: [{
              field: "live_date",
              title: "Planned Go-Live Date",
              attributes: { "class": "text-right" },
              width: 150,
          }, {
              field: "service_grp",
              title: "EXPECTED / ACTUAL GO LIVE DATE",
              attributes: { "class": "text-right" },
              width: 200
          }, {
              title: "#FTE IN WAVE",
              headerAttributes: {
                  style: "text-align: center"
              },
              columns: [{
                  field: "planned",
                  title: "PLANNED",
                  width: 115,
                  filterable: false,
                  menu: false,
                  headerAttributes: {
                      style: "text-align: center"
                  },
                  attributes: { "class": "text-right" }
              }, {
                  field: "actual",
                  title: "ACTUAL",
                  width: 115,
                  filterable: false,
                  menu: false,
                  headerAttributes: {
                      style: "text-align: center"
                  },
                  attributes: { "class": "text-right" }
              }],
          }, {
              field: "wave_completion",
              title: "WAVE COMPLETION %",
              attributes: { "class": "text-right" },
              width: 170
          }, {
              field: "wave_status",
              title: "WAVE STATUS"
          }, {
              field: "active",
              title: "ACTIVE"
          }, {
              field: "rag",
              title: "WAVE RAG STATUS",
              template: function (dataItem) { return "<input kendo-color-picker class='rag-color-picker' k-palette='ragStatusColors' ng-model='dataItem.rag' aria-label='Rag Status Selector' />" }
          }]
      };

  }
]);
angular.module('transItApp').controller('trainTheTrainerController', ['$rootScope', '$scope', '$location', '$timeout',
  function ($rootScope, $scope, $location, $timeout) {

      // Required for routing
      $rootScope.Route = "transIT";
      $rootScope.mainPage = "execution";
      $rootScope.page = "train-the-trainer";


      //wave Details Page Tabs
      $rootScope.trainTheTrainerTab = 2;

      $scope.setTrainTheTrainerTab = function (newTab) {
          $rootScope.trainTheTrainerTab = newTab;
      };
      $scope.isSetTrainTheTrainerTab = function (tabNum) {
          return $rootScope.trainTheTrainerTab === tabNum;
      };

      $scope.ragStatusColors = [
        "#0000FF", "#6FA502", "#FF0000", "#FFFF00", "#808080"
      ];

      $scope.ragStatusColor = "#6FA502";

      $scope.setRagStatusColor = function (color) {
          $scope.ragStatusColor = color;
      }

      var trainTheTrainerData = [{
          slno: '1',
          batch: 'Batch-1',
          geo_location: 'India',
          ttt_location: 'AAPAC Client Location',
          function: 'Cloud Amazon'
      }, {
          slno: '2',
          batch: 'Batch-1',
          geo_location: 'Belgium',
          ttt_location: 'AAPAC Client Location',
          function: 'Cloud Amazon'
      }, {
          slno: '3',
          batch: 'Batch-2',
          geo_location: 'India',
          ttt_location: 'Belgium',
          function: 'AWS Cloud'
      }, {
          slno: '4',
          batch: 'Batch-1',
          geo_location: 'India',
          ttt_location: 'AAPAC Client Location',
          function: 'Cloud Amazon'
      }];

      $scope.trainTheTrainerGridOptions = {
          dataSource: {
              data: trainTheTrainerData,
              schema: {
                  model: {
                      id: "slno"
                  }
              }
          },
          sortable: true,
          noRecords: true,
          scrollable: true,
          messages: {
              noRecords: "No data available"
          },
          editable: {
              mode: "popup",
              template: kendo.template($("#update_tttTracker").html())
          },
          dataBound: function (e) {
              $timeout(function () {
                  if (!$("#toolBar").hasClass('k-toolbar')) {
                      var toolbar = $("#toolBar").kendoToolBar().getKendoToolBar();
                      toolbar.add({
                          id: "ColumnMenu",
                          template: "<div id='columnMenuButton' class='a-gridstate-button k-state-default' title='Configure visible columns and save the grid state'><div class='colCount'></div></div>",
                          overflow: "never"
                      });
                      $rootScope.gridMenu("#trainTheTrainerGridGrid")
                      $("#toolBar .k-header-column-menu").height($('.k-grid-header').height());
                  }
              });

          },
          columns: [{
              locked: true,
              command: [{
                  name: "edit",
                  click: function (e) {
                      e.preventDefault();
                  },
                  text: {
                      edit: "",
                      update: "Save"
                  }
              }],
              width: 50
          },
            {
                field: "slno",
                title: "#",
                width: 50,
                menu: false
            },
            {
                field: "batch",
                title: "Batch",
                width: 115
            },
            {
                field: "geo_location",
                title: "GEO / Country",
                width: 195
            },
            {
                field: "ttt_location",
                title: "TTT Location",
                width: 275
            },
            {
                field: "function",
                title: "Function / Technology / Component",
                width: 300
            },
            {
                field: "activity",
                title: "Traning Topic / Activity",
                width: 250
            },
            {
                field: "method",
                title: "Training Delivery Method",
                width: 250
            },
            {
                field: "date",
                title: "Planned Start Date",
                width: 250
            },
            {
                field: "date",
                title: "Planned End Date",
                width: 250
            },
            {
                field: "date",
                title: "Actual Start Date",
                width: 250
            },
            {
                field: "column",
                title: "% Complete",
                width: 250
            },
            {
                field: "column",
                title: "Status",
                width: 250
            },
            {
                field: "column",
                title: "Palnned Duration",
                width: 250
            }, {
                field: "column",
                title: "Actual Duration",
                width: 250
            },
            {
                field: "column",
                title: "TTT resources",
                width: 250
            }, {
                field: "column",
                title: "List of Applications",
                width: 250
            }, {
                field: "column",
                title: "Comments",
                width: 250
            }
          ]
      };
      $timeout(function () {
          var grid = $("#trainTheTrainerGridGrid").data("kendoGrid");
          var options = localStorage.getItem("kendo-grid-trainTheTrainerGridGrid");
          if (options) {
              grid && grid.setOptions(JSON.parse(options));
          }

      });

      var tttApprovalData = [{
          approval_role: 'Transition Lead',
          approval_name: '',
          status: 'notinitiated'
      }, {
          approval_role: 'Global / SDO',
          approval_name: '',
          status: 'inprogress'
      }, {
          approval_role: 'Client',
          approval_name: '',
          status: 'inprogress'
      }];

      $scope.selectedRowCount = 0;

      $scope.tttApprovalsOptions = {
          dataSource: tttApprovalData,
          sortable: true,
          noRecords: true,
          scrollable: false,
          change: function (e) {
              var selectedRows = this.select();
              $scope.selectedRowCount = selectedRows.length;
              $scope.$apply();
          },
          messages: {
              noRecords: "No data available"
          },
          columns: [{
              selectable: true,
              width: 50
          }, {
              field: "approval_role",
              title: "Approval Role"

          }, {
              field: "service_grp",
              title: "Approval Name"
          }, {
              field: "active",
              title: "Approval Satus",
              width: 245,
              template: '<div class="checklist-status">#if (status=="notinitiated") {# <span class="icon pending-icon"></span>Not Initiated#} else if(status=="inprogress") {#<span class="icon approved-icon"></span>In - Progress#} else if(status=="rejected"){#<span class="icon rejected-icon"></span>Rejected#} else {# #}#</div>'
          }]
      };
  }
]);
angular.module('transItApp').controller('mecController', ['$rootScope', '$scope', '$location', '$timeout',
  function ($rootScope, $scope, $location, $timeout) {

      // Required for routing
      $rootScope.Route = "transIT";
      $rootScope.mainPage = "plan";
      $rootScope.page = "mec";

      var mecData = [{
          slno: '1',
          wave_details: 'Solution Plan',
          completed: '50',
          status: 'pending'
      }, {
          slno: '2',
          wave_details: 'Financials',
          completed: '50',
          status: 'pending'
      }, {
          slno: '3',
          wave_details: 'Contract',
          completed: '50',
          status: 'pending'
      }, {
          slno: '4',
          wave_details: 'Client Dependencies & Obligations',
          completed: '50',
          status: 'pending'
      }, {
          slno: '5',
          wave_details: 'Due Diligence',
          completed: '100',
          status: 'approved'
      }, {
          slno: '6',
          wave_details: 'Leadership Staffing',
          completed: '100',
          status: 'rejected'
      }, {
          slno: '7',
          wave_details: 'Quality Assurance',
          completed: '50',
          status: 'approved'
      }, {
          slno: '8',
          wave_details: 'BPS Tools',
          completed: '50',
          status: 'pending'
      }, {
          slno: '9',
          wave_details: 'Client Data Protection',
          completed: '100',
          status: 'rejected'
      }];
      $scope.selectedRowCount = 0;
      $scope.contactsOptions = {
          dataSource: {
              data: mecData,
              schema: {
                  model: {
                      id: "slno"
                  }
              }
          },
          sortable: true,
          noRecords: true,
          scrollable: false,
          persistSelection: true,
          messages: {
              noRecords: "No data available"
          },
          dataBound: function () {
              $(".k-hierarchy-cell").hide();
              $(".k-hierarchy-col").hide();
              var grid = $("#grid").data("kendoGrid");
              $scope.selectedItem = grid.dataItem(grid.select());
              if (grid.tbody.find(".k-icon.k-plus")) {

              }
          },
          change: function (e) {
              var selectedRows = this.select();
              $scope.selectedRowCount = selectedRows.length;
              $scope.$apply();
          },
          detailExpand: function (e) {
              var grid = e.sender;
              var rows = grid.element.find(".k-master-row").not(e.masterRow);
              rows.each(function (e) {
                  grid.collapseRow(this);
              });
              e.masterRow.addClass('expand');
              angular.element('.k-detail-row .k-detail-cell').css('max-width', angular.element('#mecGrid').width());
          },
          detailCollapse: function (e) {
              e.masterRow.removeClass('expand');
          },
          columns: [{
              selectable: true,
              width: "50px"
          },
            {
                field: "wave_details",
                title: "Wave Details"
            }, {
                field: "completed",
                title: "Completed",
                template: '<div class="progress completed-bar"><div class="progress-bar" role="progressbar" style="width: #:completed#%" aria-valuenow="#:completed#" aria-valuemin="0" aria-valuemax="100"></div></div><div>#:completed# % Completed</div>'
            }, {
                field: "status",
                title: "Status",
                width: 300,
                template: '<div class="checklist-status">#if (status=="pending") {# <span class="icon pending-icon"></span>Pending for Approval#} else if(status=="approved") {#<span class="icon approved-icon"></span>Approved#} else if(status=="rejected"){#<span class="icon rejected-icon"></span>Rejected#} else {# #}#<a href class="expand-collapse" ng-click="expandRow($event)" aria-label="expand/collapse row"><span class="transIcon-accordian_dropdown"></span></a></div>'
            }
          ]
      };

      var detailsData = [{
          id: 1,
          criteria: 'Standard tech requirements stated',
          del_available: 'No',
          artifacts: 'Yes',
          completeness: 'complete',
          soln_completeness: 'n.d.krshankumar',
          crieria_artifacts: '',
          service_grps: '',
          comments: ''
      },
        {
            id: 2,
            criteria: 'No Standard tech requirements stated',
            del_available: 'Yes',
            artifacts: 'Yes',
            completeness: 'complete',
            soln_completeness: 'n.d.krshankumar',
            crieria_artifacts: '',
            service_grps: '',
            comments: ''
        },
        {
            id: 3,
            criteria: 'Technology Trasnition team staffed',
            del_available: 'Yes',
            artifacts: 'Yes',
            completeness: 'complete',
            soln_completeness: 'n.d.krshankumar',
            crieria_artifacts: '',
            service_grps: '',
            comments: ''
        }
      ];
      $scope.yesNoDrop = ['Yes', 'No'];
      $scope.detailGridOptions = {
          dataSource: detailsData,
          scrollable: false,
          sortable: true,
          pageable: false,
          dataBound: function () {
              $(".k-hierarchy-cell").hide();
              $(".k-hierarchy-col").hide();
          },
          columns: [{
              field: "criteria",
              title: "Criteria"
          },
            {
                field: "del_available",
                title: "deliverable Available",
                template: "<select kendo-drop-down-list k-data-source='yesNoDrop' k-ng-model='\"#:del_available#\"'></select>"
            },
            {
                field: "artifacts",
                title: "Artifacts Received",
                template: "<select kendo-drop-down-list k-data-source='yesNoDrop' k-ng-model='\"#:artifacts#\"'></select>"
            },
            {
                field: "completeness",
                title: "Solutions / Completeness",
                template: '<div class="checklist-status">#if (completeness=="complete") {# <span class="icon pending-icon"></span>Complete#}#'
            },
            {
                field: "soln_completeness",
                title: "Enterprise Id"
            },
            {
                field: "crieria_artifacts",
                title: "Criteria Artifacts",
                template: '<a href ng-click=showArtifacts()><span class="grid-icon acn-attach-o"></span></a>'
            },
            {
                field: "service_grps",
                title: "Service Groups"
            },
            {
                field: "comments",
                title: "Comments",
                template: '<a href ng-click="showComments()" class="mec-comments"><span class="grid-icon acn-comment-chat"></span>4</a>'
            }
          ]
      };

      $scope.expandRow = function (args) {
          args.preventDefault();
          var row = $(args.target).parents("tr").first();
          var icon = row.find(".k-hierarchy-cell>a.k-icon");
          icon.click();
      };
      $scope.showArtifacts = function () {
          var wnd = angular.element("#artifacts").kendoWindow({
              title: false,
              modal: true,
              visible: false,
              resizable: false,
              width: 430,
              template: '<div>Hi</div>'
          }).data("kendoWindow").center();
          wnd.open();
          $('.dismiss').on('click', function () {
              wnd.close();
          })

      };

      $scope.showComments = function () {
          var wnd = angular.element("#comments").kendoWindow({
              title: false,
              modal: true,
              visible: false,
              resizable: false,
              width: 430,
              template: '<div>Hi</div>'
          }).data("kendoWindow").center();
          wnd.open();
          $('.dismiss').on('click', function () {
              wnd.close();
          });
          $scope.$broadcast('rebuildComments');
      };


  }
]);

angular.module('transItApp').controller('projArtifactsController', ['$rootScope', '$scope', '$location', '$timeout',
    function ($rootScope, $scope, $location, $timeout) {

        // Required for routing
        $rootScope.Route = "transIT";
        $rootScope.mainPage = "plan";
        $rootScope.page = "proj-artifacts";

        var artifactsData = [{
            slno: '1',
            fileName: 'Test1',
            sharepoint: 'https://ts.accenture.com/',
            file_type: 'Staffing',
            upload_date: '09/19/2017'
        }, {
            slno: '2',
            fileName: 'Test2',
            sharepoint: 'https://ts.accenture.com/',
            file_type: 'Risk',
            upload_date: '04/21/2017'
        }, {
            slno: '3',
            fileName: 'Test3',
            sharepoint: 'https://ts.accenture.com/',
            file_type: 'Risk',
            upload_date: '04/21/2017'
        }];

        $scope.artifactsGridOptions = {
            dataSource: {
                data: artifactsData,
                schema: { model: { id: "slno" } }
            },
            sortable: true,
            noRecords: true,
            scrollable: false,
            messages: { noRecords: "No data available" },
            editable: {
                mode: "popup",
                template: kendo.template($("#artifacts_editor").html())
            },
            columns: [
                    { command: [{ name: "edit", click: function (e) { e.preventDefault(); }, text: { edit: "", update: "Save" } }], width: "50px" },
                    { field: "fileName", title: "File Name", template: function (dataItem) { return kendo.htmlEncode(dataItem.fileName) + '<a href class="download-sharepoint" aria-label="Download from sharepoint"><span class="transIcon-cloud-download"></span></a>' } },
                    { field: "file_type", title: "File Type", template: function (dataItem) { return kendo.htmlEncode(dataItem.file_type) } },
                    { field: "upload_date", title: "Upload Date", type: "date", attributes: { "class": "text-right" }, width: "130px" },
                    { command: [{ name: "destroy", text: '' }], title: "Action", width: 100 },
            ]
        };
        $scope.addArtifacts = function () {
            var grid = $("#artifactsGrid").data("kendoGrid");
            grid.addRow();
        };



    }]);


angular.module('transItApp').controller('dealInfoController', ['$rootScope', '$scope', '$location', '$timeout',
    function ($rootScope, $scope, $location, $timeout) {

        // Required for routing
        $rootScope.Route = "transIT";
        $rootScope.mainPage = "plan";
        $rootScope.page = "deal-info";

        function expandCollapse(e) {
            if ($(e.item).is(".k-state-active")) {
                var that = this;
                window.setTimeout(function () { that.collapse(e.item); }, 1);
            }
        }

        $scope.panelOptions = {
            expandMode: "single",
            select: expandCollapse
        };

    }]);


angular.module('transItApp').controller('projPlanController', ['$rootScope', '$scope', '$location', '$timeout',
    function ($rootScope, $scope, $location, $timeout) {

        // Required for routing
        $rootScope.Route = "transIT";
        $rootScope.mainPage = "plan";
        $rootScope.page = "proj-plan";

        var projPlanData = [{
            slno: '1',
            milestone: 'No',
            critical_path: 'No',
            owner_category: '',
            level: 'Project',
            wave: '',
            workstream: 'Service Management',
            category: 'Assessment phase',
            activity: 'Review',
            planned_start: '11/06/2017',
            planned_end: '11/10/2017',
            duration: '5',
            owner: '',
            action_flag: 'Select'
        }, {
            slno: '2',
            milestone: 'No',
            critical_path: 'No',
            owner_category: '',
            level: 'Project',
            wave: '',
            workstream: 'Service Management',
            category: 'Assessment phase',
            activity: 'Review',
            planned_start: '11/06/2017',
            planned_end: '11/10/2017',
            duration: '5',
            owner: '',
            action_flag: 'Select'
        }, {
            slno: '3',
            milestone: 'No',
            critical_path: 'No',
            owner_category: '',
            level: 'Project',
            wave: '',
            workstream: 'Service Management',
            category: 'Assessment phase',
            activity: 'Review',
            planned_start: '11/06/2017',
            planned_end: '11/10/2017',
            duration: '5',
            owner: '',
            action_flag: 'Select'
        }, {
            slno: '4',
            milestone: 'No',
            critical_path: 'No',
            owner_category: '',
            level: 'Project',
            wave: '',
            workstream: 'Service Management',
            category: 'Assessment phase',
            activity: 'Review',
            planned_start: '11/06/2017',
            planned_end: '11/10/2017',
            duration: '5',
            owner: '',
            action_flag: 'Select'
        }];

        $scope.projPlanGridOptions = {
            dataSource: {
                data: projPlanData,
                schema: { model: { id: "slno" } }
            },
            sortable: true,
            noRecords: true,
            scrollable: true,
            messages: { noRecords: "No data available" },
            editable: {
                mode: "popup",
                template: kendo.template($("#projPlan_editor").html())
            },
            edit: function (e) {
                $scope.$broadcast('rebuildedit');
            },
            dataBound: function (e) {
                $timeout(function () {
                    if (!$("#toolBar").hasClass('k-toolbar')) {
                        var toolbar = $("#toolBar").kendoToolBar().getKendoToolBar();
                        toolbar.add({
                            id: "ColumnMenu",
                            template: "<div id='columnMenuButton' class='a-gridstate-button k-state-default' title='Configure visible columns and save the grid state'><div class='colCount'></div></div>",
                            overflow: "never"
                        });
                        $rootScope.gridMenu("#projPlanGrid")
                        $("#toolBar .k-header-column-menu").height($('.k-grid-header').height());
                    }
                });
                $scope.$broadcast('rebuildedit');
            },
            columns: [
                    { locked: true, command: [{ name: "edit", click: function (e) { e.preventDefault(); }, text: { edit: "", update: "Save" } }], width: "50px" },
                    { field: "slno", title: "#", width: 50, menu: false },
                    { field: "milestone", title: "Milestone", width: 150 },
                    { field: "critical_path", title: "On Critical Path", width: 150 },
                    { field: "owner_category", title: "Owner Category", width: 200 },
                    { field: "level", title: "Level", width: 100 },
                    { field: "wave", title: "Wave", width: 100 },
                    { field: "workstream", title: "Workstream", width: 150 },
                    { field: "category", title: "Category", width: 120 },
                    { field: "activity", title: "Activity", width: 150 },
                    { field: "planned_start", title: "Planned Start Date", width: 130, type: "date", format: "{0:MM/dd/yyyy}", attributes: { "class": "text-right" } },
                    { field: "planned_end", title: "Planned End Date", width: 130, type: "date", format: "{0:MM/dd/yyyy}", attributes: { "class": "text-right" } },
                    { field: "duration", title: "Duration (days)", width: 100, attributes: { "class": "text-right" } },
                    { field: "owner", title: "Owner (enterprise id)", width: 150 },
                    { field: "action_flag", title: "Action Flag", width: 100 },
                    { command: [{ name: "destroy", text: '' }], title: "Action", width: 80, menu: false },
                    { command: [{ name: "customMenu", text: '' }], title: "", width: 45, menu: false }
            ]
        };
        $scope.addActivity = function () {
            var grid = $("#projPlanGrid").data("kendoGrid");
            grid.addRow();
        };

        $timeout(function () {
            var grid = $("#projPlanGrid").data("kendoGrid");
            var options = localStorage.getItem("kendo-grid-projPlanGrid");
            if (options) {
                grid && grid.setOptions(JSON.parse(options));
            }

        });




    }]);

angular.module('transItApp').controller('transtionPlanController', ['$rootScope', '$scope', '$location', '$timeout',
  function ($rootScope, $scope, $location, $timeout) {
      // Required for routing
      $rootScope.Route = "transIT";
      $rootScope.mainPage = "plan";
      $rootScope.page = "transition-plan";
      $scope.showOfferingsModal = false;

      var workStreamData = [{
          slno: '1',
          projectLevelWorkStream: 'Manage Mobilization',
          application: 'Yes',
          plannedStartDate: '12/12/2017',
          plannedEndDate: '12/12/2017'
      }, {
          slno: '2',
          projectLevelWorkStream: 'Engagement Management',
          application: 'Yes',
          plannedStartDate: '12/12/2017',
          plannedEndDate: '12/12/2017'
      }, {
          slno: '3',
          projectLevelWorkStream: 'Service Management',
          application: 'Yes',
          plannedStartDate: '12/12/2017',
          plannedEndDate: '12/12/2017'
      }, {
          slno: '4',
          projectLevelWorkStream: 'Journey Management',
          application: 'Yes',
          plannedStartDate: '12/12/2017',
          plannedEndDate: '12/12/2017'
      }, {
          slno: '5',
          projectLevelWorkStream: 'Other Program Level Workstream',
          application: 'Yes',
          plannedStartDate: '12/12/2017',
          plannedEndDate: '12/12/2017'
      }];
      $scope.detailGridOptions = {
          dataSource: {
              data: workStreamData,
              schema: {
                  model: {
                      id: "slno",
                      fields: {
                          slno: {
                              type: "number"
                          },
                          projectLevelWorkStream: {
                              type: "string"
                          },
                          application: {
                              type: "string"
                          },
                          plannedStartDate: {
                              type: "date"
                          },
                          plannedEndDate: {
                              type: "date"
                          }
                      }
                  }
              },
          },
          scrollable: false,
          sortable: true,
          pageable: false,
          editable: {
              mode: "popup",
              template: kendo.template($("#deal_workstream_editor").html())
          },
          columns: [{
              command: [{
                  name: "edit",
                  click: function (e) {
                      e.preventDefault();
                  },
                  text: {
                      edit: "",
                      update: "Save"
                  }
              }],
              width: "50px",
          },
          {
              field: "projectLevelWorkStream",
              title: "Project Level WorkStream"
          },
          {
              field: "application",
              title: "Application"
          },
          {
              field: "plannedStartDate",
              title: "Planned Start Date",
              type: "date",
              format: "{0:MM/dd/yyyy}",
              attributes: {
                  "class": "text-right"
              },
              width: "180px"
          },
          {
              field: "plannedEndDate",
              title: "Planned End Date",
              type: "date",
              format: "{0:MM/dd/yyyy}",
              attributes: {
                  "class": "text-right"
              },
              width: "180px"
          }
          ]
      };
      $scope.addRow = function () {
          var grid = $("#projWorkstreamgrid").data("kendoGrid");
          grid.addRow();
      };

      $scope.noOfBaseDeals = "Total Number of Base Deal FTE's you have for allocation";


      $scope.catTab = "";
      $scope.setCatTab = function (tab) {
          $scope.catTab = tab;
      }

      $scope.isSetCat = function (tab) {
          return $scope.catTab === tab;
      };

      //wave setup
      $scope.waveSetupDetails = [{
          slno: 1,
          status: 'Active',
          waveName: '1A',
          serviceGroup: 'BPO',
          baseFtes: 10.00,
          bufferFtes: 4.00
      }, {
          slno: 2,
          status: 'Active',
          waveName: '1A',
          serviceGroup: 'BPO',
          baseFtes: 10.00,
          bufferFtes: 4.00
      }, {
          slno: 3,
          status: 'Active',
          waveName: '1A',
          serviceGroup: 'BPO',
          baseFtes: 10.00,
          bufferFtes: 4.00
      }, {
          slno: 4,
          status: 'Active',
          waveName: '1A',
          serviceGroup: 'BPO',
          baseFtes: 10.00,
          bufferFtes: 4.00
      }, {
          slno: 5,
          status: 'Active',
          waveName: '1A',
          serviceGroup: 'BPO',
          baseFtes: 10.00,
          bufferFtes: 4.00
      }, {
          slno: 6,
          status: 'Active',
          waveName: '1A',
          serviceGroup: 'BPO',
          baseFtes: 10.00,
          bufferFtes: 4.00
      }, {
          slno: 7,
          status: 'Active',
          waveName: '1A',
          serviceGroup: 'BPO',
          baseFtes: 10.00,
          bufferFtes: 4.00
      }, {
          slno: 8,
          status: 'Active',
          waveName: '1A',
          serviceGroup: 'BPO',
          baseFtes: 10.00,
          bufferFtes: 4.00
      }, {
          slno: 9,
          status: 'Active',
          waveName: '1A',
          serviceGroup: 'BPO',
          baseFtes: 10.00,
          bufferFtes: 4.00
      }, {
          slno: 10,
          status: 'Active',
          waveName: '1A',
          serviceGroup: 'BPO',
          baseFtes: 10.00,
          bufferFtes: 4.00
      }, {
          slno: 11,
          status: 'Active',
          waveName: '1A',
          serviceGroup: 'BPO',
          baseFtes: 10.00,
          bufferFtes: 4.00
      }, {
          slno: 12,
          status: 'Active',
          waveName: '1A',
          serviceGroup: 'BPO',
          baseFtes: 10.00,
          bufferFtes: 4.00
      }, {
          slno: 13,
          status: 'Active',
          waveName: '1A',
          serviceGroup: 'BPO',
          baseFtes: 10.00,
          bufferFtes: 4.00
      }, {
          slno: 14,
          status: 'Active',
          waveName: '1A',
          serviceGroup: 'BPO',
          baseFtes: 10.00,
          bufferFtes: 4.00
      }, {
          slno: 15,
          status: 'Active',
          waveName: '1A',
          serviceGroup: 'BPO',
          baseFtes: 10.00,
          bufferFtes: 4.00
      }, {
          slno: 16,
          status: 'Active',
          waveName: '1A',
          serviceGroup: 'BPO',
          baseFtes: 10.00,
          bufferFtes: 4.00
      }, {
          slno: 17,
          status: 'Inactive',
          waveName: '1A',
          serviceGroup: 'BPO',
          baseFtes: 10.00,
          bufferFtes: 4.00
      }, {
          slno: 18,
          status: 'Active',
          waveName: '1A',
          serviceGroup: 'BPO',
          baseFtes: 10.00,
          bufferFtes: 4.00
      }, {
          slno: 19,
          status: 'Active',
          waveName: '1A',
          serviceGroup: 'BPO',
          baseFtes: 10.00,
          bufferFtes: 4.00
      }, {
          slno: 20,
          status: 'Inactive',
          waveName: '1A',
          serviceGroup: 'BPO',
          baseFtes: 10.00,
          bufferFtes: 4.00
      }, {
          slno: 21,
          status: 'Active',
          waveName: '1A',
          serviceGroup: 'BPO',
          baseFtes: 10.00,
          bufferFtes: 4.00
      }, {
          slno: 22,
          status: 'Active',
          waveName: '1A',
          serviceGroup: 'BPO',
          baseFtes: 10.00,
          bufferFtes: 4.00
      }, {
          slno: 23,
          status: 'Inactive',
          waveName: '1A',
          serviceGroup: 'BPO',
          baseFtes: 10.00,
          bufferFtes: 4.00
      }, {
          slno: 24,
          status: 'Active',
          waveName: '1A',
          serviceGroup: 'BPO',
          baseFtes: 10.00,
          bufferFtes: 4.00
      }, {
          slno: 25,
          status: 'Active',
          waveName: '1A',
          serviceGroup: 'BPO',
          baseFtes: 10.00,
          bufferFtes: 4.00
      }, {
          slno: 26,
          status: 'Active',
          waveName: '1A',
          serviceGroup: 'BPO',
          baseFtes: 10.00,
          bufferFtes: 4.00
      }, {
          slno: 27,
          status: 'Active',
          waveName: '1A',
          serviceGroup: 'BPO',
          baseFtes: 10.00,
          bufferFtes: 4.00
      }, {
          slno: 28,
          status: 'Inactive',
          waveName: '1A',
          serviceGroup: 'BPO',
          baseFtes: 10.00,
          bufferFtes: 4.00
      }, {
          slno: 29,
          status: 'Active',
          waveName: '1A',
          serviceGroup: 'BPO',
          baseFtes: 10.00,
          bufferFtes: 4.00
      }, {
          slno: 30,
          status: 'Active',
          waveName: '1A',
          serviceGroup: 'BPO',
          baseFtes: 10.00,
          bufferFtes: 4.00
      }, ];

      $scope.waveSetupGridOptions = {
          dataSource: {
              data: $scope.waveSetupDetails,
              schema: {
                  model: {
                      id: "slno",
                      fields: {
                          slno: {
                              type: "number"
                          },
                          status: {
                              type: "string"
                          },
                          waveName: {
                              type: "string"
                          },
                          serviceGroup: {
                              type: "string"
                          },
                          baseFtes: {
                              type: "number"
                          },
                          bufferFtes: {
                              type: "number"
                          }
                      }
                  }
              },
          },
          scrollable: false,
          sortable: true,
          pageable: {
              pageSize: 10
          },
          editable: {
              mode: "popup",
              template: kendo.template($("#wave_setup_editor").html()),
          },
          columns: [{
              command: [{
                  name: "edit",
                  click: function (e) {
                      e.preventDefault();
                  },
                  text: {
                      edit: "",
                      update: "Save"
                  }
              }],
              width: "50px"
          },
          {
              field: "slno",
              title: "#",
              filterable: false
          },
          {
              field: "status",
              title: "Status"
          },
          {
              field: "waveName",
              title: "Wave Name"
          },
          {
              field: "serviceGroup",
              title: "Service Group"
          },
          {
              field: "baseFtes",
              title: "Base FTES",
              attributes: {
                  "class": "text-right"
              },
              width: "130px"
          },
          {
              field: "bufferFtes",
              title: "Buffer FTES",
              attributes: {
                  "class": "text-right"
              },
              width: "145px"
          },
          {
              field: "totalFtes",
              title: "Total FTES",
              template: "#=baseFtes + bufferFtes#",
              attributes: {
                  "class": "text-right"
              },
              width: "140px"
          },
          {
              command: [{
                  name: "destroy",
                  text: ''
              }],
              width: "50px"
          }

          ],
          filterable: true
      };

      $scope.addWaveSetup = function () {
          var grid = $("#gridWave").data("kendoGrid");
          grid.addRow();
      };


      // wave work stream
      $scope.offering = [{
          offeringName: 'HR Services',
          isSelected: true
      }, {
          offeringName: 'Management',
          isSelected: true
      }, {
          offeringName: 'Credit Services',
          isSelected: true
      }, {
          offeringName: 'Supply Chain',
          isSelected: true
      }, {
          offeringName: 'Health Administration',
          isSelected: true
      }, {
          offeringName: 'Marketing and Media',
          isSelected: true
      }, {
          offeringName: 'Sourcing and Procurement',
          isSelected: true
      }, {
          offeringName: 'Supply Chain',
          isSelected: false
      }, {
          offeringName: 'Talent - Learning',
          isSelected: false
      }, {
          offeringName: 'Capital Project Management',
          isSelected: false
      }, {
          offeringName: 'Accelerated RD fro Pharmaceutics',
          isSelected: false
      }, {
          offeringName: 'Emerging - Cross Industry',
          isSelected: false
      }];
      $scope.serviceFunction = [{
          serviceFunctionName: 'Enrollment',
          isSelected: true
      },
      {
          serviceFunctionName: 'Process top pay',
          isSelected: true
      },
      {
          serviceFunctionName: 'Claim',
          isSelected: true
      },
      {
          serviceFunctionName: 'Media IA',
          isSelected: true
      },
      {
          serviceFunctionName: 'Energy',
          isSelected: true
      },
      {
          serviceFunctionName: 'Operations',
          isSelected: true
      },
      {
          serviceFunctionName: 'Emerging - Cross Industry',
          isSelected: true
      }
      ];
      $scope.component = [{
          componentName: 'Employee/member portal setup and maintainance',
          isSelected: true
      },
      {
          componentName: 'Enrollment system application Hosting',
          isSelected: true
      }
      ];
      $scope.waveWorkStreamData = [{
          id: 1,
          waveName: '1A',
          status: 'Active',
          offering: ['HR Services', 'Management', 'Credit Services', 'Supply Chain', 'Capital Project Management'],
          serviceFunction: '',
          component: '',
          sendingList: 'Androra',
          transitionType: '',
          peopleTransfer: '',
          tttFte: '',
          goLivedate: '',
          ktMode: '',
          ktTools: '',
      },
      {
          id: 2,
          waveName: '2B',
          status: 'Active',
          offering: ['Marketing and Media', 'Sourcing and Procurement',
          'Talent - Learning', 'Capital Project Management', 'Accelerated RD fro Pharmaceutics', 'Emerging - Cross Industry'],
          serviceFunction: '',
          component: '',
          sendingList: 'Androra',
          transitionType: '',
          peopleTransfer: '',
          tttFte: '',
          goLivedate: '',
          ktMode: '',
          ktTools: '',
      }
      ];
      $scope.sendingList = "Androra";
      $scope.waveWorkstreamSetupOptions = {
          offerings: ['HR Services', 'Management', 'Credit Services', 'Supply Chain', 'Health Administration', 'Marketing and Media', 'Sourcing and Procurement',
          'Talent - Learning', 'Capital Project Management', 'Accelerated RD fro Pharmaceutics', 'Emerging - Cross Industry'],
          dataSource: {
              data: $scope.waveWorkStreamData,
              schema: { model: { id: "id" } }
          },
          scrollable: true,
          pageable: {
              pageSize: 10
          },
          editable: {
              mode: "popup",
              template: kendo.template($("#edit_wave_workstream").html()),
          },
          edit: function (e) {
              $scope.$broadcast('rebuildWaveEdit');
          },
          columns: [{
              command: [{
                  name: "edit",
                  click: function (e) {
                      e.preventDefault();
                  },
                  text: {
                      edit: "",
                      update: "Save"
                  }
              }],
              width: "50px",
              locked: true
          },
          {
              field: "waveName",
              title: "Wave Name",
              filterable: {
                  dataSource: $scope.waveWorkStreamData,
                  multi: true,
                  checkAll: false,
                  itemTemplate: function (e) {
                      return "<li class='k-item'><label class='k-label'><input type='checkbox' name='" + e.field + "' value='#=waveName#'/><span>#= waveName #</span></label></li>"
                  }
              },
              width: 125
          },
          {
              field: "status",
              title: "Status",
              filterable: false,
              width: 90
          },
          {
              field: "offering",
              title: "Offering",
              filterable: false,
              width: 300,
              template: kendo.template($("#offering_repeater").html())
          },
          {
              field: "serviceFunction",
              title: "Service / Function",
              filterable: false,
              width: 270,
          },
          {
              field: "component",
              title: "Component",
              filterable: false,
              width: 260
          },
          {
              field: "sendingList",
              title: "Sending List",
              filterable: false,
              template: kendo.template($("#sending_list").html()),
              width: 330
          },
          {
              field: "transitionType",
              title: "Transition Type",
              filterable: false,
              width: 260
          },
          {
              field: "peopleTransfer",
              title: "People Transfer",
              filterable: false,
              width: 155
          },

          {
              field: "goLivedate",
              title: "Go Live Date",
              filterable: false,
              width: 140
          },
          {
              field: "ktMode",
              title: "KT Mode",
              filterable: false,
              width: 95
          },
          {
              field: "ktTools",
              title: "KT Tools",
              filterable: false,
              width: 100
          },
          {
              title: "Enable People",
              headerAttributes: {
                  style: "text-align: center"
              },
              columns: [{
                  field: "applicable",
                  title: "APPLICABLE",
                  width: 115,
                  filterable: false,
                  menu: false
              }, {
                  field: "startDate",
                  title: "START DATE",
                  width: 115,
                  filterable: false,
                  menu: false
              }, {
                  field: "endDate",
                  title: "END DATE",
                  width: 115,
                  filterable: false,
                  menu: false
              }],
          }, {
              title: "TTT",
              headerAttributes: {
                  style: "text-align: center"
              },
              columns: [{
                  field: "applicable",
                  title: "APPLICABLE",
                  width: 115,
                  filterable: false,
                  menu: false
              }, {
                  field: "startDate",
                  title: "START DATE",
                  width: 115,
                  filterable: false,
                  menu: false
              }, {
                  field: "endDate",
                  title: "END DATE",
                  width: 115,
                  filterable: false,
                  menu: false
              },
              {
                  field: "tttFte",
                  title: "TTT FTE*",
                  filterable: false,
                  width: 115
              }],
          }, {
              title: "Delivery Team Training",
              headerAttributes: {
                  style: "text-align: center"
              },
              columns: [{
                  field: "applicable",
                  title: "APPLICABLE",
                  width: 115,
                  filterable: false,
                  menu: false
              }, {
                  field: "startDate",
                  title: "START DATE",
                  width: 115,
                  filterable: false,
                  menu: false
              }, {
                  field: "endDate",
                  title: "END DATE",
                  width: 115,
                  filterable: false,
                  menu: false
              }],
          }, {
              title: "IMPLEMEMT TECHNOLOGY AND WORK ENVIRONMENT",
              headerAttributes: {
                  style: "text-align: center"
              },
              columns: [{
                  field: "applicable",
                  title: "APPLICABLE",
                  width: 125,
                  filterable: false,
                  menu: false
              }, {
                  field: "startDate",
                  title: "START DATE",
                  width: 125,
                  filterable: false,
                  menu: false
              }, {
                  field: "endDate",
                  title: "END DATE",
                  width: 125,
                  filterable: false,
                  menu: false
              }],
          }, {
              title: "SERVICE READINESS",
              headerAttributes: {
                  style: "text-align: center"
              },
              columns: [{
                  field: "startDate",
                  title: "START DATE",
                  width: 115,
                  filterable: false,
                  menu: false
              }, {
                  field: "endDate",
                  title: "END DATE",
                  width: 115,
                  filterable: false,
                  menu: false
              }],
          }, {
              title: "STABILIZATION",
              headerAttributes: {
                  style: "text-align: center"
              },
              columns: [{
                  field: "applicable",
                  title: "APPLICABLE",
                  width: 115,
                  filterable: false,
                  menu: false
              }, {
                  field: "startDate",
                  title: "START DATE",
                  width: 115,
                  filterable: false,
                  menu: false
              }, {
                  field: "endDate",
                  title: "END DATE",
                  width: 115,
                  filterable: false,
                  menu: false
              }],
          },
          { command: [{ name: "customMenu", text: '' }], title: "", width: 40, menu: false }
          ],
          filterable: true,
          sortable: true,
          dataBound: function (e) {
              $timeout(function () {
                  if (!$("#toolBar").hasClass('k-toolbar')) {
                      var toolbar = $("#toolBar").kendoToolBar().getKendoToolBar();
                      toolbar.add({
                          id: "ColumnMenu",
                          template: "<div id='columnMenuButton' class='a-gridstate-button k-state-default' title='Configure visible columns and save the grid state'><div class='colCount'></div></div>",
                          overflow: "never"
                      });
                      $rootScope.gridMenu("#waveWorkstreamGrid");
                      $("#toolBar .k-header-column-menu").height($('.k-grid-header').height());
                  }

              });
          }
      };

      $timeout(function () {
          var grid = $("#waveWorkstreamGrid").data("kendoGrid");
          var options = localStorage.getItem("kendo-grid-waveWorkstreamGrid");
          if (options) {
              grid && grid.setOptions(JSON.parse(options));
          }
      });
      $scope.selectedOffering = []
      $scope.showOfferingPopup = function (e) {

          var grid = $("#waveWorkstreamGrid").data("kendoGrid");
          var row = $(e.target).closest("tr");
          var dataItem = grid.dataItem(row).offering;
          console.log(dataItem);
          $scope.selectedOffering = dataItem;

          var wnd = angular.element("#offering_modal").kendoWindow({
              title: false,
              modal: true,
              visible: false,
              resizable: false,
              width: 430,
              height: 580,
          }).data("kendoWindow").center();
          wnd.open();
          $scope.showOfferingsModal = true;
          $('.dismiss').on('click', function () {
              $scope.showOfferingsModal = false;
              wnd.close();
          });
          $scope.$broadcast('rebuildOffering');
      }
      $scope.isIncluded = function (item) {
          var IsSelected = false;
          for (var i = 0; i < $scope.selectedOffering.length; i++) {
              if ($scope.selectedOffering[i] == item) {
                  IsSelected = true;
              }
          }
          return IsSelected;
      }
      $scope.selectOptions = {
          itemTemplate: "#:data.offeringName# <span class='offeringEdit'>",
          dataTextField: "offeringName",
          dataValueField: "offeringName",
          valuePrimitive: true,
          autoClose: false,
          autoBind: false,
          dataSource: $scope.offering,
      }
      //Transition Page Tabs
      $rootScope.transitionTab = 1;
      $scope.setTransitionTab = function (newTab) {
          $rootScope.transitionTab = newTab;
      };
      $scope.isSetTransition = function (tabNum) {
          return $rootScope.transitionTab === tabNum;
      };
  }
]);

angular.module('transItApp').controller('projStaffingController', ['$rootScope', '$scope', '$location', '$timeout',
    function ($rootScope, $scope, $location, $timeout) {

        // Required for routing
        $rootScope.Route = "transIT";
        $rootScope.mainPage = "plan";
        $rootScope.page = "proj-staffing";

        var staffingData = [{
            slno: '1',
            role: 'SPOA',
            level: '6-Senior Manager',
            location: 'Null',
            role_for: 'Deal',
            sourcing: 'Mobilization'
        }, {
            slno: '2',
            role: 'Transition Lead',
            level: '8-Consultant',
            location: 'Null',
            role_for: 'Deal',
            sourcing: 'Mobilization'
        }, {
            slno: '3',
            role: 'Global Deal PMO',
            level: '8-Consultant',
            location: 'Null',
            role_for: 'Deal',
            sourcing: 'Mobilization'
        }, {
            slno: '4',
            role: 'SPOA',
            level: '6-Senior Manager',
            location: 'Null',
            role_for: 'Deal',
            sourcing: 'Mobilization'
        }];

        $scope.staffingGridOptions = {
            dataSource: {
                data: staffingData,
                schema: { model: { id: "slno" } }
            },
            sortable: true,
            noRecords: true,
            scrollable: true,
            messages: { noRecords: "No data available" },
            editable: {
                mode: "popup",
                template: kendo.template($("#staffing_editor").html())
            },
            dataBound: function (e) {
                $timeout(function () {
                    if (!$("#toolBar").hasClass('k-toolbar')) {
                        var toolbar = $("#toolBar").kendoToolBar().getKendoToolBar();
                        toolbar.add({
                            id: "ColumnMenu",
                            template: "<div id='columnMenuButton' class='a-gridstate-button k-state-default' title='Configure visible columns and save the grid state'><div class='colCount'></div></div>",
                            overflow: "never"
                        });
                        $rootScope.gridMenu("#staffingGrid")
                        $("#toolBar .k-header-column-menu").height($('.k-grid-header').height());
                    }
                });

            },
            columns: [
                    { locked: true, command: [{ name: "edit", click: function (e) { e.preventDefault(); }, text: { edit: "", update: "Save" } }], width: "50px" },
                    { field: "role", title: "Role", width: 200 },
                    { field: "level", title: "Level", width: 250 },
                    { field: "location", title: "Location", width: 250 },
                    { field: "role_for", title: "Role For", width: 200 },
                    { field: "sourcing", title: "Sourcing", width: 200 },
                    { field: "apr", title: "Apr 2017", width: 70 },
                    { field: "may", title: "May 2017", width: 70 },
                    { field: "jun", title: "Jun 2017", width: 70 },
                    { field: "jul", title: "Jul 2017", width: 70 },
                    { field: "aug", title: "Aug 2017", width: 70 },
                    { field: "sep", title: "Sep 2017", width: 70 },
                    { field: "oct", title: "Oct 2017", width: 70 },
                    { field: "nov", title: "Nov 2017", width: 70 },
                    { field: "dec", title: "Dec 2017", width: 70 },
                    { field: "jan", title: "Jan 2018", width: 70 },
                    { field: "feb", title: "Feb 2018", width: 70, hidden: true },
                    { field: "Mar", title: "Mar 2018", width: 70, hidden: true },
                    { command: [{ name: "destroy", text: '' }], title: "Action", width: 80, menu: false },
                    { command: [{ name: "customMenu", text: '' }], title: "", width: 45, menu: false }
            ]
        };
        $scope.addRole = function () {
            var grid = $("#staffingGrid").data("kendoGrid");
            grid.addRow();
        };

        $timeout(function () {
            var grid = $("#staffingGrid").data("kendoGrid");
            var options = localStorage.getItem("kendo-grid-staffingGrid");
            if (options) {
                grid.setOptions(JSON.parse(options));
            }

        });




    }]);

angular.module('transItApp').controller('meetingController', ['$rootScope', '$scope', '$location', '$timeout',
  function ($rootScope, $scope, $location, $timeout) {

      // Required for routing
      $rootScope.Route = "transIT";
      $rootScope.mainPage = "pmo";
      $rootScope.page = "meetings";

      $scope.meetingTab = 1;
      $scope.setMeetingTab = function (tab) {
          $scope.meetingTab = tab;
      }

      $scope.isSetMeeting = function (tab) {
          return $scope.meetingTab === tab;
      };

      $scope.layout = 'calendar';

      $scope.closeCalendar = function () {
          $scope.isExpandCalendar = false;
      }

      $scope.expandCalendarGrid = function (layout, grid) {
          if (layout == 'grid')
              $scope.epandGrid(grid);
          else
              $scope.isExpandCalendar = true;
      }
      //$scope.schedulerOptions = {
      //    date: new Date("2013/6/13"),
      //    startTime: new Date("2013/6/13 07:00 AM"),
      //    height: 700,
      //    views: [

      //      "week",
      //      "month",
      //    ],
      //    timezone: "Etc/UTC",
      //    dataSource: {
      //        batch: true,
      //        transport: {
      //            read: {
      //                url: "https://demos.telerik.com/kendo-ui/service/tasks",
      //                dataType: "jsonp"
      //            },
      //            update: {
      //                url: "https://demos.telerik.com/kendo-ui/service/tasks/update",
      //                dataType: "jsonp"
      //            },
      //            create: {
      //                url: "https://demos.telerik.com/kendo-ui/service/tasks/create",
      //                dataType: "jsonp"
      //            },
      //            destroy: {
      //                url: "https://demos.telerik.com/kendo-ui/service/tasks/destroy",
      //                dataType: "jsonp"
      //            },
      //            parameterMap: function (options, operation) {
      //                if (operation !== "read" && options.models) {
      //                    return {
      //                        models: kendo.stringify(options.models)
      //                    };
      //                }
      //            }
      //        },
      //        schema: {
      //            model: {
      //                id: "taskId",
      //                fields: {
      //                    taskId: {
      //                        from: "TaskID",
      //                        type: "number"
      //                    },
      //                    title: {
      //                        from: "Title",
      //                        defaultValue: "No title",
      //                        validation: {
      //                            required: true
      //                        }
      //                    },
      //                    start: {
      //                        type: "date",
      //                        from: "Start"
      //                    },
      //                    end: {
      //                        type: "date",
      //                        from: "End"
      //                    },
      //                    startTimezone: {
      //                        from: "StartTimezone"
      //                    },
      //                    endTimezone: {
      //                        from: "EndTimezone"
      //                    },
      //                    description: {
      //                        from: "Description"
      //                    },
      //                    recurrenceId: {
      //                        from: "RecurrenceID"
      //                    },
      //                    recurrenceRule: {
      //                        from: "RecurrenceRule"
      //                    },
      //                    recurrenceException: {
      //                        from: "RecurrenceException"
      //                    },
      //                    ownerId: {
      //                        from: "OwnerID",
      //                        defaultValue: 1
      //                    },
      //                    isAllDay: {
      //                        type: "boolean",
      //                        from: "IsAllDay"
      //                    }
      //                }
      //            }
      //        },
      //        filter: {
      //            logic: "or",
      //            filters: [{
      //                field: "ownerId",
      //                operator: "eq",
      //                value: 1
      //            },
      //              {
      //                  field: "ownerId",
      //                  operator: "eq",
      //                  value: 2
      //              }
      //            ]
      //        }
      //    },
      //    resources: [{
      //        field: "ownerId",
      //        title: "Owner",
      //        dataSource: [{
      //            text: "Alex",
      //            value: 1,
      //            color: "#f8a398"
      //        },
      //          {
      //              text: "Bob",
      //              value: 2,
      //              color: "#51a0ed"
      //          },
      //          {
      //              text: "Charlie",
      //              value: 3,
      //              color: "#56ca85"
      //          }
      //        ]
      //    },
      //          {
      //              field: "attendees",
      //              dataSource: [
      //                  { text: "Alex", value: 1, color: "#f8a398" },
      //                  { text: "Bob", value: 2, color: "#51a0ed" },
      //                  { text: "Charlie", value: 3, color: "#56ca85" }
      //              ],
      //              multiple: true,
      //              title: "Attendees"
      //          }],
      //    editable: {
      //        template: $("#customEditorTemplate").html(),
      //    }
      //};

      $scope.addMoM = function () {
          var wnd = angular.element("#add_mom").kendoWindow({
              title: false,
              modal: true,
              visible: false,
              resizable: false,
              width: 430,
              template: '<div>Hi</div>'
          }).data("kendoWindow").center();
          wnd.open().maximize();
          $('.dismiss').on('click', function () {
              wnd.close();
          });
          $("#toolBar .k-header-column-menu").height($('.k-grid-header').height());
      }
      $scope.meetingGridOptions = {
          dataSource: {
              batch: true,
              transport: {
                  read: {
                      url: "https://demos.telerik.com/kendo-ui/service/tasks",
                      dataType: "jsonp"
                  },
                  update: {
                      url: "https://demos.telerik.com/kendo-ui/service/tasks/update",
                      dataType: "jsonp"
                  },
                  create: {
                      url: "https://demos.telerik.com/kendo-ui/service/tasks/create",
                      dataType: "jsonp"
                  },
                  destroy: {
                      url: "https://demos.telerik.com/kendo-ui/service/tasks/destroy",
                      dataType: "jsonp"
                  },
                  parameterMap: function (options, operation) {
                      if (operation !== "read" && options.models) {
                          return {
                              models: kendo.stringify(options.models)
                          };
                      }
                  }
              },
              schema: {
                  model: {
                      id: "taskId",
                      fields: {
                          taskId: {
                              from: "TaskID",
                              type: "number"
                          },
                          title: {
                              from: "Title",
                              defaultValue: "No title",
                              validation: {
                                  required: true
                              }
                          },
                          start: {
                              type: "date",
                              from: "Start"
                          },
                          end: {
                              type: "date",
                              from: "End"
                          },
                          startTimezone: {
                              from: "StartTimezone"
                          },
                          endTimezone: {
                              from: "EndTimezone"
                          },
                          description: {
                              from: "Description"
                          },
                          recurrenceId: {
                              from: "RecurrenceID"
                          },
                          recurrenceRule: {
                              from: "RecurrenceRule"
                          },
                          recurrenceException: {
                              from: "RecurrenceException"
                          },
                          ownerId: {
                              from: "OwnerID",
                              defaultValue: 1
                          },
                          isAllDay: {
                              type: "boolean",
                              from: "IsAllDay"
                          }
                      }
                  }
              },
              filter: {
                  logic: "or",
                  filters: [{
                      field: "ownerId",
                      operator: "eq",
                      value: 1
                  },
                    {
                        field: "ownerId",
                        operator: "eq",
                        value: 2
                    }
                  ]
              }
          },
          sortable: true,
          noRecords: true,
          scrollable: true,
          pageable: {
              pageSize: 10
          },
          messages: {
              noRecords: "No data available"
          },
          editable: {
              mode: "popup",
              template: kendo.template($("#customEditorTemplate").html())
          },
          dataBound: function (e) {
              $timeout(function () {
                  if (!$("#toolBar").hasClass('k-toolbar')) {
                      var toolbar = $("#toolBar").kendoToolBar().getKendoToolBar();
                      toolbar.add({
                          id: "ColumnMenu",
                          template: "<div id='columnMenuButton' class='a-gridstate-button k-state-default' title='Configure visible columns and save the grid state'><div class='colCount'></div></div>",
                          overflow: "never"
                      });
                      $rootScope.gridMenu("#meetingGrid")
                      $("#toolBar .k-header-column-menu").height($('.k-grid-header').height());
                  }
              });

          },
          columns: [{
              locked: true,
              command: [{
                  name: "edit",
                  click: function (e) {
                      e.preventDefault();
                  },
                  text: {
                      edit: "",
                      update: "Save"
                  }
              }],
              width: "50px"
          },
            {
                field: "taskId",
                title: "#",
                width: 200,
                menu: false
            },
            {
                field: "title",
                title: "Meeting Name",
                width: 300
            },
            {
                field: "ownerId",
                title: "Chair Person Id",
                width: 250
            },
            {
                field: "start",
                title: "Start Date Time",
                width: 200,
                type: "date",
                format: "{0:MM/dd/yyyy HH:MM tt}",
                attributes: {
                    "class": "text-right"
                }
            },
            {
                field: "end",
                title: "End Date Time",
                width: 200,
                type: "date",
                format: "{0:MM/dd/yyyy HH:MM tt}",
                attributes: {
                    "class": "text-right"
                }
            },
            {
                field: "description",
                title: "Description",
                width: 200
            },
            {
                field: "isAllDay",
                title: "All Day Event",
                width: 150
            },
            {
                command: [{
                    name: "destroy",
                    text: ''
                }],
                title: "Action",
                width: 80,
                menu: false
            },
            {
                command: [{
                    name: "customMenu",
                    text: ''
                }],
                title: "",
                width: 45,
                menu: false
            }
          ]
      };
      $timeout(function () {
          var grid = $("#meetingGrid").data("kendoGrid");
          var options = localStorage.getItem("kendo-grid-meetingGrid");
          if (options) {
              grid.setOptions(JSON.parse(options));
          }
      });

      var momData = [{
          slno: '1',
          meeting_name: 'Test meeting 1',
          date: '02/20/2018',
          attendees: ['leena.susan.george', 'vaidheki.srinivasan', 'abinaya.velumurugan']
      },
        {
            slno: '2',
            meeting_name: 'Test meeting 2',
            date: '02/20/2018',
            attendees: []
        },
        {
            slno: '3',
            meeting_name: 'Test meeting 3',
            date: '02/20/2018',
            attendees: []
        }
      ]

      $scope.momGridOptions = {
          dataSource: {
              data: momData,
              schema: {
                  model: {
                      id: "slno"
                  }
              }
          },
          sortable: true,
          noRecords: true,
          scrollable: false,
          messages: {
              noRecords: "No data available"
          },
          editable: {
              mode: "popup",
              template: kendo.template($("#update_mom").html())
          },
          dataBound: function (e) {
              $timeout(function () {
                  if (!$("#toolBar").hasClass('k-toolbar')) {
                      var toolbar = $("#toolBar").kendoToolBar().getKendoToolBar();
                      toolbar.add({
                          id: "ColumnMenu",
                          template: "<div id='columnMenuButton' class='a-gridstate-button k-state-default' title='Configure visible columns and save the grid state'><div class='colCount'></div></div>",
                          overflow: "never"
                      });
                      $rootScope.gridMenu("#meetingGrid")
                      $("#toolBar .k-header-column-menu").height($('.k-grid-header').height());
                  }
              });

          },
          columns: [{
              locked: true,
              command: [{
                  name: "edit",
                  click: function (e) {
                      e.preventDefault();
                  },
                  text: {
                      edit: "",
                      update: "Save"
                  }
              }],
              width: "50px"
          },
            {
                field: "slno",
                title: "#",
                width: 60,
                menu: false
            },
            {
                field: "meeting_name",
                title: "Meeting Name",
                width: 300
            },
            {
                field: "date",
                title: "Date",
                width: 130,
                type: "date",
                format: "{0:MM/dd/yyyy}",
                attributes: {
                    "class": "text-right"
                }
            },
            {
                field: "attendees",
                title: "Accenture Attendees",
                template: function (dataItem) {
                    var html = [];
                    for (var i = 0; i < dataItem.attendees.length; i++) {
                        html.push(dataItem.attendees[i]);
                    }
                    return html.join(', ');
                }
            },
            {
                command: [{
                    name: "custom",
                    text: ''
                }],
                title: "Action",
                width: 80
            }
          ]
      };
      $scope.selectOptions = {
          dataSource: ['leena.susan.george', 'vaidheki.srinivasan', 'abinaya.velumurugan'],
          open: function (e) {
              var len = this.input.val().length;
              if (len == 0) {
                  e.preventDefault();
              }
          },
          filter: "contains",
          filtering: function (e) {
              if (e.filter.value == '') {
                  this.close();
              }
          }
      };
      $scope.riskIssueTab = 1;
      $scope.setRiskTab = function (tab) {
          $scope.riskIssueTab = tab;
      }
      $scope.isSetRisk = function (tab) {
          return $scope.riskIssueTab === tab;
      };

      var momRiskData = [{
          slno: '1',
          riskRef: 'R1',
          viewSeq: 'No',
          source: 'MOM',
          date_raised: '03/01/2018',
          riskAge: '26',
          int_ext_joint: 'Joint',
          raisedBy: 'vaidheki',
          proj_phase: 'Solution',
          due_date: '11/06/2018',
          actual_date: '11/03/2018',
          risk_imapact: 'Medium',
          risk_probability: 'Low',
          category: 'Recruitment',
          primary_owner: 'vaidheki.srinivasan',
          secondary_owner: 'leena.susan.george',
          status: 'Open'
      }];

      $scope.momRiskGridOptions = {
          dataSource: {
              data: momRiskData,
              schema: { model: { id: "slno" } }
          },
          sortable: true,
          noRecords: true,
          scrollable: true,
          messages: { noRecords: "No data available" },
          editable: false,
          dataBound: function (e) {
              $timeout(function () {
                  if (!$("#toolBar").hasClass('k-toolbar')) {
                      var toolbar = $("#toolBar").kendoToolBar().getKendoToolBar();
                      toolbar.add({
                          id: "ColumnMenu",
                          template: "<div id='columnMenuButton' class='a-gridstate-button k-state-default' title='Configure visible columns and save the grid state'><div class='colCount'></div></div>",
                          overflow: "never"
                      });
                      $rootScope.gridMenu("#momRiskGrid")
                      $("#toolBar .k-header-column-menu").height($('.k-grid-header').height());
                  }
              });
          },
          columns: [
                { field: "slno", title: "#", width: 50, menu: false },
                { field: "riskRef", title: "Risk Ref #", width: 150 },
                { field: "viewSeq", title: "View Sequence", width: 150 },
                { field: "source", title: "Source", width: 150 },
                { field: "date_raised", title: "Date Raised", width: 130, type: "date", format: "{0:MM/dd/yyyy}", attributes: { "class": "text-right" } },
                { field: "riskAge", title: "Risk Age", width: 100, attributes: { "class": "text-right" } },
                { field: "int_ext_joint", title: "Internal/External/Joint", width: 200 },
                { field: "raisedBy", title: "Raised by (person)", width: 150 },
                { field: "proj_phase", title: "Project Phase", width: 150 },
                { field: "due_date", title: "Risk Due Date", width: 130, type: "date", format: "{0:MM/dd/yyyy}", attributes: { "class": "text-right" } },
                { field: "actual_date", title: "Actual Close Date", width: 130, type: "date", format: "{0:MM/dd/yyyy}", attributes: { "class": "text-right" } },
                { field: "risk_imapact", title: "Risk Impact", width: 150 },
                { field: "risk_probability", title: "Risk Probability", width: 150 },
                { field: "category", title: "Category / Workstream", width: 150 },
                { field: "primary_owner", title: "Primary Owner", width: 150 },
                { field: "secondary_owner", title: "Secondary Owner", width: 150 },
                { field: "status", title: "Status", width: 120 },
                { command: [{ name: "customMenu", text: '' }], title: "", width: 45, menu: false }
          ]
      };
  }
]);
angular.module('transItApp').controller('pctKitController', ['$rootScope', '$scope', '$location', '$timeout', '$document',
  function ($rootScope, $scope, $location, $timeout, $document) {

      // Required for routing
      $rootScope.Route = "transIT";
      $rootScope.mainPage = "pmo";
      $rootScope.page = "pct-kit";


      var pctKitData = [{
          slno: '1',
          programme: 'MEC Completion & Outcome; Completion of initial SRAT review',
          requiredProgramme: 'Operations Mobilisation MEC',
          discretionary: 'Mandatory',
          timeline: 'Programme Setup: -1 week',
          score: ''
      }, {
          slno: '2',
          programme: 'Completed contract schedule with contractual deliverables, milestones',
          requiredProgramme: 'Standard Mobilisation Contract Schedule',
          discretionary: 'Mandatory',
          timeline: 'Programme Setup: -2weeks',
          score: ''
      }, {
          slno: '3',
          programme: 'Solution assumptions, SoW, pyramid detail, process complexity, Transform',
          requiredProgramme: 'BPO Solution Plan & Mobilisation Solution',
          discretionary: 'Mandatory',
          timeline: 'Programme Setup: -1 week',
          score: ''
      }, {
          slno: '4',
          programme: 'Data gathering around technology & work environment, process, transform',
          requiredProgramme: 'Due Diligence Outcome',
          discretionary: 'Mandatory',
          timeline: 'Programme Setup: -1 week',
          score: ''
      }];

      $scope.pctKitGridOptions = {
          dataSource: {
              data: pctKitData,
              schema: {
                  model: {
                      id: "id"
                  }
              }
          },
          scrollable: true,
          pageable: {
              pageSize: 10
          },
          noRecords: true,
          messages: {
              noRecords: "No data available"
          },
          columns: [{
              locked: true,
              command: [{
                  name: "edit",
                  click: function (e) {
                      e.preventDefault();
                  },
                  text: {
                      edit: "",
                      update: "Save"
                  }
              }],
              width: 50
          }, {
              field: "slno",
              title: "#",
              width: 50,
              filterable: false,
              menu: false
          }, {
              title: "AUDIT AREA",
              headerAttributes: {
                  style: "text-align: center"
              },
              columns: [{
                  field: "programme",
                  title: "PROGRAMME CONTROL AREA DETAIL",
                  width: 290,
                  filterable: false,
              }, {
                  field: "requiredProgramme",
                  title: "REQUIRED 'PROGRAMME CONTROLTOOLKIT' ARTIFACT",
                  width: 245,
                  filterable: false,
              }, {
                  field: "discretionary",
                  title: "MANDATORY / DISCRETIONARY (BASED ON COMPLEXITY)",
                  width: 245,
                  filterable: false,
              }, {
                  field: "timeline",
                  title: "TIMELINE BY WHEN ARTIFACT MUST BE IN PLACE",
                  width: 245,
                  filterable: {
                      dataSource: pctKitData,
                      multi: true,
                      checkAll: false,
                      itemTemplate: function (e) {
                          return "<li class='k-item'><label class='k-label'><input type='checkbox' name='" + e.field + "' value='#=timeline#'/><span>#= timeline #</span></label></li>"
                      }
                  },
              }, {
                  field: "tool",
                  title: "Tool/Template to be Utilised",
                  width: 235,
                  filterable: false
              }, {
                  field: "responsibility",
                  title: "Completion Responsibility",
                  width: 225,
                  filterable: false
              }, {
                  field: "approver",
                  title: "Artifact Approver",
                  width: 180,
                  filterable: false
              }],
          },
            {
                title: "AUDIT QUESTIONS & FINDINGS",
                headerAttributes: {
                    style: "text-align: center"
                },
                columns: [{
                    field: "understood",
                    title: "Is it understood ?",
                    width: 175,
                    filterable: false
                }, {
                    field: "gap",
                    title: "what are the gaps ?",
                    width: 175,
                    filterable: false,
                }, {
                    field: "score",
                    title: "Score",
                    width: 80,
                    filterable: false
                }],
            }, {
                command: [{
                    name: "customMenu",
                    text: ''
                }],
                title: "",
                width: 40,
                menu: false
            }
          ],
          sortable: true,
          filterable: true,
          editable: {
              mode: "popup",
              template: kendo.template($("#update_pct_kit").html())
          },
          dataBound: function (e) {
              $timeout(function () {
                  if (!$("#toolBar").hasClass('k-toolbar')) {
                      var toolbar = $("#toolBar").kendoToolBar().getKendoToolBar();
                      toolbar.add({
                          id: "ColumnMenu",
                          template: "<div id='columnMenuButton' class='a-gridstate-button k-state-default' title='Configure visible columns and save the grid state'><div class='colCount'></div></div>",
                          overflow: "never"
                      });
                      $rootScope.gridMenu("#pctKitGrid")
                      $("#toolBar .k-header-column-menu").height($('.k-grid-header').height());
                  }
              });

          },
      };

      $timeout(function () {
          var grid = $("#pctKitGrid").data("kendoGrid");
          var options = localStorage.getItem("kendo-grid-pctKitGrid");
          if (options) {
              grid && grid.setOptions(JSON.parse(options));
          }

      });

      var pctKitAuditData = [{
          slno: '1',
          task: 'Review PCT Audit list and assess items relevant for the deal',
          primaryResponsibility: 'Operations Mobilisation MEC',
          secondaryResponsibility: 'Mandatory',
          timeline: 'Programme Setup: -1 week'
      }, {
          slno: '2',
          task: 'Complete all templates as applicable for the deal by the timeslines',
          primaryResponsibility: 'Transition (& Transformation) Lead',
          secondaryResponsibility: 'NA',
          timeline: 'Weekly from Programme Start'
      }, {
          slno: '3',
          task: 'Contract is signed',
          primaryResponsibility: 'Deal Team',
          secondaryResponsibility: 'Programme Control Lead',
          timeline: 'Programme Start'
      }, {
          slno: '4',
          task: 'Review status against each item',
          primaryResponsibility: 'SPOA',
          secondaryResponsibility: 'Transition (& Transformation) Lead',
          timeline: 'Weekly from Programme Start'
      },
        {
            slno: '5',
            task: 'Audit Process Completed',
            primaryResponsibility: 'SPOA',
            secondaryResponsibility: 'NA',
            timeline: 'Weekly from Programme Start'
        }, {
            slno: '6',
            task: 'Provide Status to the Regional Lead',
            primaryResponsibility: 'SPOA',
            secondaryResponsibility: 'NA',
            timeline: 'Weekly from Programme Start'
        },
        {
            slno: '7',
            task: 'Coaching & Feedback to Transition Lead',
            primaryResponsibility: 'SPOA',
            secondaryResponsibility: 'NA',
            timeline: 'Weekly from Programme Start'
        }
      ];

      $scope.pctKitAuditGridOptions = {
          dataSource: {
              data: pctKitAuditData,
              pageSize: 6,
              schema: {
                  model: {
                      id: "slno"
                  }
              }
          },
          height: 480,
          scrollable: {
              endless: true
          },
          sortable: true,
          messages: {
              noRecords: "No data available"
          },
          columns: [{
              field: "slno",
              title: "#",
              width: 50
          }, {
              field: "task",
              title: "TASK"
          }, {
              field: "primaryResponsibility",
              title: "PRIMARY RESPONSIBILITY"
          }, {
              field: "secondaryResponsibility",
              title: "TIMELINE"
          }, {
              field: "timeline",
              title: "TIMELINE"
          }],
      };

      var pctKitGuidlinesData = [{
          slno: '1',
          exists: 'Yes',
          isUnderstood: 'Yes',
          isUsed: 'Yes',
          gaps: 'No Gap',
          scoring: {
              value: '6',
              status: 'onTrack'
          },
          overall: {
              value: '4.9 to 6',
              percentage: '100%',
              status: 'onTrack'
          }
      }, {
          slno: '2',
          exists: 'Yes',
          isUnderstood: 'Yes',
          isUsed: 'Yes',
          gaps: 'Minor impact gap',
          scoring: {
              value: '5',
              status: 'onTrack'
          },
          overall: {
              value: '4.9 to 6',
              percentage: '100%',
              status: 'onTrack'
          }
      }, {
          slno: '3',
          exists: 'Yes',
          isUnderstood: 'Yes',
          isUsed: 'Yes',
          gaps: 'Major impact gap',
          scoring: {
              value: '4',
              status: 'atRisk'
          },
          overall: {
              value: '3.0 to 4.8',
              percentage: '80%',
              status: 'onTrack'
          }
      }, {
          slno: '4',
          exists: 'Yes',
          isUnderstood: 'No',
          isUsed: 'Yes',
          gaps: 'Major impact gap',
          scoring: {
              value: '3',
              status: 'atRisk'
          },
          overall: {
              value: '3.0 to 4.8',
              percentage: '80%',
              status: 'onTrack'
          }
      },
        {
            slno: '5',
            exists: 'Yes',
            isUnderstood: 'Yes',
            isUsed: 'No',
            gaps: 'Major impact gap',
            scoring: {
                value: '3',
                status: 'atRisk'
            },
            overall: {
                value: '3.0 to 4.8',
                percentage: '80%',
                status: 'onTrack'
            }
        }, {
            slno: '6',
            exists: 'Yes',
            isUnderstood: 'Yes',
            isUsed: 'Yes',
            gaps: 'Major impact gap',
            scoring: {
                value: '2',
                status: 'atRisk'
            },
            overall: {
                value: '1 to 2.9',
                percentage: '48.33%',
                status: 'onTrack'
            }
        },
        {
            slno: '7',
            exists: 'Yes',
            isUnderstood: 'Yes',
            isUsed: 'Yes',
            gaps: 'Major impact gap',
            scoring: {
                value: '2',
                status: 'behindTrack'
            },
            overall: {
                value: '1 to 2.9',
                percentage: '48.33%',
                status: 'onTrack'
            }
        }
      ];

      $scope.pctKitGuidlinesGridOptions = {
          dataSource: {
              data: pctKitGuidlinesData,
              pageSize: 6,
              schema: {
                  model: {
                      id: "slno"
                  }
              }
          },

          height: 480,
          scrollable: {
              endless: true
          },
          messages: {
              noRecords: "No data available"
          },
          columns: [{
              field: "slno",
              title: "#",
              width: 50
          }, {
              field: "exists",
              title: "Does it exist"
          }, {
              field: "isUnderstood",
              title: "is it understood"
          }, {
              field: "isUsed",
              title: "is it being used / upto date"
          }, {
              field: "gaps",
              title: "what are the gaps",
          }, {
              field: "scoring",
              title: "scoring",
              sortable: false,
              template: '<div class="text-center"><span class="status-value d-block">#=scoring.value#</span><span class="rag-status #=scoring.status#"></span></div>',
          }, {
              field: "overall",
              title: "overall rag status for average score",
              width: 320,
              sortable: false,
              template: '<div class="row text-center"><div class="col-xs-4"><span class="status-value d-block">#=overall.value#</span><span class="rag-status #=overall.status#"></span></div><div class="col-xs-4"><span class="status-value d-block">#=overall.percentage#</span><span class="rag-status #=overall.status#"></span></div></div>',
          }],
      };

      $(document).keyup(function (e) {
          if (e.keyCode == 27) {
              $rootScope.isExpandAuditGrid = false;
              $scope.$apply();
          }
      });

  }
]);

/* DMAT > Project */
angular.module('transItApp').controller('dmatProjectController', ['$rootScope', '$scope', '$location', '$timeout',
    function ($rootScope, $scope, $location, $timeout) {

        $rootScope.Route = "createProject";
        var dealID;
        var createdealind = false;
        var found = true;
        var trnsfound = true;
        // Dummy daa
        $scope.opplists = [
                 "Q9876543",
                 "Q9876544",
                 "Q9876545",
                 "P9876543",
                 "P9876544",
                 "P9876545",
                 "R9876543",
                 "R9876544",
        ];
        $scope.showForm = false;
        $scope.selectedopper = function (e) {
            //debugger;
            var opportunityID = e.item[0].innerHTML;
            $.ajax({
                url: '/DMAT/Project/getOpportunityID',
                traditional: true,
                type: 'POST',
                dataType: 'json',
                async: false,
                cache: false,
                data: JSON.stringify({ "oppID": opportunityID }),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    debugger;
                    $scope.Opp = data;

                    $scope.showForm = true;

                }
            });

        }

        $scope.oppershow = function (kendoEvent) {
            //debugger;
            var opportunityID = kendoEvent.item[0].innerHTML;
            $scope.showForm = true;
            $.ajax({
                url: '/DMAT/Project/getOpportunityID',
                traditional: true,
                type: 'POST',
                dataType: 'json',
                async: false,
                cache: false,
                data: JSON.stringify({ "oppID": opportunityID }),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    debugger;



                    $scope.Opp = data;

                    $scope.showForm = true;

                    if ($scope.Opp.DealCreatedInd == "N") {
                        createdealind = true;
                    }
                }
            });

            if (createdealind)
                $scope.showForm = true;
            else
                $scope.showForm = false;

        }
        $.ajax({
            url: "/DMAT/Project/getOpportunity",
            traditional: true,
            type: 'POST',
            datatype: 'json',
            async: false,
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                $scope.opportunitydatasource = data;
            }
        });
        $scope.roledatasource = {
            transport: {
                read: {
                    dataType: "json",
                    url: "/DMAT/Project/getRole",
                }
            }
        };

        $scope.roleOptions = {
            dataSource: $scope.roledatasource,
            dataTextField: "roleName",
            dataValueField: "roleID",




        };
        $.ajax({
            url: "/DMAT/Project/getPerson",
            traditional: true,
            type: 'POST',
            datatype: 'json',
            async: false,
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                $scope.peopledatasource = data;
            }
            

        });

      
       /* $scope.role_change = function () {
           
                if ($(this).val() == 'Transition Lead') {
                    $('#globaltrsnLead').show();
                } else {
                    $('#globaltrsnLead').hide();
                }
            }*/
                



        $scope.peopleOptions = {
            dataSource: $scope.peopledatasource,
            dataTextField: "personName",
            dataValueField: "personID",


        };

        //$scope.opportunitydatasource = {
        //    transport: {
        //        read: {
        //            dataType: "json",
        //            url: "/DMAT/Project/getOpportunity",
        //        }
        //    }
        //};

        $scope.opportunityOptions = {
            dataSource: $scope.opportunitydatasource,
            dataTextField: "opportunityID",
            dataValueField: "ID",
            filter: "startswith",
            minLength: 3,
            enforceMinLength: true,


        };

        $scope.saveProject = function () {
            window.location.href = '/DMAT/DMAT/Checklist/' + dealID;
            //$.ajax({
            //    url: '/DMAT/Checklist',
            //    traditional: true,
            //    method: 'POST',

            //    data: JSON.stringify({ "id": dealID }),
            //    contentType: 'application/json; charset=utf-8',
            //    //success: function () { }
            //});
        };
        function CheckDates(StartDate, EndDate) {
            var Equality = false;
            var sourceStringDate = StartDate;

            var TargetStringDate = EndDate;


            var t = jQuery.trim(TargetStringDate);

            var s = jQuery.trim(sourceStringDate);

            if (Date.parse(s) > Date.parse(t)) {
                Equality = true;
            }
            return Equality;

        }
        function validateSpecialCharacters(inputtxt) {
            //var letterNumber = /^[0-9a-zA-Z]+$/;  
            var res = /^[a-zA-Z0-9\s\.\-\&\_]+$/;
            if (res.test(inputtxt))
                return true;
            else
                return false;
        };

        $scope.dateFormat = 'MM/dd/yyyy';
        $scope.openModal = function () {
            var validate = true;
            $('#CPbutton').prop('disabled', true);
            $('#imgMpp').show();
            $('#imgMppDiv').show();
            var pmoInd = 0;
            var transInd = 0;
            var gtlInd = 0;
            var foundTL = false;
            var foundGTL = false;
            var foundPMO = false;
            var foundGov = false;
            var opportunityID = $('#opperid').val();
            var projectname = $('#projName').val();
            var roleName = $('#role').val();
            var transitionlead = $('#trsnLead').val();
            var GlobalTransitionLead = $('#globaltrsnLead').val()
            var pmo = $('#pmo').val();
            var gov = $('#governance').val();
            var startdate = $('#startdate').val();
            //var enddate = $('#enddate').val();
            var offering = document.getElementById("offering").innerHTML;
            var stageNM = document.getElementById("stage").innerHTML;
            var oppResuse = false;
            if ($("#oppCheck").prop("checked") == true)
                oppResuse = true;

            var spVal = validateSpecialCharacters(projectname);
            if (spVal == false) {
                $('#imgMpp').hide();
                $('#imgMppDiv').hide();
                showMessagePopUp("Please specify a valid deal name. Deal name can contain the special characters - _ & and .");
                $('#CPbutton').prop('disabled', false);
                return;
            }

            var data = $('#trsnLead').data("kendoAutoComplete").dataSource._data;
            nbData = data.length,
                foundTL = false;

            for (var iData = 0; iData < nbData; iData++) {
                if ($('#trsnLead').val() === data[iData].personName) {
                    foundTL = true;

                }
            }
            if (foundTL == false && transitionlead != "") {
                $('#imgMpp').hide();
                $('#imgMppDiv').hide();
                validate = false;
                showMessagePopUp("Please enter a valid Transition Lead Name");
                $('#CPbutton').prop('disabled', false);
            }

            var dataGtl = $('#globaltrsnLead').data("kendoAutoComplete").dataSource._data;
            nbData = dataGtl.length,
                foundGTL = false;

            for (var iData = 0; iData < nbData; iData++) {
                if ($('#globaltrsnLead').val() === dataGtl[iData].personName) {
                    foundGTL = true;

                }
            }
                    if (foundGTL == false && GlobalTransitionLead != "") {
                        $('#imgMpp').hide();
                        $('#imgMppDiv').hide();
                        validate = false;
                        showMessagePopUp("Please enter a valid Global Transition Lead Name");
                        $('#CPbutton').prop('disabled', false);
                    }

        
            var dataPMO = $('#pmo').data("kendoAutoComplete").dataSource._data;
            nbData = dataPMO.length,
                   foundPMO = false;

            for (var iData = 0; iData < nbData; iData++) {
                if ($('#pmo').val() === dataPMO[iData].personName) {
                    foundPMO = true;

                }
            }
            var dataPMOGov = $('#governance').data("kendoAutoComplete").dataSource._data;
            nbData = dataPMOGov.length,
                   foundGov = false;

            for (var iData = 0; iData < nbData; iData++) {
                if ($('#governance').val() === dataPMOGov[iData].personName) {
                    foundGov = true;

                }
            }


            var loggedInId = $('#loggedInName').val();
            if (pmo == transitionlead && pmo != "" && transitionlead != "") {
                $('#imgMpp').hide();
                $('#imgMppDiv').hide();
                validate = false;
                showMessagePopUp("Please Select a different name for PMO, as PMO and Transition Lead needs to be different")
                $('#CPbutton').prop('disabled', false);
            }
           
            //var loggedInId = $('#loggedInName').val();
            if (pmo == GlobalTransitionLead && pmo != "" && GlobalTransitionLead != "") {
                $('#imgMpp').hide();
                $('#imgMppDiv').hide();
                validate = false;
                showMessagePopUp("Please Select a different name for PMO, as PMO and Global Transition Lead needs to be different")
                $('#CPbutton').prop('disabled', false);
            }
            if (pmo == "" && transitionlead == "") {
                $('#imgMpp').hide();
                $('#imgMppDiv').hide();
                validate = false;
                showMessagePopUp("Please Select PMO or TransitionLead Name")
                $('#CPbutton').prop('disabled', false);
            }

            if (pmo == loggedInId) {
                pmoInd = 1;
                //validate = false;
                //showMessagePopUp("Please Select a different name for PMO, as Project creator and PMO needs to be different")
                //$('#CPbutton').prop('disabled', false);
            }
            //Rolename Global Deal PMO =11
            if (roleName == "11" && (GlobalTransitionLead == loggedInId || transitionlead == loggedInId) )  {
               gtlInd = 1;
               validate = false;
                showMessagePopUp("Transition Lead/Global Transition Lead cannot be Global Deal PMO")
                $('#CPbutton').prop('disabled', false);
            }

            if (transitionlead == loggedInId) {
               transInd = 1;
                //validate = false;
                //showMessagePopUp("Please Select a different name for Transition Lead, as Project creator and Transition Lead needs to be different")
                //$('#CPbutton').prop('disabled', false);
            }

            if (validate == true) {
                if (pmo == gov) {
                    $('#imgMpp').hide();
                    $('#imgMppDiv').hide();
                    validate = false;
                    showMessagePopUp("Please Select a different name for SPOA, as the SPOA and PMO cannot be the same")
                    $('#CPbutton').prop('disabled', false);
                }
                if (gov == transitionlead) {
                    $('#imgMpp').hide();
                    $('#imgMppDiv').hide();
                    validate = false;
                    showMessagePopUp("Please Select a different name for SPOA, as the SPOA and Transition Lead cannot be the same")
                    $('#CPbutton').prop('disabled', false);
                }

           //     if (GlobalTransitionLead == loggedInId )
              
                if (gov == GlobalTransitionLead) {
                    $('#imgMpp').hide();
                    $('#imgMppDiv').hide();
                    validate = false;
                    showMessagePopUp("Please Select a different name for SPOA, as the SPOA and Global Transition Lead cannot be the same")
                    $('#CPbutton').prop('disabled', false);
                }
                if (gov == loggedInId) {
                    $('#imgMpp').hide();
                    $('#imgMppDiv').hide();
                    validate = false;
                    showMessagePopUp("Please Select a different name for SPOA, as the SPOA and Logged in username cannot be the same")
                    $('#CPbutton').prop('disabled', false);
                }

                if (foundPMO == false && pmo != "") {
                    $('#imgMpp').hide();
                    $('#imgMppDiv').hide();
                    validate = false;
                    showMessagePopUp("Please enter a valid enterpriseID for PMO");
                    $('#CPbutton').prop('disabled', false);
                }
                if (foundTL == false && transitionlead != "") {
                    $('#imgMpp').hide();
                    $('#imgMppDiv').hide();
                    validate = false;
                    showMessagePopUp("Please enter a valid enterpriseID for Transition Lead");
                    $('#CPbutton').prop('disabled', false);
                }
                 if (foundGTL == false) {
                     $('#imgMpp').hide();
                     $('#imgMppDiv').hide();
                     validate = false;
                     showMessagePopUp("Please enter a valid enterpriseID for Global Transition Lead");
                     $('#CPbutton').prop('disabled', false);
                 } 
                if (foundGov == false) {
                    $('#imgMpp').hide();
                    $('#imgMppDiv').hide();
                    validate = false;
                    showMessagePopUp("Please enter a valid enterpriseID for SPOA");
                    $('#CPbutton').prop('disabled', false);
                }

               
            }
            //if (CheckDates(startdate,enddate))
            //{
            //    $('#imgMpp').hide();
            //    $('#imgMppDiv').hide();
            //    validate = false;
            //    showMessagePopUp("Contract sign date should always be greater than LOI Date");
            //    $('#CPbutton').prop('disabled', false);
            //}
            //if ((startdate == "" || startdate == null) || (enddate == "" || enddate == null)) {
            //    $('#imgMpp').hide();
            //    $('#imgMppDiv').hide();
            //    validate = false;
            //    showMessagePopUp("Contract sign date and LOI Date should not be empty");
            //    $('#CPbutton').prop('disabled', false);
            //}
            if (validate == true) {
                var arr = opportunityID + ',' + projectname + ',' + roleName + ',' + startdate + ',' + null + ',' + transitionlead + ',' + offering + ',' + stageNM + ',' + pmo + ',' + pmoInd + ',' + transInd + ',' + gov + ',' + oppResuse + ',' + GlobalTransitionLead + ',' + gtlInd;
                $.ajax({
                    url: '/DMAT/Project/saveDeal',
                    traditional: true,
                    type: 'POST',
                    cache: false,
                    data: JSON.stringify({ "link": arr }),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $('#imgMpp').hide();
                        $('#imgMppDiv').hide();
                        if (data == -1) {
                            showMessagePopUp("There's a profile and role mismatch for the user specified as Transition lead");
                            $('#CPbutton').prop('disabled', false);
                        } 

                        else if (data == -111) {
                            
                              showMessagePopUp("There's a profile and role mismatch for the user specified as Global Transition lead");
                                $('#CPbutton').prop('disabled', false);
                            }
                        
                        else if (data == -2) {
                            showMessagePopUp("There's a profile and role mismatch for the user specified as PMO");
                            $('#CPbutton').prop('disabled', false);
                        }
                        else if (data == -3) {
                            showMessagePopUp("There's a profile and role mismatch for the user specified as SPOA");
                            $('#CPbutton').prop('disabled', false);
                        }
                        else if (data == -4) {
                            showMessagePopUp("There's a profile and role mismatch for the user specified as Transition lead and PMO");
                            $('#CPbutton').prop('disabled', false);
                        }
                        else if (data == -444) {
                            showMessagePopUp("There's a profile and role mismatch for the user specified as Global Transition lead and PMO");
                            $('#CPbutton').prop('disabled', false);
                        }
                        else if (data == -5) {
                            showMessagePopUp("There's a profile and role mismatch for the user specified as Transition lead and SPOA");
                            $('#CPbutton').prop('disabled', false);
                        }
                        else if (data == -555) {
                            showMessagePopUp("There's a profile and role mismatch for the user specified as Global Transition lead and SPOA");
                            $('#CPbutton').prop('disabled', false);
                        }
                        else if (data == -6) {
                            showMessagePopUp("There's a profile and role mismatch for the user specified as PMO and SPOA");
                            $('#CPbutton').prop('disabled', false);
                        }
                        else if (data == -7) {
                            showMessagePopUp("There's a profile and role mismatch for the user specified as Transition Lead,Global Transition Lead,PMO and SPOA");
                            $('#CPbutton').prop('disabled', false);
                        }

                       
                        else if (data == -99) {
                            showMessagePopUp("There's a profile and role mismatch on your role. Please try selecting a different role from the dropdown");
                            $('#CPbutton').prop('disabled', false);
                        }
                        else if (data == 0) {
                            showMessagePopUp("Some error occured while creating the project. Please contact L1 Support Team for assistance");
                            $('#CPbutton').prop('disabled', false);
                        }
                        else {
                            dealID = data;
                            $scope.TransitionLeadName = $('#trsnLead').val();
                            $('#myModal').appendTo("body").modal('show');
                        }
                    }
                });
            }





        }
        $scope.close = function () {
            window.location.href = '/DMAT/Project/DMATHome/';
        }

        $(document).ready(function () {
            $("#opperid").blur(function () {
                var data = $(this).data("kendoAutoComplete").dataSource._data,
                    nbData = data.length,
                    found = false;

                for (var iData = 0; iData < nbData; iData++) {
                    if (this.value === data[iData].opportunityID) {

                        if (data[iData].Ind == 'Y') {
                            $scope.showForm = false;
                            showMessagePopUp("The Selected opportunity is already in use and cannot be duplicated. Please read the notes given below :");

                            found = true;
                            break;
                        }
                        else if (data[iData].Ind == 'N') {

                            $scope.showForm = true;
                            found = true;
                            break;



                        }
                    }
                }
                if (found == false) {
                    if ($('#opperid').val() != "") {
                        showMessagePopUp("Not a valid Opportunity ID");
                        $scope.showForm = false;
                    }
                    // $('#createProjectbtn').attr('disabled', 'disabled');
                }
            });

        });
        //$scope.blurFunction = new function () {

        //    var data = $("#trsnLead1").data("kendoAutoComplete").dataSource._data,
        //        nbData = data.length,
        //        found = false;

        //    for (var iData = 0; iData < nbData; iData++) {
        //        if (this.value === data[iData].opportunityID) {
        //            found = true;

        //        }
        //    }
        //    if (found == false) {
        //        alert("Not a valid Opportunity ID");
        //        $scope.showForm = false;
        //        // $('#createProjectbtn').attr('disabled', 'disabled');
        //    }

        //}

    }]);

angular.module('transItApp').controller('wavedetails', ['$rootScope', '$scope', '$location', '$timeout', '$filter',
    function ($rootScope, $scope, $location, $timeout, $filter) {

        $scope.waves = [];
        var waveNames;
        var waveIds;
        var p = $rootScope.redirectType;
        $.ajax({
            url: '/WaveSetup/Home/GetWaveAndSubWaveDetails?flag=' + p,
            traditional: true,
            type: 'POST',
            datatype: 'json',
            async: false,
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                //var myJSON = json.stringify(data);
                $scope.wavesnumber = data;
                var jsondata = JSON.stringify(data);

                //$scope.waves = JSON.stringify(JSON.parse(dat)[0].subWaveNames);

                waveNames = JSON.parse(jsondata)[0].subWaveNames.map(function (item) {
                    return item;
                });
                waveIds = JSON.parse(jsondata)[0].subWaveIds.map(function (item) {
                    return item;
                });

                $scope.jsonwaves = JSON.stringify(waveNames);

                for (i = 0; i < waveNames.length; i++) {
                    var wave = { 'id': waveIds[i], 'name': waveNames[i] }
                    $scope.waves.push(wave);

                }
            }
        });



        $scope.carouselItems = _groupItems($scope.waves, 40, 'name');
        for (var x = 0; x < $scope.carouselItems.length; x++) {

            $scope['grpupedItems_' + x] = _groupItems($scope.carouselItems[x], 10, 'name');
        }
        $scope.getGroupItem = function (index) {
            return $scope['grpupedItems_' + index];
        }

        function _groupItems(items, size, sort) {
            var grouped = [],
                index = 0;

            if (angular.isDefined(sort)) {
                $filter('orderBy')(items, sort);
            }

            for (var i = 0; i < items.length; i++) {
                if (angular.isUndefined(grouped[index])) {
                    grouped[index] = [];
                }

                grouped[index].push(items[i]);

                if ((i + 1) % size === 0) {
                    index++;
                }
            }

            return grouped;
        }
        $rootScope.navigateTransition = function (tab) {
            $scope.goto('/transition-plan');
            $timeout(function () {
                $rootScope.transitionTab = tab;
            }, 100);
        };
        $rootScope.navigateTrainer = function (tab) {
            $scope.goto('/train-the-trainer');
            $timeout(function () {
                $rootScope.trainTheTrainerTab = tab;
            }, 100);
        };
    }]);


angular.module('transItApp').controller('gngwavedetails', ['$rootScope', '$scope', '$location', '$timeout', '$filter',
    function ($rootScope, $scope, $location, $timeout, $filter) {

        $scope.waves = [];
        var waveNames;
        var waveIds;
        var p = $rootScope.redirectType;
        $.ajax({
            url: '/PMO/GoNoGo/GetWaveDetailsGNG?flag=' + p,
            traditional: true,
            type: 'POST',
            datatype: 'json',
            async: false,
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                //var myJSON = json.stringify(data);
                $scope.wavesnumber = data;
                var jsondata = JSON.stringify(data);

                //$scope.waves = JSON.stringify(JSON.parse(dat)[0].subWaveNames);

                waveNames = JSON.parse(jsondata)[0].subWaveNames.map(function (item) {
                    return item;
                });
                waveIds = JSON.parse(jsondata)[0].subWaveIds.map(function (item) {
                    return item;
                });

                $scope.jsonwaves = JSON.stringify(waveNames);

                for (i = 0; i < waveNames.length; i++) {
                    var wave = { 'id': waveIds[i], 'name': waveNames[i] }
                    $scope.waves.push(wave);

                }
            }
        });



        $scope.carouselItems = _groupItems($scope.waves, 40, 'name');
        for (var x = 0; x < $scope.carouselItems.length; x++) {

            $scope['grpupedItems_' + x] = _groupItems($scope.carouselItems[x], 10, 'name');
        }
        $scope.getGroupItem = function (index) {
            return $scope['grpupedItems_' + index];
        }

        function _groupItems(items, size, sort) {
            var grouped = [],
                index = 0;

            if (angular.isDefined(sort)) {
                $filter('orderBy')(items, sort);
            }

            for (var i = 0; i < items.length; i++) {
                if (angular.isUndefined(grouped[index])) {
                    grouped[index] = [];
                }

                grouped[index].push(items[i]);

                if ((i + 1) % size === 0) {
                    index++;
                }
            }

            return grouped;
        }
    }]);

// ------ Detect and restrict multiple tab in a browser ------ //
// ------ BEGIN ------//

var guid;
function register_tab_GUID() {
    //If it is the new request - clear the localStorage 
    try {
        if (newRequest == 1) {
            localStorage.removeItem('tabGUID_N');
        }

    } catch (e) {

    }
    if (window.location.href.indexOf('/CommonComponent/Error/DuplicateTab') == -1) {
        // detect local storage available
        if (typeof (Storage) !== "undefined") {
            // get (set if not) tab GUID and store in tab session
            if (window.name == "") window.name = tab_GUID();
            guid = window.name;
            if (check_dup_tabs(guid)) {
                close_tab();
            }
            else {
                localStorage["tabGUID_N"] = guid;
            }
        }
    }
}

function tab_GUID() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }
    
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4() + new Date().valueOf().toString();
}

function check_dup_tabs(guid) {
    var flag = false;
    if (localStorage["tabGUID_N"] != null && localStorage["tabGUID_N"] !== 'undefined' && guid != localStorage["tabGUID_N"]) {
        flag = true;
    }
    return flag;
}

function close_tab() {
    window.location = '/CommonComponent/Error/DuplicateTab';
}

window.onbeforeunload = removeStorage;
    function removeStorage(event) {
        if (check_dup_tabs(guid) == false) {
            localStorage.removeItem('tabGUID_N');
        }
}

register_tab_GUID();

// ------ END ------//

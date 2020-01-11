/* global FastClick, smoothScroll */
angular.module('moflow', ['ngSanitize',
                            'ngTouch',
                            'ngAnimate',
                            'ngRoute',
                            'kendo.directives', 'progressButton']);

//########################### ROUTING ##################################
angular.module('moflow').config(['$routeProvider', function ($routeProvider) {

    $routeProvider
      // Home
        //.when("/home", { templateUrl: "www/app/home/home.html", controller: ""})


        .when("/dmat", { templateUrl: 'www/app/dmat/dmat.html', controller: 'dmatController' })
        .when('/mob', { templateUrl: 'www/app/mob/mobilization-solution.html', controller: 'mobController' })
        .when('/projSetup', { templateUrl: 'www/app/projSetup/project-setup.html', controller: 'projSetupController' })

        .when("/home", { controller: "" })
        .when("/", { controller: '' })


      // create a 404
      .otherwise({ redirectTo: '/home' });
}]);



angular.module('moflow').controller('baseController', ['$http', '$compile', '$rootScope', '$scope', '$location', '$document',
    function ($http, $compile, $rootScope, $scope, $location, $document) {
        $('[data-toggle="tooltip"]').tooltip();
        $scope.mobSolStatus = ['Complete', 'Yet to start', 'In Progress'];

        $('.content-wrapper').scroll(function () {
            $("select").each(function () {
                $(this).data("kendoDropDownList").close();
            });
        });

        $rootScope.getLandingPage = function () {
            return $rootScope.moduleName + '/home.html';
        }

        $scope.$back = function () {
            window.history.back();
        };

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

        $rootScope.$on('$viewContentLoaded', function () {
        });
        $scope.GoToDashboard = function (s) {
            var s = s.trim();
            var p = document.getElementById("namepg");
            if (p.value == "WaveSetup" || p.value == "")
                window.location.href = "/WaveSetup/Home/Home?" + "subwaveName=" + s;
            if (p.value == "Handover")
                window.location.href = "/HandOverToOperation/HandOverOperations/Handover?" + "subwaveName=" + s;
            if (p.value == "Report")
                window.location.href = "/ProjectExecution/WaveReport/WaveReport?" + "subwaveName=" + s;
            if (p.value == "SubWaveExeDashboard") {
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

                    }
                });
                window.location.href = "/waveExecution/SubWaveHome/SubWaveHome/?" + "SubWaveId=" + sId;
            }
        }
        $scope.GoToReport = function (s) {
            var s = s.trim();
            if (s != "" || s != null) {
                var index = s.indexOf("(");
                if (index > 0) {
                    s = s.substring(0, index);
                }
            }
            var p = localStorage.getItem("redirectType");//document.getElementById("namepgR");
            if (p == undefined || p == null || p.value == "" || p.value == null) {
                $('#WaveDetailsModal').appendTo("body").modal('hide');
            }
            if (p == "Report")
                window.location.href = "/ProjectExecution/WaveReport/WaveReport?" + "subwaveName=" + s;
            if (p == "Handover") {
                window.location.href = "/HandOverToOperation/HandOverOperations/Handover?" + "subwaveName=" + s;
            }
            if (p == "WaveSetup") {
                window.location.href = "/WaveSetup/Home/Home?" + "subwaveName=" + s;
            }
            if (p == "Stabilization") {
                window.location.href = "/WaveExecution/BusinessExcellence/BusinessExcellence?" + "wave=" + s;
            }
            if (p == "SubWaveExeDashboard") {
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

                    }
                });
                window.location.href = "/waveExecution/SubWaveHome/SubWaveHome/?" + "SubWaveId=" + sId;
            }

        }
        $scope.GoToHandOver = function (s) {
            var s = s.trim();
            var p = document.getElementById("namepgH");
            if (p.value == "Handover")
                window.location.href = "/HandOverToOperation/HandOverOperations/Handover?" + "subwaveName=" + s;
        }
        $scope.RedirectStabilization = function () {
            window.location.href = "/WaveExecution/Stabilization/Stabilization/";
        }
        //$scope.wavesnumber = ["wave 1","wave 2","wave 3"];
        //$scope.subwavesnumber = ["subwave 1", "subwave 2", "subwave 3"];

        $rootScope.$on('$viewContentLoaded', function () {
            //$rootScope.isRouteLoading = true;
            //console.log('viewContentLoaded');

            // Required for headers interaction
            // and page animations
            $rootScope.$on('$viewContentLoaded', function () {
                /* this section moved to menu controller to make it more manageable
                $rootScope.showLeftMenu = true;
                if( $rootScope.Route == "mob-status" 
                    || $rootScope.Route == "projects" 
                    || $rootScope.Route == "createProject" 
                    || $rootScope.Route == "checklist") {
                        $rootScope.showLeftMenu = false;
                } 
                */
                $rootScope.showCreateProject = ($rootScope.Route == "projects");
                $rootScope.hideBlackHeader = ($rootScope.Route == "createProject");
                $rootScope.showSatisfaction = ($rootScope.Route == "details");

                if ($rootScope.moduleName == "dmat" && $rootScope.Route == "projects") {
                    $rootScope.showLanding = true;
                    $rootScope.dashboard = false;
                }
                else if ($rootScope.moduleName == "mob" && $rootScope.Route == "mob-status") {
                    $rootScope.showLanding = true;
                    $rootScope.dashboard = false;
                }
                else if ($rootScope.moduleName == "projSetup" && $rootScope.Route == "proj-setup") {
                    $rootScope.showLanding = true;
                    $rootScope.dashboard = false;
                }
                else if ($rootScope.moduleName == "waveSetup" && $rootScope.Route == "wave-setup") {
                    $rootScope.showLanding = true;
                    $rootScope.dashboard = false;
                }
                else if ($rootScope.moduleName == "execution" && $rootScope.Route == "execution") {
                    $rootScope.showLanding = true;
                    $rootScope.dashboard = true;
                }
                else if ($rootScope.moduleName == "projExecution" && $rootScope.Route == "proj-execution") {
                    $rootScope.showLanding = true;
                    $rootScope.dashboard = false;
                }
                else if ($rootScope.moduleName == "waveExecution" && $rootScope.Route == "wave-execution") {
                    $rootScope.showLanding = true;
                    $rootScope.dashboard = false;
                }
                else if ($rootScope.moduleName == "pmo" && $rootScope.Route == "pmo") {
                    $rootScope.showLanding = true;
                    $rootScope.dashboard = false;
                }
                else if ($rootScope.moduleName == "reports" && $rootScope.Route == "reports") {
                    $rootScope.showLanding = true;
                    $rootScope.dashboard = false;
                }
                else {
                    $rootScope.showLanding = false;
                    $rootScope.dashboard = false;
                }

            });

            // Required for scrollbar re calculations

        });

        // for shrinking headers
        $rootScope.shrinkHeader = function () {
            //$rootScope.shrinkBlackHeader = !$rootScope.shrinkBlackHeader;
            var body = angular.element($document[0].body);
            var cls = 'shrinked-header sbb';
            if (body.hasClass(cls)) body.removeClass(cls);
            else body.addClass(cls);
        };

        $scope.meccheklist = [
                {
                    id: 1,
                    title: 'Solution Plan'
                },
                {
                    id: 2,
                    title: 'Estimate Deal Economics'
                },
                {
                    id: 3,
                    title: 'Contract'
                },
                {
                    id: 4,
                    title: 'Client Dependecies & Obligations'
                },
                {
                    id: 5,
                    title: 'Due Diligence'
                },
                {
                    id: 6,
                    title: 'Leadership Staffing'
                },
                {
                    id: 7,
                    title: 'Risks & Issues'
                },
                {
                    id: 8,
                    title: 'Quality Assurance'
                },
                {
                    id: 9,
                    title: 'Mandatory Tools'
                },
                {
                    id: 10,
                    title: 'Client Data Protection'
                }
        ];

        /** Required for Left Menu */
        $rootScope.leftMenuItems = [
                    {
                        id: 1,
                        title: 'Solution Plan',
                        icon: 'fa fa-line-chart'
                    },
                    {
                        id: 2,
                        title: 'Estimate Deal Economics',
                        icon: 'acn-mobile-dollar'
                    },
                    {
                        id: 3,
                        title: 'Contract',
                        icon: 'fa fa-pencil-square-o'
                    },
                    {
                        id: 4,
                        title: 'Client Dependecies & Obligations',
                        icon: 'acn-circle-users-o'
                    },
                    {
                        id: 5,
                        title: 'Due Diligence',
                        icon: 'fa fa-eye-slash'
                    },
                    {
                        id: 6,
                        title: 'Leadership Staffing',
                        icon: 'acn-circle-user-o'
                    },
                    {
                        id: 7,
                        title: 'Risks & Issues',
                        icon: 'acn-offer'
                    },
                    {
                        id: 8,
                        title: 'Quality Assurance',
                        icon: 'acn-medal-empty-o'
                    },
                    {
                        id: 9,
                        title: 'Mandatory Tools',
                        icon: 'fa fa-cogs'
                    },
                    {
                        id: 10,
                        title: 'Client Data Protection',
                        icon: 'fa fa-file-archive-o'
                    }
        ];



        /*DMAT Checklist Open*/
        $scope.openDetails = function (id, text) {
            $location.url('/dmat/DMAT/details?id=' + id + '&title=' + text);
            $scope.getPath();
        };
        $scope.getPath = function () {
            var search = $location.search();
            $scope.itemId = search.id;
            $scope.itemTitle = search.title;
        };
        $scope.getPath();

        $scope.ReturntoDmatHome = function () {
            window.location.href = '/DMAT/Project/DMATHome/';

        }
        $scope.ReturntoMEC = function (fromMandatory) {
            var dealID = $('#hidDealId').val();
            if (fromMandatory == "Y") {
                window.location.href = '/DMAT/DMAT/Checklist?id=' + dealID + '&fromMandatoryfield=Y';
            }
            else {
                window.location.href = '/DMAT/DMAT/Checklist/' + dealID;
            }
        }

        $scope.RedirectGovDashBoard = function () {
            window.location.href = '/StageGate/StageGate/Dashboard';
        }

        $scope.RedirectControlFrameWork = function () {
            window.location.href = '/ControlFramework/ControlFramework/ControlFramework';
        }
        $scope.OpportunityId = $('#hidOppId').val();
        $scope.DealName = $('#hidDealName').val();
        $scope.PageName = $('#hidPageName').val();
        $scope.clientname = $('#hidClientName').val();
        //$.ajax({
        //    type: 'GET',
        //    async: false,
        //    cache: false,
        //    url: '/DMAT/DMAT/GetProjectDetail',
        //    data: { DealId: $('#hidDealId').val() },
        //    success: function (data, textStatus, XMLHttpRequest) {

        //        $scope.OpportunityId = data.OpportunityId;
        //        $scope.DealName = data.DealName;
        //        $scope.PageName = $('#hidPageName').val();
        //    }

        //})

        $scope.RedrtProject = function () {
            window.location.href = '/ProjectSetupOld/ProjectSetupOld/SummaryProjectHome/' + $('#hidDealId').val();
        }

        $scope.RedrctMobHome = function () {
            var s = false;
            var isDisabled = $('#uploadbtn').is(':disabled');
            if (isDisabled == true)
                alert("Upload Document is in progress. Please Wait!");

            var dealID = $('#hidDealId').val();
            window.location.href = '/ProjectSetup/MobilizationHome/SummaryMobilization/' + $('#hidDealId').val();


            //  window.location.href = '/ProjectSetup/MobilizationHome/SummaryMobilization/' + $('#hidDealId').val();
        }
        //$scope.RedirectWaveSetup = function () {
        //    setTimeout(function () {
        //        var s = document.getElementById("namepg");
        //        s.value = "WaveSetup";
        //        $('#waveModal').appendTo("body").modal('show');
        //    }, 0);
        //}

        //$scope.HandOverToOperations = function () {
        //    setTimeout(function () {
        //        var s = document.getElementById("namepgH");
        //        s.value = "Handover";
        //        $('#waveModalHand').appendTo("body").modal('show');
        //    }, 0);
        //}

        //$scope.RedirectWaveReport = function () {
        //    //debugger;
        //    setTimeout(function () {
        //        var s = document.getElementById("namepgR");
        //        s.value = "Report";
        //        $('#waveModalRep').appendTo("body").modal('show');
        //    }, 100);
        //}
        $scope.RedirectWaveReport = function (redirectType) {
            localStorage.setItem("redirectType", redirectType);
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



        //$scope.ExecutionModal = function () {
        //    //  debugger
        //    setTimeout(function () {
        //        $('#waveModal').appendTo("body").modal('show');
        //    }, 0);
        //}
        $scope.ProjectReports = function () {
            $('#imgMpp').show();
            $('#imgMppDiv').show();
            window.location.href = '/Report/ProjectReport/ProjectReport';
        }

        $scope.ProjUserAccess = function () {
            //$('#imgMpp').show();
            //$('#imgMppDiv').show();
            window.location.href = '/ProjectSetup/ProjUserAccess/ProjUserAccess';
        }
        $scope.QuickLinks = function () {
            //$('#imgMpp').show();
            //$('#imgMppDiv').show();
            window.location.href = '/WaveExecution/QuickLinks/QuickLinks';
        }
        $scope.WaveReports = function () {
            window.location.href = '/ProjectExecution/WaveReport/WaveReport';
        }
        $scope.RedrtPMOHome = function () {
            window.location.href = '/PMO/PMOHome/PMOHomePage/' + $('#hidDealId').val();
        }

        $scope.RedirecTExecutionDash = function () {
            window.location.href = '/WaveExecution/ExecutiveSnapShot/ExecutiveSnapShot?DealId=' + $('#hidDealId').val();
        }
        $scope.RedirectToProjectStaffing = function () {
            window.location.href = '/ProjectSetup/CoreTeam/ActualStaffing?DealId=' + $('#hidDealId').val();
        }
        $scope.RedirectToDealExecution = function () {
            window.location.href = '/ProjectExecution/DealExecution/DealExecution#/';
        }
        $scope.RedirecTClientScreen = function () {
            window.location.href = '/WaveExecution/ExecutiveSnapShot/ProjectSnapShot?DealId=' + $('#hidDealId').val();
        }
        $scope.RedirectSourcingMetrics = function () {
            window.location.href = '/ProjectExecution/SourcingMetrics/SourcingMetrics#/';
        }

        $scope.RedirectWaveDashboard = function () {
            window.location.href = '/WaveSetup/Home/Home?subwaveName=' + $('#hidSubwaveName').val();
        };
        $scope.RedirectProjectPlan = function () {
            window.location.href = '/projectexecution/projectplan/projectplan';
        };
        $scope.RedirectHandOverOperations = function () {
            window.location.href = '/HandoverToOperation/OpenItem/OpenItems#/' + $('#hidSubwaveName').val();
        };

        $scope.RedirectPMOmeeting = function () {
            window.location.href = '/PMO/MinutesOfMeetingDetails/Meeting#/' + $('#hidDealId').val();
        };

        $scope.RedirectProjectlogs = function () {
            window.location.href = '/PMO/PMOLogs/PMO#/' + $('#hidDealId').val();
        };

        $scope.RedirectChange = function () {
            window.location.href = '/PMO/ChangeLog/Change#/';
        };

        $scope.RedirectContractualmang = function () {
            window.location.href = '/PMO/ContractualManagement/Index#/' + $('#hidDealId').val();
        };

        $scope.RedirectFinanceMang = function () {
            window.location.href = '/ProjectExecution/BudgetTracker/BudgetTracker#/' + $('#hidDealId').val();
        };
    }]);

angular.module('moflow').controller('leftMenuController', ['$rootScope', '$scope', '$location',
        function ($rootScope, $scope, $location) {

            window.setTimeout(function () {
                $('.left-tooltip-bar  [data-toggle="tooltip"]').tooltip({
                    'placement': 'right',
                    'container': 'body',
                    'template': '<div class="tooltip lef-bar-menu" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
                });
            }, 2000);

            // required for making menu

            //** SECTION: MENU SHOW HIDE
            //TODO: a better & extendable logic needed  
            // for showing hiding left menu
            var showMenu = function () {
                if ($rootScope.Route == "mob-status"
                            || $rootScope.Route == "projects"
                            || $rootScope.Route == "createProject"
                            || $rootScope.Route == "checklist"
                            || $rootScope.Route == "proj-setup") {
                    $rootScope.showLeftMenu = false;
                }
                $rootScope.showLeftMenu = true;
            }
            $rootScope.$on('$viewContentLoaded', function () {
                showMenu(); // for each view change
            });
            showMenu(); // for the first call
            //** END SECTION
            var isalert;
            $scope.checkActive = null;
            // to make selected menu item active
            $scope.GetActive = function (id, href) {
                if (href.indexOf("/CommonComponent/") > -1) {
                    if (GetProjectExActive(id)) {
                        return 'active';
                    }
                }


                if ((href.indexOf("/projectexecution/") > -1) || (href.indexOf("/ProjectExecution/") > -1)) {
                    if (GetprojectexecutionActive(id)) {
                        return 'active';
                    }
                }

                if (href.indexOf("/WaveSetup/") > -1) {
                    if (GetWaveSetupActive(id)) {
                        return 'active';
                    }
                }
                if (href.indexOf("/waveExecution/") > -1) {
                    if (GetwaveExecutionActive(id)) {
                        return 'active';
                    }
                }
                if ($location.search().id == id) {
                    if ((href.indexOf("ProjectSetup") > -1)) {
                    }
                    return 'active';
                }
                else {
                    return '';
                }
            }


            $scope.mobMenuItems = [{
                id: 0,
                title: 'Project Setup',
                icon: 'acn-menu-squares-condensed',
                href: '/ProjectSetup/MobilizationHome/SummaryMobilization/' + $('#hidDealId').val()
            }, {
                id: 1,
                title: 'Deal Information',
                icon: 'icon-dealSetup',
                href: '/ProjectSetup/Deal/Index/#/?id=1'
            },
       {
           id: 2,
           title: 'Transition Plan',
           icon: 'icon-transitionPlan',
           href: '/ProjectSetup/ProjectSetup/ProjectSetup/#/?id=2'
       },
       {
           id: 3,
           title: 'Project Staffing',
           icon: 'icon-solutionTeam',
           href: '/ProjectSetup/Staffing/Staffing/#/?id=3'
       },
       {
           id: 4,
           title: 'MEC Checklist',
           icon: 'icon-mecChecklist',
           href: '/ProjectSetup/ProjectSetup/MECPage/#/?id=4'
       },
       //{
       //    id: 5,
       //    title: 'Technology Setup',
       //    icon: 'icon-technologySupport',
       //    href: '/ProjectSetup/ProjectSetup/Technology/#/?id=5'
       //},
       //{
       //    id: 6,
       //    title: 'Workplace Setup',
       //    icon: 'icon-WorkplaceSolution',
       //    href: '/ProjectSetup/WorkplaceSetup/WorkPlaceSetUp/#/?id=6'
       //},
       {
           id: 7,
           title: 'Project Artifacts',
           icon: 'acn-upload-cloud-o',
           href: '/ProjectSetup/RisksandAssumptions/UploadDocuments/#/?id=7'
       },
         {
             id: 8,
             title: 'Project Plan',
             icon: 'icon-dealSetup',
             href: '/ProjectSetup/DetailedPlan/Index/#/'
         }
            ];

            $scope.projSetupMenuItems = [
      {
          id: 0,
          title: 'Dashboard',
          icon: 'acn-menu-squares-condensed',
          href: '/ProjectSetupOld/ProjectSetupOld/SummaryProjectHome/' + $('#hidDealId').val()
      },
      {
          id: 1,
          title: 'Transition Plan',
          icon: 'icon-transitionPlan',
          href: '/ProjectSetupOld/ProjectSetupOld/ProjectSetupOld/#/?id=1'
      },
      {
          id: 2,
          title: 'Staffing',
          icon: 'icon-solutionTeam',
          href: '/ProjectSetupOld/Staffing/Staffing/#/?id=2'

      },

      {
          id: 3,
          title: 'MEC',
          icon: 'icon-mecChecklist',
          href: '/ProjectSetupOld/ProjectSetupOld/MECPage/#/?id=3'
      },
      {
          id: 4,
          title: 'Technology Setup',
          icon: 'icon-technologySupport',
          href: '/ProjectSetupOld/TechnologySetup/Technology/#/?id=4'
      },
      {
          id: 5,
          title: 'Workplace Setup',
          icon: 'icon-WorkplaceSolution',
          href: '/ProjectSetupOld/WorkplaceSetup/WorkplaceSetup/#/?id=5'
      }
            ];

            var projExeMenuItems;
            if (document.getElementById("projExe") != null) {
                $.ajax({
                    url: '/CommonComponent/CommonComponent/GetProjExecutionMenuItems',
                    traditional: true,
                    type: 'POST',
                    datatype: 'json',
                    async: false,
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        projExeMenuItems = data;
                    }
                });
            }

            $scope.projExecutionMenuItems = projExeMenuItems;

            $scope.projPlanMenuItems = [
            {
                id: 0,
                title: 'Dashboard',
                icon: 'acn-menu-squares-condensed',
                href: '/WaveExecution/ExecutiveSnapShot/ExecutiveSnapShot?DealId=' + $('#hidDealId').val()
            },
            {
                id: 1,
                title: 'Project Plan',
                icon: 'icon-projectPlan',
                href: '/projectexecution/projectplan/projectplan'
            }
            //{
            //    id: 2,
            //    title: 'Sourcing Metrics',
            //    icon: 'icon-SourcingMetrics',
            //    href: '/ProjectExecution/SourcingMetrics/SourcingMetrics'
            //}

            ];

            var waveSetupMenuItems;
            if (document.getElementById("waveSetup") != null) {
                $.ajax({
                    url: '/WaveSetup/Home/GetWaveSetupMenuItems',
                    traditional: true,
                    type: 'POST',
                    datatype: 'json',
                    async: false,
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        waveSetupMenuItems = data;
                    }
                });
            }
            $scope.waveSetupMenuItems = waveSetupMenuItems;
            //$scope.waveSetupMenuItems = [
            //    {
            //        id: 0,
            //        title: 'Dashboard',
            //        icon: 'acn-menu-squares-condensed',
            //        href: '/WaveSetup/Home/Home?subwaveName=' + $('#hidSubwaveName').val()
            //    },
            //    {
            //        id: 1,
            //        title: 'Technology Setup',
            //        icon: 'icon-technologySupport',
            //        href: '/WaveSetup/WaveSetup/TechnolgySetup'
            //    },
            //    {
            //        id: 2,
            //        title: 'Knowledge Transfer Planning',
            //        icon: 'icon-KnowledgeTransfer',
            //        href: '/WaveSetup/WaveSetup/KTPlaning'
            //    },
            //    {
            //        id: 3,
            //        title: 'Onshore Knowledge Transfer',
            //        icon: 'icon-KnowledgeTransferOnshore',
            //        href: '/WaveSetup/WaveSetup/OnshoreKT'
            //    },
            //    {
            //        id: 4,
            //        title: 'Offshore Knowledge Transfer',
            //        icon: 'icon-KnowledgeTransferOffshore',
            //        href: '/WaveSetup/WaveSetup/OffshoreKT'
            //    },
            //    {
            //        id: 5,
            //        title: 'Self Rehersal Testing',
            //        icon: 'icon-SelfRehersalTesting',
            //        href: '/WaveSetup/WaveSetup/SRT'
            //    }
            //];

            $scope.pmoMenuItems = [
        //{
        //    id: 0,
        //    title: 'Dashboard',
        //    icon: 'acn-menu-squares-condensed',
        //    href: '/PMO/PMOHome/PMOHomePage/' + $('#hidDealId').val()
        //},
        {
            id: 1,
            title: 'Meetings',
            icon: 'icon-meeting',
            href: '/PMO/MinutesOfMeetingDetails/Meeting/#/?id=1'
        },
        {
            id: 2,
            title: 'Project Logs',
            icon: 'icon-projectLog',
            href: '/PMO/PMOLogs/PMO/#/?id=2'
        },
        {
            id: 3,
            title: 'Change Management',
            icon: 'icon-projectLog',
            href: '/PMO/ChangeLog/Change/#/?id=3'
        },
        {
            id: 4,
            title: 'Contractual Management',
            icon: 'icon-ContractualManagement',
            href: '/PMO/ContractualManagement/Index/#/?id=4'
        },
        {
            id: 5,
            title: 'Finance Management',
            icon: 'icon-ImplementFinancialManagement',
            href: '/ProjectExecution/BudgetTracker/BudgetTracker/#/?id=5',
        }
            ];
            var waveExecutionMenuItems;
            if (document.getElementById("waveExe") != null) {
                $.ajax({
                    url: '/WaveSetup/Home/GetWaveExecutionMenuItems',
                    traditional: true,
                    type: 'POST',
                    datatype: 'json',
                    async: false,
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        waveExecutionMenuItems = data;
                    }
                });
            }
            $scope.waveExecutionMenuItems = waveExecutionMenuItems;
            //$scope.waveExecutionMenuItems = [
            //   {
            //       id: 0,
            //       title: 'Dashboard',
            //       icon: 'acn-menu-squares-condensed',
            //       href: '/waveExecution/SubWaveHome/SubWaveHome?SubWaveId=' + $('#hidSubwaveId').val()
            //   },
            //   {
            //       id: 1,
            //       title: 'Enable People',
            //       icon: 'icon-enablePeople',
            //       href: '/waveExecution/waveExecution/enablePeople?subwaveId=' + $('#hidSubwaveId').val() + '&workstreamId=' + $('#hidWorkStreamId').val()
            //   },
            //   {
            //       id: 2,
            //       title: 'Transfer Knowledge',
            //       icon: 'icon-transferKnowledge',
            //       href: '/waveExecution/waveExecution/TransferKnowledge?subwaveId=' + $('#hidSubwaveId').val() + '&workstreamId=' + $('#hidWorkStreamId').val()
            //   },
            //   {
            //       id: 3,
            //       title: 'Implement Technology',
            //       icon: 'icon-implementTechnology',
            //       href: '/waveExecution/waveExecution/ImplementTechnology?subwaveId=' + $('#hidSubwaveId').val() + '&workstreamId=' + $('#hidWorkStreamId').val()
            //   },
            //   {
            //       id: 4,
            //       title: 'Implement Delivery Operations',
            //       icon: 'icon-ImplementDeliveryOperations',
            //       href: '/waveExecution/waveExecution/DeliveryOperation?subwaveId=' + $('#hidSubwaveId').val() + '&workstreamId=' + $('#hidWorkStreamId').val()
            //   }

            //];

        }]);
angular.module('moflow').directive('leftMenu', function () {

    return {
        restrict: 'EA',
        template: '<div id="leftMenuContainer">' +
      '<div id="leftMenuControl" class="left-bar  " ng-class="{\'show\': showLeftMenu, \'left-tooltip-bar\': showTooltip, \'hover-expand\': showExpanded}">' +
         ' <ul> <li ng-repeat="item in menuItems" ng-class="GetActive(\'{{item.id}}\',\'{{item.href}}\')">' +
             ' <a href=\"{{item.href}}\" aria-title=\"{{item.title}}\"> ' +
       ' <span>{{item.title}}</span><i class=\"{{item.icon}}\" data-toggle=\"tooltip\" title=\"{{item.title}}\"></i> </a>' +
       '</li></ul></div></div>',
        controller: 'leftMenuController',
        replace: true,
        link: function (scope, element, attributes) {

            var source = attributes['menuSource'];
            scope.menuItems = scope[source]; //setting data source from html to controller scope
            scope.showTooltip = (attributes['showTooltip'] == "true"); // initiating bootstrap tooltip 
            scope.showExpanded = (attributes['hoverExpand'] == "true"); // expandable menu 



        }
    }
});


$(document).ready(function () {
    var whwdw = $(window).height() - 27;
    var prcmp = $('.hdr').height() + $('.title-cntnt').height() + $('.footer').height();
    var newHeight = whwdw - prcmp;
    $('.nano').css("height", newHeight);

    var whwdw1 = $(window).height() - 17;
    var prcmp1 = $('.bgdmat').height() + $('.footer').height() + $('.bstr').height();
    var newHeight1 = whwdw1 - prcmp1;
    $('#dmatctrl').find('.nano').css("height", newHeight1);

    var whwdw2 = $(window).height();
    var prcmp2 = $('.hdr').height() + $('.footer').height();
    var newHeight2 = whwdw2 - prcmp2;
    $('#nano3').find('.nano').css("height", newHeight2);

    var whwdw3 = $(window).height() - 102;
    var prcmp3 = $('.bgdmat').height() + $('.footer').height() + $('.bstr').height();
    var newHeight3 = whwdw3 - prcmp3;
    $('#dmatctrl1').find('.nano').css("height", newHeight3);

    var windwHeight = $(window).height() - 50;
    var remHeight = $('.hdr').height() + $('.title-cntnt').height() + $('.ttle-hdr').height() + $('.footer').height() + $('.k-grid-header').height() + $('.btnhgt').height() + 30;
    var desiredHeight = windwHeight - remHeight;
    $('.ctrlfwkid').find('.k-grid-content').css("max-height", desiredHeight);


    $('#leftMenuContainer').next('section').find('.container').addClass('newcnt');
    //$('#dealttip input').mouseover(function () {
    //    $(this).attr('title', $(this).val())
    //});

    $('#dealttip input').mouseover(function () {
        if ($(this).attr('title') == null || $(this).attr('title') == undefined || $(this).attr('title') == '')
            $(this).attr('title', $(this).val())
    });

    $('#dealttip textarea').mouseover(function () {
        $(this).attr('title', $(this).val())
    });


    $('ul.dropdown-menu [data-toggle=dropdown]').on('click', function (event) {
        // Avoid following the href location when clicking
        event.preventDefault();
        // Avoid having the menu to close when clicking
        event.stopPropagation();
        // If a menu is already open we close it
        $('ul.dropdown-menu [data-toggle=dropdown]').parent().removeClass('open');
        // opening the one you clicked on
        $(this).parent().addClass('open');
    });


});


function showMessagePopUp(msgcontent) {
    //debugger;
    document.getElementById('divpopupMessagecontent').innerHTML = msgcontent;
    $('#divpopupMessageControl').modal('show');
}
function showMessagePopUpOpenItem(msgcontent) {
    //debugger;
    document.getElementById('divpopupMessagecontentopenitem').innerHTML = msgcontent;
    $('#divpopupMessageControlopenitem').modal('show');
}
function GetProjectExActive(id) {
    if (id == 1 && (window.location.href.indexOf("Manage%20Mobilization") > -1 || window.location.href.indexOf("Manage Mobilization") > -1)) {
        return true;
    }
    else if (id == 2 && (window.location.href.indexOf("Engagement%20Management") > -1 || window.location.href.indexOf("Engagement Management") > -1)) {
        return true;
    }
    else if (id == 3 && (window.location.href.indexOf("Service%20Management") > -1 || window.location.href.indexOf("Service Management") > -1)) {
        return true;
    }
    else if (id == 4 && (window.location.href.indexOf("Journey%20Management") > -1 || window.location.href.indexOf("Journey Management") > -1)) {
        return true;
    }
    else if (id == 5 && (window.location.href.indexOf("userAddedWsId=" + id) > -1)) {
        return true;
    }
    else if (id == 6 && (window.location.href.indexOf("userAddedWsId=" + id) > -1)) {
        return true;
    }
    else if (id == 7 && (window.location.href.indexOf("userAddedWsId=" + id) > -1)) {
        return true;
    }
    else if (id == 8 && (window.location.href.indexOf("userAddedWsId=" + id) > -1)) {
        return true;
    }
    else if (id == 9 && (window.location.href.indexOf("userAddedWsId=" + id) > -1)) {
        return true;
    }
    else if (id == 10 && (window.location.href.indexOf("userAddedWsId=" + id) > -1)) {
        return true;
    }
    else {
        return false;
    }
}

function GetWaveSetupActive(id) {
    if (id == 0 && (window.location.href.indexOf("/WaveSetup/Home") > -1)) {
        return true;
    }
    if (id == 1 && (window.location.href.indexOf("WaveSetup/TechnolgySetup") > -1)) {
        return true;
    }
    else if (id == 2 && (window.location.href.indexOf("WaveSetup/KTPlaning") > -1)) {
        return true;
    }
    else if (id == 3 && (window.location.href.indexOf("WaveSetup/OnshoreKT") > -1)) {
        return true;
    }
    else if (id == 4 && (window.location.href.indexOf("WaveSetup/OffshoreKT") > -1)) {
        return true;
    }
    else if (id == 5 && (window.location.href.indexOf("WaveSetup/SRT") > -1)) {
        return true;
    }
    else {
        return false;
    }
}

function GetprojectexecutionActive(id) {
    if (id == 1 && (window.location.href.indexOf("/projectexecution/projectplan") > -1)) {
        return true;
    }
    else if (id == 2 && (window.location.href.indexOf("/ProjectExecution/SourcingMetrics") > -1 || window.location.href.indexOf("projectexecution/sourcingmetrics") > -1)) {
        return true;
    }
    else {
        return false;
    }
}

function GetwaveExecutionActive(id) {
    if (id == 0 && (window.location.href.indexOf("/waveExecution/SubWaveHome") > -1)) {
        return true;
    }
    if (id == 1 && (window.location.href.indexOf("waveExecution/enablePeople") > -1 || window.location.href.indexOf("WaveExecution//EnablePeople") > -1)) {
        return true;
    }
    else if (id == 2 && (window.location.href.indexOf("waveExecution/TransferKnowledge") > -1 || window.location.href.indexOf("WaveExecution//TransferKnowledge") > -1)) {
        return true;
    }
    else if (id == 3 && (window.location.href.indexOf("waveExecution/DeliveryTeamTraining") > -1 || window.location.href.indexOf("WaveExecution//DeliveryTeamTraining") > -1)) {
        return true;
    }
    else if (id == 4 && (window.location.href.indexOf("waveExecution/ImplementTechnology") > -1 || window.location.href.indexOf("WaveExecution//ImplementTechnology") > -1)) {
        return true;
    }
    else if (id == 5 && (window.location.href.indexOf("waveExecution/DeliveryOperation") > -1 || window.location.href.indexOf("WaveExecution//DeliveryOperation") > -1)) {
        return true;
    }
}

var sessionTimeoutWarning = 15;
var sessionTimeout = 20;
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

        $("#divpopupMessageControl").on('hidden.bs.modal', function (e) {
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

function openTermsOfUsefunc() {
    showMessagePopUp("Terms of Use </br> </br> </br> Your access to and use of this site is subject to the following terms and conditions and all applicable laws. By accessing and using this site, you accept the following terms and conditions, without limitation or qualification. </br> The information provided on this site is free of charge and for informational purposes and internal use only. Unless otherwise stated, the contents of this site including, but not limited to, the text and images contained herein and their arrangement are the property of Accenture. All trademarks used or referred to in this website are the property of their respective owners. </br> Nothing contained in this site shall be construed as conferring by implication, estoppel, or otherwise, any license or right to any copyright, patent, trademark or other proprietary interest of Accenture or any third party. This site and the content provided in this site, including, but not limited to, graphic images, audio, video, html code, buttons, and text, may not be copied, reproduced, republished, uploaded, posted, transmitted, or distributed in any way, without the prior written consent of Accenture, except that you may download, display, and print one copy of the materials on any single computer solely for your personal, non-commercial use, provided that you do not modify the material in any way and you keep intact all copyright, trademark, and other proprietary notices. </br> Links on this site may lead to services or sites not operated by Accenture. No judgment or warranty is made with respect to such other services or sites and Accenture takes no responsibility for such other sites or services. A link to another site or service is not an endorsement of that site or service. Any use you make of the information provided on this site, or any site or service linked to by this site, is at your own risk. </br> This site and its contents are provided “as is” and Accenture makes no representation or warranty of any kind with respect to this site or any site or service accessible through this site. Accenture expressly disclaims all express and implied warranties including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, title, and non-infringement. In no event will Accenture be liable to any party for any direct, indirect, incidental, special, exemplary, consequential, or other damages (including, but not limited to, lost profits, business interruption, loss of programs or data) without regard to the form of action and whether in contract, tort, negligence, strict liability, or otherwise, arising out of or in connection with this site, any content on or accessed through this site or any site service linked to, or any copying, displaying, or use thereof. </br> Accenture maintains this site in Illinois, U.S.A. and you agree that these terms of use and any legal action or proceeding relating to this site shall be governed by the laws of the State of Illinois without reference to its choice of law rules. If you attempt to bring any legal proceedings against Accenture you specifically acknowledge that Accenture is free to choose the jurisdiction of our preference as to where such action against us may be held. As you have agreed by using this site to choose the laws of the State of Illinois to govern any such proceedings, we will probably choose to defend any such action in Illinois and we can make this decision entirely as it suits us, without regard to where in the world you are located, or from where in the world you visited this site.</br> You are responsible for complying with the laws of the jurisdiction from which you are accessing this site and you agree that you will not access or use the information on this site in violation of such laws. Unless expressly stated otherwise herein, any information submitted by you through this site shall be deemed non-confidential and non-proprietary. You represent that you have the lawful right to submit such information and agree that you will not submit any information unless you are legally entitled to do so. Because of the open nature of the Internet, we recommend that you not submit information you consider confidential.");
}
function formatNewLineString(stringValue) {
    stringValue = stringValue.replace(/\n\r?/g, '<br />');
    stringValue = stringValue.replace(/["']/g, '');
    return stringValue.replace(/\t\r?/g, '&emsp;');
}

(function ($) {
    function debounce(callback, delay) {
        var self = this, timeout, _arguments;
        return function () {
            _arguments = Array.prototype.slice.call(arguments, 0),
            timeout = clearTimeout(timeout, _arguments),
            timeout = setTimeout(function () {
                callback.apply(self, _arguments);
                timeout = 0;
            }, delay);

            return this;
        };
    }

    $.extend($.fn, {
        debounce: function (event, callback, delay) {
            this.bind(event, debounce.apply(this, [callback, delay]));
        }
    });
})(jQuery);
$(function () {
    global_submenu_pos = -1;

    window.setTimeout(function () {
        //$('[data-toggle="tooltip"]').tooltip();
        var scrollEnd = false;


        //To show footer when scroll to bottom


        $('[data-toggle="tooltipMessage"]').tooltip({
            template: '<div class="tooltip tooltip-message" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
        });

    }, 100);

});

angular.module('moflow')
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
});
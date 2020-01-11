import { Component, OnInit } from "@angular/core";
import { DealInformationService } from "./../../deal-information/deal-information.service";
import { HttpClient } from "@angular/common/http";
import { anyChanged } from "@progress/kendo-angular-common";
import { FormGroup, FormControl, Validator, Validators, FormBuilder } from "@angular/forms";

@Component({
	selector: "rebar-deal-information-setup",
	templateUrl: "./deal-information-setup.component.html",
	styleUrls: ["./deal-information-setup.component.css"]
})
export class DealInformationSetupComponent implements OnInit {
	errorMessage = "";
	// Dropdowns Variables
	DEALTYPEOptions: any;
	BCPTypeOptions: any;
	BCPLevelOptions: any;
	DEALSTATUSOptions: any;
	yesnoOptions: any;
	HMLOptions: any;
	// DealData variables
	DealDetail: any;
	DealInformation: any;
	OpportunityInformation: any;
	MMSDetails: any;
	SGFinancial: any;
	SWBBPO: any;
	SWBIO: any;
	SWBIC: any;
	OpportunityTimeline: any;
	ClientBackground: any;
	ThirdPartyInvolvement: any;
	TechAttributes: any;
	OpportunityBPODocumentDetails: any;
	WatchListDetails: any;
	crossGSDetails: any;
	solutionDetails: any;
	rotatingSolutionStack: any;
	rotatingNewCommercialFinancial: any;
	rotatingNewDelivery: any;
	rotatingSolutionMaturityIndex: any;
	dueDiligence: any;
	DealReportInformation: any;
	test: any;
	dealId;
	accessCodes: any;
	form: FormGroup;

	constructor(private DealInformationService: DealInformationService, private formBuilder: FormBuilder) {}

	ngOnInit() {
		this.dealId = 2;
		this.accessCodes = "R";
		this.DealDetail = "";
		this.DealInformation = {};
		this.OpportunityInformation = "";
		this.MMSDetails = "";
		this.SGFinancial = "";
		this.SWBBPO = "";
		this.SWBIO = "";
		this.SWBIC = "";
		this.OpportunityTimeline = "";
		this.ClientBackground = "";
		this.ThirdPartyInvolvement = "";
		this.TechAttributes = "";
		this.OpportunityBPODocumentDetails = "";
		this.WatchListDetails = "";
		this.crossGSDetails = "";
		this.solutionDetails = "";
		this.rotatingSolutionStack = "";
		this.rotatingNewCommercialFinancial = "";
		this.rotatingNewDelivery = "";
		this.rotatingSolutionMaturityIndex = "";
		this.dueDiligence = "";
		this.DealReportInformation = "";

		this.form = this.formBuilder.group({
			MMSID: ["", Validators.compose([Validators.required])],
			DEALTYPE: ["", [Validators.required]],
			text: ["", [Validators.required]]
		});

		//Dropdowns Binding
		this.DEALTYPEOptions = [];
		// this.DealInformationService.getDealDropdownOptions().subscribe((res: any) => {
		// 	this.DEALTYPEOptions = res.DEALTYPEOptions;
		// });
		this.BCPTypeOptions = [];
		this.DealInformationService.getDealDropdownOptions().subscribe((res: any) => {
			this.BCPTypeOptions = res.BCPTypeOptions;
		});
		this.BCPLevelOptions = [];
		this.DealInformationService.getDealDropdownOptions().subscribe((res: any) => {
			this.BCPLevelOptions = res.BCPLevelOptions;
		});
		this.DEALSTATUSOptions = [];
		this.DealInformationService.getDealDropdownOptions().subscribe((res: any) => {
			this.DEALSTATUSOptions = res.DEALSTATUSOptions;
		});

		this.yesnoOptions = [];
		this.DealInformationService.getDealDropdownOptions().subscribe((res: any) => {
			this.yesnoOptions = res.yesnoOptions;
		});

		this.HMLOptions = [];
		this.DealInformationService.getDealDropdownOptions().subscribe((res: any) => {
			this.HMLOptions = res.HMLOptions;
		});

		// Form Binding
		// this.DealInformationService.GetDealSetup(
		//   this.dealId,
		//   this.accessCodes
		// ).subscribe((res: any) => {
		// this.form.patchValue({
		//   MMSID: res.DealInformation.MMSID,
		// DEALTYPE:res.DealInfo.DEALTYPE
		// })
		//   console.log(res);
		//   this.DealDetail = res.DealDetail;
		//   this.DealInformation = res.DealInformation;
		//   this.OpportunityInformation = res.OpportunityInformation;
		//   this.MMSDetails = res.MMSDetails;
		//   this.SGFinancial = res.SGFinancial;
		//   this.SWBBPO = res.SWBBPO;
		//   this.SWBIO = res.SWBIO;
		//   this.SWBIC = res.SWBIC;
		//   this.OpportunityTimeline = res.OpportunityTimeline;
		//   this.ClientBackground = res.ClientBackground;
		//   this.ThirdPartyInvolvement = res.ThirdPartyInvolvement;
		//   this.TechAttributes = res.TechAttributes;
		//   this.OpportunityBPODocumentDetails = res.OpportunityBPODocumentDetails;
		//   this.WatchListDetails = res.WatchListDetails;
		//   this.crossGSDetails = res.crossGSDetails;
		//   this.solutionDetails = res.solutionDetails;
		//   this.rotatingSolutionStack = res.rotatingSolutionStack;
		//   this.rotatingNewCommercialFinancial = res.rotatingNewCommercialFinancial;
		//   this.rotatingNewDelivery = res.rotatingNewDelivery;
		//   this.rotatingSolutionMaturityIndex = res.rotatingSolutionMaturityIndex;
		//   this.dueDiligence = res.dueDiligence;
		//   this.DealReportInformation = res.DealReportInformation;
		//   // this.payload.MMSID = res.DealInfo.MMSID;
		//   // this.payload.DEALNM = res.DealInfo.DEALNM;
		//   // this.payload.CLIENTNM = res.DealInfo.CLIENTNM;
		//   // this.payload.DEALTYPE = res.DealInfo.DEALTYPE;
		//   // this.payload.DEALSTATUS = res.DealInfo.DEALSTATUS;
		//   // this.payload.THIRDPARTYDEPENDENCY = res.DealInfo.THIRDPARTYDEPENDENCY;
		//   // this.payload.ClientDataProtnRiskScore =
		//   //   res.DealInfo.ClientDataProtnRiskScore;
		//   // this.payload.IMPControlsPlanned = res.DealInfo.IMPControlsPlanned;
		//   // this.payload.HREInd = res.DealInfo.HREInd;
		//   // this.payload.HANDOVERSTATUS = res.DealInfo.HANDOVERSTATUS;
		//   // this.payload.VMMScope = res.DealInfo.VMMScope;
		//   // this.payload.FoxtrotControl = res.DealInfo.FoxtrotControl;
		// });

		//Subscribing DealVar and concatenating this component fields's objects to be saved
		this.DealInformationService.DealVar$.subscribe((res: any) => {
			if (res == "info") {
				this.ValidateDealSetup();
			}
		});
	}

	ValidateDealSetup() {
		// if (this.form.valid) {
		// 	console.log(this.form.value);
		// } else {
		// 	// showerror
		// }
		const dealInfoData = {
			DEALSTATUS: this.DealInformation.DEALSTATUS,
			TRANSITIONENDDT: this.DealDetail.TRANSITIONSTARTDT,
			DEALTYPE: this.DealInformation.DEALTYPE,
			DEALSOURCE: this.DealInformation.DEALSOURCE,
			SDOLead: this.DealInformation.SDOLead,
			ClientAccountLead: this.DealInformation.ClientAccountLead,
			PrimaryDL: this.DealInformation.PrimaryDL,
			WeeklyStatusURL: "",
			//this.DealInformation.WeeklyStatusURL;
			TransitionWBSe: this.DealInformation.TransitionWBSe,
			BCPType: this.DealInformation.BCPType,
			BCPLevel: this.DealInformation.BCPLevel,
			ClientDataProtnRiskScore: this.DealInformation.ClientDataProtnRiskScore,
			CDPRiskAssessApproved: this.DealInformation.CDPRiskAssessApproved,
			ApprovedBy: this.DealInformation.ApprovedBy,
			DealComplexity: this.DealInformation.DealComplexity,
			TotalBPOFTE: this.DealInformation.TotalBPOFTE,
			TotalIOFTE: this.DealInformation.TotalIOFTE,
			//IMPClientProjectControls: IMPClientProjectControls,
			IMPControlsPlanned: this.DealInformation.IMPControlsPlanned,
			MasterContractNumber: this.DealInformation.MasterContractNumber,
			SingleAccountabilityTransitionLead: this.DealInformation.SingleAccountabilityTransitionLead
		};
		const dealDetailData = {
			THIRDPARTYDEPENDENCY: this.DealDetail.THIRDPARTYDEPENDENCY,
			ContractedTCV: this.DealDetail.contractedTCV, //THIRDPARTYADVISORCOMMENTDESC: THIRDPARTYADVISORCOMMENTDESC,
			HANDOVERSTATUS: this.DealDetail.HANDOVERSTATUS,
			PSRStatus: this.DealDetail.PSRStatus,
			DEXStatus: this.DealDetail.DEXStatus,
			TRANSITIONSTARTDT: this.DealDetail.transtionStartDT,
			// LOI: LOIDate, //ContractDate: contractSignDt, BGCLevel: BGCLEVEL,
			CircleUrl: this.DealDetail.circleURL,
			SharePointUrl: this.DealDetail.sharepointURL,
			HREInd: this.DealDetail.HREInd,
			CTVDeal: "",
			VMMScope: this.DealDetail.VMMScope,
			FoxtrotControl: this.DealDetail.FoxtrotControl,
			CommentsVMMFoxtrot: this.DealDetail.CommentsVMMFoxtrot
		};

		const watchListDetailData = {
			WatchListInd: "",
			WatchListLevel: "",
			IssueType: "",
			StatusUpdate: "",
			TargetWatchList: "",
			WchLstExitCriteria: "",
			Notes: "",
			Issue: "",
			ActionDeal: ""
		};

		this.DealInformationService.DealSetup = {
			data1: dealInfoData,
			data2: dealDetailData,
			data3: watchListDetailData
		};

		//Some validations need to be added in this dealReportingInfoJSON
		// const dealReportingInfoData = {
		// 	CTVDeal: "",
		// 	// this.DealReportInformation.CTVDeal;
		// 	DealExclusion: this.DealReportInformation.DealExclusion,
		// 	DealSaving: this.DealReportInformation.DealSaving,
		// 	DealSavingApprovedDate: this.DealReportInformation.DealSavingApprovedDate,
		// 	GlobalCustomerName: this.DealReportInformation.GlobalCustomerName
		// };

		this.DealInformationService.changeTest("reporting");

		// SaveDealSetupData(dealDetailData,dealInfoData,watchListDetailData,dealReportingInfoData)
	}
}

// constructor(private apiService: DealInformationService) {}

// public getDealType() {
//   const DropdownData = "../../../../../config/dropdownData.json";
//   return this.http.get(DropdownData).subscribe((data: any) => {
//     this.arr = data.DEALTYPEOptions;
//     console.log(data.DEALTYPEOptions);
//   });
// }

// public getDealInfo() {
//   this.dealId = "";
//   this.errorMessage = "";
//   this.apiService.getDealSetup(this.dealId).subscribe(
//     response => {
//       this.DealData = response;
//     },
//     error => {
//       this.errorMessage = error.message;
//     }
//   );
// }

import { Subscription } from "rxjs";
import { DealInformationService } from "./../../deal-information/deal-information.service";
import { Component, OnInit } from "@angular/core";

@Component({
	selector: "rebar-deal-reporting-information",
	templateUrl: "./deal-reporting-information.component.html",
	styleUrls: ["./deal-reporting-information.component.css"]
})
export class DealReportingInformationComponent implements OnInit {
	DealReportInformation: any;
	subscription: Subscription;
	constructor(private DealInformationService: DealInformationService) {
		this.subscription = this.DealInformationService.DealVar$.subscribe((res: any) => {
			if (res == "reporting") {
				this.ValidateDealSetup();
			}
		});
	}

	ngOnInit() {
		this.DealReportInformation = {};
		//Subscribing DealVar and concatenating this component fields's objects to be saved
	}

	ValidateDealSetup() {
		//Some validations need to be added in this dealReportingInfoJSON
		const dealReportingInfoData = {
			CTVDeal: "",
			// this.DealReportInformation.CTVDeal;
			DealExclusion: this.DealReportInformation.DealExclusion,
			DealSaving: this.DealReportInformation.DealSaving,
			DealSavingApprovedDate: this.DealReportInformation.DealSavingApprovedDate,
			GlobalCustomerName: this.DealReportInformation.GlobalCustomerName
		};
		this.DealInformationService.DealSetup = { ...this.DealInformationService.DealSetup, data4: dealReportingInfoData };
		this.DealInformationService.changeTest("api call");
	}
}

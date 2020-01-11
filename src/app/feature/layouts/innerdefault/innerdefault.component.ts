import { DealInformationService } from "./../../plan/deal-information/deal-information.service";
import { Component, OnInit } from "@angular/core";

@Component({
	selector: "rebar-innerdefault",
	templateUrl: "./innerdefault.component.html",
	styleUrls: ["./innerdefault.component.css"]
})
export class InnerdefaultComponent implements OnInit {
	constructor(public dealInfoService: DealInformationService) {}

	ngOnInit() {
		this.dealInfoService.DealVar$.subscribe(res => {
			if (res == "api call") {
				//api call
				this.apiCall();
			}
		});
	}

	apiCall() {
		const data = this.dealInfoService.DealSetup;
		this.dealInfoService.SaveDealSetupData(data).subscribe(res => {
			console.log("api called");
		});
		console.log("api call");
	}
}

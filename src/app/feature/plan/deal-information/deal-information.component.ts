import { Component, OnInit } from "@angular/core";

@Component({
	selector: "rebar-deal-information",
	templateUrl: "./deal-information.component.html",
	styleUrls: ["./deal-information.component.css"]
})
export class DealInformationComponent implements OnInit {
	isDealInfoReq: boolean = true;
	isAdmin: boolean = true;
	accessCode: string;
	reporting: boolean;

	private baseImageUrl: string = "https://demos.telerik.com/kendo-ui/content/web/panelbar/";

	private imageUrl(imageName: string): string {
		return this.baseImageUrl + imageName + ".jpg";
	}
	constructor() {}

	ngOnInit() {
		this.accessCode = "U";
		this.reporting = false;
	}

	onPanelChange(event) {
		this.reporting = event[0].expanded;
		console.log(event);
	}
}

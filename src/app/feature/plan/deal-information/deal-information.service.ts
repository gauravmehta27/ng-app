import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { pipe, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { ApiService } from "../../../api.service";

@Injectable()
export class DealInformationService {
	private DealVar = new BehaviorSubject("");
	DealVar$ = this.DealVar.asObservable();

	DealSetup: any;
	constructor(private http: HttpClient, private api: ApiService) {
		this.DealSetup = {};
	}

	changeTest(val) {
		this.DealVar.next(val);
	}

	getDealDropdownOptions() {
		return this.http.get("./assets/data/dropdownData.json").pipe(map(response => response));
	}

	GetDealSetup(dealId: Int16Array, accessCodes: string) {
		return this.api.getAll("deal/GetDealSetup?dealid=" + dealId + "&accessCodes=" + accessCodes);
		//.getAll("posts")
	}

	// function to complete beahvior subject once we get data from both components
	dealSetupComplete() {
		this.DealVar.complete();
	}

	SaveDealSetupData(data) {
		return this.api.save("deal/SaveDealSetUp", data);
	}
}

// return this.http
//   .get(`../../../../config/dropdownData.json`)
//   .pipe(map(response => response));

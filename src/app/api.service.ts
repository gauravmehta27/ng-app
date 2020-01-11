import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { map } from "rxjs/operators";
import { Access } from "./models/access";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  url = "http://localhost:45341/api";

  // url = "http://localhost:50271/api";
  constructor(private httpClient: HttpClient) {}

  getAll(Apiurl: string) {
    return this.httpClient
      .get(`${environment.baseURL}/${Apiurl}`)
      .pipe(map(response => response));
  }

  save(url, postData) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.httpClient
      .post(`${environment.baseURL}/${url}`, JSON.stringify(postData))
      .pipe(map(response => response));
  }

  getProjectList(enterPriseId: string, DealName: string, first) {
    return this.httpClient.get(
      this.url +
        "/project/getProjectList?enterpriseId=" +
        enterPriseId +
        "&DealName=" +
        DealName +
        "&first=" +
        first
    );
  }
  public getAccessInd() {
    return this.httpClient.get(`${this.url}/project/getAccessInd`);
  }

  private log(message: string) {
    console.log(message);
  }

  getDealList() {
    return this.httpClient.get(this.url + "/project/GetDealList");
  }

  getDealReport(urlSubString: string, Reportno: number): Observable<any[]> {
    return this.httpClient.post<any[]>(
      this.url + "/project/" + urlSubString + "?Reportno=" + Reportno,
      null
    );
  }
}

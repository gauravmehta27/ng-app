import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app-config.service';

@Injectable({
    providedIn: 'root',
  })
export class DataService {
    configData: any = null;
    constructor(private http: HttpClient , private config: AppConfigService) {
        this.configData = this.config.getConfig();
    }

    public getData() {

        // "sampleDataUrl" : "../data/data.json"
        return this.http.get(this.configData.sampleDataUrl)
            .map(data => {
                return data;
            });
    }

    public getData2() {

        // "sampleDataUrl" : "../data/data.json"
        return this.http.get(this.configData.sampleDataUrl2)
            .map(data => {
                return data;
            });
    }
}

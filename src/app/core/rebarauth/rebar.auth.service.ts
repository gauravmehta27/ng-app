import { Injectable } from '@angular/core';

import { AppConfigService } from '../services/app-config.service';

import { RebarAuthModule } from './rebar.auth.module';
import { MsalService } from '@azure/msal-angular';
import { environment } from "../../../environments/environment";
import { User } from 'msal';


@Injectable({
    providedIn: RebarAuthModule,
  })
export class RebarAuthService {

    configData: any = null;

    constructor(private auth: MsalService ,  config: AppConfigService) {
        this.configData = config.getConfig();
    }

    public IsUserAuthenticated(): boolean {
        return environment.providers !== 'mock' && !!this.auth.getUser();
    }

    public authenticationEnabled(): boolean {
        return environment.providers !== 'mock';
    }
}
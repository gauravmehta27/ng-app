import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RebarAuthService } from './core/rebarauth/rebar.auth.service';
import { Router } from '@angular/router';


@Component({
    selector: 'rebar-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'   

    ],
    encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent implements OnInit {
    isVisible: boolean=true;
    constructor(private auth: RebarAuthService, private router: Router) {
    }
    ngOnInit() {
        // show app content only if user is authenticated or app is running in 
        // mock eso configuration using npm run start:local command
        console.log('configured routes: ', this.router.config);
        if (!this.auth.authenticationEnabled())
            this.isVisible = true;
        if (this.auth.authenticationEnabled() && this.auth.IsUserAuthenticated())
            this.isVisible = true;

            console.log(this.isVisible);
    }


}

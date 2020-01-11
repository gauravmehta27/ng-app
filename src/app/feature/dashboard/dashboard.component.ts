import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../core/services/DataService';
import { Subscription } from 'rxjs';

@Component({
    selector: 'rebar-dashboard',
    templateUrl: './dashboard.html'
})

export class DashboardComponent implements OnInit, OnDestroy {
    // https://blog.angularindepth.com/the-best-way-to-unsubscribe-rxjs-observable-in-the-angular-applications-d8f9aa42f6a0

    private subscriptions: Subscription = new Subscription();
    message = 'Dasboard Page';
    sampleData: Object = null;
    sampleData2: Object = null;
    constructor(private service: DataService) {
    }

    ngOnInit() {

        this.service.getData()
            .take(1) // prevent memory leaks. Always unsubscribe subscriptions.
            .subscribe(
            data => {
                this.sampleData = data;
            } ,
            error => {
                this.sampleData = error;
            }
        );
        /*  Alternative approach to unsubscribe.  
            subscribe returns an method to unsubscribe.  
            retain it and call unsubscribe in ngOnDestroy
        */
       this.subscriptions.add(
        this.service.getData2()

        .subscribe(
            data => {
                this.sampleData2 = data;
            } ,
            error => {
                this.sampleData2 = error;
            }
        ));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}


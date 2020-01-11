import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MultiDataSet, Label } from "ng2-charts";
import { ChartType } from "chart.js";
import { ApiService } from "../../api.service";
import { Access } from "../../models/access";

@Component({
  selector: "rebar-dmathome",
  templateUrl: "./dmathome.component.html",
  styleUrls: ["./dmathome.component.css"],
  encapsulation: ViewEncapsulation.Emulated
})
export class DMATHomeComponent implements OnInit {
  ProfileNm;
  public finalData;
  enterpriseId;
  first = 1;
  dealName = "";
  projectList;
  projList;
  loading = false;
  errorMessage = "";
  accessInd: any;
  ViewAllDealAccessInd;
  CreateDealAccessInd: boolean = false;
  constructor(private apiService: ApiService) {}

  doughnutChartLabels: Label[] = ["B"];
  //   doughnutChartData: MultiDataSet = [
  //     [67,43]
  //   ];
  doughnutChartType: ChartType = "doughnut";
  chartColors: any[] = [
    {
      backgroundColor: ["#A91536", "#c0c0c0"]
    }
  ];
  chartOptions: any = {
    tooltips: { enabled: false }
  };

  callflip(event) {
    let target = event.target || event.srcElement || event.currentTarget;
    let idAttr = target.attributes.id;
    let id = idAttr.nodeValue;
    var element = document
      .getElementById(id)
      .parentElement.parentElement.parentElement.parentElement.classList.toggle(
        "applyflip"
      );
  }

  ngOnInit() {
    //console.log(this.doughnutChartData);
    this.enterpriseId = "vikash.g.singh"; //'srinivas.sarma$$$$$$$$$$$$';
    this.loading = true;
    this.errorMessage = "";
    this.apiService
      .getProjectList(this.enterpriseId, this.dealName, this.first)
      .subscribe(
        response => {
          this.projectList = response;
          for (var i = 0; i < this.projectList.length; i++) {
            let chartvalue = new Array(1);
            chartvalue[0] = new Array(2);
            chartvalue[0][0] = this.projectList[i].CompletionPct;
            chartvalue[0][1] = 100 - this.projectList[i].CompletionPct;
            this.projectList[i].chartValue = chartvalue;
          }
          console.log(this.projectList);
        },
        error => {
          this.errorMessage = error.message;
        }
      );
    this.apiService.getAccessInd().subscribe(
      data => {
        // this.accessInd = data; this.ViewAllDealAccessInd = data.ViewAllDealAccessInd; // was throwing error "Property 'ViewAllDealAccessInd' does not exist on type 'Object'." on 8Jan 2020
      },
      error => {
        this.errorMessage = error.message;
      }
    );
  }

  public handleSearch(event: any) {
    this.errorMessage = "";
    this.enterpriseId = "vikash.g.singh";
    this.apiService
      .getProjectList(this.enterpriseId, this.dealName, this.first)
      .subscribe(
        response => {
          this.projectList = response;
          for (var i = 0; i < this.projectList.length; i++) {
            let chartvalue = new Array(1);
            chartvalue[0] = new Array(2);
            chartvalue[0][0] = this.projectList[i].CompletionPct;
            chartvalue[0][1] = 100 - this.projectList[i].CompletionPct;
            this.projectList[i].chartValue = chartvalue;
          }
          // console.log(this.projectList);
        },
        error => {
          this.errorMessage = error.message;
        }
      );
  }

  handleFilter(value) {
    //debugger;
    var data = this.projectList.filter(
      ({ DealName }) =>
        DealName.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
    this.finalData = data.map(function(item) {
      return item["DealName"];
    });

    for (var i = 0; i < this.finalData.length; i++) {
      let chartvalue = new Array(1);
      chartvalue[0] = new Array(2);
      chartvalue[0][0] = this.projectList[i].CompletionPct;
      chartvalue[0][1] = 100 - this.projectList[i].CompletionPct;
      this.projectList[i].chartValue = chartvalue;
    }
    console.log(this.finalData);
  }

  refreshData(value) {
    this.apiService
      .getProjectList(this.enterpriseId, value, this.first)
      .subscribe(response => {
        this.projList = response;
      });
    console.log(this.projList);
  }
}

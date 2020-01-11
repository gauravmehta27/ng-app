import { Component, OnInit } from "@angular/core";

@Component({
  selector: "rebar-other-page-header",
  templateUrl: "./other-page-header.component.html",
  styleUrls: ["./other-page-header.component.css"]
})
export class OtherPageHeaderComponent implements OnInit {
  //mainPage: string;
  clickedIndex: any;
  OpportunityId:String;
  clientname:string;
  DealName:string;

  constructor() {
    //this.mainPage = "plan";
  }

  ngOnInit() {
    this.clickedIndex = null;
    this.OpportunityId="Test";
    this.clientname="TestClient";
    this.DealName="TestDeal";
  }

  isLinkClicked(index) {
    this.clickedIndex = index;
  }

  isLinkClosed() {
    console.log("clicked");
    this.clickedIndex = null;
  }
}

import { Component, OnInit } from "@angular/core";
import { DealInformationService } from "./../../deal-information/deal-information.service";

@Component({
  selector: "rebar-opportunity-information",
  templateUrl: "./opportunity-information.component.html",
  styleUrls: ["./opportunity-information.component.css"]
})
export class OpportunityInformationComponent implements OnInit {
  OpportunityInformation: any;
  MMSDetails: any;
  SGFinancial: any;
  SWBBPO: any;
  SWBIO: any;
  SWBIC: any;
  OpportunityTimeline: any;
  ClientBackground: any;
  ThirdPartyInvolvement: any;
  TechAttributes: any;
  OpportunityBPODocumentDetails: any;
  WatchListDetails: any;
  crossGSDetails: any;
  solutionDetails: any;
  rotatingSolutionStack: any;
  rotatingNewCommercialFinancial: any;
  rotatingNewDelivery: any;
  rotatingSolutionMaturityIndex: any;
  dueDiligence: any;
  DealReportInformation: any;
  dealId;
  accessCodes: any;

  constructor(private DealInformationService: DealInformationService) {}

  ngOnInit() {
    this.dealId = 2;
    this.accessCodes = "R";
    this.OpportunityInformation = "";
    this.MMSDetails = "";
    this.SGFinancial = "";
    this.SWBBPO = "";
    this.SWBIO = "";
    this.SWBIC = "";
    this.OpportunityTimeline = "";
    this.ClientBackground = "";
    this.ThirdPartyInvolvement = "";
    this.TechAttributes = "";
    this.OpportunityBPODocumentDetails = "";
    this.WatchListDetails = "";
    this.crossGSDetails = "";
    this.solutionDetails = "";
    this.rotatingSolutionStack = "";
    this.rotatingNewCommercialFinancial = "";
    this.rotatingNewDelivery = "";
    this.rotatingSolutionMaturityIndex = "";
    this.dueDiligence = "";
    this.DealReportInformation = "";

    this.DealInformationService.GetDealSetup(
      this.dealId,
      this.accessCodes
    ).subscribe((res: any) => {
      // this.DealDetail = res.DealDetail;
      // this.DealInformation = res.DealInformation;
      this.OpportunityInformation = res.OpportunityInformation;
      this.MMSDetails = res.MMSDetails;
      this.SGFinancial = res.SGFinancial;
      this.SWBBPO = res.SWBBPO;
      this.SWBIO = res.SWBIO;
      this.SWBIC = res.SWBIC;
      this.OpportunityTimeline = res.OpportunityTimeline;
      this.ClientBackground = res.ClientBackground;
      this.ThirdPartyInvolvement = res.ThirdPartyInvolvement;
      this.TechAttributes = res.TechAttributes;
      this.OpportunityBPODocumentDetails = res.OpportunityBPODocumentDetails;
      this.WatchListDetails = res.WatchListDetails;
      this.crossGSDetails = res.crossGSDetails;
      this.solutionDetails = res.solutionDetails;
      this.rotatingSolutionStack = res.rotatingSolutionStack;
      this.rotatingNewCommercialFinancial = res.rotatingNewCommercialFinancial;
      this.rotatingNewDelivery = res.rotatingNewDelivery;
      this.rotatingSolutionMaturityIndex = res.rotatingSolutionMaturityIndex;
      this.dueDiligence = res.dueDiligence;
      this.DealReportInformation = res.DealReportInformation;
    });
  }
}

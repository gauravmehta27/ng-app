import { Component, OnInit } from '@angular/core';
import {ExportExcelService} from '../../../core/services/ExcelExportService';
import { ApiService } from '../../../api.service';
@Component({
  selector: 'rebar-deal-report',
  templateUrl: './deal-report.component.html',
  styleUrls: ['./deal-report.component.css'],
  providers:[ExportExcelService]
})
export class DealReportComponent implements OnInit {

  DealReportData: any=[];
  errorMessage = '';
  constructor(private excelService:ExportExcelService,private apiService: ApiService) {   
  }

  ngOnInit() {
  }

  ExportExcel(reportUrl:string,reportno:number,reportName:string)
  {
    this.DealReportData=[]
    this.apiService.getDealReport(reportUrl, reportno)
        .subscribe((response) => { this.DealReportData = response;
        if(this.DealReportData.length!=0)
        {
          this.excelService.exportAsExcelFile(this.DealReportData, reportName);
        }
        },
        (error) => {
            this.errorMessage = error.message;
            console.log(this.errorMessage)
        } )
  }
   

}

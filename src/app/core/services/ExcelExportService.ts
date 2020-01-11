import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {formatDate } from '@angular/common';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportExcelService {

    constructor() { }

    public exportAsExcelFile(json: any[], excelFileName: string): void {
      
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
     // console.log('worksheet',worksheet);
      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
      this.saveAsExcelFile(excelBuffer, excelFileName);
    }

    jstoday=''
    private saveAsExcelFile(buffer: any, fileName: string): void {
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
       
      this.jstoday = formatDate(new Date(), 'dd-MM-yyyy hh:mm a', 'en-US', '+0530');
      FileSaver.saveAs(data, fileName + '_' + this.jstoday + EXCEL_EXTENSION);
    }
}
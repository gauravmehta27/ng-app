import { Component, OnInit, ViewEncapsulation, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'rebar-homepageheader',
  templateUrl: './homepageheader.component.html',
  styleUrls: ['./homepageheader.component.css'
        //'../../../../assets/css/transIT-new-styles.css',
        //'../../../../Content/Styles/acn-icons.css',
        //// '../../../../../../Content/Styles/FontAwesome.min.css',      
        //'../../../../Content/Styles/transIT-custom-styles.css',
        //'../../../../Content/bootstrap.min.css'
        ////'../../../../../../Content/Styles/kendo/kendo.common.min.css'
        ////'../../../../../../Content/Styles/kendo/kendo.default.min.css'
    ],
   encapsulation: ViewEncapsulation.Emulated
})

export class HomepageheaderComponent implements OnInit {
  constructor() {        
  }

  //@Output() show = new EventEmitter<boolean>();
    ProfileNm = "Admin";   
    Route = "Admin";
    HasUserManageAccess: boolean = true;
    CreateDealAccessInd: boolean = true;
  ngOnInit() {    
  }
  openfeedback()
  {
       let wnd = document.getElementById("feedbackForm").style.display='block';  
}

  

}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'rebar-layout-dmat',
  templateUrl: './layout-dmat.component.html',
    styleUrls: ['./layout-dmat.component.css',
        '../../../../../../assets/css/acn-icons.css',
       // '../../../../../../Content/Styles/FontAwesome.min.css',
        '../../../../../../assets/css/transIT-new-styles.css',
        '../../../../../../assets/css/transIT-custom-styles.css',
        '../../../../../../assets/css/bootstrap.min.css'
        //'../../../../../../Content/Styles/kendo/kendo.common.min.css'
        //'../../../../../../Content/Styles/kendo/kendo.default.min.css'
    ],
    encapsulation: ViewEncapsulation.Emulated
})
export class LayoutDmatComponent implements OnInit {

    constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'rebar-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }


  ngAfterViewInit() {
    document.getElementById('home').setAttribute('class', 'nav-link active');
  }


  updateClass(event: any) {
    document.getElementById('home').setAttribute('class', 'nav-link');
    document.getElementById('dash').setAttribute('class', 'nav-link');
    document.getElementById('admin').setAttribute('class', 'nav-link');
    const target = event.target || event.srcElement || event.currentTarget;
    target.setAttribute('class', 'nav-link active');


  }

}

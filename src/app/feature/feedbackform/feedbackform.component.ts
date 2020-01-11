import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'rebar-feedbackform',
  templateUrl: './feedbackform.component.html',
  styleUrls: ['./feedbackform.component.css']
})
export class FeedbackformComponent implements OnInit {
  constructor() { }
  ngOnInit() {      
   }
  
  public opened = true;
  feedBacks;
  feedbackValue =0;
  CloseButton()
  {   
   let wnd = document.getElementById("feedbackForm").style.display='none';  
  }
  
  setFeedback(event)
  {
    alert('hi');
  }

  Submit()
  {
    alert('hi');
  }

}

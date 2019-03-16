import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-rest',
  templateUrl: './rest.component.html',
  styleUrls: ['./rest.component.scss']
})
export class RestComponent implements OnInit {
  setup: string;
  punchline: string;

  constructor(private restService: RestService) { }

  ngOnInit() {
  }

  onClick() {
    this.restService.sendRequest()
      .subscribe(result => { 
        if (result === null) { return; } else { 
          this.setup = result.setup; 
          this.punchline = result.punchline;
        }
      });
  }

}

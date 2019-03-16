import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SoapService } from '../soap.service';

@Component({
  selector: 'app-soap',
  templateUrl: './soap.component.html',
  styleUrls: ['./soap.component.scss']
})
export class SoapComponent implements OnInit {
  form: FormGroup;
  temperature: string;

  constructor(private fb: FormBuilder, private soapService: SoapService) { }

  ngOnInit() {
    this.form = this.fb.group({
      celcius: ['']
    });
  }

  get pfirstName () { return this.form.get("celcius").value; }

  onClick() {
    this.soapService.sendRequest(this.pfirstName)
      // .subscribe(result => { 
      //   if (result === null) { return; } else { this.cat_url = result }
      // });
    // this.temperature = this.pfirstName;
  }

}

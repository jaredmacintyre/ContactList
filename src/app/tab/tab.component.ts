import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BusinessContact } from './../classes/BusinessContact';
import { PersonalContact } from './../classes/PersonalContact';
import { ListService } from '../list.service';


@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  personalForm: FormGroup;
  businessForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private listService: ListService) { }

  ngOnInit() {
    this.personalForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nickname: ''
    });
    this.businessForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      company: ''
    });


  }

  // convenience getters for easy access to form fields
  get pfirstName () { return this.personalForm.get("firstName").value; }
  get plastName () { return this.personalForm.get("lastName").value; }
  get pphoneNumber () { return this.personalForm.get("phoneNumber").value; }
  get pemail () { return this.personalForm.get("email").value; }
  get nickname () { return this.personalForm.get("nickname").value; }

  get bfirstName () { return this.businessForm.get("firstName").value; }
  get blastName () { return this.businessForm.get("lastName").value; }
  get bphoneNumber () { return this.businessForm.get("phoneNumber").value; }
  get bemail () { return this.businessForm.get("email").value; }
  get company () { return this.businessForm.get("company").value; }

  onPersonal() {
    // this.submitted = true;

    // // stop here if form is invalid
    if (this.personalForm.invalid) {
        return;
    }

    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.businessForm.value))
    this.listService.addContact(new PersonalContact(this.pfirstName, this.plastName, this.pphoneNumber, this.pemail, this.nickname))
  }

  onBusiness() {
    // this.submitted = true;

    // // stop here if form is invalid
    if (this.businessForm.invalid) {
        return;
    }

    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.businessForm.value))
    this.listService.addContact(new BusinessContact(this.bfirstName, this.blastName, this.bphoneNumber, this.bemail, this.company))
  }
}

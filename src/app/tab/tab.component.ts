import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from './../classes/Contact';
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
  selectedFile = null;

  constructor(private fb: FormBuilder, private listService: ListService) { }

  ngOnInit() {
    this.personalForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  // convenience getters for easy access to form fields
  get firstName () { return this.personalForm.get("firstName").value; }
  get lastName () { return this.personalForm.get("lastName").value; }
  get phoneNumber () { return this.personalForm.get("phoneNumber").value; }
  get email () { return this.personalForm.get("email").value; }

  onPersonal() {
    // // stop here if form is invalid
    if (this.personalForm.invalid) {
        return;
    }

    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.businessForm.value))
    this.listService.addContact(new Contact(this.firstName, this.lastName, this.phoneNumber, this.email), this.selectedFile)
  }

  onFileSelected(event) {
    console.log(event.target.files[0])
    this.selectedFile = event.target.files[0];
  }
}

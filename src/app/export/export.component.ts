import { Component, OnInit } from '@angular/core';
import { Contact } from '../classes/Contact';
import { ListService } from '../list.service';
import { Builder } from "xml2js";

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit {
  list: Contact[];

  constructor(private listService: ListService) { 
  }

  ngOnInit() {
    this.listService.list.subscribe(list => this.list = list);
  }

  /**
   * Converts the contact list to JSON
   * @pre The Contact[] List has been instantiated
   * @post The list has been converted to JSON and returned
   * @return {string} A JSON object representating the contact list
  **/
  toJSON() {
    return JSON.stringify(this.list, null, 2)
  }

  /**
   * Converts the contact list to XML
   * @pre The Contact[] List has been instantiated
   * @post The list has been converted to XML and returned
   * @return {string} An XML object representing the contact list
  **/
  toXML() {
    const builder = new Builder();
    let json = JSON.stringify(this.list);
    let xml = builder.buildObject(json);
    // console.log(xml);
    return xml;
  }
}

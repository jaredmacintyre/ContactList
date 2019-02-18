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

  toJSON() {
    return JSON.stringify(this.list, null, 2)
  }

  // Convert string/JSON to XML
  toXML() {
    const builder = new Builder();
    let json = JSON.stringify(this.list);
    let xml = builder.buildObject(json);
    // console.log(xml);
    return xml;
}

  // saveJSON() {
  //   let fs = require("fs");
  //   fs.writeFile("./contactlist.json", this.toJSON() , (err) => {
  //     if (err) {
  //         console.error(err);
  //         return;
  //     };
  //   })
  // }

}

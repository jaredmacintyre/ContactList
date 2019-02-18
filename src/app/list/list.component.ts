import { Component, OnInit } from '@angular/core';
import { Contact } from '../classes/Contact';
import { ListService } from '../list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  list: Contact[];
  list2: ContactParser[];

  constructor(private listService: ListService) { 
  }

  ngOnInit() {
    this.listService.list.subscribe(list => this.list = list);
    this.listService.list2.subscribe(list2 => this.list2 = list2);
  }

  delete(index: number) {
    this.listService.deleteContact(index);
  }
}



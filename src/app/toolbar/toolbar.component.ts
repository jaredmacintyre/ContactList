import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private theme: ThemeService) { }

  ngOnInit() {
  }

  changeTheme() {
    this.theme.changeTheme();
  }

}

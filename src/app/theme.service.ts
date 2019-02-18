import { Injectable } from '@angular/core';
import { Theme } from './theme';
import file from '../assets/theme.json';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme: Theme;
  constructor() { 
    // console.log(file.id);
    this.currentTheme = { "id": file.id };
    document.body.classList.remove("theme1");
    document.body.classList.add(this.currentTheme.id);
  }

  changeTheme() {
    // this.outputJSON();
    if (document.body.classList.contains("theme1")) {
      document.body.classList.remove("theme1");
      document.body.classList.add("theme2");
      this.currentTheme.id = "theme2";
    }
    else if (document.body.classList.contains("theme2")) {
      document.body.classList.remove("theme2");
      document.body.classList.add("theme3");
      this.currentTheme.id = "theme3";
    }
    else if (document.body.classList.contains("theme3")) {
      document.body.classList.remove("theme3");
      document.body.classList.add("theme4");
      this.currentTheme.id = "theme4";
    }
    else if (document.body.classList.contains("theme4")) {
      document.body.classList.remove("theme4");
      document.body.classList.add("theme1");
      this.currentTheme.id = "theme1";
    }
  }

  // outputJSON() {
  //   let json = JSON.stringify(this.currentTheme);
  //   // var file = new File(["Hello, world!"], "../assets/theme.json", {type: "text/plain;charset=utf-8"});
  //   // saveAs(file);
  //   var blob = new Blob(["Hello"], {type: "text/plain;charset=utf-8"});
  //   saveAs(blob , "test.txt");
  // }

}

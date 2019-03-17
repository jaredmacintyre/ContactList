import { Injectable } from '@angular/core';
import { Theme } from './theme';
import { take, map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme: string;
  private themeDoc: AngularFirestoreDocument;

  constructor(private afs: AngularFirestore) { 
    document.body.classList.remove("theme1");
    this.themeDoc = this.afs.collection('theme').doc('theme');
    this.themeDoc.ref.get().then(res => {
      this.currentTheme = res.data().id;
      document.body.classList.add(this.currentTheme);
      // console.log(this.currentTheme);
    });
  }

  changeTheme() {
    // this.outputJSON();
    if (document.body.classList.contains("theme1")) {
      document.body.classList.remove("theme1");
      document.body.classList.add("theme2");
      this.currentTheme = "theme2";
      this.themeDoc.update({"id":"theme2"});
    }
    else if (document.body.classList.contains("theme2")) {
      document.body.classList.remove("theme2");
      document.body.classList.add("theme3");
      this.currentTheme = "theme3";
      this.themeDoc.update({"id":"theme3"});
    }
    else if (document.body.classList.contains("theme3")) {
      document.body.classList.remove("theme3");
      document.body.classList.add("theme4");
      this.currentTheme = "theme4";
      this.themeDoc.update({"id":"theme4"});
    }
    else if (document.body.classList.contains("theme4")) {
      document.body.classList.remove("theme4");
      document.body.classList.add("theme1");
      this.currentTheme = "theme1";
      this.themeDoc.update({"id":"theme1"});
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

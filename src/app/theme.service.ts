import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

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
    });
  }

  changeTheme() {
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
}

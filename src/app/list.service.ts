import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Contact } from './classes/Contact';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
 
@Injectable({
  providedIn: 'root'
})

export class ListService {
  afsCollection: AngularFirestoreCollection<ContactParser>;
  list2: Observable<ContactParser[]>;
  contactDoc: AngularFirestoreDocument;
  // Variables
  private next: Contact;
  private nextList: Contact[];
  private listSource: BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>([]);
  list = this.listSource.asObservable();
  // Constructor
  constructor(private afs: AngularFirestore) {
    // observe firestore db
    this.afsCollection = this.afs.collection('contacts', ref => {
      return ref.orderBy('firstName');
    });
    this.list2 = this.afsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as ContactParser;
        // const id = a.payload.doc.id;
        return data;
      })));
    // this.list2 = this.afsCollection.valueChanges();

    // create contact list from db data
    this.list2.subscribe(list2 => {
      for (let i = 0; i < list2.length; i++) {
        this.next = new Contact(
          list2[i].firstName,
          list2[i].lastName,
          list2[i].phoneNumber,
          list2[i].email,
        );
        this.list.pipe(take(1)).subscribe(val => {
          if (i == 0) this.nextList = [this.next];
          else this.nextList = [...val, this.next];
          this.listSource.next(this.nextList);
        });
      }
    });
  }
  // Methods
  addContact(contact: Contact, image) {
    this.afs.collection('contacts').add({
      firstName: contact.firstname,
      lastName: contact.lastname,
      phoneNumber: contact.phone_number,
      email: contact.email,
    });
  }

  deleteContact(index: number) {
    this.list.pipe(take(1)).subscribe(val => {
      let newList =  val;
      newList.splice(index, 1);
      this.listSource.next(newList);
    })
    // this.afs.collection('contacts').ref.where("id", "==", index).get().
    // this.afs.collection('contacts').doc(index + "").delete();
  }
}

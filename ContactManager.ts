import { Contact } from "./Contact.js";

export class ContactManager {
    // Variables
    private _contact_list: Contact[];
    // Constructor
    constructor () {
        this._contact_list = new Array();
    }
    // Accessors
    get contact_list(): Contact[] {
        return this._contact_list;
    }
    // Methods
    addContact(contact: Contact) {
        this._contact_list.push(contact);
    }

    editContact(type: number) {
        // TODO
    }

    deleteContact(index: number) {
        this._contact_list.splice(index, 1);
    }
    // for debugging
    toString(): string {
        let list = "";
        for (var i = 0, len = this._contact_list.length; i < len; i++) {
            list += this._contact_list[i].toString() + "\n";
        }
        return list;
    }
}
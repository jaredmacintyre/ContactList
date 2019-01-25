export class ContactManager {
    constructor() {
        this._contact_list = new Array();
    }
    get contact_list() {
        return this._contact_list;
    }
    addContact(contact) {
        this._contact_list.push(contact);
    }
    editContact(type) {
    }
    deleteContact(index) {
        this._contact_list.splice(index, 1);
    }
    toString() {
        let list = "";
        for (var i = 0, len = this._contact_list.length; i < len; i++) {
            list += this._contact_list[i].toString() + "\n";
        }
        return list;
    }
}

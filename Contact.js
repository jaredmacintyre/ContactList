export class Contact {
    constructor(firstname, lastname, phone_number, email) {
        this._firstname = firstname;
        this._lastname = lastname;
        this._phone_number = phone_number;
        this._email = email;
    }
    get firstname() {
        return this._firstname;
    }
    get lastname() {
        return this._lastname;
    }
    get phone_number() {
        return this._phone_number;
    }
    get email() {
        return this._email;
    }
    get fullname() {
        return this._firstname + " " + this._lastname;
    }
    set firstname(firstname) {
        this._firstname = firstname;
    }
    set lastname(lastname) {
        this._lastname = lastname;
    }
    set phone_number(phone_number) {
        this._phone_number = phone_number;
    }
    set email(email) {
        this._email = email;
    }
    outputHTML() {
        let output = ["Name: " + this.fullname, "Phone: " + this._phone_number, "Email: " + this._email];
        return output;
    }
    getType() {
        return this.constructor.toString().match(/\w+/g)[1];
    }
}

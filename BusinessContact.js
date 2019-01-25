import { Contact } from "./Contact.js";
export class BusinessContact extends Contact {
    constructor(firstname, lastname, phone_number, email, company = "") {
        super(firstname, lastname, phone_number, email);
        this._company = company;
    }
    get company() {
        return this._company;
    }
    set company(company) {
        this._company = company;
    }
    outputHTML() {
        let output = super.outputHTML();
        output.push("Company: " + this._company);
        return output;
    }
}

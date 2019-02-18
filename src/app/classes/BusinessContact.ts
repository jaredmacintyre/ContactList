import { Contact } from "./Contact.js";

export class BusinessContact extends Contact{
    // Variables
    private _company: string;
    // Constructor
    constructor(firstname: string, lastname: string, phone_number: string, email: string, company: string = "") { 
        super(firstname, lastname, phone_number, email);
        this._company = company;
    }
    // Accessors
    get company(): string {
        return this._company;
    }
    // Mutators
    set company(company: string) {
        this._company = company;
    }
    // Methods
    outputHTML(): string[] {
        let output: string[] = super.outputHTML();
        output.push("Company: " + this._company);
        return output;
    }
}
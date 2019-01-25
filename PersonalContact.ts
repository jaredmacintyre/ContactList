import { Contact } from "./Contact.js";

export class PersonalContact extends Contact{
    // Variables
    private _nickname: string;
    // Constructor
    constructor(firstname: string, lastname: string, phone_number: string, email: string, nickname: string = "") { 
        super(firstname, lastname, phone_number, email);
        this._nickname = nickname;
    }
    // Accessors
    get nickname(): string {
        return this._nickname;
    }
    // Mutators
    set nickname(nickname: string) {
        this._nickname = nickname;
    }
    // Methods
    outputHTML(): string[] {
        let output: string[] = super.outputHTML();
        output.push("Nickname: " + this._nickname);
        return output;
    }
}
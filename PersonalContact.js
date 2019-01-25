import { Contact } from "./Contact.js";
export class PersonalContact extends Contact {
    constructor(firstname, lastname, phone_number, email, nickname = "") {
        super(firstname, lastname, phone_number, email);
        this._nickname = nickname;
    }
    get nickname() {
        return this._nickname;
    }
    set nickname(nickname) {
        this._nickname = nickname;
    }
    outputHTML() {
        let output = super.outputHTML();
        output.push("Nickname: " + this._nickname);
        return output;
    }
}

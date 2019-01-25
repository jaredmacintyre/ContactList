export abstract class Contact {
    // Variables
    private _firstname: string;
    private _lastname: string;
    private _phone_number: string;
    private _email: string;
    // Constructor
    constructor(firstname: string, lastname: string, phone_number: string, email: string) {
       this._firstname = firstname;
       this._lastname = lastname;
       this._phone_number = phone_number;
       this._email = email;
    }
    // Accessors
    get firstname(): string {
        return this._firstname;
    }

    get lastname(): string {
        return this._lastname;
    }

    get phone_number(): string {
        return this._phone_number;
    }

    get email(): string {
        return this._email;
    }

    get fullname(): string {
        return this._firstname + " " + this._lastname;
    }
    // Mutators
    set firstname(firstname: string) {
        this._firstname = firstname;
    }

    set lastname(lastname: string) {
        this._lastname = lastname;
    }

    set phone_number(phone_number: string) {
        this._phone_number = phone_number;
    }

    set email(email: string) {
        this._email = email;
    }
    // Methods
    outputHTML(): string[] {
        let output: string[] = ["Name: " + this.fullname, "Phone: " + this._phone_number, "Email: " + this._email];
        return output;
    }

    getType(): string {
        return this.constructor.toString().match(/\w+/g)[1];
    }
}
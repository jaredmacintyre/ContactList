import { BusinessContact } from "./BusinessContact.js";
import { PersonalContact } from "./PersonalContact.js";
import { ContactManager } from "./ContactManager.js";

clearInput();
let contactManager = new ContactManager();

// Event Listeners
document.getElementById("btnCreatePersonal").onclick = function () {
    getInput(1);
};

document.getElementById("btnCreateBusiness").onclick = function () {
    getInput(2);
};

document.getElementById("btnPersonalContact").onclick = function () {
    opencloseTab("btnPersonalContact", "PersonalForm");
}

document.getElementById("btnBusinessContact").onclick = function () {
    opencloseTab("btnBusinessContact", "BusinessForm");
}

function getInput (type: number) {
    var first_name = (<HTMLInputElement>document.getElementById("txtFirstName")).value;
    var last_name = (<HTMLInputElement>document.getElementById("txtLastName")).value;
    var phone_number = (<HTMLInputElement>document.getElementById("txtPhoneNumber")).value;
    var email = (<HTMLInputElement>document.getElementById("txtEmail")).value;
    if (first_name == "" || last_name == "" || phone_number == "" || email == ""){
        alert("All fields marked '*' must be completed");
    }
    else {
        if (type == 1) {
            var nickname = (<HTMLInputElement>document.getElementById("txtNickname")).value;
            contactManager.addContact(new PersonalContact(first_name, last_name, phone_number, email, nickname));
        }
        else if (type == 2) {
            var company = (<HTMLInputElement>document.getElementById("txtCompany")).value;
            contactManager.addContact(new BusinessContact(first_name, last_name, phone_number, email, company));
        }
        clearInput();
        buildList();
    }
}

function clearInput() {
    (<HTMLInputElement>document.getElementById("txtFirstName")).value = "";
    (<HTMLInputElement>document.getElementById("txtLastName")).value = "";
    (<HTMLInputElement>document.getElementById("txtPhoneNumber")).value = "";
    (<HTMLInputElement>document.getElementById("txtEmail")).value = "";
    (<HTMLInputElement>document.getElementById("txtNickname")).value = "";
    (<HTMLInputElement>document.getElementById("txtCompany")).value = "";
}

// Code referenced from https://www.w3schools.com/howto/howto_js_tabs.asp
function opencloseTab(caller: string, type: string) { 
    // Get all elements with class="tabcontent" and hide them
    var tabcontent = document.getElementsByClassName("TabContent");
    for (var i = 0; i < tabcontent.length; i++) {
        (<HTMLInputElement>tabcontent[i]).style.display = "none";
    }
    // Remove the class active if active
    if (document.getElementById(caller).className == "TabLink active") {
        document.getElementById(caller).className = document.getElementById(caller).className.replace(" active", "")
        return;
    }

    // Get all elements with class="tablinks" and remove the class "active"
    var tablinks = document.getElementsByClassName("TabLink");
    for (var i = 0; i < tablinks.length; i++) {
        (<HTMLInputElement>tablinks[i]).className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById("BasicForm").style.display = "flex";
    document.getElementById(type).style.display = "flex";
    document.getElementById(caller).className += " active";
}

function buildList() {
    let ul = document.getElementById("ContactList");
    // clear list
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
    // add list elements
    for (var i = 0, len = contactManager.contact_list.length; i < len; i++) {
        let main = document.createElement("li");
        // li.setAttribute('id', );
        let li = document.createElement("li");
        li.className = "ContactInfo";
        li.id = "ContactInfo" + i;
        let text = document.createElement("p");
        let info: string[] = contactManager.contact_list[i].outputHTML();
        text.appendChild(document.createTextNode(contactManager.contact_list[i].getType()));
        text.appendChild(document.createElement("br"));
        for (var j = 0, len = info.length; j < len; j++) {
            text.appendChild(document.createTextNode(info[j] + " | "));
            // text.appendChild(document.createElement("br"));
        }
        li.appendChild(text);
        ul.appendChild(li);
    }
}


import { BusinessContact } from "./BusinessContact.js";
import { PersonalContact } from "./PersonalContact.js";
import { ContactManager } from "./ContactManager.js";
clearInput();
let contactManager = new ContactManager();
document.getElementById("btnCreatePersonal").onclick = function () {
    getInput(1);
};
document.getElementById("btnCreateBusiness").onclick = function () {
    getInput(2);
};
document.getElementById("btnPersonalContact").onclick = function () {
    opencloseTab("btnPersonalContact", "PersonalForm");
};
document.getElementById("btnBusinessContact").onclick = function () {
    opencloseTab("btnBusinessContact", "BusinessForm");
};
function getInput(type) {
    var first_name = document.getElementById("txtFirstName").value;
    var last_name = document.getElementById("txtLastName").value;
    var phone_number = document.getElementById("txtPhoneNumber").value;
    var email = document.getElementById("txtEmail").value;
    if (first_name == "" || last_name == "" || phone_number == "" || email == "") {
        alert("All fields marked '*' must be completed");
    }
    else {
        if (type == 1) {
            var nickname = document.getElementById("txtNickname").value;
            contactManager.addContact(new PersonalContact(first_name, last_name, phone_number, email, nickname));
        }
        else if (type == 2) {
            var company = document.getElementById("txtCompany").value;
            contactManager.addContact(new BusinessContact(first_name, last_name, phone_number, email, company));
        }
        clearInput();
        buildList();
    }
}
function clearInput() {
    document.getElementById("txtFirstName").value = "";
    document.getElementById("txtLastName").value = "";
    document.getElementById("txtPhoneNumber").value = "";
    document.getElementById("txtEmail").value = "";
    document.getElementById("txtNickname").value = "";
    document.getElementById("txtCompany").value = "";
}
function opencloseTab(caller, type) {
    var tabcontent = document.getElementsByClassName("TabContent");
    for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    if (document.getElementById(caller).className == "TabLink active") {
        document.getElementById(caller).className = document.getElementById(caller).className.replace(" active", "");
        return;
    }
    var tablinks = document.getElementsByClassName("TabLink");
    for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById("BasicForm").style.display = "flex";
    document.getElementById(type).style.display = "flex";
    document.getElementById(caller).className += " active";
}
function buildList() {
    let ul = document.getElementById("ContactList");
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
    for (var i = 0, len = contactManager.contact_list.length; i < len; i++) {
        let main = document.createElement("li");
        let li = document.createElement("li");
        li.className = "ContactInfo";
        li.id = "ContactInfo" + i;
        let text = document.createElement("p");
        let info = contactManager.contact_list[i].outputHTML();
        text.appendChild(document.createTextNode(contactManager.contact_list[i].getType()));
        text.appendChild(document.createElement("br"));
        for (var j = 0, len = info.length; j < len; j++) {
            text.appendChild(document.createTextNode(info[j] + " | "));
        }
        li.appendChild(text);
        ul.appendChild(li);
    }
}

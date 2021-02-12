"use strict";

function accessData(userID, page) { // data parameter

    fetch("./scripts/data/user-information.json")
        .then((blob) => {
            return blob.json();
        })
        .then(result => {

            let userInfo = result.clients.filter(function (item) {
                return item.userID == userID;
            });

            if (page == "Index") {

                placeAccountInformation(userInfo[0]);
                placeTransactionInformation(userInfo[0]);
                placeMailDetails(userInfo[0]);
                placePhoneDetails(userInfo[0]);
            }
            if (page == "transactions") {
                listAccounts(userInfo[0]);
                placePhoneDetails(userInfo[0]);
            }

        })
        .catch(err => {
            alert("There seems to be a problem. Please log again");
            window.location = "/login";
        });
}

function listAccounts(client_information) {
    let accounts = client_information.accounts;
    let parent = document.querySelector(".transaction-input[name=account-options]");

    accounts.forEach(element => {
        let option = document.createElement("option");
        option.value = element.name;
        option.innerText = element.name;
        parent.appendChild(option);
    })
}

function placePhoneDetails(client_information) {
    let phone = client_information.phone;
    document.querySelector(".phone[name=phone]").innerText = phone;

}

function placeMailDetails(client_information) {
    let email = client_information.email;
    document.querySelector(".salut[name=salut]").innerText = `${email} private account`;
}

function placeAccountInformation(client_information) {
    let accounts = client_information.accounts;
    visualizeAccountIngormation(accounts);
}

function visualizeAccountIngormation(accounts) {

    let tag = document.querySelector(".balance[name=balance]");
    accounts.forEach(element => {
        let hr = document.createElement("hr");
        let clone = tag.cloneNode(true);
        clone.childNodes[1].childNodes[1].innerText = element.currency;
        clone.childNodes[1].childNodes[3].innerText = element.balance;
        clone.childNodes[3].childNodes[1].innerText = element.name;

        document.querySelector(".account[name=account]").appendChild(clone);
        document.querySelector(".account[name=account]").appendChild(hr);
    });

    let parent = document.querySelector(".account[name=account]");
    parent.removeChild(parent.childNodes[5]);
    parent.removeChild(parent.childNodes[6]);
}

function placeTransactionInformation(client_information) {
    let transactions = client_information.transactions;
    visualizeTransactionIngormation(transactions);
}

function visualizeTransactionIngormation(transactions) {

    let tag = document.querySelector(".transactions[name=transactions]");
    let parent = document.querySelector(".account[name=account-transactions]");

    transactions.forEach(element => {
        let hr = document.createElement("hr");
        let clone = tag.cloneNode(true);
        clone.childNodes[1].childNodes[1].innerText = element.currency;
        clone.childNodes[3].childNodes[1].innerText = element.debit;
        clone.childNodes[5].childNodes[1].innerText = element.credit;
        clone.childNodes[7].childNodes[1].innerText = element.details;
        parent.appendChild(clone);
        parent.appendChild(hr);
    });

    parent.removeChild(parent.childNodes[5]);
    parent.removeChild(parent.childNodes[6]);
}

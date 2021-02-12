"use strict";

function proccessTransaction(input,uid){

    let account = input["account-options"].value;
    let name = input["beneficiary"].value;
    let iban = input["IBAN"].value;
    let amount = input["amount"].value;
    let details = input["details"].value;

    alert("Transactions completed! " + amount + " will be charged from " + account + " account.");
}


"use strict";

const inirializeFirebase = () => {
    var firebaseConfig = {
        apiKey: "AIzaSyD_i1JMzrdYq4PD-VobdVqG-4-tqPVrqaE",
        authDomain: "ibank-41699.firebaseapp.com",
        projectId: "ibank-41699",
        storageBucket: "ibank-41699.appspot.com",
        messagingSenderId: "265920002717",
        appId: "1:265920002717:web:cf939d1881193e3e1cf274",
        measurementId: "G-74TLSXNENC"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
};
inirializeFirebase();
// firebase.analytics();

const loginForm = document.getElementById("form-login");
const registerForm = document.getElementById("form-register");
const indexPage = document.getElementById("index");
const transactionPage = document.getElementById("transaction-page");

const emailEl = document.querySelector(".login-input[name=email]");
const usernameEl = document.querySelector(".login-input[name=username]");
const passwordEl = document.querySelector(".login-input[name=password]");
const repeat_passwordEl = document.querySelector(".login-input[name=repeat-password]");

const changeErrorVisibility = (property, message) => {
    const error = document.getElementById(property);
    error.style.visibility = "visible";
    error.innerText = message;
}

const validateEmail = (email) => {

    const notEmpty = Boolean(email.length);
    const hasEmailSign = email.includes("@");
    const hasDot = email.includes(".");
    const minLength = email.length >= 5;

    if (notEmpty && hasEmailSign && hasDot && minLength) {
        return true;
    } else {
        if (!notEmpty) {
            changeErrorVisibility("email-error", "*Required");
        }
        else if (!minLength) {
            changeErrorVisibility("email-error", "*Size limitation: minimum 4 symbols");
        }
        else if (!hasEmailSign) {
            changeErrorVisibility("email-error", "*Missing @ symbol");
        }
        else if (!hasDot) {
            changeErrorVisibility("email-error", "*Missing . symbol");
        }
    }
}

const validateUsername = (username) => {

    const notEmpty = Boolean(username.length);
    const minLength = username.length >= 3;
    if (minLength) {
        return true;
    } else {
        if (!notEmpty) {
            changeErrorVisibility("username-error", "*Required");
        }
        else if (!minLength) {
            changeErrorVisibility("username-error", "*Size limitation: minimum 2 symbols");
        }
    }
}

const validatePassword = (password) => {

    const notEmpty = Boolean(password.length);
    const minLength = password.length >= 9;
    const hasCapitalLetter = /([A-Z])/.test(password);
    const hasNumber = /([0-9])/.test(password);
    const hasSymbol = "!@#$%^&".split("").some(sign => password.includes(sign));

    if (notEmpty && minLength && hasCapitalLetter && hasNumber && hasSymbol) {
        return true;
    } else {
        if (!notEmpty) {
            changeErrorVisibility("password-error", "*Required");
        }
        else if (!minLength) {
            changeErrorVisibility("password-error", "*Size limitation: minimum 8 symbols");
        }
        else if (!hasCapitalLetter) {
            changeErrorVisibility("password-error", "*The password must contains a capital letter");
        }
        else if (!hasNumber) {
            changeErrorVisibility("password-error", "*The password must contains a number");
        }
        else if (!hasSymbol) {
            changeErrorVisibility("password-error", "*The password must contains a symbol");
        }
    }
}

const validateRepeartPassword = (repeatedPassword, password) => {

    const notEmpty = Boolean(repeatedPassword.length);
    const equalPasswords = Boolean(repeatedPassword == password);

    if (notEmpty && equalPasswords) {
        return true;
    }
    else {
        if (!notEmpty) {
            changeErrorVisibility("v-password-error", "*Required");
        }
        else if (!equalPasswords) {
            changeErrorVisibility("v-password-error", "*The passwords are not the equal");
        }
    }
}

if (registerForm) {
    registerForm.addEventListener("submit", event => {
        event.preventDefault();

        let hasCorrectEmail = validateEmail(emailEl.value);
        let hasCorrectUsername = validateUsername(usernameEl.value);
        let hasCorrectPassword = validatePassword(passwordEl.value);
        let hasCorrectRepeatedPassword = validateRepeartPassword(repeat_passwordEl.value, passwordEl.value);

        if (hasCorrectEmail && hasCorrectUsername && hasCorrectPassword && hasCorrectRepeatedPassword) {
            firebase.auth().createUserWithEmailAndPassword(emailEl.value, passwordEl.value)
                .then((userCredential) => {
                    window.location = "/login";
                })
                .catch((error) => {
                    var errorMessage = error.message;
                    alert(errorMessage);
                });
        }
    });
} else if (loginForm) {
    loginForm.addEventListener("submit", event => {
        event.preventDefault();

        let hasCorrectEmail = validateEmail(emailEl.value);
        let hasCorrectPassword = validatePassword(passwordEl.value);

        if (hasCorrectEmail && hasCorrectPassword) {

            firebase.auth().signInWithEmailAndPassword(emailEl.value, passwordEl.value)
                .then((userCredential) => {
                    var user = userCredential.user;
                    window.location = "/Index";
                })
                .catch((error) => {
                    var errorMessage = error.message;
                    alert(errorMessage);
                });
        }
    });

}
if (indexPage) {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var uid = user.uid;
            accessData(uid, "Index");

        } else {
            window.location = "/login";
        }
    });
}

if (transactionPage) {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var uid = user.uid;
            let form = document.getElementById("transaction-form");
            accessData(uid,"transactions");

            form.addEventListener("submit", function () {
                let elements = form.elements;
                proccessTransaction(elements, uid);
            });
        } else {
            window.location = "/login";
        }
    });
}

const logOutButton = document.getElementById("logout");
if(logOutButton){
    logOutButton.addEventListener("click", event => {
        firebase.auth().signOut();
    });
}




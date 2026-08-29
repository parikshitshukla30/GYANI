/* =========================================================
   GYANI LOGIN / SIGNUP JAVASCRIPT
   File: /js/login.js

   Handles:
   - Login
   - Signup
   - Universal login
   - Password visibility
   - Login / Signup switching
   - Forgot password modal
   ========================================================= */


/* =========================================================
   ELEMENTS
   ========================================================= */

const loginForm =
    document.getElementById("loginForm");

const signupForm =
    document.getElementById("signupForm");

const loginBox =
    document.getElementById("loginBox");

const signupBox =
    document.getElementById("signupBox");

const loginMessage =
    document.getElementById("loginMessage");

const signupMessage =
    document.getElementById("signupMessage");


/* =========================================================
   LOGIN / SIGNUP SWITCHING
   ========================================================= */

const showSignupBtn =
    document.getElementById("showSignupBtn");

const showLoginBtn =
    document.getElementById("showLoginBtn");


function showLogin() {

    loginBox.style.display = "block";

    signupBox.style.display = "none";

    clearMessage(signupMessage);

}


function showSignup() {

    loginBox.style.display = "none";

    signupBox.style.display = "block";

    clearMessage(loginMessage);

}


if (showSignupBtn) {

    showSignupBtn.addEventListener(
        "click",
        showSignup
    );

}


if (showLoginBtn) {

    showLoginBtn.addEventListener(
        "click",
        showLogin
    );

}


/* =========================================================
   MESSAGE
   ========================================================= */

function showMessage(
    element,
    message
) {

    if (!element) {
        return;
    }

    element.textContent = message;

    element.classList.add("show");

}


function clearMessage(element) {

    if (!element) {
        return;
    }

    element.textContent = "";

    element.classList.remove("show");

}


/* =========================================================
   PASSWORD VISIBILITY
   ========================================================= */

const passwordButtons =
    document.querySelectorAll(
        ".password-toggle"
    );


passwordButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const inputId =
                    button.getAttribute(
                        "data-password"
                    );

                const input =
                    document.getElementById(
                        inputId
                    );


                if (!input) {
                    return;
                }


                if (
                    input.type === "password"
                ) {

                    input.type = "text";

                    button.textContent = "🙈";

                    button.setAttribute(
                        "aria-label",
                        "Hide password"
                    );

                } else {

                    input.type = "password";

                    button.textContent = "👁";

                    button.setAttribute(
                        "aria-label",
                        "Show password"
                    );

                }

            }
        );

    }
);


/* =========================================================
   SIGNUP
   ========================================================= */

if (signupForm) {

    signupForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            clearMessage(signupMessage);


            const name =
                document
                    .getElementById("signupName")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("signupEmail")
                    .value
                    .trim()
                    .toLowerCase();


            const password =
                document
                    .getElementById("signupPassword")
                    .value;


            /* ---------------------------------------------
               NAME VALIDATION
            --------------------------------------------- */

            if (name.length < 2) {

                showMessage(
                    signupMessage,
                    "Please enter your full name."
                );

                return;

            }


            /* ---------------------------------------------
               GMAIL VALIDATION
            --------------------------------------------- */

            if (
                !email.endsWith("@gmail.com")
            ) {

                showMessage(
                    signupMessage,
                    "Please enter a valid Gmail address."
                );

                return;

            }


            /* ---------------------------------------------
               PASSWORD VALIDATION
            --------------------------------------------- */

            if (
                password.length < 6
            ) {

                showMessage(
                    signupMessage,
                    "Password must contain at least 6 characters."
                );

                return;

            }


            /* ---------------------------------------------
               GET USERS
            --------------------------------------------- */

            let users = [];

            try {

                users =
                    JSON.parse(
                        localStorage.getItem(
                            "GYANI_USERS"
                        )
                    ) || [];

            } catch (error) {

                users = [];

            }


            /* ---------------------------------------------
               CHECK EXISTING ACCOUNT
            --------------------------------------------- */

            const existingUser =
                users.find(
                    function (user) {

                        return (
                            user.email === email
                        );

                    }
                );


            if (existingUser) {

                showMessage(
                    signupMessage,
                    "An account with this Gmail ID already exists."
                );

                return;

            }


            /* ---------------------------------------------
               CREATE USER
            --------------------------------------------- */

            const newUser = {

                name: name,

                email: email,

                password: password

            };


            users.push(newUser);


            localStorage.setItem(
                "GYANI_USERS",
                JSON.stringify(users)
            );


            /* ---------------------------------------------
               SUCCESS
            --------------------------------------------- */

            showMessage(
                signupMessage,
                "Account created successfully. Redirecting to login..."
            );


            signupForm.reset();


            setTimeout(
                function () {

                    showLogin();

                    const loginEmail =
                        document.getElementById(
                            "loginEmail"
                        );

                    if (loginEmail) {

                        loginEmail.value =
                            email;

                    }

                },
                1000
            );

        }
    );

}


/* =========================================================
   LOGIN
   ========================================================= */

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            clearMessage(loginMessage);


            const loginId =
                document
                    .getElementById("loginEmail")
                    .value
                    .trim()
                    .toLowerCase();


            const password =
                document
                    .getElementById("loginPassword")
                    .value;


            /* ---------------------------------------------
               UNIVERSAL LOGIN
            --------------------------------------------- */

            if (
                loginId === "user123" &&
                password === "pass1234"
            ) {

                localStorage.setItem(
                    "GYANI_LOGIN",
                    "user123"
                );


                localStorage.setItem(
                    "GYANI_USER_NAME",
                    "Universal User"
                );


                window.location.href =
                    "html/indexdash.html";


                return;

            }


            /* ---------------------------------------------
               REGISTERED USERS
            --------------------------------------------- */

            let users = [];

            try {

                users =
                    JSON.parse(
                        localStorage.getItem(
                            "GYANI_USERS"
                        )
                    ) || [];

            } catch (error) {

                users = [];

            }


            const user =
                users.find(
                    function (account) {

                        return (
                            account.email === loginId &&
                            account.password === password
                        );

                    }
                );


            /* ---------------------------------------------
               INVALID LOGIN
            --------------------------------------------- */

            if (!user) {

                showMessage(
                    loginMessage,
                    "Invalid Gmail ID/User ID or password."
                );

                return;

            }


            /* ---------------------------------------------
               SUCCESSFUL LOGIN
            --------------------------------------------- */

            localStorage.setItem(
                "GYANI_LOGIN",
                user.email
            );


            localStorage.setItem(
                "GYANI_USER_NAME",
                user.name
            );


            /* ---------------------------------------------
               REDIRECT
            --------------------------------------------- */

            window.location.href =
                "html/indexdash.html";

        }
    );

}


/* =========================================================
   FORGOT PASSWORD MODAL
   ========================================================= */

const forgotModal =
    document.getElementById("forgotModal");

const forgotPasswordBtn =
    document.getElementById(
        "forgotPasswordBtn"
    );

const closeForgotBtn =
    document.getElementById(
        "closeForgotBtn"
    );

const closeForgotBtnBottom =
    document.getElementById(
        "closeForgotBtnBottom"
    );


/* =========================================================
   OPEN MODAL
   ========================================================= */

function openForgotPassword() {

    if (!forgotModal) {
        return;
    }

    forgotModal.classList.add("show");

    forgotModal.setAttribute(
        "aria-hidden",
        "false"
    );

}


/* =========================================================
   CLOSE MODAL
   ========================================================= */

function closeForgotPassword() {

    if (!forgotModal) {
        return;
    }

    forgotModal.classList.remove("show");

    forgotModal.setAttribute(
        "aria-hidden",
        "true"
    );

}


if (forgotPasswordBtn) {

    forgotPasswordBtn.addEventListener(
        "click",
        openForgotPassword
    );

}


if (closeForgotBtn) {

    closeForgotBtn.addEventListener(
        "click",
        closeForgotPassword
    );

}


if (closeForgotBtnBottom) {

    closeForgotBtnBottom.addEventListener(
        "click",
        closeForgotPassword
    );

}


/* =========================================================
   CLOSE MODAL BY CLICKING OUTSIDE
   ========================================================= */

if (forgotModal) {

    forgotModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                forgotModal
            ) {

                closeForgotPassword();

            }

        }
    );

}


/* =========================================================
   CLOSE MODAL WITH ESCAPE
   ========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            forgotModal &&
            forgotModal.classList.contains("show")
        ) {

            closeForgotPassword();

        }

    }
);

function processSignUpForm(e) {
    if (e.preventDefault) e.preventDefault();

    let usernameInput = document.querySelector("#txtSignUpUsername").value;
    let passwordInput = document.querySelector("#txtSignUpPassword").value;

    var SignUpDataToServer = {
        Username: usernameInput,
        Password: passwordInput
    };


    console.log(usernameInput);
    console.log(passwordInput);

    $.ajax({
        type: 'POST',
        url: '../php/SignUp_Process.php',
        data: SignUpDataToServer,
        success: function (data, status) {
            console.log(status);

            var userSignUp = null;

            try {
                userSignUp = JSON.parse(data);
            } catch (error) {
                console.log("Something went wrong with sign up: " + error);
            }

            console.log(userSignUp);

            if (userSignUp === "success") {
                resultHtml = '<div class="alert alert-success" role="alert"><i class="fas fa-check"></i> Successfully created account.</div>';
                displaySignUpMessage(resultHtml);
                countDown();
            } else if (userSignUp === "failed") {
                resultHtml = '<div class="alert alert-danger" role="alert"><i class="fas fa-exclamation-triangle"></i> Account with this username already exists, pleast try a different one.</div>';
                displaySignUpMessage(resultHtml);
            }
        }
    });
}

function displaySignUpMessage(resultHtml) {
    var divSignUpMessage = document.querySelector('#divSignUpMessage');
    divSignUpMessage.innerHTML = resultHtml;
}

var count = 4;

function countDown() {
    var timer = document.querySelector("#divRedirectMessage");
    if (count > 0) {
        count--;
        timer.innerHTML = "This page will redirect in " + count + " seconds.";
        setTimeout("countDown()", 1000);
    } else {
        window.location.href = "Login.html";
    }
}

document.querySelector('#formSignUp').addEventListener("submit", processSignUpForm);
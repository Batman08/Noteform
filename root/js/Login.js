function processLoginForm(e) {
    if (e.preventDefault) e.preventDefault();

    let usernameInput = document.querySelector("#txtLoginUsername").value;
    let passwordInput = document.querySelector("#txtLoginPassword").value;

    var loginDataToServer = {
        Username: usernameInput,
        Password: passwordInput
    };

    $.ajax({
        type: 'POST',
        url: '../php/Login_Authenticate.php',
        data: loginDataToServer,
        success: function (data, status) {

            var userLogin = null;

            try {
                userLogin = JSON.parse(data);
            } catch (error) {
                console.log("Username does not exist in system: " + error);
            }

            console.log(userLogin.UserId)
            console.log(status);

            let loginDetailsMatch = userLogin !== null && loginDataToServer.Username === userLogin.Username && loginDataToServer.Password === userLogin.Password;
            if (loginDetailsMatch) {
                localStorage.setItem("UserId", userLogin.UserId);
                document.querySelector('#formLogin').reset();
                window.location.href = "Notes.html";
            } else {
                resultHtml = '<div class="alert alert-danger" role="alert"><i class="fas fa-exclamation-triangle"></i> Incorrect username and/or password, please try again.</div>';
                displayLoginErrorMsg(resultHtml)
            }
        }
    });
}

function displayLoginErrorMsg(resultHtml) {
    var divLoginMessage = document.querySelector('#divLoginMessage');
    divLoginMessage.innerHTML = resultHtml;
}

document.querySelector('#formLogin').addEventListener("submit", processLoginForm);
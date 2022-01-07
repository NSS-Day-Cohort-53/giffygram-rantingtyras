import { getUsers, setCurrentUser } from "../data/provider.js"


document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "loginButton") {
        let foundUser = null
        const userState = getUsers()

        const email = document.querySelector("input[name='email']").value
        const password = document.querySelector("input[name='password']").value
        const loginErrorAlertElement = document.getElementById("loginErrorAlert");

        if (!email || !password ) {
            loginErrorAlertElement.classList.add("visible");
            loginErrorAlertElement.setAttribute("hidden", false);
        } else {
            for (const user of userState) {
                if (user.email === email && user.password === password) {
                    foundUser = user
                    setCurrentUser(foundUser)
                }
            }
    
            if (foundUser !== null) {
                localStorage.setItem("gg_user", foundUser.id)
                document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged"))
            } else {
                loginErrorAlertElement.classList.remove("visible");
                loginErrorAlertElement.setAttribute("hidden", true);

                const userNotFoundAlertElement = document.getElementById("userNotFoundAlert");
                userNotFoundAlertElement.classList.add("visible");
                userNotFoundAlertElement.setAttribute("hidden", false);
            }
        }

    }
})

export const LoginForm = () => {
    return `
        <div class="loginForm">
            <h1>Login</h1>   
            <form>
                <fieldset>
                    <label for="email">Email:</label>
                    <input type="text" name="email" autofocus placeholder="Email address" />
                </fieldset>
                <fieldset>
                    <label for="password">Password:</label>
                    <input type="password" name="password" placeholder="Password" />
                </fieldset>
            </form>
            <button id="loginButton">Login</button>
            <button id="registerButton">I Am A New User</button>
            <span id="loginErrorAlert" hidden="true">Please enter all fields</span>
            <span id="userNotFoundAlert" hidden="true">No account found with those credentials</span>
        </div>
    `
}

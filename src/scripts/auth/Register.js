
export const registerNewUser = ()=> {
  return  `<div class="registerForm">
        <h1>Register</h1>
            <form>
            <fieldset>
                    <label for="name">Name:</label>
                    <input type="text" id="regName" name="name" autofocus placeholder="Name" />
                </fieldset>
                <fieldset>
                    <label for="email">Email:</label>
                    <input type="text" id="regEmail" name="email" autofocus placeholder="Email address" />
                </fieldset>
                <fieldset>
                    <label for="password">Password:</label>
                    <input id="regPass" type="password" name="password" placeholder="Password" />
                </fieldset>
            </form>
            <button id="createNewAcctBtn">Create New Account</button>
        </div>`
}


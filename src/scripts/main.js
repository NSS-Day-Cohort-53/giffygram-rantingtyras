import { GiffyGram } from "./GiffyGram.js";
import { LoginForm } from "./auth/Login.js";
import {
    fetchLikes,
    fetchMessages,
    fetchPosts,
    fetchUsers,
    getUsers,
    postUser,
    setCurrentUser
} from "./data/provider.js";
import { registerNewUser } from "./auth/Register.js";

const applicationElement = document.querySelector(".giffygram");

export const renderApp = () => {
    Promise.all([fetchUsers(), fetchMessages(), fetchLikes(), fetchPosts()]).then(
        () => {
            const user = parseInt(localStorage.getItem("gg_user"));

            if (user) {
                const users = getUsers();
                setCurrentUser(users.find(userObj => userObj.id === user));
                applicationElement.innerHTML = GiffyGram();
            } else {
                applicationElement.innerHTML = LoginForm();
            }
        }
    );
};

renderApp();

applicationElement.addEventListener("stateChanged", event => {
    renderApp();
  })


  //this listens for clicks for registering new users
  addEventListener("click", (event)=> {
    if (event.target.id === "registerButton")
    {
        document.querySelector(".giffygram").innerHTML = registerNewUser();
    }

    if  (event.target.id === "createNewAcctBtn")
    {
        const email = document.querySelector("#regEmail").value;
        const password = document.querySelector("#regPass").value;
        const name = document.querySelector("#regName").value;

        if (email.length >0 && password.length >0 && name.length > 0)
        {

        const newUser = {
            name: name,
            email: email,
            password: password
            }

            postUser(newUser).then(()=>renderApp())

            
        }
        else {
            window.alert("please fill in all fields");
        }
    }
})
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
import { msgSubmission } from "./message/MessageForm.js";

const applicationElement = document.querySelector(".giffygram");

export const renderApp = () => {
    return Promise.all([fetchUsers(), fetchMessages(), fetchLikes(), fetchPosts()]).then(
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


applicationElement.addEventListener("messageSent", event => {
    const render = new Promise(function(resolve) {
        resolve(renderApp());
    });

    render 
    .then(()=> {
        document.querySelector("#msgForm").innerHTML= msgSubmission();
        
        const msgSentAlertElement = document.getElementById("msgSentAlert");
        msgSentAlertElement.classList.add("visible");
        msgSentAlertElement.setAttribute("hidden", false);
    })
})


//this listens for clicks for registering new users
applicationElement.addEventListener("click", (event) => {
    if (event.target.id === "registerButton")
    {
        document.querySelector(".giffygram").innerHTML = registerNewUser();
    } 

    if (event.target.id === "backBtn") {
        applicationElement.innerHTML = LoginForm();
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
            const regErrorAlertElement = document.getElementById("regErrorAlert");
            regErrorAlertElement.classList.add("visible");
            regErrorAlertElement.setAttribute("hidden", false);
        }
    }
})
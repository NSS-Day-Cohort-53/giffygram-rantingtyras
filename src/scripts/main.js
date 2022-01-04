import { GiffyGram } from "./GiffyGram.js";
import { LoginForm } from "./auth/Login.js";
import {
    fetchLikes,
    fetchMessages,
    fetchPosts,
    fetchUsers,
} from "./data/provider.js";

const applicationElement = document.querySelector(".giffygram");

export const renderApp = () => {
    Promise.all([fetchUsers(), fetchMessages(), fetchLikes(), fetchPosts()]).then(
        () => {
            const user = parseInt(localStorage.getItem("gg_user"));

            if (user) {
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
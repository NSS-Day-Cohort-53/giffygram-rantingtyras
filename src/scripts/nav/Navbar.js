import { getMessages, getCurrentUser, setFeedChosenUser, setFeedChosenYear, setFeedDisplayFavorites, setFeedDisplayMessages } from "../data/provider.js";

export const Navbar = () => {
    let messages = getMessages();
    const currentUser = getCurrentUser();

    messages = messages.filter(
        (message) => message.recipientId === currentUser.id && !message.read
    );
    const messageCount = messages.length;

    return `
        <nav class="navigation">
            <div class="navigation__icon navigation__item">
                <img src="./images/pb.png" alt="Giffygram icon" id="logo" />
            </div>
            <div class="navigation__item navigation__name">
                Giffygram
            </div>
            <div class="navigation__item navigation__message" >
                <img src="./images/fountain-pen.svg" alt="Direct message" id="directMessageIcon"/>
                <div class="notification__count" id="notification">${messageCount}</div>               
            </div>
            <div class="navigation__item navigation__logout">
                <button id="logout" class="fakeLink">Logout</button>
            </div>
        </nav>
    `;
};

const applicationElement = document.querySelector(".giffygram");

applicationElement.addEventListener("click", (event) => {
    if (event.target.id === "logo") {
        setFeedChosenUser(null)
        setFeedChosenYear(null)
        setFeedDisplayMessages(false)
        setFeedDisplayFavorites(false)
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    } else if (event.target.id === "directMessageIcon") {
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    } else if (event.target.id === "notification") {
        setFeedDisplayMessages(true);
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    } else if (event.target.id === "logout") {
        localStorage.removeItem("gg_user");
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    }
});

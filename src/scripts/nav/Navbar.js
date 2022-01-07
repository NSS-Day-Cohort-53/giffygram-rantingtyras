import { getMessages, getCurrentUser, setFeedChosenUser, setFeedChosenYear, setFeedDisplayFavorites, setFeedDisplayMessages, setFeedDisplayProfile, setUserProfileId } from "../data/provider.js";

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
            <div class="navigation__item navigation__search">
                <input type="search" id="postSearch" name="postSearch">
                <button name="postSearchBtn" id="postSearchBtn" for="postSearch">Search</label>
            </div>
            <div class="navigation__item navigation__message" >
                <img src="./images/fountain-pen.svg" alt="Direct message" id="directMessageIcon"/>
                <div class="notification__count" id="notification"><span>${messageCount}</span></div>               
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
        setFeedDisplayProfile(false)
        setUserProfileId(null)
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    } else if (event.target.id === "directMessageIcon") {
        //applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    } else if (event.target.id === "notification") {
        setFeedDisplayMessages(true);
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    } else if (event.target.id === "logout") {
        localStorage.removeItem("gg_user");
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    }
});

applicationElement.addEventListener("click", (event) => {
    if (event.target.id === "profile__close") {
        setFeedChosenUser(null)
        setFeedChosenYear(null)
        setFeedDisplayMessages(false)
        setFeedDisplayFavorites(false)
        setFeedDisplayProfile(false)
        setUserProfileId(null)
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    } else if (event.target.id === "directMessageIcon") {
        //applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    } else if (event.target.id === "notification") {
        setFeedDisplayMessages(true);
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    } else if (event.target.id === "logout") {
        localStorage.removeItem("gg_user");
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    }
});

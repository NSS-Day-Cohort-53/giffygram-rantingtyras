import { getUsers, getPosts, toggleFeedDisplayFavorites, setFeedChosenUser, getFeed } from "../data/provider.js";

export const Footer = () => {
    const users = getUsers();
    const posts = getPosts();
    const yearsSet = new Set();
    posts.forEach(post => {
        const year = new Date(post.timestamp).getFullYear();
        yearsSet.add(year);
    })
    const yearsArray = Array.from(yearsSet);
    yearsArray.sort((a, b) => a - b);

    return `
        <footer class="footer">
            <div class="footer__item">
                <select id="yearSelection">
                    <option value="0">Select year</option>
                    ${yearsArray.map(year => `<option value=year>${year}</option>`).join("")}
                </select>
                <span id="postCount"></span>
            </div>
            <div class="footer__item">
                <label for="userSelection">Posts by user</label>
                <select id="userSelection" name="userSelection">
                    <option value="0" ${getFeed().chosenUser === null ? `selected` : ''}>All</option></option>
                    ${users.map(user => `<option value=${user.id} ${getFeed().chosenUser === user.id ? `selected` : ''}>${user.name}</option>`).join("")}
                </select>
            </div>
            <div class="footer__item">
                <label for="showOnlyFavorites">Show only favorites</label>
                <input id="showOnlyFavorites" type="checkbox" ${getFeed().displayFavorites ? "checked" : ""} />
            </div>
        </footer>
    `;
};

const applicationElement = document.querySelector(".giffygram");

applicationElement.addEventListener("change", (event) => {
    if (event.target.id === "showOnlyFavorites") {
        toggleFeedDisplayFavorites();
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    } else if (event.target.id === "userSelection") {
        if (event.target.value === 0) {
            setFeedChosenUser(null)
        } else {
            setFeedChosenUser(parseInt(event.target.value))
        }
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    } else if (event.target.id === "yearSelection") {  
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    }
});

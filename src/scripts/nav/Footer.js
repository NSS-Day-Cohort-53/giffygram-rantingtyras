import { getUsers, getPosts, toggleFeedDisplayFavorites, setFeedChosenUser, getFeed, setFeedChosenYear } from "../data/provider.js";

export const Footer = () => {
    const users = getUsers();
    const posts = getPosts();
    const feed = getFeed();

    // make new set to keep track of unique years
    const yearsSet = new Set();
    // make object with {year: postCount} pairing to keep track of number of posts in a given year
    const yearsPostCountObj = {};

    // fill set with years, keep track of post count for a given year 
    posts.forEach(post => {
        // get year from post's timestamp
        const year = new Date(post.timestamp).getFullYear();

        // if this is the first time encountering the year, add an key:value pair for that year to keep track of post count
        if (!yearsSet.has(year)) {
            yearsPostCountObj[year] = 1;
        } else {
            // given that year has already been encountered, increment post count for that year by one
             yearsPostCountObj[year] = yearsPostCountObj[year] + 1;
        }

        // add year to set. If it already exists, set will not add it
        yearsSet.add(year);
    })

    // calculate total number of posts form yearsPostCountObj
    let totalPosts = 0
    if (Object.keys(yearsPostCountObj).length !== 0) {
        totalPosts = Object.values(yearsPostCountObj).reduce((a, b) => a + b)
    }

    // make array from yearsSet for easy sorting and mapping
    const yearsArray = Array.from(yearsSet);

    // sort array from earliest year to latest year
    yearsArray.sort((a, b) => a - b);

    return `
        <footer class="footer">
            <div class="footer__item">
                <select id="yearSelection">
                    <option value="0" ${feed.chosenYear === null ? `selected` : ''}>All</option>
                    ${yearsArray.map(year => `<option value=${year} ${feed.chosenYear === year ? `selected` : ''}>${year}</option>`).join("")}
                </select>
                <span id="postCount">${feed.chosenYear === null ? totalPosts : yearsPostCountObj[feed.chosenYear]}</span>
            </div>
            <div class="footer__item">
                <label for="userSelection">Posts by user</label>
                <select id="userSelection" name="userSelection">
                    <option value="0" ${feed.chosenUser === null ? `selected` : ''}>All</option></option>
                    ${users.map(user => `<option value=${user.id} ${feed.chosenUser === user.id ? `selected` : ''}>${user.name}</option>`).join("")}
                </select>
            </div>
            <div class="footer__item">
                <label for="showOnlyFavorites">Show only favorites</label>
                <input id="showOnlyFavorites" type="checkbox" ${feed.displayFavorites ? "checked" : ""} />
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
        if (event.target.value === 0) {
            setFeedChosenYear(null);
        }  else {
            setFeedChosenYear(parseInt(event.target.value))
        }
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    }
});

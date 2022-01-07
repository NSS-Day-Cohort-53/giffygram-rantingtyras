import {
    getUsers,
    getPosts,
    getLikes,
    toggleFeedDisplayFavorites,
    setFeedChosenUser,
    getFeed,
    setFeedChosenYear,
    getCurrentUser,
    getFollows
} from "../data/provider.js";

export const Footer = () => {
    const users = getUsers();
    let posts = getPosts();
    const feed = getFeed();
    const likes = getLikes();
    const currentUser = getCurrentUser();

    // change posts array to include only those of the chosen user
    if (feed.chosenUser) {
        posts = posts.filter((post) => feed.chosenUser === post.userId);
    }

    // change posts array to include only the currentUser's favorites
    if (feed.displayFavorites) {
        const currentUserLikes = likes.filter(
            (like) => like.userId === currentUser.id
        );
        posts = posts.filter((post) =>
            currentUserLikes.find((like) => like.postId === post.id)
        );
    }

    // make new set to keep track of unique years
    const yearsSet = new Set();
    // make object with {year: postCount} pairing to keep track of number of posts in a given year
    const yearsPostCountObj = {};

    // fill set with years, keep track of post count for a given year
    posts.forEach((post) => {
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
    });

    // change posts array to include only those of the chosen year
    if (feed.chosenYear) {
        posts = posts.filter((post) => {
            const year = new Date(post.timestamp).getFullYear();
            return feed.chosenYear === year;
        });
    } else {
        feed.chosenYear = null;
    }

    // calculate total number of posts form yearsPostCountObj
    let totalPosts = 0;
    if (Object.keys(yearsPostCountObj).length !== 0) {
        totalPosts = Object.values(yearsPostCountObj).reduce((a, b) => a + b);
    }

    // make array from yearsSet for easy sorting and mapping
    const yearsArray = Array.from(yearsSet);

    // sort array from earliest year to latest year
    yearsArray.sort((a, b) => a - b);

    return `
        <footer class="footer">
            <div class="footer__item">
                <select id="yearSelection">
                    <option value="0" ${
                        feed.chosenYear === null ? `selected` : ""
                    }>All</option>
                    ${yearsArray
                        .map(
                            (year) =>
                                `<option value=${year} ${
                                    feed.chosenYear === year ? `selected` : ""
                                }>${year}</option>`
                        )
                        .join("")}
                </select>
                <span id="postCount">${
                    feed.chosenYear === null || posts.length === 0
                        ? totalPosts
                        : yearsPostCountObj[feed.chosenYear]
                }</span>
            </div>
            <div class="footer__item">
                <label for="userSelection">Posts by user</label>
                <select id="userSelection" name="userSelection">
                    <option value="0" ${
                        feed.chosenUser === null ? `selected` : ""
                    }>All</option>
                    <option value="69">following</option>
                    ${users
                        .map(
                            (user) =>
                                `<option value=${user.id} ${
                                    feed.chosenUser === user.id
                                        ? `selected`
                                        : ""
                                }>${user.name}</option>`
                        )
                        .join("")}
                </select>
            </div>
            <div class="footer__item">
                <label for="showOnlyFavorites">Show only favorites</label>
                <input id="showOnlyFavorites" type="checkbox" ${
                    feed.displayFavorites ? "checked" : ""
                } />
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
        if (parseInt(event.target.value === 0)) {
            setFeedChosenUser(null);
        } else if (event.target.value !== 0) {
            //here specify what to do if folowing is chosen
            if (parseInt(event.target.value) !== 69)
            {
            setFeedChosenYear(null);
            setFeedChosenUser(parseInt(event.target.value));
            }
            else 
            {
               const follows = getFollows();
               let currUserFlws = [];
               follows.then((follows)=> follows.map((follow)=> {
                   if (follow.followerId === parseInt(localStorage.gg_user))
                   {
                       currUserFlws.push(follow);
                   } 
               })).then(()=>{
                   console.log(currUserFlws)
                setFeedChosenUser(currUserFlws);
                setFeedChosenYear(null);
               })
                /*sort through the followers
                put all the followerids that = this usercurrent 
                and push them into an array*/
            }
        } else {
            setFeedChosenUser(parseInt(event.target.value));
        }
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    } else if (event.target.id === "yearSelection") {
        if (parseInt(event.target.value === 0)) {
            setFeedChosenYear(null);
        } else {
            setFeedChosenYear(parseInt(event.target.value));
        }
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    }
});

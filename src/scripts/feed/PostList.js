import { getFeed, getPosts, getUsers } from "../data/provider.js";

export const postFeed = () => {
    let posts = getPosts();
    let users = getUsers();
    const feed = getFeed();

    // change posts array to include only those of the chosen year
    if (feed.chosenYear) {
        posts = posts.filter(post => {
            const year = new Date(post.timestamp).getFullYear();
            return feed.chosenYear === year;
        })
    }

    // change posts array to include only those of the chosen user
    if (feed.chosenUser) {
        posts = posts.filter(post => feed.chosenUser === post.userId)
    }

    if (feed.displayFavorites) {
        
    }

    let html = `<ul>`;
    const buildPostFeed = posts.map((post) => {
        let foundUser = users.find((user) => user.id === post.userId);
        return `<li>
            <p>${post.title}</p>
            <p><img src="${post.imageUrl}" alt=""></p>
            <p>${post.description}</p>
            <p>Post By: ${foundUser.name} at ${post.timestamp}</p>
            </li>`;
    });
    html += buildPostFeed.join("");
    html += `</ul>`;
    return html;
};

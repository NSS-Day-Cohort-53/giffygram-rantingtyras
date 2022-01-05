import { getCurrentUser, getFeed, getLikes, getPosts, getUsers } from "../data/provider.js";

export const postFeed = () => {
    let posts = getPosts();
    const users = getUsers();
    const likes = getLikes();
    const feed = getFeed();
    const currentUser = getCurrentUser();

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

    // change posts array to include only the currentUser's favorites
    if (feed.displayFavorites) {
        const currentUserLikes = likes.filter(like => like.userId === currentUser.id)
        posts = posts.filter(post => currentUserLikes.find(like => like.postId === post.id))
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

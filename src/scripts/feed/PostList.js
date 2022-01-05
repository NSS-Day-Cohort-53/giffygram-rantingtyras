/*import { getCurrentUser, getFeed, getLikes, getPosts, getUsers } from "../data/provider.js";

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
};*/








import { getPosts, getUsers, deletePost } from "../data/provider.js";
import { renderApp } from "../main.js";

export const postFeed = () => {
    const posts = getPosts()
    const users = getUsers()
    let html = `<ul>`
    const buildPostFeed = posts.map((post) => {
        let foundUser = users.find(user => user.id === post.userId);

        let currentUserId =localStorage.gg_user;
     if (parseInt(currentUserId) === parseInt(foundUser.id))
     {
         return `<li>
         <p>${post.title}</p>
         <p><img src="${post.imageUrl}" alt=""></p>
         <p>${post.description}</p>
         <p>Post By: ${foundUser.name} at ${post.timestamp}</p>
         <button id="deletePost--button-${post.id}">Delete</button>
         </li>
         <br></br>
         <br></br>
         <br></br>`
     }
     else 
     {
         return `<li>
         <p>${post.title}</p>
         <p><img src="${post.imageUrl}" alt=""></p>
         <p>${post.description}</p>
         <p>Post By: ${foundUser.name} at ${post.timestamp}</p>
         </li>`
     }
     })
     //this line will populate a delete button only if the gif belongs to the logged in user

     html += buildPostFeed.join("")
     html+=`</ul>`
     return html
    }

    document.addEventListener("click", (event)=> {
        if (event.target.id.startsWith("deletePost--button"))
        {
            let postId =event.target.id.substr(19);
            deletePost(postId)
            renderApp();
        }
    }) 
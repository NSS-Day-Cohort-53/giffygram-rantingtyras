import { getPosts, getUsers, deletePost } from "../data/provider.js";

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
        document.dispatchEvent(new CustomEvent("stateChanged"))
    }
})
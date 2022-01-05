import { getPosts, getUsers } from "../data/provider.js";

export const postFeed = () => {
    const posts = getPosts()
    const users = getUsers()
    let html = `<ul>`
    const buildPostFeed = posts.map((post) => {
            let foundUser = users.find(user => user.id === post.userId)
            return `<li>
            <p>${post.title}</p>
            <p><img src="${post.imageUrl}" alt=""></p>
            <p>${post.description}</p>
            <p>Post By: ${foundUser.name} at ${post.timestamp}</p>
            <img class="star__notFave" id="${post.id}" name="star__notFave" src="../images/favorite-star-blank.svg" alt="">
            </li>`
        })
        html += buildPostFeed.join("")
        html+=`</ul>`
        return html
}

document.addEventListener("click", clickEvent => {
    if (clickEvent.target.name === "star__notFave") {
        const posts = getPosts()
        favPost = posts.find(post => post.id === clickEvent.target.id)
        const userId = localStorage.gg_user
        const postId = favPost.id

        const dataToSendToApi = {
                userId: userId,
                postId: postId
        }
        sendFav(dataToSendToApi)
    }
    })

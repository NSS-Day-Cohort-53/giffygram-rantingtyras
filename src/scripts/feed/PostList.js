import { getPosts, getUsers, sendFav, getLikes, deleteFav } from "../data/provider.js";

let star

export const postFeed = () => {
    const posts = getPosts()
    const users = getUsers()
    const likes = getLikes()
    let html = `<ul>`
    const buildPostFeed = posts.map((post) => {
            let foundUser = users.find(user => user.id === post.userId)
            return `<li>
            <p>${post.title}</p>
            <p><img src="${post.imageUrl}" alt=""></p>
            <p>${post.description}</p>
            <p>Post By: ${foundUser.name} at ${post.timestamp}</p>
            <img id="${post.id}" ${likes.find(like => like.userId === parseInt(localStorage.gg_user) && like.postId === post.id) ? star = `class="star" name="star__fave" src="../images/favorite-star-yellow.svg" alt="Yellow Star"` : star = `class="star" name="star__notFave" src="../images/favorite-star-blank.svg" alt="Empty Star"`}>
            </li>`
        })
        html += buildPostFeed.join("")
        html +=`</ul>`
        return html
}


document.addEventListener("click", clickEvent => {
    if (clickEvent.target.name === "star__notFave") {
        const posts = getPosts()
        const favPost = posts.find(post => post.id === parseInt(clickEvent.target.id))
        const userId = parseInt(localStorage.gg_user)
        const postId = favPost.id

        const dataToSendToApi = {
                userId: userId,
                postId: postId
        }

        sendFav(dataToSendToApi)
    } else {
        if (clickEvent.target.name === "star__fave") {
            const likes = getLikes()
            const unFavePost = likes.find((like) => like.postId === parseInt(clickEvent.target.id) && like.userId === parseInt(localStorage.gg_user))
            const unFaveId = unFavePost.id
            deleteFav(unFaveId)
        }
    }
})

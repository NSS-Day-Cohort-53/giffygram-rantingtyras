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
            </li>`
        })
        html += buildPostFeed.join("")
        html+=`</ul>`
        return html
}
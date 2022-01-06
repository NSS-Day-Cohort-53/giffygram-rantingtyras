import { getUsers, getPosts, getCurrentUser, getFeed, getMessages } from "../data/provider.js";

export const profileFeed = () => {
    const feed = getFeed()
    const users = getUsers()
    const posts = getPosts()
    const currentUser = getCurrentUser()
    const messages = getMessages()
    const userId = parseInt(feed.UserProfileId)
    const user = users.find(user => user.id === userId)
    const userPosts = posts.filter(post => post.userId === user.id)
    const numOfPosts = userPosts.length
    const messageSentArr = messages.filter(message => (message.userId === currentUser.id) && (message.recipientId === user.id))
    const messageRecArr = messages.filter(message => (message.userId === user.id) && (message.recipientId === currentUser.id))
    const messageArr = messageSentArr.concat(messageRecArr)
    const messageList = () => {
        let html = `<ul>`
        const messageArray = messageArr.map((message) => {
            return `<li>
            <p>From: ${message.userId}</p>
            <p>To: ${message.recipientId}</p>
            <p>${message.text}</p>
            </li>`
        })

        html += messageArray.join("")
        html += `</ul>`
        return html
    }
    
    return `
    <h2>${user.name}</h2>
    <br>
    <p>Total Number of Posts: ${numOfPosts}</p>
    <p>${messageList()}</p>
    `
}
//Messages Between logged in and profiled user in descending chronological order
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
    const messageArr = messages.filter((message) => {
        (message.userId === currentUser.id && message.recipientId === user.id)
        // ||
        // (message.userId === user.id && message.recipientId === currentUser.id)
    })
    console.log(messageArr)
    return `
    <h2>${user.name}</h2>
    <br>
    <p>Total Number of Posts: ${numOfPosts}</p>
    `
}
//Messages Between logged in and profiled user in descending chronological order


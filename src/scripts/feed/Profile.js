import { getUsers, getPosts, getCurrentUser, getFeed, getMessages, setUserFollow } from "../data/provider.js";

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

    const finalMessageArr = () => {
        if (currentUser.id === user.id) {
        const messageSentArr = messages.filter(message => (message.userId === currentUser.id) && (message.recipientId === user.id))
        return messageSentArr
    } else {
        const messageRecArr = messages.filter(message => (message.userId === user.id) && (message.recipientId === currentUser.id))
        const messageSentArr = messages.filter(message => (message.userId === currentUser.id) && (message.recipientId === user.id))
        const unorderedMessageArr = messageSentArr.concat(messageRecArr)
        return unorderedMessageArr
    }}
    
    const messageArr = finalMessageArr().sort((a, b) => b.id - a.id);

    const messageList = () => {
        let html = `<ul>`
        const messageArray = messageArr.map((message) => {
            const messageSender = users.find(user => user.id === message.userId)
            const messageRecipient = users.find(user => user.id === message.recipientId)
            return `<li>
            <p>From: ${messageSender.name}</p>
            <p>To: ${messageRecipient.name}</p>
            <p>${message.text}</p>
            </li>`
        })

        html += messageArray.join("")
        html += `</ul>`
        return html
    }
    
    return `
    <h2>${user.name}</h2>
    <button id="follow--button"> Follow </button>
    <br>
    <p>Total Number of Posts: ${numOfPosts}</p>
    <p>${messageList()}</p>
    `
}

document.addEventListener("click", (event)=>{
    if (event.target.id === "follow--button")
    {
        const feed = getFeed()
        const userId = parseInt(feed.UserProfileId)
        const user = getUsers().find(user => user.id === userId)
        console.log(user.name)


        let personToFollowId =parseInt(user.id)
        let currUserID = parseInt(localStorage.gg_user);
       
        let followObj = {
            followedId: personToFollowId,
            followerId: currUserID
        }
        setUserFollow(followObj);
    }
})
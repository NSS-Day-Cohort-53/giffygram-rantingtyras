import { getUsers, getPosts, getCurrentUser, getFeed, getMessages, getLikes } from "../data/provider.js";

export const profileFeed = () => {
    let star;
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
    
    const userPostList = posts.filter(post => post.userId === user.id)
    userPostList.sort((a, b) => b.timestamp - a.timestamp);

    const postList = () => {
        let html = `<ul>`

        const postHtml = userPostList.map((post) => {
            const likes = getLikes()
            return `<li>
            <h3 class="post__remark">${post.title}</h3>
            <img src="${post.imageUrl}" alt="" class="post__image">
            <div class="">${post.description}</div>
            <div class="post__tagline">Post By:
            <span class="profileLink" name="profileName" id="${user.id}">
                ${user.name}
            </span> at ${new Date(post.timestamp).toLocaleString()}
            </div>
        <div class="post__actions">
        <img class="star" id="${post.id}" ${
            likes.find(
            (like) =>
                like.userId === parseInt(localStorage.gg_user) &&
                like.postId === post.id
            )
            ? (star = `class="star" name="star__fave" src="../images/favorite-star-yellow.svg" alt="Yellow Star"`)
            : (star = `class="star" name="star__notFave" src="../images/favorite-star-blank.svg" alt="Empty Star"`)
        }>
        ${parseInt(currentUser.id) === parseInt(user.id) ? `<img src="./images/block.svg" id="deletePost--button-${post.id}" class="star"/>` : ``}

            
    </div>
            </li>`
    
        })
        
        html += postHtml.join("")
        html += `</ul>`
        return html
    }

    return `
    <h2>${user.name}</h2>
    <br>
    <p>Total Number of Posts: ${numOfPosts}</p>
    <p>${messageList()}</p>
    <p>${postList()}</p>
    `
}

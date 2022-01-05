const apiURL = "http://localhost:8088";
const applicationElement = document.querySelector(".giffygram");

const applicationState = {
    users: [],
    posts: [],
    likes: [],
    messages: [],
    currentUser: {},
    feed: {
        chosenUser: null,
        displayFavorites: false,
        displayMessages: false,
    },
};

const setOptions = (arg)=> ({
    method: "POST",
    headers: {"Content-Type": 'application/json'},
    body: JSON.stringify(arg)
})

export const getUsers = () =>
    applicationState.users.map((user) => ({ ...user }));
export const getPosts = () =>
    applicationState.posts.map((post) => ({ ...post }));
export const getLikes = () =>
    applicationState.likes.map((like) => ({ ...like }));
export const getMessages = () =>
    applicationState.messages.map((message) => ({ ...message }));

export const getFeed = () => ({...applicationState.feed });

export const getCurrentUser = () => {
    return applicationState.currentUser;
}

export const fetchUsers = () => {
    return fetch(`${apiURL}/users`)
        .then((response) => response.json())
        .then((users) => {
            applicationState.users = users;
        });
};

export const fetchPosts = () => {
    return fetch(`${apiURL}/posts`)
        .then((response) => response.json())
        .then((posts) => {
            applicationState.posts = posts;
        });
};

export const fetchLikes = () => {
    return fetch(`${apiURL}/likes`)
        .then((response) => response.json())
        .then((likes) => {
            applicationState.likes = likes;
        });
};

export const fetchMessages = () => {
    return fetch(`${apiURL}/messages`)
        .then((response) => response.json())
        .then((messages) => {
            applicationState.messages = messages;
        });
};

export const sendMsg = (msg) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(msg)
    }
    return fetch("http://localhost:8088/messages", fetchOptions)
    .then(response => response.json())
    .then(() => {
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    })
}

export const sendPost = (post) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    }
    return fetch("http://localhost:8088/posts", fetchOptions)
    .then(response => response.json())
    .then(() => {
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    })
}

export const setCurrentUser = (foundUser) => {
    applicationState.currentUser = foundUser
}

export const postUser = (userObj) => {
    return fetch(`${apiURL}/users`, setOptions(userObj) )
}

//feed setters
export const setFeedChosenUser = (userId) => applicationState.feed.chosenUser = userId;
export const toggleFeedDisplayFavorites = () => applicationState.displayFavorites = !applicationState.displayFavorites;
export const setFeedDisplayMessages = (bool) => applicationState.displayMessages = bool;






export const deletePost = (postId) => {
    return fetch(`${spi}/posts/${postId}`, {method: "DELETE"})
}

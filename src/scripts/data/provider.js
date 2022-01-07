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
        chosenYear: null,
        displayFavorites: false,
        displayMessages: false,
        displayProfile: false,
        UserProfileId: null,
        searchText: null
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

export const sendFav = (like) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(like)
    }
    return fetch("http://localhost:8088/likes", fetchOptions)
    .then(response => response.json())
    .then(() => {
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    })
}

export const setMessageRead = (message) => {
    message.read = true;
    const fetchOptions = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(message)
	};

	return fetch(`${apiURL}/messages/${message.id}`, fetchOptions);
}

export const setCurrentUser = (foundUser) => {
    applicationState.currentUser = foundUser
}

export const postUser = (userObj) => {
    return fetch(`${apiURL}/users`, setOptions(userObj) )
}

//feed setters
export const setFeedChosenUser = (userId) => applicationState.feed.chosenUser = userId;
export const setFeedChosenYear = (year) => applicationState.feed.chosenYear = year;
export const toggleFeedDisplayFavorites = () => applicationState.feed.displayFavorites = !applicationState.feed.displayFavorites;
export const setFeedDisplayFavorites = (bool) => applicationState.feed.displayFavorites = bool;
export const setFeedDisplayMessages = (bool) => applicationState.feed.displayMessages = bool;
export const setFeedDisplayProfile = (bool) => applicationState.feed.displayProfile = bool;
export const setUserProfileId = (int) => applicationState.feed.UserProfileId = int;
export const setSearchText = (text) => applicationState.feed.searchText = text;


export const deletePost = (postId) => {
    return fetch(`${apiURL}/posts/${postId}`, {method: "DELETE"})
}

export const deleteFav = (id) => {
    return fetch(`http://localhost:8088/likes/${id}`, {method: "DELETE"})
    .then(
        () => {
            applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
        }
        )
    }

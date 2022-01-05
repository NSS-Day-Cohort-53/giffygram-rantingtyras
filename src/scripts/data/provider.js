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

export const getUsers = () =>
    applicationState.users.map((user) => ({ ...user }));
export const getPosts = () =>
    applicationState.users.map((user) => ({ ...user }));
export const getLikes = () =>
    applicationState.users.map((user) => ({ ...user }));
export const getMessages = () =>
    applicationState.users.map((user) => ({ ...user }));

export const getFeed = () => (applicationState.feed = { ...feed });

export const getCurrentUser = () =>
    (applicationState.currentUser = { ...currentUser });

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

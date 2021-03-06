import { renderApp } from "../main.js";
import {
  getCurrentUser,
  getFeed,
  getLikes,
  getPosts,
  getUsers,
  sendFav,
  deleteFav,
  deletePost,
  setFeedDisplayProfile,
  setUserProfileId
} from "../data/provider.js";
import { profileFeed } from "./Profile.js";

let star;

export const postFeed = () => {
  let posts = getPosts();
  const users = getUsers();
  const likes = getLikes();
  const feed = getFeed();
  const currentUser = getCurrentUser();

  // show searched posts

  if(feed.searchText) {
    posts = posts.filter(post => {
      const postUser = users.find(user => user.id === post.userId)
      let postTitle = post.title;
      let postDesc = post.description;
      let postUserName = postUser.name;

      postTitle = postTitle ? postTitle.toLowerCase() : "";
      postDesc = postDesc ? postDesc.toLowerCase() : "";
      postUserName = postUserName ? postUserName.toLowerCase() : ""
      
      return postTitle.includes(feed.searchText) || postDesc.includes(feed.searchText) || postUserName.includes(feed.searchText);
    })
  }

  // change posts array to include only those of the chosen year
  if (feed.chosenYear) {
    posts = posts.filter((post) => {
      const year = new Date(post.timestamp).getFullYear();
      return feed.chosenYear === year;
    });
  }
//   ///////////////////////////////////////////////////////////////////////////////////////////  this is where  posts for the chosen user are being chosen to be displayed
  // change posts array to include only those of the chosen user
  if (feed.chosenUser) {
    let dataType =JSON.stringify(typeof(getFeed().chosenUser))
    console.log(dataType)
    if (dataType !== "\"object\"")
    { 
    posts = posts.filter((post) => feed.chosenUser === post.userId);
    }
    else
    {
      // map through posts and chosen user to aggregate the posts by people the user follows
      let relevantPostsArr = [];
      posts.map((post)=> {
        feed.chosenUser.map((followObj)=> {
          if (followObj.followedId === post.userId)
          {
            relevantPostsArr.push(post);
          }
        })
      })
      posts =relevantPostsArr;
    }
  }
  // change posts array to include only the currentUser's favorites

  if (feed.displayFavorites) {
    const currentUserLikes = likes.filter(
      (like) => like.userId === currentUser.id
    );
    posts = posts.filter((post) =>
      currentUserLikes.find((like) => like.postId === post.id)
    );
  }

  posts.sort((a,b) => b.timestamp - a.timestamp)

  const buildPostFeed = posts.map((post) => {
    let foundUser = users.find((user) => user.id === post.userId);

    let currentUserId = localStorage.gg_user;

    return `
    <section class="post">
        <h3 class="post__remark">${post.title}</h3>
        <img src="${post.imageUrl}" alt="" class="post__image">
        <div class="">${post.description}</div>
        <div class="post__tagline">Post By:
            <span class="profileLink" name="profileName" id="${foundUser.id}">${foundUser.name}</span> at ${new Date(post.timestamp).toLocaleString()}
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
            ${parseInt(currentUserId) === parseInt(foundUser.id) ? `<img src="./images/block.svg" id="deletePost--button-${post.id}" class="star"/>` : ``}
                
        </div>
        
    </section>`;
  });
  //this line will populate a delete button only if the gif belongs to the logged in user

  const html = buildPostFeed.join("");
  return html;
};

document.addEventListener("click", (event) => {
  if (event.target.id.startsWith("deletePost--button")) {
    let postId = event.target.id.substr(19);
    deletePost(postId);
    renderApp();
  }
});

document.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.name === "star__notFave") {
    const posts = getPosts();
    const favPost = posts.find(
      (post) => post.id === parseInt(clickEvent.target.id)
    );
    const userId = parseInt(localStorage.gg_user);
    const postId = favPost.id;

    const dataToSendToApi = {
      userId: userId,
      postId: postId,
    };

    sendFav(dataToSendToApi);
  } else {
    if (clickEvent.target.name === "star__fave") {
      const likes = getLikes();
      const unFavePost = likes.find(
        (like) =>
          like.postId === parseInt(clickEvent.target.id) &&
          like.userId === parseInt(localStorage.gg_user)
      );
      const unFaveId = unFavePost.id;
      deleteFav(unFaveId);
    }
  }
});

document.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.className === "profileLink") {
    setFeedDisplayProfile(true);
    setUserProfileId(clickEvent.target.id)
    renderApp();
  }
});

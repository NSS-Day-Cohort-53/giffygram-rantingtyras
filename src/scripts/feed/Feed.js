import { getFeed } from "../data/provider.js";
import { MessageList } from "./MessageList.js";
import { gifSubmission } from "./postForm.js";
import { postFeed } from "./PostList.js";
import { profileFeed } from "./Profile.js";

export const Feed = () => {
  const feed = getFeed();

  if (feed.displayMessages) {
    return `
      <div class="messages">
        ${MessageList()}
      </div>
      `;
  } else if (feed.displayProfile) {
    return `
      <div class="profile__feed">
        ${profileFeed()}
      </div>
      `;
  } else {
    return `
      <div class="giffygram__feed">
        <div class="gifSubmission">${gifSubmission()}</div>
        ${postFeed()}
      </div>
    `;
  }
};

import { getFeed } from "../data/provider.js";
import { MessageList } from "./MessageList.js";
import { postFeed } from "./PostList.js";
import { profileFeed } from "./Profile.js";

export const Feed = () => {
  const feed = getFeed();

  if (feed.displayMessages) {
    return MessageList();
  } else if (feed.displayProfile) {
    return profileFeed();
  } else {
    return postFeed();
  }
};

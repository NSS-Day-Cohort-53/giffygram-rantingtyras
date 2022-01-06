import { getFeed } from "../data/provider.js"
import { MessageList } from "./MessageList.js";
import { postFeed } from "./PostList.js"

export const Feed = () => {
    const feed = getFeed();

    if (feed.displayMessages) {
        return MessageList();
    } else {
        return postFeed()
    }
}
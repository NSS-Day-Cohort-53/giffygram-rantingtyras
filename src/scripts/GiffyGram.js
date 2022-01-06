import { Footer } from "./nav/Footer.js"
import { gifSubmission } from "./feed/postForm.js"
import { msgSubmission } from "./message/MessageForm.js"
import { Navbar } from "./nav/Navbar.js"
import { Feed } from "./feed/Feed.js"

export const GiffyGram = () => {
    // Show main main UI
    return `
        <header>
            ${Navbar()}
        </header>
        <div id="msgForm"></div>
        ${Feed()}
        ${Footer()}
    `
}

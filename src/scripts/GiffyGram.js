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
            <br>
            <br>
            <br>
            ${msgSubmission()}
            <br>
            ${gifSubmission()}
            <br>
            ${Feed()}
        </header>
        ${Footer()}
    `
}

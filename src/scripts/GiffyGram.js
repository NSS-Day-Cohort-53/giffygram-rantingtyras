import { gifSubmission } from "./feed/postForm.js"
import { msgSubmission } from "./message/MessageForm.js"
import { Navbar } from "./nav/Navbar.js"

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
        </header>
    `
}

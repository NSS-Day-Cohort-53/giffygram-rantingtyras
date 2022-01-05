import { gifSubmission } from "./feed/postForm.js"
import { msgSubmission } from "./message/MessageForm.js"

export const GiffyGram = () => {

    // Show main main UI
    return `<h1>Giffygram</h1>
            ${gifSubmission()}
            <br>
            ${msgSubmission()}`
}

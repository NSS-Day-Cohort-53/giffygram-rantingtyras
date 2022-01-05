import { getUsers } from "../data/provider.js"
import { sendMsg, getCurrentUser } from "../data/provider.js"
//still needs functionality but form should be created

export const msgSubmission = () => {
    const users = getUsers()
        let html = `
        <label class="label" for="recipient">Recipient:</label>
        <select name="recipient" id="recipient">
        <option value="0">Choose a Recipient</option>`
        const messageRecipients = users.map((user) => {
            return `
            <option value="${user.id}">
            ${user.name}
            </option>`
        })
        html += messageRecipients.join("")
        html += `</select>`
        html += `
            <div>
            <label class="label" for="msg">Message:</label>
            <input type="text" name="msg" placeholder="Message to User"/>
            </div>
            <button class="button button__send" id="sendMsg">Send</button>
            <button class="button button__cancel" id="cancelMsg">Cancel</button>
            `
        return html
}

document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "sendMsg") {
        const users = getUsers()
        const selectedRecipient = document.querySelector("select[name='recipient']").value
        const foundRecipient = users.find(user => user.id === parseInt(selectedRecipient))
        const recipientId = foundRecipient.id
        const read = false
        const text = document.querySelector("input[name='msg']").value
        const user = getCurrentUser()
        const userId = user.id

        const dataToSendToApi = {
            recipientId: recipientId,
            read: read,
            text: text,
            userId: userId
        }
        sendMsg(dataToSendToApi)
    }
})
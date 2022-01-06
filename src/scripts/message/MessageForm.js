import { getUsers } from "../data/provider.js"
import { sendMsg, getCurrentUser } from "../data/provider.js"
import { MessagePackager } from "../friends/DirectMessage.js"


//still needs functionality but form should be created

export const msgSubmission = () => {
    const users = getUsers()
        let html = `
        <h3>Direct Message</h3>
        <div class="directMessage">
            <label class="label" for="recipient">Recipient:</label>
            <select name="recipient" id="recipient" class="message__input">
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
                <input type="textarea" name="msg" class="message__input" id="msgTxt" placeholder="Message to User"/>
                </div>
                <button class="button button__send" id="sendMsg">Send</button>
                <button class="button button__cancel" id="cancelMsg">Cancel</button>
            </div>`
        return html
}

document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "sendMsg") {
         let senderId = parseInt(localStorage.gg_user);
        let reciverId = parseInt(document.querySelector("#recipient").value);
        let content = (document.querySelector("#msgTxt").value);
        
        MessagePackager(senderId, reciverId, content, false);
    }
})

document.addEventListener("click", (event)=>{
    if (event.target.id === "directMessageIcon")
    {
        //applicationElement.dispatchEvent(new CustomEvent("DisplayDmForm"))  ${msgSubmission()}
        document.querySelector("#msgForm").innerHTML= msgSubmission();
    }

    if (event.target.id === "cancelMsg")
    {
        document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged"));
    }
})


import { sendPost, getCurrentUser } from "../data/provider.js"
const applicationElement = document.querySelector(".giffygram");

export const gifSubmission = () => {
    let html = `
        <div class="miniMode" id="postGif">Have a gif to post?</div>
    `
    return html
}

applicationElement.addEventListener("click", event => {
    if (event.target.id === "postGif") {
        const gifSubmissionElement = document.querySelector(".gifSubmission");
        const html = `
            <div class="newPost">
                <div class="field">
                    <input type="text" name="title" class="newPost__input" placeholder="Title"/>
                </div>
                <div class="field">
                    <input type="text" name="url" class="newPost__input" placeholder="URL or Gif"/>
                </div>
                <div class="field">
                    <input type="textarea" name="description" class="newPost__input newPost__description" placeholder="Story Behind Your Gif..."/>
                </div>
                <button name="button__submit" class="button button__submit" id="submitGif">Submit</button>
                <button name="button__cancel" class="button button__cancel" id="cancelGif">Cancel</button>
            </div>`
        gifSubmissionElement.innerHTML = html;    
    }
})

document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitGif") {
        const title = document.querySelector("input[name='title']").value
        const description = document.querySelector("input[name='description']").value
        const img = document.querySelector("input[name='url']").value
        const user = getCurrentUser()
        const userId = user.id

        const dataToSendToApi = {
                title: title,
                description: description,
                imageUrl: img,
                timestamp: Date.now(),
                userId: userId
        }
        sendPost(dataToSendToApi)
    } 
    else {
        if (clickEvent.target.id === "cancelGif") {
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }}
})
import { sendPost, getCurrentUser } from "../data/provider.js"
const applicationElement = document.querySelector(".giffygram");

export const gifSubmission = () => {
    let html = `
    <div class="field">
        <input type="text" name="title" placeholder="Title"/>
    </div>
    <div class="field">
        <input type="text" name="url" placeholder="URL or Gif"/>
    </div>
    <div class="field">
        <input type="textarea" name="description" placeholder="Story Behind Your Gif..."/>
    </div>
    <button name="button__submit" class="button button__submit" id="submitGif">Submit</button>
    <button name="button__cancel" class="button button__cancel" id="cancelGif">Cancel</button>
    `
    return html
}

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
                timestamp: Date(Date.now()).toString(),
                userId: userId
        }
        sendPost(dataToSendToApi)
    } 
    else {
        if (clickEvent.target.id === "cancelGif") {
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }}
})
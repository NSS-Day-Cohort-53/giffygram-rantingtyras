//still needs functionality but form should be created

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
    <button class="button button__submit" id="submitGif">Submit</button>
    <button class="button button__cancel" id="cancelGif">Cancel</button>
    `
    return html
}
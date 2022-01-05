import { Footer } from "./nav/Footer.js"
import { Navbar } from "./nav/Navbar.js"

export const GiffyGram = () => {

    // Show main main UI
    return `
        <header>
            ${Navbar()}
        </header>
        ${Footer()}
    `
}

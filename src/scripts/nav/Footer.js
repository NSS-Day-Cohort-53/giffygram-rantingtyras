import { getUsers, getPosts } from "../data/provider.js";

export const Footer = () => {
    const users = getUsers();
    const posts = getPosts();
    const yearsSet = new Set();
    posts.forEach(post => {
        const year = new Date(post.timestamp).getFullYear();
        yearsSet.add(year);
    })
    const yearsArray = Array.from(yearsSet);
    yearsArray.sort((a, b) => a - b);

    return `
        <footer class="footer">
            <div class="footer__item">
                <select id="yearSelection">
                    <option value="0">Select year</option>
                    ${yearsArray.map(year => `<option value=year>${year}</option>`).join("")}
                </select>
                <span id="postCount"></span>
            </div>
            <div class="footer__item">
                <label for="userSelection">Posts by user</label>
                <select id="userSelection" name="userSelection">
                    <option value="0">Select a User</option>
                    ${users.map(user => `<option value=${user.id}>${user.name}</option>`).join("")}
                </select>
            </div>
            <div class="footer__item">
                <label for="showOnlyFavorites">Show only favorites</label>
                <input id="showOnlyFavorites" type="checkbox" />
            </div>
        </footer>
    `;
};
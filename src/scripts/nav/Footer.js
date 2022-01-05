import { getUsers } from "../data/provider.js";

export const Footer = () => {
    const users = getUsers();

    return `
        <footer class="footer">
            <div class="footer__item">
                <select id="yearSelection">
                    <option value="0">Select year</option>
                    
                </select>
                <span id="postCount"></span>
            </div>
            <div class="footer__item">
                <label for="userSelection">Posts by user</label>
                <select id="userSelection" name="userSelection">
                    <option value="0">Select a User</option>
                    
                </select>
            </div>
            <div class="footer__item">
                <label for="showOnlyFavorites">Show only favorites</label>
                <input id="showOnlyFavorites" type="checkbox" />
            </div>
        </footer>
    `;
};

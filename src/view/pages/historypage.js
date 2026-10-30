import { priceDisclaimerFooter, settingsIcon } from "../components/sharedPageParts.js";

export function historypage() {
    return `
        <section class="history-screen" aria-labelledby="history-title">
            ${settingsIcon()}
            <h1 id="history-title">HISTORIK</h1>

            <label class="history-date" for="history-date-input">
                <input id="history-date-input" type="date" value="2023-10-14" aria-label="Vælg dato">
                <img src="/reference/assets/icon%20assets/calendar-daysicon.png" alt="">
            </label>

            <section class="history-prices" aria-labelledby="history-prices-title">
                <h2 id="history-prices-title">ELPRISERNE&nbsp; D. <span id="history-selected-date">14-10-2023</span></h2>
                <ul class="history-price-list" data-price-list>
                    <li class="history-price-row">Henter priser...</li>
                </ul>
            </section>
        </section>

        ${priceDisclaimerFooter()}
    `;
}

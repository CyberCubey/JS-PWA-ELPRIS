import { priceDisclaimerFooter, settingsIcon } from "../components/sharedPageParts.js";

export function currentpage() {
    return `
        <section class="current-screen" aria-labelledby="current-title">
            ${settingsIcon()}
            <h1 id="current-title">ELPRISEN LIGE NU</h1>

            <div class="price-dial" role="group" aria-label="Aktuel elpris">
                <div class="price-dial__value">
                    <span class="price-dial__number" data-price-current>-- KR</span>
                    <span class="price-dial__unit">PR. KWH</span>
                </div>
            </div>

            <p class="current-hour" data-current-hour>Henter pris...</p>
        </section>

        ${priceDisclaimerFooter()}
    `;
}
import { priceDisclaimerFooter, settingsIcon } from "../components/sharedPageParts.js";

export function overviewpage() {
	return `
		<section class="overview-screen" aria-labelledby="overview-title">
			${settingsIcon()}
			<h1 id="overview-title">OVERSIGT</h1>

			<section class="overview-summary" aria-label="Dagens prisoversigt">
				<div class="overview-summary__item">
					<div class="overview-summary__circle">
						<span class="overview-summary__value" data-price-low>-- KR</span>
						<span class="overview-summary__unit">PR. KWH</span>
					</div>
					<p>LAVESTE PRIS</p>
				</div>
				<div class="overview-summary__item">
					<div class="overview-summary__circle">
						<span class="overview-summary__value" data-price-high>-- KR</span>
						<span class="overview-summary__unit">PR. KWH</span>
					</div>
					<p>HØJESTE PRIS</p>
				</div>
			</section>

			<ul class="history-price-list overview-price-list" aria-label="Elpriser time for time" data-price-list>
				<li class="history-price-row">Henter priser...</li>
			</ul>
		</section>

		${priceDisclaimerFooter()}
	`;
}
const API_BASE_URL = "https://www.elprisenligenu.dk/api/v1/prices";
const VALID_REGIONS = new Set(["DK1", "DK2"]);


function formatDanishDate(date) { //AI
    if (typeof date === "string") {
        const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
        if (!match) {
            throw new TypeError("Date must use a YYYY-MM-DD format.");
        }

        const [, year, month, day] = match;
        const parsedDate = new Date(`${date}T00:00:00Z`);
        if (parsedDate.toISOString().slice(0, 10) !== date) {
            throw new RangeError("Date must be a valid calendar date.");
        }

        return `${year}/${month}-${day}`;
    }

    if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
        throw new TypeError("Date must be a valid Date object or YYYY-MM-DD string.");
    }

    const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Europe/Copenhagen",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).formatToParts(date);
    const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));

    return `${values.year}/${values.month}-${values.day}`;
}

export function buildPriceUrl(region = "DK1") {
    const normalizedRegion = typeof region === "string" ? region.toUpperCase() : "";
    if (!VALID_REGIONS.has(normalizedRegion)) {
        throw new RangeError('Region must be either "DK1" or "DK2".');
    }

    return `${API_BASE_URL}/${formatDanishDate(new Date())}_${normalizedRegion}.json`;
}


// Fetch current live  prices
export async function fetchPrices({ region = "DK1", signal } = {}) {
    const response = await fetch(buildPriceUrl(region), { signal });
    if (!response.ok) {
        throw new Error(`Price API request failed (${response.status} ${response.statusText}).`);
    }

    const prices = await response.json();
    if (!Array.isArray(prices)) {
        throw new TypeError("Price API returned an unexpected response format.");
    }

    return prices;
}
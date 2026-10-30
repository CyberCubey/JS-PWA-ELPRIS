import { currentpage } from "../view/pages/currentpage.js";
import { historypage } from "../view/pages/historypage.js";
import { notfoundpage } from "../view/pages/notfoundpage.js";
import { overviewpage } from "../view/pages/overviewpage.js";
import { animatePage } from "../animations.js";
import { fetchPrices } from "../api/elprisApi.js";

const root = document.getElementById("root");



const routes = [
    { path: "404", html: notfoundpage },
    { path: "home", html: currentpage },
    { path: "overview", html: overviewpage },
    { path: "history", html: historypage }
];

let currentRoute = null;
let latestPrices = null;
const priceColorClasses = Array.from({ length: 8 }, (_, index) => `price-color-${index + 1}`);

function colorPrice(element, value, lowestPrice, highestPrice) {
    const colorNumber = highestPrice === lowestPrice
        ? 4
        : Math.round(((value - lowestPrice) / (highestPrice - lowestPrice)) * 7) + 1;

    element.classList.remove(...priceColorClasses);
    element.classList.add(`price-color-${colorNumber}`);
}

function showPrices() {
    if (!latestPrices || latestPrices.length === 0) {
        return;
    }

    const now = Date.now();
    const currentPrice = latestPrices.find((price) => {
        return now >= new Date(price.time_start).getTime() && now < new Date(price.time_end).getTime();
    }) || latestPrices[0];
    const prices = latestPrices.map((price) => Number(price.DKK_per_kWh));
    const lowestPrice = Math.min(...prices);
    const highestPrice = Math.max(...prices);

    document.querySelectorAll("[data-price-current]").forEach((element) => {
        const value = Number(currentPrice.DKK_per_kWh);
        element.textContent = `${value.toFixed(3)} KR`;
        colorPrice(element, value, lowestPrice, highestPrice);
    });
    document.querySelectorAll("[data-current-hour]").forEach((element) => {
        const start = new Date(currentPrice.time_start).toLocaleTimeString("da-DK", {
            hour: "2-digit", minute: "2-digit", timeZone: "Europe/Copenhagen"
        });
        const end = new Date(currentPrice.time_end).toLocaleTimeString("da-DK", {
            hour: "2-digit", minute: "2-digit", timeZone: "Europe/Copenhagen"
        });
        element.textContent = `${start} - ${end}`;
    });
    document.querySelectorAll("[data-price-low]").forEach((element) => {
        element.textContent = `${lowestPrice.toFixed(3)} KR`;
        colorPrice(element, lowestPrice, lowestPrice, highestPrice);
    });
    document.querySelectorAll("[data-price-high]").forEach((element) => {
        element.textContent = `${highestPrice.toFixed(3)} KR`;
        colorPrice(element, highestPrice, lowestPrice, highestPrice);
    });

    document.querySelectorAll("[data-price-list]").forEach((list) => {
        list.replaceChildren();
        latestPrices.forEach((price) => {
            const value = Number(price.DKK_per_kWh);
            const hour = new Date(price.time_start).toLocaleTimeString("da-DK", {
                hour: "2-digit", minute: "2-digit", timeZone: "Europe/Copenhagen"
            });
            const row = document.createElement("li");
            const time = document.createElement("span");
            const amount = document.createElement("strong");

            row.className = "history-price-row";
            time.textContent = `kl. ${hour}`;
            colorPrice(amount, value, lowestPrice, highestPrice);
            amount.textContent = `${value.toFixed(3)} kr`;
            row.append(time, amount);
            list.append(row);
        });
    });
}

fetchPrices({ region: "DK2" }).then((prices) => {
    latestPrices = prices;
    showPrices();
}).catch(() => {
    document.querySelectorAll("[data-price-current], [data-price-low], [data-price-high]").forEach((element) => {
        element.textContent = "-- KR";
    });
    document.querySelectorAll("[data-current-hour]").forEach((element) => {
        element.textContent = "Priser kunne ikke hentes";
    });
    document.querySelectorAll("[data-price-list]").forEach((list) => {
        list.textContent = "Priser kunne ikke hentes";
    });
});

export function router() {
    if (!root) {
        return null;
    }

    const path = location.hash.slice(1).replace(/^\//, "");
    currentRoute = routes.find((route) => route.path === path);
    if (!currentRoute) {
        currentRoute = path ? routes[0] : routes[1]; }

    root.innerHTML = currentRoute.html();
    showPrices();
    document.title = `${currentRoute.path === "404" ? "Siden blev ikke fundet" : currentRoute.path} | Elprisen`;
    animatePage();

    if (currentRoute.path === "history") {
        const dateInput = document.getElementById("history-date-input");
        const selectedDate = document.getElementById("history-selected-date");

        dateInput.addEventListener("change", () => {
            if (dateInput.value) {
                selectedDate.textContent = dateInput.value.split("-").reverse().join("-");
            }
        });
    }



    document.querySelectorAll('nav a[href^="#"]').forEach((link) => {

        if (link.hash.slice(1) === currentRoute.path) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current"); }
    });

    root.focus();
    return currentRoute;

}
window.addEventListener("hashchange", router);



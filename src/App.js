import { router } from "./controller/router.js";
import { animatePage } from "./animations.js";

router();

// greensock works even if it doesn't work,
// // serviceworker or the app still works normally if the CDN isn't working properly
const gsapScript = document.createElement("script");
gsapScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js";
gsapScript.async = true;
gsapScript.onload = animatePage;
document.head.append(gsapScript);

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/pwa/service-worker.js", { scope: "/" });
}



import { Recognition } from "./speechRecognize";
import { translateText } from "./googleTranslate";

const popupUrl = chrome.runtime.getURL("src/public/popup.html");
console.log(popupUrl);
setTimeout(() => {
  fetch(popupUrl)
    .then((response) => response.text())
    .then((html) => {
      const popup = document.createElement("div");
      popup.innerHTML = html;
      popup.style.position = "absolute";
      popup.style.top = "500px";
      popup.style.left = "500px";
      document.body.appendChild(popup);

      const moveBar = popup.querySelector("#move_bar");
    })
    .catch((error) => console.error("Error loading popup:", error));
}, 3000);

function changePopupText(text: string, mode: string) {
  if (mode == "ja") {
    const obj: Element | null = document.querySelector(".translated-text");
    if (obj) {
      obj.textContent = text;
    }
  } else if (mode == "ko") {
    const obj: Element | null = document.querySelector(".original-text");
    if (obj) {
      obj.textContent = text;
    }
  }
}

//認識システム本体
Recognition((text: string, shouldTranslate: boolean, finish: boolean) => {
  if (shouldTranslate) {
    translateText(text + ".", "ko", "en")
      .then((resultEn) => {
        return translateText(resultEn.text, "en", "ja");
      })
      .then((resultJa) => {
        console.log(resultJa.text);
        console.log(`%c${text}`, "font-size: 5px;");
        if (finish) {
          changePopupText(resultJa.text, "ja");
        } else {
          changePopupText(resultJa.text, "ja");
        }

        changePopupText(text, "ko");
      })
      .catch((error) => console.error(error));
  } else {
    changePopupText(text, "ko");
  }
});

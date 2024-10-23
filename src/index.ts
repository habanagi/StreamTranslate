import { Recognition } from "./speechRecognize";
import { translateText } from "./googleTranslate";

Recognition((text: string) => {
  translateText(text + ".", "ko", "en")
    .then((resultEn) => {
      return translateText(resultEn.text, "en", "ja");
    })
    .then((resultJa) => {
      console.log(resultJa.text);
      console.log(`%c${text}`, "font-size: 5px;");
    })
    .catch((error) => console.error(error));
});

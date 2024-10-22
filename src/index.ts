import {Recognition} from './speechRecognize';
import {translateText} from './googleTranslate'

Recognition((text: string) => {
    translateText(text + ".", 'ko', 'ja')
        .then(result => {
            console.log(result.text)
            console.log(`%c${text}`, 'font-size: 5px;');
        })
        .catch(error => console.error(error));
});
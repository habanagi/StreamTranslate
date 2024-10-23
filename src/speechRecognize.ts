let timeout: any = null;

const recognition = new ((window as any).SpeechRecognition ||
  (window as any).webkitSpeechRecognition)();
recognition.lang = "ko-KR";
recognition.interimResults = true;
recognition.continuous = true;

let lastRecognizedWordCount = 0;
document.addEventListener("keydown", (event) => {
  if (event.key === "z") {
    recognition.stop();
  }
});

const Recognition = (resultsCallBack: (text: string) => void) => {
  recognition.onresult = (event: any) => {
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      const text = event.results[i][0].transcript;
      const recognizedWordCount: number = text.split(" ").length;
      if (event.results[i].isFinal) {
        resultsCallBack(text);
        lastRecognizedWordCount = 0;
        recognition.stop();
      } else {
        if (text.includes("니다")) {
          recognition.stop();
        } else if (recognizedWordCount >= lastRecognizedWordCount + 5) {
          resultsCallBack(text);
          lastRecognizedWordCount = recognizedWordCount;
        }
      }
    }
  };

  recognition.onend = () => {
    Recognition(resultsCallBack);
  };

  recognition.start();
};
export { Recognition };

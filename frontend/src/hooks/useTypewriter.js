import { useEffect, useState } from "react";

export function useTypewriter(words, speed = 80, pause = 1300) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];

    const timeout = window.setTimeout(
      () => {
        if (!isDeleting) {
          const nextText = currentWord.slice(0, displayText.length + 1);
          setDisplayText(nextText);
          if (nextText === currentWord) {
            setIsDeleting(true);
          }
        } else {
          const nextText = currentWord.slice(0, displayText.length - 1);
          setDisplayText(nextText);
          if (nextText.length === 0) {
            setIsDeleting(false);
            setWordIndex((value) => value + 1);
          }
        }
      },
      isDeleting ? speed / 2 : displayText === currentWord ? pause : speed
    );

    return () => window.clearTimeout(timeout);
  }, [displayText, isDeleting, pause, speed, wordIndex, words]);

  return displayText;
}

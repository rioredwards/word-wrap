/** Represents a series of Words or Spaces */

import { Word } from "./Word";

export class Line {
  words: Word[];
  maxWidth: number;

  constructor(words: Word[] = [], maxWidth: number = Infinity) {
    this.words = words;
    this.maxWidth = maxWidth;
  }

  get length(): number {
    return this.words.reduce((acc, word) => acc + word.length, 0);
  }

  set(word: Word): void {
    this.words = [word];
  }

  push(word: Word): void {
    this.words.push(word);
  }

  copy(): Line {
    const newWords = this.words.map((word) => word.copy());
    return new Line(newWords, this.maxWidth);
  }

  clear(): void {
    this.words = [];
  }

  appendSpacesRight(numSpaces: number): void {
    const lastWord = this.words.at(-1);
    if (lastWord !== undefined) {
      lastWord.appendSpacesRight(numSpaces);
    }
  }
}

/** Represents a series of Words or Spaces */

import { Word } from "./Word";

export class Line {
  words: Word[];

  constructor(words?: Word[]) {
    this.words = words ?? [];
  }

  get val(): string {
    return this.words.reduce((acc, word) => acc + word.val, "");
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
    return new Line(newWords);
  }

  clear(): void {
    this.words = [];
  }
}

import { Grapheme } from "./Grapheme";
import { GraphemeCluster } from "./GraphemeCluster";

/** Represents a group of non-whitespace characters */
export class Word extends GraphemeCluster<Word> {
  constructor(graphemes: Grapheme[] = []) {
    super(graphemes);
  }

  set(grapheme: Grapheme): void {
    this.graphemes = [grapheme];
  }

  push(grapheme: Grapheme): void {
    this.graphemes.push(grapheme);
  }

  copy(): Word {
    const newGraphemes = this.graphemes.map((grapheme) => new Grapheme(grapheme.val));
    return new Word(newGraphemes);
  }
}

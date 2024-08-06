/** Represents a group of non-whitespace characters */

import { Grapheme } from "./Grapheme.js";

export class Word {
  private spacesLeft: string = "";
  graphemes: Grapheme[];

  constructor(graphemes: Grapheme[] = [], spacesLeft: string = "") {
    this.graphemes = graphemes;
    this.spacesLeft = spacesLeft;
  }

  get length(): number {
    const graphemesLength = this.graphemes.reduce((acc, grapheme) => acc + grapheme.length, 0);
    const spacesLength = this.spacesLeft.length;
    return graphemesLength + spacesLength;
  }

  get val(): string {
    const graphemesVal = this.graphemes.map((grapheme) => grapheme.val).join("");
    return this.spacesLeft + graphemesVal;
  }

  hasContent(): boolean {
    return this.graphemes.length > 0;
  }

  set(grapheme: Grapheme): void {
    this.graphemes = [grapheme];
    this.spacesLeft = "";
  }

  clear(): void {
    this.graphemes = [];
    this.spacesLeft = "";
  }

  push(grapheme: Grapheme): void {
    this.graphemes.push(grapheme);
  }

  copy(): Word {
    const newGraphemes = this.graphemes.map((grapheme) => new Grapheme(grapheme.val));
    return new Word(newGraphemes, this.spacesLeft);
  }

  appendSpacesLeft(numSpaces: number): void {
    this.spacesLeft += " ".repeat(numSpaces);
  }

  clearSpacesLeft(): void {
    this.spacesLeft = "";
  }
}

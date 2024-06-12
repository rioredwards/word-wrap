/** Represents a group of non-whitespace characters */

import { Grapheme } from "./Grapheme";

export class Word {
  private spacesRight: string = "";
  graphemes: Grapheme[];

  constructor(graphemes: Grapheme[] = [], spacesRight: string = "") {
    this.graphemes = graphemes;
    this.spacesRight = spacesRight;
  }

  get length(): number {
    const graphemesLength = this.graphemes.reduce((acc, grapheme) => acc + grapheme.length, 0);
    const spacesLength = this.spacesRight.length;
    return graphemesLength + spacesLength;
  }

  get val(): string {
    const graphemesVal = this.graphemes.map((grapheme) => grapheme.val).join("");
    return graphemesVal + this.spacesRight;
  }

  set(grapheme: Grapheme): void {
    this.graphemes = [grapheme];
    this.spacesRight = "";
  }

  clear(): void {
    this.graphemes = [];
    this.spacesRight = "";
  }

  push(grapheme: Grapheme): void {
    this.graphemes.push(grapheme);
  }

  copy(): Word {
    const newGraphemes = this.graphemes.map((grapheme) => new Grapheme(grapheme.val));
    return new Word(newGraphemes, this.spacesRight);
  }

  appendSpacesRight(numSpaces: number): void {
    this.spacesRight += " ".repeat(numSpaces);
  }

  clearSpacesRight(): void {
    this.spacesRight = "";
  }
}

import { Grapheme } from "./Grapheme";
import { GraphemeCluster } from "./GraphemeCluster";

/** Represents a series of Words or Spaces */
export class Line extends GraphemeCluster<Line> {
  maxWidth: number;

  constructor(graphemes: Grapheme[] = [], maxWidth: number) {
    super(graphemes);
    this.maxWidth = maxWidth;
  }

  set(graphemes: Grapheme[]): void {
    this.graphemes = [...graphemes];
  }

  push(graphemes: Grapheme[]) {
    this.graphemes.push(...graphemes);
  }

  copy(): Line {
    const newGraphemes = this.graphemes.map((grapheme) => new Grapheme(grapheme.val));
    return new Line(newGraphemes, this.maxWidth);
  }
}

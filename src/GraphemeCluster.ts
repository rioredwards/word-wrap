import { Grapheme } from "./Grapheme";

export abstract class GraphemeCluster<T extends GraphemeCluster<T>> {
  graphemes: Grapheme[];

  constructor(graphemes: Grapheme[]) {
    this.graphemes = graphemes;
  }

  get val(): string {
    if (this.graphemes.length <= 0) return "";
    return this.graphemes.map((grapheme) => grapheme.val).join("");
  }

  get length(): number {
    if (this.graphemes.length <= 0) return 0;
    return this.graphemes.reduce((acc: number, grapheme: Grapheme) => grapheme.length + acc, 0);
  }

  clear(): void {
    this.graphemes = [];
  }

  abstract set(input: Grapheme | Grapheme[]): void;

  abstract push(input: Grapheme | Grapheme[]): void;

  abstract copy(): T;
}

import type { Scales } from "./models";

export function convert(to: Scales, value: number) {
  switch (to) {
    case "F":
      return (value * 9) / 5 + 32;
    case "C":
      return ((value - 32) * 5) / 9;
  }
}

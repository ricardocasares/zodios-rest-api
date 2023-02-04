import { convert } from "@app/convert";

test("converts from F to C", () => expect(convert("C", 98.6)).toBe(37));
test("converts from C to F", () => expect(convert("F", 37)).toBe(98.6));

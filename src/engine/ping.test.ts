import { describe, expect, it } from "vitest";
import { ping } from "./ping";

describe("engine placeholder", () => {
  it("is importable without any interface code", () => {
    expect(ping()).toBe("engine");
  });
});

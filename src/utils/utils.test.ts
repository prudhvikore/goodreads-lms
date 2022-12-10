import {hashedPassword} from "./utils";

describe("tesing hash", () => {
  it("should return a hashed string", () => {
    const hash = hashedPassword("avdsa");
    expect(typeof hash).toBe("string");
  });
});

import * as AllExports from "@utils/constants/index";

describe("Index Exports", () => {
  it("should correctly export CORS", () => {
    expect(AllExports.CORS).toBeDefined();
  });
});

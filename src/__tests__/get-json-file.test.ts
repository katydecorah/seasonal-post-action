import { getJsonFile } from "../get-json-file";

let mockGetContents = Promise.resolve({
  data: require("./fixtures/repo-contents.json"),
});

jest.mock("@actions/core");
jest.mock("octokit", () => {
  return {
    Octokit: jest.fn().mockImplementation(() => ({
      rest: {
        repos: {
          getContent: jest.fn().mockImplementation(() => mockGetContents),
        },
      },
    })),
  };
});

describe("getJsonFile", () => {
  test("works", async () => {
    expect(await getJsonFile("books.json")).toMatchSnapshot();
  });
  test("missing content", async () => {
    mockGetContents = Promise.resolve({
      data: {},
    });
    expect(await getJsonFile("books.json")).toEqual([]);
  });
  test("fails", async () => {
    mockGetContents = Promise.reject("Error");
    try {
      await getJsonFile("books.json");
    } catch (err) {
      expect(err).toMatchInlineSnapshot(`[Error: books.json: Error]`);
    }
  });
});

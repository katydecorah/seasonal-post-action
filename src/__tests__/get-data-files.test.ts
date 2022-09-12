import { getDataFile } from "../get-data-file";
import { setFailed } from "@actions/core";

let mockGetContents = Promise.resolve({
  data: require("./fixtures/repo-contents-yml.json"),
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

describe("getDataFile", () => {
  test("works", async () => {
    expect(await getDataFile("playlists.yml")).toMatchSnapshot();
  });
  test("missing content", async () => {
    mockGetContents = Promise.resolve({
      data: {},
    });
    expect(await getDataFile("playlists.yml")).toEqual([]);
  });
  test("fails", async () => {
    mockGetContents = Promise.reject({
      message: "Error",
    });
    await getDataFile("playlists.yml");
    expect(setFailed).toHaveBeenCalledWith("Error");
  });
});

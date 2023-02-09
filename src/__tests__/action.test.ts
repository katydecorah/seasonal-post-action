import { action } from "../action";
import { exportVariable, setFailed } from "@actions/core";
import * as GetDataFile from "../get-data-file";
import * as GetJsonFile from "../get-json-file";
import * as FindSeason from "../find-season";
import * as Format from "../format";
import recipes from "./fixtures/recipes.json";
import playlists from "./fixtures/playlists.json";
import books from "./fixtures/books.json";
import { promises } from "fs";
import * as core from "@actions/core";
import * as github from "@actions/github";

jest.mock("@actions/core");

jest.useFakeTimers().setSystemTime(new Date("2021-9-20"));

const defaultInputs = {
  "github-username": "katydecorah",
  "github-repository": "archive",
  "season-emoji": "❄️,🌷,☀️,🍂",
  "season-names": "Winter,Spring,Summer,Fall",
  "posts-dir": "notes/_posts/",
  "seasonal-post-template": "",
  "source-books": "books|_data/read.json",
  "source-bookmarks": "bookmarks|_data/bookmarks.json",
  "source-playlist": "_data/playlists.yml",
};

beforeEach(() => {
  Object.defineProperty(github, "context", {
    value: {
      payload: {
        inputs: {
          date: undefined,
        },
      },
    },
  });
  jest
    .spyOn(core, "getInput")
    .mockImplementation((name) => defaultInputs[name] || undefined);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("action", () => {
  test("works", async () => {
    const warningSpy = jest.spyOn(core, "warning").mockImplementation();

    const getJsonFileSpy = jest
      .spyOn(GetJsonFile, "getJsonFile")
      .mockReturnValueOnce(books)
      .mockReturnValueOnce(recipes);
    const getDataFileSpy = jest
      .spyOn(GetDataFile, "getDataFile")
      .mockReturnValueOnce(playlists);
    const formatBooksSpy = jest.spyOn(Format, "formatBooks");
    const formatBookmarksSpy = jest.spyOn(Format, "formatBookmarks");
    const formatPlaylistsSpy = jest.spyOn(Format, "formatPlaylist");
    const findSeasonSpy = jest.spyOn(FindSeason, "findSeason");
    const writeSpy = jest.spyOn(promises, "writeFile").mockImplementation();
    await action();
    expect(findSeasonSpy).toHaveReturnedWith({
      end: "2021-09-20",
      name: "2021 Summer",
      season: "Summer",
      seasonEmoji: "☀️",
      start: "2021-06-21",
      year: 2021,
    });
    expect(warningSpy).not.toHaveBeenCalled();
    expect(exportVariable).toHaveBeenLastCalledWith("season", "2021 Summer");
    expect(getJsonFileSpy).toHaveBeenNthCalledWith(1, "_data/read.json");
    expect(getJsonFileSpy).toHaveNthReturnedWith(1, books);
    expect(getJsonFileSpy).toHaveBeenNthCalledWith(2, "_data/bookmarks.json");
    expect(getDataFileSpy).toHaveBeenNthCalledWith(1, "_data/playlists.yml");
    expect(setFailed).not.toHaveBeenCalled();
    expect(formatBooksSpy).toHaveBeenCalled();
    expect(formatBookmarksSpy).toHaveBeenCalled();
    expect(formatPlaylistsSpy).toHaveBeenCalled();
    expect(writeSpy.mock.calls[0]).toMatchSnapshot();
  });

  test("works, custom template", async () => {
    defaultInputs["seasonal-post-template"] =
      ".github/actions/seasonal-post-template-basic.md";

    const warningSpy = jest.spyOn(core, "warning").mockImplementation();
    jest
      .spyOn(GetJsonFile, "getJsonFile")
      .mockReturnValueOnce(books)
      .mockReturnValueOnce(recipes);
    jest.spyOn(GetDataFile, "getDataFile").mockReturnValueOnce(playlists);

    const writeSpy = jest.spyOn(promises, "writeFile").mockImplementation();
    await action();
    expect(warningSpy).not.toHaveBeenCalled();
    expect(setFailed).not.toHaveBeenCalled();
    expect(writeSpy.mock.calls[0]).toMatchSnapshot();
  });

  test("works, custom template missing", async () => {
    defaultInputs["seasonal-post-template"] =
      ".github/actions/seasonal-post-template-missing.md";
    const warningSpy = jest.spyOn(core, "warning").mockImplementation();
    jest
      .spyOn(GetJsonFile, "getJsonFile")
      .mockReturnValueOnce(books)
      .mockReturnValueOnce(recipes);
    jest.spyOn(GetDataFile, "getDataFile").mockReturnValueOnce(playlists);

    const writeSpy = jest.spyOn(promises, "writeFile").mockImplementation();
    await action();
    expect(warningSpy).toHaveBeenCalledWith(
      'Could not find template file ".github/actions/seasonal-post-template-missing.md". Using default template.'
    );
    expect(setFailed).not.toHaveBeenCalled();
    expect(writeSpy.mock.calls[0]).toMatchSnapshot();
  });

  test("works, disable playlist", async () => {
    defaultInputs["source-books"] = "books|_data/read.json";
    defaultInputs["source-bookmarks"] = "bookmarks|_data/bookmarks.json";
    defaultInputs["source-playlist"] = "false";

    jest
      .spyOn(GetJsonFile, "getJsonFile")
      .mockReturnValueOnce(books)
      .mockReturnValueOnce(recipes);
    jest.spyOn(GetDataFile, "getDataFile").mockReturnValueOnce([]);
    const writeSpy = jest.spyOn(promises, "writeFile").mockImplementation();
    await action();
    expect(setFailed).not.toHaveBeenCalled();
    expect(writeSpy.mock.calls[0]).toMatchSnapshot();
  });

  test("works, disable bookmarks", async () => {
    defaultInputs["source-books"] = "books|_data/read.json";
    defaultInputs["source-bookmarks"] = "false";
    defaultInputs["source-playlist"] = "_data/playlists.yml";

    jest
      .spyOn(GetJsonFile, "getJsonFile")
      .mockReturnValueOnce(books)
      .mockReturnValueOnce([]);
    jest.spyOn(GetDataFile, "getDataFile").mockReturnValueOnce(playlists);
    const writeSpy = jest.spyOn(promises, "writeFile").mockImplementation();
    await action();
    expect(setFailed).not.toHaveBeenCalled();
    expect(writeSpy.mock.calls[0]).toMatchSnapshot();
  });

  test("works, disable books", async () => {
    defaultInputs["source-books"] = "false";
    defaultInputs["source-bookmarks"] = "bookmarks|_data/bookmarks.json";
    defaultInputs["source-playlist"] = "_data/playlists.yml";
    jest
      .spyOn(GetJsonFile, "getJsonFile")
      .mockReturnValueOnce([])
      .mockReturnValueOnce(recipes);
    jest.spyOn(GetDataFile, "getDataFile").mockReturnValueOnce(playlists);
    const writeSpy = jest.spyOn(promises, "writeFile").mockImplementation();
    await action();
    expect(setFailed).not.toHaveBeenCalled();
    expect(writeSpy.mock.calls[0]).toMatchSnapshot();
  });

  test("fails", async () => {
    const setFailedSpy = jest.spyOn(core, "setFailed");

    jest.spyOn(core, "getInput").mockImplementation(() => {
      throw new Error("test error");
    });
    await action();
    expect(setFailedSpy.mock.calls[0][0]).toMatchInlineSnapshot(
      `[Error: test error]`
    );
  });
});

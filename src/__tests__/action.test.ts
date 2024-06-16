import { action } from "../action";
import { setFailed } from "@actions/core";
import * as GetDataFile from "../get-data-file";
import * as GetJsonFile from "../get-json-file";
import * as Format from "../format";
import recipes from "./fixtures/recipes.json";
import playlists from "./fixtures/playlists.json";
import books from "./fixtures/books.json";
import { promises } from "fs";
import * as core from "@actions/core";
import * as github from "@actions/github";

jest.mock("@actions/core");

const defaultInputs = {
  "github-username": "katydecorah",
  "github-repository": "archive",
  "posts-directory": "notes/_posts/",
  "post-template": "",
  "source-books": "books|_data/read.json",
  "source-bookmarks": "bookmarks|_data/bookmarks.json",
  "source-playlist": "_data/playlists.yml",
  "book-tags": "recommend, skip",
};

beforeEach(() => {
  Object.defineProperty(github, "context", {
    value: {
      payload: {
        inputs: {
          "start-date": "2021-06-21",
          "end-date": "2021-09-20",
          "post-title": "2021 Summer",
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
    const exportVariableSpy = jest.spyOn(core, "exportVariable");
    const writeSpy = jest.spyOn(promises, "writeFile").mockImplementation();
    await action();

    expect(warningSpy).not.toHaveBeenCalled();
    expect(exportVariableSpy).toHaveBeenCalledWith("post-title", "2021 Summer");
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
    defaultInputs["post-template"] = ".github/actions/post-template-basic.md";

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
    defaultInputs["post-template"] = ".github/actions/post-template-missing.md";
    const warningSpy = jest.spyOn(core, "warning").mockImplementation();
    jest
      .spyOn(GetJsonFile, "getJsonFile")
      .mockReturnValueOnce(books)
      .mockReturnValueOnce(recipes);
    jest.spyOn(GetDataFile, "getDataFile").mockReturnValueOnce(playlists);

    const writeSpy = jest.spyOn(promises, "writeFile").mockImplementation();
    await action();
    expect(warningSpy).toHaveBeenCalledWith(
      'Could not find template file ".github/actions/post-template-missing.md". Using default template.'
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

  test("works, disable book-tags", async () => {
    defaultInputs["source-books"] = "books|_data/read.json";
    defaultInputs["source-bookmarks"] = "false";
    defaultInputs["source-playlist"] = "false";
    defaultInputs["book-tags"] = "";

    jest
      .spyOn(GetJsonFile, "getJsonFile")
      .mockReturnValueOnce(books)
      .mockReturnValueOnce([]);
    jest.spyOn(GetDataFile, "getDataFile").mockReturnValueOnce([]);
    const writeSpy = jest.spyOn(promises, "writeFile").mockImplementation();
    await action();
    expect(setFailed).not.toHaveBeenCalled();
    expect(writeSpy.mock.calls[0]).toMatchSnapshot();
  });
});

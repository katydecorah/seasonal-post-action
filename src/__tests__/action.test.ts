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

jest.mock("@actions/core");

jest.useFakeTimers().setSystemTime(new Date("2021-9-20"));

describe("action", () => {
  test("works", async () => {
    const getJsonFileSpy = jest
      .spyOn(GetJsonFile, "getJsonFile")
      .mockReturnValueOnce(books);
    const getDataFileSpy = jest
      .spyOn(GetDataFile, "getDataFile")
      .mockReturnValueOnce(recipes)
      .mockReturnValueOnce(playlists);
    const formatBooksSpy = jest.spyOn(Format, "formatBooks");
    const formatRecipesSpy = jest.spyOn(Format, "formatRecipes");
    const formatPlaylistsSpy = jest.spyOn(Format, "formatPlaylist");
    const formatFrontMatterSpy = jest.spyOn(Format, "formatFrontMatter");
    const findSeasonSpy = jest.spyOn(FindSeason, "findSeason");
    const writeSpy = jest.spyOn(promises, "writeFile").mockImplementation();
    await action();
    expect(findSeasonSpy).toHaveReturnedWith({
      end: "2021-09-20",
      name: "2021 Summer",
      season: "Summer",
      start: "2021-06-21",
      year: 2021,
    });
    expect(exportVariable).toHaveBeenLastCalledWith("season", "2021 Summer");
    expect(getJsonFileSpy).toHaveBeenNthCalledWith(1, "read.json");
    expect(getJsonFileSpy).toHaveNthReturnedWith(1, books);
    expect(getDataFileSpy).toHaveBeenNthCalledWith(1, "recipes.yml");
    expect(getDataFileSpy).toHaveBeenNthCalledWith(2, "playlists.yml");
    expect(setFailed).not.toHaveBeenCalled();
    expect(formatBooksSpy).toHaveBeenCalled();
    expect(formatRecipesSpy).toHaveBeenCalled();
    expect(formatPlaylistsSpy).toHaveBeenCalled();
    expect(formatFrontMatterSpy).toHaveReturned();
    expect(writeSpy.mock.calls[0]).toMatchSnapshot();
  });

  test("fails", async () => {
    jest
      .spyOn(GetDataFile, "getDataFile")
      .mockRejectedValue({ message: "Error" });
    await action();
    expect(setFailed).toHaveBeenCalledWith("Error");
  });
});

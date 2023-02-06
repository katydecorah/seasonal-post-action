import { writeFile } from "fs/promises";
import { exportVariable, getInput, setFailed } from "@actions/core";
import { buildPost } from "./build-post";
import {
  formatPlaylist,
  formatRecipes,
  formatBooks,
  formatFrontMatter,
} from "./format";
import { findSeason } from "./find-season";
import { getDataFile } from "./get-data-file";
import { getJsonFile } from "./get-json-file";
import { join } from "path";

export async function action() {
  try {
    const { start, end, season, year, name } = findSeason();
    const image = `${year}-${season.toLowerCase()}.png`;

    exportVariable("season", name);

    const [bookData, recipeData, playlistData] = await Promise.all([
      getJsonFile("read.json"),
      getJsonFile("recipes.json"),
      getDataFile("playlists.yml"),
    ]);

    const { bookYaml, bookText } = formatBooks({ bookData, start, end });
    const { recipeYaml, recipeText } = formatRecipes({
      recipeData,
      start,
      end,
    });
    const { playlistYaml, playlistText } = formatPlaylist({
      playlistData,
      name,
    });

    // build post
    const frontmatter = formatFrontMatter({
      year,
      season,
      image,
      bookYaml,
      recipeYaml,
      playlistYaml,
    });

    const md = buildPost({
      frontmatter,
      season,
      bookText,
      playlistText,
      recipeText,
    });

    const postsDir = getInput("PostsDir");

    const blogFilePath = join(
      postsDir,
      `${end}-${year}-${season.toLowerCase()}.md`
    );

    await writeFile(blogFilePath, md);
  } catch (error) {
    setFailed(error);
  }
}

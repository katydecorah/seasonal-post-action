import { writeFile } from "fs/promises";
import { exportVariable, setFailed } from "@actions/core";
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

export async function action() {
  try {
    const { start, end, season, year, name } = findSeason();
    const image = `${year}-${season.toLowerCase()}.png`;

    exportVariable("season", name);

    const [bookData, recipeData, playlistData] = await Promise.all([
      getJsonFile("read.json"),
      getDataFile("recipes.yml"),
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

    await writeFile(
      `./notes/_posts/${end}-${year}-${season.toLowerCase()}.md`,
      md
    );
  } catch (error) {
    setFailed(error.message);
  }
}

import { writeFile } from "fs/promises";
import { exportVariable, info, setFailed } from "@actions/core";
import { buildPost } from "./build-post";
import {
  formatPlaylist,
  formatRecipes,
  formatBooks,
  formatFrontMatter,
} from "./format";
import { findSeason } from "./find-season";
import { getDataFile } from "./get-data-file";

export async function action() {
  try {
    const { start, end, season, year, name } = findSeason();
    const image = `${year}-${season.toLowerCase()}.png`;

    exportVariable("season", name);

    const files = await Promise.all([
      getDataFile("read.yml"),
      getDataFile("recipes.yml"),
      getDataFile("playlists.yml"),
    ]);

    const { bookYaml, bookText } = formatBooks({
      bookData: files[0],
      start,
      end,
    });

    const { recipeYaml, recipeText } = formatRecipes({
      recipeData: files[1],
      start,
      end,
    });

    const { playlistYaml, playlistText } = formatPlaylist({
      playlistData: files[2],
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

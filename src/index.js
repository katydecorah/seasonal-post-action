import { writeFileSync } from "fs";
import { exportVariable, setFailed } from "@actions/core";
import {
  getDataFile,
  findSeason,
  formatPlaylist,
  formatFrontMatter,
  formatBooks,
  formatRecipes,
  buildPost,
} from "./utils.js";

const main = async () => {
  try {
    const { start, end, season, year, name } = findSeason();
    const image = `${year}-${season.toLowerCase()}.png`;

    exportVariable("season", name);

    (async () => {
      // fetch books
      const bookData = await getDataFile("read.yml");
      if (!bookData.length) setFailed("Did not find books.");
      const { bookYaml, bookText } = formatBooks({ bookData, start, end });

      // fetch recipes
      const recipeData = await getDataFile("recipes.yml");
      if (!recipeData.length) setFailed("Did not find recipes.");
      const { recipeYaml, recipeText } = formatRecipes({
        recipeData,
        start,
        end,
      });

      // fetch playlist
      const playlistData = await getDataFile("playlists.yml");
      if (!playlistData.length) setFailed("Did not find playlists.");
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
      writeFileSync(
        `./notes/_posts/${end}-${year}-${season.toLowerCase()}.md`,
        md
      );
    })();
  } catch (error) {
    setFailed(error.message);
  }
};

main().catch((err) => setFailed(err.message));

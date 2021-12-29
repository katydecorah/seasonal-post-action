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

async function main() {
  try {
    const { start, end, season, year, name } = findSeason();
    const image = `${year}-${season.toLowerCase()}.png`;

    exportVariable("season", name);

    (async () => {
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
      writeFileSync(
        `./notes/_posts/${end}-${year}-${season.toLowerCase()}.md`,
        md
      );
    })();
  } catch (error) {
    setFailed(error.message);
  }
}

main().catch((err) => setFailed(err.message));

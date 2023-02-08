import { writeFile, readFile } from "fs/promises";
import { exportVariable, getInput, setFailed, warning } from "@actions/core";
import { buildPost } from "./build-post";
import { formatPlaylist, formatRecipes, formatBooks } from "./format";
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

    const { bookYaml, bookMarkdown } = formatBooks({ bookData, start, end });
    const { recipeYaml, recipeMarkdown } = formatRecipes({
      recipeData,
      start,
      end,
    });
    const { playlistYaml, playlistMarkdown } = formatPlaylist({
      playlistData,
      name,
    });

    const templatePath = getInput("SeasonalPostTemplate");
    let template = await readFile(join(__dirname, "template.md"), "utf8");

    if (templatePath) {
      try {
        template = await readFile(templatePath, "utf8");
      } catch (error) {
        warning(
          `Could not find template file "${templatePath}". Using default template.`
        );
      }
    }

    // build post
    const md = buildPost({
      season,
      bookMarkdown,
      playlistMarkdown,
      recipeMarkdown,
      year,
      image,
      bookYaml,
      recipeYaml,
      playlistYaml,
      template,
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

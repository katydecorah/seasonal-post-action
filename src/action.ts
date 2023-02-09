import { writeFile, readFile } from "fs/promises";
import { exportVariable, getInput, setFailed, warning } from "@actions/core";
import { buildPost } from "./build-post";
import { formatPlaylist, formatBookmarks, formatBooks } from "./format";
import { findSeason } from "./find-season";
import { getDataFile } from "./get-data-file";
import { getJsonFile } from "./get-json-file";
import { join } from "path";

export async function action() {
  try {
    const { start, end, season, year, name } = findSeason();
    const image = `${year}-${season.toLowerCase()}.png`;

    exportVariable("season", name);

    const sourceBooks = getInput("source-books");
    const sourceBookmarks = getInput("source-bookmarks");
    const sourcePlaylist = getInput("source-playlist");

    let bookKeyName, bookPath, bookmarkKeyName, bookmarkPath, playlistPath;

    if (sourceBooks !== "false") {
      [bookKeyName, bookPath] = sourceBooks.split("|");
    }

    if (sourceBookmarks !== "false") {
      [bookmarkKeyName, bookmarkPath] = sourceBookmarks.split("|");
    }

    if (sourcePlaylist !== "false") {
      playlistPath = sourcePlaylist;
    }

    const [bookData, bookmarkData, playlistData] = await Promise.all([
      getJsonFile(bookPath),
      getJsonFile(bookmarkPath),
      getDataFile(playlistPath),
    ]);

    const { bookYaml, bookMarkdown } = formatBooks({
      bookKeyName,
      bookData,
      start,
      end,
    });

    const { bookmarkYaml, bookmarkMarkdown } = formatBookmarks({
      bookmarkKeyName,
      bookmarkData,
      start,
      end,
    });

    const { playlistYaml, playlistMarkdown } = formatPlaylist({
      playlistData,
      name,
    });

    const templatePath = getInput("seasonal-post-template");
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
      bookmarkMarkdown,
      year,
      image,
      bookYaml,
      bookmarkYaml,
      playlistYaml,
      template,
    });

    const postsDir = getInput("posts-directory");

    const blogFilePath = join(
      postsDir,
      `${end}-${year}-${season.toLowerCase()}.md`
    );

    await writeFile(blogFilePath, md);
  } catch (error) {
    setFailed(error);
  }
}

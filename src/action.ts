import { writeFile, readFile } from "fs/promises";
import { exportVariable, getInput, setFailed, warning } from "@actions/core";
import { buildPost } from "./build-post";
import { formatPlaylist, formatBookmarks, formatBooks } from "./format";
import { getDataFile } from "./get-data-file";
import { getJsonFile } from "./get-json-file";
import { join } from "path";
import * as github from "@actions/github";

export async function action() {
  try {
    const payload = github.context.payload.inputs;
    const {
      "post-title": title,
      "start-date": startData,
      "end-date": endDate,
    } = payload;

    validateInputs(title, startData, endDate);

    const slugifyTitle = title.toLowerCase().replace(/\s/g, "-");

    const image = `${slugifyTitle}.png`;

    exportVariable("post-title", title);

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
      start: startData,
      end: endDate,
    });

    const { bookmarkYaml, bookmarkMarkdown } = formatBookmarks({
      bookmarkKeyName,
      bookmarkData,
      start: startData,
      end: endDate,
    });

    const { playlistYaml, playlistMarkdown } = formatPlaylist({
      playlistData,
      title,
    });

    const templatePath = getInput("post-template");
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
      title,
      bookMarkdown,
      playlistMarkdown,
      bookmarkMarkdown,
      image,
      bookYaml,
      bookmarkYaml,
      playlistYaml,
      template,
    });

    const postsDir = getInput("posts-directory");

    const blogFilePath = join(
      postsDir,
      `${endDate}-${slugifyTitle.toLowerCase()}.md`
    );

    await writeFile(blogFilePath, md);
  } catch (error) {
    setFailed(error);
  }
}

function validateInputs(title, start, end) {
  // validate inputs, start and end dates are required
  if (!title) {
    throw new Error("Title is required.");
  }

  if (!start) {
    throw new Error("Start date is required.");
  }

  if (!end) {
    throw new Error("End date is required.");
  }

  // start and end must be in YYYY-MM-DD format
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!datePattern.test(start) || !datePattern.test(end)) {
    throw new Error("Start and end dates must be in YYYY-MM-DD format.");
  }

  // start date must be before end date
  if (new Date(start) > new Date(end)) {
    throw new Error("Start date must be before end date.");
  }
}

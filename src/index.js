import { Octokit } from "octokit";
import { load, dump } from "js-yaml";
import { writeFileSync } from "fs";
import { exportVariable, setFailed, warning } from "@actions/core";

const main = async () => {
  const GITHUB_TOKEN = core.getInput("repo-token");

  const octokit = new Octokit({
    auth: GITHUB_TOKEN,
  });

  try {
    const { start, end, season, year, name } = findSeason();
    const image = `${year}-${season.toLowerCase()}.png`;

    exportVariable("season", name);

    (async () => {
      // fetch books
      const bookData = await getDataFile("read.yml");
      if (!bookData.length) setFailed("Did not find books.");
      const books = filterData(bookData, "dateFinished", start, end).map(
        ({ title, authors, canonicalVolumeLink, isbn }) => ({
          title,
          authors: authors.join(", "),
          url: canonicalVolumeLink,
          isbn,
        })
      );

      // fetch recipes
      const recipeData = await getDataFile("recipes.yml");
      if (!recipeData.length) setFailed("Did not find recipes.");
      const recipes = filterData(recipeData, "date", start, end).map(
        ({ title, site, url }) => ({
          title,
          site,
          url,
        })
      );

      // fetch playlist
      const playlistData = await getDataFile("playlists.yml");
      if (!playlistData.length) setFailed("Did not find playlists.");
      const playlist = playlistData.find(({ playlist }) => playlist === name);

      const md = `---
title: ${year} ${season}
image: ${image}
type: season
books:
${dump(books)}
recipes:
${dump(recipes)}
${playlist && dump(playlist)}
---

The books, music, and recipes I enjoyed this ${season.toLowerCase()}.

## Books

${books
  .map(({ title, authors, url }) => `* [${title}](${url}) - ${authors}`)
  .join("\n")}

## Playlist

${
  playlist &&
  playlist.tracks
    .map(({ track, artist }) => `* ${track} - ${artist}`)
    .join("\n")
}

## Recipes

${recipes
  .map(({ title, site, url }) => `* [${title}](${url}) - ${site}`)
  .join("\n")}
`;

      writeFileSync(
        `./notes/_posts/${end}-${year}-${season.toLowerCase()}.md`,
        md
      );
    })();
  } catch (error) {
    setFailed(error.message);
  }
};

main().catch((err) => core.setFailed(err.message));

export async function getDataFile(file) {
  try {
    const { data } = await octokit.rest.repos.getContent({
      mediaType: {
        format: "raw",
      },
      owner: "katydecorah",
      repo: "has",
      path: `_data/${file}`,
    });
    warning(data);
    return load(data);
  } catch (err) {
    setFailed(err);
  }
}

export function filterData(data, field, start, end) {
  return data.filter((f) => f[field] >= start && f[field] <= end);
}

export function findSeason() {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const season = {
    2: "Winter",
    5: "Spring",
    8: "Summer",
    11: "Fall",
  };
  const dates = {
    2: ["12", "03"],
    5: ["03", "06"],
    8: ["06", "09"],
    11: ["09", "12"],
  };
  return {
    name: `${month == 2 ? `${year - 1}/${year}` : year} ${season[month]}`,
    season: season[month],
    year: year,
    start: `${month === 2 ? `${year - 1}` : `${year}`}-${dates[month][0]}-21`,
    end: `${year}-${dates[month][1]}-20`,
  };
}

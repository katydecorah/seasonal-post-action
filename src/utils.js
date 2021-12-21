import { Octokit } from "octokit";
import { load, dump } from "js-yaml";
import { setFailed } from "@actions/core";

const octokit = new Octokit({
  auth: process.env.TOKEN,
});

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

export function formatFrontMatter({
  year,
  season,
  image,
  bookYaml,
  recipeYaml,
  playlistYaml,
}) {
  return `---
title: ${year} ${season}
image: ${image}
type: season
${bookYaml}
${recipeYaml}
${playlistYaml}
---`;
}

export function formatBooks({ bookData, start, end }) {
  const books = filterData(bookData, "dateFinished", start, end).map(
    ({ title, authors, canonicalVolumeLink, isbn }) => ({
      title,
      authors: authors.join(", "),
      url: canonicalVolumeLink,
      isbn,
    })
  );
  return {
    bookYaml: dump({ books }),
    bookText: books
      .map(({ title, authors, url }) => `- [${title}](${url}) - ${authors}`)
      .join("\n"),
  };
}

export function formatRecipes({ recipeData, start, end }) {
  const recipes = filterData(recipeData, "date", start, end).map(
    ({ title, site, url }) => ({
      title,
      site,
      url,
    })
  );
  return {
    recipeYaml: dump({ recipes }),
    // remove irregular whitespace
    recipeText: recipes
      .map(
        ({ title, site, url }) =>
          `- [${title.replace(" ", "")}](${url}) - ${site}`
      )
      .join("\n"),
  };
}

export function formatPlaylist({ playlistData, name }) {
  const playlist = playlistData.find(({ playlist }) => playlist === name);
  return {
    playlistYaml: dump(playlist),
    playlistText: playlist.tracks
      .map(({ track, artist }) => `- ${track} - ${artist}`)
      .join("\n"),
  };
}

export function buildPost({
  frontmatter,
  season,
  bookText,
  playlistText,
  recipeText,
}) {
  return `${frontmatter}

The books, music, and recipes I enjoyed this ${season.toLowerCase()}.

## Books

${bookText}

## Playlist

${playlistText}

## Recipes

${recipeText}
`;
}

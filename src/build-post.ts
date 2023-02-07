import { getInput } from "@actions/core";
import { readFileSync } from "fs";

export function buildPost({
  season,
  bookMarkdown,
  playlistMarkdown,
  recipeMarkdown,
  year,
  image,
  bookYaml,
  recipeYaml,
  playlistYaml,
}) {
  const templatePath = getInput("SeasonalPostTemplate");
  const template = readFileSync(templatePath, "utf8");

  return transformTemplate(template, {
    season,
    bookMarkdown,
    playlistMarkdown,
    recipeMarkdown,
    year,
    image,
    bookYaml,
    recipeYaml,
    playlistYaml,
  });
}

function transformTemplate(
  template: string,
  {
    season,
    bookMarkdown,
    playlistMarkdown,
    recipeMarkdown,
    year,
    image,
    bookYaml,
    recipeYaml,
    playlistYaml,
  }
): string {
  return template
    .replace(/\$\{season\}/g, season)
    .replace(/\$\{year\}/g, year)
    .replace(/\$\{image\}/g, image)
    .replace(/\$\{bookYaml\}/g, bookYaml)
    .replace(/\$\{recipeYaml\}/g, recipeYaml)
    .replace(/\$\{playlistYaml\}/g, playlistYaml)
    .replace(/\$\{bookMarkdown\}/g, bookMarkdown)
    .replace(/\$\{playlistMarkdown\}/g, playlistMarkdown)
    .replace(/\$\{recipeMarkdown\}/g, recipeMarkdown);
}

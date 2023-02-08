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
  template,
}) {
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

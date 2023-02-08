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
  const postVars = {
    season,
    bookMarkdown,
    playlistMarkdown,
    recipeMarkdown,
    year,
    image,
    bookYaml,
    recipeYaml,
    playlistYaml,
  };
  return template.replace(
    /\${([^{}]+)}/g,
    (_, key: string) => postVars[key] || ""
  );
}

export function buildPost({
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
}) {
  const postVars = {
    season,
    bookMarkdown,
    playlistMarkdown,
    bookmarkMarkdown,
    year,
    image,
    bookYaml,
    bookmarkYaml,
    playlistYaml,
  };

  const safePattern = /\${([a-zA-Z_][a-zA-Z0-9_]*)}/g;

  const replacedTemplate = template.replace(safePattern, (match, key) => {
    if (Object.prototype.hasOwnProperty.call(postVars, key)) {
      return postVars[key];
    }
    return "";
  });

  return replacedTemplate;
}

export function buildPost({
  title,
  bookMarkdown,
  playlistMarkdown,
  bookmarkMarkdown,
  image,
  bookYaml,
  bookmarkYaml,
  playlistYaml,
  template,
}) {
  const postVars = {
    title,
    bookMarkdown,
    playlistMarkdown,
    bookmarkMarkdown,
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

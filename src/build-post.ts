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
  return template.replace(
    /\${([^{}]+)}/g,
    (_, key: string) => postVars[key] || ""
  );
}

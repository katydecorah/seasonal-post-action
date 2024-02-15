import { Liquid } from "liquidjs";
const engine = new Liquid();

export async function buildPost({
  season,
  books,
  playlistTracks,
  bookmarks,
  year,
  image,
  bookYaml,
  bookmarkYaml,
  playlistYaml,
  template,
}) {
  return await engine.parseAndRender(template, {
    season,
    books,
    playlistTracks,
    bookmarks,
    year,
    image,
    bookYaml,
    bookmarkYaml,
    playlistYaml,
  });
}

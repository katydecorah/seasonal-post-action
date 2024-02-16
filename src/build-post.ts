import { dump } from "js-yaml";
import { Liquid } from "liquidjs";
const engine = new Liquid();

export async function buildPost({
  season,
  books,
  playlist,
  bookmarks,
  year,
  image,
  template,
}) {
  /* istanbul ignore next */
  engine.registerFilter("name", (initial, key) => {
    if (!initial) return null;
    if (Array.isArray(initial) && initial.length === 0) return null;
    if (!key) return dump(initial);
    return dump({
      [key]: initial,
    });
  });
  /* istanbul ignore next */
  engine.registerFilter("yaml", (initial, ...allowedKeys) => {
    if (!initial) return null;
    if (Array.isArray(initial) && initial.length === 0) return null;
    if (!allowedKeys.length) return dump(initial);
    return dump(
      initial.reduce((acc, item) => {
        const newItem = allowedKeys.reduce((obj, key) => {
          obj[key] = item[key];
          return obj;
        }, {});
        return [...acc, newItem];
      }, [])
    );
  });
  return await engine.parseAndRender(template, {
    season,
    books,
    playlist,
    bookmarks,
    year,
    image,
  });
}

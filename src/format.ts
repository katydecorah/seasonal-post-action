import { dump } from "js-yaml";

export function formatBooks({ bookData, start, end }) {
  const books: Book[] = filterData(bookData, "dateFinished", start, end).map(
    ({ title, authors, link, isbn }) => ({
      title,
      authors: authors.join(", "),
      url: link,
      isbn,
    })
  );
  return {
    bookYaml: dump({ books }),
    bookMarkdown: books
      .map(({ title, authors, url }) => `- [${title}](${url}) - ${authors}`)
      .join("\n"),
  };
}

export function formatPlaylist({ playlistData, name }) {
  const playlist: Playlist = playlistData.find(
    ({ playlist }) => playlist === name
  );
  return {
    playlistYaml: dump(playlist),
    playlistMarkdown: playlist.tracks
      .map(({ track, artist }) => `- ${track} - ${artist}`)
      .join("\n"),
  };
}

export function formatRecipes({ recipeData, start, end }): {
  recipeYaml: string;
  // remove irregular whitespace
  recipeMarkdown: string;
} {
  const recipes: Recipe[] = filterData(recipeData, "date", start, end).map(
    ({ title, site, url, image }) => ({
      title,
      site,
      url,
      image,
    })
  );
  return {
    recipeYaml: dump({ recipes }),
    // remove irregular whitespace
    recipeMarkdown: recipes
      .map(
        ({ title, site, url }) =>
          `- [${title.replace(" ", "")}](${url}) - ${site}`
      )
      .join("\n"),
  };
}

export function filterData(
  data: DataFile[],
  field: "dateFinished" | "date",
  start: number,
  end: number
): DataFile[] {
  return data.filter((f) => f[field] >= start && f[field] <= end);
}

export type Book = {
  title: string;
  authors: string;
  url: string;
  isbn: string;
};

export type Recipe = {
  title: string;
  site: string;
  url: string;
  image: string;
};

export type Track = {
  track: string;
  artist: string;
  albumn: string;
};

export type Playlist = {
  playlist: string;
  spotify: string;
  tracks: Track[];
};

export type DataFile = {
  title: string;
  authors: string[];
  link: string;
  isbn: string;
  site: string;
  url: string;
  dateFinished: number;
  date: number;
  image: string;
};

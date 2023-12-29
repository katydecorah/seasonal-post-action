import { getInput } from "@actions/core";
import { dump } from "js-yaml";

export function formatBooks({ bookKeyName, bookData, start, end }) {
  if (!bookData || bookData.length === 0) {
    return {
      bookYaml: "",
      bookMarkdown: "",
    };
  }
  const bookTags = getInput("book-tags")
    ? getInput("book-tags")
        .split(",")
        .map((tag) => tag.trim())
    : [];

  const books: Book[] = filterData(bookData, "dateFinished", start, end)
    .filter((book) => !book.tags?.includes("hide"))
    .map(({ title, authors, link, isbn, tags }) => {
      tags =
        bookTags.length > 0
          ? tags?.filter((tag) => bookTags.includes(tag))
          : [];
      return {
        title,
        authors: authors.join(", "),
        url: link,
        isbn,
        ...(tags?.length && { tags }),
      };
    });

  return {
    bookYaml: dump({ [bookKeyName]: books }),
    bookMarkdown: books
      .map(
        ({ title, authors, url, tags }) =>
          `- [${title}](${url}) - ${authors}${
            tags ? ` (${tags.join(", ")})` : ""
          }`
      )
      .join("\n"),
  };
}

export function formatPlaylist({ playlistData, name }) {
  if (!playlistData || playlistData.length === 0) {
    return {
      playlistYaml: "",
      playlistMarkdown: "",
    };
  }
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

export function formatBookmarks({
  bookmarkKeyName,
  bookmarkData,
  start,
  end,
}): {
  bookmarkYaml: string;
  // remove irregular whitespace
  bookmarkMarkdown: string;
} {
  if (!bookmarkData || bookmarkData.length === 0) {
    return {
      bookmarkYaml: "",
      bookmarkMarkdown: "",
    };
  }
  const bookmarks: Bookmark[] = filterData(
    bookmarkData,
    "date",
    start,
    end
  ).map(({ title, site, url, image }) => ({
    title,
    site,
    url,
    image,
  }));
  return {
    bookmarkYaml: dump({ [bookmarkKeyName]: bookmarks }),
    // remove irregular whitespace
    bookmarkMarkdown: bookmarks
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
  tags?: string[];
};

export type Bookmark = {
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
  tags?: string[];
};

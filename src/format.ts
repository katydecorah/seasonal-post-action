import { getInput } from "@actions/core";

export function formatBooks({ bookData, start, end }) {
  if (!bookData || bookData.length === 0) {
    return {
      books: [],
    };
  }
  const bookTags = getInput("book-tags")
    ? getInput("book-tags")
        .split(",")
        .map((tag) => tag.trim())
    : [];

  const books: Book[] = filterData(bookData, "dateFinished", start, end)
    .filter((book) => !book.tags?.includes("hide"))
    .map((book) => {
      const tags =
        bookTags.length > 0
          ? book.tags?.filter((tag) => bookTags.includes(tag))
          : [];
      const newBook = {
        ...book,
        authors: book.authors.join(", "),
        url: book.link,
        tags,
      };
      if (newBook?.tags?.length === 0) {
        delete newBook.tags;
      }
      return newBook;
    });

  return {
    books,
  };
}

export function formatPlaylist({ playlistData, name }) {
  if (!playlistData || playlistData.length === 0) {
    return {
      playlist: [],
    };
  }
  const playlist: Playlist = playlistData.find(
    ({ playlist }) => playlist === name
  );
  return {
    playlist,
  };
}

export function formatBookmarks({ bookmarkData, start, end }) {
  if (!bookmarkData || bookmarkData.length === 0) {
    return {
      bookmarks: [],
    };
  }
  const bookmarks: Bookmark[] = filterData(bookmarkData, "date", start, end);
  return {
    bookmarks: bookmarks.map((bookmark) => ({
      ...bookmark,
      title: bookmark.title.replace(" ", ""),
    })),
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
  album: string;
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

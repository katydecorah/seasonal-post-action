type Book = {
  title: string;
  authors: string;
  url: string;
  isbn: string;
};

type Recipe = {
  title: string;
  site: string;
  url: string;
};

type Track = {
  track: string;
  artist: string;
  albumn: string;
};

type Playlist = {
  playlist: string;
  spotify: string;
  tracks: Track[];
};

type DataFile = {
  title: string;
  authors: string[];
  canonicalVolumeLink: string;
  isbn: string;
  site: string;
  url: string;
  dateFinished: number;
  date: number;
};

type Seasons = "Winter" | "Spring" | "Summer" | "Fall";

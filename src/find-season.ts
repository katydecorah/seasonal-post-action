import { exportVariable, getInput, setFailed } from "@actions/core";
import * as github from "@actions/github";

export type Seasons = "Winter" | "Spring" | "Summer" | "Fall";

export function findSeason(): {
  name: string;
  season: Seasons;
  year: number;
  start: string;
  end: string;
  seasonEmoji: string;
} {
  const payload = github.context.payload.inputs;

  const today = payload.date ? new Date(payload.date) : new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const [marchEnd, juneEnd, septemberEnd, decemberEnd] = getInput(
    "season-names"
  )
    .split(",")
    .map((s) => s.trim());
  const seasons = {
    2: marchEnd,
    5: juneEnd,
    8: septemberEnd,
    11: decemberEnd,
  };
  const season = seasons[month];
  const seasonEmojis = getInput("season-emoji").split(",");
  const seasonEmoji =
    seasonEmojis[Object.keys(seasons).indexOf(month.toString())];
  exportVariable("seasonEmoji", seasonEmoji);
  const dates = {
    2: ["12", "03"],
    5: ["03", "06"],
    8: ["06", "09"],
    11: ["09", "12"],
  };
  if (dates[month] === undefined) {
    setFailed(
      `The current date is out of range, it's not time to create a playlist yet.`
    );
  }
  return {
    name: `${month == 2 ? `${year - 1}/${year}` : year} ${season}`,
    season,
    year,
    start: `${month === 2 ? `${year - 1}` : `${year}`}-${dates[month][0]}-21`,
    end: `${year}-${dates[month][1]}-20`,
    seasonEmoji,
  };
}

import * as github from "@actions/github";
import { setFailed } from "@actions/core";

export type Seasons = "Winter" | "Spring" | "Summer" | "Fall";

export function findSeason(): {
  name: string;
  season: Seasons;
  year: number;
  start: string;
  end: string;
} {
  const payload = github.context.payload.inputs;

  const today = payload.date ? new Date(payload.date) : new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const season = {
    2: "Winter",
    5: "Spring",
    8: "Summer",
    11: "Fall",
  };
  const dates = {
    2: ["12", "03"],
    5: ["03", "06"],
    8: ["06", "09"],
    11: ["09", "12"],
  };
  if (dates[month] === undefined) {
    setFailed(
      `The current date is out of range, it's not time to create a playlist yet. If testing, set the env variable \`SETDATE\`.`
    );
  }
  return {
    name: `${month == 2 ? `${year - 1}/${year}` : year} ${season[month]}`,
    season: season[month],
    year: year,
    start: `${month === 2 ? `${year - 1}` : `${year}`}-${dates[month][0]}-21`,
    end: `${year}-${dates[month][1]}-20`,
  };
}

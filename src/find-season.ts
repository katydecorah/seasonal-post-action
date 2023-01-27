import { exportVariable, getInput, setFailed } from "@actions/core";

export type Seasons = "Winter" | "Spring" | "Summer" | "Fall";

export function findSeason(): {
  name: string;
  season: Seasons;
  year: number;
  start: string;
  end: string;
  seasonEmoji: string;
} {
  const today = process.env.SETDATE
    ? new Date(process.env.SETDATE)
    : new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const seasons = {
    2: "Winter",
    5: "Spring",
    8: "Summer",
    11: "Fall",
  };
  const season = seasons[month];
  const seasonEmojis = getInput("SeasonEmoji").split(",");
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
      `The current date is out of range, it's not time to create a playlist yet. If testing, set the env variable \`SETDATE\`.`
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

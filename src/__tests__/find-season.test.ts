import { findSeason } from "../find-season";
import { setFailed } from "@actions/core";
import * as core from "@actions/core";
import * as github from "@actions/github";

jest.mock("@actions/core");

const defaultInputs = {
  "github-username": "katydecorah",
  "github-repository": "archive",
  "season-emoji": "❄️,🌷,☀️,🍂",
  "season-names": "Winter,Spring,Summer,Fall",
  "posts-dir": "notes/_posts/",
  "seasonal-post-template": ".github/actions/seasonal-post-template.md",
};

beforeEach(() => {
  Object.defineProperty(github, "context", {
    value: {
      payload: {
        inputs: {
          date: undefined,
        },
      },
    },
  });
  jest
    .spyOn(core, "getInput")
    .mockImplementation((name) => defaultInputs[name] || undefined);
});

describe("findSeason", () => {
  it("works", () => {
    jest.useFakeTimers().setSystemTime(new Date("2021-3-20").getTime());
    expect(findSeason()).toMatchInlineSnapshot(`
      {
        "end": "2021-03-20",
        "name": "2020/2021 Winter",
        "season": "Winter",
        "seasonEmoji": "❄️",
        "start": "2020-12-21",
        "year": 2021,
      }
    `);

    jest.useFakeTimers().setSystemTime(new Date("2021-6-20").getTime());
    expect(findSeason()).toMatchInlineSnapshot(`
      {
        "end": "2021-06-20",
        "name": "2021 Spring",
        "season": "Spring",
        "seasonEmoji": "🌷",
        "start": "2021-03-21",
        "year": 2021,
      }
    `);

    jest.useFakeTimers().setSystemTime(new Date("2021-9-20").getTime());
    expect(findSeason()).toMatchInlineSnapshot(`
      {
        "end": "2021-09-20",
        "name": "2021 Summer",
        "season": "Summer",
        "seasonEmoji": "☀️",
        "start": "2021-06-21",
        "year": 2021,
      }
    `);

    jest.useFakeTimers().setSystemTime(new Date("2021-12-20").getTime());
    expect(findSeason()).toMatchInlineSnapshot(`
      {
        "end": "2021-12-20",
        "name": "2021 Fall",
        "season": "Fall",
        "seasonEmoji": "🍂",
        "start": "2021-09-21",
        "year": 2021,
      }
    `);
  });

  it("fail", () => {
    jest.useRealTimers();
    process.env.SETDATE = "2021-01-20";
    try {
      findSeason();
    } catch (err) {
      expect(err).toMatchInlineSnapshot(
        `[TypeError: Cannot read properties of undefined (reading '0')]`
      );
    }
    expect(setFailed).toHaveBeenCalledWith(
      `The current date is out of range, it's not time to create a playlist yet. If testing, set the env variable \`SETDATE\`.`
    );
    process.env.SETDATE = undefined;
  });

  it("set date", () => {
    Object.defineProperty(github, "context", {
      value: {
        payload: {
          inputs: {
            date: "2023-06-20",
          },
        },
      },
    });
    expect(findSeason()).toMatchInlineSnapshot(`
      {
        "end": "2023-06-20",
        "name": "2023 Spring",
        "season": "Spring",
        "seasonEmoji": "🌷",
        "start": "2023-03-21",
        "year": 2023,
      }
    `);
  });

  it("change season names", () => {
    jest.useFakeTimers().setSystemTime(new Date("2021-3-20").getTime());
    defaultInputs["season-names"] = "Summer,Fall,Winter,Spring";
    defaultInputs["season-emoji"] = "☀️,🍂,❄️,🌷";
    expect(findSeason()).toMatchInlineSnapshot(`
      {
        "end": "2021-03-20",
        "name": "2020/2021 Summer",
        "season": "Summer",
        "seasonEmoji": "☀️",
        "start": "2020-12-21",
        "year": 2021,
      }
    `);
  });
});

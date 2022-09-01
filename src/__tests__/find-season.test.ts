import { findSeason } from "../find-season";
import { setFailed } from "@actions/core";

jest.mock("@actions/core");

describe("findSeason", () => {
  it("works", () => {
    jest.useFakeTimers().setSystemTime(new Date("2021-3-20").getTime());
    expect(findSeason()).toMatchInlineSnapshot(`
      {
        "end": "2021-03-20",
        "name": "2020/2021 Winter",
        "season": "Winter",
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
      expect(err).toMatchInlineSnapshot(`[Error]`);
    }
    expect(setFailed).toHaveBeenCalledWith(
      `The current date is out of range, it's not time to create a playlist yet. If testing, set the env variable \`SETDATE\`.`
    );
    process.env.SETDATE = undefined;
  });
});

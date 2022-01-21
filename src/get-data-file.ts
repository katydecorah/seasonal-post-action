import { load } from "js-yaml";
import { setFailed } from "@actions/core";
import { Buffer } from "buffer";
import { Octokit } from "octokit";
import { writeFileSync } from "fs";
import { DataFile } from "./format";

export const octokit = new Octokit({
  auth: process.env.TOKEN,
});

export async function getDataFile(
  file: string
): Promise<DataFile | undefined | []> {
  try {
    const { data } = await octokit.rest.repos.getContent({
      owner: "katydecorah",
      repo: "has",
      path: `_data/${file}`,
    });
    if ("content" in data) {
      const buffer = Buffer.from(data.content, "base64").toString();
      const json = load(buffer) as DataFile;
      return json;
    } else {
      return [];
    }
  } catch (error) {
    setFailed(error.message);
  }
}

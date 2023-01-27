import { load } from "js-yaml";
import { Buffer } from "buffer";
import { Octokit } from "octokit";
import { DataFile } from "./format";
import { getInput } from "@actions/core";

export const octokit = new Octokit({
  auth: process.env.TOKEN,
});

export async function getDataFile(
  file: string
): Promise<DataFile | undefined | []> {
  try {
    const owner = getInput("GitHubUsername");
    const repo = getInput("GitHubRepository");
    const { data } = await octokit.rest.repos.getContent({
      owner,
      repo,
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
    throw new Error(`${file}: ${error}`);
  }
}

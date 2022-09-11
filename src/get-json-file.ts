import { setFailed } from "@actions/core";
import { Buffer } from "buffer";
import { Octokit } from "octokit";
import { DataFile } from "./format";
import { getInput } from "@actions/core";

export const octokit = new Octokit({
  auth: process.env.TOKEN,
});

export async function getJsonFile(
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
      return JSON.parse(buffer) as DataFile;
    } else {
      return [];
    }
  } catch (error) {
    setFailed(error.message);
  }
}

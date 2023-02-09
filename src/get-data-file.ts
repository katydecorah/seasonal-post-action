import { load } from "js-yaml";
import { Buffer } from "buffer";
import { Octokit } from "octokit";
import { DataFile } from "./format";
import { getInput } from "@actions/core";

export const octokit = new Octokit({
  auth: process.env.TOKEN,
});

export async function getDataFile(
  path?: string
): Promise<DataFile | undefined | []> {
  if (!path) return [];
  try {
    const owner = getInput("github-username");
    const repo = getInput("github-repository");
    const { data } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path,
    });
    if ("content" in data) {
      const buffer = Buffer.from(data.content, "base64").toString();
      const json = load(buffer) as DataFile;
      return json;
    } else {
      return [];
    }
  } catch (error) {
    throw new Error(`${path}: ${error}`);
  }
}

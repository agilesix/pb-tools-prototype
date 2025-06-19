import { z } from "zod";
import { type Issue, IssueSchema } from "@/types";

type issueParams = {
  owner: string;
  repo: string;
  labels: string[];
  state?: "open" | "closed" | "all";
  type?: string;
};

/**
 * Fetch issues from a GitHub repository
 * @param owner - The owner of the repository
 * @param repo - The name of the repository
 * @param state - The state of the issues
 * @param labels - The labels of the issues
 * @param type - The type of the issues
 * @returns The parsed issues
 */
export async function fetchIssues({
  owner,
  repo,
  state = "open",
  labels,
  type,
}: issueParams): Promise<Issue[]> {
  // Set query params
  const query = new URLSearchParams();
  query.set("state", state);
  query.set("labels", labels.join(","));
  query.set("per_page", "100");
  query.set("page", "1");
  if (type) {
    query.set("type", type);
  }

  // Make request
  const url = `https://api.github.com/repos/${owner}/${repo}/issues?${query.toString()}`;
  const response = await fetch(url);
  const rawData = await response.json();

  // Parse response directly with Zod array
  return z.array(IssueSchema).parse(rawData);
}

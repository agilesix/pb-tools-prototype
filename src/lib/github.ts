import { z } from "zod";
import { type Issue, IssueSchema } from "@/types";

type issueParams = {
  owner: string;
  repo: string;
  labels: string[];
  state?: "open" | "closed" | "all";
  type?: string;
  test?: boolean;
};

const scores = [92, 98, 73, 65, 82, 56, 90];

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
  test = false,
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
  let rawData;
  if (test) {
    rawData = await import("@/lib/sample.json").then(
      (module) => module.default
    );
  } else {
    const url = `https://api.github.com/repos/${owner}/${repo}/issues?${query.toString()}`;
    const response = await fetch(url, {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
        Accept: "application/vnd.github.full+json", // includes body_html and body
      },
    });
    rawData = await response.json();
  }

  // Parse response directly with Zod array
  try {
    const issues = z.array(IssueSchema).parse(rawData);
    return issues.map((issue, index) => ({
      ...issue,
      upvoteCount: scores[index],
      downvoteCount: 100 - scores[index],
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

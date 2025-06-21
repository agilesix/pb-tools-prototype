import type { Issue } from "@/types";
import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Tag,
} from "@trussworks/react-uswds";

import { SingleVoteButtonGroup } from "./SingleVoteButtonGroup";
import { useVoteStore } from "@/lib/useVoteStore";

// #########################################################
// Utility functions
// #########################################################
const summary = (issue: Issue) => {
  const markdownContent = issue.body || "";

  // Extract text between first and second ### headers using regex
  const match = markdownContent.match(/^###\s+.*?\n(.*?)(?=\n###\s+|$)/s);

  if (!match) {
    // Fallback to bodyText if no headers found
    return (issue.bodyText || "").slice(0, 255) + "...";
  }

  // Clean and limit the extracted text
  const cleanedText = match[1].replace(/\s+/g, " ").trim();

  return cleanedText.length > 150
    ? cleanedText.slice(0, 150) + "..."
    : cleanedText;
};

// #########################################################
// IssueCard component
// #########################################################

interface IssueCardProps {
  issue: Issue;
}

export const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
  const voteStore = useVoteStore();
  const issueUrl = issue.html_url;

  // Read from the store. This is now reactive.
  // On first read, it will seed the store with the issue's initial counts.
  const initialVotes = {
    upvote: issue.upvoteCount,
    downvote: issue.downvoteCount,
  };
  const proposalVotes = voteStore.getProposalVotes(issueUrl, initialVotes);
  const score = proposalVotes.upvote - proposalVotes.downvote;

  return (
    <Card className="tablet:grid-col-6 desktop:grid-col-6">
      <CardHeader>
        <h3 className="usa-card__heading">{issue.title}</h3>
        <p id="issue-score" className="usa-card__heading-description">
          <strong>Score:</strong> {score} ({proposalVotes.upvote} upvotes,{" "}
          {proposalVotes.downvote} downvotes)
        </p>
      </CardHeader>
      <CardBody>
        <p>{summary(issue)}</p>
        {issue.labels.length > 0 && (
          <div className="margin-top-2">
            <ul aria-label="Labels" className="usa-list usa-list--unstyled">
              {issue.labels.map((label) => (
                <li
                  key={label.name}
                  className="display-inline-block margin-right-1"
                >
                  <Tag className="bg-secondary-dark">{label.name}</Tag>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardBody>
      <CardFooter>
        <SingleVoteButtonGroup issue={issue} voteStoreActions={voteStore} />
      </CardFooter>
    </Card>
  );
};

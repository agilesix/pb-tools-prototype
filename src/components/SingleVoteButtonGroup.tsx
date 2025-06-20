import { Button, ButtonGroup, Icon, Link } from "@trussworks/react-uswds";
import React, { useState } from "react";

import type { Issue } from "../types";
import { useVoteStore } from "../lib/useVoteStore";

interface Props {
  voteStoreActions: ReturnType<typeof useVoteStore>;
  issue: Issue;
}

type VoteState = "upvoted" | "downvoted" | null;

export const SingleVoteButtonGroup: React.FC<Props> = ({
  voteStoreActions,
  issue,
}) => {
  const [voteState, setVoteState] = useState<VoteState | null>(null);
  const issueUrl = issue.html_url;

  const handleUpvote = () => {
    if (voteState === "upvoted") {
      setVoteState(null);
      voteStoreActions.decrementUpvote(issueUrl);
    } else {
      setVoteState("upvoted");
      voteStoreActions.incrementUpvote(issueUrl);
    }
    console.log(
      "Score for",
      issueUrl,
      voteStoreActions.getProposalScore(issueUrl)
    );
  };

  const handleDownvote = () => {
    if (voteState === "downvoted") {
      setVoteState(null);
      voteStoreActions.decrementDownvote(issueUrl);
    } else {
      setVoteState("downvoted");
      voteStoreActions.incrementDownvote(issueUrl);
    }
    console.log(
      "Score for",
      issueUrl,
      voteStoreActions.getProposalScore(issueUrl)
    );
  };

  return (
    <ButtonGroup type="default">
      <Link
        href={issue.html_url}
        className="usa-button usa-button--default"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon.Launch className="margin-right-1" aria-label="External link" />
        View
      </Link>
      <ButtonGroup type="segmented">
        <Button
          type="button"
          className={
            voteState === "upvoted"
              ? "usa-button--default"
              : "usa-button--outline"
          }
          onClick={handleUpvote}
        >
          <Icon.ThumbUpAlt className="margin-right-1" aria-label="Thumbs up" />
          {voteState === "upvoted" ? "Upvoted" : "Upvote"}
        </Button>
        <Button
          type="button"
          className={
            voteState === "downvoted"
              ? "usa-button--default"
              : "usa-button--outline"
          }
          onClick={handleDownvote}
        >
          <Icon.ThumbDownAlt
            className="margin-right-1"
            aria-label="Thumbs down"
          />
          {voteState === "downvoted" ? "Downvoted" : "Downvote"}
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  );
};

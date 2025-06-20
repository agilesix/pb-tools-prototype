import { Button, ButtonGroup, Icon, Link } from "@trussworks/react-uswds";
import React, { useState } from "react";

import type { Issue } from "../types";

interface Props {
  issue: Issue;
}

type VoteState = "upvoted" | "downvoted" | null;

export const SingleVoteButtonGroup: React.FC<Props> = ({ issue }) => {
  const [voteState, setVoteState] = useState<VoteState>(null);

  const handleUpvote = () => {
    if (voteState === "upvoted") {
      setVoteState(null);
    } else {
      setVoteState("upvoted");
    }
  };

  const handleDownvote = () => {
    if (voteState === "downvoted") {
      setVoteState(null);
    } else {
      setVoteState("downvoted");
    }
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

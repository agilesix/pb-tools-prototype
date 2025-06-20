import type { Issue } from "@/types";
import React from "react";
import { CardGroup } from "@trussworks/react-uswds";
import { IssueCard } from "./IssueCard";

interface IssueGridProps {
  issues: Issue[];
}

export const IssueGrid: React.FC<IssueGridProps> = ({ issues }) => {
  return (
    <CardGroup>
      {issues.map((issue) => (
        <IssueCard key={issue.url} issue={issue} />
      ))}
    </CardGroup>
  );
};

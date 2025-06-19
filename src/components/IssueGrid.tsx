import type { Issue } from "@/types";
import React from "react";
import { CardGroup } from "@trussworks/react-uswds";
import IssueCard from "./IssueCard";

interface Props {
  issues: Issue[];
}

const IssueGrid: React.FC<Props> = ({ issues }) => {
  return (
    <CardGroup>
      {issues.map((issue) => (
        <IssueCard key={issue.url} issue={issue} />
      ))}
    </CardGroup>
  );
};

export default IssueGrid;

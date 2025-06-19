import type { Issue } from "@/types";
import React from "react";
import IssueCard from "./IssueCard";

interface Props {
  issues: Issue[];
}

const IssueGrid: React.FC<Props> = ({ issues }) => {
  return (
    <ul className="issue-grid">
      {issues.map((issue) => (
        <li key={issue.url}>
          <IssueCard issue={issue} />
        </li>
      ))}
    </ul>
  );
};

export default IssueGrid;

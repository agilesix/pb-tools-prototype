import type { Issue } from "@/types";
import React from "react";

interface Props {
  issue: Issue;
}

const IssueCard: React.FC<Props> = ({ issue }) => {
  return (
    <div className="issue-card">
      <h2>{issue.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: issue.bodyHtml }} />
      <ul>
        {issue.labels.map((label) => (
          <li key={label.name}>{label.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default IssueCard;

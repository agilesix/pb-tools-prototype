import type { Issue } from "@/types";
import React from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Link,
  Tag,
  Icon,
} from "@trussworks/react-uswds";

interface Props {
  issue: Issue;
}

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

const IssueCard: React.FC<Props> = ({ issue }) => {
  return (
    <Card className="tablet:grid-col-6 desktop:grid-col-6">
      <CardHeader>
        <h3 className="usa-card__heading">{issue.title}</h3>
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
                  <Tag background={`#${label.color}`}>{label.name}</Tag>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardBody>
      <CardFooter>
        <ButtonGroup type="default" className="width-full">
          <Link
            href={issue.html_url}
            className="usa-button usa-button--default usa-button-group__item"
            variant="unstyled"
          >
            <Icon.Launch
              className="margin-right-1"
              aria-label="External link"
            />
            View
          </Link>
          <Button
            type="button"
            className="usa-button--outline usa-button-group__item"
          >
            <Icon.ThumbUpAlt
              className="margin-right-1"
              aria-label="Thumbs up"
            />
            Upvote
          </Button>
          <Button
            type="button"
            className="usa-button--outline usa-button-group__item"
          >
            <Icon.ThumbDownAlt
              className="margin-right-1"
              aria-label="Thumbs down"
            />
            Downvote
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default IssueCard;

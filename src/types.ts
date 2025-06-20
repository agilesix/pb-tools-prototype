import { z } from "zod";

const nullableString = z
  .string()
  .nullable()
  .transform((val) => val ?? "No description");

export const IssueSchema = z
  .object({
    html_url: z.string().url(),
    title: z.string(),
    body: nullableString,
    body_html: nullableString,
    body_text: nullableString,
    upvoteCount: z.number().optional().default(0),
    downvoteCount: z.number().optional().default(0),
    labels: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        color: z.string(),
      })
    ),
  })
  .transform((data) => ({
    ...data,
    url: data.html_url,
    bodyHtml: data.body_html,
    bodyText: data.body_text,
  }));

export type Issue = z.infer<typeof IssueSchema>;

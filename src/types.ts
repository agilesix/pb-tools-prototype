import { z } from "zod";

export const IssueSchema = z.object({
  url: z.string().url(),
  title: z.string(),
  body: z.string(),
  labels: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      color: z.string(),
    })
  ),
});

export type Issue = z.infer<typeof IssueSchema>;

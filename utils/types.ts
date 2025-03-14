import { z } from "zod";

export const ReadQuerySchema = z.object({
  query: z.string().describe("SELECT SQL query to execute"),
});

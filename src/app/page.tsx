import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

export default async function Home() {
  const result = await generateObject({
    model: google("gemini-1.5-pro-latest"),
    prompt: "Who created Java?",
    schema: z.object({
      headline: z.string().describe("headline of the response"),
      details: z.string().describe("more details"),
    }),
  });

  console.log(result.object);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Hello World!</p>
    </main>
  );
}

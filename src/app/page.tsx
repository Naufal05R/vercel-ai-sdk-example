import { google } from "@ai-sdk/google";
import { streamObject } from "ai";
import { z } from "zod";

export default async function Home() {
  const result = streamObject({
    model: google("gemini-1.5-pro-latest"),
    prompt: "Who created Java?",
    schema: z.object({
      headline: z.string().describe("headline of the response"),
      details: z.string().describe("more details"),
    }),
  });

  for await (const partialObject of result.partialObjectStream) {
    console.log(partialObject);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Hello World!</p>
    </main>
  );
}

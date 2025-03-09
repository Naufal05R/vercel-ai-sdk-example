import { google } from "@ai-sdk/google";
import { generateId, createDataStreamResponse, streamText } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  return createDataStreamResponse({
    execute: (dataStream) => {
      dataStream.writeData("initialized call");
      const result = streamText({
        model: google("gemini-1.5-pro-latest"),
        messages,
        onChunk() {
          dataStream.writeMessageAnnotation({ chunk: "123" });
        },
        onFinish() {
          dataStream.writeMessageAnnotation({
            id: generateId(),
            other: "information",
          });
          dataStream.writeData("call completed");
        },
      });
      result.mergeIntoDataStream(dataStream);
    },
    onError: (error) => {
      return error instanceof Error ? error.message : String(error);
    },
  });
}

import { Agent,  openai, createAgent } from "@inngest/agent-kit";

import { inngest } from "./client";


export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const codeAgent = createAgent({
      name: "code-agent",
      system: "You are an expert next.js developer. You write readable, maintainable code. You write simple Next.js & React snippets",
      model: openai({ model: "gpt-4o"}),
    });

    const { output } = await codeAgent.run(
      `Write the following snippets: ${event.data.value}`,
    );

    console.log(output);

    return {output};
  },
);
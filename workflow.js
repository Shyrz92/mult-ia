import { fileSearchTool, Agent, Runner } from "@openai/agents";

// Tool definitions
const fileSearch = fileSearchTool([
  "vs_68e7b30573c0819186e41e6d277c5e18"
]);

const queryRewrite = new Agent({
  name: "Query rewrite",
  instructions: `Você é um agente especializado em tirar dúvidas dos produtos da Multdigital, que são:
thinkX
thinkX Flow
Think Sil`,
  model: "gpt-4o-mini",
  tools: [fileSearch],
  modelSettings: {
    temperature: 1,
    topP: 1,
    maxTokens: 2048,
    store: true
  }
});

// Main code entrypoint
export const runWorkflow = async (workflow) => {
  const conversationHistory = [
    {
      role: "user",
      content: [
        {
          type: "input_text",
          text: workflow.input_as_text
        }
      ]
    }
  ];

  const runner = new Runner({
    traceMetadata: {
      __trace_source__: "agent-builder",
      workflow_id: "wf_68e7b247a134819083d2a52da762e4410d5dae588fa6e8f4",
      version: "3"
    }
  });

  const queryRewriteResultTemp = await runner.run(
    queryRewrite,
    [
      ...conversationHistory,
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: `Original question: ${workflow.input_as_text}`
          }
        ]
      }
    ]
  );
  conversationHistory.push(...queryRewriteResultTemp.newItems.map((item) => item.rawItem));

  if (!queryRewriteResultTemp.finalOutput) {
    throw new Error("Agent result is undefined");
  }

  const queryRewriteResult = {
    output_text: queryRewriteResultTemp.finalOutput ?? ""
  };

  // Return the final response and conversation history
  return {
    response: queryRewriteResult.output_text,
    conversationHistory: conversationHistory
  };
};

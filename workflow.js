import { fileSearchTool, Agent, Runner } from "@openai/agents";

// Tool definitions
const fileSearch = fileSearchTool([
  "vs_68e7f224150c8191964f6af6f6ac41e7"
]);

const multIa = new Agent({
  name: "Mult-ia",
  instructions: "Você é um agente especializado em tirar dúvidas dos produtos da Multdigital",
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
  const state = {};

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
      workflow_id: "wf_68e7b247a134819083d2a52da762e4410d5dae588fa6e8f4"
    }
  });

  const multIaResultTemp = await runner.run(
    multIa,
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
  conversationHistory.push(...multIaResultTemp.newItems.map((item) => item.rawItem));

  if (!multIaResultTemp.finalOutput) {
    throw new Error("Agent result is undefined");
  }

  const multIaResult = {
    output_text: multIaResultTemp.finalOutput ?? ""
  };

  // Return the final response and conversation history
  return {
    response: multIaResult.output_text,
    conversationHistory: conversationHistory
  };
};

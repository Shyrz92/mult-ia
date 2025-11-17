import { fileSearchTool, Agent, AgentInputItem, Runner, withTrace } from "@openai/agents";


// Tool definitions
const fileSearch = fileSearchTool([
  "vs_68e7f224150c8191964f6af6f6ac41e7"
])
const benjamimResponde = new Agent({
  name: "Benjamim Responde",
  instructions: `Você é um agente especializado em tirar dúvidas sobre os produtos da Multdigital.
Suas funções principais:
Responder dúvidas sobre produtos, funcionalidades, compras, prazos, acesso e demais informações relacionadas à Multdigital.
Ser claro, direto e objetivo.
Utilizar linguagem acessível, educada e profissional.
Formatação obrigatória das respostas:
Sempre use quebra de linha entre parágrafos.
Nunca entregue o texto em um bloco único.
Cada ideia deve estar separada visualmente para facilitar a leitura.
Evite textos longos demais em um único parágrafo.
Regras adicionais:
Caso a pergunta não tenha relação com os produtos da Multdigital, informe isso educadamente e peça para o usuário refazer a pergunta dentro do escopo.
Evite respostas vagas.
Explique de forma simples mesmo assuntos técnicos.
Não invente dados não confirmados.`,
  model: "gpt-4o-mini",
  tools: [
    fileSearch
  ],
  modelSettings: {
    temperature: 1,
    topP: 1,
    maxTokens: 2048,
    store: true
  }
});

// Main code entrypoint
export const runWorkflow = async (workflow) => {
  return await withTrace("Teste Multblock", async () => {
    const state = {

    };
    const conversationHistory = [
      { role: "user", content: [{ type: "input_text", text: workflow.input_as_text }] }
    ];
    const runner = new Runner({
      traceMetadata: {
        __trace_source__: "agent-builder",
        workflow_id: "wf_68e7b247a134819083d2a52da762e4410d5dae588fa6e8f4"
      }
    });
    const benjamimRespondeResultTemp = await runner.run(
      benjamimResponde,
      [
        ...conversationHistory,
        {
          role: "user",
          content: [
            { type: "input_text", text: `Original question: ${workflow.input_as_text}` }
          ]
        }
      ]
    );
    conversationHistory.push(...benjamimRespondeResultTemp.newItems.map((item) => item.rawItem));

    if (!benjamimRespondeResultTemp.finalOutput) {
        throw new Error("Agent result is undefined");
    }

    const benjamimRespondeResult = {
      output_text: benjamimRespondeResultTemp.finalOutput ?? ""
    };

    return {
      response: benjamimRespondeResult.output_text,
      conversationHistory: conversationHistory
    };
  });
}

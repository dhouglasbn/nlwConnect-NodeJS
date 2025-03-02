import { generateText } from 'ai'
import { genAI } from '../ai/genai'
import { postgresTool } from '../ai/tools/postgres-tool'
import { redisTool } from '../ai/tools/redis-tool'

interface AnswerUserMessageParams {
  message: string
}

// tools -> Se o usuário pedir uma informação x do meu serviço
// eu dou uma ferramenta para ele acessar

// service de inscrição do evento
export async function answerUserMessage({ message }: AnswerUserMessageParams) {
  const answer = await generateText({
    model: genAI,
    prompt: message,
    tools: {
      postgresTool,
      redisTool,
    },
    system: // mensagem para o sistema da ia
      `Você é um assistente de I.A responsável por responder dúvidas sobre um evento de programação.
      
      Inclua na resposta somente o que o usuário pediu, sem nenhum texto adicional.
      
      O retorno deve ser sempre em markdown (sem incluir \`\`\` no inicio ou no fim).`.trim(),
    maxSteps: 5,
  })

  return { response: answer.text }
}

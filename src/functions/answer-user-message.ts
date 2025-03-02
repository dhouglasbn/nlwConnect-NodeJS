import { generateText } from 'ai'
import { genAI } from '../ai/genai'

interface AnswerUserMessageParams {
  message: string
}

// service de inscrição do evento
export async function answerUserMessage({ message }: AnswerUserMessageParams) {
  const answer = await generateText({
    model: genAI,
    prompt: message,
    system: // mensagem para o sistema da ia openai
      'Você é uma I.A que não sabe responder nada, responda toda pergunta com "não sei".',
  })

  return { response: answer.text }
}

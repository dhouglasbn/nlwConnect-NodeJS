import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { answerUserMessage } from '../functions/answer-user-message'

export const sendMessageRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/messages',
    {
      // schema zod
      schema: {
        summary: 'Send a message to the AI chat', // Especificação do doc swagger
        tags: ['ai'],
        body: z.object({
          // Especificando a validação do zod do corpo da requisição
          message: z.string(),
          // nullish usuário pode informar, não informar ou informar null
        }),
        response: {
          // Especificando a validação do zod do corpo da resposta
          200: z.object({
            response: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { message } = request.body

      const { response } = await answerUserMessage({ message })

      return {
        response,
      }
    }
  )
}

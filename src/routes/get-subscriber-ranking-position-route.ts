import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getSubsCriberRankingPosition } from '../functions/get-subscriber-ranking-position'

export const getSubscriberRankingPositionRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/position',
      {
        // schema zod
        schema: {
          summary: 'Get subscriber ranking position', // Especificação do doc swagger
          tags: ['referral'],
          params: z.object({
            // Especificando a validação do zod do param id
            subscriberId: z.string(),
          }),
          response: {
            // Especificando a validação do zod do corpo da resposta
            200: z.object({
              position: z.number().nullable(),
            }),
          },
        },
      },
      async request => {
        const { subscriberId } = request.params

        const { position } = await getSubsCriberRankingPosition({
          subscriberId,
        })

        return { position } // reply não é necessário pq status 200 é padrão
      }
    )
  }

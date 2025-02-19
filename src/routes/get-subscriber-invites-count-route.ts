import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getSubscriberInvitesCount } from '../functions/get-subscriber-invites-count'

export const getSubscriberInvitesCountRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/count',
      {
        // schema zod
        schema: {
          summary: 'Get subscriber invites count', // Especificação do doc swagger
          tags: ['referral'],
          params: z.object({
            // Especificando a validação do zod do param id
            subscriberId: z.string(),
          }),
          response: {
            // Especificando a validação do zod do corpo da resposta
            200: z.object({
              count: z.number(),
            }),
          },
        },
      },
      async request => {
        const { subscriberId } = request.params

        const { count } = await getSubscriberInvitesCount({ subscriberId })

        return { count } // reply não é necessário pq status 200 é padrão
      }
    )
  }

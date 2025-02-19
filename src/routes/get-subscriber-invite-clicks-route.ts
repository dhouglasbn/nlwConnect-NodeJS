import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getSubscriberInviteClicks } from '../functions/get-subscriber-invite-clicks'

export const getSubscriberInviteClicksRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/clicks',
      {
        // schema zod
        schema: {
          summary: 'Get subscriber invite clicks count', // Especificação do doc swagger
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

        const { count } = await getSubscriberInviteClicks({ subscriberId })

        return { count } // reply não é necessário pq status 200 é padrão
      }
    )
  }

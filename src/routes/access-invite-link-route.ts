import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { env } from '../env'
import { accessInviteLink } from '../functions/access-invite-link'

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invites/:subscriberId',
    {
      // schema zod
      schema: {
        summary: 'Access invite liunk and redirects user', // Especificação do doc swagger
        tags: ['referral'],
        params: z.object({
          // Especificando a validação do zod do param id
          subscriberId: z.string(),
        }),
        response: {
          // Especificando a validação do zod do corpo da resposta
          302: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params

      await accessInviteLink({ subscriberId })

      // console.log(await redis.hgetall('referral:access-count')) contagem da tabela

      const redirectUrl = new URL(env.WEB_URL) // gera o link de inscrição passando o id do remetente

      redirectUrl.searchParams.set('referrer', subscriberId)

      // 301: redirect permanente (browser não acessa recurso da api mais de uma vez)
      // 302: redirect temporário (browser não armazena nada em cache)

      return reply.status(201).redirect(redirectUrl.toString(), 302)
    }
  )
}

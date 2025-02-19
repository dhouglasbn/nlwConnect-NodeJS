import { redis } from '../redis/client'

interface GetSubscriberInviteCountParams {
  subscriberId: string
}

// service de pontuação de um usuário pelo cadastro dos indicados
export async function getSubscriberInvitesCount({
  subscriberId,
}: GetSubscriberInviteCountParams) {
  // Pega a pontuação do usuário no ranking do sorted sets (z)
  const count = await redis.zscore('referral:ranking', subscriberId)

  // O redis salva como string | null
  // conversão é necessária
  return { count: count ? Number.parseInt(count) : 0 }
}

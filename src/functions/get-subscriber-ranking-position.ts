import { redis } from '../redis/client'

interface GetSubscriberInvitesCountParams {
  subscriberId: string
}

// service de ranking do usuário
export async function getSubsCriberRankingPosition({
  subscriberId,
}: GetSubscriberInvitesCountParams) {
  // Pega a posição do usuário no ranking sorted sets (z)
  const rank = await redis.zrevrank('referral:ranking', subscriberId)

  // Não tá no ranking
  if (rank === null) {
    return { position: null }
  }

  return { position: rank + 1 }
}

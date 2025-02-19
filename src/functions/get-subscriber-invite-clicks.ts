import { redis } from '../redis/client'

interface GetSubscriberInviteClicksParams {
  subscriberId: string
}

// service de quantidade de clicks de um link do evento
export async function getSubscriberInviteClicks({
  subscriberId,
}: GetSubscriberInviteClicksParams) {
  // await redis.hincrby('referral:access-count', subscriberId, 1) // Banco hash (h), incremento de 1

  // quantos acessos o link desse subscriberId teve
  const count = await redis.hget('referral:access-count', subscriberId)

  // O redis salva como String | null
  // conversão é necessária
  return { count: count ? Number.parseInt(count) : 0 }
}

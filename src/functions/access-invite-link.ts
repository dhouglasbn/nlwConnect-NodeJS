import { redis } from '../redis/client'

interface AccessInviteLinkParams {
  subscriberId: string
}

// service de inscrição do evento
export async function accessInviteLink({
  subscriberId,
}: AccessInviteLinkParams) {
  await redis.hincrby('referral:access-count', subscriberId, 1) // Banco hash (h), incremento de 1
}

// o redis é um banco CHAVE | VALOR
// a cada acesso o banco vai incrementando 1
// { 'diego123': 1 } # ESTADO INICIAL
// { 'diego123': 2 }
// { 'diego123': 3 }
// { 'diego123': 4 } # ESTADO FINAL

import { eq } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'
import { redis } from '../redis/client'

interface SubscribeToEventParams {
  name: string
  email: string
  referrerId?: string | null
}

// service de inscrição do evento
export async function subscribeToEvent({
  name,
  email,
  referrerId,
}: SubscribeToEventParams) {
  const subscribers = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.email, email)) // eq = equal

  if (subscribers.length > 0) {
    return { subscriberId: subscribers[0].id }
  }

  const result = await db
    .insert(subscriptions)
    .values({
      name,
      email,
    })
    .returning() // a inserção do postgres registra várias entidades

  // O cara que convidou vai pontuando no ranking
  // conforme os indicados vão se cadastrando
  if (referrerId) {
    // Usando a estrutura sorted sets (z)
    // Ao invés do hash (h) o sorted sets aplica ordenação automática nos valores inseridos
    await redis.zincrby('referral:ranking', 1, referrerId)
  }

  const subscriber = result[0]
  return {
    subscriberId: subscriber.id,
  }
}

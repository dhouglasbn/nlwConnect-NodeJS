import { eq } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'

interface SubscribeToEventParams {
  name: string
  email: string
}

// service de inscrição do evento
export async function subscribeToEvent({
  name,
  email,
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

  const subscriber = result[0]
  return {
    subscriberId: subscriber.id,
  }
}
